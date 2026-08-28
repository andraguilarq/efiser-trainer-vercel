import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
  const cases = (await server.ssrLoadModule("/src/data/cases.js")).default;
  const { pearls, studyResources } = await server.ssrLoadModule("/src/data/studyResources.js");
  const { selectExamCases } = await server.ssrLoadModule("/src/data/examSelection.js");
  const ids = cases.map((item) => String(item.id));
  if (ids.length !== new Set(ids).size) throw new Error("Hay IDs duplicados en el banco.");
  if (!studyResources.every((item) => item.steps?.length && item.table?.length > 1 && item.tags?.length)) throw new Error("Hay recursos de repaso incompletos.");
  if (!pearls.every((item) => item.specialty && item.topic && item.text)) throw new Error("Hay perlas incompletas.");
  const selected = selectExamCases(cases, { size: Math.min(100, cases.length), recentIds: [] });
  if (selected.length !== new Set(selected.map((item) => String(item.id))).size) throw new Error("El selector repite preguntas dentro de un bloque.");
  console.log(JSON.stringify({ cases: cases.length, resources: studyResources.length, pearls: pearls.length, selection: selected.length, ok: true }));
} finally {
  await server.close();
}
