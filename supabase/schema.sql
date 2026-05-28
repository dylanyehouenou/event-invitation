-- ╔═══════════════════════════════════════════════════════════╗
-- ║           Schéma Supabase — event-invitation              ║
-- ║  Exécutez ce script dans l'éditeur SQL de votre projet.   ║
-- ╚═══════════════════════════════════════════════════════════╝

-- Table des inscriptions
CREATE TABLE IF NOT EXISTS public.registrations (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name  TEXT        NOT NULL,
  last_name   TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,

  CONSTRAINT registrations_email_unique UNIQUE (email)
);

-- Index pour les lookups email rapides
CREATE INDEX IF NOT EXISTS registrations_email_idx
  ON public.registrations (lower(email));

-- Index pour le tri par date d'inscription
CREATE INDEX IF NOT EXISTS registrations_created_at_idx
  ON public.registrations (created_at DESC);

-- Row Level Security (le service_role key bypass les règles RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Aucune règle publique : seul votre backend (service_role) peut accéder.
-- Si vous souhaitez accéder depuis le dashboard Supabase en tant qu'admin :
-- CREATE POLICY "admin_all" ON public.registrations
--   USING (auth.role() = 'service_role');

-- Vue utile pour voir les stats rapidement dans le dashboard Supabase
CREATE OR REPLACE VIEW public.registration_stats AS
SELECT
  COUNT(*)                                    AS total,
  COUNT(*) FILTER (WHERE phone IS NOT NULL)   AS with_phone,
  MIN(created_at)                             AS first_at,
  MAX(created_at)                             AS last_at
FROM public.registrations;
