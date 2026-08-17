export default function Sidebar({ profile, setPage, secureMode, onSignOut }) {
  const items = [
    { icon: "🏠", text: "Dashboard", page: "dashboard" },
    { icon: "📝", text: "Nuevo examen", page: "exam" },
    { icon: "📚", text: "Biblioteca", page: "library" },
    { icon: "📈", text: "Estadísticas", page: "statistics" },
  ];

  if (!secureMode) items.push({ icon: "⚙️", text: "Configuración", page: "settings" });
  if (secureMode && profile.role === "admin") items.push({ icon: "🔒", text: "Resultados de usuarios", page: "admin-results" });

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
