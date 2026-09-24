/**
 * Chancho de monte (pecarí de collar) en SVG plano. `animo` cambia la cara:
 * 'normal' explica, 'feliz' festeja.
 */
function Chancho({ animo = 'normal', size = 88 }) {
  const feliz = animo === 'feliz'
  return (
    <svg
      className={`chancho chancho-${animo}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Chancho de monte, tu guía"
    >
      {/* orejas */}
      <ellipse cx="26" cy="34" rx="13" ry="17" fill="#6b5a4e" transform="rotate(-20 26 34)" />
      <ellipse cx="94" cy="34" rx="13" ry="17" fill="#6b5a4e" transform="rotate(20 94 34)" />
      <ellipse cx="27" cy="36" rx="7" ry="10" fill="#b58a80" transform="rotate(-20 27 36)" />
      <ellipse cx="93" cy="36" rx="7" ry="10" fill="#b58a80" transform="rotate(20 93 36)" />
      {/* cabeza */}
      <ellipse cx="60" cy="66" rx="44" ry="40" fill="#7d6b5d" />
      {/* collar blanco típico del pecarí */}
      <path d="M22 84 Q60 108 98 84 Q60 118 22 84Z" fill="#e9e1d3" />
      {/* cerdas en la frente */}
      <path d="M50 28 l4 -10 l4 10 M58 26 l3 -11 l3 11 M66 28 l4 -10 l4 10" stroke="#4d3f36" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* ojos */}
      {feliz ? (
        <>
          <path d="M38 58 q7 -8 14 0" stroke="#2b2320" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M68 58 q7 -8 14 0" stroke="#2b2320" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="45" cy="58" r="4.5" fill="#2b2320" />
          <circle cx="75" cy="58" r="4.5" fill="#2b2320" />
          <circle cx="46.5" cy="56.5" r="1.5" fill="#fff" />
          <circle cx="76.5" cy="56.5" r="1.5" fill="#fff" />
        </>
      )}
      {/* cachetes */}
      {feliz && (
        <>
          <circle cx="36" cy="70" r="5" fill="#c98a7a" opacity="0.6" />
          <circle cx="84" cy="70" r="5" fill="#c98a7a" opacity="0.6" />
        </>
      )}
      {/* hocico */}
      <ellipse cx="60" cy="80" rx="19" ry="14" fill="#9c8072" />
      <ellipse cx="60" cy="80" rx="15" ry="10" fill="#b39586" />
      <ellipse cx="53" cy="80" rx="3.2" ry="4.2" fill="#3a2e28" />
      <ellipse cx="67" cy="80" rx="3.2" ry="4.2" fill="#3a2e28" />
      {/* boca */}
      {feliz ? (
        <path d="M48 93 q12 10 24 0" stroke="#3a2e28" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M52 94 q8 4 16 0" stroke="#3a2e28" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}
      {/* colmillitos */}
      <path d="M46 92 l2 6" stroke="#f3eee4" strokeWidth="3" strokeLinecap="round" />
      <path d="M74 92 l-2 6" stroke="#f3eee4" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default Chancho
