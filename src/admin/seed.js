import { doc, writeBatch, serverTimestamp } from 'firebase/firestore/lite'
import { db } from '../lib/firebase'
import { artesanas } from '../data/catalog'

/** Importación única: copia el catálogo estático (catalog.js) a Firestore. */
export async function seedFromStaticCatalog() {
  const batch = writeBatch(db)
  artesanas.forEach((artesana, ordenArtesana) => {
    batch.set(doc(db, 'artesanas', artesana.id), { nombre: artesana.nombre, foto: artesana.foto, orden: ordenArtesana })
    artesana.productos.forEach((producto, ordenProducto) => {
      batch.set(doc(db, 'productos', producto.id), {
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? '',
        fotos: producto.fotos,
        destacado: Boolean(producto.destacado),
        activo: true,
        artesanaId: artesana.id,
        orden: ordenProducto,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    })
  })
  await batch.commit()
}
