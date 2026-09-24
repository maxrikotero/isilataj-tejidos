import Chancho from './Chancho'
import { useGuia } from './GuiaContext'

/** Burbuja fija con el chancho: mensaje del paso actual, festejo y botones. */
function GuiaBurbuja() {
  const guia = useGuia()
  if (!guia.activa) return null

  const { paso, festejo, indicePaso, totalPasos } = guia
  const numeroPaso = Math.min(indicePaso + 1, totalPasos)

  return (
    <aside className={`admin-guia ${festejo ? 'festejando' : ''}`} aria-live="polite">
      <div className="admin-guia-chancho">
        <Chancho animo={festejo || paso.final ? 'feliz' : 'normal'} />
      </div>
      <div className="admin-guia-cuerpo">
        {!paso.final && (
          <p className="admin-guia-progreso">
            Paso {numeroPaso} de {totalPasos}
          </p>
        )}
        <p className="admin-guia-mensaje">{festejo ?? paso.mensaje}</p>
        {!festejo && (
          <div className="admin-guia-acciones">
            {paso.final ? (
              <>
                <a className="btn btn-sm btn-primary" href="/" target="_blank" rel="noreferrer">
                  Ver el sitio
                </a>
                <button type="button" className="btn btn-sm btn-outline" onClick={guia.salir}>
                  Listo
                </button>
              </>
            ) : (
              <>
                {paso.permitirSeguir && (
                  <button type="button" className="btn btn-sm btn-primary" onClick={guia.seguir}>
                    {paso.textoSeguir}
                  </button>
                )}
                <button type="button" className="admin-guia-salir" onClick={guia.salir}>
                  Salir de la guía
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

export default GuiaBurbuja
