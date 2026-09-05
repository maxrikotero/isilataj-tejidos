import { contacto, waLink } from '../data/catalog'

const PASOS = [
  {
    label: 'Paso 1',
    title: 'Escribinos por WhatsApp',
    text: 'Decinos qué pieza querés. Te confirmamos disponibilidad, precio y coordinamos envío o retiro.',
  },
  {
    label: 'Paso 2',
    title: 'Transferís a la artesana',
    text: 'Te pasamos por WhatsApp el alias de Mercado Pago de quien tejió la pieza. El pago va directo a ella, sin intermediarios.',
  },
  {
    label: 'Paso 3',
    title: 'Retirás o te lo enviamos',
    text: contacto.retiro,
  },
]

function ComoComprar() {
  return (
    <section className="section comprar" id="comprar">
      <div className="wrap">
        <p className="kicker center">Cómo comprar</p>
        <h2 className="center">Tres pasos y la pieza es tuya</h2>

        <ol className="pasos">
          {PASOS.map((p, i) => (
            <li key={p.label}>
              <div className="paso-marker">
                <span className="paso-dot">{i + 1}</span>
                <span className="paso-label">{p.label}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>

        <div className="comprar-cta">
          <a
            className="btn btn-wa"
            href={waLink('Hola! Vi la web de Isilatäj y quiero hacer un pedido.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default ComoComprar
