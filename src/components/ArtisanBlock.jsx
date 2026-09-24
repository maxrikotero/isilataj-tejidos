import ProductCard from './ProductCard'
import { imgUrl } from '../lib/cloudinary'

function ArtisanBlock({ artesana }) {
  if (!artesana) return null
  return (
    <section className="artisan" id={`artesana-${artesana.id}`}>
      <div className="wrap">
        <header className="artisan-head">
          <img
            className="artisan-photo"
            src={imgUrl(artesana.foto, { w: 300 })}
            alt={artesana.nombre}
            loading="lazy"
          />
          <div>
            <p className="kicker">Piezas de</p>
            <h3>{artesana.nombre}</h3>
          </div>
        </header>
        {artesana.productos.length > 0 ? (
          <div className="product-grid">
            {artesana.productos.map((producto) => (
              <ProductCard product={producto} artesana={artesana.nombre} key={producto.id} />
            ))}
          </div>
        ) : (
          <p className="section-note">Pronto vas a ver acá sus nuevas piezas.</p>
        )}
      </div>
    </section>
  )
}

export default ArtisanBlock
