# Dashboard AV-standaard Erasmus MC

Het dashboard gebruikt een eenvoudig drie-stappenmodel:

1. Input en eisen
2. Uitwerking en oplossing
3. Product

De centrale gegevens staan in `pve_werkbestand_basis.json`. Het zichtbare dashboard gebruikt 25 samengevatte eisen, 12 uitwerkingen met een passende oplossing en de concrete producten. De 62 oorspronkelijke inputitems blijven in hetzelfde JSON-bestand bewaard onder `sourceItems`.

## Online speelversie

Deze repository is de deelbare online kopie. Stakeholders kunnen eisen, uitwerkingen, producten en koppelingen aanpassen. Hun wijzigingen blijven in hun eigen browser staan totdat zij via `Opslaan & delen` een JSON-export maken.

De lokale versie blijft het centrale werkbestand. Een bijgewerkt lokaal JSON-bestand kan met het publicatiescript als nieuwe online basis worden ingesteld.

Zie `ONLINE_PUBLICEREN.md` voor de werkwijze.

## Bestanden

- `index.html`: gebruikersinterface
- `app.js`: gedrag, bewerking, koppelingen, logging en export
- `styles.css`: visuele vormgeving
- `pve_werkbestand_basis.json`: centraal werkbestand
- `basisindeling_driestappenmodel.md`: leesbaar overzicht van uitwerkingen en producten
- `tools/update-online-workbestand.mjs`: vervangt en publiceert de online basis
