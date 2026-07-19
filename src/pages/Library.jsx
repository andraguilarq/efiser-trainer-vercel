import cases from "../data/cases";

export default function Library() {
  const bySpecialty = cases.reduce((acc, item) => {
    const key = item.specialty || "Sin clasificar";
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <section className="exam-shell">
      <div className="page-header">
        <p className="eyebrow">Banco actual</p>
        <h1>Biblioteca</h1>
        <p>{cases.length} casos clínicos cargados.</p>
      </div>

      <div className="library-grid">
        {Object.entries(bySpecialty).map(([specialty, items]) => (
          <div className="card library-card" key={specialty}>
            <h2>{specialty}</h2>
            <p>{items.length} casos</p>
            <ul className="review-list">
              {items.slice(0, 6).map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
