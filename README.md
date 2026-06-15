# Dashboard AV-standaard Erasmus MC

Het dashboard gebruikt een eenvoudig drie-stappenmodel:

1. Input en eisen
2. Uitwerking en oplossing
3. Product

De centrale gegevens staan in `pve_werkbestand_basis.json`. Het zichtbare dashboard gebruikt 25 samengevatte eisen, 12 uitwerkingen met een passende oplossing en de concrete producten. De 62 oorspronkelijke inputitems blijven in hetzelfde JSON-bestand bewaard onder `sourceItems`.

## Nieuwe input verwerken

1. Plaats nieuwe bronbestanden in de map `Input`.
2. Analyseer de nieuwe input zonder de oorspronkelijke tekst te wijzigen.
3. Voeg de oorspronkelijke uitspraak toe aan `sourceItems`.
4. Koppel de uitspraak aan een bestaande samengevatte eis of voeg een nieuwe eis toe.
5. Koppel de eis aan een passende uitwerking of maak een nieuwe uitwerking met oplossing.
6. Koppel een concreet opgeleverd product zodra dit beschikbaar is.
7. Voer `node tools/generate-simple-outputs.mjs` uit om de leesbare centrale lijsten opnieuw te genereren.

## Historie

De vorige vijf-stappenopzet en reservebestanden staan in `archief_vijfstappen`. Deze bestanden zijn alleen voor herleidbaarheid en worden niet meer door het dashboard gebruikt.

## Bestanden

- `index.html`: gebruikersinterface
- `app.js`: gedrag, bewerking, koppelingen, logging en export
- `styles.css`: visuele vormgeving
- `pve_werkbestand_basis.json`: centraal werkbestand
- `basisindeling_driestappenmodel.md`: leesbaar overzicht van uitwerkingen en producten
- `tools/migrate-to-three-step-model.mjs`: reproduceerbare omzetting van het oude model
- `tools/generate-simple-outputs.mjs`: genereert de centrale Markdown-overzichten
