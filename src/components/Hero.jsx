import { contacto, waLink } from '../data/catalog'
import { imgUrl } from '../lib/cloudinary'

function Hero({ destacados }) {
  return (
    <section className="hero" id="inicio">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Comunidad Wichí 27 de Junio · La Puntana · Salta</p>
          <h1>
            Tejidos con historia,
            <br />
            hechos a mano en chaguar
          </h1>
          <p className="hero-lead">
            Somos 15 mujeres artesanas del monte salteño. Cada pieza es única, tejida con fibra
            de chaguar y teñida con semillas y raíces. Lo que pagás va íntegro a la artesana que
            la hizo.
          </p>
          <div className="hero-actions">
            <a href="#piezas" className="btn btn-primary">
              Ver las piezas
            </a>
            <a
              className="btn btn-wa"
              href={waLink('Hola! Vi la web de Isilatäj y quiero hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
          </div>
          <ul className="hero-facts">
            <li>Envíos y retiro en Salta Capital</li>
            <li>Pago por Mercado Pago</li>
            <li>Piezas únicas, no hay dos iguales</li>
          </ul>
        </div>

        <div className="hero-media">
          <img src="/img/poncho-erlinda.jpg" alt="Poncho de chaguar tejido a mano" />
        </div>
      </div>

      <div className="wrap hero-strip">
        {destacados.slice(0, 4).map((producto) => (
          <a className="strip-card" href="#piezas" key={producto.id}>
            <img src={imgUrl(producto.fotos[0], { w: 200 })} alt={producto.nombre} loading="lazy" />
            <div>
              <span className="strip-name">{producto.nombre}</span>
              <span className="strip-author">{producto.artesana}</span>
            </div>
          </a>
        ))}
      </div>
      <p className="hero-note wrap">
        Consultas y pedidos por WhatsApp con {contacto.referente}, referente del grupo.
      </p>
    </section>
  )
}

export default Hero
