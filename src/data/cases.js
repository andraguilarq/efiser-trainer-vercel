import case001 from "./cases/nephrology/case001.json";
import case002 from "./cases/nephrology/case002.json";
import case003 from "./cases/nephrology/case003.json";
import case004 from "./cases/nephrology/case004.json";
import case005 from "./cases/nephrology/case005.json";
import case006 from "./cases/nephrology/case006.json";
import case007 from "./cases/nephrology/case007.json";
import case008 from "./cases/nephrology/case008.json";
import case009 from "./cases/nephrology/case009.json";
import case010 from "./cases/nephrology/case010.json";
import caseSeries from "./caseSeries";
import extraCases from "./extraCases";
import expandedCases from "./expandedCases";
import researchBankCases from "./researchBankCases";
import summaryAdvancedCases from "./summaryAdvancedCases";
import efiserRecalledCases from "./efiserRecalledCases";
import latestWordAdvancedCases from "./latestWordAdvancedCases";
import priorityExpansionCases from "./priorityExpansionCases";
import efiserPriorityCases from "./efiserPriorityCases";
import wordCasesCardio from "./wordCasesCardio";
import wordCasesEndocrino from "./wordCasesEndocrino";
import wordCasesGastro from "./wordCasesGastro";
import wordCasesRemaining from "./wordCasesRemaining";

const rawCases = [
  case001,
  case002,
  case003,
  case004,
  case005,
  case006,
  case007,
  case008,
  case009,
  case010,
  ...caseSeries,
  ...extraCases,
  ...expandedCases,
  ...researchBankCases,
  ...summaryAdvancedCases,
  ...efiserRecalledCases,
  ...latestWordAdvancedCases,
  ...priorityExpansionCases,
  ...efiserPriorityCases,
  ...wordCasesCardio,
  ...wordCasesEndocrino,
  ...wordCasesGastro,
  ...wordCasesRemaining,
];

function cleanContinuation(text) {
  return String(text || "")
    .replace(/^\s*(la|el)\s+mism[oa]\s+paciente[.:,;-]*\s*/i, "")
    .replace(/^\s*mism[oa]\s+paciente[.:,;-]*\s*/i, "")
    .replace(/^\s*mismo\s+caso[.:,;-]*\s*/i, "")
    .trim();
}

function hasSubstantialContext(text, baseText) {
  const current = normalize(text);
  const base = normalize(baseText);
  if (!current || !base) return false;
  return current.includes(base.slice(0, Math.min(120, base.length)));
}

function expandSharedClinicalContext(items) {
  const groups = new Map();
  items.forEach((item, index) => {
    if (!item.caseSet) return;
    // caseSet values can repeat between imported banks. Never join cases
    // from different sources, otherwise an unrelated patient is appended.
    const groupKey = `${item.source || "unknown"}::${item.caseSet}`;
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push({ item, index });
  });

  const expanded = items.map((item) => ({ ...item }));
  groups.forEach((members) => {
    if (members.length < 2) return;
    const ordered = [...members].sort((left, right) =>
      (Number(left.item.step) || 1) - (Number(right.item.step) || 1) || left.index - right.index,
    );
    const base = ordered[0].item;
    const baseText = String(base.case || "").trim();
    if (!baseText) return;

    ordered.slice(1).forEach(({ item, index }) => {
      if (hasSubstantialContext(item.case, baseText)) return;
      const continuation = cleanContinuation(item.case);
      expanded[index] = {
        ...item,
        case: `${baseText}\n\nEvolución o dato adicional para este reactivo:\n${continuation}`,
      };
    });
  });
  return expanded;
}

// Cada reactivo debe conservar únicamente el caso que le corresponde.
// No inferimos evoluciones por coincidencia de caseSet: los bancos importados
// pueden reutilizar identificadores y eso mezcla pacientes no relacionados.
const allCases = rawCases;

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const seen = new Set();
const cases = allCases.filter((item) => {
  const key = [normalize(item.question), ...(item.options || []).map(normalize)].join("|");
  if (!key || seen.has(key)) return false;
  seen.add(key);
  return true;
});

export default cases;
