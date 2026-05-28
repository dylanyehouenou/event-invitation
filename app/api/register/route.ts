export const runtime = "edge"

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { readRows, appendRow, RANGE, HEADERS } from "@/lib/sheets"
import { eventConfig } from "@/lib/config"
import type { ApiResult } from "@/types"

const schema = z.object({
  first_name: z.string().min(2, "Prénom trop court").max(50),
  last_name:  z.string().min(2, "Nom trop court").max(50),
  email:      z.string().email("Adresse email invalide"),
  phone:      z.string().max(20).optional().or(z.literal("")),
})

export async function POST(req: NextRequest): Promise<NextResponse<ApiResult>> {
  // ── 1. Inscriptions ouvertes ? ─────────────────────────────
  if (!eventConfig.registrationsOpen) {
    return NextResponse.json(
      { success: false, code: "REGISTRATIONS_CLOSED", message: "Les demandes d'invitation sont actuellement fermées." },
      { status: 403 }
    )
  }

  // ── 2. Validation ──────────────────────────────────────────
  let body: unknown
  try { body = await req.json() }
  catch {
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", message: "Corps de requête invalide." },
      { status: 400 }
    )
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    const msg = parsed.error.errors.map((e) => e.message).join(", ")
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", message: msg },
      { status: 422 }
    )
  }

  const { first_name, last_name, email, phone } = parsed.data

  // ── 3. Lecture du sheet ────────────────────────────────────
  let allRows: string[][]
  try {
    allRows = await readRows()
  } catch (e) {
    console.error("Sheets read error:", e)
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    )
  }

  // Ignorer la ligne d'en-tête
  const dataRows = allRows.length > 0 && allRows[0][0] === HEADERS[0] ? allRows.slice(1) : allRows

  // ── 4. Capacité ────────────────────────────────────────────
  if (eventConfig.maxRegistrations > 0 && dataRows.length >= eventConfig.maxRegistrations) {
    return NextResponse.json(
      { success: false, code: "CAPACITY_REACHED", message: "Le nombre maximum d'invités a été atteint." },
      { status: 409 }
    )
  }

  // ── 5. Anti-doublon ────────────────────────────────────────
  const emailNorm = email.toLowerCase().trim()
  if (dataRows.some((row) => row[2]?.toLowerCase().trim() === emailNorm)) {
    return NextResponse.json(
      { success: false, code: "DUPLICATE_EMAIL", message: "Une demande a déjà été envoyée avec cette adresse email." },
      { status: 409 }
    )
  }

  // ── 6. En-têtes si feuille vide ────────────────────────────
  if (allRows.length === 0) {
    try { await appendRow(HEADERS) } catch { /* non bloquant */ }
  }

  // ── 7. Insertion ───────────────────────────────────────────
  const now = new Date().toLocaleString("fr-FR", {
    timeZone: "Europe/Paris", dateStyle: "short", timeStyle: "short",
  })

  try {
    await appendRow([first_name.trim(), last_name.trim(), emailNorm, phone?.trim() || "", now])
  } catch (e) {
    console.error("Sheets append error:", e)
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "Erreur serveur. Réessayez plus tard." },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, message: "Votre demande d'invitation a bien été enregistrée." },
    { status: 201 }
  )
}
