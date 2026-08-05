import { getActiveProfileId } from "./profiles.js";

function storageKey() {
  const profileId = getActiveProfileId();
  return profileId ? `efiser-trainer-library-read:${profileId}` : "";
}

export function loadReadChapters() {
  try {
    const key = storageKey();
    if (!key) return [];
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export function setChapterRead(chapterId, read) {
  const key = storageKey();
  if (!key) return [];
  const id = String(chapterId);
  const current = new Set(loadReadChapters());
  if (read) current.add(id);
  else current.delete(id);
  const next = [...current];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}
