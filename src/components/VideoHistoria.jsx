function VideoHistoria() {
  return (
    <section className="section video-historia" id="video">
      <div className="wrap">
        <div className="video-head">
          <p className="kicker">Conocelas</p>
          <h2>La historia, contada por ellas mismas</h2>
          <p className="section-lead">
            Las artesanas de La Puntana cuentan cómo trabajan el chaguar, qué significa el tejido
            para la comunidad y qué cambia cuando una pieza se vende.
          </p>
        </div>
        <div className="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/kvSJMNkNxDc?rel=0"
            title="ISILATÄJ — la historia de las artesanas wichí de La Puntana"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default VideoHistoria
