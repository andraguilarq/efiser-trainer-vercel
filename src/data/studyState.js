import { getActiveProfileId } from "./profiles";
import { isSupabaseConfigured, supabase } from "./supabase";

const STATE_PREFIX = "efiser-trainer-study-state";
let authenticatedOwnerId = "";
let remoteSyncTimer = null;

function key() {
  return `${STATE_PREFIX}:${authenticatedOwnerId || getActiveProfileId() || "default"}`;
}

const emptyState = {
  savedQuestionIds: [],
  questionReview: {},
  reviewedResourceIds: [],
  favoritePearlIds: [],
  reviewedPearlIds: [],
  reports: [],
};

export function loadStudyState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(key()) || "{}");
    return { ...emptyState, ...parsed };
  } catch {
    return { ...emptyState };
  }
}

function save(next) {
  localStorage.setItem(key(), JSON.stringify(next));
  scheduleRemoteStudyStateSync(next);
  return next;
}

function mergeStates(localState, remoteState) {
  const local = { ...emptyState, ...localState };
  const remote = { ...emptyState, ...remoteState };
  const mergeIds = (left, right) => [...new Set([...(left || []), ...(right || [])].map(String))];
  const review = { ...remote.questionReview };

  Object.entries(local.questionReview || {}).forEach(([questionId, record]) => {
    const previous = review[questionId];
    if (!previous || new Date(record.lastReviewedAt || 0) > new Date(previous.lastReviewedAt || 0)) review[questionId] = record;
  });

  const reports = [...(remote.reports || []), ...(local.reports || [])]
    .filter((report, index, list) => list.findIndex((item) => item.id === report.id) === index)
    .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0));

  return {
    ...emptyState,
    savedQuestionIds: mergeIds(local.savedQuestionIds, remote.savedQuestionIds),
    reviewedResourceIds: mergeIds(local.reviewedResourceIds, remote.reviewedResourceIds),
    favoritePearlIds: mergeIds(local.favoritePearlIds, remote.favoritePearlIds),
    reviewedPearlIds: mergeIds(local.reviewedPearlIds, remote.reviewedPearlIds),
    questionReview: review,
    reports,
  };
}

function scheduleRemoteStudyStateSync(state) {
  if (!authenticatedOwnerId || !isSupabaseConfigured || !supabase) return;
  window.clearTimeout(remoteSyncTimer);
  remoteSyncTimer = window.setTimeout(() => {
    void supabase
      .from("user_study_state")
      .upsert({ user_id: authenticatedOwnerId, state, updated_at: new Date().toISOString() }, { onConflict: "user_id" })
      .then(({ error }) => { if (error) console.warn("No se pudo sincronizar el estado de estudio", error.message); });
  }, 400);
}

export function setStudyStateOwnerId(userId = "") {
  authenticatedOwnerId = String(userId || "");
}

export async function hydrateStudyStateFromRemote(userId) {
  setStudyStateOwnerId(userId);
  const local = loadStudyState();
  if (!authenticatedOwnerId || !isSupabaseConfigured || !supabase) return local;

  const { data, error } = await supabase
    .from("user_study_state")
    .select("state")
    .eq("user_id", authenticatedOwnerId)
    .maybeSingle();
  if (error) {
    console.warn("No se pudo recuperar el estado de estudio", error.message);
    return local;
  }
  const merged = mergeStates(local, data?.state);
  localStorage.setItem(key(), JSON.stringify(merged));
  scheduleRemoteStudyStateSync(merged);
  return merged;
}

export function syncStudyStateWhenOnline() {
  if (!authenticatedOwnerId) return;
  scheduleRemoteStudyStateSync(loadStudyState());
}

export function toggleSavedQuestion(questionId) {
  const state = loadStudyState();
  const id = String(questionId);
  const saved = new Set(state.savedQuestionIds.map(String));
  if (saved.has(id)) saved.delete(id);
  else saved.add(id);
  return save({ ...state, savedQuestionIds: [...saved] });
}

export function isQuestionSaved(questionId, state = loadStudyState()) {
  return state.savedQuestionIds.map(String).includes(String(questionId));
}

export function toggleResourceReviewed(resourceId) {
  const state = loadStudyState();
  const reviewed = new Set(state.reviewedResourceIds.map(String));
  const id = String(resourceId);
  if (reviewed.has(id)) reviewed.delete(id);
  else reviewed.add(id);
  return save({ ...state, reviewedResourceIds: [...reviewed] });
}

export function togglePearlState(pearlId, property) {
  const state = loadStudyState();
  const validProperty = property === "favorite" ? "favoritePearlIds" : "reviewedPearlIds";
  const values = new Set(state[validProperty].map(String));
  const id = String(pearlId);
  if (values.has(id)) values.delete(id);
  else values.add(id);
  return save({ ...state, [validProperty]: [...values] });
}

function addDays(days) {
  const next = new Date();
  next.setHours(8, 0, 0, 0);
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

// Un acierto no borra un error previo: aumenta el intervalo de forma gradual.
export function recordQuestionOutcomes(answers) {
  const state = loadStudyState();
  const review = { ...state.questionReview };
  answers.forEach((answer) => {
    const id = String(answer.caseId);
    const current = review[id] || { repetitions: 0, lapses: 0, intervalDays: 0, dueAt: addDays(0) };
    if (answer.correct) {
      const repetitions = current.repetitions + 1;
      const intervalDays = repetitions === 1 ? 2 : repetitions === 2 ? 7 : Math.min(45, Math.max(14, current.intervalDays * 2));
      review[id] = { ...current, repetitions, intervalDays, dueAt: addDays(intervalDays), lastResult: "correct", lastReviewedAt: new Date().toISOString() };
    } else {
      review[id] = { ...current, repetitions: 0, lapses: current.lapses + 1, intervalDays: 1, dueAt: addDays(1), lastResult: "incorrect", lastReviewedAt: new Date().toISOString() };
    }
  });
  return save({ ...state, questionReview: review });
}

export function getReviewTodayIds(cases, limit = 25) {
  const state = loadStudyState();
  const now = Date.now();
  const saved = new Set(state.savedQuestionIds.map(String));
  return cases
    .map((item) => ({ item, record: state.questionReview[String(item.id)] || null }))
    .filter(({ item, record }) => saved.has(String(item.id)) || (record && new Date(record.dueAt).getTime() <= now))
    .sort((left, right) => {
      const leftScore = (left.record?.lapses || 0) * 10 + (saved.has(String(left.item.id)) ? 4 : 0) - (left.record?.repetitions || 0);
      const rightScore = (right.record?.lapses || 0) * 10 + (saved.has(String(right.item.id)) ? 4 : 0) - (right.record?.repetitions || 0);
      return rightScore - leftScore || new Date(left.record?.dueAt || 0) - new Date(right.record?.dueAt || 0);
    })
    .slice(0, limit)
    .map(({ item }) => item.id);
}

export function createQuestionReport({ question, reason, comment, userName }) {
  const state = loadStudyState();
  const report = {
    id: `report-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    questionId: question.id,
    question: question.question,
    caseText: question.case,
    source: question.source || "Sin fuente registrada",
    reason,
    comment: String(comment || "").trim(),
    userName: userName || "Usuario",
    createdAt: new Date().toISOString(),
    status: "pendiente",
  };
  const next = save({ ...state, reports: [report, ...state.reports] });
  if (authenticatedOwnerId && isSupabaseConfigured && supabase) {
    void supabase.from("question_reports").upsert({
      id: report.id,
      user_id: authenticatedOwnerId,
      question_id: Number(question.id),
      question_text: report.question,
      case_text: report.caseText,
      source: report.source,
      reason: report.reason,
      comment: report.comment || null,
      status: report.status,
    }, { onConflict: "id" }).then(({ error }) => {
      if (error) console.warn("No se pudo sincronizar el reporte", error.message);
    });
  }
  return next;
}

export function updateLocalReportStatus(reportId, status) {
  const state = loadStudyState();
  const next = save({ ...state, reports: state.reports.map((report) => report.id === reportId ? { ...report, status } : report) });
  if (authenticatedOwnerId && isSupabaseConfigured && supabase) {
    void supabase.from("question_reports").update({ status }).eq("id", reportId).then(({ error }) => {
      if (error) console.warn("No se pudo actualizar el reporte", error.message);
    });
  }
  return next;
}

export async function loadAdminReports() {
  if (!isSupabaseConfigured || !supabase) return loadStudyState().reports || [];
  const { data, error } = await supabase
    .from("question_reports")
    .select("id, user_id, question_id, question_text, case_text, source, reason, comment, status, created_at, profiles!question_reports_user_id_fkey(display_name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map((report) => ({
    id: report.id,
    questionId: report.question_id,
    question: report.question_text,
    caseText: report.case_text,
    source: report.source,
    reason: report.reason,
    comment: report.comment,
    status: report.status,
    createdAt: report.created_at,
    userName: report.profiles?.display_name || "Usuario",
  }));
}
