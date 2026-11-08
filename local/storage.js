"use strict";

const storageKey = "jarvis.leave-planner.local.v1";
const leaveType = "Concediu de odihnă";
const minYear = 2026;
const maxYear = 2099;
const minDate = minYear + "-01-01";
const maxDate = maxYear + "-12-31";

function emptyState() {
  return { version: 1, entries: [], audit: [], allowances: {} };
}

function validDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && value >= minDate && value <= maxDate && Number.isFinite(Date.parse(value))
    && new Date(value).toISOString().slice(0, 10) === value;
}

function decodeState(raw) {
  const state = JSON.parse(raw);
  if (!state || state.version !== 1 || !Array.isArray(state.entries) || !Array.isArray(state.audit)
      || !state.allowances || typeof state.allowances !== "object" || Array.isArray(state.allowances)) throw new Error("Format invalid");
  const ids = new Set();
  for (const entry of state.entries) {
    if (!entry || typeof entry.id !== "string" || !entry.id || ids.has(entry.id)
        || !validDate(entry.start) || !validDate(entry.end) || entry.end < entry.start
        || ![leaveType, "Altă absență"].includes(entry.type)
        || !["Planificat", "În așteptare", "Efectuat", "Anulat"].includes(entry.status)
        || typeof entry.notes !== "string" || entry.notes.length > 500
        || (entry.deleted !== undefined && typeof entry.deleted !== "boolean")) throw new Error("Înregistrare invalidă");
    ids.add(entry.id);
  }
  for (const event of state.audit) {
    if (!event || !ids.has(event.id) || typeof event.label !== "string" || typeof event.at !== "string"
        || !Number.isFinite(Date.parse(event.at))) throw new Error("Istoric invalid");
  }
  for (const [year, days] of Object.entries(state.allowances)) {
    if (!/^\d{4}$/.test(year) || +year < minYear || +year > maxYear
        || !Number.isInteger(days) || days < 0 || days > 366) throw new Error("Alocare invalidă");
  }
  return state;
}

function readState(storage) {
  const raw = storage.getItem(storageKey);
  return { raw, data: raw === null ? emptyState() : decodeState(raw) };
}

function writeState(storage, previous, data) {
  if (storage.getItem(storageKey) !== previous) throw new Error("Datele s-au schimbat în altă filă");
  const raw = JSON.stringify(data);
  storage.setItem(storageKey, raw);
  return raw;
}
