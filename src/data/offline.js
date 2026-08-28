import cases from "./cases";
import { pearls, studyResources } from "./studyResources";

const OFFLINE_KEY = "efiser-trainer-offline-prepared";

export function registerOfflineSupport() {
  if (!("serviceWorker" in navigator)) return Promise.resolve(null);
  return navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.warn("No se pudo registrar el modo offline", error);
    return null;
  });
}

async function cacheUrls() {
  const entries = performance.getEntriesByType("resource")
    .map((entry) => entry.name)
    .filter((url) => url.startsWith(location.origin));
  return [...new Set(["/", "/index.html", "/manifest.webmanifest", ...entries])];
}

export async function prepareOfflineContent() {
  if (!("caches" in window)) throw new Error("Este navegador no permite almacenamiento offline.");
  const urls = await cacheUrls();
  const cache = await caches.open("efiser-trainer-runtime-v1");
  await Promise.allSettled(urls.map((url) => cache.add(url)));
  localStorage.setItem(OFFLINE_KEY, JSON.stringify({
    preparedAt: new Date().toISOString(),
    urls,
    caseCount: cases.length,
    resourceCount: studyResources.length,
    pearlCount: pearls.length,
  }));
  return verifyOfflineContent();
}

export async function verifyOfflineContent() {
  if (!("caches" in window)) return { ready: false, missing: ["Almacenamiento offline no disponible"] };
  const prepared = JSON.parse(localStorage.getItem(OFFLINE_KEY) || "null");
  const names = await caches.keys();
  const cache = await caches.open("efiser-trainer-runtime-v1");
  const shell = await cache.match("/") || await cache.match("/index.html");
  const cached = await cache.keys();
  const missing = [];
  if (!shell) missing.push("Shell de la aplicación");
  if (!prepared) missing.push("Preparación inicial del contenido");
  if (!cached.length) missing.push("Archivos de la aplicación");
  if (!cases.length) missing.push("Banco de preguntas");
  if (!studyResources.length) missing.push("Recursos de Repaso");
  if (!pearls.length) missing.push("Perlas");
  if (prepared && prepared.caseCount !== cases.length) missing.push("Banco actualizado: vuelve a preparar el contenido");
  if (prepared && prepared.resourceCount !== studyResources.length) missing.push("Recursos de Repaso actualizados: vuelve a preparar el contenido");
  if (prepared && prepared.pearlCount !== pearls.length) missing.push("Perlas actualizadas: vuelve a preparar el contenido");
  return { ready: Boolean(shell && prepared && cached.length && !missing.length), missing, cachedCount: cached.length, preparedAt: prepared?.preparedAt || null, serviceWorker: names.includes("efiser-trainer-runtime-v1") || "serviceWorker" in navigator };
}
