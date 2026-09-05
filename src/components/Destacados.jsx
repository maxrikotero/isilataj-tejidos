import ProductCard from './ProductCard'
import { destacados } from '../data/catalog'

function Destacados() {
  return (
    <section className="section destacados" id="piezas">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Catálogo</p>
            <h2>Las piezas más buscadas</h2>
          </div>
          <p className="section-note">
            Todas las piezas son únicas. Si una ya se vendió, la artesana puede tejer otra similar.
          </p>
        </div>
        <div className="product-grid">
          {destacados.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destacados
