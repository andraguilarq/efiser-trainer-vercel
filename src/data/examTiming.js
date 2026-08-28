export const SECONDS_PER_QUESTION = 90;

export function estimateExamSeconds(questionCount) {
  return Math.max(0, Number(questionCount) || 0) * SECONDS_PER_QUESTION;
}

export function formatExamDuration(totalSeconds) {
  const seconds = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;

  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export function formatEstimatedTime(totalSeconds) {
  const minutes = Math.ceil(Math.max(0, Number(totalSeconds) || 0) / 60);
  return `${minutes} min`;
}
