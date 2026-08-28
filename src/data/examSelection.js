import { getActiveProfileId } from "./profiles.js";

const RECENT_LIMIT = 500;
const HISTORY_PREFIX = "efiser-trainer-recent-cases";

function historyKey() {
  return `${HISTORY_PREFIX}:${getActiveProfileId() || "default"}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function safeRead() {
  try {
    const saved = JSON.parse(localStorage.getItem(historyKey()) || "[]");
    return Array.isArray(saved) ? saved.map(String) : [];
  } catch {
    return [];
  }
}

export function getRecentCaseIds() {
  return safeRead();
}

export function rememberCaseIds(ids) {
  const previous = safeRead();
  const newest = ids.map(String);
  const merged = [...newest, ...previous.filter((id) => !newest.includes(id))].slice(0, RECENT_LIMIT);
  localStorage.setItem(historyKey(), JSON.stringify(merged));
}

export function getSpecialties(items) {
  return [...new Set(items.map((item) => item.specialty).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right, "es"),
  );
}

// Estas son las preguntas importadas de los bancos compartidos por Andrea.
// "reconstructed" conserva reactivos recuperados de EFISER que se reescribieron
// para que cada uno pueda responderse de manera independiente.
export function isBankCase(item) {
  if (["verbatim", "reconstructed", "corrected-bank-derived", "corrected-bank-objective", "audio-recall-derived"].includes(item?.sourceMode)) return true;

  // También incorpora casos completos desarrollados desde los ocho resúmenes
  // EFISER de la usuaria. Esto permite bloques largos sin mezclar el resto de
  // los resúmenes generales de la biblioteca.
  return /\befiser\b|banco\s+efiser|efiser\s+preguntas/i.test(
    `${item?.source || ""} ${item?.sourceConcept || ""}`,
  );
}

function matchesFilters(item, specialty, difficulty, bankOnly) {
  return (specialty === "Todas" || item.specialty === specialty)
    && (difficulty === "Todas" || Number(item.difficulty) === Number(difficulty))
    && (!bankOnly || isBankCase(item));
}

function normalizeForFingerprint(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function removeDuplicateReactives(items) {
  const fingerprints = new Set();
  return items.filter((item) => {
    const fingerprint = [
      normalizeForFingerprint(item.case),
      normalizeForFingerprint(item.question),
      ...(item.options || []).map(normalizeForFingerprint).sort(),
    ].join("|");
    if (fingerprints.has(fingerprint)) return false;
    fingerprints.add(fingerprint);
    return true;
  });
}

function bucketKey(item, specialty) {
  const subtopic = item.subtopic || item.sourceConcept || item.tags?.[0] || "general";
  return specialty === "Todas" ? `${item.specialty}::${subtopic}` : subtopic;
}

function takeDiverse(pool, count, specialty, usedSeries, seriesLimit) {
  const grouped = new Map();
  shuffle(pool).forEach((item) => {
    const key = bucketKey(item, specialty);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  });

  const keys = shuffle([...grouped.keys()]);
  const picked = [];
  let cursor = 0;
  let stalled = 0;
  while (picked.length < count && keys.length && stalled < keys.length * 3) {
    const key = keys[cursor % keys.length];
    const items = grouped.get(key);
    const candidateIndex = items.findIndex((item) => {
      const series = String(item.caseSeriesId || item.id);
      return (usedSeries.get(series) || 0) < seriesLimit;
    });
    if (candidateIndex >= 0) {
      const [candidate] = items.splice(candidateIndex, 1);
      const series = String(candidate.caseSeriesId || candidate.id);
      usedSeries.set(series, (usedSeries.get(series) || 0) + 1);
      picked.push(candidate);
      stalled = 0;
    } else {
      stalled += 1;
    }
    cursor += 1;
  }
  return picked;
}

export function selectExamCases(allCases, {
  size,
  specialty = "Todas",
  difficulty = "Todas",
  bankOnly = false,
  recentIds = getRecentCaseIds(),
  priorityIds = [],
} = {}) {
  // Segunda barrera: aunque un archivo futuro incluya por error un reactivo
  // repetido, nunca podrá entrar dos veces al mismo examen.
  const candidates = removeDuplicateReactives(
    allCases.filter((item) => matchesFilters(item, specialty, difficulty, bankOnly)),
  );
  const requested = Math.max(1, Math.min(Number(size) || 1, candidates.length));
  const recentRank = new Map(recentIds.map((id, index) => [String(id), index]));
  const prioritySet = new Set(priorityIds.map(String));
  const fresh = candidates.filter((item) => !recentRank.has(String(item.id)));
  const seen = candidates
    .filter((item) => recentRank.has(String(item.id)))
    .sort((left, right) => recentRank.get(String(right.id)) - recentRank.get(String(left.id)));
  const priority = candidates.filter((item) => prioritySet.has(String(item.id)) && !recentRank.has(String(item.id)));
  const priorityUnique = new Set(priority.map((item) => String(item.id)));
  const orderedPools = [priority, fresh.filter((item) => !priorityUnique.has(String(item.id))), seen];
  const seriesLimit = requested <= 10 ? 1 : requested <= 25 ? 2 : 3;
  const usedSeries = new Map();
  const selected = [];

  orderedPools.forEach((pool) => {
    if (selected.length >= requested) return;
    selected.push(...takeDiverse(pool, requested - selected.length, specialty, usedSeries, seriesLimit));
  });

  if (selected.length < requested) {
    const selectedIds = new Set(selected.map((item) => String(item.id)));
    const fallback = shuffle(candidates.filter((item) => !selectedIds.has(String(item.id))));
    selected.push(...fallback.slice(0, requested - selected.length));
  }

  return shuffle(selected);
}
