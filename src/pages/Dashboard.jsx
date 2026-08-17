import cases from "../data/cases";
import { useEffect, useState } from "react";
import { getOverallAccuracy, loadProgress } from "../data/progress";
import { isSupabaseConfigured } from "../data/supabase";
import { loadRemoteProgress } from "../data/remoteResults";
import StatCard from "../components/StatCard";

export default function Dashboard({ profile }) {
  const [progress, setProgress] = useState(loadProgress());

  useEffect(() => {
    let active = true;
    if (!isSupabaseConfigured) {
      setProgress(loadProgress());
      return () => { active = false; };
    }
    loadRemoteProgress(profile.id)
      .then((next) => { if (active) setProgress(next); })
      .catch((error) => console.warn("No se pudo cargar el progreso remoto", error.message));
    return () => { active = false; };
  }, [profile.id]);
  const accuracy = getOverallAccuracy(progress);
  const latest = progress.history?.[0];

  return (
    <>
      <div className="page-header">
        <div>
          <p className="eyebrow">EFISER Trainer</p>
          <h1>Hola, {profile.name}</h1>
          <h3>Objetivo: derivación a Endocrinología</h3>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Casos disponibles" value={cases.length} />
        <StatCard title="Exámenes" value={progress.examsCompleted} />
        <StatCard title="Preguntas" value={progress.questionsAnswered} />
        <StatCard title="Aciertos" value={`${accuracy}%`} />
        <StatCard title="Mejor calificación" value={`${progress.bestGrade || 0}/10`} />
        <StatCard title="Meta" value="8.0" />
      </div>

      <div className="card wide-card">
        <h2>Último resultado</h2>
        {latest ? (
          <p>
            Calificación {latest.grade}/10 ({latest.score}/{latest.total}).{" "}
            {latest.missed.length
              ? `Reforzar: ${latest.missed
                  .slice(0, 3)
                  .map((item) => item.title)
                  .join(", ")}.`
              : "Sin errores en el último bloque."}
          </p>
        ) : (
          <p>Haz tu primer examen para empezar a guardar estadísticas.</p>
        )}
      </div>
    </>
  );
}
