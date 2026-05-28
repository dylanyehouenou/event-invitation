/**
 * Configuration centrale de l'événement.
 * Modifiez uniquement ce fichier pour personnaliser le site.
 */
export const eventConfig = {
  // ── Identité de l'événement ──────────────────────────────
  name:     "SURPRISE — ESPÉRANCE & LOÏSSA",
  tagline:  "Un anniversaire inoubliable",
  description:
    "Une soirée surprise organisée en l'honneur d'Espérance et Loïssa. Gardez le secret — chaque détail a été pensé pour les surprendre.",

  // ── Date & lieu ──────────────────────────────────────────
  date:     "Samedi 28 Juin 2026",
  time:     "À définir",
  location: "Les Salles, Vaulx-en-Velin",

  // ── Gestion des inscriptions ─────────────────────────────
  /** Mettre à false pour fermer instantanément les inscriptions */
  registrationsOpen: true,

  /** Nombre maximum d'inscrits acceptés (0 = illimité) */
  maxRegistrations: 80,

  // ── SEO / Meta ───────────────────────────────────────────
  siteTitle:       "Invitation Privée",
  siteDescription: "Demandez votre invitation pour cet événement exclusif.",
} as const
