import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../lib/firebase'
import { artesanas as artesanasEstaticas } from '../data/catalog'

const porOrden = (primero, segundo) =>
  (primero.orden ?? 0) - (segundo.orden ?? 0) ||
  (primero.createdAt?.seconds ?? 0) - (segundo.createdAt?.seconds ?? 0)

/** Arma la misma forma que exporta catalog.js a partir de docs de Firestore. */
export function buildCatalog(artesanasDocs, productosDocs) {
  const productosActivos = productosDocs.filter((producto) => producto.activo !== false).sort(porOrden)
  const artesanas = [...artesanasDocs].sort(porOrden).map((artesana) => ({
    ...artesana,
    productos: productosActivos.filter((producto) => producto.artesanaId === artesana.id),
  }))
  const nombrePorArtesanaId = new Map(artesanas.map((artesana) => [artesana.id, artesana.nombre]))
  const productos = productosActivos.map((producto) => ({
    ...producto,
    artesana: producto.artesanaId ? nombrePorArtesanaId.get(producto.artesanaId) : undefined,
  }))
  return {
    artesanas,
    productos,
    destacados: productos.filter((producto) => producto.destacado),
    generales: productos.filter((producto) => !producto.artesanaId),
  }
}

const catalogoEstatico = buildCatalog(
  artesanasEstaticas.map(({ productos: _productosIgnorados, ...artesana }, indice) => ({ ...artesana, orden: indice })),
  artesanasEstaticas.flatMap((artesana) =>
    artesana.productos.map((producto, indice) => ({
      ...producto,
      artesanaId: artesana.id,
      activo: true,
      orden: indice,
    })),
  ),
)

export async function fetchCatalogDocs() {
  const [artesanasSnapshot, productosSnapshot] = await Promise.all([
    getDocs(collection(db, 'artesanas')),
    getDocs(collection(db, 'productos')),
  ])
  const aDocumentos = (snapshot) => snapshot.docs.map((documento) => ({ id: documento.id, ...documento.data() }))
  return { artesanasDocs: aDocumentos(artesanasSnapshot), productosDocs: aDocumentos(productosSnapshot) }
}

/**
 * Catálogo del sitio público. Arranca con el estático (render inmediato, sin
 * pantalla vacía) y lo reemplaza por Firestore si hay datos cargados.
 */
export function useCatalog() {
  const [catalogo, setCatalogo] = useState({ ...catalogoEstatico, source: 'static' })

  useEffect(() => {
    let cancelado = false
    fetchCatalogDocs()
      .then(({ artesanasDocs, productosDocs }) => {
        if (cancelado || productosDocs.length === 0) return
        setCatalogo({ ...buildCatalog(artesanasDocs, productosDocs), source: 'firestore' })
      })
      .catch((error) => console.warn('[catalog] Firestore no disponible, se usa el catálogo estático', error))
    return () => {
      cancelado = true
    }
  }, [])

  return catalogo
}
