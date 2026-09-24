/**
 * Esqueleto del panel mientras carga Auth, el chunk del admin o el catálogo.
 * Vive fuera de admin.css para que el fallback de Suspense ya tenga estilos.
 */
function PanelSkeleton() {
  return (
    <div className="skeleton-panel" aria-busy="true" aria-label="Cargando panel">
      <div className="skeleton-top">
        <span className="skeleton-linea" style={{ width: 120 }} />
        <span className="skeleton-linea" style={{ width: 160, marginLeft: 'auto' }} />
      </div>
      <div className="skeleton-cuerpo">
        <div className="skeleton-side">
          {[140, 90, 120, 110, 130, 100].map((ancho, indice) => (
            <span className="skeleton-linea" style={{ width: ancho }} key={indice} />
          ))}
        </div>
        <div className="skeleton-main">
          <div className="skeleton-cabecera">
            <span className="skeleton-circulo" />
            <span className="skeleton-linea" style={{ width: 180, height: 22 }} />
            <span className="skeleton-pill" />
          </div>
          {[0, 1, 2, 3].map((indice) => (
            <div className="skeleton-item" key={indice}>
              <span className="skeleton-cuadro" />
              <div>
                <span className="skeleton-linea" style={{ width: '40%' }} />
                <span className="skeleton-linea" style={{ width: '75%' }} />
                <span className="skeleton-linea" style={{ width: '25%', height: 10 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PanelSkeleton
