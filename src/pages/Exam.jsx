import { useMemo, useState } from "react";
import cases from "../data/cases";
import { getWeaknesses, loadProgress, saveExamResult } from "../data/progress";

const QUICK_SIZES = [10, 20, 50, 100];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export default function Exam() {
  const [examCases, setExamCases] = useState([]);
  const [requestedSize, setRequestedSize] = useState(Math.min(20, cases.length));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const question = examCases[current];
  const total = examCases.length;
  const score = useMemo(
    () => answers.filter((answer) => answer.correct).length,
    [answers],
  );
  const percentage = total ? Math.round((score / total) * 100) : 0;
  const grade = (percentage / 10).toFixed(1);

  function startExam(size) {
    const safeSize = Math.max(1, Math.min(Number(size) || 1, cases.length));
    setExamCases(shuffle(cases).slice(0, safeSize));
    setRequestedSize(safeSize);
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    setCompleted(false);
    setSaved(false);
  }

  function startAdaptiveExam(size = requestedSize) {
    const safeSize = Math.max(1, Math.min(Number(size) || 10, cases.length));
    const progress = loadProgress();
    const weakSpecialties = new Set(getWeaknesses(progress, 3).map((item) => item.specialty));
    const missedIds = new Set(Object.keys(progress.missedIds || {}).map(Number));
    const priority = shuffle(cases.filter((item) => missedIds.has(Number(item.id)) || weakSpecialties.has(item.specialty)));
    const priorityIds = new Set(priority.map((item) => item.id));
    const remaining = shuffle(cases.filter((item) => !priorityIds.has(item.id)));
    const priorityCount = Math.min(priority.length, Math.ceil(safeSize * 0.7));
    setExamCases(shuffle([...priority.slice(0, priorityCount), ...remaining.slice(0, safeSize - priorityCount)]));
    setRequestedSize(safeSize);
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    setCompleted(false);
    setSaved(false);
  }

  function checkAnswer() {
    if (selected === null) {
      alert("Selecciona una respuesta");
      return;
    }
    const correct = selected === question.answer;
    setAnswers((previous) => [
      ...previous,
      {
        caseId: question.id,
        title: question.title,
        specialty: question.specialty,
        selected,
        correct,
        correctAnswer: question.answer,
      },
    ]);
    setShowFeedback(true);
  }

  function nextQuestion() {
    if (current + 1 >= total) {
      if (!saved) {
        saveExamResult({ answers, grade, percentage, score, total });
        setSaved(true);
      }
      setCompleted(true);
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
    setShowFeedback(false);
  }

  function returnToSetup() {
    setExamCases([]);
    setCompleted(false);
  }

  if (!total) {
    return (
      <section className="exam-shell setup-shell">
        <div className="page-header">
          <p className="eyebrow">Nuevo simulador</p>
          <h1>¿Cuántas preguntas quieres responder?</h1>
          <p>Se elegirán al azar y no se repetirán dentro del examen.</p>
        </div>

        <div className="card exam-card setup-card">
          <div className="quick-size-grid">
            {QUICK_SIZES.filter((size) => size <= cases.length).map((size) => (
              <button key={size} onClick={() => startExam(size)}>
                {size} preguntas
              </button>
            ))}
            <button className="secondary-button" onClick={() => startExam(cases.length)}>
              Todo el banco ({cases.length})
            </button>
            <button className="adaptive-button" onClick={() => startAdaptiveExam(requestedSize)}>
              Repaso inteligente ({requestedSize})
            </button>
          </div>

          <label className="custom-size">
            <span>Cantidad personalizada (1–{cases.length})</span>
            <div>
              <input
                max={cases.length}
                min="1"
                onChange={(event) => setRequestedSize(event.target.value)}
                type="number"
                value={requestedSize}
              />
              <button onClick={() => startExam(requestedSize)}>Comenzar</button>
            </div>
          </label>
          <p className="setup-note">Banco disponible: {cases.length} casos clínicos.</p>
        </div>
      </section>
    );
  }

  if (completed) {
    const missed = answers.filter((answer) => !answer.correct);
    return (
      <section className="exam-shell">
        <div className="exam-header">
          <div><p className="eyebrow">Resultado</p><h1>Examen terminado</h1></div>
          <button onClick={returnToSetup}>Elegir otro bloque</button>
        </div>
        <div className="results-grid">
          <div className="result-card"><span>Calificación</span><strong>{grade}/10</strong></div>
          <div className="result-card"><span>Aciertos</span><strong>{score}/{total}</strong></div>
          <div className="result-card"><span>Porcentaje</span><strong>{percentage}%</strong></div>
        </div>
        <div className="card exam-card">
          <h2>Retroalimentación</h2>
          {missed.length === 0 ? <p>Excelente. No fallaste ningún caso en este bloque.</p> : (
            <><p>Temas a reforzar:</p><ul className="review-list">
              {missed.map((answer) => <li key={answer.caseId}><b>{answer.specialty}:</b> {answer.title}</li>)}
            </ul></>
          )}
        </div>
        <div className="card exam-card"><h2>Revisión rápida</h2><ul className="review-list">
          {answers.map((answer, index) => <li key={`${answer.caseId}-${index}`}>{answer.correct ? "✓" : "✕"} {answer.title} ({answer.specialty})</li>)}
        </ul></div>
      </section>
    );
  }

  return (
    <section className="exam-shell">
      <div className="exam-header">
        <div><p className="eyebrow">Caso {current + 1} de {total}</p><h1>Caso clínico</h1></div>
        <div className="score-pill">Aciertos: {score}/{answers.length}</div>
      </div>
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
      <div className="card exam-card">
        <p className="case-text">{question.case}</p>
        <h3>{question.question}</h3>
        <div className="options-list">
          {question.options.map((option, index) => {
            const isCorrect = showFeedback && index === question.answer;
            const isWrong = showFeedback && selected === index && index !== question.answer;
            return (
              <label className={["option-row", selected === index ? "selected" : "", isCorrect ? "correct" : "", isWrong ? "wrong" : ""].filter(Boolean).join(" ")} key={option}>
                <input checked={selected === index} disabled={showFeedback} name="answer" onChange={() => setSelected(index)} type="radio" />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        {!showFeedback ? <button onClick={checkAnswer}>Calificar</button> : (
          <div className="feedback">
            <h2>{selected === question.answer ? "Correcto" : "Incorrecto"}</h2>
            <p><b>Respuesta correcta:</b> {question.options[question.answer]}</p>
            <div className="feedback-explanation">
              {String(question.explanation || "")
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={`${question.id}-explanation-${index}`}>{paragraph}</p>
                ))}
            </div>
            {question.optionFeedback ? (
              <div className="option-feedback">
                <h3>{selected === question.answer ? "Por qué las otras no son la mejor elección" : "Por qué tu respuesta no era la mejor elección"}</h3>
                <ul className="review-list">
                  {(selected === question.answer
                    ? question.optionFeedback.filter((_, index) => index !== question.answer)
                    : [question.optionFeedback[selected]]
                  ).map((feedback, index) => (
                    <li key={`${question.id}-feedback-${index}`}>{feedback}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <button onClick={nextQuestion}>{current + 1 >= total ? "Ver resultado" : "Siguiente caso"}</button>
          </div>
        )}
      </div>
    </section>
  );
}
