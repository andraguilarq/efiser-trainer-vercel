import { useState } from "react";
import { signInWithPassword, signUpWithPassword } from "../data/auth";

export default function AuthGate() {
  const [mode, setMode] = useState("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setBusy(true);
    try {
      if (mode === "signin") {
        await signInWithPassword(email.trim(), password);
      } else {
        const data = await signUpWithPassword({ name, email: email.trim(), password });
        if (!data.session) setNotice("Revisa tu correo para confirmar la cuenta y después inicia sesión.");
      }
    } catch (authError) {
      setError(authError.message || "No fue posible continuar con esta cuenta.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="profile-gate">
      <form className="profile-gate-card" onSubmit={submit}>
        <p className="eyebrow">EFISER Trainer</p>
        <h1>{mode === "signin" ? "Inicia sesión" : "Crea tu cuenta"}</h1>
        <p>Tu progreso queda vinculado a tu cuenta y solo tú puedes ver tus resultados.</p>
        {mode === "signup" && <label>Nombre<input autoFocus maxLength={80} onChange={(event) => setName(event.target.value)} required value={name} /></label>}
        <label>Correo electrónico<input autoFocus={mode === "signin"} onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label>
        <label>Contraseña<input minLength={8} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></label>
        {error && <p className="form-error">{error}</p>}
        {notice && <p className="form-notice">{notice}</p>}
        <button disabled={busy} type="submit">{busy ? "Guardando…" : mode === "signin" ? "Entrar" : "Crear cuenta"}</button>
        <button className="text-button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setNotice(""); }} type="button">
          {mode === "signin" ? "No tengo cuenta" : "Ya tengo cuenta"}
        </button>
      </form>
    </main>
  );
}
