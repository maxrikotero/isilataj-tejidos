import { useEffect, useRef, useState } from 'react'
import { imgUrl } from '../lib/cloudinary'
import ImageUploader from './ImageUploader'
import { useGuia } from './guia/GuiaContext'

function ProductForm({ producto, onSave, onCancel, busy: guardando }) {
  const [nombre, setNombre] = useState(producto?.nombre ?? '')
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? '')
  const [fotos, setFotos] = useState(producto?.fotos ?? [])
  const [destacado, setDestacado] = useState(producto?.destacado ?? false)
  const [activo, setActivo] = useState(producto?.activo ?? true)
  const [fotoSeleccionada, setFotoSeleccionada] = useState(producto?.fotos?.[0] ?? null)
  const guia = useGuia()

  const esPortada = fotoSeleccionada && fotos[0] === fotoSeleccionada

  function agregarFotos(urls) {
    setFotos((fotosActuales) => [...fotosActuales, ...urls])
    setFotoSeleccionada(urls[urls.length - 1])
    guia.marcar('fotos')
  }

  // La guía festeja cuando la persona termina de escribir (pausa o Enter), no en medio de una palabra.
  const PAUSA_ESCRITURA_MS = 1500
  const temporizadorEscritura = useRef(null)
  useEffect(() => () => clearTimeout(temporizadorEscritura.current), [])

  function marcarAlTerminarDeEscribir(evento, valor, minimo) {
    clearTimeout(temporizadorEscritura.current)
    if (valor.trim().length < minimo) return
    temporizadorEscritura.current = setTimeout(() => guia.marcar(evento), PAUSA_ESCRITURA_MS)
  }

  function marcarAhora(evento, valor, minimo) {
    clearTimeout(temporizadorEscritura.current)
    if (valor.trim().length >= minimo) guia.marcar(evento)
  }

  function cambiarNombre(event) {
    setNombre(event.target.value)
    marcarAlTerminarDeEscribir('nombre', event.target.value, 2)
  }

  function cambiarDescripcion(event) {
    setDescripcion(event.target.value)
    marcarAlTerminarDeEscribir('descripcion', event.target.value, 6)
  }

  /** Enter en «Nombre» no envía el formulario: pasa al siguiente paso. */
  function teclaEnNombre(event) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    marcarAhora('nombre', nombre, 2)
  }

  function usarComoPortada(url) {
    setFotos((fotosActuales) => [url, ...fotosActuales.filter((fotoUrl) => fotoUrl !== url)])
  }

  function quitarFoto(url) {
    const restantes = fotos.filter((fotoUrl) => fotoUrl !== url)
    setFotos(restantes)
    setFotoSeleccionada(restantes[0] ?? null)
  }

  function submit(event) {
    event.preventDefault()
    if (!fotos.length) return alert('Agregá al menos una foto.')
    onSave({ nombre: nombre.trim(), descripcion: descripcion.trim(), fotos, destacado, activo })
  }

  return (
    <form className="admin-card admin-form" onSubmit={submit}>
      <h3>{producto ? `Editar: ${producto.nombre}` : 'Nueva pieza'}</h3>
      <label className={guia.claseObjetivo('nombre')} data-guia="nombre">
        Nombre
        <input
          value={nombre}
          onChange={cambiarNombre}
          onKeyDown={teclaEnNombre}
          onBlur={() => marcarAhora('nombre', nombre, 2)}
          maxLength={80}
          required
          autoFocus
        />
      </label>
      <label className={guia.claseObjetivo('descripcion')} data-guia="descripcion">
        Descripción
        <textarea
          value={descripcion}
          onChange={cambiarDescripcion}
          onBlur={() => marcarAhora('descripcion', descripcion, 6)}
          maxLength={600}
          rows={3}
        />
      </label>

      <div className="admin-fotos">
        <span>Fotos de la pieza</span>

        {fotoSeleccionada ? (
          <div className="admin-foto-grande">
            <img src={imgUrl(fotoSeleccionada, { w: 1200 })} alt="Foto seleccionada" />
            {esPortada && <em className="admin-foto-portada">Portada</em>}
          </div>
        ) : (
          <div className="admin-foto-grande admin-foto-vacia">
            <p>Todavía no hay fotos.</p>
            <p className="admin-muted">Tocá "Agregar fotos" y elegí una o varias de tu celular.</p>
          </div>
        )}

        {fotoSeleccionada && (
          <div className="admin-foto-acciones">
            {!esPortada && (
              <button type="button" className="btn btn-sm btn-outline" onClick={() => usarComoPortada(fotoSeleccionada)}>
                Usar como portada
              </button>
            )}
            <button type="button" className="btn btn-sm admin-btn-quitar" onClick={() => quitarFoto(fotoSeleccionada)}>
              Quitar esta foto
            </button>
          </div>
        )}

        {fotos.length > 1 && (
          <ul className="admin-miniaturas">
            {fotos.map((url) => (
              <li key={url}>
                <button
                  type="button"
                  className={url === fotoSeleccionada ? 'active' : ''}
                  onClick={() => setFotoSeleccionada(url)}
                  aria-label="Ver esta foto"
                >
                  <img src={imgUrl(url, { w: 300 })} alt="" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={`admin-guia-envoltura ${guia.claseObjetivo('fotos')}`} data-guia="fotos">
          <ImageUploader multiple principal onUploaded={agregarFotos} />
        </div>
        {fotos.length > 0 && (
          <p className="admin-muted admin-foto-ayuda">
            La foto con la etiqueta "Portada" es la que se ve primero en el sitio. Tocá una miniatura para verla grande.
          </p>
        )}
      </div>

      <div className="admin-checks">
        <label>
          <input type="checkbox" checked={destacado} onChange={(event) => setDestacado(event.target.checked)} />{' '}
          Destacada (aparece en "Las piezas más buscadas")
        </label>
        <label>
          <input type="checkbox" checked={activo} onChange={(event) => setActivo(event.target.checked)} /> Visible en
          el sitio
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={guardando}>
          Cancelar
        </button>
        <button className={`btn btn-primary ${guia.claseObjetivo('guardar')}`} data-guia="guardar" disabled={guardando}>
          {guardando ? 'Guardando…' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
