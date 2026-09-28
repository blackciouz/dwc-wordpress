# Site Digital World Coaching

Site vitrine statique — **identité bleu nuit `#0A1428` + bleu vif `#3B82F6` + blanc** (aucun marron/or/beige), Space Grotesk + Inter, icônes Lucide, JS vanilla léger.

## Pages
- `index.html` — accueil : nav pilule flottante, hero, 3 stats glass, 3 services phares (cartes éditoriales 100% cliquables), 4 étapes, réalisations, CTA, footer
- `services.html` — catalogue officiel des 10 services : filtres de catégories interactifs, **10 cartes design éditorial 100% cliquables** (numérotation 01-10, médaillon fin Lucide, kicker catégorie, outils au texte séparés de points médians, footer Sur devis + CTA lien), arguments sur devis, CTA
- `services/*.html` — **10 pages services uniques** (une par service) : breadcrumb, hero icône + badge + 4 méta-cartes, carte insignia, marquee stack, modules (timeline animée), « pour qui », livrables, tarification sur devis + formulaire express (WhatsApp), FAQ accordéons, CTA contacts, footer avec les 10 services liés
- `projet.html` — l'entreprise : hero institutionnel, indicateurs, mission/vision, piliers, méthode, publics, études de cas, CTA
- `contact.html` — cartes contact cliquables, protocole, formulaire complet (mailto / wa.me), 5 FAQ, bandeau Hub Haie Vive

## Cartes services (design éditorial v8, 100% cliquables)
- La carte entière est un `<a href="services/<slug>.html">` — le « Voir → » n'est qu'un indicateur : tout est cliquable.
- Hover : élévation douce -3px + bordure bleue + numéro d'ordre mis en avant ; médaillon fin (Lucide).
- CSS dans `css/main.css` section 20 (`.svc-*`) — direction éditoriale propre DWC v8 : numérotation 01-10, kicker catégorie, outils au texte, zéro poster 16:9.

## Les 10 services (URLs propres)
| # | Service | Page |
|---|---------|------|
| 1 | Coaching rédaction de mémoire | `services/coaching-memoire.html` |
| 2 | Formation intelligence artificielle | `services/formation-ia.html` |
| 3 | Contenus réseaux sociaux | `services/contenus-reseaux.html` |
| 4 | Création & monétisation de chaînes YouTube/TikTok | `services/monetisation-youtube.html` |
| 5 | Formation informatique appliquée | `services/informatique-appliquee.html` |
| 6 | Graphisme | `services/graphisme.html` |
| 7 | Marketing digital | `services/marketing-digital.html` |
| 8 | Développement web | `services/developpement-web.html` |
| 9 | Maintenance informatique | `services/maintenance-informatique.html` |
| 10 | Impression numérique | `services/impression-numerique.html` |

## Coordonnées (fictives, remplaçables)
- Email : `contact@digitalworldcoaching.com` (liens `mailto:`)
- WhatsApp / Téléphone : `+229 01 97 00 00 00` (`https://wa.me/22997000000`, `tel:+229****0000`)
- Localisation : Haie Vive, Cotonou, Bénin (visite sur RDV)
- Valeurs centralisées dans `js/nav.js` (constantes `DWC_EMAIL`, `DWC_PHONE_HREF`, `DWC_WA_NUMBER`).

## Palette (tokens dans `css/main.css`)
- Fond `#0A1428`, surface `#101E38`, surface-card `#122140`, icon-bg `#152A4A`
- Bleu vif `#3B82F6`, bleu clair `#93C5FD`, outline `#2B4C7E` / `#B9D1F0`
- Textes `#F5F9FF` / `#C3D7F2` / `#EAF2FF` — dégradés bleu uniquement
- Interdits : marron, or, beige

## Structure technique
- `assets/logo.svg` — monogramme DW, `assets/favicon.svg` — dérivé 64 px
- `css/main.css` — tokens bleu nuit + sections composants (+ section 20 : cartes éditoriales) ; `css/anim.css` — couche animations (aurora, reveal, tilt, sparkle, beam)
- `js/nav.js` — menu mobile, lien actif, compteurs, init Lucide, formulaire contact
- `js/anim.js` — reveal stagger, tilt (désactivé au tactile), spotlight, FLIP filtres services, FAQ animées, marquee
- Icônes : **Lucide uniquement** via CDN `unpkg.com/lucide@latest` (`data-lucide`), aucune police d'icônes tierce, aucun emoji
