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
import researchPdfCases from "./researchPdfCases";
import scaProgressiveCases from "./scaProgressiveCases";
import massiveWordExpansionCases from "./massiveWordExpansionCases";
import clinicalExpansion20260817 from "./clinicalExpansion20260817";
import correctedBankCompletionCases from "./correctedBankCompletionCases";

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
  ...researchPdfCases,
  ...scaProgressiveCases,
  ...massiveWordExpansionCases,
  ...clinicalExpansion20260817,
  ...correctedBankCompletionCases,
];

function normalizeForContext(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function needsSeriesContext(item) {
  const clinicalCase = normalizeForContext(item.case);
  return /^(misma? paciente|mismo paciente|en el mismo estudio|despues de valorar|despues de (iniciar|corregir|los liquidos)|tras (iniciar|corregir|liquidos)|ademas del tratamiento|el paciente y su familia|la paciente (pregunta|recibe|desarrolla)|el cuadro anterior|se obtienen muestras)/.test(clinicalCase);
}

function addIndependentCaseContext(items) {
  const series = new Map();
  items.forEach((item) => {
    if (!item.caseSet) return;
    const group = series.get(item.caseSet) || [];
    group.push(item);
    series.set(item.caseSet, group);
  });

  return items.map((item) => {
    if (!needsSeriesContext(item) || !item.caseSet) return item;
    const anchor = (series.get(item.caseSet) || [])
      .filter((candidate) => candidate.id !== item.id && !needsSeriesContext(candidate) && String(candidate.case || "").trim().length >= 90)
      .sort((a, b) => Number(a.step || 0) - Number(b.step || 0))[0];

    if (!anchor) return item;
    return {
      ...item,
      case: `${anchor.case}\n\nInformación clínica adicional para este reactivo: ${item.case}`,
    };
  });
}

function normalizeSpecialty(specialty) {
  const value = String(specialty || "Otras");
  if (["Gastroenterología", "Gastroenterología / Hepatología", "Hepatología"].includes(value)) return "Gastroenterología / Hepatología";
  if (["Ginecología y obstetricia", "Ginecoobstetricia"].includes(value)) return "Gineco-obstetricia";
  if (["Hematología", "Hematología y Reumatología"].includes(value)) return "Hematología / Reumatología";
  if (["Bioestadística", "Investigación", "Investigación y estadística"].includes(value)) return "Investigación / Bioestadística";
  if (["Medicina crítica", "Urgencias"].includes(value)) return "Medicina crítica / Urgencias";
  return value;
}

const allCases = addIndependentCaseContext(rawCases).map((item) => ({
  ...item,
  specialty: normalizeSpecialty(item.specialty),
  difficulty: Number(item.difficulty) || 3,
}));

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
