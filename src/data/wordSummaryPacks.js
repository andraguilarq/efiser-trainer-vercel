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

function defaultComplicationContext(pack) {
  if (pack.tags?.includes("Anemia")) {
    return "Durante la evolución presenta disnea de reposo, taquicardia, dolor torácico opresivo y cambios electrocardiográficos compatibles con isquemia por desbalance entre aporte y demanda de oxígeno.";
  }
  if (pack.tags?.includes("PTT")) {
    return "Durante la evolución desarrolla cefalea intensa, confusión y un nuevo déficit neurológico; las plaquetas continúan descendiendo y aparecen más esquistocitos.";
  }
  if (pack.tags?.includes("HIT")) {
    return "Al séptimo día de exposición a heparina presenta aumento de volumen y dolor en una pierna, con una caída plaquetaria mayor del 50% respecto al valor basal.";
  }
  if (pack.tags?.includes("Gota") || pack.tags?.includes("CPPD")) {
    return "En las horas siguientes aumenta la fiebre y la articulación se vuelve más dolorosa, caliente y limitada; el cultivo del líquido sinovial aún está pendiente.";
  }
  if (pack.tags?.includes("SDRA")) {
    return "A pesar de la ventilación protectora persiste hipoxemia grave y aumenta la presión de la vía aérea; se debe buscar lesión inducida por el ventilador y complicaciones del SDRA.";
  }
  return "Durante la reevaluación aparecen signos y síntomas nuevos que obligan a buscar de forma dirigida las complicaciones relacionadas con el diagnóstico.";
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
    mk("complicación crítica", p.compCase || defaultComplicationContext(p), p.qc || "¿Qué complicación debe buscarse o tratarse primero?", p.comp, 0, p.rc, p.compKey || p.key),
    mk("trampa EFISER", p.diffCase || defaultDiffContext(p), p.qf || "¿Qué opción integra mejor el dato discriminador?", p.diff, 0, p.rf, p.diffKey || p.key),
  ];
}

export function buildPacks(config, packs) {
  return compact(config, packs.flatMap(packRows));
}
