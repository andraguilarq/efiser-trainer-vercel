import { useEffect, useState } from "react";
import { loadAdminReports, loadStudyState, updateLocalReportStatus } from "../data/studyState";

export default function AdminReports() {
  const [state, setState] = useState(loadStudyState);
  const [reports, setReports] = useState(state.reports || []);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    loadAdminReports()
      .then((items) => { if (active) setReports(items); })
      .catch(() => { if (active) setNotice("No fue posible cargar los reportes de otras cuentas; se muestran los de este dispositivo."); });
    return () => { active = false; };
  }, []);

  function updateReport(reportId, status) {
    setState(updateLocalReportStatus(reportId, status));
    setReports((items) => items.map((report) => report.id === reportId ? { ...report, status } : report));
  }

  return <section className="exam-shell"><div className="page-header"><p className="eyebrow">Administración privada</p><h1>Reportes de preguntas</h1><p>Los reportes no alteran el banco automáticamente; quedan registrados para revisión.</p></div>{notice && <p className="form-error">{notice}</p>}<div className="report-list">{reports.length ? reports.map((report) => <article className="card report-card" key={report.id}><p className="eyebrow">{report.status} · {new Date(report.createdAt).toLocaleString()}</p><h3>{report.reason}</h3><p><b>Usuario:</b> {report.userName || "Usuario"}</p><p><b>Pregunta:</b> {report.question}</p><p>{report.comment || "Sin comentario adicional."}</p><p className="muted"><b>Fuente interna:</b> {report.source}</p><div><button className="secondary-button" onClick={() => updateReport(report.id, "revisado")}>Marcar revisado</button><button onClick={() => updateReport(report.id, "resuelto")}>Marcar resuelto</button></div></article>) : <div className="card"><p>Aún no hay reportes guardados.</p></div>}</div></section>;
}
