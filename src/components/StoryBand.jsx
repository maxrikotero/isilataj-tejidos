function StoryBand({ id, kicker, title, children, image, alt, reverse, tone = 'crema' }) {
  return (
    <section className={`story ${reverse ? 'story-reverse' : ''} tone-${tone}`} id={id}>
      <div className="wrap story-grid">
        <div className="story-copy">
          {kicker && <p className="kicker">{kicker}</p>}
          <h2>{title}</h2>
          {children}
        </div>
        <div className="story-media">
          <img src={image} alt={alt} loading="lazy" />
        </div>
      </div>
    </section>
  )
}

export default StoryBand
