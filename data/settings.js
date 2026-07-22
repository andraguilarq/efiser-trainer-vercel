const SETTINGS_KEY = "efiser-trainer-settings";

export const defaultSettings = {
  defaultQuestionCount: 10,
  targetScore: 8,
  defaultMode: "training",
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings) {
  const next = { ...defaultSettings, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  return next;
}
