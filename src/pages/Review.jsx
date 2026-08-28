import { useMemo, useState } from "react";
import cases from "../data/cases";
import { studyResources } from "../data/studyResources";
import { getReviewTodayIds, loadStudyState, toggleResourceReviewed } from "../data/studyState";

export default function Review({ onPractice, initialFilter }) {
  const [specialty, setSpecialty] = useState(initialFilter?.specialty || "Todas");
  const [query, setQuery] = useState(initialFilter?.topic || "");
  const [state, setState] = useState(loadStudyState);
  const resources = useMemo(() => studyResources.filter((resource) => (
    (specialty === "Todas" || resource.specialty === specialty)
    && `${resource.title} ${resource.topic} ${resource.tags.join(" ")}`.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es"))
  )), [query, specialty]);
  const specialties = ["Todas", ...new Set(studyResources.map((resource) => resource.specialty))];
  const dueIds = getReviewTodayIds(cases);

  return <section className="exam-shell">
    <div className="exam-header"><div><p className="eyebrow">Estudio activo</p><h1>Repaso</h1><p>Recursos breves, algoritmos y preguntas que conviene recuperar hoy.</p></div></div>
    <div className="card exam-card review-today-card"><div><p className="eyebrow">Para repasar hoy</p><h2>{dueIds.length} preguntas priorizadas</h2><p>Incluye errores previos y preguntas guardadas; un acierto vuelve a programarlas con un intervalo mayor.</p></div><button disabled={!dueIds.length} onClick={() => onPractice?.({ ids: dueIds, label: "Para repasar hoy" })}>Practicar ahora</button></div>
    <div className="exam-filters"><label><span>Especialidad</span><select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>{specialties.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Buscar</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tema o palabra clave" /></label></div>
    <div className="resource-grid">{resources.map((resource) => {
      const reviewed = state.reviewedResourceIds.map(String).includes(String(resource.id));
      return <article className="card resource-card" key={resource.id}><p className="eyebrow">{resource.specialty} · {resource.type}</p><h2>{resource.title}</h2><p>{resource.summary}</p><ol className="resource-steps">{resource.steps.map((step) => <li key={step}>{step}</li>)}</ol><div className="table-wrap"><table><thead><tr>{resource.table[0].map((cell) => <th key={cell}>{cell}</th>)}</tr></thead><tbody>{resource.table.slice(1).map((row) => <tr key={row.join("|")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><div className="resource-actions"><button className={reviewed ? "read-button complete" : "secondary-button"} onClick={() => setState(toggleResourceReviewed(resource.id))}>{reviewed ? "✓ Repasado" : "Marcar como repasado"}</button><button onClick={() => onPractice?.({ specialty: resource.specialty, topic: resource.topic, label: resource.title })}>Practicar este tema</button></div></article>;
    })}</div>
  </section>;
}
