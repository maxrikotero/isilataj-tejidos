import ProductCard from './ProductCard'

function ArtisanBlock({ artesana }) {
  return (
    <section className="artisan" id={`artesana-${artesana.id}`}>
      <div className="wrap">
        <header className="artisan-head">
          <img className="artisan-photo" src={artesana.foto} alt={artesana.nombre} loading="lazy" />
          <div>
            <p className="kicker">Piezas de</p>
            <h3>{artesana.nombre}</h3>
          </div>
        </header>
        <div className="product-grid">
          {artesana.productos.map((p) => (
            <ProductCard product={p} artesana={artesana.nombre} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArtisanBlock
