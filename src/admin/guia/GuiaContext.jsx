import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/**
 * Guía paso a paso para subir una pieza. Cada paso espera un `evento` que la
 * app dispara cuando la persona hace la acción real (elegir artesana, tocar
 * "Nueva pieza", escribir el nombre…). Al recibirlo, el chancho festeja y
 * muestra el siguiente paso.
 */
export const PASOS = [
  {
    id: 'seccion',
    objetivo: 'seccion',
    mensaje:
      '¡Hola! Soy el chancho del monte y te voy a acompañar. Primero, tocá el nombre de quien tejió la pieza. Si la hicieron entre varias o no sabés quién, tocá «Piezas de la comunidad».',
    permitirSeguir: true,
    textoSeguir: 'Ya está elegida',
  },
  {
    id: 'nueva',
    objetivo: 'nueva',
    mensaje: 'Ahora tocá el botón «+ Nueva pieza».',
  },
  {
    id: 'nombre',
    objetivo: 'nombre',
    mensaje: 'Escribí el nombre de la pieza en el cuadro «Nombre». Por ejemplo: «Mochila» o «Pollera».',
  },
  {
    id: 'descripcion',
    objetivo: 'descripcion',
    mensaje:
      'Ahora, en el cuadro «Descripción», contá algo cortito: colores, tamaño, con qué está hecha. Si no querés, tocá «Seguir».',
    permitirSeguir: true,
    textoSeguir: 'Seguir',
  },
  {
    id: 'fotos',
    objetivo: 'fotos',
    mensaje: 'Ahora las fotos. Tocá «Agregar fotos» y elegí una o varias de tu celular.',
  },
  {
    id: 'guardar',
    objetivo: 'guardar',
    mensaje: '¡Qué linda quedó! Tocá «Guardar» para que aparezca en el sitio.',
  },
  {
    id: 'fin',
    objetivo: null,
    mensaje: '¡Lo lograste! La pieza ya está publicada. Podés verla en el sitio o subir otra cuando quieras.',
    final: true,
  },
]

const FESTEJOS = ['¡Muy bien!', '¡Genial!', '¡Eso!', '¡Excelente!', '¡Perfecto!']
const DURACION_FESTEJO_MS = 1400

const GuiaContext = createContext(null)

export function GuiaProvider({ children, pasoInicial = null }) {
  const [indicePaso, setIndicePaso] = useState(pasoInicial) // null = guía apagada
  const [festejo, setFestejo] = useState(null)
  const temporizador = useRef(null)

  const paso = indicePaso === null ? null : PASOS[indicePaso]

  const limpiarTemporizador = () => {
    if (temporizador.current) clearTimeout(temporizador.current)
    temporizador.current = null
  }

  const iniciar = useCallback(() => {
    limpiarTemporizador()
    setFestejo(null)
    setIndicePaso(0)
  }, [])

  const salir = useCallback(() => {
    limpiarTemporizador()
    setFestejo(null)
    setIndicePaso(null)
  }, [])

  const avanzar = useCallback(() => {
    setIndicePaso((actual) => (actual === null ? null : Math.min(actual + 1, PASOS.length - 1)))
  }, [])

  /** Festeja y pasa al siguiente paso después de una pausa corta. */
  const festejarYAvanzar = useCallback(() => {
    setFestejo(FESTEJOS[Math.floor(Math.random() * FESTEJOS.length)])
    limpiarTemporizador()
    temporizador.current = setTimeout(() => {
      setFestejo(null)
      avanzar()
    }, DURACION_FESTEJO_MS)
  }, [avanzar])

  /** La app avisa que ocurrió una acción. Solo cuenta si es la que el paso actual espera. */
  const marcar = useCallback(
    (evento) => {
      if (!paso || festejo || paso.id !== evento) return
      festejarYAvanzar()
    },
    [paso, festejo, festejarYAvanzar],
  )

  /** El botón "Seguir" de los pasos opcionales. */
  const seguir = useCallback(() => {
    if (!paso || festejo) return
    festejarYAvanzar()
  }, [paso, festejo, festejarYAvanzar])

  const esObjetivo = useCallback((nombre) => Boolean(paso && !festejo && paso.objetivo === nombre), [paso, festejo])

  // Al cambiar de paso, llevar la vista al elemento que hay que tocar y, si es
  // un campo de texto, poner el cursor adentro para que quede claro dónde escribir.
  useEffect(() => {
    if (!paso?.objetivo || festejo) return
    const elemento = document.querySelector(`[data-guia="${paso.objetivo}"]`)
    if (!elemento) return
    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' })
    const campo = elemento.matches('input, textarea') ? elemento : elemento.querySelector('input, textarea')
    if (campo) {
      const enfocar = setTimeout(() => campo.focus({ preventScroll: true }), 350)
      return () => clearTimeout(enfocar)
    }
  }, [paso, festejo])

  useEffect(() => () => limpiarTemporizador(), [])

  const valor = useMemo(
    () => ({
      activa: paso !== null,
      paso,
      indicePaso,
      totalPasos: PASOS.length - 1,
      festejo,
      iniciar,
      salir,
      seguir,
      marcar,
      esObjetivo,
      claseObjetivo: (nombre) => (esObjetivo(nombre) ? 'admin-guia-objetivo' : ''),
    }),
    [paso, indicePaso, festejo, iniciar, salir, seguir, marcar, esObjetivo],
  )

  return <GuiaContext.Provider value={valor}>{children}</GuiaContext.Provider>
}

const guiaApagada = {
  activa: false,
  paso: null,
  indicePaso: null,
  totalPasos: PASOS.length - 1,
  festejo: null,
  iniciar: () => {},
  salir: () => {},
  seguir: () => {},
  marcar: () => {},
  esObjetivo: () => false,
  claseObjetivo: () => '',
}

export function useGuia() {
  return useContext(GuiaContext) ?? guiaApagada
}
