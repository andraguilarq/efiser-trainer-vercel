import { useState } from "react";
import { updateMyDisplayName } from "../data/auth";
import { activateProfile, createProfile, deleteProfile, getActiveProfile, getProfiles } from "../data/profiles";

function AccountSettings({ activeProfile, onProfileChange }) {
  const [name, setName] = useState(activeProfile.name || "");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveName(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSaving(true);
    try {
      const profile = await updateMyDisplayName(name);
      onProfileChange(profile);
      setNotice("Tu nombre se actualizó correctamente.");
    } catch (saveError) {
      setError(saveError.message || "No fue posible actualizar tu nombre.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="exam-shell">
      <div className="page-header"><p className="eyebrow">Cuenta</p><h1>Configuración</h1><p>Modifica el nombre que verá el resto dentro del Trainer.</p></div>
      <form className="card exam-card add-profile-form" onSubmit={saveName}>
        <h2>Nombre mostrado</h2>
        <p>Este cambio no modifica tu correo ni tu rol de administradora.</p>
        <div><input autoFocus maxLength={80} onChange={(event) => setName(event.target.value)} value={name} /><button disabled={saving} type="submit">{saving ? "Guardando…" : "Guardar nombre"}</button></div>
        {error && <p className="form-error">{error}</p>}
        {notice && <p className="form-notice">{notice}</p>}
      </form>
    </section>
  );
}

function LocalProfileSettings({ activeProfile, onProfileChange }) {
  const [profiles, setProfiles] = useState(getProfiles);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function addProfile(event) {
    event.preventDefault();
    try {
      const profile = createProfile(name);
      setProfiles(getProfiles());
      setName("");
      setError("");
      onProfileChange(profile);
    } catch (profileError) {
      setError(profileError.message);
    }
  }

  function switchProfile(profileId) {
    const profile = activateProfile(profileId);
    if (profile) onProfileChange(profile);
  }

  function removeProfile(profile) {
    if (!confirm(`¿Borrar el perfil de ${profile.name} y todo su progreso en este navegador?`)) return;
    const remaining = deleteProfile(profile.id);
    setProfiles(remaining);
    onProfileChange(getActiveProfile());
  }

  return (
    <section className="exam-shell">
      <div className="page-header"><p className="eyebrow">Personalización</p><h1>Perfiles de estudio</h1><p>Cada perfil conserva por separado sus exámenes, estadísticas y resúmenes leídos.</p></div>
      <div className="profile-list">{profiles.map((profile) => (
        <div className={profile.id === activeProfile.id ? "profile-row active" : "profile-row"} key={profile.id}>
          <div><strong>{profile.name}</strong><span>{profile.id === activeProfile.id ? "Perfil activo" : "Progreso independiente"}</span></div>
          <div className="profile-row-actions">{profile.id !== activeProfile.id && <button onClick={() => switchProfile(profile.id)}>Entrar</button>}<button className="danger-button" onClick={() => removeProfile(profile)}>Borrar</button></div>
        </div>
      ))}</div>
      <form className="card exam-card add-profile-form" onSubmit={addProfile}>
        <h2>Agregar otro perfil</h2><p>Útil cuando varias personas estudian desde el mismo dispositivo.</p>
        <div><input maxLength={40} onChange={(event) => setName(event.target.value)} placeholder="Nombre" value={name} /><button type="submit">Crear perfil</button></div>
        {error && <p className="form-error">{error}</p>}
      </form>
      <p className="setup-note">Los datos se guardan en este navegador. Al abrir el enlace desde otro dispositivo, cada compañero debe crear su propio perfil.</p>
    </section>
  );
}

export default function Settings({ activeProfile, onProfileChange, secureMode }) {
  if (secureMode) return <AccountSettings activeProfile={activeProfile} onProfileChange={onProfileChange} />;
  return <LocalProfileSettings activeProfile={activeProfile} onProfileChange={onProfileChange} />;
}
