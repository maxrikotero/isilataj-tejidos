import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

const MENSAJES_POR_CODIGO = {
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/invalid-email': 'El email no tiene un formato válido.',
  'auth/too-many-requests': 'Demasiados intentos. Esperá unos minutos.',
  'auth/network-request-failed': 'Sin conexión. Revisá internet.',
}

function Login({ auth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [mostrarPassword, setMostrarPassword] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setEnviando(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (authError) {
      setError(MENSAJES_POR_CODIGO[authError.code] ?? `No se pudo iniciar sesión (${authError.code}).`)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="admin admin-screen">
      <form className="admin-card admin-login" onSubmit={submit} noValidate>
        <div className="admin-login-brand">
          <img src="/img/logo-isilataj.jpg" alt="" width="64" height="64" />
          <p className="kicker">Isilatäj · Tejidos con Historia</p>
          <h1>Panel del catálogo</h1>
          <p className="admin-muted">Ingresá con la cuenta de administración para cargar piezas y fotos.</p>
        </div>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@correo.com"
            autoComplete="username"
            inputMode="email"
            required
            autoFocus
          />
        </label>

        <label>
          Contraseña
          <div className="admin-password">
            <input
              type={mostrarPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="admin-password-toggle"
              onClick={() => setMostrarPassword((valor) => !valor)}
              aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {mostrarPassword ? 'Ocultar' : 'Ver'}
            </button>
          </div>
        </label>

        {error && (
          <p className="admin-error" role="alert">
            {error}
          </p>
        )}

        <button className="btn btn-primary btn-block admin-login-submit" disabled={enviando || !email || !password}>
          {enviando ? 'Entrando…' : 'Entrar'}
        </button>

        <p className="admin-muted admin-login-foot">
          <a href="/">Volver al sitio</a>
        </p>
      </form>
    </div>
  )
}

export default Login
