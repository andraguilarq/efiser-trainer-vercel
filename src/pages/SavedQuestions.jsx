import { useMemo, useState } from "react";
import cases from "../data/cases";
import { loadStudyState, toggleSavedQuestion } from "../data/studyState";

export default function SavedQuestions({ onPractice }) {
  const [state, setState] = useState(loadStudyState);
  const [specialty, setSpecialty] = useState("Todas");
  const saved = useMemo(() => {
    const ids = new Set(state.savedQuestionIds.map(String));
    return cases.filter((item) => ids.has(String(item.id)) && (specialty === "Todas" || item.specialty === specialty));
  }, [specialty, state]);
  const specialties = ["Todas", ...new Set(cases.filter((item) => state.savedQuestionIds.map(String).includes(String(item.id))).map((item) => item.specialty))];
  return <section className="exam-shell"><div className="exam-header"><div><p className="eyebrow">Marcadores personales</p><h1>Preguntas guardadas</h1><p>Estas preguntas permanecen disponibles aunque cierres la aplicación.</p></div><button disabled={!saved.length} onClick={() => onPractice?.({ ids: saved.map((item) => item.id), label: "Preguntas guardadas" })}>Crear bloque ({saved.length})</button></div><label className="library-filter">Especialidad<select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>{specialties.map((item) => <option key={item}>{item}</option>)}</select></label><div className="saved-list">{saved.length ? saved.map((item) => <article className="card saved-question" key={item.id}><p className="eyebrow">{item.specialty} · nivel {item.difficulty}</p><p>{item.case}</p><h3>{item.question}</h3><div><button className="secondary-button" onClick={() => setState(toggleSavedQuestion(item.id))}>Quitar de guardadas</button><button onClick={() => onPractice?.({ ids: [item.id], label: "Pregunta guardada" })}>Practicar</button></div></article>) : <div className="card"><p>Aún no has guardado preguntas. Usa 🔖 mientras estudias.</p></div>}</div></section>;
}
