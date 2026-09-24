import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PanelSkeleton from './admin/PanelSkeleton.jsx'

// /admin se carga aparte: la landing no paga el peso de Auth ni del panel.
const Admin = lazy(() => import('./admin/Admin.jsx'))
const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={<PanelSkeleton />}>
        <Admin />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
