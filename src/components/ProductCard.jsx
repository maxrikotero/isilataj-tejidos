import { waLink } from '../data/catalog'
import { imgUrl } from '../lib/cloudinary'

function ProductCard({ product, artesana }) {
  const nombreArtesana = artesana ?? product.artesana
  const mensaje = `Hola! Vi la web de Isilatäj y me interesa ${product.nombre}${
    nombreArtesana ? ` de ${nombreArtesana}` : ''
  }. ¿Está disponible y cuál es el precio?`

  return (
    <article className="product-card">
      <div className="product-media">
        <img src={imgUrl(product.fotos[0])} alt={`${product.nombre} tejida en chaguar`} loading="lazy" />
      </div>
      <div className="product-body">
        <h3>{product.nombre}</h3>
        {product.descripcion && <p className="product-desc">{product.descripcion}</p>}
        {nombreArtesana && <p className="product-author">Tejido por {nombreArtesana}</p>}
        <a className="btn btn-wa btn-block" href={waLink(mensaje)} target="_blank" rel="noopener noreferrer">
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  )
}

export default ProductCard
