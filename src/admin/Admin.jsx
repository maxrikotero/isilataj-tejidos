import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app, ADMIN_UID } from '../lib/firebase'
import Login from './Login'
import Panel from './Panel'
import ProductForm from './ProductForm'
import PanelSkeleton from './PanelSkeleton'
import { GuiaProvider } from './guia/GuiaContext'
import GuiaBurbuja from './guia/GuiaBurbuja'
import './admin.css'

const auth = getAuth(app)

const DATOS_DE_EJEMPLO = {
  artesanasDocs: [
    { id: 'malena', nombre: 'Malena Acevedo', foto: '/img/artesana-malena.jpg', orden: 0 },
    { id: 'irene', nombre: 'Irene Acevedo', foto: '/img/artesana-irene.jpg', orden: 1 },
  ],
  productosDocs: [
    {
      id: 'mochila-malena',
      nombre: 'Mochila',
      descripcion: 'Mochila de chaguar con cierre de cordel.',
      fotos: ['/img/mochila-malena-3.jpg', '/img/mochila-malena-1.jpg', '/img/mochila-malena-2.jpg'],
      destacado: true,
      activo: true,
      artesanaId: 'malena',
      orden: 0,
    },
  ],
}

/** Solo en `vite dev`: previsualizar pantallas sin Auth ni Firestore (?ui=login|skeleton|panel|form|guia&paso=N). */
function VistaPreviaDev({ vista, parametros }) {
  if (vista === 'login') return <Login auth={auth} />
  if (vista === 'skeleton') return <PanelSkeleton />
  if (vista === 'panel') {
    return (
      <GuiaProvider>
        <Panel user={{ email: 'isilataj@admin.com' }} onLogout={() => {}} documentosIniciales={DATOS_DE_EJEMPLO} />
      </GuiaProvider>
    )
  }
  if (vista === 'form' || vista === 'guia') {
    const pasoInicial = vista === 'guia' ? Number(parametros.get('paso') ?? 2) : null
    return (
      <GuiaProvider pasoInicial={pasoInicial}>
        <div className={`admin ${pasoInicial !== null ? 'admin-con-guia' : ''}`}>
          <main className="admin-main">
            <ProductForm producto={DATOS_DE_EJEMPLO.productosDocs[0]} onSave={() => {}} onCancel={() => {}} />
          </main>
          <GuiaBurbuja />
        </div>
      </GuiaProvider>
    )
  }
  return null
}

function Admin() {
  const [user, setUser] = useState(undefined) // undefined = cargando

  useEffect(() => onAuthStateChanged(auth, setUser), [])

  if (import.meta.env.DEV) {
    const parametros = new URLSearchParams(window.location.search)
    const vista = parametros.get('ui')
    if (vista) return <VistaPreviaDev vista={vista} parametros={parametros} />
  }

  if (user === undefined) return <PanelSkeleton />
  if (!user) return <Login auth={auth} />

  if (!ADMIN_UID || user.uid !== ADMIN_UID) {
    return (
      <div className="admin admin-screen">
        <div className="admin-card admin-login">
          <h1>Sin acceso</h1>
          <p>
            La cuenta <strong>{user.email}</strong> no está habilitada para administrar el catálogo.
          </p>
          <p className="admin-muted">UID: {user.uid}</p>
          <button className="btn btn-outline btn-block" onClick={() => signOut(auth)}>
            Salir
          </button>
        </div>
      </div>
    )
  }

  return (
    <GuiaProvider>
      <Panel user={user} onLogout={() => signOut(auth)} />
    </GuiaProvider>
  )
}

export default Admin
