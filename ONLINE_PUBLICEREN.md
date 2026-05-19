# Online speelversie publiceren

Deze map is een losse online kopie van het PvE-dashboard. De lokale originele werkmap blijft onaangetast.

## Wat deze versie wel doet

- De app draait volledig statisch met `index.html`, `styles.css`, `app.js` en `pve_werkbestand_basis.json`.
- Stakeholders kunnen de tool openen, items aanpassen, koppelingen leggen en exporteren.
- Wijzigingen worden lokaal opgeslagen in de browser van degene die de tool gebruikt.
- Via `Opslaan & delen` kan iemand een JSON-export maken en terugsturen.

## Wat deze versie niet doet

- Er is geen centrale database.
- Wijzigingen van verschillende stakeholders worden niet automatisch samengevoegd.
- Er is geen login of toegangsbeheer.

Dat is bewust zo gehouden, omdat dit bedoeld is als online speelversie.

## Snel publiceren

De makkelijkste route is een statische host zoals Netlify, Vercel of GitHub Pages.

Voor Netlify kan de inhoud van deze map als site worden geupload. Gebruik dan deze map als publicatiemap:

`pve_dashboard_online`

Na publiceren opent de app direct op de online URL.

## Terugkoppeling verwerken

Vraag stakeholders om na het spelen op `Opslaan & delen` te klikken. Zij sturen dan een JSON-bestand terug. Dat bestand kan later worden geimporteerd of vergeleken met de lokale basis.
