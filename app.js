const WORKFILE_PATH = "pve_werkbestand_basis.json";
const STORAGE_KEY = "emc_av_standaard_online_simple_v3";
const APP_BASE_FILE_VERSION = "2026-06-15-driestappenmodel-v1";
const INTRO_KEY = "emc_av_standaard_online_intro_simple_v3";

let state = null;
let editor = { type: "", id: "" };
let selectedFlowItem = null;
let draggedFlowItem = null;
let pointerDrag = null;
let suppressFlowClick = false;
let toastTimer = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const unique = (values = []) => [...new Set(values.filter(Boolean))];
const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");
const escAttr = esc;
const byId = (items, id) => items.find((item) => item.id === id);

const els = {};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindElements();
  bindEvents();
  await loadState();
  renderAll();
  if (!state.meta.actor || !state.meta.actor.trim().includes(" ")) {
    els.actorNameInput.value = state.meta.actor || "";
    els.actorDialog.showModal();
  } else {
    showIntro();
  }
}

function bindElements() {
  [
    "actorLabel", "saveState", "shareExportBtn", "fileMenuButton", "fileMenu",
    "exportJsonBtn", "exportCsvBtn", "importJsonInput", "resetLocalBtn", "publishOnlineBtn",
    "requirementSearch", "typeFilter", "categoryFilter", "requirementList",
    "elaborationCards", "productCards", "flowChart", "documentationContent",
    "addRequirementBtn", "addElaborationBtn", "addProductBtn",
    "sourceDrawerButton", "sourceDrawer", "closeDrawerBtn", "drawerShade", "addSourceBtn", "sourceList",
    "editDialog", "editForm", "dialogTitle", "dialogFields", "deleteDialogBtn", "closeEditDialogBtn",
    "actorDialog", "actorForm", "actorNameInput", "introDialog", "closeIntroBtn", "toast"
  ].forEach((id) => { els[id] = document.getElementById(id); });
}

function bindEvents() {
  $$(".tab[data-tab]").forEach((button) => {
    button.addEventListener("click", () => openTab(button.dataset.tab));
  });
  els.fileMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    els.fileMenu.hidden = !els.fileMenu.hidden;
  });
  document.addEventListener("click", () => { els.fileMenu.hidden = true; });
  els.fileMenu.addEventListener("click", (event) => event.stopPropagation());
  els.exportJsonBtn.addEventListener("click", () => downloadJson(state, exportName("json")));
  els.shareExportBtn.addEventListener("click", () => downloadJson(state, exportName("json")));
  els.exportCsvBtn.addEventListener("click", exportRequirementsCsv);
  els.importJsonInput.addEventListener("change", importWorkfile);
  els.resetLocalBtn.addEventListener("click", resetToBaseFile);
  els.publishOnlineBtn.addEventListener("click", publishOnlineWorkfile);
  els.requirementSearch.addEventListener("input", renderRequirements);
  els.typeFilter.addEventListener("change", renderRequirements);
  els.categoryFilter.addEventListener("change", renderRequirements);
  els.addRequirementBtn.addEventListener("click", () => openEditor("requirement"));
  els.addElaborationBtn.addEventListener("click", () => openEditor("elaboration"));
  els.addProductBtn.addEventListener("click", () => openEditor("product"));
  els.addSourceBtn.addEventListener("click", () => openEditor("source"));
  els.sourceDrawerButton.addEventListener("click", openSourceDrawer);
  els.closeDrawerBtn.addEventListener("click", closeSourceDrawer);
  els.drawerShade.addEventListener("click", closeSourceDrawer);
  els.closeEditDialogBtn.addEventListener("click", () => els.editDialog.close());
  els.editForm.addEventListener("submit", saveEditor);
  els.deleteDialogBtn.addEventListener("click", deleteEditorItem);
  els.actorForm.addEventListener("submit", saveActor);
  els.closeIntroBtn.addEventListener("click", closeIntro);
  $$("[data-edit-process]").forEach((button) => {
    button.addEventListener("click", () => openEditor("process", button.dataset.editProcess));
  });
  window.addEventListener("resize", () => {
    if ($("#flow").classList.contains("active")) requestAnimationFrame(layoutAndDrawFlow);
  });
  document.addEventListener("pointermove", handleFlowPointerMove);
  document.addEventListener("pointerup", handleFlowPointerUp);
}

async function loadState(forceBase = false) {
  const base = normalizeState(await fetchJson(WORKFILE_PATH));
  let local = null;
  if (!forceBase) {
    try { local = normalizeState(JSON.parse(localStorage.getItem(STORAGE_KEY))); } catch { local = null; }
  }
  state = local?.meta?.baseFileVersion === APP_BASE_FILE_VERSION ? local : base;
  if (state.meta.baseFileVersion !== APP_BASE_FILE_VERSION) state.meta.baseFileVersion = APP_BASE_FILE_VERSION;
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Werkbestand kon niet worden geladen (${response.status}).`);
  return response.json();
}

function normalizeState(input) {
  if (!input || typeof input !== "object") return null;
  return {
    meta: {
      project: input.meta?.project || "Uniforme AV-standaard Erasmus MC",
      updatedAt: input.meta?.updatedAt || new Date().toISOString(),
      actor: input.meta?.actor || "",
      version: 3,
      baseFileVersion: input.meta?.baseFileVersion || APP_BASE_FILE_VERSION,
      purpose: input.meta?.purpose || "",
      method: input.meta?.method || "",
      sourceFile: input.meta?.sourceFile || "",
      flowOrder: {
        requirements: input.meta?.flowOrder?.requirements || [],
        elaborations: input.meta?.flowOrder?.elaborations || [],
        products: input.meta?.flowOrder?.products || []
      },
      processText: input.meta?.processText || {}
    },
    sources: (input.sources || []).map((item) => ({ ...item })),
    sourceItems: (input.sourceItems || []).map((item) => ({ ...item, sources: item.sources || [] })),
    requirements: (input.requirements || []).map((item, index) => ({
      ...item,
      sourceItemIds: unique(item.sourceItemIds || []),
      order: item.order || index + 1
    })),
    elaborations: (input.elaborations || []).map((item, index) => ({
      ...item,
      requirementIds: unique(item.requirementIds || []),
      productIds: unique(item.productIds || []),
      order: item.order || index + 1
    })),
    products: (input.products || []).map((item, index) => ({
      ...item,
      requirementIds: unique(item.requirementIds || []),
      elaborationIds: unique(item.elaborationIds || []),
      order: item.order || index + 1
    })),
    logs: input.logs || [],
    archive: input.archive || {}
  };
}

function renderAll() {
  renderActor();
  renderProcessText();
  renderFilterOptions();
  renderRequirements();
  renderElaborations();
  renderProducts();
  renderSources();
  renderDocumentation();
  renderFlow();
}

function openTab(tabId) {
  $$(".tab[data-tab]").forEach((button) => button.classList.toggle("active", button.dataset.tab === tabId));
  $$(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
  if (tabId === "flow") {
    renderFlow();
    requestAnimationFrame(layoutAndDrawFlow);
  }
}

function renderActor() {
  els.actorLabel.textContent = state.meta.actor ? `Gebruiker: ${state.meta.actor}` : "";
}

function renderProcessText() {
  Object.entries(state.meta.processText || {}).forEach(([key, value]) => {
    $$(`[data-process-title="${key}"]`).forEach((node) => { node.textContent = value.title || ""; });
    $$(`[data-process-description="${key}"]`).forEach((node) => { node.textContent = value.description || ""; });
  });
}

function renderFilterOptions() {
  const type = els.typeFilter.value;
  const category = els.categoryFilter.value;
  fillSelect(els.typeFilter, unique(state.requirements.map((item) => item.type)).sort(), type, "Alle soorten");
  fillSelect(els.categoryFilter, unique(state.requirements.map((item) => item.category)).sort(), category, "Alle categorieën");
}

function fillSelect(select, values, current, emptyLabel) {
  select.innerHTML = `<option value="">${esc(emptyLabel)}</option>${values.map((value) =>
    `<option value="${escAttr(value)}"${value === current ? " selected" : ""}>${esc(value)}</option>`
  ).join("")}`;
}

function renderRequirements() {
  const query = els.requirementSearch.value.trim().toLowerCase();
  const type = els.typeFilter.value;
  const category = els.categoryFilter.value;
  const items = ordered("requirements", state.requirements).filter((item) => {
    const haystack = [item.id, item.title, item.requirement, item.explanation, item.origin, item.category, item.type].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && (!type || item.type === type) && (!category || item.category === category);
  });
  els.requirementList.innerHTML = `
    <div class="requirement-row header">
      <span>ID</span><span>Eis en toelichting</span><span>Soort</span><span>Categorie</span><span>Voortgekomen uit</span><span></span>
    </div>
    ${items.map((item) => `
      <article class="requirement-row">
        <strong>${esc(item.id)}</strong>
        <div><strong>${esc(item.requirement)}</strong><p>${esc(item.explanation)}</p></div>
        <span class="tag">${esc(item.type)}</span>
        <span>${esc(item.category)}</span>
        <p>${esc(item.origin || "Nog niet ingevuld")}</p>
        <button class="row-edit" type="button" data-edit-type="requirement" data-edit-id="${escAttr(item.id)}" title="Eis bewerken" aria-label="Eis bewerken">✎</button>
      </article>
    `).join("") || `<p class="muted">Geen eisen gevonden.</p>`}`;
  bindEditButtons(els.requirementList);
}

function renderElaborations() {
  els.elaborationCards.innerHTML = ordered("elaborations", state.elaborations).map((item) => `
    <article class="item-card" data-edit-type="elaboration" data-edit-id="${escAttr(item.id)}">
      <div class="meta">${esc(item.id)} · ${esc(item.type)} · ${item.requirementIds.length} eisen</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.description)}</p>
      <div class="solution-box"><strong>Passende oplossing</strong><span>${esc(item.solution)}</span></div>
      <div class="link-counts">${item.requirementIds.map((id) => `<span class="tag">${esc(id)}</span>`).join("")}</div>
    </article>
  `).join("") + addCard("Uitwerking toevoegen", "elaboration");
  bindCardEditors(els.elaborationCards);
}

function renderProducts() {
  els.productCards.innerHTML = ordered("products", state.products).map((item) => `
    <article class="item-card product-card" data-edit-type="product" data-edit-id="${escAttr(item.id)}">
      <div class="meta">${esc(item.id)} · ${esc(item.type)} · ${item.elaborationIds.length} uitwerkingen</div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.description)}</p>
      ${item.file ? `<p><a href="${escAttr(productFileHref(item.file))}" target="_blank" rel="noopener">Productbestand openen</a></p>` : ""}
      <div class="link-counts">${item.elaborationIds.map((id) => `<span class="tag">${esc(id)}</span>`).join("")}</div>
    </article>
  `).join("") + addCard("Product toevoegen", "product");
  bindCardEditors(els.productCards);
}

function addCard(label, type) {
  return `<button class="item-card add-card" type="button" data-add-type="${type}">+ ${esc(label)}</button>`;
}

function bindCardEditors(root) {
  $$("[data-edit-type]", root).forEach((card) => {
    card.addEventListener("click", () => openEditor(card.dataset.editType, card.dataset.editId));
  });
  $$("[data-add-type]", root).forEach((card) => {
    card.addEventListener("click", () => openEditor(card.dataset.addType));
  });
}

function bindEditButtons(root) {
  $$("[data-edit-type]", root).forEach((button) => {
    button.addEventListener("click", () => openEditor(button.dataset.editType, button.dataset.editId));
  });
}

function renderSources() {
  els.sourceList.innerHTML = state.sources.map((source) => `
    <article class="source-item" data-edit-type="source" data-edit-id="${escAttr(source.id)}">
      <strong>${esc(source.title)}</strong>
      <p>${esc(source.type || "")}</p>
      ${source.insight ? `<p>${esc(source.insight)}</p>` : ""}
    </article>
  `).join("");
  bindCardEditors(els.sourceList);
}

function renderDocumentation() {
  const sourceCount = state.sourceItems.length;
  els.documentationContent.innerHTML = `
    <section class="doc-section">
      <h3>Doel</h3>
      <p>${esc(state.meta.purpose)}</p>
      <p>De AV-standaard bestaat in dit dashboard uit drie samenhangende onderdelen. De extra tussenlagen uit de eerdere versie zijn samengevoegd om dubbelingen te voorkomen en het overzicht te verbeteren.</p>
    </section>
    <section class="doc-section">
      <h3>Werkwijze</h3>
      <ol>
        <li><strong>Input en eisen:</strong> ${sourceCount} oorspronkelijke uitspraken zijn samengevat in ${state.requirements.length} korte eisen. De onderliggende input blijft bewaard voor herleidbaarheid.</li>
        <li><strong>Uitwerking en oplossing:</strong> samenhangende eisen worden inhoudelijk gebundeld. De passende oplossing staat direct bij de uitwerking.</li>
        <li><strong>Product:</strong> een concrete oplevering laat zien hoe een of meer uitwerkingen in de praktijk worden ingevuld.</li>
      </ol>
    </section>
    <section class="doc-section">
      <h3>Wat wordt vastgelegd?</h3>
      <p>Bij een eis worden alleen de eis, soort, categorie, toelichting en herkomst vastgelegd. Bij een uitwerking staan de inhoudelijke uitwerking, de gekoppelde eisen en de passende oplossing. Een product bevat de concrete oplevering en de koppelingen naar de uitwerkingen en eisen.</p>
    </section>
    <section class="doc-section">
      <h3>Herleidbaarheid</h3>
      <p>De oorspronkelijke input is niet verwijderd. Iedere samengevatte eis verwijst naar de bijbehorende bronitems en stakeholders. Alle aanpassingen worden automatisch opgeslagen en toegevoegd aan het wijzigingslogboek.</p>
    </section>
    <section class="doc-section">
      <h3>Resultaat</h3>
      <p>De ${state.requirements.length} eisen, ${state.elaborations.length} uitwerkingen met oplossingen en ${state.products.length} concrete producten vormen samen de werkende opbouw van de AV-standaard.</p>
    </section>`;
}

function renderFlow() {
  const requirements = ordered("requirements", state.requirements);
  const elaborations = ordered("elaborations", state.elaborations);
  const products = ordered("products", state.products);
  els.flowChart.innerHTML = `
    <div id="flowBoard" class="flow-board">
      <svg id="flowLines" class="flow-lines" aria-hidden="true"></svg>
      ${flowColumn("input", "1. Input en eisen", "requirements", requirements, renderFlowRequirement)}
      ${flowColumn("elaboration", "2. Uitwerking en oplossing", "elaborations", elaborations, renderFlowElaboration)}
      ${flowColumn("product", "3. Producten", "products", products, renderFlowProduct)}
    </div>`;
  bindFlowEvents();
  applyFlowSelection();
  requestAnimationFrame(layoutAndDrawFlow);
}

function flowColumn(className, title, collection, items, renderer) {
  return `<section class="flow-column ${className}">
    <h3>${esc(title)}</h3>
    <div class="flow-stack" data-flow-stack="${collection}">
      ${items.length ? items.map(renderer).join("") : `<div class="empty-flow">Nog geen onderdelen.</div>`}
    </div>
  </section>`;
}

function renderFlowRequirement(item) {
  return `<article class="flow-node" draggable="true" data-flow-type="requirement" data-flow-id="${escAttr(item.id)}">
    <small>${esc(item.id)} · ${esc(item.type)}</small>
    <strong>${esc(item.requirement)}</strong>
  </article>`;
}

function renderFlowElaboration(item) {
  return `<article class="flow-node" draggable="true" data-flow-type="elaboration" data-flow-id="${escAttr(item.id)}">
    <small>${esc(item.id)} · ${item.requirementIds.length} eisen</small>
    <strong>${esc(item.title)}</strong>
  </article>`;
}

function renderFlowProduct(item) {
  return `<article class="flow-node" draggable="true" data-flow-type="product" data-flow-id="${escAttr(item.id)}">
    <small>${esc(item.id)} · ${esc(item.type)}</small>
    <strong>${esc(item.title)}</strong>
  </article>`;
}

function bindFlowEvents() {
  $$(".flow-node", els.flowChart).forEach((node) => {
    node.addEventListener("click", () => {
      if (suppressFlowClick) {
        suppressFlowClick = false;
        return;
      }
      const next = { type: node.dataset.flowType, id: node.dataset.flowId };
      selectedFlowItem = selectedFlowItem?.type === next.type && selectedFlowItem?.id === next.id ? null : next;
      applyFlowSelection();
      drawFlowLines();
    });
    node.addEventListener("dblclick", (event) => {
      event.preventDefault();
      openEditor(node.dataset.flowType, node.dataset.flowId);
    });
    node.addEventListener("dragstart", (event) => {
      draggedFlowItem = { type: node.dataset.flowType, id: node.dataset.flowId };
      event.dataTransfer.effectAllowed = "linkMove";
    });
    node.addEventListener("dragend", () => {
      draggedFlowItem = null;
      $$(".drop-target", els.flowChart).forEach((item) => item.classList.remove("drop-target"));
    });
    node.addEventListener("dragover", (event) => {
      if (!draggedFlowItem || !canDrop(draggedFlowItem, node)) return;
      event.preventDefault();
      node.classList.add("drop-target");
    });
    node.addEventListener("dragleave", () => node.classList.remove("drop-target"));
    node.addEventListener("drop", (event) => {
      event.preventDefault();
      node.classList.remove("drop-target");
      handleDrop(draggedFlowItem, { type: node.dataset.flowType, id: node.dataset.flowId });
    });
    node.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      pointerDrag = {
        item: { type: node.dataset.flowType, id: node.dataset.flowId },
        startX: event.clientX,
        startY: event.clientY,
        moved: false
      };
    });
  });
}

function handleFlowPointerMove(event) {
  if (!pointerDrag) return;
  const distance = Math.hypot(event.clientX - pointerDrag.startX, event.clientY - pointerDrag.startY);
  if (distance < 8) return;
  pointerDrag.moved = true;
  $$(".drop-target", els.flowChart).forEach((item) => item.classList.remove("drop-target"));
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".flow-node");
  if (target && canDrop(pointerDrag.item, target)) target.classList.add("drop-target");
}

function handleFlowPointerUp(event) {
  if (!pointerDrag) return;
  const current = pointerDrag;
  pointerDrag = null;
  $$(".drop-target", els.flowChart).forEach((item) => item.classList.remove("drop-target"));
  if (!current.moved) return;
  suppressFlowClick = true;
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(".flow-node");
  if (!target || !canDrop(current.item, target)) return;
  handleDrop(current.item, { type: target.dataset.flowType, id: target.dataset.flowId });
}

function canDrop(from, targetNode) {
  const toType = targetNode.dataset.flowType;
  const toId = targetNode.dataset.flowId;
  if (from.id === toId && from.type === toType) return false;
  return from.type === toType ||
    (from.type === "requirement" && toType === "elaboration") ||
    (from.type === "elaboration" && toType === "requirement") ||
    (from.type === "elaboration" && toType === "product") ||
    (from.type === "product" && toType === "elaboration");
}

function handleDrop(from, to) {
  if (!from || !to) return;
  let changed = false;
  if (from.type === to.type) {
    const collection = `${from.type}s`;
    changed = reorder(collection, from.id, to.id);
  } else if (from.type === "requirement" && to.type === "elaboration") {
    changed = linkRequirementElaboration(from.id, to.id);
  } else if (from.type === "elaboration" && to.type === "requirement") {
    changed = linkRequirementElaboration(to.id, from.id);
  } else if (from.type === "elaboration" && to.type === "product") {
    changed = linkElaborationProduct(from.id, to.id);
  } else if (from.type === "product" && to.type === "elaboration") {
    changed = linkElaborationProduct(to.id, from.id);
  }
  if (changed) {
    logAction("flow:update", from.type, `Flow aangepast: ${from.id} naar ${to.id}`, from.id);
    saveState();
    renderAll();
  }
}

function linkRequirementElaboration(requirementId, elaborationId) {
  const elaboration = byId(state.elaborations, elaborationId);
  if (!elaboration || elaboration.requirementIds.includes(requirementId)) return false;
  elaboration.requirementIds.push(requirementId);
  return true;
}

function linkElaborationProduct(elaborationId, productId) {
  const product = byId(state.products, productId);
  const elaboration = byId(state.elaborations, elaborationId);
  if (!product || !elaboration || product.elaborationIds.includes(elaborationId)) return false;
  product.elaborationIds.push(elaborationId);
  elaboration.productIds = unique([...(elaboration.productIds || []), productId]);
  product.requirementIds = unique([...product.requirementIds, ...elaboration.requirementIds]);
  return true;
}

function reorder(collection, fromId, toId) {
  const ids = ordered(collection, state[collection]).map((item) => item.id);
  const fromIndex = ids.indexOf(fromId);
  const toIndex = ids.indexOf(toId);
  if (fromIndex < 0 || toIndex < 0) return false;
  ids.splice(toIndex, 0, ids.splice(fromIndex, 1)[0]);
  state.meta.flowOrder[collection] = ids;
  return true;
}

function ordered(collection, items) {
  const order = state.meta.flowOrder[collection] || [];
  const position = new Map(order.map((id, index) => [id, index]));
  return [...items].sort((a, b) =>
    (position.get(a.id) ?? 9999) - (position.get(b.id) ?? 9999) ||
    (a.order || 0) - (b.order || 0)
  );
}

function layoutAndDrawFlow() {
  const board = $("#flowBoard");
  if (!board) return;
  const stacks = $$("[data-flow-stack]", board);
  stacks.forEach((stack) => { stack.style.minHeight = ""; stack.style.alignContent = ""; });
  const maxHeight = Math.max(...stacks.map((stack) => stack.scrollHeight), 580);
  stacks.forEach((stack) => {
    stack.style.minHeight = `${maxHeight}px`;
    stack.style.alignContent = "space-around";
  });
  board.style.minHeight = `${maxHeight + 70}px`;
  requestAnimationFrame(drawFlowLines);
}

function drawFlowLines() {
  const board = $("#flowBoard");
  const svg = $("#flowLines");
  if (!board || !svg) return;
  const boardRect = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  const route = selectedFlowItem ? routeFor(selectedFlowItem) : null;
  const paths = [];
  state.elaborations.forEach((elaboration) => {
    elaboration.requirementIds.forEach((requirementId) => {
      paths.push(connectionPath("requirement", requirementId, "elaboration", elaboration.id, "#16a6a0",
        !route || (route.requirements.has(requirementId) && route.elaborations.has(elaboration.id))));
    });
  });
  state.products.forEach((product) => {
    product.elaborationIds.forEach((elaborationId) => {
      paths.push(connectionPath("elaboration", elaborationId, "product", product.id, "#6f61c8",
        !route || (route.elaborations.has(elaborationId) && route.products.has(product.id))));
    });
  });
  svg.innerHTML = paths.filter(Boolean).join("");
}

function connectionPath(fromType, fromId, toType, toId, color, active) {
  const from = $(`[data-flow-type="${fromType}"][data-flow-id="${cssEscape(fromId)}"]`, els.flowChart);
  const to = $(`[data-flow-type="${toType}"][data-flow-id="${cssEscape(toId)}"]`, els.flowChart);
  const board = $("#flowBoard");
  if (!from || !to || !board) return "";
  const boardRect = board.getBoundingClientRect();
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const x1 = a.right - boardRect.left;
  const y1 = a.top + a.height / 2 - boardRect.top;
  const x2 = b.left - boardRect.left;
  const y2 = b.top + b.height / 2 - boardRect.top;
  const bend = Math.max(60, (x2 - x1) * .48);
  return `<path class="${active ? "active" : "dimmed"}" stroke="${color}" d="M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}"/>`;
}

function applyFlowSelection() {
  const route = selectedFlowItem ? routeFor(selectedFlowItem) : null;
  $$(".flow-node", els.flowChart).forEach((node) => {
    const collection = `${node.dataset.flowType}s`;
    const active = !route || route[collection].has(node.dataset.flowId);
    node.classList.toggle("dimmed", !active);
    node.classList.toggle("selected", !!selectedFlowItem &&
      selectedFlowItem.type === node.dataset.flowType && selectedFlowItem.id === node.dataset.flowId);
  });
}

function routeFor(item) {
  const route = {
    requirements: new Set(),
    elaborations: new Set(),
    products: new Set()
  };
  if (item.type === "requirement") {
    route.requirements.add(item.id);
    state.elaborations.filter((elaboration) => elaboration.requirementIds.includes(item.id)).forEach((elaboration) => {
      route.elaborations.add(elaboration.id);
      state.products.filter((product) => product.elaborationIds.includes(elaboration.id) || product.requirementIds.includes(item.id))
        .forEach((product) => route.products.add(product.id));
    });
  }
  if (item.type === "elaboration") {
    const elaboration = byId(state.elaborations, item.id);
    if (elaboration) {
      route.elaborations.add(item.id);
      elaboration.requirementIds.forEach((id) => route.requirements.add(id));
      state.products.filter((product) => product.elaborationIds.includes(item.id))
        .forEach((product) => route.products.add(product.id));
    }
  }
  if (item.type === "product") {
    const product = byId(state.products, item.id);
    if (product) {
      route.products.add(item.id);
      product.elaborationIds.forEach((id) => {
        route.elaborations.add(id);
        const elaboration = byId(state.elaborations, id);
        (elaboration?.requirementIds || []).forEach((requirementId) => route.requirements.add(requirementId));
      });
      product.requirementIds.forEach((id) => route.requirements.add(id));
    }
  }
  return route;
}

function openEditor(type, id = "") {
  editor = { type, id };
  const item = editorItem(type, id);
  els.deleteDialogBtn.hidden = !id || type === "process";
  if (type === "requirement") {
    els.dialogTitle.textContent = id ? "Eis bewerken" : "Eis toevoegen";
    els.dialogFields.innerHTML = `
      ${inputField("Titel", "editTitle", item?.title)}
      ${textAreaField("Eis", "editRequirement", item?.requirement)}
      ${inputField("Soort eis", "editType", item?.type)}
      ${inputField("Categorie", "editCategory", item?.category)}
      ${textAreaField("Toelichting", "editExplanation", item?.explanation)}
      ${textAreaField("Voortgekomen uit", "editOrigin", item?.origin)}`;
  } else if (type === "elaboration") {
    els.dialogTitle.textContent = id ? "Uitwerking bewerken" : "Uitwerking toevoegen";
    els.dialogFields.innerHTML = `
      ${inputField("Titel", "editTitle", item?.title)}
      ${inputField("Soort", "editType", item?.type)}
      ${inputField("Categorie", "editCategory", item?.category)}
      ${textAreaField("Uitwerking", "editDescription", item?.description)}
      ${textAreaField("Passende oplossing", "editSolution", item?.solution)}
      ${checkboxField("Gekoppelde eisen", "linkedRequirements", state.requirements, item?.requirementIds, (value) => `${value.id} ${value.title}`)}`;
  } else if (type === "product") {
    els.dialogTitle.textContent = id ? "Product bewerken" : "Product toevoegen";
    els.dialogFields.innerHTML = `
      ${inputField("Titel", "editTitle", item?.title)}
      ${inputField("Soort product", "editType", item?.type)}
      ${textAreaField("Omschrijving", "editDescription", item?.description)}
      ${inputField("Bestandslocatie", "editFile", item?.file)}
      ${textAreaField("Validatie", "editValidation", item?.validation)}
      ${textAreaField("Volgende stap", "editNextStep", item?.nextStep)}
      ${checkboxField("Gekoppelde uitwerkingen", "linkedElaborations", state.elaborations, item?.elaborationIds, (value) => `${value.id} ${value.title}`)}
      ${checkboxField("Direct gekoppelde eisen", "linkedRequirements", state.requirements, item?.requirementIds, (value) => `${value.id} ${value.title}`)}`;
  } else if (type === "source") {
    els.dialogTitle.textContent = id ? "Bron bewerken" : "Bron toevoegen";
    els.dialogFields.innerHTML = `
      ${inputField("Titel", "editTitle", item?.title)}
      ${inputField("Soort bron", "editType", item?.type)}
      ${inputField("Bestandslocatie", "editPath", item?.path)}
      ${inputField("Status", "editStatus", item?.status)}
      ${textAreaField("Belangrijkste inzicht", "editInsight", item?.insight)}`;
  } else if (type === "process") {
    els.dialogTitle.textContent = "Procesbeschrijving bewerken";
    els.dialogFields.innerHTML = `
      ${inputField("Titel", "editTitle", item?.title)}
      ${textAreaField("Beschrijving", "editDescription", item?.description)}`;
  }
  els.editDialog.showModal();
}

function editorItem(type, id) {
  if (!id) return null;
  if (type === "requirement") return byId(state.requirements, id);
  if (type === "elaboration") return byId(state.elaborations, id);
  if (type === "product") return byId(state.products, id);
  if (type === "source") return byId(state.sources, id);
  if (type === "process") return state.meta.processText[id];
  return null;
}

function inputField(label, id, value = "") {
  return `<label>${esc(label)}<input id="${id}" value="${escAttr(value || "")}"></label>`;
}

function textAreaField(label, id, value = "") {
  return `<label>${esc(label)}<textarea id="${id}">${esc(value || "")}</textarea></label>`;
}

function checkboxField(label, name, items, selected = [], labelFor) {
  return `<fieldset><legend>${esc(label)}</legend><div class="checkbox-grid">${items.map((item) => `
    <label class="checkbox-item"><input type="checkbox" name="${name}" value="${escAttr(item.id)}"${selected?.includes(item.id) ? " checked" : ""}><span>${esc(labelFor(item))}</span></label>
  `).join("")}</div></fieldset>`;
}

function saveEditor(event) {
  event.preventDefault();
  const current = editorItem(editor.type, editor.id);
  if (editor.type === "requirement") {
    const item = {
      id: current?.id || nextId("EIS", state.requirements),
      title: value("editTitle"),
      requirement: value("editRequirement"),
      type: value("editType"),
      category: value("editCategory"),
      explanation: value("editExplanation"),
      origin: value("editOrigin"),
      sourceItemIds: current?.sourceItemIds || [],
      order: current?.order || state.requirements.length + 1
    };
    upsert(state.requirements, item);
    addToOrder("requirements", item.id);
  } else if (editor.type === "elaboration") {
    const item = {
      id: current?.id || nextId("UIT", state.elaborations),
      title: value("editTitle"),
      type: value("editType"),
      category: value("editCategory"),
      description: value("editDescription"),
      solution: value("editSolution"),
      requirementIds: checked("linkedRequirements"),
      productIds: current?.productIds || [],
      order: current?.order || state.elaborations.length + 1
    };
    upsert(state.elaborations, item);
    addToOrder("elaborations", item.id);
  } else if (editor.type === "product") {
    const item = {
      id: current?.id || nextId("PRD", state.products),
      title: value("editTitle"),
      type: value("editType"),
      description: value("editDescription"),
      file: value("editFile"),
      validation: value("editValidation"),
      nextStep: value("editNextStep"),
      elaborationIds: checked("linkedElaborations"),
      requirementIds: checked("linkedRequirements"),
      order: current?.order || state.products.length + 1
    };
    upsert(state.products, item);
    addToOrder("products", item.id);
    syncProductLinks();
  } else if (editor.type === "source") {
    const item = {
      id: current?.id || nextId("BR", state.sources),
      title: value("editTitle"),
      type: value("editType"),
      path: value("editPath"),
      status: value("editStatus"),
      insight: value("editInsight")
    };
    upsert(state.sources, item);
  } else if (editor.type === "process") {
    state.meta.processText[editor.id] = {
      title: value("editTitle"),
      description: value("editDescription")
    };
  }
  logAction(current ? "item:update" : "item:create", editor.type, current ? "Onderdeel bijgewerkt" : "Onderdeel toegevoegd", current?.id || "");
  saveState();
  els.editDialog.close();
  renderAll();
  toast("Wijziging opgeslagen.");
}

function deleteEditorItem() {
  const { type, id } = editor;
  if (!id) return;
  if (type === "requirement") {
    state.requirements = state.requirements.filter((item) => item.id !== id);
    state.elaborations.forEach((item) => { item.requirementIds = item.requirementIds.filter((value) => value !== id); });
    state.products.forEach((item) => { item.requirementIds = item.requirementIds.filter((value) => value !== id); });
  } else if (type === "elaboration") {
    state.elaborations = state.elaborations.filter((item) => item.id !== id);
    state.products.forEach((item) => { item.elaborationIds = item.elaborationIds.filter((value) => value !== id); });
  } else if (type === "product") {
    state.products = state.products.filter((item) => item.id !== id);
    syncProductLinks();
  } else if (type === "source") {
    state.sources = state.sources.filter((item) => item.id !== id);
  }
  const collection = `${type}s`;
  if (state.meta.flowOrder[collection]) {
    state.meta.flowOrder[collection] = state.meta.flowOrder[collection].filter((value) => value !== id);
  }
  logAction("item:delete", type, "Onderdeel verwijderd", id);
  saveState();
  els.editDialog.close();
  renderAll();
  toast("Onderdeel verwijderd.");
}

function syncProductLinks() {
  state.elaborations.forEach((elaboration) => {
    elaboration.productIds = state.products.filter((product) => product.elaborationIds.includes(elaboration.id)).map((product) => product.id);
  });
}

function value(id) {
  return document.getElementById(id)?.value.trim() || "";
}

function checked(name) {
  return $$(`input[name="${name}"]:checked`, els.dialogFields).map((input) => input.value);
}

function upsert(items, item) {
  const index = items.findIndex((value) => value.id === item.id);
  if (index >= 0) items[index] = item;
  else items.push(item);
}

function addToOrder(collection, id) {
  state.meta.flowOrder[collection] = unique([...(state.meta.flowOrder[collection] || []), id]);
}

function nextId(prefix, items) {
  const highest = items.reduce((max, item) => Math.max(max, Number(item.id.split("-")[1]) || 0), 0);
  return `${prefix}-${String(highest + 1).padStart(3, "0")}`;
}

function saveActor(event) {
  event.preventDefault();
  const name = els.actorNameInput.value.trim();
  if (!name) return;
  state.meta.actor = name;
  logAction("actor:set", "dashboard", `Gebruiker ingesteld op ${name}`, "");
  saveState();
  els.actorDialog.close();
  renderActor();
  showIntro();
}

function showIntro() {
  if (!localStorage.getItem(INTRO_KEY) && !els.introDialog.open) els.introDialog.showModal();
}

function closeIntro() {
  localStorage.setItem(INTRO_KEY, "seen");
  els.introDialog.close();
}

function saveState() {
  state.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  els.saveState.textContent = "Automatisch opgeslagen";
}

function logAction(action, entityType, detail, entityId) {
  state.logs.push({
    id: `LOG-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actor: state.meta.actor || "Onbekend",
    action,
    entityType,
    entityId,
    detail
  });
}

function openSourceDrawer() {
  els.sourceDrawer.classList.add("open");
  els.drawerShade.hidden = false;
}

function closeSourceDrawer() {
  els.sourceDrawer.classList.remove("open");
  els.drawerShade.hidden = true;
}

function productFileHref(file) {
  const normalized = file.replaceAll("\\", "/");
  const marker = "Producten/";
  return normalized.includes(marker) ? `../${normalized.split(marker)[1]}` : normalized;
}

function exportName(extension) {
  const actor = (state.meta.actor || "werkbestand").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `av-standaard-${actor}-${new Date().toISOString().slice(0, 10)}.${extension}`;
}

function downloadJson(data, filename) {
  downloadBlob(JSON.stringify(data, null, 2), filename, "application/json");
}

function exportRequirementsCsv() {
  const header = ["ID", "Eis", "Soort", "Categorie", "Toelichting", "Voortgekomen uit"];
  const rows = state.requirements.map((item) => [
    item.id, item.requirement, item.type, item.category, item.explanation, item.origin
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\n");
  downloadBlob(`\ufeff${csv}`, exportName("csv"), "text/csv;charset=utf-8");
}

function csvCell(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

function downloadBlob(content, filename, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function importWorkfile(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = normalizeState(JSON.parse(await file.text()));
    validateState(imported);
    state = imported;
    state.meta.baseFileVersion = APP_BASE_FILE_VERSION;
    logAction("file:import", "dashboard", `Werkbestand geïmporteerd: ${file.name}`, "");
    saveState();
    renderAll();
    toast("Werkbestand geïmporteerd.");
  } catch (error) {
    toast(error.message || "Importeren mislukt.");
  } finally {
    event.target.value = "";
  }
}

function validateState(data) {
  if (!data || !Array.isArray(data.requirements) || !Array.isArray(data.elaborations) || !Array.isArray(data.products)) {
    throw new Error("Dit is geen geldig drie-stappenwerkbestand.");
  }
}

async function resetToBaseFile() {
  localStorage.removeItem(STORAGE_KEY);
  await loadState(true);
  renderAll();
  toast("Basisbestand opnieuw geladen.");
}

async function publishOnlineWorkfile() {
  els.publishOnlineBtn.disabled = true;
  toast("Online versie wordt bijgewerkt...");
  try {
    const response = await fetch("http://127.0.0.1:4174/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(result.error || "Publiceren mislukt.");
    toast("Online versie is bijgewerkt.");
  } catch (error) {
    toast(`${error.message} Controleer of de publicatiehulp actief is.`);
  } finally {
    els.publishOnlineBtn.disabled = false;
  }
}

function cssEscape(value) {
  return window.CSS?.escape ? CSS.escape(value) : String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
}

function toast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 3200);
}
