"use strict";

const fixedHolidays = [
  ["01-01", "Anul Nou"], ["01-02", "A doua zi de Anul Nou"], ["01-06", "Boboteaza"],
  ["01-07", "Sfântul Ioan Botezătorul"], ["01-24", "Ziua Unirii Principatelor Române"],
  ["05-01", "Ziua Muncii"], ["06-01", "Ziua Copilului"], ["08-15", "Adormirea Maicii Domnului"],
  ["11-30", "Sfântul Andrei"], ["12-01", "Ziua Națională"],
  ["12-25", "Crăciunul"], ["12-26", "A doua zi de Crăciun"],
];
const holidayCache = new Map();

function dayKey(date) {
  return date.toISOString().slice(0, 10);
}

function holidaysFor(year) {
  if (holidayCache.has(year)) return holidayCache.get(year);
  const dates = new Map(fixedHolidays.map(([day, title]) => [year + "-" + day, title]));
  // Julian computus. The Julian/Gregorian gap is 13 days throughout 2026–2099.
  const lunarCycle = (19 * (year % 19) + 15) % 30;
  const weekday = (2 * (year % 4) + 4 * (year % 7) - lunarCycle + 34) % 7;
  const easter = lunarCycle + weekday + 114;
  for (const [offset, title] of [
    [-2, "Vinerea Mare"], [0, "Paștele ortodox"], [1, "A doua zi de Paște"],
    [49, "Rusaliile"], [50, "A doua zi de Rusalii"],
  ]) {
    const date = dayKey(new Date(Date.UTC(year, Math.floor(easter / 31) - 1, easter % 31 + 1 + 13 + offset)));
    dates.set(date, [dates.get(date), title].filter(Boolean).join(" · "));
  }
  holidayCache.set(year, dates);
  return dates;
}

function isWeekend(date) {
  return [0, 6].includes(date.getUTCDay());
}

function active(entry) {
  return !entry.deleted && entry.status !== "Anulat";
}

function eligibleDays(entry) {
  const result = [];
  if (entry.type !== leaveType || !validDate(entry.start) || !validDate(entry.end)) return result;
  const date = new Date(entry.start);
  while (dayKey(date) <= entry.end) {
    const key = dayKey(date);
    if (!isWeekend(date) && !holidaysFor(date.getUTCFullYear()).has(key)) result.push(key);
    date.setUTCDate(date.getUTCDate() + 1);
  }
  return result;
}
