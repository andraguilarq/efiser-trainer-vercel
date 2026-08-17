const store = new Map();
globalThis.localStorage = {
  getItem: (key) => store.get(key) ?? null,
  setItem: (key, value) => store.set(key, String(value)),
  removeItem: (key) => store.delete(key),
};

const { default: addedCases, clinicalExpansion20260817Manifest } = await import("../src/data/clinicalExpansion20260817.js");
const { getRecentCaseIds, rememberCaseIds, selectExamCases } = await import("../src/data/examSelection.js");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(clinicalExpansion20260817Manifest.length === 35, "Deben existir 35 documentos en el manifiesto.");
assert(addedCases.length === 700, "Deben generarse 700 reactivos nuevos.");
assert(clinicalExpansion20260817Manifest.every((item) => item.questions === 20), "Cada documento debe aportar 20 reactivos.");
assert(addedCases.every((item) => item.id && item.specialty && item.difficulty && item.answer >= 0 && item.optionFeedback?.length === item.options.length), "Todo reactivo debe conservar metadatos y retroalimentación completa.");

const first = selectExamCases(addedCases, { size: 10, recentIds: [] });
assert(new Set(first.map((item) => item.id)).size === 10, "No debe repetirse un reactivo en el mismo examen.");
assert(new Set(first.map((item) => item.caseSeriesId)).size === 10, "Un examen corto debe limitar preguntas de la misma serie.");
rememberCaseIds(first.map((item) => item.id));
const second = selectExamCases(addedCases, { size: 10, recentIds: getRecentCaseIds() });
assert(second.every((item) => !first.some((prior) => prior.id === item.id)), "El segundo examen debe priorizar reactivos no vistos.");
const endocrine = selectExamCases(addedCases, { size: 5, specialty: "Endocrinología", recentIds: [] });
assert(endocrine.length === 5 && endocrine.every((item) => item.specialty === "Endocrinología"), "El filtro por especialidad debe conservar sólo la especialidad solicitada.");

console.log(JSON.stringify({ documents: clinicalExpansion20260817Manifest.length, addedCases: addedCases.length, firstExam: first.length, secondExam: second.length, endocrine: endocrine.length }));
