export default function Sidebar({ profile, setPage }) {
  const items = [
    { icon: "🏠", text: "Dashboard", page: "dashboard" },
    { icon: "📝", text: "Nuevo examen", page: "exam" },
    { icon: "📚", text: "Biblioteca", page: "library" },
    { icon: "📈", text: "Estadísticas", page: "statistics" },
    { icon: "⚙️", text: "Configuración", page: "settings" },
  ];

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
      </div>
    </aside>
  );
}
