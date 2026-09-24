import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

// Config pública del proyecto (no es secreto: la seguridad la dan las reglas).
const firebaseConfig = {
  apiKey: 'AIzaSyDDyZflk7lKXn075nOT5rE-vI2wXHdX3ig',
  authDomain: 'isilataj-tejidos-historia.firebaseapp.com',
  projectId: 'isilataj-tejidos-historia',
  appId: '1:636213541152:web:17bb03bea26dd5bd053f45',
}

export const app = initializeApp(firebaseConfig)
// Firestore "lite": REST, sin realtime, ~1/4 del peso del SDK completo. Alcanza
// para un catálogo que se lee una vez por visita.
export const db = getFirestore(app)

export const ADMIN_UID = import.meta.env.VITE_ADMIN_UID
