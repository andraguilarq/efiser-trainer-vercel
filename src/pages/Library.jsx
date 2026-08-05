import { useMemo, useState } from "react";
import cases from "../data/cases";
import coreChapters from "../data/libraryChapters";
import neuroChapters from "../data/libraryChaptersNeuro";
import medicineChapters from "../data/libraryChaptersMedicine";
import researchChapters from "../data/libraryChaptersResearch";
import researchFlashcards from "../data/researchFlashcards";
import { loadReadChapters, setChapterRead } from "../data/libraryProgress";

const chapters = [...coreChapters, ...neuroChapters, ...medicineChapters, ...researchChapters];

function buildFlashcards(items) {
  return items.map((item) => ({
    id: item.id,
    specialty: item.specialty || "Sin clasificar",
    front: item.question,
    back: item.options[item.answer],
    explanation: item.explanation,
    title: item.title,
  }));
}

export default function Library() {
  const [view, setView] = useState("flashcards");
  const [specialty, setSpecialty] = useState("Todas");
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]?.id);
  const [readChapterIds, setReadChapterIds] = useState(loadReadChapters);

  const specialties = useMemo(
    () => ["Todas", ...new Set(cases.map((item) => item.specialty || "Sin clasificar"))],
    [],
  );
  const flashcards = useMemo(() => {
    const cards = [...buildFlashcards(cases), ...researchFlashcards].filter(
      (card) => specialty === "Todas" || card.specialty === specialty,
    );
    return cards.sort(() => Math.random() - 0.5);
  }, [specialty]);
  const bySpecialty = cases.reduce((acc, item) => {
    const key = item.specialty || "Sin clasificar";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
  const card = flashcards[current % Math.max(flashcards.length, 1)];
  const chapter = chapters.find((item) => item.id === selectedChapter) || chapters[0];
  const chapterIsRead = chapter ? readChapterIds.includes(String(chapter.id)) : false;

  function toggleChapterRead() {
    if (!chapter) return;
    setReadChapterIds(setChapterRead(chapter.id, !chapterIsRead));
  }

  function nextCard() {
    setCurrent((value) => (value + 1) % flashcards.length);
    setFlipped(false);
  }

  function changeSpecialty(event) {
    setSpecialty(event.target.value);
    setCurrent(0);
    setFlipped(false);
  }

  return (
    <section className="exam-shell">
      <div className="exam-header">
        <div>
          <p className="eyebrow">Banco de estudio</p>
          <h1>Biblioteca</h1>
          <p>{chapters.length} capítulos, {cases.length} casos y {cases.length + researchFlashcards.length} flashcards disponibles.</p>
        </div>
        <div className="view-switch">
          <button className={view === "flashcards" ? "" : "secondary-button"} onClick={() => setView("flashcards")}>Flashcards</button>
          <button className={view === "cases" ? "" : "secondary-button"} onClick={() => setView("cases")}>Casos</button>
          <button className={view === "chapters" ? "" : "secondary-button"} onClick={() => setView("chapters")}>Capítulos EFISER</button>
        </div>
      </div>

      {view === "flashcards" ? (
        <>
          <label className="library-filter">
            Especialidad
            <select onChange={changeSpecialty} value={specialty}>
              {specialties.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          {card && (
            <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped((value) => !value)}>
              <p className="eyebrow">{card.specialty} · {current + 1} de {flashcards.length}</p>
              <h2>{flipped ? card.back : card.front}</h2>
              {flipped && <p>{card.explanation}</p>}
              <span>{flipped ? "Haz clic para ver la pregunta" : "Haz clic para revelar la respuesta"}</span>
            </div>
          )}
          <div className="flashcard-actions">
            <button className="secondary-button" onClick={() => setFlipped((value) => !value)}>Voltear</button>
            <button onClick={nextCard}>Siguiente tarjeta</button>
          </div>
        </>
      ) : view === "cases" ? (
        <div className="library-grid">
          {Object.entries(bySpecialty).map(([name, items]) => (
            <div className="card library-card" key={name}>
              <h2>{name}</h2><p>{items.length} casos</p>
              <ul className="review-list">{items.slice(0, 6).map((item) => <li key={item.id}>{item.title}</li>)}</ul>
            </div>
          ))}
        </div>
      ) : (
        <>
        <div className="reading-summary">
          <div>
            <strong>{readChapterIds.length} de {chapters.length} resúmenes leídos</strong>
            <span>El avance corresponde únicamente a tu perfil.</span>
          </div>
          <div className="mini-bar"><div style={{ width: `${chapters.length ? Math.min(100, (readChapterIds.length / chapters.length) * 100) : 0}%` }} /></div>
        </div>
        <div className="chapter-layout">
          <nav className="chapter-list" aria-label="Capítulos EFISER">
            {chapters.map((item) => (
              <button
                key={item.id}
                className={item.id === chapter.id ? "chapter-link active" : "chapter-link"}
                onClick={() => setSelectedChapter(item.id)}
              >
                <strong>{item.title}</strong>
                <span>{readChapterIds.includes(String(item.id)) ? "✓ Leído" : item.specialty}</span>
              </button>
            ))}
          </nav>
          <article className="chapter-detail">
            <p className="eyebrow">{chapter.priority} · actualización {chapter.updated}</p>
            <div className="chapter-title-row">
              <h2>{chapter.title}</h2>
              <button className={chapterIsRead ? "read-button complete" : "read-button"} onClick={toggleChapterRead}>
                {chapterIsRead ? "✓ Leído" : "Marcar como leído"}
              </button>
            </div>
            <p className="chapter-trigger"><strong>Origen EFISER:</strong> {chapter.trigger}</p>
            {chapter.sections.map((section) => (
              <section className="chapter-section" key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </section>
            ))}
            {chapter.refs?.length > 0 && (
              <section className="chapter-section">
                <h3>Fuentes vigentes consultadas</h3>
                <ul className="source-list">
                  {chapter.refs.map((ref) => <li key={ref}><a href={ref} target="_blank" rel="noreferrer">{ref}</a></li>)}
                </ul>
              </section>
            )}
          </article>
        </div>
        </>
      )}
    </section>
  );
}
