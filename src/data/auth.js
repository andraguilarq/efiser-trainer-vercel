import { isSupabaseConfigured, supabase } from "./supabase";

function assertConfigured() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("El acceso con cuenta todavía no está configurado.");
  }
}

function profileFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.display_name,
    role: row.role || "user",
    createdAt: row.created_at,
    lastActiveAt: row.last_active_at,
  };
}

export async function getSession() {
  assertConfigured();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signInWithPassword(email, password) {
  assertConfigured();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signUpWithPassword({ name, email, password }) {
  assertConfigured();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: name.trim() } },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  assertConfigured();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getMyProfile(userId) {
  assertConfigured();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, role, created_at, last_active_at")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return profileFromRow(data);
}

export async function ensureMyProfile(user) {
  const existing = await getMyProfile(user.id);
  if (existing) return existing;

  const fallbackName = user.user_metadata?.display_name || user.email?.split("@")[0] || "Usuario";
  const { error } = await supabase
    .from("profiles")
    .insert({ id: user.id, display_name: fallbackName });
  if (error) throw error;
  return getMyProfile(user.id);
}

export async function touchLastActive() {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.rpc("touch_last_active");
  if (error) console.warn("No se pudo actualizar la última actividad", error.message);
}
