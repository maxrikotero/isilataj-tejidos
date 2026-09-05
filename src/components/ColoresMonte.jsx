import { materiales } from '../data/catalog'

function ColoresMonte() {
  return (
    <section className="section colores" id="colores">
      <div className="wrap">
        <div className="colores-head">
          <div>
            <p className="kicker">Los colores del monte</p>
            <h2>Ningún color viene de un frasco</h2>
          </div>
          <p className="section-note">
            Cada tono sale de una semilla, una raíz o una hoja recolectada en el monte. La misma
            raíz da marrón claro si se hierve, y marrón oscuro si se deja en remojo.
          </p>
        </div>
        <ul className="color-list">
          {materiales.map((m) => (
            <li key={m.nombre}>
              <span className="swatch" style={{ background: m.color }} aria-hidden="true" />
              <span>
                <strong>{m.nombre}</strong>
                <em>{m.detalle}</em>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ColoresMonte
