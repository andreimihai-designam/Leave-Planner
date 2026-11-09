"use strict";

const byId = (id) => document.getElementById(id);
const dialog = byId("dialog");
const body = byId("dialog-body");
const format = new Intl.DateTimeFormat("ro-RO", { dateStyle: "long", timeZone: "UTC" });
const monthFormat = new Intl.DateTimeFormat("ro-RO", { month: "long", year: "numeric", timeZone: "UTC" });
const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Bucharest", dateStyle: "short" }).format(new Date());
let month = new Date(today.slice(0, 7) + "-01");
let state = emptyState();
let savedRaw = null;
let storageReady = false;
let persistenceRequested = false;
let filter = "active";
let returnFocus;
function annualAllowance(year) {
  return year === 2026 ? 7 : 20;
}

try {
  const saved = readState(localStorage);
  state = saved.data;
  savedRaw = saved.raw;
  storageReady = true;
} catch {
  byId("feedback").textContent = "Datele locale nu pot fi citite. Verifică permisiunile de stocare ale browserului.";
}

function commit(data, error) {
  try {
    if (!storageReady) throw new Error("Stocare indisponibilă");
    savedRaw = writeState(localStorage, savedRaw, data);
    state = data;
    if (!persistenceRequested) {
      persistenceRequested = true;
      void requestPersistentStorage(globalThis.navigator);
    }
    return true;
  } catch {
    error.textContent = "Salvarea a eșuat. Verifică stocarea locală. Dacă ai modificat datele în altă filă, reîncarcă pagina.";
    return false;
  }
}

function countsByYear(days) {
  const counts = new Map();
  for (const day of days) {
    const year = Number(day.slice(0, 4));
    counts.set(year, (counts.get(year) ?? 0) + 1);
  }
  return counts;
}

function balances(entries) {
  const daysByYear = new Map();
  for (const entry of entries.filter(active)) {
    for (const day of eligibleDays(entry)) {
      const year = Number(day.slice(0, 4));
      if (!daysByYear.has(year)) daysByYear.set(year, new Map());
      const days = daysByYear.get(year);
      days.set(day, days.get(day) || entry.status === "Efectuat");
    }
  }
  const result = new Map();
  let carry = 0;
  for (let year = minYear; year <= maxYear; year++) {
    const days = daysByYear.get(year) ?? new Map();
    let early = 0;
    let used = 0;
    for (const [day, taken] of days) {
      if (day <= year + "-05-31") early++;
      if (taken) used++;
    }
    const carryUsed = Math.min(carry, early);
    const ownRemaining = annualAllowance(year) - (days.size - carryUsed);
    result.set(year, { used, reserved: days.size - used, ownRemaining, carryRemaining: carry - carryUsed });
    carry = Math.max(0, ownRemaining);
  }
  return result;
}

function balance(year, monthNumber = 12) {
  const total = balances(state.entries).get(year);
  const carried = monthNumber <= 5 ? total.carryRemaining : 0;
  return { ...total, available: total.ownRemaining + carried, carried };
}

function projectedBalances(entry) {
  return balances([...state.entries.filter(item => item.id !== entry.id), entry]);
}

function validate(entry, allowNonWorkingDay = false) {
  if (!entry.start || !entry.end) return "Completează ambele date.";
  if (entry.end < entry.start) return "Data de sfârșit trebuie să fie în aceeași zi sau după data de început.";
  if (!validDate(entry.start) || !validDate(entry.end)) return "Alege date între " + minYear + " și " + maxYear + ".";
  if (!active(entry) || entry.type !== leaveType) return "";
  const days = eligibleDays(entry);
  if (!days.length) return allowNonWorkingDay ? "" : "Intervalul nu conține zile lucrătoare deductibile.";
  const selected = new Set(days);
  const conflict = state.entries.filter(active).find((other) => other.id !== entry.id && eligibleDays(other).some((day) => selected.has(day)));
  if (conflict) return "Intervalul se suprapune cu " + rangeLabel(conflict) + ".";
  const before = balances(state.entries);
  for (const [year, total] of projectedBalances(entry)) {
    if (total.ownRemaining >= Math.min(0, before.get(year).ownRemaining)) continue;
    return "Sold insuficient pentru anul " + year + ". Zilele reportate pot fi folosite până la 31 mai.";
  }
  return "";
}

function rangeLabel(entry) {
  const start = format.format(new Date(entry.start));
  return entry.start === entry.end ? start : start + " – " + format.format(new Date(entry.end));
}

function button(label, handler, className = "") {
  const element = document.createElement("button");
  element.type = "button";
  element.textContent = label;
  element.className = className;
  element.addEventListener("click", handler);
  return element;
}

function paragraph(text, className = "") {
  const element = document.createElement("p");
  element.className = className;
  element.textContent = text;
  return element;
}

function render() {
  const year = month.getUTCFullYear();
  const totals = balance(year, month.getUTCMonth() + 1);
  byId("year").textContent = year;
  byId("available").textContent = totals.available;
  byId("carry").textContent = totals.carried > 0
    ? totals.carried + " reportate din " + (year - 1) + " · până la 31 mai"
    : "zile de concediu";
  byId("reserved").textContent = totals.reserved;
  byId("used").textContent = totals.used;
  byId("month").textContent = monthFormat.format(month);
  byId("prev").disabled = dayKey(month) === minDate;
  byId("next").disabled = dayKey(month) === maxYear + "-12-01";
  const calendar = byId("calendar");
  calendar.replaceChildren();
  const offset = (month.getUTCDay() + 6) % 7;
  for (let index = 0; index < offset; index++) calendar.append(document.createElement("span"));
  for (const date = new Date(month); date.getUTCMonth() === month.getUTCMonth(); date.setUTCDate(date.getUTCDate() + 1)) {
    const key = dayKey(date);
    const matches = state.entries.filter((entry) => active(entry) && entry.start <= key && key <= entry.end);
    const holiday = holidaysFor(year).get(key);
    const cell = button(String(date.getUTCDate()), () => showDay(key), "day");
    cell.classList.toggle("weekend", isWeekend(date));
    cell.classList.toggle("leave", matches.length > 0);
    cell.classList.toggle("holiday", Boolean(holiday));
    cell.setAttribute("aria-label", [format.format(date), isWeekend(date) && "weekend", holiday, matches.length && "concediu activ"].filter(Boolean).join(", "));
    if (matches.length || holiday) {
      const icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = [matches.length && "●", holiday && "✦"].filter(Boolean).join(" ");
      cell.append(icon);
    }
    calendar.append(cell);
  }
  renderEntries();
}

function entryButton(entry) {
  const item = button("", () => showDetails(entry), "entry");
  const title = document.createElement("strong");
  title.textContent = entry.type;
  const interval = document.createElement("small");
  interval.textContent = rangeLabel(entry);
  const status = document.createElement("span");
  status.className = "tag";
  status.textContent = entry.deleted ? "Șters · " + entry.status : entry.status;
  item.append(title, interval, status);
  return item;
}

function renderEntries() {
  const list = byId("entries");
  list.replaceChildren();
  const visible = state.entries.filter((entry) => filter === "deleted" ? entry.deleted : filter === "history" ? !entry.deleted : active(entry));
  for (const entry of visible) list.append(entryButton(entry));
  if (!visible.length) list.append(paragraph("Nu există înregistrări în această secțiune.", "muted"));
}

function open(title) {
  byId("dialog-title").textContent = title;
  body.replaceChildren();
  if (!dialog.open) {
    returnFocus = document.activeElement;
    dialog.showModal();
  }
  byId("close").focus();
}

function actions(...buttons) {
  const row = document.createElement("div");
  row.className = "actions";
  row.append(...buttons);
  body.append(row);
}

function showDay(key) {
  open(format.format(new Date(key)));
  const holiday = holidaysFor(Number(key.slice(0, 4))).get(key);
  if (holiday) body.append(paragraph(holiday, "detail"));
  const matches = state.entries.filter((entry) => active(entry) && entry.start <= key && key <= entry.end);
  for (const entry of matches) {
    body.append(entryButton(entry));
    const remove = button("Șterge această zi", () => confirmDeleteDay(entry, key), "danger");
    remove.setAttribute("aria-label", "Șterge această zi · " + entry.type + " · " + rangeLabel(entry));
    actions(remove);
  }
  if (!matches.length) body.append(paragraph("Nicio înregistrare activă pentru această zi.", "muted"));
  actions(button("Adaugă pentru această zi", () => showForm("create", { start: key, end: key }), "primary"));
}

function showDetails(entry) {
  open(entry.type);
  const detail = document.createElement("div");
  detail.className = "detail";
  detail.append(paragraph(rangeLabel(entry)), paragraph(entry.deleted ? "Șters · " + entry.status : entry.status));
  if (entry.notes) detail.append(paragraph(entry.notes));
  const events = state.audit.filter((event) => event.id === entry.id);
  for (const event of events) detail.append(paragraph(format.format(new Date(event.at)) + " · " + event.label, "muted"));
  body.append(detail);
  if (entry.deleted) {
    actions(button("Restaurează", () => confirmChange(entry, "restore"), "primary"));
    return;
  }
  const controls = [
    button("Duplică", () => showForm("copy", entry)),
    button("Șterge", () => confirmChange(entry, "delete"), "danger"),
  ];
  if (active(entry)) {
    controls.unshift(button("Modifică", () => showForm("edit", entry), "primary"));
    controls.push(button("Anulează concediul", () => confirmChange(entry, "cancel"), "danger"));
  }
  if (canConfirmLeave(entry)) {
    controls.unshift(button("Validează concediul", () => confirmChange(entry, "complete"), "primary"));
  }
  actions(...controls);
}

function canConfirmLeave(entry) {
  return !entry.deleted && ["Planificat", "În așteptare"].includes(entry.status);
}

function completeLeave(entry, error) {
  return canConfirmLeave(entry) && saveEntry({ ...entry, status: "Efectuat" }, "Concediu validat ca efectuat", error);
}

function estimateText(entry) {
  const counts = countsByYear(eligibleDays(entry));
  if (!counts.size) return "0 zile deductibile";
  return [...counts].map(([year, count]) => year + " · " + count + (count === 1 ? " zi deductibilă" : " zile deductibile")).join(" / ");
}

function showForm(mode, source = {}) {
  const title = { create: "Adaugă concediu", edit: "Modifică concediul", copy: "Duplică înregistrarea" };
  open(title[mode]);
  const form = byId("leave-form").content.firstElementChild.cloneNode(true);
  body.append(form);
  for (const field of ["start", "end", "type", "status", "notes"]) {
    const dateField = field === "start" || field === "end";
    if (dateField) {
      form.elements[field].min = minDate;
      form.elements[field].max = maxDate;
    }
    if (mode === "copy" && (dateField || field === "status")) continue;
    if (source[field] !== undefined) form.elements[field].value = source[field];
  }
  const draft = () => ({
    start: form.elements.start.value,
    end: form.elements.end.value,
    type: form.elements.type.value,
    status: form.elements.status.value,
    notes: form.elements.notes.value,
    id: mode === "edit" ? source.id : undefined,
  });
  const estimate = form.querySelector(".estimate");
  const error = form.querySelector(".error");
  function preview() {
    const entry = draft();
    error.textContent = "";
    if (!entry.start || !entry.end) {
      estimate.textContent = "Alege un interval pentru a calcula zilele deductibile.";
      return;
    }
    const previous = mode === "edit" ? "Înainte · " + estimateText(source) + ". După · " : "";
    estimate.textContent = previous + estimateText(entry) + ".";
    const problem = validate(entry);
    if (problem) {
      error.textContent = problem;
    }
  }
  form.addEventListener("input", preview);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const entry = draft();
    const problem = validate(entry);
    if (problem) {
      error.textContent = problem;
      return;
    }
    if (mode !== "edit") entry.id = newEntryId();
    const label = mode === "edit" ? "Înregistrare modificată" : mode === "copy" ? "Înregistrare duplicată" : "Înregistrare adăugată";
    if (saveEntry(entry, label, error)) {
      month = new Date(entry.start.slice(0, 7) + "-01");
      finish();
    }
  });
  preview();
  form.elements.start.focus();
}

function newEntryId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, "0")).join("");
}

function adjacentDay(key, offset) {
  const date = new Date(key);
  date.setUTCDate(date.getUTCDate() + offset);
  return dayKey(date);
}

function deleteDay(entry, key, error) {
  if (entry.start === entry.end) {
    const deleted = { ...entry, deleted: true };
    return saveEntry(deleted, "Zi de concediu ștearsă", error) ? deleted : null;
  }
  const remaining = [];
  if (entry.start < key) remaining.push({ ...entry, end: adjacentDay(key, -1) });
  if (entry.end > key) remaining.push({
    ...entry, id: remaining.length ? newEntryId() : entry.id, start: adjacentDay(key, 1),
  });
  const deleted = { ...entry, id: newEntryId(), start: key, end: key, deleted: true };
  const at = new Date().toISOString();
  const audit = [
    ...state.audit,
    ...remaining.map(item => ({ id: item.id, label: "Zi eliminată din interval · " + key, at })),
    { id: deleted.id, label: "Zi ștearsă din intervalul " + rangeLabel(entry), at },
  ];
  const entries = state.entries.flatMap(item => item.id === entry.id ? [...remaining, deleted] : [item]);
  return commit({ ...state, entries, audit }, error) ? deleted : null;
}

function confirmDeleteDay(entry, key) {
  open("Șterge această zi");
  const selected = { ...entry, start: key, end: key };
  body.append(paragraph(rangeLabel(selected)));
  body.append(paragraph("Ziua va fi mutată în Șterse. Celelalte zile din interval rămân în calendar."));
  if (entry.type === leaveType) body.append(paragraph("Impact asupra soldului · " + estimateText(selected) + "."));
  const error = paragraph("", "error");
  error.setAttribute("role", "alert");
  body.append(error);
  actions(button("Înapoi", () => showDay(key)), button("Confirmă ștergerea zilei", () => {
    const deleted = deleteDay(entry, key, error);
    if (deleted) finish();
  }, "danger"));
}

function confirmChange(entry, operation) {
  const labels = {
    restore: ["Restaurează înregistrarea", "Intrarea revine cu starea „" + entry.status + "”."],
    delete: ["Șterge înregistrarea", "O poți recupera din secțiunea Șterse."],
    cancel: ["Anulează concediul", "Intrarea rămâne în Istoric cu starea „Anulat”."],
    complete: ["Confirmă validarea", "Intervalul trece din „" + entry.status + "” în „Efectuat”."],
  };
  open(labels[operation][0]);
  body.append(paragraph(rangeLabel(entry)), paragraph(labels[operation][1], "muted"));
  if (entry.type === leaveType && entry.status !== "Anulat" && operation !== "complete") {
    const impact = operation === "restore" ? "Se reintroduce în calcul" : "Se eliberează din sold";
    body.append(paragraph(impact + " · " + estimateText(entry) + "."));
  }
  let reason;
  if (operation === "cancel" && entry.status === "Efectuat") {
    const label = document.createElement("label");
    label.textContent = "Motivul anulării";
    reason = document.createElement("textarea");
    reason.maxLength = 500;
    label.append(reason);
    body.append(label);
  }
  const error = paragraph("", "error");
  error.setAttribute("role", "alert");
  body.append(error);
  actions(button("Înapoi", () => showDetails(entry)), button(labels[operation][0], () => {
    if (operation === "complete") {
      if (completeLeave(entry, error)) finish();
      return;
    }
    if (reason && !reason.value.trim()) {
      error.textContent = "Introdu motivul anulării.";
      reason.focus();
      return;
    }
    if (operation === "restore") {
      const problem = validate({ ...entry, deleted: false }, true);
      if (problem) {
        error.textContent = problem;
        return;
      }
      const label = "Înregistrare restaurată";
      if (saveEntry({ ...entry, deleted: false }, label, error)) finish();
    }
    if (operation === "delete") {
      const label = "Înregistrare mutată în Șterse";
      const deleted = { ...entry, deleted: true };
      if (saveEntry(deleted, label, error)) finish();
    }
    if (operation === "cancel") {
      const label = "Concediu anulat";
      if (saveEntry({ ...entry, status: "Anulat" }, label, error, reason?.value.trim())) finish();
    }
  }, operation === "restore" || operation === "complete" ? "primary" : "danger"));
}

function saveEntry(entry, label, error, reason) {
  const exists = state.entries.some(item => item.id === entry.id);
  const entries = exists ? state.entries.map(item => item.id === entry.id ? entry : item) : [...state.entries, entry];
  const event = { id: entry.id, label: reason ? label + " · " + reason : label, at: new Date().toISOString() };
  return commit({ ...state, entries, audit: [...state.audit, event] }, error);
}

function finish() {
  render();
  byId("feedback").textContent = "";
  dialog.close();
}

document.addEventListener("wheel", (event) => {
  // Ctrl-wheel and trackpad pinch can be browser zoom gestures.
  if (!event.ctrlKey && !event.metaKey && event.cancelable) event.preventDefault();
}, { passive: false, capture: true });

dialog.addEventListener("close", () => {
  if (returnFocus?.isConnected) returnFocus.focus();
  else document.querySelector("[data-filter][aria-pressed=true]").focus();
});
byId("close").addEventListener("click", () => dialog.close());
byId("add").addEventListener("click", () => showForm("create"));
for (const [id, direction] of [["prev", -1], ["next", 1]]) {
  byId(id).addEventListener("click", () => {
    month.setUTCMonth(month.getUTCMonth() + direction);
    render();
  });
}
for (const control of document.querySelectorAll("[data-filter]")) {
  control.addEventListener("click", () => {
    filter = control.dataset.filter;
    for (const item of document.querySelectorAll("[data-filter]")) item.setAttribute("aria-pressed", String(item === control));
    renderEntries();
  });
}

byId("export").addEventListener("click", () => {
  if (!storageReady) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "jarvis-concedii-" + today + ".json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
byId("import").addEventListener("click", () => byId("backup-file").click());
byId("backup-file").addEventListener("change", async event => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  try {
    if (file.size > 5_000_000) throw new Error("Fișier prea mare");
    const data = decodeState(await file.text());
    open("Importă backup");
    body.append(paragraph("Importul va înlocui înregistrările și istoricul din acest browser."));
    const error = paragraph("", "error");
    error.setAttribute("role", "alert");
    body.append(error);
    actions(button("Renunță", () => dialog.close()), button("Înlocuiește datele", () => {
      if (commit(data, error)) finish();
    }, "primary"));
  } catch {
    byId("feedback").textContent = "Fișierul nu este un backup Leave Planner valid. Datele locale au fost păstrate.";
  }
});
render();
