function normalizeOptions(optionPairs, answer, rationale, discriminator) {
  return {
    options: optionPairs.map((entry) => Array.isArray(entry) ? entry[0] : entry),
    optionFeedback: optionPairs.map((entry, index) => {
      const explicit = Array.isArray(entry) ? entry[1] : null;
      const reason = explicit || (index === answer
        ? rationale
        : `No integra el dato discriminador del caso: ${discriminator || rationale}`);
      return `${index === answer ? "Correcta" : "Incorrecta"}. ${reason}`;
    }),
  };
}

export function buildWordSummaryCases({ startId, prefix, specialty, source, cases }) {
  return cases.map((item, index) => {
    const { options, optionFeedback } = normalizeOptions(item.o, item.a, item.r, item.key);
    return {
      id: startId + index,
      caseSet: `${prefix}-${String(index + 1).padStart(2, "0")}`,
      step: 1,
      specialty,
      difficulty: item.d || 4,
      source,
      sourceMode: "original-from-user-summary",
      tags: item.tags,
      title: item.t,
      case: item.c,
      question: item.q,
      options,
      answer: item.a,
      explanation: [
        `Respuesta razonada: ${item.r}`,
        `Fisiopatología e interpretación clínica: ${item.f || item.r}`,
        `Algoritmo diagnóstico/terapéutico: ${item.alg || "Identifique primero la gravedad, confirme el mecanismo con el estudio que cambia conducta y trate antes las amenazas vitales."}`,
        `Perla EFISER: ${item.p || item.key || item.r}`,
        `Error frecuente: ${item.e || "Elegir una opción plausible por un dato aislado sin integrar el patrón clínico completo."}`,
        `Fuente principal: ${source}.`,
      ].join("\n\n"),
      optionFeedback,
    };
  });
}
