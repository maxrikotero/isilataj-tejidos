import ProductCard from './ProductCard'

/** Sección genérica: piezas que no están asignadas a una artesana en particular. */
function MasPiezas({ productos }) {
  if (!productos?.length) return null
  return (
    <section className="section destacados" id="mas-piezas">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Catálogo</p>
            <h2>Más piezas de la comunidad</h2>
          </div>
          <p className="section-note">
            Piezas nuevas y trabajos compartidos entre varias tejedoras. Consultá por WhatsApp quién la
            hizo y si está disponible.
          </p>
        </div>
        <div className="product-grid">
          {productos.map((producto) => (
            <ProductCard product={producto} key={producto.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MasPiezas
