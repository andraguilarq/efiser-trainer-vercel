import compact from "./compactWordCases.js";

function defaultDiffContext(pack) {
  if (pack.tags?.includes("Neumotórax")) {
    return "Tras la descompresión inicial, el paciente se estabiliza y la imagen de control muestra un neumotórax secundario pequeño, sin datos de tensión; la decisión depende ahora de su reserva pulmonar y de los síntomas.";
  }
  if (pack.tags?.includes("SDRA")) {
    return "Tras iniciar ventilación protectora, persiste hipoxemia grave; la reevaluación obliga a distinguir una complicación del ventilador de una causa adicional de deterioro.";
  }
  return "Durante la reevaluación aparece un dato adicional que obliga a aplicar el diagnóstico diferencial al contexto completo del paciente.";
}

function packRows(p) {
  const mk = (suffix, extra, question, options, answer, rationale, key) => ({
    t: `${p.n}: ${suffix}`,
    tags: p.tags,
    c: `${p.patient} ${p.clues} ${extra}`,
    q: question,
    o: options,
    a: answer,
    r: rationale,
    key,
    // These fields add clinical context without repeating the answer itself.
    f: p.rd,
    alg: p.rs,
    p: p.key,
    e: p.rf,
  });

  return [
    mk("integración diagnóstica", "", p.qd || "¿Cuál es el diagnóstico más probable?", p.dx, 0, p.rd, p.key),
    mk("estudio que cambia conducta", p.studyCase || "La duda diagnóstica persiste pese a la evaluación inicial.", p.qs || "¿Cuál es el siguiente estudio más útil?", p.tests, 0, p.rs, p.studyKey || p.key),
    mk("tratamiento prioritario", p.treatmentCase || "El diagnóstico se confirma y no hay una contraindicación no mencionada.", p.qt || "¿Cuál es la conducta terapéutica más apropiada?", p.tx, 0, p.rt, p.txKey || p.key),
    mk("complicación crítica", p.compCase || "Durante la evolución aparece deterioro clínico.", p.qc || "¿Qué complicación debe buscarse o tratarse primero?", p.comp, 0, p.rc, p.compKey || p.key),
    mk("trampa EFISER", p.diffCase || defaultDiffContext(p), p.qf || "¿Qué opción integra mejor el dato discriminador?", p.diff, 0, p.rf, p.diffKey || p.key),
  ];
}

export function buildPacks(config, packs) {
  return compact(config, packs.flatMap(packRows));
}
