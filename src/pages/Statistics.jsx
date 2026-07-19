import { useState } from "react";
import { getOverallAccuracy, loadProgress, resetProgress } from "../data/progress";

export default function Statistics() {
  const [progress, setProgress] = useState(loadProgress());
  const accuracy = getOverallAccuracy(progress);
  const specialties = Object.entries(progress.bySpecialty || {}).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );

  function clearProgress() {
    if (!confirm("¿Seguro que quieres borrar tus estadísticas?")) return;
    resetProgress();
    setProgress(loadProgress());
  }

  return (
    <section className="exam-shell">
      <div className="exam-header">
        <div>
          <p className="eyebrow">Progreso</p>
          <h1>Estadísticas</h1>
        </div>
        <button onClick={clearProgress}>Borrar estadísticas</button>
      </div>

      <div className="results-grid">
        <div className="result-card">
          <span>Exámenes</span>
          <strong>{progress.examsCompleted}</strong>
        </div>
        <div className="result-card">
          <span>Preguntas</span>
          <strong>{progress.questionsAnswered}</strong>
        </div>
        <div className="result-card">
          <span>Acierto global</span>
          <strong>{accuracy}%</strong>
        </div>
      </div>

      <div className="card exam-card">
        <h2>Rendimiento por especialidad</h2>
        {specialties.length ? (
          <div className="specialty-list">
            {specialties.map(([specialty, value]) => {
              const pct = value.total
                ? Math.round((value.correct / value.total) * 100)
                : 0;

              return (
                <div className="specialty-row" key={specialty}>
                  <span>{specialty}</span>
                  <div className="mini-bar">
                    <div style={{ width: `${pct}%` }} />
                  </div>
                  <b>
                    {pct}% ({value.correct}/{value.total})
                  </b>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Aún no hay resultados guardados.</p>
        )}
      </div>

      <div className="card exam-card">
        <h2>Historial reciente</h2>
        {progress.history?.length ? (
          <ul className="review-list">
            {progress.history.map((exam, index) => (
              <li key={`${exam.date}-${index}`}>
                {new Date(exam.date).toLocaleString()} - {exam.grade}/10 (
                {exam.score}/{exam.total})
              </li>
            ))}
          </ul>
        ) : (
          <p>Sin exámenes registrados.</p>
        )}
      </div>
    </section>
  );
}
