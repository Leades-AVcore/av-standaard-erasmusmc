# Werkwijze drie-stappenmodel

## Waarom deze vereenvoudiging?

De eerdere opzet bestond uit wensen, punten, uitwerkingen, oplossingen, standaardonderdelen en producten. Een aantal van deze lagen beschreef vrijwel hetzelfde onderwerp. Daardoor werd de route inhoudelijk correct, maar moeilijk te lezen en te onderhouden.

De nieuwe opzet combineert die informatie zonder de onderbouwing te verwijderen. Hierdoor blijft het proces navolgbaar, maar kan een gebruiker sneller zien wat nodig is, hoe dit wordt opgelost en welk product daaruit volgt.

## Stap 1 - Input en eisen

De oorspronkelijke input komt uit interviews, gesprekken, online formulieren, observaties, analyses en producten. Deze uitspraken worden per onderwerp samengevat tot een korte eis.

Per eis worden alleen deze onderdelen getoond:

- eis;
- soort eis;
- categorie;
- toelichting;
- voortgekomen uit.

De oorspronkelijke uitspraken blijven in het centrale werkbestand staan. Daardoor kan altijd worden teruggezocht waarom een eis is opgenomen.

## Stap 2 - Uitwerking en oplossing

Eisen die inhoudelijk bij elkaar horen worden gekoppeld aan een uitwerking. De uitwerking beschrijft in eenvoudige taal wat het beoogde resultaat is. Direct daaronder staat de passende functionele, technische of organisatorische oplossing.

Hierdoor zijn aparte tabbladen voor oplossingsrichting en AV-standaardonderdeel niet meer nodig. De uitwerking en oplossing vormen samen het inhoudelijke onderdeel van de AV-standaard.

## Stap 3 - Product

Een product is een concrete oplevering waarin een uitwerking werkelijk wordt toegepast, voorbereid of beschreven. Voorbeelden zijn een advies, instructieplatform, ontwerp, prototype of technisch uitvoeringsdocument.

Een product kan aan meerdere uitwerkingen en eisen worden gekoppeld. Het dashboard bevat momenteel het digitale instructie- en ondersteuningsplatform als eerste product.

## Flow

Flow toont dezelfde drie stappen naast elkaar. Een enkele klik accentueert de volledige verbonden route. Met dubbelklikken worden de details geopend. Onderdelen kunnen binnen een kolom worden versleept om de volgorde aan te passen. Een eis kan op een uitwerking worden gesleept om een koppeling te maken; een uitwerking kan op een product worden gesleept.

## Beheer en reproduceerbaarheid

Alle gegevens staan in `pve_werkbestand_basis.json`. Aanpassingen worden lokaal automatisch opgeslagen en in het wijzigingslogboek geregistreerd. Het JSON-werkbestand kan worden geëxporteerd, gedeeld en opnieuw geïmporteerd.

Na inhoudelijke wijzigingen worden de leesbare bestanden opnieuw opgebouwd met:

```bash
node tools/generate-simple-outputs.mjs
```
