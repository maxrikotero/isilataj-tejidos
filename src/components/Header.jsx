import { waLink } from '../data/catalog'

function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#inicio">
          <img className="brand-mark" src="/img/logo-isilataj.jpg" alt="" aria-hidden="true" />
          <span className="brand-text">
            <strong>ISILATÄJ</strong>
            <em>Tejidos con Historia</em>
          </span>
        </a>
        <nav className="nav">
          <a href="#piezas">Piezas</a>
          <a href="#historia">Historia</a>
          <a href="#artesanas">Artesanas</a>
          <a href="#comprar">Cómo comprar</a>
        </nav>
        <a
          className="btn btn-wa btn-sm header-cta"
          href={waLink('Hola! Vi la web de Isilatäj y quiero hacer una consulta.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </header>
  )
}

export default Header
