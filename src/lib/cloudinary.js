const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

const MAX_SIDE_PX = 1600

/** Reduce la imagen en el navegador antes de subir (fotos de celular pesan 3–8 MB). */
async function shrinkImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('El archivo no es una imagen')
  let bitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    return file // formato raro (HEIC en algunos browsers): se sube tal cual
  }
  const scale = Math.min(1, MAX_SIDE_PX / Math.max(bitmap.width, bitmap.height))
  if (scale === 1 && file.size < 1_500_000) return file
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.86))
  return blob ?? file
}

/** Sube una imagen a Cloudinary con el preset unsigned. Devuelve la secure_url. */
export async function uploadImage(file, { folder = 'isilataj' } = {}) {
  if (!cloudinaryConfigured) {
    throw new Error('Falta configurar VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env')
  }
  const formData = new FormData()
  formData.append('file', await shrinkImage(file))
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', folder)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload?.error?.message ?? `Cloudinary respondió ${response.status}`)
  return payload.secure_url
}

/**
 * Inserta transformaciones de entrega en URLs de Cloudinary (formato y calidad
 * automáticos, ancho máximo). Las URLs locales (/img/...) pasan sin cambios.
 */
export function imgUrl(url, { w: width = 900 } = {}) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`)
}
