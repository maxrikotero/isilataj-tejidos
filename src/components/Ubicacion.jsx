const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=-22.0197,-62.8242'

function Ubicacion() {
  return (
    <a className="location-card" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
      <svg className="location-bg" viewBox="0 0 320 120" aria-hidden="true" preserveAspectRatio="none">
        <path d="M-10 78 C 60 58, 110 96, 180 70 S 300 44, 340 62" />
        <path d="M-10 96 C 70 80, 120 112, 190 88 S 300 66, 340 82" />
        <path d="M40 -10 C 60 30, 30 60, 70 130" />
        <path d="M240 -10 C 250 40, 220 70, 260 130" />
      </svg>

      <span className="location-pin" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
      </span>

      <span className="location-text">
        <span className="location-kicker">Dónde tejemos</span>
        <strong>La Puntana</strong>
        <span className="location-sub">Santa Victoria Este · Rivadavia · Salta, Argentina</span>
        <span className="location-coords">22°01′11″S 62°49′27″O</span>
      </span>

      <span className="location-cta">
        Ver en Google Maps
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </span>
    </a>
  )
}

export default Ubicacion
