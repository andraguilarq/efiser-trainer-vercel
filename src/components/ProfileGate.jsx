import { useState } from "react";
import { createProfile } from "../data/profiles";

export default function ProfileGate({ onCreated }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    try {
      onCreated(createProfile(name));
    } catch (profileError) {
      setError(profileError.message);
    }
  }

  return (
    <main className="profile-gate">
      <form className="profile-gate-card" onSubmit={submit}>
        <p className="eyebrow">EFISER Trainer</p>
        <h1>Crea tu perfil de estudio</h1>
        <p>Tu progreso, estadísticas y capítulos leídos se guardarán por separado en este navegador.</p>
        <label>
          Nombre
          <input autoFocus maxLength={40} onChange={(event) => setName(event.target.value)} placeholder="Ej. Andrea" value={name} />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit">Entrar al Trainer</button>
      </form>
    </main>
  );
}
