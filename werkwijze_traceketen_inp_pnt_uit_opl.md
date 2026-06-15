# Werkwijze traceketen WNS -> UIT -> OPL -> STD -> PRD

Deze dashboardversie gebruikt een vijflaagse traceketen. Het doel is dat iedere stap van stakeholderinput naar AV-standaard en concreet product navolgbaar blijft. De originele input wordt niet herschreven en wordt eerst behandeld als wens of behoefte.

De aanpak is om steeds een laag concreter te worden. Eerst wordt vastgelegd wat uit de bronnen komt. Daarna wordt de input vertaald naar uitwerkingen, gekoppeld aan oplossingen en uiteindelijk uitgewerkt tot standaardonderdelen.

1. `WNS` Wensen/input  
   De bestaande uitgebreide input blijft de inputlaag. Nieuwe stakeholderinformatie wordt eerst verwerkt tot een wens/inputregel.

2. `UIT` Uitwerking  
   Functionele, technische of organisatorische uitwerking waarop MoSCoW wordt toegepast.

3. `OPL` Oplossing  
   Oplossingsrichting die een of meerdere uitwerkingen kan invullen.

4. `STD` AV-standaardonderdeel  
   Beslisbare bouwsteen van de uiteindelijke AV-standaard, met prioriteit.

5. `PRD` Product
   Concreet advies, prototype, rapport of implementatieonderdeel dat een deel van de standaard uitwerkt.

## Beschrijving per stadium

De eerste laag is `WNS`. Hier blijft de oorspronkelijke input staan zoals die uit interviews, analyses en eerdere eisen is verwerkt. Deze input is bewust uitgebreider geformuleerd, omdat de herkomst en onderbouwing later controleerbaar moeten blijven.

De tweede laag is `UIT`. Wensen/input worden hier vertaald naar korte functionele, technische of organisatorische uitwerkingen. Dit is de laag waarop MoSCoW wordt toegepast en waarop het onderscheid tussen wens, eis en optionele verbetering ontstaat.

Vervolgens worden uitwerkingen gekoppeld aan `OPL`. Een oplossing beschrijft welke richting, techniek, beheerafspraak of inrichting nodig is om een of meerdere uitwerkingen praktisch in te vullen.

In `STD` worden oplossingen gebundeld tot concrete standaardonderdelen. Deze onderdelen vormen de opzet voor de uiteindelijke AV-standaard en krijgen een prioriteit, status en verdere invulruimte.

De productlaag `PRD` laat zien welke onderdelen al concreet zijn uitgewerkt. Een product krijgt een bestandslocatie, status, validatie en vervolgstap. Het instructie- en ondersteuningsplatform is als eerste product opgenomen.

## Afstemming en status

De MoSCoW-indeling is afgestemd met Cris Borsje, Erik Magré (projectleider IT), Jos en Koen (AVO). De uitwerkingen zijn besproken met Judith (EMC) en Edward (Schaay-AV). De technische oplossingen zijn in een brainstormsessie bedacht met Max Broere en Martin Verhoek.

De Flow is toegevoegd om dit praktisch en zichtbaar te maken. Nieuwe items kunnen eerst eenvoudig worden toegevoegd en daarna met lijnen worden gekoppeld. Daardoor blijft de route van wens naar standaard makkelijk te volgen en kan later sneller worden gecontroleerd of een belangrijk onderdeel nog niet goed is uitgewerkt.

De AV-standaard wordt momenteel aangevuld met de laatste input. Daarna wordt het rapport opgesteld op basis van de aangevulde standaard en de navolgbare koppelingen in het dashboard.

- [x] Betrokkenen bij MoSCoW vastgelegd.
- [x] Afstemming van uitwerkingen vastgelegd.
- [x] Brainstorm technische oplossingen vastgelegd.
- [ ] AV-standaard aanvullen met laatste input.
- [ ] Definitieve standaardonderdelen en rapport uitwerken.

## Praktische volgorde

1. Begin bij nieuwe input en controleer of de oorspronkelijke formulering compleet genoeg is.
2. Koppel de wens/input aan een bestaande of nieuwe uitwerking.
3. Maak een uitwerking die beschrijft wat functioneel, technisch of organisatorisch nodig is.
4. Geef de uitwerking een MoSCoW-prioriteit.
5. Koppel een of meerdere oplossingen die de uitwerking invullen.
6. Bundel oplossingen tot een standaardonderdeel.
7. Koppel uitgewerkte producten aan de relevante standaardonderdelen.
8. Controleer in Flow of de hele route terug te volgen is.

## Reproduceerbare verwerking

1. Verwerk nieuwe broninformatie tot een uitgebreide wens/inputregel als `WNS`.
2. Koppel iedere wens/inputregel aan een of meerdere uitwerkingen als `UIT`.
3. Pas MoSCoW toe op de uitwerking, niet op de oorspronkelijke input.
4. Koppel uitwerkingen aan oplossingen als `OPL`.
5. Bundel oplossingen tot standaardonderdelen als `STD`.
6. Registreer concrete producten als `PRD`.
7. Controleer in Flow of alle wensen/input via uitwerkingen en oplossingen naar standaardonderdelen en producten herleidbaar zijn.

Analyse en borging volgen later in het proces. Analyse wordt gebruikt om dekking en ontbrekende koppelingen te controleren. Borging wordt gebruikt om het werkbestand en het wijzigingslogboek vast te leggen en te delen.

## Centraal bestand

Alle werkdata staat in:

`Producten/Dashboard_lokaal/pve_werkbestand_basis.json`

De actieve workflow gebruikt:

- `requirements` voor `WNS`, de uitgebreide wensen/input.
- `outcomes` voor `UIT`, de functionele of technische uitwerkingen.
- `solutions` voor `OPL`, de oplossingen.
- `standardParts` voor `STD`, de AV-standaardonderdelen.
- `products` voor `PRD`, de concrete opleveringen.
- `sources` voor bronmetadata en herleidbaarheid.

## Automatische voorstellen

Bij de migratie is de bestaande inhoud behouden:

- bestaande input is behouden als `WNS`;
- bestaande uitkomsten zijn behouden als `UIT`;
- bestaande oplossingen zijn behouden als `OPL`;
- standaardonderdelen zijn voorgesteld als `STD`;
- het instructieplatform is opgenomen als `PRD-001`;
- koppelingen zijn gevuld via `requirementIds`, `pointIds`, `outcomeIds` en `solutionIds`.

Deze voorstellen zijn bewerkbaar in het dashboard.
