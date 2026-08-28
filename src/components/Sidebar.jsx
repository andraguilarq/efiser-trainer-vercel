export default function Sidebar({ profile, setPage, secureMode, onSignOut }) {
  const items = [
    { icon: "🏠", text: "Dashboard", page: "dashboard" },
    { icon: "📝", text: "Nuevo examen", page: "exam" },
    { icon: "📋", text: "Simulacro de bancos", page: "bank-exam" },
    { icon: "📚", text: "Biblioteca", page: "library" },
    { icon: "🧠", text: "Repaso", page: "review" },
    { icon: "🔖", text: "Preguntas guardadas", page: "saved" },
    { icon: "💎", text: "Perlas", page: "pearls" },
    { icon: "🎯", text: "¿Qué debo estudiar?", page: "study-plan" },
    { icon: "📈", text: "Estadísticas", page: "statistics" },
    { icon: "⚙️", text: "Configuración", page: "settings" },
  ];

  if (secureMode && profile.role === "admin") items.push(
    { icon: "🔒", text: "Resultados de usuarios", page: "admin-results" },
    { icon: "⚑", text: "Reportes", page: "admin-reports" },
  );

  return (
    <aside className="sidebar">
      <h1>EFISER Trainer</h1>

      {items.map((item) => (
        <button key={item.page} onClick={() => setPage(item.page)}>
          {item.icon} {item.text}
        </button>
      ))}
      <div className="sidebar-profile">
        <span>Perfil activo</span>
        <strong>{profile.name}</strong>
        {profile.role === "admin" && <em>Administradora</em>}
        {secureMode && <button className="sidebar-signout" onClick={onSignOut}>Cerrar sesión</button>}
      </div>
    </aside>
  );
}
