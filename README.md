# 🎉 Event Invitation — Site d'invitations privées

Site web premium pour gérer les demandes d'invitation à un événement privé.  
**Stack** : Next.js 15 · Tailwind CSS · Google Sheets · Cloudflare Pages

**Live** → [https://event-invitation-ftu.pages.dev](https://event-invitation-ftu.pages.dev)

---

## Fonctionnalités

- Landing page premium (design sombre, animations, étoiles)
- Formulaire modal avec validation (Prénom, Nom, Email, Téléphone)
- Stockage automatique dans Google Sheets
- Anti-doublon par email
- Limite d'inscriptions configurable
- Ouverture / fermeture des inscriptions en un mot
- 100% Edge Runtime — déployé sur Cloudflare Pages

---

## Structure du projet

```
event-invitation/
├── app/
│   ├── api/register/route.ts   # API d'inscription (Edge Runtime)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Background.tsx          # Orbes animés + étoiles
│   ├── HeroSection.tsx         # Landing page
│   ├── InvitationModal.tsx     # Formulaire modal
│   ├── FormField.tsx
│   └── StarField.tsx
├── lib/
│   ├── config.ts               # ⚙️ Configuration de l'événement
│   └── sheets.ts               # Client Google Sheets (Edge-compatible)
├── types/index.ts
└── wrangler.jsonc              # Configuration Cloudflare
```

---

## Installation locale

```bash
# 1. Cloner le repo
git clone https://github.com/dylanyehouenou/event-invitation.git
cd event-invitation

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement
cp .env.local.example .env.local
# Remplir les 3 variables (voir section Variables d'environnement)

# 4. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=sheets-writer@event-invitation-2026.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1KK8fFo7-re8wVJ9o9WU1JTjAFcwcP1_DoVuHbiaselg
```

> Ces valeurs sont déjà configurées en secrets sur Cloudflare Pages.

---

## Personnaliser l'événement

Tout se passe dans **`lib/config.ts`** :

```ts
export const eventConfig = {
  name:     "SURPRISE — ESPÉRANCE & LOÏSSA",   // Nom affiché
  tagline:  "Un anniversaire inoubliable",       // Sous-titre
  date:     "Samedi 28 Juin 2026",              // Date
  time:     "À définir",                         // Heure → changer quand connue
  location: "Les Salles, Vaulx-en-Velin",       // Lieu

  registrationsOpen: true,    // false = ferme les inscriptions immédiatement
  maxRegistrations:  80,      // 0 = illimité
}
```

---

## Déployer une mise à jour

Après n'importe quelle modification :

```bash
npm run pages:build
npx wrangler pages deploy .vercel/output/static --project-name event-invitation --branch main
```

---

## Fermer / rouvrir les inscriptions

Dans `lib/config.ts` :

```ts
registrationsOpen: false   // Ferme
registrationsOpen: true    // Rouvre
```

Puis redéployer (commande ci-dessus).

---

## Google Sheets

Les inscriptions arrivent automatiquement dans :  
[Ouvrir le Google Sheet](https://docs.google.com/spreadsheets/d/1KK8fFo7-re8wVJ9o9WU1JTjAFcwcP1_DoVuHbiaselg/edit)

| Colonne | Contenu |
|---|---|
| A | Prénom |
| B | Nom |
| C | Email |
| D | Téléphone |
| E | Date d'inscription |

---

## Comportements automatiques

| Situation | Résultat affiché |
|---|---|
| Inscription réussie | Message de confirmation |
| Email déjà inscrit | "Une demande a déjà été envoyée avec cette adresse email." |
| Inscriptions fermées | "Les demandes d'invitation sont actuellement fermées." |
| Limite atteinte | "Le nombre maximum d'invités a été atteint." |

---

## Compte Cloudflare

- **Projet** : `event-invitation`
- **URL de prod** : `event-invitation-ftu.pages.dev`
- **Dashboard** : [dash.cloudflare.com](https://dash.cloudflare.com)

## Compte Google Cloud

- **Projet** : `event-invitation-2026`
- **Compte de service** : `sheets-writer@event-invitation-2026.iam.gserviceaccount.com`
- **Console** : [console.cloud.google.com](https://console.cloud.google.com)
