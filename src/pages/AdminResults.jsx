import { useEffect, useState } from "react";
import { getAdminUsers } from "../data/remoteResults";
import Statistics from "./Statistics";

export default function AdminResults() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers()
      .then((items) => {
        setUsers(items);
        setSelectedUser(items[0] || null);
      })
      .catch((loadError) => setError(loadError.message || "No fue posible cargar los usuarios."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="exam-shell">
      <div className="page-header"><p className="eyebrow">Administración privada</p><h1>Resultados de usuarios</h1><p>Solo las cuentas con rol de administradora pueden abrir esta sección.</p></div>
      {loading && <p>Cargando usuarios…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && <div className="admin-layout">
        <div className="card">
          <h2>Usuarios</h2>
          <div className="admin-user-list">
            {users.map((user) => <button className={["admin-user-row", selectedUser?.id === user.id ? "active" : ""].filter(Boolean).join(" ")} key={user.id} onClick={() => setSelectedUser(user)}>
              <div><b>{user.display_name}</b><span>Última actividad: {user.last_active_at ? new Date(user.last_active_at).toLocaleString() : "sin actividad"}</span></div>
              <em>{user.role === "admin" ? "Admin" : "Usuario"}</em>
            </button>)}
            {!users.length && <p>No hay cuentas registradas todavía.</p>}
          </div>
        </div>
        <div>{selectedUser ? <Statistics displayName={selectedUser.display_name} readOnly userId={selectedUser.id} /> : <div className="card"><p>Selecciona un usuario para ver sus resultados.</p></div>}</div>
      </div>}
    </section>
  );
}
