function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sameIdea(left, right) {
  return normalizeText(left) === normalizeText(right);
}

function buildExplanation(item) {
  const sections = [
    `Por que esta es la mejor respuesta: ${item.r}`,
  ];

  if (item.f && !sameIdea(item.f, item.r)) {
    sections.push(`Como interpretar el caso: ${item.f}`);
  }

  if (item.alg && !sameIdea(item.alg, item.r) && !sameIdea(item.alg, item.f)) {
    sections.push(`Conducta practica: ${item.alg}`);
  }

  const teachingPoint = item.p || item.key;
  if (teachingPoint && !sameIdea(teachingPoint, item.r) && !sameIdea(teachingPoint, item.f) && !sameIdea(teachingPoint, item.alg)) {
    sections.push(`Dato que decide la pregunta: ${teachingPoint}`);
  }

  if (item.e && !sameIdea(item.e, item.r) && !sameIdea(item.e, item.f)) {
    sections.push(`Trampa clinica: ${item.e}`);
  }

  return sections.join("\n\n");
}

function normalizeOptions(optionPairs, answer, rationale, discriminator) {
  return {
    options: optionPairs.map((entry) => Array.isArray(entry) ? entry[0] : entry),
    optionFeedback: optionPairs.map((entry, index) => {
      const explicit = Array.isArray(entry) ? entry[1] : null;
      const reason = explicit || (index === answer
        ? rationale
        : `No es la mejor opcion en este escenario. El dato decisivo es: ${discriminator || rationale}`);
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
      explanation: buildExplanation(item),
      optionFeedback,
    };
  });
}
