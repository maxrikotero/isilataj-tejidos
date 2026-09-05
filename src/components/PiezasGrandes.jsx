import { piezasGrandes, waLink } from '../data/catalog'

function PiezasGrandes() {
  return (
    <section className="section piezas-grandes" id="piezas-grandes">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Piezas de gran formato</p>
            <h2>Obras tejidas entre todas</h2>
          </div>
          <p className="section-note">
            Piezas comunitarias de meses de trabajo, pensadas para instituciones, museos y espacios
            públicos.
          </p>
        </div>
        <div className="grandes-grid">
          {piezasGrandes.map((p) => (
            <article className="grande-card" key={p.id}>
              <img src={p.fotos[0]} alt={p.nombre} loading="lazy" />
              <div className="grande-body">
                <h3>{p.nombre}</h3>
                <p>{p.descripcion}</p>
                <a
                  className="btn btn-outline"
                  href={waLink(`Hola! Quiero consultar por ${p.nombre} de Isilatäj.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PiezasGrandes
