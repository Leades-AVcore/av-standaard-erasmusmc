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

`Producten/Dashboard_online`

Na publiceren opent de app direct op de online URL.

## Terugkoppeling verwerken

Vraag stakeholders om na het spelen op `Opslaan & delen` te klikken. Zij sturen dan een JSON-bestand terug. Dat bestand kan later worden geimporteerd of vergeleken met de lokale basis.

## Online basiswerkbestand bijwerken

Als de online speelversie een nieuwe standaardopstelling moet krijgen, gebruik dan een JSON-export uit het dashboard als nieuw basisbestand.

Dat kan een export zijn van:

- jouw lokale werkversie;
- een online versie waar jij zelf wijzigingen in hebt gedaan;
- een JSON-bestand dat een stakeholder via `Opslaan & delen` heeft teruggestuurd.

Gebruik daarna vanuit deze map:

```sh
node tools/update-online-workbestand.mjs ~/Downloads/pve_dashboard_naam_export.json --push
```

Wat dit script doet:

- het gekozen JSON-bestand wordt gecontroleerd;
- het huidige online basisbestand wordt lokaal geback-upt in `.online-backups`;
- `pve_werkbestand_basis.json` wordt vervangen door de gekozen export;
- de app-versie wordt verhoogd in `app.js`;
- de wijziging wordt gecommit;
- `main` en `gh-pages` worden gepusht naar GitHub.

Door de app-versie te verhogen krijgen ook eerdere bezoekers automatisch de nieuwe basisopstelling. Zonder deze stap zouden zij mogelijk hun oude browseropslag blijven zien.

Na de push staat de nieuwe versie op:

`https://leades-avcore.github.io/av-standaard-erasmusmc/`

GitHub Pages kan nog enkele minuten cache gebruiken. Als de oude versie zichtbaar blijft, ververs de pagina hard of open de site in een nieuw privevenster.
