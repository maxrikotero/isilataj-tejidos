import Ubicacion from './Ubicacion'
import { contacto, waLink } from '../data/catalog'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.43 1.02 2.6c.12.16 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand-block">
          <img className="footer-logo" src="/img/logo-isilataj.jpg" alt="" aria-hidden="true" />
          <p className="footer-brand">ISILATÄJ · Tejidos con Historia</p>
          <p>Comunidad Wichí 27 de Junio</p>
          <p className="footer-pitch">
            15 mujeres artesanas tejiendo chaguar en el monte salteño. Cada compra va directo a
            quien tejió la pieza.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Secciones del sitio">
          <p className="footer-col-title">Explorar</p>
          <a href="#piezas">Piezas destacadas</a>
          <a href="#video">El video</a>
          <a href="#historia">Nuestra historia</a>
          <a href="#artesanas">Las artesanas</a>
          <a href="#colores">Colores del monte</a>
          <a href="#comprar">Cómo comprar</a>
        </nav>

        <div className="footer-place">
          <p className="footer-col-title">Dónde estamos</p>
          <Ubicacion />
        </div>

        <div className="footer-social">
          <p className="footer-col-title">Seguinos</p>
          <div className="social-row">
            <a
              className="social-btn"
              href={contacto.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Isilatäj"
            >
              <InstagramIcon />
              <span>@{contacto.instagram}</span>
            </a>
            <a
              className="social-btn"
              href={waLink('Hola! Vi la web de Isilatäj y quiero hacer una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Isilatäj"
            >
              <WhatsappIcon />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} ISILATÄJ. Todas las piezas son obra de sus artesanas.</p>
        <p className="footer-credit">
          <span className="art-by">Art by</span>
          <a
            className="credit-link"
            href="https://salta-innovation-team.web.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Salta Innovation Team
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
