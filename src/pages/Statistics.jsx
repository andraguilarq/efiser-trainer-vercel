import { useEffect, useMemo, useState } from "react";
import { getOverallAccuracy, getWeaknesses, loadProgress, resetProgress } from "../data/progress";
import { isSupabaseConfigured } from "../data/supabase";
import { loadRemoteProgress } from "../data/remoteResults";

function percentage(value) {
  return value.total ? Math.round((value.correct / value.total) * 100) : 0;
}

export default function Statistics({ userId, displayName, readOnly = false }) {
  const [progress, setProgress] = useState(loadProgress());
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState("");
  const [selectedExamId, setSelectedExamId] = useState(null);
  const accuracy = getOverallAccuracy(progress);
  const weaknesses = getWeaknesses(progress);
  const specialties = Object.entries(progress.bySpecialty || {}).sort((a, b) => a[0].localeCompare(b[0]));
  const difficulties = Object.entries(progress.byDifficulty || {}).sort((a, b) => a[0].localeCompare(b[0]));
  const selectedExam = useMemo(
    () => progress.history?.find((exam) => exam.id === selectedExamId) || null,
    [progress.history, selectedExamId],
  );

  useEffect(() => {
    let active = true;
    if (!isSupabaseConfigured) {
      setProgress(loadProgress());
      setLoading(false);
      return () => { active = false; };
    }

    setLoading(true);
    setError("");
    loadRemoteProgress(userId)
      .then((next) => {
        if (!active) return;
        setProgress(next);
        setSelectedExamId(next.history?.[0]?.id || null);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message || "No fue posible cargar las estadísticas.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [userId]);

  function clearProgress() {
    if (!confirm("¿Seguro que quieres borrar tus estadísticas locales?")) return;
    resetProgress();
    setProgress(loadProgress());
  }

  const headline = readOnly ? `Resultados de ${displayName || "usuario"}` : "Estadísticas";
  const subtitle = readOnly ? "Vista privada de administradora" : "Tu rendimiento personal";

  return (
    <section className="exam-shell">
      <div className="exam-header">
        <div><p className="eyebrow">{subtitle}</p><h1>{headline}</h1></div>
        {!readOnly && !isSupabaseConfigured && <button onClick={clearProgress}>Borrar estadísticas</button>}
      </div>
      {loading && <p>Cargando estadísticas…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && <>
        <div className="results-grid">
          <div className="result-card"><span>Exámenes</span><strong>{progress.examsCompleted}</strong></div>
          <div className="result-card"><span>Preguntas</span><strong>{progress.questionsAnswered}</strong></div>
          <div className="result-card"><span>Aciertos</span><strong>{progress.correctAnswers}</strong></div>
          <div className="result-card"><span>Errores</span><strong>{Math.max(0, progress.questionsAnswered - progress.correctAnswers)}</strong></div>
          <div className="result-card"><span>Acierto global</span><strong>{accuracy}%</strong></div>
          <div className="result-card"><span>Mejor calificación</span><strong>{progress.bestGrade || 0}/10</strong></div>
        </div>

        <div className="card exam-card weakness-card">
          <p className="eyebrow">Áreas para reforzar</p>
          <h2>Temas con menor rendimiento</h2>
          {weaknesses.length ? <div className="weakness-grid">{weaknesses.map((item, index) => (
            <div className="weakness-item" key={item.specialty}><b>{index + 1}. {item.specialty}</b><span>{item.accuracy}% de aciertos · {item.errors} errores</span></div>
          ))}</div> : <p>Completa el primer examen para obtener recomendaciones.</p>}
        </div>

        <div className="card exam-card">
          <h2>Rendimiento por especialidad</h2>
          {specialties.length ? <div className="specialty-list">{specialties.map(([name, value]) => <div className="specialty-row" key={name}><span>{name}</span><div className="mini-bar"><div style={{ width: `${percentage(value)}%` }} /></div><b>{percentage(value)}% ({value.correct}/{value.total})</b></div>)}</div> : <p>Aún no hay resultados guardados.</p>}
        </div>

        {difficulties.length > 0 && <div className="card exam-card">
          <h2>Rendimiento por dificultad</h2>
          <div className="specialty-list">{difficulties.map(([name, value]) => <div className="specialty-row" key={name}><span>{name}</span><div className="mini-bar"><div style={{ width: `${percentage(value)}%` }} /></div><b>{percentage(value)}% ({value.correct}/{value.total})</b></div>)}</div>
        </div>}

        <div className="card exam-card">
          <h2>Historial de exámenes</h2>
          {progress.history?.length ? <div>{progress.history.map((exam) => (
            <button className={["history-exam", selectedExamId === exam.id ? "active" : ""].filter(Boolean).join(" ")} key={exam.id || exam.date} onClick={() => setSelectedExamId(exam.id)}>
              <b>{new Date(exam.date).toLocaleString()} — {exam.grade}/10</b><span>{exam.score}/{exam.total} · {exam.percentage}%</span>
            </button>
          ))}</div> : <p>Sin exámenes registrados.</p>}

          {selectedExam && <div className="answer-detail">
            <h3>Detalle del examen seleccionado</h3>
            {(selectedExam.answers || []).map((answer, index) => (
              <article className={`answer-detail-item ${answer.is_correct || answer.correct ? "correct-answer" : "wrong-answer"}`} key={answer.id || `${answer.question_id || answer.caseId}-${index}`}>
                <b>{answer.is_correct || answer.correct ? "Correcta" : "Incorrecta"} · {answer.specialty}</b>
                {(answer.case_text || answer.caseText) && <p>{answer.case_text || answer.caseText}</p>}
                <p><b>{answer.question_text || answer.questionText || answer.title || "Pregunta del examen"}</b></p>
                <p><b>Respuesta elegida:</b> {answer.selected_answer || answer.selectedAnswer || "—"}<br /><b>Respuesta correcta:</b> {answer.correct_answer || answer.correctAnswerText || "—"}</p>
              </article>
            ))}
          </div>}
        </div>
      </>}
    </section>
  );
}
