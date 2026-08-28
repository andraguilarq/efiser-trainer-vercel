import { useMemo, useState } from "react";
import { pearls } from "../data/studyResources";
import { loadStudyState, togglePearlState } from "../data/studyState";

export default function Pearls({ onPractice, onReview }) {
  const [state, setState] = useState(loadStudyState);
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("Todas");
  const filtered = useMemo(() => pearls.filter((pearl) => (specialty === "Todas" || pearl.specialty === specialty) && `${pearl.topic} ${pearl.text}`.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es"))), [query, specialty]);
  const specialties = ["Todas", ...new Set(pearls.map((pearl) => pearl.specialty))];
  return <section className="exam-shell"><div className="page-header"><p className="eyebrow">Alta rentabilidad</p><h1>Perlas</h1></div><div className="exam-filters"><label><span>Especialidad</span><select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>{specialties.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Buscar</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tema o palabra clave" /></label></div><div className="pearl-grid">{filtered.map((pearl) => { const favorite = state.favoritePearlIds.map(String).includes(String(pearl.id)); const reviewed = state.reviewedPearlIds.map(String).includes(String(pearl.id)); return <article className="card pearl-card" key={pearl.id}><p className="eyebrow">{pearl.specialty} · {pearl.topic}</p><p>{pearl.text}</p><div><button className={favorite ? "read-button complete" : "secondary-button"} onClick={() => setState(togglePearlState(pearl.id, "favorite"))}>{favorite ? "★ Favorita" : "☆ Favorita"}</button><button className={reviewed ? "read-button complete" : "secondary-button"} onClick={() => setState(togglePearlState(pearl.id, "reviewed"))}>{reviewed ? "✓ Repasada" : "Marcar repasada"}</button><button onClick={() => onReview?.({ specialty: pearl.specialty, topic: pearl.topic })}>Repasar tema</button><button onClick={() => onPractice?.({ specialty: pearl.specialty, topic: pearl.topic })}>Practicar tema</button></div></article>; })}</div></section>;
}
