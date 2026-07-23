import { buildWordSummaryCases } from "./wordSummaryCaseFactory.js";

export default function compact(config, rows) {
  const cases = rows.map(([t, tags, c, q, o, a, r, key]) => ({ t, tags, c, q, o, a, r, key }));
  return buildWordSummaryCases({ ...config, cases });
}
