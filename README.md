# PvE-dashboard AV-standaard Erasmus MC

Dit dashboard is een lokale werklaag bovenop de centrale eisenlijst:

- Centrale bron: `../centrale_eisenlijst_pve.md`
- Bewerkbaar basiswerkbestand: `pve_werkbestand_basis.json`
- Documentatie groepering: `groepering_uitkomsten_basis.md`
- Actuele basisindeling: `basisindeling_eis_pnt_uit_opl.md`
- Dashboard: `index.html`, `styles.css`, `app.js`
- Lokale opslag: browser `localStorage`
- Uitwisseling: export/import via JSON en export van eisen via CSV

## Doel

Het dashboard ondersteunt de traceerbare workflow van wensen/input naar AV-standaard. De kern is dat de oorspronkelijke input behouden blijft als wens of behoefte. Het onderscheid tussen wens en eis wordt later gemaakt bij de uitwerking, op basis van MoSCoW.

De aanpak is:

1. `WNS` wensen/input vastleggen of aanvullen.
2. `UIT` wensen vertalen naar functionele, technische of organisatorische uitwerkingen.
3. MoSCoW toepassen op de uitwerking, niet op de oorspronkelijke input.
4. `OPL` oplossingen koppelen als oplossingsrichtingen.
5. `STD` oplossingen bundelen tot praktische AV-standaardonderdelen.

Analyse en borging staan apart. Die worden later in het proces gebruikt om dekking, ontbrekende koppelingen en wijzigingen te controleren.

In het tabblad `Workflow` staat deze werkwijze per stadium beschreven in gewone procesomschrijvingen.

## Afstemming tot nu toe

De volgende onderdelen zijn inmiddels vastgelegd in de documentatie:

- [x] MoSCoW-indeling afgestemd met Cris Borsje, Erik Magré (projectleider IT), Jos en Koen (AVO).
- [x] Uitwerkingen besproken en aangescherpt met Judith (EMC) en Edward (Schaay-AV).
- [x] Technische oplossingen bedacht in een brainstormsessie met Max Broere en Martin Verhoek.
- [x] Vastgelegd dat de AV-standaard nu wordt aangevuld met de laatste input.
- [ ] Definitieve standaardonderdelen vaststellen.
- [ ] Rapport opstellen op basis van de aangevulde standaard.

## Werken met nieuwe input

Gebruik per nieuwe bron dezelfde methode:

1. Verwerk nieuwe bron- of stakeholderinformatie eerst tot een uitgebreide wens/inputregel.
2. Koppel de wens/input aan een bestaande of nieuwe `Uitwerking`.
3. Pas `Must`, `Should` of `Could` toe op de uitwerking.
4. Koppel uitwerkingen aan `Oplossingen`.
5. Bundel oplossingen tot `AV-standaardonderdelen`.
6. Controleer in `Flow` of `WNS -> UIT -> OPL -> STD` herleidbaar is.

## Werkbestand en originele eisen

De originele eisenlijst `../centrale_eisenlijst_pve.md` blijft onaangetast. Die lijst is de herleidbare bron voor de formele eisen.

Het dashboard werkt met een bewerkbare kopie in `pve_werkbestand_basis.json`. Daarin staan:

- de originele input als wensen/input in dashboardobjecten;
- een eerste voorstel voor hoofditems en subitems via `parentId`;
- een eerste uitkomstenlaag via `outcomes`;
- koppelingen tussen wensen/input, uitwerkingen en oplossingen.
- een standaardlaag via `standardParts`, waarin oplossingen worden gebundeld tot AV-standaardonderdelen.

Bij een lege browseropslag laadt het dashboard automatisch dit basiswerkbestand. Als er al lokale dashboarddata bestaat, blijft die behouden. Gebruik het menu rechtsboven en kies `Opnieuw laden uit werkbestand` om bewust terug te keren naar de huidige basis.

## Wensen/input met subitems

Elke wens/inputregel kan subitems bevatten. Dit is bedoeld om samenhang zichtbaar te maken zonder dat de subitems minder belangrijk worden.

- Voeg een wens/input toe via `Wens/input toevoegen`.
- Sleep een wens/input op een andere wens/input om deze als subitem te koppelen.
- Je kunt de koppeling ook aanpassen via `Bewerk`.
- In de centrale lijst staan subitems ingesprongen onder het item waar ze bij horen.

## Logboek en delen

Bij het openen vraagt het dashboard om een naam. Deze naam wordt gebruikt voor het logboek.

- Elke toevoeging, wijziging, verwijdering, prioriteitswijziging, koppeling, import en export wordt gelogd.
- Gebruik `Opslaan & delen` om een JSON-bestand te downloaden met de volledige dataset en het logboek.
- Dit bestand kan later worden geimporteerd of geanalyseerd om te zien wie wat heeft toegevoegd of aangepast.

## Vier lagen in Flow

De Flow werkt met vier lagen:

- `WNS`: bestaande uitgebreide wensen/input.
- `UIT`: functionele, technische of organisatorische uitwerkingen met MoSCoW.
- `OPL`: oplossingen of oplossingsrichtingen.
- `STD`: AV-standaardonderdelen met prioriteit.

Een wens/inputitem kan aan meerdere uitwerkingen gekoppeld zijn. Een uitwerking kan meerdere wensen/inputitems en meerdere oplossingen bevatten. Een standaardonderdeel kan meerdere oplossingen bundelen.

De standaardonderdelen in het basisbestand zijn opzetjes. Ze zijn bedoeld als concrete starttekst voor de uiteindelijke AV-standaard, maar blijven bewerkbaar. Vul deze later aan met exacte techniekkeuzes, ruimtetypen, beheerafspraken, eigenaar en toetscriteria.

### Koppelen in Flow

In de Flow kun je koppelingen maken door te slepen:

- Sleep een wens/inputitem naar een uitwerking om input te koppelen.
- Sleep een uitwerking naar een oplossing om de oplossing te koppelen.
- Sleep een oplossing naar een standaardonderdeel om de oplossing op te nemen in de AV-standaard.
- Sleep items binnen dezelfde kolom om de handmatige volgorde te bewaren.

Deze visuele manier van koppelen is bewust gekozen. Het maakt sneller duidelijk hoe een wens via een uitwerking en oplossing in de AV-standaard terechtkomt, zonder dat je alles alleen uit tabellen hoeft te halen.

### Volgorde in Flow

De Flow sorteert automatisch op samenhang tussen wensen/input, uitwerkingen en oplossingen. Deze automatische sortering blijft actief zolang er geen handmatige volgorde is ingesteld.

Wil je de automatische volgorde overschrijven, sleep dan een uitkomst of oplossing omhoog of omlaag op een ander item in dezelfde kolom. Vanaf dat moment gebruikt de Flow jouw handmatige volgorde voor die kolom. Deze volgorde wordt opgeslagen in de JSON-export onder `meta.flowOrder`.

Voor overzichtelijkheid toont Flow hoofditems compact. Subitems blijven gekoppeld en zichtbaar in de centrale lijst, maar worden in Flow samengevat met een teller zodat de kolommen beter op elkaar uitgelijnd blijven.

## Sorteren en filteren

In de centrale lijst kun je:

- Sorteren door op een kolomkop te klikken.
- Per kolom filteren in de filterregel onder de kolomkoppen.
- Globaal zoeken met het zoekveld boven de lijst.

## Reproduceerbaarheid

De methode is reproduceerbaar doordat elke stap een eigen object heeft:

- `requirements`: de uitgebreide wensen/input als bronlaag.
- `outcomes`: uitwerkingen met MoSCoW.
- `solutions`: oplossingsrichtingen.
- `standardParts`: onderdelen van de uiteindelijke AV-standaard.
- `sources`: bronmetadata voor herleidbaarheid.
- `requirementIds`, `outcomeIds` en `solutionIds`: koppelingen tussen de zichtbare lagen. `pointIds` kan nog aanwezig zijn als migratie-informatie uit eerdere dashboardversies.
- `meta.flowOrder`: optionele handmatige volgorde voor Flow-weergave.

In Flow hebben de proceslagen, items en verbindingslijnen eigen kleuren. Wensen/input gebruiken de inhoudelijke categorie als kleur, uitwerkingen gebruiken hun uitwerkingstype, oplossingen gebruiken hun oplossingstype en standaardonderdelen gebruiken hun standaardtype. Daardoor blijft een route visueel herleidbaar.

De bestaande Markdown-eisenlijst wordt automatisch ingelezen wanneer er nog geen lokale dashboarddata is opgeslagen. Daarna werkt het dashboard met een lokale kopie en slaat het automatisch op in de browser. Gebruik het menu rechtsboven om een reproduceerbare JSON-snapshot of CSV-export te bewaren.

Bij normaal gebruik ontstaat de actuele werkversie in de browseropslag en via JSON-export. Als een export na review de nieuwe basis moet worden, kan deze bewust worden teruggezet als `pve_werkbestand_basis.json`.

## Starten

Start vanuit de map `Onderzoek` een lokale server:

```sh
python3 -m http.server 4173
```

Open daarna:

```text
http://localhost:4173/pve_dashboard/
```

Gebruik bij voorkeur een lokale server in plaats van direct openen als bestand, omdat de app de Markdown-eisenlijst via `fetch` inleest.

## Belangrijke afspraak

Het dashboard is bedoeld als werk- en analyseomgeving. Definitieve eisen moeten na review ook worden bijgewerkt in `centrale_eisenlijst_pve.md`, zodat het centrale bronbestand de formele bron blijft voor rapportage en latere HTML-export.
