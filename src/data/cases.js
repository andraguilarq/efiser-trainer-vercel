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
];

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
