# Site Digital World Coaching

Site vitrine statique — dark mode premium (or + violet), Tailwind CDN + Lucide icons + JS léger.

## Pages
- `index.html` — accueil : hero centré (badge disponibilité, titre gradient, 2 CTA), 3 stats qualitatives, 3 services en vedette, projets & réalisations (6 missions types), CTA final, footer 4 colonnes
- `services.html` — les 10 services DWC en cartes riches (icônes Lucide, tarifs « Sur devis » uniquement)
- `projects.html` — le projet : mission / vision / approche, 6 raisons de nous choisir, méthode 4 étapes, publics cibles
- `about.html` — valeurs + domaines d'intervention
- `contact.html` — cartes contact cliquables (WhatsApp / email / téléphone / localisation), formulaire mailto & WhatsApp (sans backend), FAQ accordéon, CTA glow

## Coordonnées (fictives, remplaçables)
- Email : `contact@digitalworldcoaching.com` (liens `mailto:`)
- WhatsApp / Téléphone : `+229 01 97 00 00 00` (`https://wa.me/22997000000`, `tel:+22997000000`)
- Localisation : Cotonou, Bénin (visite sur RDV)
- Ces valeurs sont centralisées dans `js/nav.js` (constantes `DWC_EMAIL`, `DWC_WA_NUMBER`) + les liens des footers et de contact.html.

## Structure technique
- `assets/logo.svg` — monogramme « DW » (cercle dégradé or → violet, glow), `assets/favicon.svg` — dérivé 64 px
- `css/main.css` — variables, reset, boutons, cartes, responsive (palette or/violet DWC)
- `css/dwc.css` — nav pilule flottante, halos, cartes services « uv-card », projets, contact, FAQ, formulaire
- `css/sparkle-btn.css` / `css/animated-btn.css` — CTA animés (structure Uiverse.io, recolorés)
- `js/nav.js` — menu mobile, lien actif, reveal au scroll, année footer, init Lucide + dégradé icônes, envoi du formulaire (mailto / wa.me)
- `js/home.js` — compteur animé des stats + parallaxe halos

Aucun prix inventé : tous les tarifs affichés sont « Sur devis ». Les projets listés sont des exemples de missions types, sans statistiques inventées.