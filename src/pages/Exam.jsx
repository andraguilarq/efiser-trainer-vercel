import { useMemo, useState } from "react";
import cases from "../data/cases";
import { saveExamResult } from "../data/progress";

export default function Exam() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);

  const question = cases[current];

  const score = useMemo(
    () => answers.filter((answer) => answer.correct).length,
    [answers],
  );

  const percentage = cases.length ? Math.round((score / cases.length) * 100) : 0;
  const grade = (percentage / 10).toFixed(1);

  function checkAnswer() {
    if (selected === null) {
      alert("Selecciona una respuesta");
      return;
    }

    const correct = selected === question.answer;
    const updatedAnswers = [
      ...answers,
      {
        caseId: question.id,
        title: question.title,
        specialty: question.specialty,
        selected,
        correct,
        correctAnswer: question.answer,
      },
    ];

    setAnswers(updatedAnswers);
    setShowFeedback(true);
  }

  function nextQuestion() {
    if (current + 1 >= cases.length) {
      if (!saved) {
        saveExamResult({
          answers,
          grade,
          percentage,
          score,
          total: cases.length,
        });
        setSaved(true);
      }
      setCompleted(true);
      return;
    }

    setCurrent(current + 1);
    setSelected(null);
    setShowFeedback(false);
  }

  function restartExam() {
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    setCompleted(false);
    setSaved(false);
  }

  if (completed) {
    const missed = answers.filter((answer) => !answer.correct);

    return (
      <section className="exam-shell">
        <div className="exam-header">
          <div>
            <p className="eyebrow">Resultado</p>
            <h1>Examen terminado</h1>
          </div>
          <button onClick={restartExam}>Reiniciar examen</button>
        </div>

        <div className="results-grid">
          <div className="result-card">
            <span>Calificación</span>
            <strong>{grade}/10</strong>
          </div>
          <div className="result-card">
            <span>Aciertos</span>
            <strong>
              {score}/{cases.length}
            </strong>
          </div>
          <div className="result-card">
            <span>Porcentaje</span>
            <strong>{percentage}%</strong>
          </div>
        </div>

        <div className="card exam-card">
          <h2>Retroalimentación</h2>

          {missed.length === 0 ? (
            <p>Excelente. No fallaste ningún caso en este bloque.</p>
          ) : (
            <>
              <p>Temas a reforzar:</p>
              <ul className="review-list">
                {missed.map((answer) => (
                  <li key={answer.caseId}>
                    <b>{answer.specialty}:</b> {answer.title}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="card exam-card">
          <h2>Revisión rápida</h2>
          <ul className="review-list">
            {answers.map((answer, index) => (
              <li key={`${answer.caseId}-${index}`}>
                {answer.correct ? "✓" : "✗"} {answer.title} ({answer.specialty})
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="exam-shell">
      <div className="exam-header">
        <div>
          <p className="eyebrow">
            Caso {current + 1} de {cases.length}
          </p>
          <h1>{question.title}</h1>
        </div>
        <div className="score-pill">
          Aciertos: {score}/{answers.length}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((current + 1) / cases.length) * 100}%` }}
        />
      </div>

      <div className="card exam-card">
        <p className="case-text">{question.case}</p>

        <h3>{question.question}</h3>

        <div className="options-list">
          {question.options.map((option, index) => {
            const isCorrect = showFeedback && index === question.answer;
            const isWrong =
              showFeedback && selected === index && index !== question.answer;

            return (
              <label
                className={[
                  "option-row",
                  selected === index ? "selected" : "",
                  isCorrect ? "correct" : "",
                  isWrong ? "wrong" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={option}
              >
                <input
                  checked={selected === index}
                  disabled={showFeedback}
                  name="answer"
                  onChange={() => setSelected(index)}
                  type="radio"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>

        {!showFeedback ? (
          <button onClick={checkAnswer}>Calificar</button>
        ) : (
          <div className="feedback">
            <h2>
              {selected === question.answer ? "Correcto" : "Incorrecto"}
            </h2>
            <p>
              <b>Respuesta correcta:</b> {question.options[question.answer]}
            </p>
            <p>{question.explanation}</p>
            <button onClick={nextQuestion}>
              {current + 1 >= cases.length ? "Ver resultado" : "Siguiente caso"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
