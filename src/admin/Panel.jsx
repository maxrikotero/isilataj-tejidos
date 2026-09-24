import { useCallback, useEffect, useState } from 'react'
import { deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore/lite'
import { db } from '../lib/firebase'
import { fetchCatalogDocs } from '../hooks/useCatalog'
import { cloudinaryConfigured, imgUrl } from '../lib/cloudinary'
import ProductForm from './ProductForm'
import ImageUploader from './ImageUploader'
import { seedFromStaticCatalog } from './seed'
import PanelSkeleton from './PanelSkeleton'
import GuiaBurbuja from './guia/GuiaBurbuja'
import { useGuia } from './guia/GuiaContext'

const SECCION_GENERAL = '__general__'

const porOrden = (primero, segundo) =>
  (primero.orden ?? 0) - (segundo.orden ?? 0) ||
  (primero.createdAt?.seconds ?? 0) - (segundo.createdAt?.seconds ?? 0)

function Panel({ user, onLogout, documentosIniciales = null }) {
  const [documentos, setDocumentos] = useState(documentosIniciales)
  const [error, setError] = useState('')
  const [seccionActual, setSeccionActual] = useState(SECCION_GENERAL)
  const [productoEnEdicion, setProductoEnEdicion] = useState(null) // null | 'new' | producto
  const [ocupado, setOcupado] = useState(false)
  const guia = useGuia()

  const recargar = useCallback(async () => {
    try {
      setDocumentos(await fetchCatalogDocs())
    } catch (fetchError) {
      setError(`No se pudo leer el catálogo: ${fetchError.message}`)
    }
  }, [])

  useEffect(() => {
    if (!documentosIniciales) recargar()
  }, [recargar, documentosIniciales])

  if (error && !documentos) return <div className="admin-center admin-error">{error}</div>
  if (!documentos) return <PanelSkeleton />

  const { artesanasDocs, productosDocs } = documentos
  const catalogoVacio = artesanasDocs.length === 0 && productosDocs.length === 0
  const artesanas = [...artesanasDocs].sort(porOrden)
  const artesanaActual =
    seccionActual === SECCION_GENERAL ? null : artesanas.find((artesana) => artesana.id === seccionActual)
  const productosDeSeccion = productosDocs
    .filter((producto) =>
      seccionActual === SECCION_GENERAL ? !producto.artesanaId : producto.artesanaId === seccionActual,
    )
    .sort(porOrden)
  const cantidadPorArtesana = (artesanaId) =>
    productosDocs.filter((producto) => producto.artesanaId === artesanaId).length

  /** Ejecuta una escritura, recarga el catálogo y muestra el error si falla. */
  async function ejecutar(operacion) {
    setOcupado(true)
    setError('')
    try {
      await operacion()
      await recargar()
    } catch (operationError) {
      setError(operationError.message)
    } finally {
      setOcupado(false)
    }
  }

  async function guardarProducto(datos, productoId) {
    const esNuevo = !productoId
    const referencia = doc(db, 'productos', productoId ?? generarProductoId(datos.nombre, artesanaActual?.id))
    const camposDeCreacion = esNuevo ? { createdAt: serverTimestamp(), orden: productosDeSeccion.length } : {}
    await setDoc(
      referencia,
      { ...camposDeCreacion, ...datos, artesanaId: artesanaActual?.id ?? null, updatedAt: serverTimestamp() },
      { merge: true },
    )
    setProductoEnEdicion(null)
    if (esNuevo) guia.marcar('guardar')
  }

  function elegirSeccion(seccion) {
    setSeccionActual(seccion)
    setProductoEnEdicion(null)
    guia.marcar('seccion')
  }

  function abrirNuevaPieza() {
    setProductoEnEdicion('new')
    guia.marcar('nueva')
  }

  async function alternarCampo(producto, campo) {
    await setDoc(
      doc(db, 'productos', producto.id),
      { [campo]: !producto[campo], updatedAt: serverTimestamp() },
      { merge: true },
    )
  }

  async function borrarProducto(producto) {
    if (!window.confirm(`¿Borrar "${producto.nombre}"? Esta acción no se puede deshacer.`)) return
    await deleteDoc(doc(db, 'productos', producto.id))
  }

  async function actualizarFotoArtesana(url) {
    await setDoc(doc(db, 'artesanas', artesanaActual.id), { foto: url }, { merge: true })
  }

  return (
    <div className={`admin ${guia.activa ? 'admin-con-guia' : ''}`}>
      <header className="admin-top">
        <div className="admin-top-marca">
          <img src="/img/logo-isilataj.jpg" alt="" width="36" height="36" />
          <div>
            <strong>Panel Isilatäj</strong>
            <span className="admin-top-email">{user.email}</span>
          </div>
        </div>
        <div className="admin-top-acciones">
          <a className="admin-top-link" href="/" target="_blank" rel="noreferrer">
            Ver sitio <span aria-hidden="true">↗</span>
          </a>
          <button className="btn btn-sm btn-outline" onClick={onLogout}>
            Salir
          </button>
        </div>
      </header>

      {!cloudinaryConfigured && (
        <p className="admin-warn">
          Falta configurar Cloudinary en <code>.env</code>. Se pueden editar textos pero no subir fotos.
        </p>
      )}

      {catalogoVacio ? (
        <div className="admin-center">
          <h2>El catálogo en la nube está vacío</h2>
          <p>Importá una vez las artesanas y piezas actuales del sitio para empezar a editarlas.</p>
          <button className="btn btn-primary" disabled={ocupado} onClick={() => ejecutar(seedFromStaticCatalog)}>
            {ocupado ? 'Importando…' : 'Importar catálogo inicial'}
          </button>
        </div>
      ) : (
        <div className="admin-body">
          <nav className={`admin-side ${guia.claseObjetivo('seccion')}`} data-guia="seccion">
            <button
              className={seccionActual === SECCION_GENERAL ? 'active' : ''}
              onClick={() => elegirSeccion(SECCION_GENERAL)}
            >
              Piezas de la comunidad
              <small>{cantidadPorArtesana(null) + cantidadPorArtesana(undefined)}</small>
            </button>
            <p className="kicker">Artesanas</p>
            {artesanas.map((artesana) => (
              <button
                key={artesana.id}
                className={seccionActual === artesana.id ? 'active' : ''}
                onClick={() => elegirSeccion(artesana.id)}
              >
                {artesana.nombre}
                <small>{cantidadPorArtesana(artesana.id)}</small>
              </button>
            ))}
          </nav>

          <main className="admin-main">
            <div className="admin-head">
              {artesanaActual ? (
                <div className="admin-artesana">
                  <img src={imgUrl(artesanaActual.foto, { w: 200 })} alt="" />
                  <div>
                    <h2>{artesanaActual.nombre}</h2>
                    <ImageUploader
                      label="Cambiar foto"
                      folder="isilataj/artesanas"
                      onUploaded={(urls) => ejecutar(() => actualizarFotoArtesana(urls[0]))}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2>Piezas de la comunidad</h2>
                  <p className="admin-muted">
                    Acá van las piezas que hicieron entre varias, o cuando no sabés quién la tejió. En el sitio
                    aparecen en «Más piezas de la comunidad».
                  </p>
                </div>
              )}
              <div className="admin-head-acciones">
                {!guia.activa && (
                  <button type="button" className="btn btn-outline admin-btn-guia" onClick={guia.iniciar}>
                    🐗 Te enseño a subir una pieza
                  </button>
                )}
                <button
                  className={`btn btn-primary ${guia.claseObjetivo('nueva')}`}
                  data-guia="nueva"
                  onClick={abrirNuevaPieza}
                  disabled={ocupado}
                >
                  + Nueva pieza
                </button>
              </div>
            </div>

            {productoEnEdicion && (
              <ProductForm
                key={productoEnEdicion === 'new' ? 'new' : productoEnEdicion.id}
                producto={productoEnEdicion === 'new' ? null : productoEnEdicion}
                onCancel={() => setProductoEnEdicion(null)}
                onSave={(datos) =>
                  ejecutar(() => guardarProducto(datos, productoEnEdicion === 'new' ? null : productoEnEdicion.id))
                }
                busy={ocupado}
              />
            )}

            {productosDeSeccion.length === 0 && !productoEnEdicion && (
              <p className="admin-muted">Todavía no hay piezas acá.</p>
            )}

            <ul className="admin-list">
              {productosDeSeccion.map((producto) => (
                <li key={producto.id} className={producto.activo === false ? 'inactive' : ''}>
                  <img src={imgUrl(producto.fotos?.[0], { w: 200 })} alt="" />
                  <div className="admin-item-body">
                    <strong>{producto.nombre}</strong>
                    <span className="admin-muted">{producto.descripcion}</span>
                    <span className="admin-tags">
                      {producto.destacado && <em>Destacada</em>}
                      {producto.activo === false && <em className="off">Oculta</em>}
                      <em>
                        {producto.fotos?.length ?? 0} foto{producto.fotos?.length === 1 ? '' : 's'}
                      </em>
                    </span>
                  </div>
                  <div className="admin-actions">
                    <button onClick={() => setProductoEnEdicion(producto)} disabled={ocupado}>
                      Editar
                    </button>
                    <button onClick={() => ejecutar(() => alternarCampo(producto, 'destacado'))} disabled={ocupado}>
                      {producto.destacado ? 'Quitar destacada' : 'Destacar'}
                    </button>
                    <button onClick={() => ejecutar(() => alternarCampo(producto, 'activo'))} disabled={ocupado}>
                      {producto.activo === false ? 'Mostrar' : 'Ocultar'}
                    </button>
                    <button className="danger" onClick={() => ejecutar(() => borrarProducto(producto))} disabled={ocupado}>
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      )}
      {error && documentos && <p className="admin-error admin-toast">{error}</p>}
      <GuiaBurbuja />
    </div>
  )
}

function generarProductoId(nombre, artesanaId) {
  const slug = nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${slug}-${artesanaId ?? 'general'}-${Date.now().toString(36)}`
}

export default Panel
