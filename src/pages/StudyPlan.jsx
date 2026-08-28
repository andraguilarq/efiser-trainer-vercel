import { useMemo } from "react";
import cases from "../data/cases";
import { loadProgress } from "../data/progress";
import { getReviewTodayIds, loadStudyState } from "../data/studyState";

function statusFor(total, accuracy) {
  if (total < 5) return { label: "Sin datos suficientes", tone: "neutral" };
  if (accuracy < 65) return { label: "🔴 Débil", tone: "red" };
  if (accuracy < 80) return { label: "🟡 En progreso", tone: "yellow" };
  return { label: "🟢 Sólido", tone: "green" };
}

export default function StudyPlan({ onPractice, onReview }) {
  const progress = loadProgress();
  const state = loadStudyState();
  const byTopic = Object.values(progress.byTopic || {});
  const availableByTopic = useMemo(() => {
    const map = new Map();
    cases.forEach((item) => {
      const topic = item.topic || item.subtopic || item.sourceConcept || item.tags?.[0] || "General";
      const key = `${item.specialty}::${topic}`;
      map.set(key, { specialty: item.specialty, topic, count: (map.get(key)?.count || 0) + 1 });
    });
    return [...map.values()];
  }, []);
  const rows = availableByTopic.map((entry) => {
    const record = byTopic.find((item) => item.specialty === entry.specialty && item.topic === entry.topic) || { total: 0, correct: 0 };
    const accuracy = record.total ? Math.round((record.correct / record.total) * 100) : 0;
    const status = statusFor(record.total, accuracy);
    const due = getReviewTodayIds(cases, 100).filter((id) => String(id) && cases.find((item) => String(item.id) === String(id) && item.specialty === entry.specialty && (item.topic || item.subtopic || item.sourceConcept || item.tags?.[0] || "General") === entry.topic)).length;
    const priority = record.total < 5 ? 1 : (100 - accuracy) + Math.min(20, due * 4) + Math.min(15, Math.max(0, 10 - record.total));
    return { ...entry, ...record, accuracy, status, due, priority };
  }).sort((a, b) => b.priority - a.priority).slice(0, 12);
  const reviewedResources = state.reviewedResourceIds.length;
  return <section className="exam-shell"><div className="page-header"><p className="eyebrow">Recomendación personalizada</p><h1>¿Qué debo estudiar?</h1><p>La prioridad combina rendimiento, cantidad respondida y preguntas programadas para repaso.</p></div><div className="results-grid"><div className="result-card"><span>Preguntas de hoy</span><strong>{getReviewTodayIds(cases).length}</strong></div><div className="result-card"><span>Recursos repasados</span><strong>{reviewedResources}</strong></div><div className="result-card"><span>Temas con datos</span><strong>{byTopic.length}</strong></div></div><div className="card exam-card"><h2>Prioridades de estudio</h2><div className="study-plan-list">{rows.map((row) => <article className={`study-plan-row ${row.status.tone}`} key={`${row.specialty}-${row.topic}`}><div><b>{row.topic}</b><span>{row.specialty} · cobertura: {row.total} preguntas respondidas de {row.count} disponibles · rendimiento: {row.total ? `${row.accuracy}%` : "—"}</span></div><em>{row.status.label}</em><div><button className="secondary-button" onClick={() => onReview?.({ specialty: row.specialty, topic: row.topic })}>Repasar</button><button onClick={() => onPractice?.({ specialty: row.specialty, topic: row.topic })}>Practicar</button></div></article>)}</div></div></section>;
}
