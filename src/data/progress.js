import { getActiveProfileId } from "./profiles.js";

const LEGACY_STORAGE_KEY = "efiser-trainer-progress";

function storageKey() {
  const profileId = getActiveProfileId();
  return profileId ? `efiser-trainer-progress:${profileId}` : LEGACY_STORAGE_KEY;
}

const emptyProgress = {
  examsCompleted: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  bestGrade: 0,
  history: [],
  bySpecialty: {},
  byTopic: {},
  byDifficulty: {},
  missedIds: {},
};

export function loadProgress() {
  try {
    const key = storageKey();
    let raw = localStorage.getItem(key);
    if (!raw && getActiveProfileId() === "andrea") {
      raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) localStorage.setItem(key, raw);
    }
    return raw ? { ...emptyProgress, ...JSON.parse(raw) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function saveExamResult(result) {
  const progress = loadProgress();
  const nextBySpecialty = { ...progress.bySpecialty };
  const nextByTopic = { ...progress.byTopic };
  const nextByDifficulty = { ...progress.byDifficulty };
  const nextMissedIds = { ...progress.missedIds };

  result.answers.forEach((answer) => {
    const key = answer.specialty || "Sin clasificar";
    const current = nextBySpecialty[key] || { total: 0, correct: 0 };
    nextBySpecialty[key] = {
      total: current.total + 1,
      correct: current.correct + (answer.correct ? 1 : 0),
    };

    const topic = answer.topic || "General";
    const topicKey = `${key}::${topic}`;
    const topicCurrent = nextByTopic[topicKey] || { specialty: key, topic, total: 0, correct: 0, lastAnsweredAt: null };
    nextByTopic[topicKey] = {
      ...topicCurrent,
      total: topicCurrent.total + 1,
      correct: topicCurrent.correct + (answer.correct ? 1 : 0),
      lastAnsweredAt: new Date().toISOString(),
    };

    const difficultyKey = `Nivel ${answer.difficulty || "sin clasificar"}`;
    const difficultyCurrent = nextByDifficulty[difficultyKey] || { total: 0, correct: 0 };
    nextByDifficulty[difficultyKey] = { total: difficultyCurrent.total + 1, correct: difficultyCurrent.correct + (answer.correct ? 1 : 0) };

    if (!answer.correct) {
      nextMissedIds[answer.caseId] = (nextMissedIds[answer.caseId] || 0) + 1;
    }
  });

  const next = {
    examsCompleted: progress.examsCompleted + 1,
    questionsAnswered: progress.questionsAnswered + result.total,
    correctAnswers: progress.correctAnswers + result.score,
    bestGrade: Math.max(progress.bestGrade || 0, Number(result.grade)),
    bySpecialty: nextBySpecialty,
    byTopic: nextByTopic,
    byDifficulty: nextByDifficulty,
    missedIds: nextMissedIds,
    history: [
      {
        date: new Date().toISOString(),
        score: result.score,
        total: result.total,
        percentage: result.percentage,
        grade: result.grade,
        estimatedSeconds: result.estimatedSeconds || null,
        usedSeconds: result.usedSeconds || null,
        secondsPerQuestion: result.secondsPerQuestion || null,
        timedOut: Boolean(result.timedOut),
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

  localStorage.setItem(storageKey(), JSON.stringify(next));
  return next;
}

export function resetProgress() {
  localStorage.removeItem(storageKey());
}

export function getOverallAccuracy(progress = loadProgress()) {
  if (!progress.questionsAnswered) return 0;
  return Math.round((progress.correctAnswers / progress.questionsAnswered) * 100);
}

export function getWeaknesses(progress = loadProgress(), limit = 5) {
  return Object.entries(progress.bySpecialty || {})
    .filter(([, value]) => value.total > 0)
    .map(([specialty, value]) => ({
      specialty,
      total: value.total,
      correct: value.correct,
      accuracy: Math.round((value.correct / value.total) * 100),
      errors: value.total - value.correct,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.errors - a.errors)
    .slice(0, limit);
}
