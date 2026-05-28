/**
 * Client Google Sheets Edge-compatible.
 * Utilise Web Crypto API + fetch — fonctionne sur Cloudflare Workers/Pages,
 * Next.js Edge Runtime, et Node.js 18+. Aucune dépendance externe.
 */

function getEnv(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`${key} manquant dans les variables d'environnement`)
  return val
}

function b64url(obj: object): string {
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

async function createJWT(email: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  const header64  = b64url({ alg: "RS256", typ: "JWT" })
  const payload64 = b64url({
    iss:   email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud:   "https://oauth2.googleapis.com/token",
    iat:   now,
    exp:   now + 3600,
  })

  const signingInput = `${header64}.${payload64}`

  const pem      = privateKey.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, "")
  const keyBytes = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes.buffer as ArrayBuffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const sig    = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, new TextEncoder().encode(signingInput))
  const sig64  = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

  return `${signingInput}.${sig64}`
}

async function getAccessToken(): Promise<string> {
  const email      = getEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL")
  const privateKey = getEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n")

  const jwt = await createJWT(email, privateKey)

  const res  = await fetch("https://oauth2.googleapis.com/token", {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion:  jwt,
    }),
  })

  const data = await res.json() as { access_token?: string; error?: string }
  if (!data.access_token) throw new Error(`OAuth Google: ${data.error ?? "token manquant"}`)
  return data.access_token
}

function sheetUrl(sheetId: string, range: string, action = ""): string {
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`
  return action ? `${base}:${action}` : base
}

// ── Exports ──────────────────────────────────────────────────

export const RANGE   = "Inscription!A:E"
export const HEADERS = ["Prénom", "Nom", "Email", "Téléphone", "Date d'inscription"]

export async function readRows(): Promise<string[][]> {
  const token   = await getAccessToken()
  const sheetId = getEnv("GOOGLE_SHEET_ID")

  const res  = await fetch(sheetUrl(sheetId, RANGE), {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json() as { values?: string[][] }
  return data.values ?? []
}

export async function appendRow(values: string[]): Promise<void> {
  const token   = await getAccessToken()
  const sheetId = getEnv("GOOGLE_SHEET_ID")

  const res = await fetch(`${sheetUrl(sheetId, RANGE, "append")}?valueInputOption=USER_ENTERED`, {
    method:  "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body:    JSON.stringify({ values: [values] }),
  })

  if (!res.ok) {
    const err = await res.json() as { error?: { message: string } }
    throw new Error(err.error?.message ?? "Sheets append failed")
  }
}
