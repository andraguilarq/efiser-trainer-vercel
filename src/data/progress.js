const STORAGE_KEY = "efiser-trainer-progress";

const emptyProgress = {
  examsCompleted: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  bestGrade: 0,
  history: [],
  bySpecialty: {},
  missedIds: {},
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyProgress, ...JSON.parse(raw) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function saveExamResult(result) {
  const progress = loadProgress();
  const nextBySpecialty = { ...progress.bySpecialty };
  const nextMissedIds = { ...(progress.missedIds || {}) };

  result.answers.forEach((answer) => {
    const key = answer.specialty || "Sin clasificar";
    const current = nextBySpecialty[key] || { total: 0, correct: 0 };
    nextBySpecialty[key] = {
      total: current.total + 1,
      correct: current.correct + (answer.correct ? 1 : 0),
    };

    if (answer.correct) {
      delete nextMissedIds[answer.caseId];
    } else {
      nextMissedIds[answer.caseId] = (nextMissedIds[answer.caseId] || 0) + 1;
    }
  });

  const next = {
    examsCompleted: progress.examsCompleted + 1,
    questionsAnswered: progress.questionsAnswered + result.total,
    correctAnswers: progress.correctAnswers + result.score,
    bestGrade: Math.max(progress.bestGrade || 0, Number(result.grade)),
    bySpecialty: nextBySpecialty,
    missedIds: nextMissedIds,
    history: [
      {
        date: new Date().toISOString(),
        score: result.score,
        total: result.total,
        percentage: result.percentage,
        grade: result.grade,
        missed: result.answers
          .filter((answer) => !answer.correct)
          .map((answer) => ({
            caseId: answer.caseId,
            title: answer.title,
            specialty: answer.specialty,
          })),
      },
      ...(progress.history || []),
    ].slice(0, 30),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getOverallAccuracy(progress = loadProgress()) {
  if (!progress.questionsAnswered) return 0;
  return Math.round((progress.correctAnswers / progress.questionsAnswered) * 100);
}
