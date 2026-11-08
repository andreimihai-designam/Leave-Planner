const test = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { webcrypto } = require("node:crypto");
const vm = require("node:vm");
const html = readFileSync(join(__dirname, "..", "index.html"), "utf8");
const pageIds = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]));

function load(storage, now = new Date(), storageManager) {
  const elements = new Map();
  const element = tagName => ({
    tagName, children: [],
    addEventListener() {},
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    setAttribute() {},
    classList: { toggle() {} },
  });
  const context = vm.createContext({
    localStorage: storage,
    crypto: webcrypto,
    navigator: { storage: storageManager },
    Date: class extends Date {
      constructor(...args) { super(...(args.length ? args : [now.getTime()])); }
      static now() { return now.getTime(); }
    },
    document: {
      getElementById(id) {
        if (!pageIds.has(id)) return null;
        if (!elements.has(id)) elements.set(id, element());
        return elements.get(id);
      },
      querySelectorAll() { return []; },
      createElement: element,
    },
  });
  for (const name of ["storage", "calendar", "app"]) {
    const file = join(__dirname, "..", "local", name + ".js");
    vm.runInContext(readFileSync(file, "utf8"), context);
  }
  return source => vm.runInContext(source, context);
}

test("calendar renders every day of the month without the removed allocation element", () => {
  const run = load({ getItem: () => null }, new Date("2026-11-08T12:00:00Z"));
  assert.equal(run('document.getElementById("allocation")'), null);
  assert.equal(run('byId("calendar").children.filter(day => day.tagName === "button").length'), 30);
  assert.equal(run('byId("calendar").children.find(day => day.tagName === "button").textContent'), "1");
  assert.equal(run('byId("calendar").children.at(-1).textContent'), "30");
});

test("local state survives a fresh application load with balances and history", () => {
  const items = new Map();
  const storage = { getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value) };
  const run = load(storage);
  assert.equal(run("state.entries.length"), 0);
  assert.equal(run("balance(2026).available"), 7);
  assert.equal(run("balance(2027, 1).available"), 27);
  assert.equal(run("balance(2027, 6).available"), 20);
  assert.equal(run("balance(2028, 1).available"), 40);
  run(`const leave = { id: "personal", start: "2026-12-31", end: "2027-01-04", type: leaveType, status: "Planificat", notes: "" };`);
  assert.equal(run("validate(leave)"), "");
  assert.equal(run("state.allowances[2026]"), undefined);
  assert.equal(run(`
    const allowances = { 2026: 20, 2027: 21 };
    commit({ ...state, allowances }, {}) && validate(leave) === "" && saveEntry(leave, "Adăugat", {});
  `), true);
  const reload = load(storage);
  assert.equal(reload("state.audit.length"), 1);
  assert.equal(reload("balance(2026).available"), 6);
  assert.equal(reload("balance(2027, 1).available"), 25);
  assert.equal(reload("balance(2027, 6).available"), 20);
  assert.match(reload("validate({ ...state.entries[0], id: 'another' })"), /suprapune/);
  assert.equal(reload("saveEntry({ ...state.entries[0], deleted: true }, 'Șters', {})"), true);
  assert.equal(load(storage)("balance(2026).available"), 7);
  assert.equal(reload("saveEntry({ ...state.entries[0], deleted: false }, 'Restaurat', {})"), true);
  assert.equal(load(storage)("balance(2026).available"), 6);
  assert.equal(reload("saveEntry({ ...state.entries[0], status: 'Anulat' }, 'Anulat', {})"), true);
  assert.equal(load(storage)("state.audit.length"), 4);
  assert.equal(load(storage)("balance(2027).available"), 20);
  assert.equal(run("commit(emptyState(), {})"), false);
  assert.throws(() => reload("decodeState(JSON.stringify({ ...state, allowances: { 2026: -1 } }))"), /Alocare/);
  assert.throws(() => reload("decodeState(JSON.stringify({ ...state, entries: [state.entries[0], state.entries[0]] }))"), /Înregistrare/);
  assert.equal(reload("decodeState(JSON.stringify(state)).entries[0].status"), "Anulat");
  assert.equal(load(storage)("state.entries[0].status"), "Anulat");
});

test("deleting a calendar day preserves the rest of the interval and allows restoration", () => {
  const items = new Map();
  const storage = { getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value) };
  const run = load(storage);
  run(`
    const entry = { id: "interval", start: "2026-11-16", end: "2026-11-20",
      type: leaveType, status: "Planificat", notes: "Exemplu" };
    saveEntry(entry, "Adăugat", {});
    const deleted = deleteDay(entry, "2026-11-18", {});
  `);
  const reopened = load(storage);
  assert.equal(reopened("balance(2026).reserved"), 4);
  assert.equal(reopened(`state.entries.filter(active).map(e => e.start + "/" + e.end).join(",")`),
    "2026-11-16/2026-11-17,2026-11-19/2026-11-20");
  assert.equal(reopened(`state.entries.find(e => e.deleted).start`), "2026-11-18");
  assert.equal(reopened(`
    const restored = { ...state.entries.find(e => e.deleted), deleted: false };
    validate(restored, true) === "" && saveEntry(restored, "Restaurat", {});
  `), true);
  assert.equal(load(storage)("balance(2026).reserved"), 5);
  assert.equal(reopened(`deleteDay(restored, restored.start, {}).id === restored.id`), true);
  assert.equal(reopened("balance(2026).reserved"), 4);
  assert.equal(reopened(`
    const weekend = { id: "weekend", start: "2026-11-27", end: "2026-11-29",
      type: leaveType, status: "Planificat", notes: "" };
    saveEntry(weekend, "Adăugat", {});
    const removedWeekend = deleteDay(weekend, "2026-11-28", {});
    validate({ ...removedWeekend, deleted: false }, true);
  `), "");
  assert.equal(load(storage)("balance(2026).reserved"), 5);
});

test("leave is still present after eleven simulated days and persistence is optional", async () => {
  const items = new Map();
  const storage = { getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value) };
  let requests = 0;
  const first = load(storage, new Date("2026-11-08T12:00:00Z"), {
    async persisted() { return false; },
    async persist() { requests++; throw new Error("Denied"); },
  });
  assert.equal(first(`saveEntry({
    id: "stored", start: "2026-11-20", end: "2026-11-20", type: leaveType,
    status: "Planificat", notes: "Test"
  }, "Adăugat", {})`), true);
  assert.equal(first(`saveEntry({ ...state.entries[0], notes: "Actualizat" }, "Modificat", {})`), true);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(requests, 1);
  const reopened = load(storage, new Date("2026-11-19T12:00:00Z"));
  assert.equal(reopened("state.entries[0].notes"), "Actualizat");
  assert.equal(reopened("state.audit.length"), 2);
  assert.equal(reopened("balance(2026).available"), 6);
});

test("carryover expires after May 31, funds early leave first, and never carries twice", () => {
  const items = new Map();
  const run = load({ getItem: key => items.get(key) ?? null, setItem: (key, value) => items.set(key, value) });
  run(`
    const summer = { id: "summer", start: "2027-07-01", end: "2027-07-28", type: leaveType, status: "Planificat", notes: "" };
    saveEntry(summer, "Adăugat", {});
    const early = { id: "early", start: "2027-05-31", end: "2027-05-31", type: leaveType, status: "Planificat", notes: "" };
    const late = { ...early, id: "late", start: "2027-06-02", end: "2027-06-02" };
  `);
  assert.equal(run("balance(2027, 5).available"), 7);
  assert.equal(run("validate(early)"), "");
  assert.match(run("validate(late)"), /Sold insuficient/);
  assert.equal(run("saveEntry(early, 'Adăugat', {})"), true);
  assert.equal(run("balance(2027, 5).carried"), 6);
  assert.equal(run("balance(2027, 6).available"), 0);
  assert.equal(run("balance(2028, 1).carried"), 0);
  assert.match(run(`validate({ ...early, id: "prior", start: "2026-12-22", end: "2026-12-31" })`), /Sold insuficient pentru anul 2027/);
});

test("calendar excludes Romanian holidays and weekends in the supported period", () => {
  const run = load({ getItem: () => null });
  assert.equal(run('holidaysFor(2026).get("2026-04-10")'), "Vinerea Mare");
  assert.equal(run('holidaysFor(2026).get("2026-04-12")'), "Paștele ortodox");
  assert.equal(run('holidaysFor(2026).get("2026-06-01")'), "Ziua Copilului · A doua zi de Rusalii");
  assert.equal(run('holidaysFor(2027).get("2027-05-02")'), "Paștele ortodox");
  assert.equal(run('validDate("2028-02-29")'), true);
  assert.equal(run('validDate("2027-02-29")'), false);
  assert.equal(run('eligibleDays({ type: leaveType, start: "2026-11-27", end: "2026-12-02" }).join(",")'), "2026-11-27,2026-12-02");
});
