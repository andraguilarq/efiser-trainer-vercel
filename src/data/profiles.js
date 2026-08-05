const PROFILES_KEY = "efiser-trainer-profiles";
const ACTIVE_PROFILE_KEY = "efiser-trainer-active-profile";
const LEGACY_PROGRESS_KEY = "efiser-trainer-progress";

function readProfiles() {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProfiles(profiles) {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  return profiles;
}

function makeId(name) {
  const slug = String(name || "usuario")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "usuario";
  return `${slug}-${Date.now().toString(36)}`;
}

export function getProfiles() {
  const profiles = readProfiles();
  if (profiles.length) return profiles;

  if (localStorage.getItem(LEGACY_PROGRESS_KEY)) {
    const legacyProfile = { id: "andrea", name: "Andrea", createdAt: new Date().toISOString() };
    writeProfiles([legacyProfile]);
    localStorage.setItem(ACTIVE_PROFILE_KEY, legacyProfile.id);
    return [legacyProfile];
  }

  return [];
}

export function getActiveProfileId() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || "";
}

export function getActiveProfile() {
  const profiles = getProfiles();
  const active = profiles.find((profile) => profile.id === getActiveProfileId());
  if (active) return active;
  if (!profiles.length) return null;
  localStorage.setItem(ACTIVE_PROFILE_KEY, profiles[0].id);
  return profiles[0];
}

export function createProfile(name) {
  const cleanName = String(name || "").trim().replace(/\s+/g, " ");
  if (!cleanName) throw new Error("Escribe un nombre para crear el perfil.");
  if (cleanName.length > 40) throw new Error("El nombre debe tener 40 caracteres o menos.");

  const profile = { id: makeId(cleanName), name: cleanName, createdAt: new Date().toISOString() };
  writeProfiles([...getProfiles(), profile]);
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id);
  return profile;
}

export function activateProfile(profileId) {
  const profile = getProfiles().find((item) => item.id === profileId);
  if (!profile) return null;
  localStorage.setItem(ACTIVE_PROFILE_KEY, profile.id);
  return profile;
}

export function deleteProfile(profileId) {
  const nextProfiles = getProfiles().filter((profile) => profile.id !== profileId);
  writeProfiles(nextProfiles);
  localStorage.removeItem(`efiser-trainer-progress:${profileId}`);
  localStorage.removeItem(`efiser-trainer-library-read:${profileId}`);
  if (getActiveProfileId() === profileId) {
    if (nextProfiles.length) localStorage.setItem(ACTIVE_PROFILE_KEY, nextProfiles[0].id);
    else localStorage.removeItem(ACTIVE_PROFILE_KEY);
  }
  return nextProfiles;
}
