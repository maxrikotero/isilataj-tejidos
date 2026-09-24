import { useRef, useState } from 'react'
import { uploadImage, cloudinaryConfigured } from '../lib/cloudinary'

/** Botón "elegir fotos" que sube a Cloudinary y devuelve las URLs por callback. */
function ImageUploader({
  onUploaded,
  multiple = false,
  folder = 'isilataj/productos',
  label = 'Agregar fotos',
  principal = false,
}) {
  const inputRef = useRef()
  const [textoProgreso, setTextoProgreso] = useState('')
  const [error, setError] = useState('')

  async function onChange(event) {
    const archivos = [...event.target.files]
    event.target.value = ''
    if (!archivos.length) return
    setError('')
    const urls = []
    try {
      for (let indice = 0; indice < archivos.length; indice++) {
        setTextoProgreso(`Subiendo ${indice + 1} de ${archivos.length}…`)
        urls.push(await uploadImage(archivos[indice], { folder }))
      }
      onUploaded(urls)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setTextoProgreso('')
    }
  }

  return (
    <div className="admin-uploader">
      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} hidden onChange={onChange} />
      <button
        type="button"
        className={principal ? 'btn btn-primary' : 'btn btn-sm btn-outline'}
        disabled={!cloudinaryConfigured || Boolean(textoProgreso)}
        onClick={() => inputRef.current.click()}
        title={cloudinaryConfigured ? '' : 'Configurar Cloudinary en .env'}
      >
        {textoProgreso || (principal ? `📷 ${label}` : label)}
      </button>
      {error && <span className="admin-error">{error}</span>}
    </div>
  )
}

export default ImageUploader
