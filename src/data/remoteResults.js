import { supabase } from "./supabase";

const EMPTY_PROGRESS = {
  examsCompleted: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  bestGrade: 0,
  history: [],
  bySpecialty: {},
  byDifficulty: {},
  missedIds: {},
};

function toProgress(exams = []) {
  const progress = { ...EMPTY_PROGRESS, history: [], bySpecialty: {}, byDifficulty: {}, missedIds: {} };

  exams.forEach((exam) => {
    const answers = Array.isArray(exam.exam_answers) ? exam.exam_answers : [];
    progress.examsCompleted += 1;
    progress.questionsAnswered += Number(exam.total || answers.length || 0);
    progress.correctAnswers += Number(exam.score || 0);
    progress.bestGrade = Math.max(progress.bestGrade, Number(exam.grade || 0));

    answers.forEach((answer) => {
      const specialty = answer.specialty || "Sin clasificar";
      const specialtyValue = progress.bySpecialty[specialty] || { total: 0, correct: 0 };
      specialtyValue.total += 1;
      specialtyValue.correct += answer.is_correct ? 1 : 0;
      progress.bySpecialty[specialty] = specialtyValue;

      const difficulty = `Nivel ${answer.difficulty || "sin clasificar"}`;
      const difficultyValue = progress.byDifficulty[difficulty] || { total: 0, correct: 0 };
      difficultyValue.total += 1;
      difficultyValue.correct += answer.is_correct ? 1 : 0;
      progress.byDifficulty[difficulty] = difficultyValue;

      if (!answer.is_correct && answer.question_id !== null) {
        progress.missedIds[answer.question_id] = (progress.missedIds[answer.question_id] || 0) + 1;
      }
    });

    progress.history.push({
      id: exam.id,
      date: exam.created_at,
      score: exam.score,
      total: exam.total,
      percentage: Number(exam.percentage),
      grade: Number(exam.grade),
      estimatedSeconds: Number(exam.filters?.estimatedSeconds || 0) || null,
      usedSeconds: Number(exam.filters?.usedSeconds || 0) || null,
      secondsPerQuestion: Number(exam.filters?.secondsPerQuestion || 0) || null,
      timedOut: Boolean(exam.filters?.timedOut),
      answers,
      missed: answers.filter((answer) => !answer.is_correct).map((answer) => ({
        caseId: answer.question_id,
        title: answer.title,
        specialty: answer.specialty,
      })),
    });
  });

  progress.history.sort((a, b) => new Date(b.date) - new Date(a.date));
  return progress;
}

export async function loadRemoteProgress(userId) {
  const { data, error } = await supabase
    .from("exam_results")
    .select("id, user_id, created_at, score, total, percentage, grade, filters, exam_answers(id, question_id, title, case_text, question_text, specialty, difficulty, selected_answer, correct_answer, is_correct, selected_index, correct_index)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return toProgress(data || []);
}

export async function saveRemoteExamResult(result, filters = {}) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  const user = userData.user;
  if (!user) throw new Error("Tu sesión expiró. Vuelve a iniciar sesión.");

  const { data: exam, error: examError } = await supabase
    .from("exam_results")
    .insert({
      user_id: user.id,
      score: result.score,
      total: result.total,
      percentage: result.percentage,
      grade: result.grade,
      filters,
    })
    .select("id")
    .single();
  if (examError) throw examError;

  const rows = result.answers.map((answer) => ({
    exam_id: exam.id,
    user_id: user.id,
    question_id: Number(answer.caseId),
    title: answer.title,
    case_text: answer.caseText || null,
    question_text: answer.questionText || null,
    specialty: answer.specialty || "Sin clasificar",
    difficulty: Number(answer.difficulty) || null,
    selected_answer: answer.selectedAnswer || null,
    correct_answer: answer.correctAnswerText || null,
    is_correct: Boolean(answer.correct),
    selected_index: Number.isInteger(answer.selected) ? answer.selected : null,
    correct_index: Number.isInteger(answer.correctAnswer) ? answer.correctAnswer : null,
  }));

  if (rows.length) {
    const { error: answerError } = await supabase.from("exam_answers").insert(rows);
    if (answerError) throw answerError;
  }
  return exam;
}

export async function getAdminUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, role, created_at, last_active_at")
    .order("last_active_at", { ascending: false, nullsFirst: false });
  if (error) throw error;
  return data || [];
}
