# Site Digital World Coaching

Site vitrine statique — **identité Stitch DWC v3 : noir café chaud `#0E0C09` + or chaud `#E5B44C`** (zéro bleu, zéro violet), Space Grotesk + Inter, icônes Lucide, JS vanilla léger.

## Pages
- `index.html` — accueil (design Stitch `home`) : nav pilule flottante, hero (badge disponibilité, titre dégradé or→bronze, 2 CTA, garanties), 3 stats glass, 3 services phares (cartes complètes), 4 étapes, projets & réalisations (3 cas avec encadré « Résultat obtenu »), CTA final, footer 4 colonnes
- `services.html` — catalogue officiel des 10 services DWC : filtres de catégories interactifs (Académique / IA & Tech / Création & Média / Business & Infrastructure), 10 cartes riches + carte pleine largeur « Impression », arguments sur devis, CTA
- `detail.html` — page détail de service **Formation Intelligence Artificielle** : breadcrumb, hero + méta-badges (format / durée / lieu / certification), carte insignia, 4 modules d'apprentissage, profils cibles, livrables, tarification sur devis + formulaire express (WhatsApp), FAQ accordéon, CTA contacts
- `detail-coaching.html` — 2e page détail (template varié) **Coaching Mémoire & Thèse** : 4 phases jalonnées, profils, kit livrables, devis sur mesure, FAQ spécifique
- `projet.html` — l'entreprise (design Stitch `projet`) : hero institutionnel + 4 indicateurs d'impact, mission / vision, 4 piliers d'excellence, méthode DWC en 4 étapes, publics accompagnés, 6 études de cas, CTA
- `contact.html` — cartes contact cliquables (WhatsApp / email / téléphone / localisation Google Maps), protocole 3 étapes + citation, formulaire complet (mailto ou wa.me, sans backend), 5 FAQ accordéon, bandeau Hub Haie Vive

## Coordonnées (fictives, remplaçables)
- Email : `contact@digitalworldcoaching.com` (liens `mailto:`)
- WhatsApp / Téléphone : `+229 01 97 00 00 00` (`https://wa.me/22997000000`, `tel:+22997000000`)
- Localisation : Haie Vive, Cotonou, Bénin (visite sur RDV)
- Valeurs centralisées dans `js/nav.js` (constantes `DWC_EMAIL`, `DWC_PHONE_HREF`, `DWC_WA_NUMBER`).

## Palette Stitch (tokens dans `css/main.css`)
- Fond `#0E0C09`, surface `#17130D`, surface dim `#151310`, surface elevated `#1E1913`, icon-bg `#241C11`
- Or chaud `#E5B44C`, or clair `#F2D492` / `#FFD174`, bronze `#B97F35` — dégradés **or→bronze uniquement**
- Textes `#F7F2E7` / `#B3A88F` / `#E8E1DB`, outline `#4F4636` / `#9B8F7D`
- Interdits : bleu, violet, gradients or→violet

## Structure technique
- `assets/logo.svg` — monogramme « DW » (anneau dégradé or → bronze sur fond noir café), `assets/favicon.svg` — dérivé 64 px
- `css/main.css` — unique feuille : tokens Stitch, reset, nav pilule, boutons, cartes, formulaires, FAQ, footer, reveal au scroll
- `js/nav.js` — menu mobile burger, lien actif, reveal au scroll, compteurs animés, init `lucide.createIcons()`, envoi du formulaire contact (mailto / wa.me), année footer
- Icônes : **Lucide uniquement** via CDN `unpkg.com/lucide@latest` (`data-lucide`), aucune police d'icônes tierce, aucun emoji

## Aucun prix inventé
Tous les tarifs affichés sont « Sur devis ». Les projets listés sont des missions types, les contacts sont fictifs réalistes.