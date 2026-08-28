import { useEffect, useMemo, useRef, useState } from "react";
import cases from "../data/cases";
import { getWeaknesses, loadProgress, saveExamResult } from "../data/progress";
import { getRecentCaseIds, getSpecialties, isBankCase, rememberCaseIds, selectExamCases } from "../data/examSelection";
import { isSupabaseConfigured } from "../data/supabase";
import { saveRemoteExamResult } from "../data/remoteResults";
import { estimateExamSeconds, formatEstimatedTime, formatExamDuration, SECONDS_PER_QUESTION } from "../data/examTiming";

const QUICK_SIZES = [10, 20, 50, 100];

function cleanFeedbackText(value) {
  return String(value || "")
    .replace(/Fuente principal:[^\n]*/gi, "")
    .replace(/Error frecuente:\s*Elegir una opción plausible por un dato aislado sin integrar el patrón clínico completo\.?/gi, "")
    .replace(/Incorrecta\.\s*No integra el dato discriminador del caso:?\s*/gi, "")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .trim();
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function shuffleCaseOptions(item) {
  const entries = item.options.map((option, index) => ({
    option,
    feedback: Array.isArray(item.optionFeedback) ? item.optionFeedback[index] : null,
    correct: index === item.answer,
  }));
  const shuffledEntries = shuffle(entries);

  return {
    ...item,
    options: shuffledEntries.map((entry) => entry.option),
    answer: shuffledEntries.findIndex((entry) => entry.correct),
    optionFeedback: Array.isArray(item.optionFeedback)
      ? shuffledEntries.map((entry) => entry.feedback)
      : null,
  };
}

export default function Exam({ bankOnly = false }) {
  const [examCases, setExamCases] = useState([]);
  const [requestedSize, setRequestedSize] = useState(Math.min(20, cases.length));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [specialtyFilter, setSpecialtyFilter] = useState("Todas");
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [startedAt, setStartedAt] = useState(null);
  const [estimatedSeconds, setEstimatedSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [finishedUsedSeconds, setFinishedUsedSeconds] = useState(null);
  const timeExpiredRef = useRef(false);

  const modeCases = useMemo(() => (bankOnly ? cases.filter(isBankCase) : cases), [bankOnly]);
  const specialties = useMemo(() => getSpecialties(modeCases), [modeCases]);
  const eligibleCases = useMemo(() => modeCases.filter((item) => (
    (specialtyFilter === "Todas" || item.specialty === specialtyFilter)
    && (difficultyFilter === "Todas" || Number(item.difficulty) === Number(difficultyFilter))
  )), [difficultyFilter, modeCases, specialtyFilter]);

  const question = examCases[current];
  const total = examCases.length;
  const score = useMemo(
    () => answers.filter((answer) => answer.correct).length,
    [answers],
  );
  const percentage = total ? Math.round((score / total) * 100) : 0;
  const grade = (percentage / 10).toFixed(1);
  const setupEstimatedSeconds = estimateExamSeconds(Math.max(1, Math.min(Number(requestedSize) || 1, eligibleCases.length || 1)));

  function beginTimer(size) {
    const duration = estimateExamSeconds(size);
    setStartedAt(Date.now());
    setEstimatedSeconds(duration);
    setRemainingSeconds(duration);
    timeExpiredRef.current = false;
  }

  function startExam(size) {
    const safeSize = Math.max(1, Math.min(Number(size) || 1, eligibleCases.length));
    const selection = selectExamCases(cases, {
      size: safeSize,
      specialty: specialtyFilter,
      difficulty: difficultyFilter,
      bankOnly,
      recentIds: getRecentCaseIds(),
    });
    rememberCaseIds(selection.map((item) => item.id));
    setExamCases(selection.map(shuffleCaseOptions));
    setRequestedSize(safeSize);
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    setCompleted(false);
    setSaved(false);
    setFinishedUsedSeconds(null);
    beginTimer(safeSize);
  }

  function startAdaptiveExam(size = requestedSize) {
    const safeSize = Math.max(1, Math.min(Number(size) || 10, eligibleCases.length));
    const progress = loadProgress();
    const weakSpecialties = new Set(getWeaknesses(progress, 3).map((item) => item.specialty));
    const missedIds = new Set(Object.keys(progress.missedIds || {}).map(Number));
    const priorityIds = eligibleCases
      .filter((item) => missedIds.has(Number(item.id)) || weakSpecialties.has(item.specialty))
      .map((item) => item.id);
    const selection = selectExamCases(cases, {
      size: safeSize,
      specialty: specialtyFilter,
      difficulty: difficultyFilter,
      bankOnly,
      recentIds: getRecentCaseIds(),
      priorityIds,
    });
    rememberCaseIds(selection.map((item) => item.id));
    setExamCases(selection.map(shuffleCaseOptions));
    setRequestedSize(safeSize);
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    setCompleted(false);
    setSaved(false);
    setFinishedUsedSeconds(null);
    beginTimer(safeSize);
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
        title: `Caso ${current + 1}`,
        specialty: question.specialty,
        difficulty: question.difficulty,
        questionText: question.question,
        caseText: question.case,
        selected,
        correct,
        correctAnswer: question.answer,
        selectedAnswer: question.options[selected],
        correctAnswerText: question.options[question.answer],
      },
    ]);
    setShowFeedback(true);
  }

  function getUsedSeconds() {
    if (!startedAt) return 0;
    return Math.min(estimatedSeconds, Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
  }

  async function finishExam({ timedOut = false } = {}) {
    if (!saved) {
        const usedSeconds = getUsedSeconds();
        setFinishedUsedSeconds(usedSeconds);
        const result = {
          answers,
          grade,
          percentage,
          score,
          total,
          estimatedSeconds,
          usedSeconds,
          secondsPerQuestion: SECONDS_PER_QUESTION,
          timedOut,
        };
        saveExamResult(result);
        if (isSupabaseConfigured) {
          try {
            await saveRemoteExamResult(result, {
              specialty: specialtyFilter,
              difficulty: difficultyFilter,
              bankOnly,
              requestedSize,
              estimatedSeconds,
              usedSeconds,
              secondsPerQuestion: SECONDS_PER_QUESTION,
              timedOut,
            });
          } catch (error) {
            console.error("No se pudo guardar el examen en la cuenta", error);
            alert("El examen se guardó en este navegador, pero no pudo sincronizarse con tu cuenta. Revisa tu conexión e intenta iniciar sesión de nuevo.");
          }
        }
        setSaved(true);
      }
    setCompleted(true);
  }

  async function nextQuestion() {
    if (current + 1 >= total) {
      await finishExam();
      return;
    }
    setCurrent((value) => value + 1);
    setSelected(null);
    setShowFeedback(false);
  }

  useEffect(() => {
    if (!startedAt || !total || completed) return undefined;

    const updateRemainingTime = () => {
      const nextRemaining = Math.max(0, estimatedSeconds - Math.floor((Date.now() - startedAt) / 1000));
      setRemainingSeconds(nextRemaining);

      if (nextRemaining === 0 && !timeExpiredRef.current) {
        timeExpiredRef.current = true;
        window.setTimeout(() => {
          alert("Tiempo finalizado. Se guardarán las respuestas que ya calificaste.");
          void finishExam({ timedOut: true });
        }, 0);
      }
    };

    updateRemainingTime();
    const intervalId = window.setInterval(updateRemainingTime, 1000);
    return () => window.clearInterval(intervalId);
  }, [answers, completed, estimatedSeconds, saved, startedAt, total]);

  function returnToSetup() {
    setExamCases([]);
    setCompleted(false);
    setFinishedUsedSeconds(null);
    setStartedAt(null);
    setEstimatedSeconds(0);
    setRemainingSeconds(0);
    timeExpiredRef.current = false;
  }

  if (!total) {
    return (
      <section className="exam-shell setup-shell">
        <div className="page-header">
          <p className="eyebrow">{bankOnly ? "Simulacro de bancos EFISER" : "Nuevo simulador"}</p>
          <h1>{bankOnly ? "Preguntas de los bancos que proporcionaste" : "¿Cuántas preguntas quieres responder?"}</h1>
          <p>{bankOnly ? "Este modo usa únicamente reactivos textuales de bancos y reactivos EFISER reconstruidos de forma independiente." : "Se elegirán sin repetirse dentro del examen y se priorizarán los casos no vistos recientemente."}</p>
        </div>

        <div className="card exam-card setup-card">
          <div className="exam-filters">
            <label>
              <span>Especialidad</span>
              <select value={specialtyFilter} onChange={(event) => setSpecialtyFilter(event.target.value)}>
                <option value="Todas">Todas las especialidades</option>
                {specialties.map((specialty) => <option key={specialty} value={specialty}>{specialty}</option>)}
              </select>
            </label>
            <label>
              <span>Dificultad</span>
              <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)}>
                <option value="Todas">Todas</option>
                <option value="3">Moderada</option>
                <option value="4">Difícil</option>
                <option value="5">Muy difícil</option>
              </select>
            </label>
          </div>
          <div className="quick-size-grid">
            {QUICK_SIZES.filter((size) => size <= eligibleCases.length).map((size) => (
              <button key={size} onClick={() => startExam(size)}>
                {size} preguntas
              </button>
            ))}
            <button className="secondary-button" onClick={() => startExam(eligibleCases.length)} disabled={!eligibleCases.length}>
              Todo el filtro ({eligibleCases.length})
            </button>
            <button className="adaptive-button" disabled={!eligibleCases.length} onClick={() => startAdaptiveExam(requestedSize)}>
              Repaso inteligente ({requestedSize})
            </button>
          </div>

          <label className="custom-size">
            <span>Cantidad personalizada (1–{eligibleCases.length || 1})</span>
            <div>
              <input
                max={eligibleCases.length || 1}
                min="1"
                onChange={(event) => setRequestedSize(event.target.value)}
                type="number"
                value={requestedSize}
              />
              <button disabled={!eligibleCases.length} onClick={() => startExam(requestedSize)}>Comenzar</button>
            </div>
          </label>
          <p className="time-estimate">Tiempo estimado: <b>{formatEstimatedTime(setupEstimatedSeconds)}</b> ({SECONDS_PER_QUESTION} segundos por pregunta).</p>
          <p className="setup-note">Banco disponible con este filtro: {eligibleCases.length} reactivos.</p>
        </div>
      </section>
    );
  }

  if (completed) {
    const missed = answers.filter((answer) => !answer.correct);
    const reportedUsedSeconds = finishedUsedSeconds ?? getUsedSeconds();
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
          <div className="result-card"><span>Tiempo utilizado</span><strong>{formatExamDuration(reportedUsedSeconds)}</strong></div>
          <div className="result-card"><span>Promedio por pregunta</span><strong>{formatExamDuration(total ? Math.round(reportedUsedSeconds / total) : 0)}</strong></div>
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
        <div className="exam-status"><div className="score-pill">Aciertos: {score}/{answers.length}</div><div className="timer-pill">Tiempo restante: {formatExamDuration(remainingSeconds)}</div></div>
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
              {cleanFeedbackText(question.explanation)
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={`${question.id}-explanation-${index}`}>{paragraph}</p>
                ))}
            </div>
            {question.optionFeedback ? (
              <div className="option-feedback">
                <h3>Revisión de las opciones</h3>
                <ul className="review-list">
                  {question.optionFeedback.map(cleanFeedbackText).filter(Boolean).map((feedback, index) => (
                    <li key={`${question.id}-feedback-${index}`}><b>{String.fromCharCode(65 + index)}.</b> {feedback}</li>
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
