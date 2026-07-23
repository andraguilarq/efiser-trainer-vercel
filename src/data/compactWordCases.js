import { buildWordSummaryCases } from "./wordSummaryCaseFactory.js";

export default function compact(config, rows) {
  const cases = rows.map((row) => {
    if (!Array.isArray(row)) return row;
    const [t, tags, c, q, o, a, r, key] = row;
    return { t, tags, c, q, o, a, r, key };
  });
  return buildWordSummaryCases({ ...config, cases });
}
