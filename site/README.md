# Site Digital World Coaching

Site vitrine statique — dark mode premium (or + violet), Tailwind CDN + Lucide icons + JS léger.

## Pages
- `index.html` — accueil : hero centré (badge disponibilité, titre gradient, 2 CTA), 3 stats qualitatives, 3 services en vedette, processus 4 étapes, CTA final, footer 4 colonnes
- `services.html` — les 10 services DWC en cartes riches (tarifs « Sur devis » uniquement)
- `projects.html` — l'entreprise : mission / vision / approche, 6 raisons de nous choisir, méthode 4 étapes, publics cibles
- `about.html` — valeurs + domaines d'intervention
- `contact.html` — canaux de contact (placeholders à compléter)

## À compléter avant mise en production
- Téléphone / WhatsApp (placeholders `[à compléter]` dans les footers et sur contact.html)
- Email (idem)
- Optionnel : remplacer le favicon SVG « DW » par le logo définitif

## Structure technique
- `css/main.css` — variables, reset, boutons, cartes, responsive (palette or/violet DWC)
- `css/dwc.css` — nav pilule flottante, halos, cartes services « uv-card », étapes
- `css/sparkle-btn.css` / `css/animated-btn.css` — CTA animés (structure Uiverse.io, recolorés)
- `js/nav.js` — menu mobile, lien actif, reveal au scroll, année footer, init Lucide
- `js/home.js` — compteur animé des stats + parallaxe halos

Aucun prix inventé : tous les tarifs affichés sont « Sur devis ».