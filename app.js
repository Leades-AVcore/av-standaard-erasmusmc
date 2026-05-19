const STORAGE_KEY = "emc_av_pve_dashboard_online_clone_v1";
const PREVIOUS_STORAGE_KEYS = [];
const INTRO_STORAGE_KEY = "emc_av_pve_dashboard_online_intro_seen_v1";
const WORKFILE_PATH = "pve_werkbestand_basis.json";
const MARKDOWN_PATH = "../centrale_eisenlijst_pve.md";
const APP_BASE_FILE_VERSION = "2026-05-18-wens-uitwerking-standaard";

const categories = [
  "Functionele eisen",
  "Gebruikseisen",
  "Technische eisen",
  "Beheereisen",
  "Monitoringseisen",
  "Ondersteuning en instructie",
  "Toekomst en innovatie"
];

const priorities = ["Must", "Should", "Could"];
const categoryColors = {
  "Functionele eisen": "#19a7ce",
  "Gebruikseisen": "#8b5cf6",
  "Technische eisen": "#f97316",
  "Beheereisen": "#16a34a",
  "Monitoringseisen": "#2563eb",
  "Ondersteuning en instructie": "#d946ef",
  "Toekomst en innovatie": "#64748b"
};
const layerColors = {
  requirement: "#19a7ce",
  point: "#f59e0b",
  outcome: "#8b5cf6",
  solution: "#16a34a",
  standard: "#e11d48"
};
const typeColors = {
  Functioneel: categoryColors["Functionele eisen"],
  Gebruik: categoryColors["Gebruikseisen"],
  Technisch: categoryColors["Technische eisen"],
  Beheer: categoryColors["Beheereisen"],
  Monitoring: categoryColors["Monitoringseisen"],
  Ondersteuning: categoryColors["Ondersteuning en instructie"],
  Innovatie: categoryColors["Toekomst en innovatie"],
  Ontwerp: "#0f766e",
  Proces: "#65a30d",
  Instructie: categoryColors["Ondersteuning en instructie"],
  Standaard: layerColors.standard
};
const workflowIntro = {
  title: "Documentatie van het ontwerpproces",
  intro: "Dit dashboard beschrijft en bewaakt de route van opgehaalde input naar een onderbouwde AV-standaard. Flow is de startpagina, omdat daar direct zichtbaar is hoe wensen, uitwerkingen, oplossingen en standaardonderdelen met elkaar verbonden zijn.",
  approach: "De vier inhoudelijke tabbladen zijn bedoeld voor detailwerk: input vastleggen, uitwerkingen aanscherpen, oplossingen koppelen en standaardonderdelen invullen. In Flow controleer ik vervolgens of de route van links naar rechts klopt.",
  principle: "Het onderscheid tussen wens en eis ontstaat bij de uitwerking. De MoSCoW-indeling is besproken met Cris Borsje, Erik Magré, Jos en Koen, zodat niet alleen mijn interpretatie leidend is."
};

const workflow = [
  {
    title: "Input verzamelen",
    code: "WNS",
    description: "In deze stap wordt alle opgehaalde informatie vastgelegd als input, wens of behoefte. De input komt uit interviews, online reacties, gesprekken, observaties, inventarisatie en data-analyse. Op dit moment wordt nog niet bepaald of iets een harde eis wordt. Per inputitem wordt vastgelegd waar de informatie vandaan komt, zoals bron, stakeholderrol, context en korte toelichting. Resultaat: overzicht van alle opgehaalde wensen en signalen, herleidbare koppeling naar bron en stakeholder, en basis voor verdere uitwerking."
  },
  {
    title: "Input uitwerken",
    code: "UIT",
    description: "In deze stap wordt losse input vertaald naar een duidelijke uitwerking. De oorspronkelijke opmerking blijft behouden, maar wordt inhoudelijk scherper gemaakt. Dit kan functioneel, technisch of organisatorisch zijn. Een voorbeeld is input over traag opstartende ruimtes: verschillende opmerkingen worden samengebracht tot de behoefte dat een ruimte snel, voorspelbaar en met zo min mogelijk handelingen moet kunnen opstarten. Resultaat: duidelijke uitwerkingen, minder dubbele input en een betere basis voor prioritering en ontwerp."
  },
  {
    title: "MoSCoW prioriteren",
    code: "MSC",
    description: "In deze stap krijgt de uitgewerkte behoefte een MoSCoW-prioriteit. De prioriteit wordt dus niet gekoppeld aan losse input, maar aan de inhoudelijke uitwerking. Dit voorkomt dat een losse opmerking te zwaar of juist te licht wordt beoordeeld. Een Must gaat richting harde eis, een Should is belangrijk maar niet altijd verplicht, en een Could is wenselijk of toekomstgericht. Resultaat: prioritering per uitgewerkte behoefte en een onderbouwd onderscheid tussen eis, wens en optie."
  },
  {
    title: "Oplossingsrichting koppelen",
    code: "OPL",
    description: "In deze stap wordt per uitgewerkte behoefte een mogelijke oplossing gekoppeld. Hiermee wordt de stap gemaakt van wat nodig is naar hoe dit opgelost kan worden. De oplossing kan technisch, organisatorisch of procesmatig zijn, zoals een standaard bedienconcept, vaste pc met standaard startprofiel, netwerkgebonden AV-apparatuur, centrale registratie of monitoring. Resultaat: oplossing per uitgewerkte behoefte, eerste vertaling naar techniek en beheer, en toetsing op uitvoerbaarheid."
  },
  {
    title: "Vertalen naar AV-standaard",
    code: "STD",
    description: "In deze stap wordt de oplossingsrichting vertaald naar een concreet onderdeel van de AV-standaard. Dit onderdeel moet bruikbaar zijn voor ontwerp, inrichting, beheer en toetsing. Een standaardonderdeel beschrijft niet alleen techniek, maar ook hoe de oplossing bijdraagt aan gebruiksgemak, betrouwbaarheid, beheerbaarheid en standaardisatie. Resultaat: concept standaardonderdelen, basis voor het Programma van Eisen en basis voor het technische ontwerp."
  },
  {
    title: "Controleren van koppelingen",
    code: "FLW",
    description: "In deze stap wordt gecontroleerd of alle onderdelen logisch aan elkaar gekoppeld zijn. In het dashboard is zichtbaar of input nog geen uitwerking heeft, of een uitwerking nog geen oplossing heeft, of een oplossing nog niet is vertaald naar een standaardonderdeel. Resultaat: inzicht in ontbrekende koppelingen, controle op volledigheid en betere onderbouwing van ontwerpkeuzes."
  },
  {
    title: "Borging en documentatie",
    code: "DOC",
    description: "In deze stap wordt het dashboard gebruikt als onderbouwing en borging van het ontwerpproces. Het dashboard maakt zichtbaar welke keuzes zijn gemaakt en waarop deze keuzes zijn gebaseerd. Dit helpt mijzelf en anderen die later met de AV-standaard verder werken. Resultaat: herleidbare ontwerpkeuzes, overdraagbaar werkbestand en onderbouwing voor rapportage, PvE en vervolgontwerp."
  }
];

const workflowDocumentation = {
  title: "Gebruik van dit tabblad",
  description: "Dit tabblad is de documentatieplek van het dashboard. De inhoudelijke bewerking gebeurt in de vier tabbladen Wensen/input, Uitwerkingen, Oplossingen en AV-standaard. Flow is bedoeld als startpunt en controlebord."
};

const laterWorkflow = [
  {
    title: "Dekking analyseren",
    code: "ANL",
    description: "Later in het proces wordt gecontroleerd of alle wensen/input via uitwerkingen terugkomen in oplossingen en standaardonderdelen. De analyse helpt om ontbrekende koppelingen, open Must-uitwerkingen en dekking zichtbaar te maken."
  },
  {
    title: "Borgen en delen",
    code: "LOG",
    description: "Wanneer de inhoud verder is aangescherpt, wordt het werkbestand inclusief wijzigingslogboek opgeslagen en gedeeld. Daarmee blijft het proces reproduceerbaar en kan worden nagegaan wie welke aanpassing heeft gedaan."
  }
];

const defaultProcessText = {
  input: {
    title: "1. Input verzamelen",
    description: "In deze stap wordt alle opgehaalde informatie vastgelegd als input, wens of behoefte. De input komt uit interviews, online reacties, gesprekken, observaties, inventarisatie en data-analyse. Per inputitem wordt vastgelegd waar de informatie vandaan komt, zoals bron, stakeholderrol, context en korte toelichting. Het resultaat is een overzicht van alle opgehaalde wensen en signalen, met herleidbare koppeling naar bron en stakeholder."
  },
  outcome: {
    title: "2 en 3. Input uitwerken en MoSCoW prioriteren",
    description: "In deze stap wordt losse input vertaald naar een duidelijke functionele, technische of organisatorische uitwerking. De oorspronkelijke opmerking blijft behouden, maar wordt inhoudelijk scherper gemaakt. Daarna krijgt de uitgewerkte behoefte een MoSCoW-prioriteit. De prioriteit wordt dus niet gekoppeld aan de losse input, maar aan de onderliggende behoefte. Dit geeft een duidelijk onderscheid tussen eis, wens en optie."
  },
  solution: {
    title: "4. Oplossingsrichting koppelen",
    description: "In deze stap wordt per uitgewerkte behoefte een mogelijke oplossing gekoppeld. Hiermee wordt de stap gemaakt van wat nodig is naar hoe dit opgelost kan worden. De oplossing kan technisch, organisatorisch of procesmatig zijn, bijvoorbeeld een standaard bedienconcept, vaste pc met standaard startprofiel, netwerkgebonden AV-apparatuur, centrale registratie of monitoring."
  },
  standard: {
    title: "5. Vertalen naar AV-standaard",
    description: "In deze stap wordt de oplossingsrichting vertaald naar een concreet onderdeel van de AV-standaard. Dit onderdeel moet bruikbaar zijn voor ontwerp, inrichting, beheer en toetsing. Het beschrijft niet alleen techniek, maar ook de bijdrage aan gebruiksgemak, betrouwbaarheid, beheerbaarheid en standaardisatie."
  },
  flow: {
    title: "6. Controleren van koppelingen",
    description: "In deze stap wordt gecontroleerd of alle onderdelen logisch aan elkaar gekoppeld zijn. In Flow is zichtbaar of input nog geen uitwerking heeft, of een uitwerking nog geen oplossing heeft, of een oplossing nog niet is vertaald naar een standaardonderdeel. Klik op een item om de route te accentueren; dubbelklik om details te openen."
  }
};

function migrateProcessText(processText) {
  const migrated = { ...processText };
  Object.entries(defaultProcessText).forEach(([key, valueToUse]) => {
    if (!migrated[key]?.title || !/^\d/.test(migrated[key].title)) {
      migrated[key] = { ...valueToUse };
    }
  });
  if (migrated.outcome?.description && !migrated.outcome.description.includes("onderliggende behoefte") && /stakeholders|MoSCoW|Erik Margre|Erik Magré/.test(migrated.outcome.description)) {
    migrated.outcome = { ...defaultProcessText.outcome };
  }
  if (migrated.solution?.description && !migrated.solution.description.includes("Max Broere") && /Schaay-AV|Oplossingen maken/.test(migrated.solution.description)) {
    migrated.solution = { ...defaultProcessText.solution };
  }
  if (migrated.standard?.description && !migrated.standard.description.includes("laatste input") && /bouwstenen|opzetjes|toetscriteria/.test(migrated.standard.description)) {
    migrated.standard = { ...defaultProcessText.standard };
  }
  return migrated;
}

let state = {
  meta: {
    project: "Uniforme AV-standaard Erasmus MC",
    updatedAt: new Date().toISOString(),
    actor: "",
    flowOrder: {
      inputs: [],
      points: [],
      requirements: [],
      outcomes: [],
      solutions: [],
      standardParts: []
    },
    processText: defaultProcessText
  },
  inputs: [],
  points: [],
  sources: [],
  wishes: [],
  requirements: [],
  outcomes: [],
  solutions: [],
  standardParts: [],
  logs: []
};

let editing = null;
let linkingRequirementId = null;
let draggedRequirementId = null;
let draggedTraceItem = null;
let suppressFlowClick = false;
let selectedFlowItem = null;
let flowClickTimer = null;
let sortState = { key: "order", direction: "asc" };
let columnFilters = {
  id: "",
  kind: "",
  priority: "",
  title: "",
  category: "",
  source: "",
  linked: ""
};
const els = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  bindEvents();
  await loadState();
  renderAll();
  window.setTimeout(showIntroIfNeeded, 250);
}

function cacheElements() {
  [
    "saveState", "actorLabel", "shareExportBtn", "fileMenuButton", "fileMenu", "exportJsonBtn", "exportCsvBtn", "openAnalysisBtn", "importJsonInput", "resetLocalBtn", "publishOnlineBtn",
    "inputDrawerButton", "inputDrawer", "drawerShade", "closeDrawerBtn", "addSourceBtn", "sourceList",
    "totalItems", "totalRequirements", "mustRequirements", "linkedRequirements", "totalStandardParts",
    "searchInput", "kindFilter", "categoryFilter", "priorityFilter", "centralList",
    "addWishBtn", "addRequirementBtn", "addInputBtn", "addPointBtn", "workflowSteps", "inputCards", "pointCards", "addOutcomeBtn", "outcomeCards", "addSolutionBtn", "solutionCards", "addStandardPartBtn", "standardPartCards", "flowChart", "analysisGrid",
    "editDialog", "editForm", "dialogTitle", "dialogFields", "deleteDialogBtn", "saveDialogBtn", "closeEditDialogBtn",
    "linkDialog", "linkForm", "linkRequirementLabel", "existingSolutionSelect", "newSolutionName", "newSolutionDescription", "saveLinkBtn", "closeLinkDialogBtn",
    "actorDialog", "actorForm", "actorNameInput", "saveActorBtn", "introDialog", "closeIntroDialogBtn", "startIntroDialogBtn", "toast"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  document.querySelectorAll(".tab[data-tab]").forEach((tab) => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  els.fileMenuButton.addEventListener("click", () => {
    els.fileMenu.hidden = !els.fileMenu.hidden;
  });

  document.addEventListener("click", (event) => {
    if (!els.fileMenu.contains(event.target) && !els.fileMenuButton.contains(event.target)) {
      els.fileMenu.hidden = true;
    }
  });

  els.exportJsonBtn.addEventListener("click", exportJson);
  els.shareExportBtn.addEventListener("click", exportSharePackage);
  els.exportCsvBtn.addEventListener("click", exportRequirementsCsv);
  if (els.openAnalysisBtn) els.openAnalysisBtn.addEventListener("click", () => {
    els.fileMenu.hidden = true;
    switchTab("analysis");
  });
  els.importJsonInput.addEventListener("change", importJson);
  els.resetLocalBtn.addEventListener("click", resetFromWorkfile);
  if (els.publishOnlineBtn) els.publishOnlineBtn.addEventListener("click", publishOnlineWorkfile);

  els.inputDrawerButton.addEventListener("click", openDrawer);
  els.closeDrawerBtn.addEventListener("click", closeDrawer);
  els.drawerShade.addEventListener("click", closeDrawer);
  els.addSourceBtn.addEventListener("click", () => openEditor("source"));

  if (els.addWishBtn) els.addWishBtn.addEventListener("click", () => openEditor("wish"));
  if (els.addRequirementBtn) els.addRequirementBtn.addEventListener("click", () => openEditor("requirement"));
  if (els.addInputBtn) els.addInputBtn.addEventListener("click", () => openEditor("input"));
  if (els.addPointBtn) els.addPointBtn.addEventListener("click", () => openEditor("point"));
  els.addOutcomeBtn.addEventListener("click", () => openEditor("outcome"));
  els.addSolutionBtn.addEventListener("click", () => openEditor("solution"));
  if (els.addStandardPartBtn) els.addStandardPartBtn.addEventListener("click", () => openEditor("standardPart"));

  [els.searchInput, els.kindFilter, els.categoryFilter, els.priorityFilter].forEach((control) => {
    control.addEventListener("input", renderCentralList);
  });

  els.editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveEditor();
  });

  els.deleteDialogBtn.addEventListener("click", deleteEditingItem);
  els.closeEditDialogBtn.addEventListener("click", () => els.editDialog.close());

  els.linkForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveLink();
  });
  els.closeLinkDialogBtn.addEventListener("click", () => els.linkDialog.close());
  if (els.closeIntroDialogBtn) els.closeIntroDialogBtn.addEventListener("click", closeIntroDialog);
  if (els.startIntroDialogBtn) els.startIntroDialogBtn.addEventListener("click", closeIntroDialog);

  window.addEventListener("resize", () => {
    if (document.getElementById("flow").classList.contains("active")) updateFlowBoard();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && selectedFlowItem) {
      selectedFlowItem = null;
      applyFlowSelection();
      drawTraceLines();
    }
  });

  els.actorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = els.actorNameInput.value.trim();
    if (!name) return;
    state.meta.actor = name;
    logAction("actor:set", "dashboard", "Gebruiker ingesteld");
    autoSave(false);
    els.actorDialog.close();
    renderStats();
    window.setTimeout(showIntroIfNeeded, 150);
  });
}

function showIntroIfNeeded() {
  if (!els.introDialog || localStorage.getItem(INTRO_STORAGE_KEY)) return;
  if (els.actorDialog?.open || els.editDialog?.open || els.linkDialog?.open || els.introDialog.open) return;
  try {
    els.introDialog.showModal();
  } catch {
    localStorage.setItem(INTRO_STORAGE_KEY, new Date().toISOString());
  }
}

function closeIntroDialog() {
  localStorage.setItem(INTRO_STORAGE_KEY, new Date().toISOString());
  if (els.introDialog?.open) els.introDialog.close();
}

async function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY) || PREVIOUS_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
  if (stored) {
    const storedState = JSON.parse(stored);
    if (storedState.meta?.baseFileVersion === APP_BASE_FILE_VERSION) {
      state = normalizeState(storedState);
      ensureTraceModel();
      ensureOutcomeBridgesForDirectLinks();
      autoSave(false);
      ensureActor();
      return;
    }
  }

  const loadedWorkfile = await loadBaseWorkfile();
  if (!loadedWorkfile) {
    await loadRequirementsFromMarkdown();
    deriveSourcesFromRequirements();
    seedWishes();
  }
  ensureTraceModel();
  ensureOutcomeBridgesForDirectLinks();
  autoSave(false);
  ensureActor();
}

function normalizeState(input) {
  return {
    meta: {
      ...state.meta,
      ...(input.meta || {}),
      flowOrder: {
        inputs: input.meta?.flowOrder?.inputs || [],
        points: input.meta?.flowOrder?.points || [],
        requirements: input.meta?.flowOrder?.requirements || [],
        outcomes: input.meta?.flowOrder?.outcomes || [],
        solutions: input.meta?.flowOrder?.solutions || [],
        standardParts: input.meta?.flowOrder?.standardParts || []
      },
      processText: migrateProcessText(mergeProcessText(input.meta?.processText))
    },
    inputs: (input.inputs || []).map((item, index) => ({
      ...item,
      pointIds: item.pointIds || [],
      order: Number.isFinite(item.order) ? item.order : index + 1
    })),
    points: (input.points || []).map((item, index) => ({
      ...item,
      inputIds: item.inputIds || [],
      outcomeIds: item.outcomeIds || [],
      requirementIds: item.requirementIds || [],
      order: Number.isFinite(item.order) ? item.order : index + 1
    })),
    sources: input.sources || [],
    wishes: input.wishes || [],
    requirements: (input.requirements || []).map((req, index) => ({
      ...req,
      priority: normalizePriority(req.priority),
      solutionIds: req.solutionIds || [],
      parentId: req.parentId || "",
      isParent: Boolean(req.isParent),
      order: Number.isFinite(req.order) ? req.order : index + 1
    })),
    outcomes: (input.outcomes || []).map((outcome) => ({
      ...outcome,
      pointIds: outcome.pointIds || [],
      requirementIds: outcome.requirementIds || [],
      solutionIds: outcome.solutionIds || [],
      priority: normalizePriority(outcome.priority || outcome.moscow || "Should")
    })),
    solutions: (input.solutions || []).map((solution) => ({
      ...solution,
      requirementIds: solution.requirementIds || []
    })),
    standardParts: (input.standardParts || []).map((part, index) => ({
      ...part,
      priority: normalizePriority(part.priority || "Should"),
      solutionIds: part.solutionIds || [],
      order: Number.isFinite(part.order) ? part.order : index + 1
    })),
    logs: input.logs || []
  };
}

function mergeProcessText(processText = {}) {
  return Object.fromEntries(Object.entries(defaultProcessText).map(([key, valueToUse]) => [
    key,
    { ...valueToUse, ...(processText[key] || {}) }
  ]));
}

async function loadRequirementsFromMarkdown() {
  const response = await fetch(MARKDOWN_PATH);
  if (!response.ok) throw new Error("Centrale eisenlijst kon niet worden geladen.");
  const markdown = await response.text();
  state.requirements = parseMarkdownRequirements(markdown);
}

async function loadBaseWorkfile() {
  const response = await fetch(WORKFILE_PATH, { cache: "no-store" });
  if (!response.ok) return false;
  state = normalizeState(await response.json());
  return true;
}

function parseMarkdownRequirements(markdown) {
  const rows = [];
  let category = "";
  markdown.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("## ")) category = line.replace("## ", "").trim();
    if (!line.startsWith("| EIS-")) return;
    const cells = line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
    if (cells.length < 7) return;
    rows.push({
      id: cells[0],
      kind: "Eis",
      category,
      requirement: cells[1],
      explanation: cells[2],
      source: cells[3],
      type: cells[4],
      priority: normalizePriority(cells[5]),
      evidence: cells[6],
      status: "Concept",
      owner: "",
      solutionIds: [],
      parentId: "",
      isParent: false,
      order: rows.length + 1
    });
  });
  return rows;
}

function deriveSourcesFromRequirements() {
  const names = new Set();
  state.requirements.forEach((req) => splitList(req.source).forEach((source) => names.add(source)));
  state.sources = Array.from(names).sort().map((title, index) => ({
    id: `BR-${String(index + 1).padStart(3, "0")}`,
    title,
    type: title.toLowerCase().includes("data") ? "Data-analyse" : title.toLowerCase().includes("umc") ? "Externe orientatie" : "Interview/input",
    date: "",
    path: "",
    status: "Verwerkt",
    insight: "Afgeleid uit centrale eisenlijst."
  }));
}

function seedWishes() {
  state.wishes = [
    {
      id: "WENS-001",
      kind: "Wens",
      wish: "Ruimtes moeten eenvoudiger en sneller te starten zijn.",
      source: "Samengevoegde interviewinput",
      category: "Gebruiksgemak",
      status: "Verwerkt in eisen",
      requirementIds: ["EIS-001", "EIS-023", "EIS-024"]
    },
    {
      id: "WENS-002",
      kind: "Wens",
      wish: "AV-voorzieningen moeten beheerbaar en uniform blijven bij uitbreiding.",
      source: "UMC Utrecht; Data-analyse; Erik Magre",
      category: "Beheer en standaardisatie",
      status: "Verwerkt in eisen",
      requirementIds: ["EIS-029", "EIS-040", "EIS-041", "EIS-045"]
    }
  ];
}

function ensureTraceModel() {
  if (!state.points.length) state.points = proposedPointsFromRequirements();
  syncTraceLinks();
}

function proposedInputsFromSources() {
  const sourceTitles = state.sources.length
    ? state.sources.map((source) => source.title)
    : Array.from(new Set(state.requirements.flatMap((req) => splitList(req.source))));
  return sourceTitles.filter(Boolean).map((title, index) => {
    const source = state.sources.find((item) => item.title === title) || {};
    return {
      id: `INP-${String(index + 1).padStart(3, "0")}`,
      title,
      stakeholder: title,
      role: "",
      method: source.type || "Interview/input",
      date: source.date || "",
      sourceId: source.id || "",
      sourcePath: source.path || "",
      description: source.insight || "Input afgeleid uit eerder verwerkt stakeholdermateriaal.",
      pointIds: [],
      status: source.status || "Verwerkt",
      order: index + 1
    };
  });
}

function proposedPointsFromRequirements() {
  return state.requirements.map((req, index) => ({
    id: `PNT-${String(index + 1).padStart(3, "0")}`,
    title: shortPointTitle(req.requirement),
    description: req.explanation || req.requirement,
    inputIds: [],
    outcomeIds: [],
    requirementIds: [req.id],
    category: req.category || "",
    status: "Voorstel",
    order: index + 1
  }));
}

function syncTraceLinks() {
  const pointByRequirement = new Map();
  state.points.forEach((point) => {
    (point.requirementIds || []).forEach((reqId) => pointByRequirement.set(reqId, point));
  });
  state.points.forEach((point) => {
    (point.outcomeIds || []).forEach((outcomeId) => {
      const outcome = state.outcomes.find((item) => item.id === outcomeId);
      if (outcome) outcome.pointIds = addUnique(outcome.pointIds || [], point.id);
    });
  });
  state.points.forEach((point) => {
    point.requirementIds = Array.from(new Set(point.requirementIds || []));
    point.outcomeIds = [];
  });
  state.outcomes.forEach((outcome) => {
    const pointIds = new Set(outcome.pointIds || []);
    coveredRequirementIdsForOutcome(outcome).forEach((reqId) => {
      const point = pointByRequirement.get(reqId);
      if (point) pointIds.add(point.id);
    });
    outcome.pointIds = Array.from(pointIds);
    outcome.priority = outcome.priority || priorityForOutcome(outcome);
    outcome.pointIds.forEach((pointId) => {
      const point = state.points.find((item) => item.id === pointId);
      if (!point) return;
      point.outcomeIds = addUnique(point.outcomeIds || [], outcome.id);
    });
  });
}

function inputIdsForRequirement(req) {
  if (!req) return [];
  return splitList(req.source)
    .map((sourceName) => state.inputs.find((input) => input.title === sourceName || input.stakeholder === sourceName)?.id)
    .filter(Boolean);
}

function priorityForOutcome(outcome) {
  const linkedRequirements = Array.from(coveredRequirementIdsForOutcome(outcome)).map(requirementById).filter(Boolean);
  if (linkedRequirements.some((req) => req.priority === "Must")) return "Must";
  if (linkedRequirements.some((req) => req.priority === "Should")) return "Should";
  return "Could";
}

function shortPointTitle(text) {
  return String(text || "")
    .replace(/^De AV-standaard moet\s+/i, "")
    .replace(/^Het AV-systeem moet\s+/i, "")
    .replace(/^De ruimte moet\s+/i, "")
    .replace(/^Gebruikers moeten\s+/i, "")
    .replace(/^Beheer moet\s+/i, "")
    .replace(/\.$/, "")
    .split(/\s+/)
    .slice(0, 6)
    .join(" ");
}

function renderAll() {
  syncTraceLinks();
  renderStats();
  renderProcessTexts();
  renderFilters();
  renderCentralList();
  renderWorkflow();
  renderSources();
  renderOutcomes();
  renderSolutions();
  renderStandardParts();
  renderFlow();
  renderAnalysis();
}

function renderInputs() {
  const cards = state.inputs.map((input) => `
    <article class="solution-card traceable-card">
      <div>
        <strong>${escapeHtml(input.id)} ${escapeHtml(input.title)}</strong>
        <br><small>${escapeHtml(input.method || "Input")} - ${escapeHtml(input.status || "Nieuw")}</small>
      </div>
      <p>${escapeHtml(input.description || "Geen omschrijving.")}</p>
      <small>${escapeHtml(input.stakeholder || "-")} ${input.role ? `- ${escapeHtml(input.role)}` : ""}</small>
      <small>${(input.pointIds || []).length} gekoppelde punten</small>
      <div class="actions">
        <button type="button" onclick="openEditor('input', '${input.id}')">Bewerk</button>
      </div>
    </article>
  `).join("");
  if (els.centralList) els.centralList.innerHTML = cards + addItemCard("Input toevoegen", "Stakeholderinput of analyse toevoegen.", "input");
  if (els.inputCards) els.inputCards.innerHTML = cards + addItemCard("Input toevoegen", "Stakeholderinput of analyse toevoegen.", "input");
}

function renderPoints() {
  if (!els.pointCards) return;
  const cards = applyManualFlowOrder([...state.points], "points", (point) => point.id).map((point) => `
    <article class="solution-card traceable-card color-card" style="--item-color:${categoryColor(point.category, layerColors.point)}">
      <div>
        <strong>${escapeHtml(point.id)} ${escapeHtml(point.title)}</strong>
        <br><small>${escapeHtml(point.category || "Punt")} - ${escapeHtml(point.status || "Voorstel")}</small>
      </div>
      <p>${escapeHtml(point.description || "Geen toelichting.")}</p>
      <small>${(point.requirementIds || []).length} eisen/input - ${(point.outcomeIds || []).length} uitwerkingen</small>
      <div class="actions">
        <button type="button" onclick="openEditor('point', '${point.id}')">Bewerk</button>
      </div>
    </article>
  `).join("");
  els.pointCards.innerHTML = cards + addItemCard("Punt toevoegen", "Kort kernpunt uit input toevoegen.", "point");
}

function renderOutcomes() {
  const cards = state.outcomes.map((outcome) => `
    <article class="solution-card color-card" style="--item-color:${outcomeColor(outcome)}">
      <div>
        <strong>${escapeHtml(outcome.id)} ${escapeHtml(outcome.name)}</strong>
        <br><small>${escapeHtml(outcome.outcomeType || "Uitwerking")} - ${escapeHtml(outcome.priority || "Should")} - ${escapeHtml(outcome.status || "Concept")}</small>
      </div>
      <p>${escapeHtml(outcome.description || "Geen beschrijving.")}</p>
      <small>${Array.from(coveredRequirementIdsForOutcome(outcome)).length} wensen/input - ${(outcome.solutionIds || []).length} oplossingen</small>
      <div class="actions">
        <button type="button" onclick="openEditor('outcome', '${outcome.id}')">Bewerk</button>
      </div>
    </article>
  `).join("");
  els.outcomeCards.innerHTML = cards + addItemCard("Uitwerking toevoegen", "Functionele, technische of organisatorische uitwerking toevoegen.", "outcome");
}

function seedOutcomeFromRequirement(requirementId) {
  const req = state.requirements.find((item) => item.id === requirementId);
  if (!req) return;
  openEditor("outcome", "", {
    name: req.requirement.slice(0, 80),
    description: req.explanation || req.requirement,
    outcomeType: req.type?.includes("Technisch") ? "Technisch" : "Functioneel",
    requirementIds: [req.id],
    solutionIds: req.solutionIds || []
  });
}

function seedPointFromRequirement(requirementId) {
  const req = state.requirements.find((item) => item.id === requirementId);
  if (!req) return;
  openEditor("point", "", {
    title: shortPointTitle(req.requirement),
    description: req.explanation || req.requirement,
    category: req.category || "",
    requirementIds: [req.id],
    outcomeIds: []
  });
}

function pointNamesForRequirement(requirementId) {
  return state.points
    .filter((point) => (point.requirementIds || []).includes(requirementId))
    .map((point) => `${point.id} ${point.title}`);
}

function outcomeNamesForRequirement(requirementId) {
  return outcomesForRequirement(requirementId).map((outcome) => `${outcome.id} ${outcome.name}`);
}

function priorityForRequirementInput(requirementId) {
  const outcomePriorities = outcomesForRequirement(requirementId).map((outcome) => outcome.priority);
  if (outcomePriorities.includes("Must")) return "Must";
  if (outcomePriorities.includes("Should")) return "Should";
  if (outcomePriorities.includes("Could")) return "Could";
  return "";
}

function renderStats() {
  els.totalItems.textContent = state.requirements.length;
  els.totalRequirements.textContent = state.outcomes.length;
  els.mustRequirements.textContent = state.outcomes.filter((outcome) => outcome.priority === "Must").length;
  els.linkedRequirements.textContent = state.outcomes.filter((outcome) => (outcome.solutionIds || []).length).length;
  if (els.totalStandardParts) els.totalStandardParts.textContent = state.standardParts.length;
  els.actorLabel.textContent = state.meta.actor ? `Gebruiker: ${state.meta.actor}` : "";
}

function renderProcessTexts() {
  state.meta.processText = mergeProcessText(state.meta.processText);
  Object.entries(state.meta.processText).forEach(([key, text]) => {
    document.querySelectorAll(`[data-process-title="${key}"]`).forEach((node) => {
      node.textContent = text.title;
    });
    document.querySelectorAll(`[data-process-description="${key}"]`).forEach((node) => {
      node.textContent = text.description;
    });
  });
}

function renderFilters() {
  fillSelect(els.kindFilter, ["", "Wens/input"], els.kindFilter.value, "Alles");
  fillSelect(els.categoryFilter, ["", ...categories, "Gebruiksgemak", "Beheer en standaardisatie"], els.categoryFilter.value, "Alles");
  fillSelect(els.priorityFilter, ["", ...priorities], els.priorityFilter.value, "Alles");
}

function renderCentralList() {
  const rows = getCentralItems();
  if (!rows.length) {
    els.centralList.innerHTML = `<div class="empty">Geen items gevonden.</div>`;
    return;
  }

  els.centralList.innerHTML = `
    <div class="list-row header">
      ${headerCell("id", "ID")}
      ${headerCell("kind", "Soort")}
      ${headerCell("priority", "MoSCoW uitw.")}
      ${headerCell("title", "Item")}
      ${headerCell("category", "Categorie")}
      ${headerCell("source", "Bron")}
      ${headerCell("linked", "Uitwerking")}
    </div>
    <div class="list-row filter-row">
      <input data-column-filter="id" value="${escapeAttr(columnFilters.id)}" placeholder="Filter ID">
      <select data-column-filter="kind">
        ${option("", "Alles", columnFilters.kind)}
        ${option("Wens/input", "Wens/input", columnFilters.kind)}
      </select>
      <select data-column-filter="priority">
        ${option("", "Alles", columnFilters.priority)}
        ${priorities.map((item) => option(item, item, columnFilters.priority)).join("")}
      </select>
      <input data-column-filter="title" value="${escapeAttr(columnFilters.title)}" placeholder="Filter tekst">
      <input data-column-filter="category" value="${escapeAttr(columnFilters.category)}" placeholder="Filter categorie">
      <input data-column-filter="source" value="${escapeAttr(columnFilters.source)}" placeholder="Filter bron">
      <input data-column-filter="linked" value="${escapeAttr(columnFilters.linked)}" placeholder="Filter uitwerking">
    </div>
    ${rows.map(renderCentralRow).join("")}
  `;

  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => setSort(button.dataset.sort));
  });
  document.querySelectorAll("[data-column-filter]").forEach((control) => {
    control.addEventListener("input", () => {
      const key = control.dataset.columnFilter;
      const cursor = control.selectionStart;
      columnFilters[key] = control.value;
      renderCentralList();
      const nextControl = document.querySelector(`[data-column-filter="${key}"]`);
      if (nextControl) {
        nextControl.focus();
        if (typeof cursor === "number" && "setSelectionRange" in nextControl) nextControl.setSelectionRange(cursor, cursor);
      }
    });
  });
  bindDragAndDrop();
}

function renderCentralRow(item) {
  const isRequirement = item.kind === "Wens/input";
  const linked = isRequirement ? outcomeNamesForRequirement(item.id).join("; ") : (item.requirementIds || []).join("; ");
  const title = isRequirement ? item.requirement : item.wish;
  const subtitle = isRequirement ? item.explanation : `Status: ${item.status || "Nieuw"}`;
  const inheritedPriority = isRequirement ? priorityForRequirementInput(item.id) : "";
  const priority = isRequirement
    ? `<span class="badge">${escapeHtml(inheritedPriority || "Nog geen uitwerking")}</span>`
    : `<span class="badge">${escapeHtml(item.status || "Wens")}</span>`;
  const hasChildren = childRequirements(item.id).length > 0;
  const rowClasses = [
    "list-row",
    hasChildren ? "parent-row" : "",
    item.parentId ? "child-row" : "",
    isRequirement && effectiveCoverageSolutionIds(item).length ? "linked-row" : ""
  ].filter(Boolean).join(" ");
  const draggable = isRequirement ? `draggable="true" data-req-id="${escapeAttr(item.id)}"` : "";
  const dropTarget = isRequirement ? `data-parent-target="${escapeAttr(item.id)}" data-sibling-target="${escapeAttr(item.id)}"` : "";
  const color = isRequirement ? requirementColor(item) : layerColors.point;

  return `
    <article class="${rowClasses}" style="--item-color:${color}" ${draggable} ${dropTarget}>
      <strong>${item.parentId ? `<span class="indent-mark"></span>` : ""}${escapeHtml(item.id)}</strong>
      <span class="kind-pill wens">${item.kind}</span>
      <span>${priority}</span>
      <div class="list-main">
        <strong>${hasChildren ? "Wens/input met subitems: " : ""}${escapeHtml(title)}</strong>
        <small>${escapeHtml(subtitle || "")}</small>
        ${linked ? `<br><small>Gekoppeld: ${escapeHtml(linked)}</small>` : ""}
      </div>
      <span>${escapeHtml(item.category || "-")}</span>
      <small>${escapeHtml(item.source || "-")}</small>
      <div class="actions">
        ${isRequirement ? `<button class="sub-action" type="button" onclick="seedOutcomeFromRequirement('${item.id}')">Uitwerking</button>` : ""}
        <button class="icon-action" type="button" onclick="openEditor('${isRequirement ? "requirement" : "wish"}', '${item.id}')" aria-label="Bewerk ${escapeAttr(item.id)}" title="Bewerk">✎</button>
      </div>
    </article>
  `;
}

function getCentralItems() {
  const query = els.searchInput.value.trim().toLowerCase();
  const kind = els.kindFilter.value;
  const category = els.categoryFilter.value;
  const priority = els.priorityFilter.value;
  const rawItems = [
    ...state.requirements.map((item) => ({ ...item, kind: "Wens/input" })),
    ...state.wishes.map((item) => ({ ...item, kind: "Wens" }))
  ];

  const filtered = rawItems.filter((item) => {
    const text = JSON.stringify(item).toLowerCase();
    if (query && !text.includes(query)) return false;
    if (kind && item.kind !== kind) return false;
    if (category && item.category !== category) return false;
    if (priority && item.kind === "Wens/input" && priorityForRequirementInput(item.id) !== priority) return false;
    if (priority && item.kind !== "Wens/input") return false;
    if (!passesColumnFilters(item)) return false;
    return true;
  });

  const withContext = addHierarchyContext(filtered, rawItems);
  return sortAndNest(withContext);
}

function addHierarchyContext(filtered, rawItems) {
  const byId = new Map(rawItems.filter((item) => item.kind === "Wens/input").map((item) => [item.id, item]));
  const result = new Map(filtered.map((item) => [item.id, item]));
  filtered.forEach((item) => {
    if (item.kind !== "Wens/input") return;
    if (item.parentId && byId.has(item.parentId)) result.set(item.parentId, byId.get(item.parentId));
    if (item.isParent) {
      rawItems
        .filter((candidate) => candidate.kind === "Wens/input" && candidate.parentId === item.id)
        .forEach((child) => result.set(child.id, child));
    }
  });
  return Array.from(result.values());
}

function passesColumnFilters(item) {
  const title = item.kind === "Wens/input" ? item.requirement : item.wish;
  const linked = item.kind === "Wens/input" ? outcomeNamesForRequirement(item.id).join("; ") : (item.requirementIds || []).join("; ");
  const values = {
    id: item.id,
    kind: item.kind,
    priority: item.kind === "Wens/input" ? priorityForRequirementInput(item.id) : item.status,
    title,
    category: item.category,
    source: item.source,
    linked
  };
  return Object.entries(columnFilters).every(([key, filter]) => {
    if (!filter) return true;
    return String(values[key] || "").toLowerCase().includes(filter.toLowerCase());
  });
}

function sortAndNest(items) {
  const wishes = items.filter((item) => item.kind === "Wens");
  const reqs = items.filter((item) => item.kind === "Wens/input");
  const reqMap = new Map(reqs.map((req) => [req.id, req]));
  const childrenByParent = new Map();
  reqs.forEach((req) => {
    if (!req.parentId) return;
    if (!childrenByParent.has(req.parentId)) childrenByParent.set(req.parentId, []);
    childrenByParent.get(req.parentId).push(req);
  });
  const topRequirements = reqs.filter((req) => !req.parentId || !reqMap.has(req.parentId));

  const output = [];
  const walk = (req) => {
    output.push(req);
    sortItems(childrenByParent.get(req.id) || []).forEach(walk);
  };
  sortItems(topRequirements).forEach(walk);
  return [...output, ...sortItems(wishes)];
}

function sortItems(items) {
  const direction = sortState.direction === "asc" ? 1 : -1;
  return [...items].sort((a, b) => {
    if (sortState.key === "order") {
      const aLinked = a.kind === "Wens/input" && effectiveCoverageSolutionIds(a).length ? 1 : 0;
      const bLinked = b.kind === "Wens/input" && effectiveCoverageSolutionIds(b).length ? 1 : 0;
      if (aLinked !== bLinked) return aLinked - bLinked;
    }
    const aValue = sortValue(a, sortState.key);
    const bValue = sortValue(b, sortState.key);
    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return Number(a.order || 0) - Number(b.order || 0);
  });
}

function sortValue(item, key) {
  if (key === "title") return item.kind === "Wens/input" ? item.requirement || "" : item.wish || "";
  if (key === "linked") return item.kind === "Wens/input" ? outcomeNamesForRequirement(item.id).join("; ") : (item.requirementIds || []).join("; ");
  if (key === "order") return Number(item.order || 0);
  return String(item[key] || "").toLowerCase();
}

function setSort(key) {
  if (sortState.key === key) {
    sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
  } else {
    sortState = { key, direction: "asc" };
  }
  renderCentralList();
}

function headerCell(key, label) {
  const marker = sortState.key === key ? (sortState.direction === "asc" ? " ↑" : " ↓") : "";
  return `<button class="sort-button" type="button" data-sort="${key}">${escapeHtml(label + marker)}</button>`;
}

function option(valueToUse, label, selected) {
  return `<option value="${escapeAttr(valueToUse)}" ${valueToUse === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function renderWorkflow() {
  els.workflowSteps.innerHTML = `
    <section class="workflow-intro">
      <div>
        <span class="workflow-kicker">Procesopzet</span>
        <h3>${escapeHtml(workflowIntro.title)}</h3>
      </div>
      <p>${escapeHtml(workflowIntro.intro)}</p>
      <div class="workflow-principles">
        <article><strong>Aanpak</strong><span>${escapeHtml(workflowIntro.approach)}</span></article>
        <article><strong>Borging</strong><span>${escapeHtml(workflowIntro.principle)}</span></article>
      </div>
    </section>
  ` + workflow.map((step, index) => `
    <article class="workflow-step">
      <span class="workflow-number">${index + 1}</span>
      <div>
        <small>${escapeHtml(step.code)}</small>
        <h3>${escapeHtml(step.title)}</h3>
        <p class="workflow-description">${escapeHtml(step.description)}</p>
      </div>
    </article>
  `).join("") + `
    <section class="workflow-docs">
      <h3>${escapeHtml(workflowDocumentation.title)}</h3>
      <p>${escapeHtml(workflowDocumentation.description)}</p>
      <a href="aanpak_proces_av_standaard.md" target="_blank" rel="noreferrer">Open aanpakdocument</a>
    </section>
    <section class="workflow-later">
      <h3>Latere processtappen</h3>
      <p>Analyse en borging horen wel bij het totale proces, maar volgen nadat de inhoudelijke keten voldoende is gevuld en gecontroleerd.</p>
      <div>
        ${laterWorkflow.map((step) => `
          <article>
            <small>${escapeHtml(step.code)}</small>
            <strong>${escapeHtml(step.title)}</strong>
            <span>${escapeHtml(step.description)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderSources() {
  els.sourceList.innerHTML = state.sources.map((source) => `
    <article class="source-card">
      <strong>${escapeHtml(source.title)}</strong>
      <small>${escapeHtml(source.type)} ${source.status ? `- ${escapeHtml(source.status)}` : ""}</small>
      <p>${escapeHtml(source.insight || "")}</p>
      <div class="actions">
        <button type="button" onclick="openEditor('source', '${source.id}')">Bewerk</button>
      </div>
    </article>
  `).join("") || `<div class="empty">Nog geen bronnen.</div>`;
}

function renderSolutions() {
  const cards = state.solutions.map((solution) => `
    <article class="solution-card color-card" style="--item-color:${solutionColor(solution)}">
      <div>
        <strong>${escapeHtml(solution.name)}</strong>
        <br><small>${escapeHtml(solution.type || "Oplossing")} - ${escapeHtml(solution.status || "Idee")}</small>
      </div>
      <p>${escapeHtml(solution.description || "Geen beschrijving.")}</p>
      <small>${outcomesForSolution(solution.id).length} gekoppelde uitwerkingen</small>
      <div class="actions">
        <button type="button" onclick="openEditor('solution', '${solution.id}')">Bewerk</button>
      </div>
    </article>
  `).join("");
  els.solutionCards.innerHTML = cards + addItemCard("Oplossing toevoegen", "Product, ontwerpkeuze of oplossingsrichting toevoegen.", "solution");
}

function renderStandardParts() {
  if (!els.standardPartCards) return;
  const cards = state.standardParts.map((part) => `
    <article class="solution-card color-card" style="--item-color:${standardPartColor(part)}">
      <div>
        <strong>${escapeHtml(part.id)} ${escapeHtml(part.name)}</strong>
        <br><small>${escapeHtml(part.type || "Standaard")} - ${escapeHtml(part.priority || "Should")} - ${escapeHtml(part.status || "Concept")}</small>
      </div>
      <p>${escapeHtml(part.description || "Geen beschrijving.")}</p>
      <small>${(part.solutionIds || []).length} oplossingen gekoppeld</small>
      <div class="actions">
        <button type="button" onclick="openEditor('standardPart', '${part.id}')">Bewerk</button>
      </div>
    </article>
  `).join("");
  els.standardPartCards.innerHTML = cards + addItemCard("Standaardonderdeel toevoegen", "Onderdeel van de AV-standaard toevoegen.", "standardPart");
}

function addItemCard(title, text, type) {
  return `
    <button class="add-card" type="button" onclick="openEditor('${type}')">
      <span>+</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(text)}</small>
    </button>
  `;
}

function renderFlow() {
  const outcomeGroups = flowOutcomeGroups();
  const flowRequirements = applyManualFlowOrder([...state.requirements].sort(compareRequirementsByHierarchy), "requirements", (req) => req.id);
  const flowStandards = flowStandardParts();
  els.flowChart.innerHTML = `
    <div class="trace-flow">
      <div class="trace-column trace-input layer-requirements">
        <h3>Wensen/input</h3>
        <div class="trace-stack" data-flow-stack="requirements">
          ${flowRequirements.map((req) => renderTraceRequirementCard({ req, groups: outcomeGroups.filter((group) => group.requirements.some((item) => item.id === req.id)) })).join("") || `<div class="empty">Nog geen wensen/input.</div>`}
          ${traceAddButton("Wens/input toevoegen", "requirement")}
        </div>
      </div>
      <div class="trace-column trace-middle layer-outcomes">
        <h3>Uitwerkingen</h3>
        <div class="trace-stack" data-flow-stack="outcomes">
          ${outcomeGroups.map(renderTraceOutcomeNode).join("") || `<div class="empty">Nog geen uitwerkingen.</div>`}
          ${traceAddButton("Uitwerking toevoegen", "outcome")}
        </div>
      </div>
      <div class="trace-column trace-output layer-solutions">
        <h3>Oplossingen</h3>
        <div class="trace-stack" data-flow-stack="solutions">
          ${flowSolutions(outcomeGroups).map((solution, index) => renderTraceSolutionNode(solution, index)).join("") || `<div class="empty">Nog geen oplossingen.</div>`}
          ${traceAddButton("Oplossing toevoegen", "solution")}
        </div>
      </div>
      <div class="trace-column trace-standard layer-standard">
        <h3>AV-standaard</h3>
        <div class="trace-stack" data-flow-stack="standardParts">
          ${flowStandards.map(renderTraceStandardPartNode).join("") || `<div class="empty">Nog geen standaardonderdelen.</div>`}
          ${traceAddButton("Standaardonderdeel toevoegen", "standardPart")}
        </div>
      </div>
      <svg id="traceSvg" class="trace-svg" aria-hidden="true"></svg>
    </div>
  `;
  window.requestAnimationFrame(updateFlowBoard);
  window.setTimeout(updateFlowBoard, 80);
  window.setTimeout(updateFlowBoard, 240);
  document.fonts?.ready?.then(() => {
    if (document.getElementById("flow").classList.contains("active")) updateFlowBoard();
  });
  window.setTimeout(() => {
    bindTraceDragAndDrop();
    bindFlowItemClicks();
  }, 0);
}

function renderTraceInputNode(input) {
  return `
    <article class="trace-card input-node" data-trace-input="${escapeAttr(input.id)}" data-flow-edit-type="input" data-flow-edit-id="${escapeAttr(input.id)}" draggable="true" data-drag-type="input" data-drag-id="${escapeAttr(input.id)}" data-drop-type="input" data-drop-id="${escapeAttr(input.id)}">
      <strong><small>${escapeHtml(input.id)}</small> ${escapeHtml(input.title)}</strong>
      <p>${escapeHtml(input.stakeholder || input.method || "")}</p>
      <small>${(input.pointIds || []).length} punten</small>
    </article>
  `;
}

function renderTracePointNode(point) {
  const color = categoryColor(point.category, layerColors.point);
  return `
    <article class="trace-card point-node" style="--item-color:${color}" data-trace-point="${escapeAttr(point.id)}" data-flow-edit-type="point" data-flow-edit-id="${escapeAttr(point.id)}" draggable="true" data-drag-type="point" data-drag-id="${escapeAttr(point.id)}" data-drop-type="point" data-drop-id="${escapeAttr(point.id)}">
      <strong><small>${escapeHtml(point.id)}</small> ${escapeHtml(point.title)}</strong>
      <p>${escapeHtml(point.description || "")}</p>
      <small>${(point.requirementIds || []).length} eisen/input - ${(point.outcomeIds || []).length} uitwerkingen</small>
    </article>
  `;
}

function traceAddButton(label, type) {
  return `
    <button class="trace-add-card" type="button" onclick="openEditor('${type}')">
      <span>+</span>
      ${escapeHtml(label)}
    </button>
  `;
}

function flowOutcomeGroups() {
  const explicit = state.outcomes.map((outcome, index) => ({
    outcome,
    color: outcomeColor(outcome),
    real: true,
    requirements: requirementsFromIds(Array.from(coveredRequirementIdsForOutcome(outcome))),
    solutionIds: outcome.solutionIds || []
  }));
  const direct = state.solutions
    .map((solution) => directFlowGroupForSolution(solution, explicit))
    .filter(Boolean);
  return applyManualFlowOrder([...explicit, ...direct].sort(flowGroupSort), "outcomes", (group) => group.outcome.id);
}

function flowGroupSort(a, b) {
  const aSolution = firstSolutionIndex(a.solutionIds);
  const bSolution = firstSolutionIndex(b.solutionIds);
  if (aSolution !== bSolution) return aSolution - bSolution;
  return firstRequirementOrder(a.requirements) - firstRequirementOrder(b.requirements);
}

function firstSolutionIndex(solutionIds = []) {
  const indexes = solutionIds
    .map((id) => state.solutions.findIndex((solution) => solution.id === id))
    .filter((index) => index >= 0);
  return indexes.length ? Math.min(...indexes) : Number.MAX_SAFE_INTEGER;
}

function firstRequirementOrder(requirements = []) {
  const orders = requirements.map((req) => Number(req.order || 0)).filter(Number.isFinite);
  return orders.length ? Math.min(...orders) : Number.MAX_SAFE_INTEGER;
}

function flowSolutions(groups = flowOutcomeGroups()) {
  const autoSorted = [...state.solutions].sort((a, b) => {
    const aIndex = firstGroupIndexForSolution(groups, a.id);
    const bIndex = firstGroupIndexForSolution(groups, b.id);
    if (aIndex !== bIndex) return aIndex - bIndex;
    return String(a.name || "").localeCompare(String(b.name || ""), "nl");
  });
  return applyManualFlowOrder(autoSorted, "solutions", (solution) => solution.id);
}

function firstGroupIndexForSolution(groups, solutionId) {
  const index = groups.findIndex((group) => group.solutionIds.includes(solutionId));
  return index >= 0 ? index : Number.MAX_SAFE_INTEGER;
}

function applyManualFlowOrder(items, key, getId) {
  const order = state.meta.flowOrder?.[key] || [];
  if (!order.length) return items;
  const position = new Map(order.map((id, index) => [id, index]));
  return [...items].sort((a, b) => {
    const aPos = position.has(getId(a)) ? position.get(getId(a)) : Number.MAX_SAFE_INTEGER;
    const bPos = position.has(getId(b)) ? position.get(getId(b)) : Number.MAX_SAFE_INTEGER;
    if (aPos !== bPos) return aPos - bPos;
    return items.indexOf(a) - items.indexOf(b);
  });
}

function flowLinkedRequirementIds(groups) {
  const ids = new Set();
  groups.forEach((group) => {
    group.requirements.forEach((req) => {
      ids.add(req.id);
      descendantRequirements(req.id).forEach((child) => ids.add(child.id));
    });
  });
  return ids;
}

function unlinkedFlowRequirements(linkedIds) {
  return state.requirements
    .filter((req) => !linkedIds.has(req.id))
    .filter((req) => !hasUnlinkedAncestor(req, linkedIds))
    .sort(compareRequirementsByHierarchy);
}

function hasUnlinkedAncestor(req, linkedIds) {
  let current = state.requirements.find((item) => item.id === req.parentId);
  while (current) {
    if (!linkedIds.has(current.id)) return true;
    current = state.requirements.find((item) => item.id === current.parentId);
  }
  return false;
}

function flowRequirementCards(groups) {
  const cards = new Map();
  groups.forEach((group) => {
    group.requirements.forEach((req) => {
      if (!cards.has(req.id)) cards.set(req.id, { req, groups: [] });
      cards.get(req.id).groups.push(group);
    });
  });
  return applyManualFlowOrder(
    Array.from(cards.values()).sort((a, b) => compareFlowRequirementCards(a, b, groups)),
    "requirements",
    (card) => card.req.id
  );
}

function compareFlowRequirementCards(a, b, groups) {
  const aIndex = averageOutcomeIndexForRequirement(a.req.id, groups);
  const bIndex = averageOutcomeIndexForRequirement(b.req.id, groups);
  if (aIndex !== bIndex) return aIndex - bIndex;
  return compareRequirementsByHierarchy(a.req, b.req);
}

function averageOutcomeIndexForRequirement(requirementId, groups) {
  const indexes = groups
    .map((group, index) => group.requirements.some((req) => req.id === requirementId) ? index : null)
    .filter((index) => Number.isFinite(index));
  if (!indexes.length) return Number.MAX_SAFE_INTEGER;
  return indexes.reduce((sum, index) => sum + index, 0) / indexes.length;
}

function linkedRequirementsForSolution(solution) {
  return requirementsCoveredBySolution(solution.id);
}

function directFlowGroupForSolution(solution, explicitGroups) {
  const directRequirements = uniqueRequirements([
    ...(solution.requirementIds || []).map(requirementById).filter(Boolean),
    ...state.requirements.filter((req) => (req.solutionIds || []).includes(solution.id))
  ]);
  const uncovered = directRequirements.filter((req) => {
    return !explicitGroups.some((group) => {
      if (!group.solutionIds.includes(solution.id)) return false;
      return outcomeCoversRequirement(group.outcome, req.id);
    });
  });
  const requirements = requirementsFromIds(uncovered.map((req) => req.id));
  if (!requirements.length) return null;
  const index = state.outcomes.length + state.solutions.findIndex((item) => item.id === solution.id);
  return {
    outcome: {
      id: `DIRECT-${solution.id}`,
      name: `Directe koppeling naar ${solution.name}`,
      outcomeType: "Direct",
      description: "Bestaande eis-oplossing-koppeling. Maak eventueel een echte uitkomst om deze brug inhoudelijk te beschrijven."
    },
    color: flowColor(index),
    real: false,
    requirements,
    solutionIds: [solution.id]
  };
}

function renderTraceRequirementCard(card) {
  const { req, groups } = card;
  const color = requirementColor(req);
  const childCount = descendantRequirements(req.id).length;
  const single = !childCount;
  const multiLabel = groups.length > 1 ? `<small class="trace-multi-label">${groups.length} uitkomsten</small>` : "";
  const childLabel = childCount ? `<small class="trace-multi-label">${childCount} subitems</small>` : "";
  return `
    <section class="trace-card requirement-bundle ${single ? "single-requirement-bundle" : ""}" style="--item-color:${color}" data-trace-req-id="${escapeAttr(req.id)}" data-flow-edit-type="requirement" data-flow-edit-id="${escapeAttr(req.id)}" draggable="true" data-drag-type="requirement" data-drag-id="${escapeAttr(req.id)}" data-drop-type="requirement" data-drop-id="${escapeAttr(req.id)}">
      ${renderCompactTraceRequirement(req)}
      ${childLabel}
      ${multiLabel}
    </section>
  `;
}

function renderUnlinkedRequirementGroup(req, linkedIds = new Set()) {
  const children = descendantRequirements(req.id).filter((child) => !linkedIds.has(child.id));
  const single = !children.length;
  const childLabel = children.length ? `<small class="trace-multi-label">${children.length} losse subitems</small>` : "";
  return `
    <section class="trace-card requirement-bundle unlinked-requirement-bundle ${single ? "single-requirement-bundle" : ""}" style="--flow-color:#ded4c8" data-trace-req-id="${escapeAttr(req.id)}" data-flow-edit-type="requirement" data-flow-edit-id="${escapeAttr(req.id)}" draggable="true" data-drag-type="requirement" data-drag-id="${escapeAttr(req.id)}" data-drop-type="requirement" data-drop-id="${escapeAttr(req.id)}">
      ${renderCompactTraceRequirement(req)}
      ${childLabel}
    </section>
  `;
}

function renderCompactTraceRequirement(req) {
  return `
    <div class="trace-single-requirement">
      <strong><small>${escapeHtml(req.id)}</small> ${escapeHtml(req.requirement)}</strong>
    </div>
  `;
}

function renderSingleTraceRequirement(req) {
  return `
    <div class="trace-single-requirement" draggable="true" data-drag-type="requirement" data-drag-id="${escapeAttr(req.id)}">
      <strong><small>${escapeHtml(req.id)}</small> ${escapeHtml(req.requirement)}</strong>
    </div>
  `;
}

function renderTraceRequirementNode(req, visibleChildren = descendantRequirements(req.id)) {
  const children = visibleChildren;
  return `
    <article class="trace-mini requirement-mini" draggable="true" data-drag-type="requirement" data-drag-id="${escapeAttr(req.id)}">
      <strong><small>${escapeHtml(req.id)}</small> ${escapeHtml(req.requirement)}</strong>
      ${children.length ? `<div>${children.map((child) => `<span draggable="true" data-drag-type="requirement" data-drag-id="${escapeAttr(child.id)}"><small>${escapeHtml(child.id)}</small> ${escapeHtml(child.requirement)}</span>`).join("")}</div>` : ""}
    </article>
  `;
}

function renderTraceOutcomeNode(group) {
  const dragAttrs = group.real
    ? `draggable="true" data-drag-type="outcome" data-drag-id="${escapeAttr(group.outcome.id)}" data-drop-type="outcome" data-drop-id="${escapeAttr(group.outcome.id)}"`
    : "";
  const editAttrs = group.real
    ? `data-flow-edit-type="outcome" data-flow-edit-id="${escapeAttr(group.outcome.id)}"`
    : "";
  return `
    <article class="trace-card outcome-node" style="--item-color:${group.color}" data-trace-outcome="${escapeAttr(group.outcome.id)}" ${editAttrs} ${dragAttrs}>
      <strong><small>${escapeHtml(group.outcome.id)}</small> ${escapeHtml(group.outcome.name)}</strong>
      <p>${escapeHtml(group.outcome.description || "")}</p>
      <small>${escapeHtml(group.outcome.outcomeType || "Uitwerking")} - ${escapeHtml(group.outcome.priority || "Should")} - ${group.requirements.length} wensen/input - ${group.solutionIds.length} oplossingen</small>
    </article>
  `;
}

function renderTraceSolutionNode(solution, index) {
  const groups = flowOutcomeGroups().filter((group) => group.solutionIds.includes(solution.id));
  return `
    <article class="trace-card solution-trace-node" style="--item-color:${solutionColor(solution)}" data-trace-solution="${escapeAttr(solution.id)}" data-flow-edit-type="solution" data-flow-edit-id="${escapeAttr(solution.id)}" draggable="true" data-drag-type="solution" data-drag-id="${escapeAttr(solution.id)}" data-drop-type="solution" data-drop-id="${escapeAttr(solution.id)}">
      <strong><small>${escapeHtml(solution.id)}</small> ${escapeHtml(solution.name)}</strong>
      <p>${escapeHtml(solution.description || "")}</p>
      <small>${groups.length} uitwerkingen gekoppeld</small>
    </article>
  `;
}

function renderTraceStandardPartNode(part) {
  return `
    <article class="trace-card standard-trace-node" style="--item-color:${standardPartColor(part)}" data-trace-standard="${escapeAttr(part.id)}" data-flow-edit-type="standardPart" data-flow-edit-id="${escapeAttr(part.id)}" draggable="true" data-drag-type="standardPart" data-drag-id="${escapeAttr(part.id)}" data-drop-type="standardPart" data-drop-id="${escapeAttr(part.id)}">
      <strong><small>${escapeHtml(part.id)}</small> ${escapeHtml(part.name)}</strong>
      <p>${escapeHtml(part.description || "")}</p>
      <small>${escapeHtml(part.priority || "Should")} - ${(part.solutionIds || []).length} oplossingen gekoppeld</small>
    </article>
  `;
}

function flowStandardParts() {
  return applyManualFlowOrder([...state.standardParts], "standardParts", (part) => part.id);
}

function topRequirementsFromIds(ids) {
  const topIds = new Set();
  ids.forEach((id) => {
    let current = state.requirements.find((req) => req.id === id);
    if (!current) return;
    while (current.parentId) {
      const parent = state.requirements.find((item) => item.id === current.parentId);
      if (!parent) break;
      current = parent;
    }
    topIds.add(current.id);
  });
  return Array.from(topIds)
    .map((id) => state.requirements.find((req) => req.id === id))
    .filter(Boolean)
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

function requirementsFromIds(ids) {
  const seen = new Set();
  return ids
    .map(requirementById)
    .filter(Boolean)
    .filter((req) => {
      if (seen.has(req.id)) return false;
      seen.add(req.id);
      return true;
    })
    .sort(compareRequirementsByHierarchy);
}

function compareRequirementsByHierarchy(a, b) {
  const aPath = requirementOrderPath(a);
  const bPath = requirementOrderPath(b);
  const length = Math.max(aPath.length, bPath.length);
  for (let index = 0; index < length; index += 1) {
    const aValue = aPath[index] ?? -1;
    const bValue = bPath[index] ?? -1;
    if (aValue !== bValue) return aValue - bValue;
  }
  return String(a.id).localeCompare(String(b.id), "nl");
}

function requirementOrderPath(req) {
  const path = [];
  let current = req;
  while (current) {
    path.unshift(Number(current.order || 0));
    current = state.requirements.find((item) => item.id === current.parentId);
  }
  return path;
}

function flowColor(index) {
  return Object.values(categoryColors)[index % Object.values(categoryColors).length] || layerColors.point;
}

function categoryColor(category, fallback = layerColors.point) {
  return categoryColors[category] || fallback;
}

function requirementColor(req) {
  return categoryColor(req?.category, layerColors.requirement);
}

function pointColor(point) {
  return categoryColor(point?.category, layerColors.point);
}

function outcomeColor(outcome) {
  return typeColors[outcome?.outcomeType] || layerColors.outcome;
}

function solutionColor(solution) {
  return typeColors[solution?.type] || layerColors.solution;
}

function standardPartColor(part) {
  return typeColors[part?.type] || layerColors.standard;
}

function updateFlowBoard() {
  layoutTraceBoard();
  applyFlowSelection();
  drawTraceLines();
}

function layoutTraceBoard() {
  const flow = document.querySelector(".trace-flow");
  if (!flow) return;
  flow.querySelectorAll(".trace-stack").forEach((stack) => {
    stack.style.minHeight = "";
    stack.style.gap = "";
    stack.style.paddingTop = "";
    stack.style.paddingBottom = "";
  });
  flow.querySelectorAll(".outcome-node, .solution-trace-node, .trace-add-card, .empty").forEach((node) => {
    node.style.marginTop = "0px";
  });
  if (window.matchMedia("(max-width: 1000px)").matches) return;
  balanceTraceStacks(flow);
}

function balanceTraceStacks(flow) {
  const stacks = Array.from(flow.querySelectorAll(".trace-stack"));
  if (!stacks.length) return;
  const measurements = stacks.map((stack) => {
    const children = visibleStackChildren(stack);
    const itemHeight = children.reduce((sum, child) => sum + child.offsetHeight, 0);
    const naturalHeight = stackNaturalHeight(children, itemHeight, 10);
    return { stack, children, itemHeight, naturalHeight };
  });
  const boardHeight = Math.max(...measurements.map((item) => item.naturalHeight), 0);
  measurements.forEach(({ stack, children, itemHeight }) => {
    if (!children.length) return;
    const distributedGap = Math.max(10, (boardHeight - itemHeight) / (children.length + 1));
    stack.style.gap = `${Math.round(distributedGap)}px`;
    stack.style.paddingTop = `${Math.round(distributedGap)}px`;
    stack.style.paddingBottom = `${Math.round(distributedGap)}px`;
    stack.style.minHeight = `${Math.round(itemHeight + distributedGap * (children.length + 1))}px`;
  });
}

function visibleStackChildren(stack) {
  return Array.from(stack.children).filter((child) => {
    const style = window.getComputedStyle(child);
    return style.display !== "none"
      && style.visibility !== "hidden"
      && !child.classList.contains("trace-add-card")
      && !child.classList.contains("empty");
  });
}

function stackNaturalHeight(children, itemHeight, gap) {
  if (!children.length) return 0;
  return itemHeight + gap * Math.max(0, children.length - 1);
}

function currentFlowSelection() {
  if (!selectedFlowItem) return null;
  return flowSelectionFor(selectedFlowItem.type, selectedFlowItem.id);
}

function flowSelectionFor(type, id) {
  const selection = {
    requirements: new Set(),
    points: new Set(),
    outcomes: new Set(),
    solutions: new Set(),
    standardParts: new Set()
  };
  if (type === "requirement") {
    selection.requirements.add(id);
    state.points
      .filter((point) => (point.requirementIds || []).includes(id))
      .forEach((point) => addPointRoute(selection, point));
    outcomesForRequirement(id).forEach((outcome) => addOutcomeRoute(selection, outcome, { includePoints: false }));
  }
  if (type === "point") {
    addPointRoute(selection, state.points.find((point) => point.id === id));
  }
  if (type === "outcome") {
    addOutcomeRoute(selection, state.outcomes.find((outcome) => outcome.id === id));
  }
  if (type === "solution") {
    selection.solutions.add(id);
    state.outcomes
      .filter((outcome) => (outcome.solutionIds || []).includes(id))
      .forEach((outcome) => addOutcomeRoute(selection, outcome, { includeAllSolutions: false }));
    state.standardParts
      .filter((part) => (part.solutionIds || []).includes(id))
      .forEach((part) => selection.standardParts.add(part.id));
  }
  if (type === "standardPart") {
    addStandardPartRoute(selection, state.standardParts.find((part) => part.id === id));
  }
  return selection;
}

function addPointRoute(selection, point) {
  if (!point) return;
  selection.points.add(point.id);
  (point.requirementIds || []).forEach((reqId) => selection.requirements.add(reqId));
  (point.outcomeIds || []).forEach((outcomeId) => {
    addOutcomeRoute(selection, state.outcomes.find((outcome) => outcome.id === outcomeId), { includePoints: false });
  });
}

function addOutcomeRoute(selection, outcome, options = {}) {
  if (!outcome) return;
  const includePoints = options.includePoints !== false;
  const includeAllSolutions = options.includeAllSolutions !== false;
  selection.outcomes.add(outcome.id);
  if (includePoints) {
    (outcome.pointIds || []).forEach((pointId) => {
      const point = state.points.find((item) => item.id === pointId);
      if (!point) return;
      selection.points.add(point.id);
      (point.requirementIds || []).forEach((reqId) => selection.requirements.add(reqId));
    });
  }
  if (includeAllSolutions) {
    (outcome.solutionIds || []).forEach((solutionId) => {
      selection.solutions.add(solutionId);
      state.standardParts
        .filter((part) => (part.solutionIds || []).includes(solutionId))
        .forEach((part) => selection.standardParts.add(part.id));
    });
  }
}

function addStandardPartRoute(selection, part) {
  if (!part) return;
  selection.standardParts.add(part.id);
  (part.solutionIds || []).forEach((solutionId) => {
    selection.solutions.add(solutionId);
    state.outcomes
      .filter((outcome) => (outcome.solutionIds || []).includes(solutionId))
      .forEach((outcome) => addOutcomeRoute(selection, outcome, { includeAllSolutions: false }));
  });
}

function applyFlowSelection() {
  const flow = document.querySelector(".trace-flow");
  if (!flow) return;
  const selection = currentFlowSelection();
  flow.classList.toggle("has-flow-selection", Boolean(selection));
  markFlowNodes(flow, "[data-trace-req-id]", "traceReqId", selection?.requirements);
  markFlowNodes(flow, "[data-trace-point]", "tracePoint", selection?.points);
  markFlowNodes(flow, "[data-trace-outcome]", "traceOutcome", selection?.outcomes);
  markFlowNodes(flow, "[data-trace-solution]", "traceSolution", selection?.solutions);
  markFlowNodes(flow, "[data-trace-standard]", "traceStandard", selection?.standardParts);
}

function markFlowNodes(flow, selector, datasetKey, selectedIds) {
  flow.querySelectorAll(selector).forEach((node) => {
    const active = !selectedIds || selectedIds.has(node.dataset[datasetKey]);
    node.classList.toggle("flow-selected", Boolean(selectedIds && active));
    node.classList.toggle("flow-dimmed", Boolean(selectedIds && !active));
  });
}

function bindFlowItemClicks() {
  document.querySelectorAll("[data-flow-edit-type]").forEach((node) => {
    node.addEventListener("click", (event) => {
      const type = node.dataset.flowEditType;
      const id = node.dataset.flowEditId;
      if (!type || !id || suppressFlowClick) return;
      if (event.target.closest(".trace-add-card")) return;
      event.preventDefault();
      window.clearTimeout(flowClickTimer);
      flowClickTimer = window.setTimeout(() => {
        selectedFlowItem = selectedFlowItem?.type === type && selectedFlowItem?.id === id ? null : { type, id };
        applyFlowSelection();
        drawTraceLines();
      }, 180);
    });
    node.addEventListener("dblclick", (event) => {
      const type = node.dataset.flowEditType;
      const id = node.dataset.flowEditId;
      if (!type || !id || suppressFlowClick) return;
      event.preventDefault();
      window.clearTimeout(flowClickTimer);
      selectedFlowItem = { type, id };
      applyFlowSelection();
      drawTraceLines();
      openEditor(type, id);
    });
  });
}

function bindTraceDragAndDrop() {
  document.querySelectorAll("[data-drag-type]").forEach((node) => {
    node.addEventListener("dragstart", (event) => {
      draggedTraceItem = { type: node.dataset.dragType, id: node.dataset.dragId };
      suppressFlowClick = true;
      event.dataTransfer.effectAllowed = "all";
      event.dataTransfer.setData("text/plain", `${draggedTraceItem.type}:${draggedTraceItem.id}`);
    });
    node.addEventListener("dragend", () => {
      draggedTraceItem = null;
      suppressFlowClick = true;
      window.setTimeout(() => {
        suppressFlowClick = false;
      }, 250);
      document.querySelectorAll(".trace-drop").forEach((item) => item.classList.remove("trace-drop"));
    });
  });

  document.querySelectorAll("[data-drop-type]").forEach((node) => {
    node.addEventListener("dragover", (event) => {
      if (!draggedTraceItem) return;
      if (!canTraceDrop(draggedTraceItem.type, node.dataset.dropType)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = draggedTraceItem.type === node.dataset.dropType ? "move" : "link";
      node.classList.add("trace-drop");
    });
    node.addEventListener("dragleave", () => node.classList.remove("trace-drop"));
    node.addEventListener("drop", (event) => {
      event.preventDefault();
      node.classList.remove("trace-drop");
      handleTraceDrop(draggedTraceItem, { type: node.dataset.dropType, id: node.dataset.dropId });
    });
  });
}

function canTraceDrop(fromType, toType) {
  return (
    (fromType === "point" && toType === "point") ||
    (fromType === "requirement" && toType === "point") ||
    (fromType === "point" && toType === "outcome") ||
    (fromType === "requirement" && toType === "outcome") ||
    (fromType === "requirement" && toType === "requirement") ||
    (fromType === "outcome" && toType === "solution") ||
    (fromType === "solution" && toType === "outcome") ||
    (fromType === "requirement" && toType === "solution") ||
    (fromType === "outcome" && toType === "outcome") ||
    (fromType === "solution" && toType === "solution") ||
    (fromType === "solution" && toType === "standardPart") ||
    (fromType === "standardPart" && toType === "solution") ||
    (fromType === "standardPart" && toType === "standardPart")
  );
}

function handleTraceDrop(from, to) {
  if (!from || !to || from.id === to.id) return;
  let changed = false;
  if (from.type === "point" && to.type === "point") {
    changed = reorderFlowItems("points", from.id, to.id);
    if (changed) logAction("trace:order", "point", "Volgorde van punten in Flow gewijzigd", from.id);
  }
  if (from.type === "requirement" && to.type === "point") {
    const point = state.points.find((item) => item.id === to.id);
    const req = state.requirements.find((item) => item.id === from.id);
    if (!point || !req) return;
    point.requirementIds = addUnique(point.requirementIds || [], req.id);
    logAction("trace:link", "point", `Eis/input ${req.id} gekoppeld aan punt`, point.id);
    changed = true;
  }
  if (from.type === "point" && to.type === "outcome") {
    const point = state.points.find((item) => item.id === from.id);
    const outcome = state.outcomes.find((item) => item.id === to.id);
    if (!point || !outcome) return;
    outcome.pointIds = addUnique(outcome.pointIds || [], point.id);
    point.outcomeIds = addUnique(point.outcomeIds || [], outcome.id);
    logAction("trace:link", "outcome", `Punt ${point.id} gekoppeld aan uitwerking`, outcome.id);
    changed = true;
  }
  if (from.type === "requirement" && to.type === "requirement") {
    changed = reorderFlowItems("requirements", from.id, to.id);
    if (changed) logAction("trace:order", "requirement", `Volgorde van wensen/input in Flow gewijzigd`, from.id);
  }
  if (from.type === "outcome" && to.type === "outcome") {
    changed = reorderFlowItems("outcomes", from.id, to.id);
    if (changed) logAction("trace:order", "outcome", `Volgorde van uitkomsten gewijzigd`, from.id);
  }
  if (from.type === "solution" && to.type === "solution") {
    changed = reorderFlowItems("solutions", from.id, to.id);
    if (changed) logAction("trace:order", "solution", `Volgorde van oplossingen gewijzigd`, from.id);
  }
  if (from.type === "standardPart" && to.type === "standardPart") {
    changed = reorderFlowItems("standardParts", from.id, to.id);
    if (changed) logAction("trace:order", "standardPart", `Volgorde van standaardonderdelen gewijzigd`, from.id);
  }
  if (from.type === "requirement" && to.type === "outcome") {
    const outcome = state.outcomes.find((item) => item.id === to.id);
    const req = state.requirements.find((item) => item.id === from.id);
    if (!outcome || !req) return;
    let point = state.points.find((item) => (item.requirementIds || []).includes(req.id));
    if (!point) {
      point = {
        id: nextId("PNT", state.points),
        title: shortPointTitle(req.requirement),
        description: req.explanation || req.requirement,
        inputIds: [],
        outcomeIds: [],
        requirementIds: [req.id],
        category: req.category || "",
        status: "Voorstel",
        order: state.points.length + 1
      };
      state.points.push(point);
    }
    outcome.requirementIds = addUnique(outcome.requirementIds || [], from.id);
    outcome.pointIds = addUnique(outcome.pointIds || [], point.id);
    point.outcomeIds = addUnique(point.outcomeIds || [], outcome.id);
    logAction("trace:link", "outcome", `Eis/input ${from.id} via punt ${point.id} gekoppeld aan uitwerking`, outcome.id);
    changed = true;
  }
  if (from.type === "outcome" && to.type === "solution") {
    changed = linkOutcomeSolution(from.id, to.id) || changed;
  }
  if (from.type === "solution" && to.type === "outcome") {
    changed = linkOutcomeSolution(to.id, from.id) || changed;
  }
  if (from.type === "requirement" && to.type === "solution") {
    const req = state.requirements.find((item) => item.id === from.id);
    const solution = state.solutions.find((item) => item.id === to.id);
    if (!req || !solution) return;
    const bridge = createOutcomeBridge(req, solution, "Automatisch aangemaakt door eis direct op oplossing te slepen.");
    logAction(bridge.created ? "trace:create" : "trace:reuse", "outcome", `Uitkomst ${bridge.created ? "gemaakt" : "gebruikt"} tussen eis ${req.id} en oplossing ${solution.id}`, bridge.outcome.id);
    changed = true;
  }
  if (from.type === "solution" && to.type === "standardPart") {
    changed = linkSolutionStandardPart(from.id, to.id) || changed;
  }
  if (from.type === "standardPart" && to.type === "solution") {
    changed = linkSolutionStandardPart(to.id, from.id) || changed;
  }
  if (!changed) return;
  autoSave();
  renderAll();
  if (document.getElementById("flow").classList.contains("active")) {
    window.requestAnimationFrame(updateFlowBoard);
  }
}

function linkOutcomeSolution(outcomeId, solutionId) {
  const outcome = state.outcomes.find((item) => item.id === outcomeId);
  const solution = state.solutions.find((item) => item.id === solutionId);
  if (!outcome || !solution) return false;
  outcome.solutionIds = addUnique(outcome.solutionIds || [], solution.id);
  logAction("trace:link", "outcome", `Uitkomst gekoppeld aan oplossing ${solution.id}`, outcome.id);
  return true;
}

function linkSolutionStandardPart(solutionId, standardPartId) {
  const solution = state.solutions.find((item) => item.id === solutionId);
  const part = state.standardParts.find((item) => item.id === standardPartId);
  if (!solution || !part) return false;
  part.solutionIds = addUnique(part.solutionIds || [], solution.id);
  logAction("trace:link", "standardPart", `Oplossing ${solution.id} gekoppeld aan standaardonderdeel`, part.id);
  return true;
}

function reorderFlowItems(collection, movedId, targetId) {
  const visibleIds = flowVisibleIds(collection);
  const fromIndex = visibleIds.indexOf(movedId);
  const toIndex = visibleIds.indexOf(targetId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return false;
  const [moved] = visibleIds.splice(fromIndex, 1);
  visibleIds.splice(toIndex, 0, moved);
  state.meta.flowOrder = state.meta.flowOrder || {};
  state.meta.flowOrder[collection] = visibleIds;
  if (collection !== "requirements") reorderCollectionToIds(collection, visibleIds);
  return true;
}

function flowVisibleIds(collection) {
  if (collection === "inputs") {
    const fromDom = Array.from(document.querySelectorAll("[data-trace-input]")).map((node) => node.dataset.traceInput);
    return fromDom.length ? fromDom : state.inputs.map((input) => input.id);
  }
  if (collection === "points") {
    const fromDom = Array.from(document.querySelectorAll("[data-trace-point]")).map((node) => node.dataset.tracePoint);
    return fromDom.length ? fromDom : state.points.map((point) => point.id);
  }
  if (collection === "requirements") {
    const fromDom = Array.from(document.querySelectorAll("[data-trace-req-id]")).map((node) => node.dataset.traceReqId);
    if (fromDom.length) return fromDom;
    const groups = flowOutcomeGroups();
    const linkedIds = flowLinkedRequirementIds(groups);
    return [
      ...flowRequirementCards(groups).map((card) => card.req.id),
      ...unlinkedFlowRequirements(linkedIds).map((req) => req.id)
    ];
  }
  if (collection === "outcomes") return flowOutcomeGroups().filter((group) => group.real).map((group) => group.outcome.id);
  if (collection === "solutions") return flowSolutions().map((solution) => solution.id);
  if (collection === "standardParts") {
    const fromDom = Array.from(document.querySelectorAll("[data-trace-standard]")).map((node) => node.dataset.traceStandard);
    return fromDom.length ? fromDom : state.standardParts.map((part) => part.id);
  }
  return [];
}

function reorderCollectionToIds(collection, orderedIds) {
  const list = state[collection];
  const position = new Map(orderedIds.map((id, index) => [id, index]));
  list.sort((a, b) => {
    const aPos = position.has(a.id) ? position.get(a.id) : Number.MAX_SAFE_INTEGER;
    const bPos = position.has(b.id) ? position.get(b.id) : Number.MAX_SAFE_INTEGER;
    if (aPos !== bPos) return aPos - bPos;
    return 0;
  });
}

function drawTraceLines() {
  const svg = document.getElementById("traceSvg");
  if (!svg) return;
  const flow = svg.closest(".trace-flow");
  const rect = flow.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  const groups = flowOutcomeGroups();
  const markerColors = new Map();
  const selection = currentFlowSelection();
  const requirementOutcomePaths = groups.flatMap((group, groupIndex) => {
    const outcome = flow.querySelector(`[data-trace-outcome="${cssEscape(group.outcome.id)}"]`);
    if (!outcome) return [];
    return group.requirements.map((req, requirementIndex) => {
      const requirementNode = flow.querySelector(`[data-trace-req-id="${cssEscape(req.id)}"]`);
      if (!requirementNode) return "";
      const active = !selection || (selection.requirements.has(req.id) && selection.outcomes.has(group.outcome.id));
      return tracePath(requirementNode, outcome, rect, requirementColor(req), `arrowHead-requirement-outcome-${groupIndex}-${requirementIndex}`, markerColors, active);
    });
  }).join("");
  const outcomeSolutionPaths = groups.flatMap((group, groupIndex) => {
    const outcome = flow.querySelector(`[data-trace-outcome="${cssEscape(group.outcome.id)}"]`);
    if (!outcome) return [];
    const color = outcomeColor(group.outcome);
    return group.solutionIds.map((solutionId, solutionIndex) => {
      const solution = flow.querySelector(`[data-trace-solution="${cssEscape(solutionId)}"]`);
      if (!solution) return "";
      const active = !selection || (selection.outcomes.has(group.outcome.id) && selection.solutions.has(solutionId));
      return tracePath(outcome, solution, rect, color, `arrowHead-solution-${groupIndex}-${solutionIndex}`, markerColors, active);
    });
  }).join("");
  const solutionStandardPaths = state.standardParts.flatMap((part, partIndex) => {
    const standard = flow.querySelector(`[data-trace-standard="${cssEscape(part.id)}"]`);
    if (!standard) return [];
    const color = standardPartColor(part);
    return (part.solutionIds || []).map((solutionId, solutionIndex) => {
      const solution = flow.querySelector(`[data-trace-solution="${cssEscape(solutionId)}"]`);
      if (!solution) return "";
      const active = !selection || (selection.solutions.has(solutionId) && selection.standardParts.has(part.id));
      return tracePath(solution, standard, rect, color, `arrowHead-standard-${partIndex}-${solutionIndex}`, markerColors, active);
    });
  }).join("");
  const paths = requirementOutcomePaths + outcomeSolutionPaths + solutionStandardPaths;
  svg.innerHTML = `
      <defs>
        ${markerDefs(markerColors)}
      </defs>
      ${paths}
    `;
}

function markerDefs(markerColors) {
  return Array.from(markerColors.entries()).map(([id, color]) => `
    <marker id="${escapeAttr(id)}" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="${color}"></path>
    </marker>
  `).join("");
}

function tracePath(from, to, containerRect, color, markerId, markerColors, active = true) {
  markerColors?.set(markerId, color);
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const aCenter = a.left + a.width / 2;
  const bCenter = b.left + b.width / 2;
  const fromRight = aCenter <= bCenter;
  const x1 = (fromRight ? a.right : a.left) - containerRect.left;
  const y1 = a.top + a.height / 2 - containerRect.top;
  const x2 = (fromRight ? b.left : b.right) - containerRect.left;
  const y2 = b.top + b.height / 2 - containerRect.top;
  const distance = Math.max(Math.abs(x2 - x1), 80);
  const bend = Math.min(Math.max(distance * 0.42, 64), 210) * (fromRight ? 1 : -1);
  const c1x = x1 + bend;
  const c2x = x2 - bend;
  return `<path class="${active ? "flow-line-active" : "flow-line-dimmed"}" d="M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}" stroke="${color}" marker-end="${active ? `url(#${markerId})` : ""}" />`;
}

function uniqueSolutions(solutions) {
  const map = new Map();
  solutions.forEach((solution) => map.set(solution.id, solution));
  return Array.from(map.values());
}

function uniqueRequirements(requirements) {
  const map = new Map();
  requirements.forEach((req) => map.set(req.id, req));
  return Array.from(map.values());
}

function renderAnalysis() {
  const byPriority = countBy(state.outcomes, "priority");
  const byInputCategory = countBy(state.requirements, "category");
  const mustUnlinked = state.outcomes.filter((outcome) => outcome.priority === "Must" && !(outcome.solutionIds || []).length);
  const solutionCoverage = state.solutions
    .map((solution) => ({ solution, count: outcomesForSolution(solution.id).length }))
    .sort((a, b) => b.count - a.count);
  const standardCoverage = state.standardParts
    .map((part) => ({ part, count: (part.solutionIds || []).length }))
    .sort((a, b) => b.count - a.count);
  const requirementsWithoutOutcome = state.requirements.filter((req) => !outcomesForRequirement(req.id).length);
  const outcomesWithoutSolution = state.outcomes.filter((outcome) => !(outcome.solutionIds || []).length);
  const solutionsWithoutStandard = state.solutions.filter((solution) => !state.standardParts.some((part) => (part.solutionIds || []).includes(solution.id)));

  els.analysisGrid.innerHTML = [
    analysisCard("Wenscategorieen", bars(byInputCategory, 8)),
    analysisCard("MoSCoW op uitwerkingen", bars(byPriority)),
    analysisCard("Traceerbaarheid", `
      <p>${state.requirements.length} wensen/input, ${state.outcomes.length} uitwerkingen, ${state.solutions.length} oplossingen en ${state.standardParts.length} standaardonderdelen.</p>
      <p>${requirementsWithoutOutcome.length} wensen/input zonder uitwerking.</p>
      <p>${outcomesWithoutSolution.length} uitwerkingen zonder oplossing.</p>
      <p>${solutionsWithoutStandard.length} oplossingen zonder standaardonderdeel.</p>
    `),
    analysisCard("Oplossingsdekking", solutionCoverage.slice(0, 10).map(({ solution, count }) => `<p><strong>${escapeHtml(solution.name)}</strong>: ${count} uitwerkingen</p>`).join("") || "<p>Nog geen oplossingen.</p>"),
    analysisCard("AV-standaard", standardCoverage.slice(0, 10).map(({ part, count }) => `<p><strong>${escapeHtml(part.id)} ${escapeHtml(part.name)}</strong>: ${escapeHtml(part.priority || "Should")} - ${count} oplossingen</p>`).join("") || "<p>Nog geen standaardonderdelen.</p>"),
    analysisCard("Open Must-uitwerkingen", mustUnlinked.slice(0, 10).map((outcome) => `<p><strong>${escapeHtml(outcome.id)}</strong> ${escapeHtml(outcome.name)}</p>`).join("") || "<p>Geen open Must-uitwerkingen.</p>"),
    analysisCard("Wijzigingen", `
      <p>${state.logs?.length || 0} acties gelogd.</p>
      ${(state.logs || []).slice(-6).reverse().map((log) => `<p><strong>${escapeHtml(log.actor)}</strong>: ${escapeHtml(log.summary)} <small>${new Date(log.at).toLocaleString("nl-NL")}</small></p>`).join("")}
    `)
  ].join("");
}

function outcomesForSolution(solutionId) {
  return state.outcomes.filter((outcome) => (outcome.solutionIds || []).includes(solutionId));
}

function importantRequirements() {
  return state.requirements.map((req) => {
    const sourceCount = splitList(req.source).length;
    const childCount = descendantRequirements(req.id).length;
    const linkedCount = effectiveCoverageSolutionIds(req).length;
    const outcomeCount = outcomesForRequirement(req.id).length;
    const priorityScore = req.priority === "Must" ? 6 : req.priority === "Should" ? 3 : 1;
    const score = priorityScore + Math.min(sourceCount, 6) + Math.min(childCount * 2, 6) + Math.min(linkedCount, 3) + Math.min(outcomeCount, 3);
    return { req, score };
  }).sort((a, b) => b.score - a.score);
}

function analysisCard(title, body) {
  return `<article class="analysis-card"><h3>${escapeHtml(title)}</h3>${body}</article>`;
}

function bars(counts, limit = 16) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  return entries.map(([label, count]) => `
    <div class="bar-row">
      <span>${escapeHtml(label)}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${(count / max) * 100}%"></div></div>
      <strong>${count}</strong>
    </div>
  `).join("") || "<p>Geen data.</p>";
}

function openEditor(type, id = "", preset = {}) {
  editing = { type, id };
  const baseItem = type === "processText" ? (state.meta.processText?.[id] || defaultProcessText[id] || {}) : (findItem(type, id) || blankItem(type));
  const item = { ...baseItem, ...preset };
  els.dialogTitle.textContent = id ? `${labelForType(type)} bewerken` : `${labelForType(type)} toevoegen`;
  els.dialogFields.innerHTML = fieldsFor(type, item);
  els.deleteDialogBtn.hidden = !id || type === "processText";
  if (!els.editDialog.open) els.editDialog.showModal();
}

function fieldsFor(type, item) {
  if (type === "processText") {
    return `
      ${field("Titel", "editTitle", item.title || "", "field-full")}
      ${textareaField("Omschrijving", "editDescription", item.description || "", "field-full")}
    `;
  }
  if (type === "input") {
    return `
      ${field("Input ID", "editId", item.id)}
      ${field("Titel", "editTitle", item.title, "field-full")}
      ${field("Wie/stakeholder", "editStakeholder", item.stakeholder || "")}
      ${field("Rol/functie", "editRole", item.role || "")}
      ${selectField("Hoe verkregen", "editMethod", ["Interview/input", "Data-analyse", "Observatie", "Document", "Externe orientatie"], item.method || "Interview/input")}
      ${field("Datum", "editDate", item.date || "", "", "date")}
      ${textareaField("Omschrijving/input", "editDescription", item.description || "", "field-full")}
      ${field("Gekoppelde punten", "editPointIds", (item.pointIds || []).join("; "), "field-full")}
      ${field("Bronbestand", "editSourcePath", item.sourcePath || "", "field-full")}
      ${selectField("Status", "editStatus", ["Nieuw", "Te verwerken", "Verwerkt", "Te controleren"], item.status || "Nieuw")}
    `;
  }
  if (type === "point") {
    return `
      ${field("Punt ID", "editId", item.id)}
      ${field("Punt", "editTitle", item.title, "field-full")}
      ${field("Categorie", "editCategory", item.category || "")}
      ${selectField("Status", "editStatus", ["Voorstel", "Te controleren", "Goedgekeurd", "Vervallen"], item.status || "Voorstel")}
      ${textareaField("Toelichting", "editDescription", item.description || "", "field-full")}
      ${field("Gekoppelde eisen/input", "editRequirementIds", (item.requirementIds || []).join("; "), "field-full")}
      ${field("Gekoppelde uitwerkingen", "editOutcomeIds", (item.outcomeIds || []).join("; "), "field-full")}
    `;
  }
  if (type === "requirement") {
    return `
      ${field("Wens/input ID", "editId", item.id)}
      ${selectField("Categorie", "editCategory", categories, item.category)}
      ${field("Type input", "editType", item.type || "Wens/input")}
      ${parentSelectField(item.parentId || "", item.id)}
      ${requirementRelationsField(item)}
      ${textareaField("Titel / wens", "editRequirement", item.requirement, "field-full")}
      ${textareaField("Duidelijke omschrijving van de wens", "editExplanation", item.explanation, "field-full")}
      ${sourceInputField(item.source, "field-full")}
      ${textareaField("Onderbouwing vanuit input", "editEvidence", item.evidence, "field-full")}
      ${selectField("Status", "editStatus", ["Concept", "Te toetsen", "Goedgekeurd", "Vervallen"], item.status || "Concept")}
      ${field("Eigenaar", "editOwner", item.owner || "")}
    `;
  }
  if (type === "wish") {
    return `
      ${field("Wens ID", "editId", item.id)}
      ${field("Categorie", "editCategory", item.category)}
      ${selectField("Status", "editStatus", ["Nieuw", "Te toetsen", "Verwerkt in eisen", "Niet meenemen"], item.status || "Nieuw")}
      ${field("Bron", "editSource", item.source, "field-full")}
      ${textareaField("Wens/behoefte", "editWish", item.wish, "field-full")}
      ${field("Gekoppelde eisen", "editRequirementIds", (item.requirementIds || []).join("; "), "field-full")}
    `;
  }
  if (type === "solution") {
    return `
      ${field("Oplossing ID", "editId", item.id)}
      ${field("Naam", "editName", item.name)}
      ${selectField("Type", "editType", ["Technisch", "Proces", "Beheer", "Instructie", "Ontwerp", "Innovatie"], item.type || "Technisch")}
      ${selectField("Status", "editStatus", ["Idee", "Te onderzoeken", "Voorkeur", "PoC", "Gekozen", "Afgevallen"], item.status || "Idee")}
      ${textareaField("Beschrijving", "editDescription", item.description || "", "field-full")}
      ${field("Gekoppelde eisen", "editRequirementIds", (item.requirementIds || []).join("; "), "field-full")}
      ${textareaField("Risico/aandachtspunt", "editRisk", item.risk || "")}
      ${textareaField("Notitie", "editNote", item.note || "")}
    `;
  }
  if (type === "standardPart") {
    return `
      ${field("Standaard ID", "editId", item.id)}
      ${field("Naam", "editName", item.name)}
      ${selectField("Type", "editType", ["Standaard", "Ontwerp", "Technisch", "Beheer", "Proces", "Instructie", "Innovatie"], item.type || "Standaard")}
      ${selectField("Prioriteit", "editPriority", priorities, item.priority || "Should")}
      ${selectField("Status", "editStatus", ["Concept", "Te toetsen", "Gekozen", "Uitgesteld", "Vervallen"], item.status || "Concept")}
      ${textareaField("Beschrijving", "editDescription", item.description || "", "field-full")}
      ${field("Gekoppelde oplossingen", "editSolutionIds", (item.solutionIds || []).join("; "), "field-full")}
      ${field("Eigenaar", "editOwner", item.owner || "")}
      ${textareaField("Notitie", "editNote", item.note || "", "field-full")}
    `;
  }
  if (type === "outcome") {
    return `
      ${field("Uitwerking ID", "editId", item.id)}
      ${field("Uitwerking", "editName", item.name)}
      ${selectField("Type", "editOutcomeType", ["Functioneel", "Technisch", "Gebruik", "Beheer", "Monitoring", "Ondersteuning"], item.outcomeType || "Functioneel")}
      ${selectField("MoSCoW", "editPriority", priorities, item.priority || "Should")}
      ${selectField("Status", "editStatus", ["Concept", "Te toetsen", "Goedgekeurd", "Vervallen"], item.status || "Concept")}
      ${textareaField("Toelichting", "editDescription", item.description || "", "field-full")}
      ${field("Gekoppelde punten", "editPointIds", (item.pointIds || []).join("; "), "field-full")}
      ${field("Onderbouwende wensen/input", "editRequirementIds", (item.requirementIds || []).join("; "), "field-full")}
      ${field("Gekoppelde oplossingen", "editSolutionIds", (item.solutionIds || []).join("; "), "field-full")}
      ${textareaField("Notitie", "editNote", item.note || "", "field-full")}
    `;
  }
  return `
    ${field("Bron ID", "editId", item.id)}
    ${field("Titel", "editTitle", item.title, "field-full")}
    ${selectField("Type", "editType", ["Interview/input", "Data-analyse", "Externe orientatie", "Observatie", "Document"], item.type || "Interview/input")}
    ${field("Datum", "editDate", item.date || "", "", "date")}
    ${field("Bestandspad", "editPath", item.path || "", "field-full")}
    ${selectField("Status", "editStatus", ["Nieuw", "Te verwerken", "Verwerkt", "Te controleren"], item.status || "Nieuw")}
    ${textareaField("Kerninzicht", "editInsight", item.insight || "", "field-full")}
  `;
}

function saveEditor() {
  const { type, id } = editing;
  if (type === "processText") {
    state.meta.processText = mergeProcessText(state.meta.processText);
    state.meta.processText[id] = {
      title: value("editTitle"),
      description: value("editDescription")
    };
    logAction("update", "processText", "Procestekst bijgewerkt", id);
    autoSave();
    els.editDialog.close();
    renderAll();
    return;
  }
  const item = readEditor(type);
  const collection = collectionFor(type);
  const index = state[collection].findIndex((existing) => existing.id === id);
  if (index >= 0 && id !== item.id) updateReferencesAfterIdChange(type, id, item.id);
  if (index >= 0) state[collection][index] = item;
  else state[collection].push(item);
  if (type === "solution") syncSolutionLinks(item.id, item.requirementIds);
  logAction(index >= 0 ? "update" : "create", type, `${labelForType(type)} ${index >= 0 ? "bijgewerkt" : "toegevoegd"}`, item.id);
  autoSave();
  els.editDialog.close();
  renderAll();
}

function readEditor(type) {
  if (type === "input") {
    const existing = findItem(type, editing.id);
    return {
      id: value("editId"),
      title: value("editTitle"),
      stakeholder: value("editStakeholder"),
      role: value("editRole"),
      method: value("editMethod"),
      date: value("editDate"),
      description: value("editDescription"),
      pointIds: splitList(value("editPointIds")),
      sourcePath: value("editSourcePath"),
      status: value("editStatus"),
      order: existing?.order || state.inputs.length + 1
    };
  }
  if (type === "point") {
    const existing = findItem(type, editing.id);
    return {
      id: value("editId"),
      title: value("editTitle"),
      category: value("editCategory"),
      status: value("editStatus"),
      description: value("editDescription"),
      inputIds: existing?.inputIds || [],
      outcomeIds: splitList(value("editOutcomeIds")),
      requirementIds: splitList(value("editRequirementIds")),
      order: existing?.order || state.points.length + 1
    };
  }
  if (type === "requirement") {
    const existing = findItem(type, editing.id);
    const id = value("editId");
    return {
      id,
      kind: "Eis",
      category: value("editCategory"),
      requirement: value("editRequirement"),
      explanation: value("editExplanation"),
      source: value("editSource"),
      type: value("editType"),
      priority: existing?.priority || "Should",
      evidence: value("editEvidence"),
      status: value("editStatus"),
      owner: value("editOwner"),
      solutionIds: existing?.solutionIds || [],
      isParent: childRequirements(id).length > 0,
      parentId: value("editParentId"),
      order: existing?.order || state.requirements.length + 1
    };
  }
  if (type === "wish") {
    return {
      id: value("editId"),
      kind: "Wens",
      wish: value("editWish"),
      source: value("editSource"),
      category: value("editCategory"),
      status: value("editStatus"),
      requirementIds: splitList(value("editRequirementIds"))
    };
  }
  if (type === "solution") {
    return {
      id: value("editId"),
      name: value("editName"),
      type: value("editType"),
      status: value("editStatus"),
      description: value("editDescription"),
      requirementIds: splitList(value("editRequirementIds")),
      risk: value("editRisk"),
      note: value("editNote")
    };
  }
  if (type === "standardPart") {
    const existing = findItem(type, editing.id);
    return {
      id: value("editId"),
      name: value("editName"),
      type: value("editType"),
      priority: normalizePriority(value("editPriority")),
      status: value("editStatus"),
      description: value("editDescription"),
      solutionIds: splitList(value("editSolutionIds")),
      owner: value("editOwner"),
      note: value("editNote"),
      order: existing?.order || state.standardParts.length + 1
    };
  }
  if (type === "outcome") {
    return {
      id: value("editId"),
      name: value("editName"),
      outcomeType: value("editOutcomeType"),
      priority: value("editPriority"),
      status: value("editStatus"),
      description: value("editDescription"),
      pointIds: splitList(value("editPointIds")),
      requirementIds: splitList(value("editRequirementIds")),
      solutionIds: splitList(value("editSolutionIds")),
      note: value("editNote")
    };
  }
  return {
    id: value("editId"),
    title: value("editTitle"),
    type: value("editType"),
    date: value("editDate"),
    path: value("editPath"),
    status: value("editStatus"),
    insight: value("editInsight")
  };
}

function deleteEditingItem() {
  const { type, id } = editing;
  const collection = collectionFor(type);
  state[collection] = state[collection].filter((item) => item.id !== id);
  if (type === "requirement") {
    state.solutions.forEach((solution) => {
      solution.requirementIds = solution.requirementIds.filter((reqId) => reqId !== id);
    });
    state.outcomes.forEach((outcome) => {
      outcome.requirementIds = outcome.requirementIds.filter((reqId) => reqId !== id);
    });
    state.points.forEach((point) => {
      point.requirementIds = (point.requirementIds || []).filter((reqId) => reqId !== id);
    });
    state.wishes.forEach((wish) => {
      wish.requirementIds = wish.requirementIds.filter((reqId) => reqId !== id);
    });
    state.requirements.forEach((req) => {
      if (req.parentId === id) req.parentId = "";
    });
  }
  if (type === "input") {
    state.points.forEach((point) => {
      point.inputIds = (point.inputIds || []).filter((inputId) => inputId !== id);
    });
  }
  if (type === "point") {
    state.inputs.forEach((input) => {
      input.pointIds = (input.pointIds || []).filter((pointId) => pointId !== id);
    });
    state.outcomes.forEach((outcome) => {
      outcome.pointIds = (outcome.pointIds || []).filter((pointId) => pointId !== id);
    });
  }
  if (type === "solution") {
    state.requirements.forEach((req) => {
      req.solutionIds = req.solutionIds.filter((solutionId) => solutionId !== id);
    });
    state.outcomes.forEach((outcome) => {
      outcome.solutionIds = outcome.solutionIds.filter((solutionId) => solutionId !== id);
    });
    state.standardParts.forEach((part) => {
      part.solutionIds = (part.solutionIds || []).filter((solutionId) => solutionId !== id);
    });
  }
  logAction("delete", type, `${labelForType(type)} verwijderd`, id);
  autoSave();
  els.editDialog.close();
  renderAll();
}

function cyclePriority(requirementId) {
  const req = state.requirements.find((item) => item.id === requirementId);
  if (!req) return;
  const current = priorities.indexOf(req.priority);
  req.priority = priorities[(current + 1) % priorities.length];
  logAction("priority:update", "requirement", `Prioriteit gewijzigd naar ${req.priority}`, req.id);
  autoSave();
  renderAll();
  toast(`${req.id} is nu ${req.priority}.`);
}

function setPriority(requirementId, priority) {
  const req = state.requirements.find((item) => item.id === requirementId);
  if (!req) return;
  req.priority = normalizePriority(priority);
  logAction("priority:update", "requirement", `Prioriteit gewijzigd naar ${req.priority}`, req.id);
  autoSave();
  renderAll();
}

function bindDragAndDrop() {
  document.querySelectorAll("[data-req-id]").forEach((row) => {
    row.addEventListener("dragstart", (event) => {
      draggedRequirementId = row.dataset.reqId;
      event.dataTransfer.effectAllowed = "move";
    });
    row.addEventListener("dragend", () => {
      draggedRequirementId = null;
      document.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
    });
  });

  document.querySelectorAll("[data-parent-target], [data-sibling-target]").forEach((row) => {
    row.addEventListener("dragover", (event) => {
      if (!draggedRequirementId) return;
      event.preventDefault();
      row.classList.add("drag-over");
    });
    row.addEventListener("dragleave", () => row.classList.remove("drag-over"));
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      row.classList.remove("drag-over");
      handleRequirementDrop(row);
    });
  });
}

function handleRequirementDrop(targetRow) {
  const dragged = state.requirements.find((req) => req.id === draggedRequirementId);
  if (!dragged) return;

  const parentTargetId = targetRow.dataset.parentTarget;
  const siblingTargetId = targetRow.dataset.siblingTarget;

  if (parentTargetId && parentTargetId !== dragged.id && !isDescendant(parentTargetId, dragged.id)) {
    dragged.parentId = parentTargetId;
    dragged.order = nextChildOrder(parentTargetId);
  } else if (siblingTargetId && siblingTargetId !== dragged.id) {
    const sibling = state.requirements.find((req) => req.id === siblingTargetId);
    if (sibling && !isDescendant(sibling.parentId, dragged.id)) {
      dragged.parentId = sibling.parentId || "";
      dragged.order = Number(sibling.order || 0) + 0.01;
      normalizeOrder(dragged.parentId);
    }
  }

  logAction("hierarchy:update", "requirement", `Subitem-koppeling gewijzigd`, dragged.id);
  autoSave();
  renderAll();
}

function isDescendant(possibleChildId, parentId) {
  if (!possibleChildId) return false;
  let current = state.requirements.find((req) => req.id === possibleChildId);
  while (current) {
    if (current.parentId === parentId) return true;
    current = state.requirements.find((req) => req.id === current.parentId);
  }
  return false;
}

function nextChildOrder(parentId) {
  const children = state.requirements.filter((req) => req.parentId === parentId);
  return Math.max(0, ...children.map((req) => Number(req.order || 0))) + 1;
}

function normalizeOrder(parentId = "") {
  state.requirements
    .filter((req) => (req.parentId || "") === (parentId || ""))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
    .forEach((req, index) => {
      req.order = index + 1;
    });
}

function openLinkDialog(requirementId) {
  linkingRequirementId = requirementId;
  const req = state.requirements.find((item) => item.id === requirementId);
  els.linkRequirementLabel.textContent = `${req.id}: ${req.requirement}`;
  els.existingSolutionSelect.innerHTML = `<option value="">Kies bestaande oplossing</option>` + state.solutions.map((solution) => `
    <option value="${escapeAttr(solution.id)}">${escapeHtml(solution.id)} - ${escapeHtml(solution.name)}</option>
  `).join("");
  els.newSolutionName.value = "";
  els.newSolutionDescription.value = "";
  els.linkDialog.showModal();
}

function saveLink() {
  const req = state.requirements.find((item) => item.id === linkingRequirementId);
  if (!req) return;

  let solutionId = els.existingSolutionSelect.value;
  if (!solutionId) {
    const name = els.newSolutionName.value.trim();
    if (!name) {
      toast("Kies een oplossing of vul een nieuwe naam in.");
      return;
    }
    const solution = {
      id: nextId("OPL", state.solutions),
      name,
      type: "Ontwerp",
      status: "Idee",
      description: els.newSolutionDescription.value.trim(),
      requirementIds: [],
      risk: "",
      note: ""
    };
    state.solutions.push(solution);
    solutionId = solution.id;
  }

  const solution = state.solutions.find((item) => item.id === solutionId);
  req.solutionIds = addUnique(req.solutionIds, solutionId);
  solution.requirementIds = addUnique(solution.requirementIds, req.id);
  const bridge = createOutcomeBridge(req, solution, "Automatisch aangemaakt via directe oplossingskoppeling.");
  logAction("solution:link", "requirement", `Oplossing ${solutionId} gekoppeld`, req.id);
  logAction(bridge.created ? "outcome:create" : "outcome:reuse", "outcome", `Uitkomstbrug ${bridge.created ? "gemaakt" : "gebruikt"} voor eis ${req.id} en oplossing ${solutionId}`, bridge.outcome.id);
  autoSave();
  els.linkDialog.close();
  renderAll();
}

function createOutcomeBridge(req, solution, note) {
  const existing = state.outcomes.find((outcome) => {
    return (outcome.solutionIds || []).includes(solution.id) && outcomeCoversRequirement(outcome, req.id);
  });
  if (existing) return { outcome: existing, created: false };
  const outcome = {
    id: nextId("UIT", state.outcomes),
    name: req.requirement.slice(0, 70),
    outcomeType: req.type?.includes("Technisch") ? "Technisch" : "Functioneel",
    status: "Concept",
    description: req.explanation || req.requirement,
    requirementIds: [req.id],
    solutionIds: [solution.id],
    note
  };
  state.outcomes.push(outcome);
  return { outcome, created: true };
}

function ensureOutcomeBridgesForDirectLinks() {
  let created = 0;
  state.requirements.forEach((req) => {
    (req.solutionIds || []).forEach((solutionId) => {
      const solution = state.solutions.find((item) => item.id === solutionId);
      if (!solution) return;
      const bridge = createOutcomeBridge(req, solution, "Automatisch aangemaakt uit bestaande directe koppeling.");
      if (bridge.created) created += 1;
    });
  });
  state.solutions.forEach((solution) => {
    (solution.requirementIds || []).forEach((requirementId) => {
      const req = state.requirements.find((item) => item.id === requirementId);
      if (!req) return;
      const bridge = createOutcomeBridge(req, solution, "Automatisch aangemaakt uit bestaande directe koppeling.");
      if (bridge.created) created += 1;
    });
  });
  if (created) logAction("migration:outcomes", "outcome", `${created} uitkomstbruggen aangemaakt uit directe koppelingen`);
}

function syncSolutionLinks(solutionId, requirementIds) {
  const solution = state.solutions.find((item) => item.id === solutionId);
  state.requirements.forEach((req) => {
    req.solutionIds = requirementIds.includes(req.id)
      ? addUnique(req.solutionIds, solutionId)
      : req.solutionIds.filter((id) => id !== solutionId);
    if (solution && requirementIds.includes(req.id)) {
      createOutcomeBridge(req, solution, "Automatisch aangemaakt via handmatige oplossingskoppeling.");
    }
  });
}

function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabId));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
  if (tabId === "flow") {
    window.requestAnimationFrame(updateFlowBoard);
    window.setTimeout(updateFlowBoard, 80);
  }
}

function openDrawer() {
  els.inputDrawer.classList.add("open");
  els.drawerShade.hidden = false;
}

function closeDrawer() {
  els.inputDrawer.classList.remove("open");
  els.drawerShade.hidden = true;
}

function exportJson() {
  logAction("export:json", "dashboard", "Werkbestand geexporteerd");
  autoSave(false);
  download("pve_dashboard_export.json", JSON.stringify(state, null, 2), "application/json");
}

function exportSharePackage() {
  logAction("export:share", "dashboard", "Werkbestand en logboek geexporteerd");
  autoSave(false);
  const stamp = new Date().toISOString().slice(0, 19).replaceAll(":", "-");
  const actor = (state.meta.actor || "onbekend").replace(/[^a-z0-9_-]+/gi, "_");
  download(`pve_dashboard_${actor}_${stamp}.json`, JSON.stringify(state, null, 2), "application/json");
  toast("Deelbestand met logboek geexporteerd.");
}

function exportRequirementsCsv() {
  const headers = ["Uitwerking", "Type", "MoSCoW", "Status", "Toelichting", "Wensen/input", "Oplossingen", "AV-standaardonderdelen"];
  const rows = state.outcomes.map((outcome) => [
    outcome.id,
    outcome.outcomeType,
    outcome.priority,
    outcome.status,
    outcome.description,
    Array.from(coveredRequirementIdsForOutcome(outcome)).join("; "),
    solutionNames(outcome.solutionIds || []).join("; "),
    standardPartNamesForSolutions(outcome.solutionIds || []).join("; ")
  ]);
  logAction("export:csv", "dashboard", "Uitwerkingen CSV geexporteerd");
  autoSave(false);
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  download("pve_uitwerkingen_export.csv", csv, "text/csv");
}

function importJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state = normalizeState(JSON.parse(reader.result));
    ensureTraceModel();
    ensureOutcomeBridgesForDirectLinks();
    logAction("import", "dashboard", "Werkbestand geimporteerd");
    autoSave();
    renderAll();
    ensureActor();
    toast("Werkbestand geimporteerd.");
  };
  reader.readAsText(file);
  event.target.value = "";
}

async function resetFromWorkfile() {
  localStorage.removeItem(STORAGE_KEY);
  PREVIOUS_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  const loadedWorkfile = await loadBaseWorkfile();
  if (!loadedWorkfile) {
    await loadRequirementsFromMarkdown();
    deriveSourcesFromRequirements();
    seedWishes();
    ensureTraceModel();
    state.solutions = [];
    state.outcomes = [];
  }
  state.logs = state.logs || [];
  logAction("reset", "dashboard", loadedWorkfile ? "Opnieuw geladen uit centraal werkbestand" : "Opnieuw geladen uit Markdown");
  autoSave();
  renderAll();
  toast(loadedWorkfile ? "Opnieuw geladen uit centraal werkbestand." : "Opnieuw geladen uit Markdown.");
}

async function publishOnlineWorkfile() {
  const confirmed = window.confirm(
    "Publiceer de huidige lokale versie als nieuwe online standaardopstelling?\n\n" +
    "Dit overschrijft de basis van de online speelversie op GitHub Pages. Je lokale origineel blijft behouden."
  );
  if (!confirmed) return;

  logAction("publish:online", "dashboard", "Publicatie naar online speelversie gestart");
  autoSave(false);
  toast("Online publicatie gestart...");
  els.fileMenu.hidden = true;
  if (els.publishOnlineBtn) els.publishOnlineBtn.disabled = true;

  try {
    const response = await fetch("http://127.0.0.1:4174/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      throw new Error(result.error || `Publiceren mislukt (${response.status}).`);
    }

    logAction("publish:online:success", "dashboard", "Online speelversie gepubliceerd");
    autoSave(false);
    toast("Online speelversie gepubliceerd.");
    window.alert(`Online speelversie gepubliceerd.\n\n${result.url || "https://leades-avcore.github.io/av-standaard-erasmusmc/"}`);
  } catch (error) {
    console.error(error);
    toast("Publiceren lukte niet. Start de publish-helper.");
    window.alert(
      "Publiceren lukte niet.\n\n" +
      "Start eerst de lokale publish-helper in Terminal:\n\n" +
      "node pve_dashboard/tools/publish-helper.mjs\n\n" +
      `Foutmelding: ${error.message}`
    );
  } finally {
    if (els.publishOnlineBtn) els.publishOnlineBtn.disabled = false;
  }
}

function autoSave(showToast = true) {
  state.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  els.saveState.textContent = `Automatisch opgeslagen ${new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" })}`;
  if (showToast) toast("Automatisch opgeslagen.");
}

function ensureActor() {
  if (state.meta.actor) return;
  els.actorNameInput.value = "";
  els.actorDialog.showModal();
}

function logAction(action, entityType, summary, entityId = "") {
  state.logs = state.logs || [];
  state.logs.push({
    id: `LOG-${String(state.logs.length + 1).padStart(4, "0")}`,
    at: new Date().toISOString(),
    actor: state.meta.actor || "Onbekend",
    action,
    entityType,
    entityId,
    summary
  });
}

function findItem(type, id) {
  return state[collectionFor(type)].find((item) => item.id === id);
}

function blankItem(type) {
  if (type === "input") {
    return {
      id: nextId("INP", state.inputs),
      title: "",
      stakeholder: "",
      role: "",
      method: "Interview/input",
      date: "",
      description: "",
      pointIds: [],
      sourcePath: "",
      status: "Nieuw",
      order: state.inputs.length + 1
    };
  }
  if (type === "point") {
    return {
      id: nextId("PNT", state.points),
      title: "",
      description: "",
      inputIds: [],
      outcomeIds: [],
      requirementIds: [],
      category: "",
      status: "Voorstel",
      order: state.points.length + 1
    };
  }
  if (type === "requirement") {
    return {
      id: nextRequirementId(),
      category: "Functionele eisen",
      requirement: "",
      explanation: "",
      source: "",
      type: "Functionele eis",
      priority: "Should",
      evidence: "",
      status: "Concept",
      owner: "",
      solutionIds: [],
      isParent: false,
      parentId: "",
      order: state.requirements.length + 1
    };
  }
  if (type === "wish") {
    return {
      id: nextId("WENS", state.wishes),
      wish: "",
      source: "",
      category: "",
      status: "Nieuw",
      requirementIds: []
    };
  }
  if (type === "solution") {
    return {
      id: nextId("OPL", state.solutions),
      name: "",
      type: "Technisch",
      status: "Idee",
      description: "",
      requirementIds: [],
      risk: "",
      note: ""
    };
  }
  if (type === "standardPart") {
    return {
      id: nextId("STD", state.standardParts),
      name: "",
      type: "Standaard",
      priority: "Should",
      status: "Concept",
      description: "",
      solutionIds: [],
      owner: "",
      note: "",
      order: state.standardParts.length + 1
    };
  }
  if (type === "outcome") {
    return {
      id: nextId("UIT", state.outcomes),
      name: "",
      outcomeType: "Functioneel",
      priority: "Should",
      status: "Concept",
      description: "",
      pointIds: [],
      requirementIds: [],
      solutionIds: [],
      note: ""
    };
  }
  return {
    id: nextId("BR", state.sources),
    title: "",
    type: "Interview/input",
    date: "",
    path: "",
    status: "Nieuw",
    insight: ""
  };
}

function collectionFor(type) {
  return {
    input: "inputs",
    point: "points",
    requirement: "requirements",
    wish: "wishes",
    solution: "solutions",
    standardPart: "standardParts",
    outcome: "outcomes",
    source: "sources"
  }[type];
}

function labelForType(type) {
  return {
    input: "Input",
    point: "Punt",
    requirement: "Wens/input",
    wish: "Wens",
    solution: "Oplossing",
    standardPart: "Standaardonderdeel",
    outcome: "Uitwerking",
    source: "Bron",
    processText: "Procestekst"
  }[type];
}

function fillSelect(select, options, selected, emptyLabel) {
  const html = options.map((option) => {
    const label = option || emptyLabel;
    return `<option value="${escapeAttr(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
  if (select.innerHTML !== html) select.innerHTML = html;
}

function field(label, id, valueToUse = "", className = "", type = "text") {
  return `<label class="${className}">${label}<input id="${id}" type="${type}" value="${escapeAttr(valueToUse)}"></label>`;
}

function textareaField(label, id, valueToUse = "", className = "") {
  return `<label class="${className}">${label}<textarea id="${id}">${escapeHtml(valueToUse)}</textarea></label>`;
}

function selectField(label, id, options, valueToUse = "", className = "") {
  return `<label class="${className}">${label}<select id="${id}">
    ${options.map((option) => `<option value="${escapeAttr(option)}" ${option === valueToUse ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
  </select></label>`;
}

function checkboxField(label, id, checked = false, className = "") {
  return `<label class="check-field ${className}"><input id="${id}" type="checkbox" ${checked ? "checked" : ""}>${label}</label>`;
}

function parentSelectField(valueToUse = "", ownId = "") {
  const parents = state.requirements.filter((req) => req.id !== ownId && !isDescendant(req.id, ownId));
  return `<label>Is subitem van wens/input<select id="editParentId">
    <option value="">Geen</option>
    ${parents.map((req) => `<option value="${escapeAttr(req.id)}" ${req.id === valueToUse ? "selected" : ""}>${escapeHtml(req.id)} - ${escapeHtml(req.requirement)}</option>`).join("")}
  </select></label>`;
}

function requirementRelationsField(item) {
  if (!item.id) {
    return `<div class="relation-box field-full"><strong>Subitems</strong><p class="muted">Sla de wens/input eerst op om subitems te koppelen.</p></div>`;
  }
  const parent = item.parentId ? state.requirements.find((req) => req.id === item.parentId) : null;
  const children = childRequirements(item.id).sort(compareRequirementsByHierarchy);
  const outcomes = outcomesForRequirement(item.id);
  const solutions = effectiveCoverageSolutionIds(item)
    .map((id) => state.solutions.find((solution) => solution.id === id))
    .filter(Boolean);
  return `
    <div class="relation-box field-full">
      <strong>Relaties</strong>
      ${parent ? `<p>Hoort als subitem bij <button type="button" class="relation-button" onclick="openEditor('requirement', '${escapeAttr(parent.id)}')">${escapeHtml(parent.id)}</button></p>` : `<p class="muted">Deze wens/input heeft geen bovenliggend item.</p>`}
      <div class="relation-section">
        <span>Subitems</span>
        ${children.length ? children.map((child) => `<button type="button" class="relation-button" onclick="openEditor('requirement', '${escapeAttr(child.id)}')">${escapeHtml(child.id)}</button>`).join("") : `<small class="muted">Geen subitems gekoppeld.</small>`}
      </div>
      <div class="relation-section">
        <span>Uitkomsten</span>
        ${outcomes.length ? outcomes.map((outcome) => `<button type="button" class="relation-button" onclick="openEditor('outcome', '${escapeAttr(outcome.id)}')">${escapeHtml(outcome.id)}</button>`).join("") : `<small class="muted">Geen uitkomst gekoppeld.</small>`}
      </div>
      <div class="relation-section">
        <span>Oplossingen</span>
        ${solutions.length ? solutions.map((solution) => `<button type="button" class="relation-button" onclick="openEditor('solution', '${escapeAttr(solution.id)}')">${escapeHtml(solution.id)}</button>`).join("") : `<small class="muted">Geen oplossing gekoppeld.</small>`}
      </div>
    </div>
  `;
}

function sourceInputField(valueToUse = "", className = "") {
  const listId = "sourceOptions";
  return `<label class="${className}">Bron
    <input id="editSource" list="${listId}" value="${escapeAttr(valueToUse)}" placeholder="Kies of typ bron; meerdere bronnen scheiden met ;">
    <datalist id="${listId}">
      ${state.sources.map((source) => `<option value="${escapeAttr(source.title)}"></option>`).join("")}
    </datalist>
  </label>`;
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const valueToUse = item[key] || "Onbekend";
    acc[valueToUse] = (acc[valueToUse] || 0) + 1;
    return acc;
  }, {});
}

function countSources() {
  const counts = {};
  state.requirements.forEach((req) => {
    splitList(req.source).forEach((source) => {
      counts[source] = (counts[source] || 0) + 1;
    });
  });
  return counts;
}

function splitList(valueToSplit) {
  return String(valueToSplit || "").split(/[;,]/).map((item) => item.trim()).filter(Boolean);
}

function solutionNames(solutionIds = []) {
  return solutionIds
    .map((id) => state.solutions.find((solution) => solution.id === id))
    .filter(Boolean)
    .map((solution) => `${solution.id} ${solution.name}`);
}

function standardPartNamesForSolutions(solutionIds = []) {
  const solutionSet = new Set(solutionIds);
  return state.standardParts
    .filter((part) => (part.solutionIds || []).some((solutionId) => solutionSet.has(solutionId)))
    .map((part) => `${part.id} ${part.name}`);
}

function effectiveSolutionIds(requirement) {
  const ids = new Set(requirement.solutionIds || []);
  if (requirement.parentId) {
    const parent = state.requirements.find((req) => req.id === requirement.parentId);
    (parent?.solutionIds || []).forEach((id) => ids.add(id));
  }
  return Array.from(ids);
}

function effectiveCoverageSolutionIds(requirement) {
  const ids = new Set(effectiveSolutionIds(requirement));
  outcomesForRequirement(requirement.id).forEach((outcome) => {
    (outcome.solutionIds || []).forEach((solutionId) => ids.add(solutionId));
  });
  return Array.from(ids);
}

function requirementsCoveredBySolution(solutionId) {
  const coveredIds = new Set();
  const solution = state.solutions.find((item) => item.id === solutionId);
  (solution?.requirementIds || []).forEach((reqId) => addRequirementWithDescendants(coveredIds, reqId));
  state.requirements
    .filter((req) => (req.solutionIds || []).includes(solutionId))
    .forEach((req) => addRequirementWithDescendants(coveredIds, req.id));
  state.outcomes
    .filter((outcome) => (outcome.solutionIds || []).includes(solutionId))
    .forEach((outcome) => {
      coveredRequirementIdsForOutcome(outcome).forEach((reqId) => coveredIds.add(reqId));
    });
  return Array.from(coveredIds).map(requirementById).filter(Boolean);
}

function outcomesForRequirement(requirementId) {
  return state.outcomes.filter((outcome) => outcomeCoversRequirement(outcome, requirementId));
}

function outcomeCoversRequirement(outcome, requirementId) {
  return coveredRequirementIdsForOutcome(outcome).has(requirementId);
}

function coveredRequirementIdsForOutcome(outcome) {
  const coveredIds = new Set();
  (outcome.requirementIds || []).forEach((reqId) => addRequirementWithDescendants(coveredIds, reqId));
  (outcome.pointIds || []).forEach((pointId) => {
    const point = state.points.find((item) => item.id === pointId);
    (point?.requirementIds || []).forEach((reqId) => addRequirementWithDescendants(coveredIds, reqId));
  });
  return coveredIds;
}

function addRequirementWithDescendants(target, requirementId) {
  const requirement = requirementById(requirementId);
  if (!requirement) return;
  target.add(requirement.id);
  descendantRequirements(requirement.id).forEach((child) => target.add(child.id));
}

function requirementById(requirementId) {
  return state.requirements.find((req) => req.id === requirementId);
}

function updateReferencesAfterIdChange(type, oldId, newId) {
  if (!oldId || !newId || oldId === newId) return;
  if (type === "input") {
    state.points.forEach((point) => {
      point.inputIds = replaceId(point.inputIds, oldId, newId);
    });
  }
  if (type === "point") {
    state.inputs.forEach((input) => {
      input.pointIds = replaceId(input.pointIds, oldId, newId);
    });
    state.outcomes.forEach((outcome) => {
      outcome.pointIds = replaceId(outcome.pointIds, oldId, newId);
    });
  }
  if (type === "requirement") {
    state.requirements.forEach((req) => {
      if (req.parentId === oldId) req.parentId = newId;
    });
    state.points.forEach((point) => {
      point.requirementIds = replaceId(point.requirementIds, oldId, newId);
    });
    state.wishes.forEach((wish) => {
      wish.requirementIds = replaceId(wish.requirementIds, oldId, newId);
    });
    state.solutions.forEach((solution) => {
      solution.requirementIds = replaceId(solution.requirementIds, oldId, newId);
    });
    state.outcomes.forEach((outcome) => {
      outcome.requirementIds = replaceId(outcome.requirementIds, oldId, newId);
    });
  }
  if (type === "solution") {
    state.requirements.forEach((req) => {
      req.solutionIds = replaceId(req.solutionIds, oldId, newId);
    });
    state.outcomes.forEach((outcome) => {
      outcome.solutionIds = replaceId(outcome.solutionIds, oldId, newId);
    });
    state.standardParts.forEach((part) => {
      part.solutionIds = replaceId(part.solutionIds, oldId, newId);
    });
  }
  if (type === "outcome") {
    state.points.forEach((point) => {
      point.outcomeIds = replaceId(point.outcomeIds, oldId, newId);
    });
  }
}

function replaceId(list = [], oldId, newId) {
  return Array.from(new Set(list.map((id) => (id === oldId ? newId : id))));
}

function childRequirements(parentId) {
  return state.requirements.filter((req) => req.parentId === parentId);
}

function descendantRequirements(parentId) {
  const output = [];
  const walk = (id) => {
    childRequirements(id).forEach((child) => {
      output.push(child);
      walk(child.id);
    });
  };
  walk(parentId);
  return output;
}

function addUnique(list = [], valueToAdd) {
  return Array.from(new Set([...list, valueToAdd]));
}

function nextId(prefix, items) {
  const max = items.reduce((highest, item) => {
    const number = Number(String(item.id || "").replace(`${prefix}-`, ""));
    return Number.isFinite(number) ? Math.max(highest, number) : highest;
  }, 0);
  return `${prefix}-${String(max + 1).padStart(3, "0")}`;
}

function nextRequirementId() {
  const max = state.requirements.reduce((highest, item) => {
    const number = Number(String(item.id || "").replace("EIS-", ""));
    return Number.isFinite(number) ? Math.max(highest, number) : highest;
  }, 0);
  return `EIS-${String(max + 1).padStart(3, "0")}`;
}

function normalizePriority(priority) {
  return priorities.find((item) => item.toLowerCase() === String(priority).toLowerCase()) || "Should";
}

function value(id) {
  return document.getElementById(id).value.trim();
}

function csvCell(valueToEscape) {
  return `"${String(valueToEscape ?? "").replaceAll('"', '""')}"`;
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(valueToEscape) {
  return String(valueToEscape ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(valueToEscape) {
  return escapeHtml(valueToEscape).replaceAll("\n", " ");
}

function cssEscape(valueToEscape) {
  if (window.CSS?.escape) return window.CSS.escape(valueToEscape);
  return String(valueToEscape).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(toast.timeout);
  toast.timeout = window.setTimeout(() => els.toast.classList.remove("visible"), 1800);
}

window.openEditor = openEditor;
window.openLinkDialog = openLinkDialog;
window.cyclePriority = cyclePriority;
window.setPriority = setPriority;
window.seedOutcomeFromRequirement = seedOutcomeFromRequirement;
