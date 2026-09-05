import Header from './components/Header'
import Hero from './components/Hero'
import Destacados from './components/Destacados'
import StoryBand from './components/StoryBand'
import ArtisanBlock from './components/ArtisanBlock'
import ColoresMonte from './components/ColoresMonte'
import PiezasGrandes from './components/PiezasGrandes'
import VideoHistoria from './components/VideoHistoria'
import ComoComprar from './components/ComoComprar'
import Footer from './components/Footer'
import { artesanas } from './data/catalog'

const byId = (id) => artesanas.find((a) => a.id === id)

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Destacados />
        <VideoHistoria />

        <StoryBand
          id="historia"
          kicker="Quiénes somos"
          title="15 mujeres, una comunidad, un mismo hilo"
          image="/img/comunidad-grupo.jpg"
          alt="Artesanas de la Comunidad Wichí 27 de Junio en La Puntana"
        >
          <p>
            Isilatäj es un emprendimiento textil comunitario de la Comunidad Wichí 27 de Junio, en
            La Puntana, Santa Victoria Este — al noreste de Salta, sobre la frontera con Bolivia y
            Paraguay.
          </p>
          <p>
            Heredamos el saber de nuestras madres y abuelas: el chaguar, el hilado sobre la pierna,
            los tintes del monte. Lo que antes se cambiaba por comida, hoy sostiene a nuestras
            familias.
          </p>
          <a className="btn btn-outline" href="#artesanas">
            Ver quién teje cada pieza
          </a>
        </StoryBand>

        <div id="artesanas">
          <ArtisanBlock artesana={byId('erlinda')} />
          <ArtisanBlock artesana={byId('lilian')} />
        </div>

        <StoryBand
          kicker="El chaguar"
          title="Semanas de trabajo antes del primer nudo"
          image="/img/artesanas-fibra.jpg"
          alt="Artesanas separando la fibra de las hojas de chaguar"
          reverse
          tone="blanco"
        >
          <p>
            El chaguar es una planta espinosa del monte chaqueño. Se cosecha, se raspa y se golpea
            hasta separar la fibra, se seca al sol y se hila a mano, torciéndola sobre la pierna.
          </p>
          <p>
            Recién después empieza el tejido: pieza por pieza, sin moldes repetidos. Por eso no hay
            dos iguales, ni siquiera del mismo diseño.
          </p>
        </StoryBand>

        <ArtisanBlock artesana={byId('micaela')} />
        <ArtisanBlock artesana={byId('malena')} />
        <ArtisanBlock artesana={byId('irene')} />

        <ColoresMonte />

        <ArtisanBlock artesana={byId('clara')} />
        <ArtisanBlock artesana={byId('carina')} />
        <ArtisanBlock artesana={byId('maria')} />
        <ArtisanBlock artesana={byId('evelyn')} />

        <StoryBand
          kicker="Por qué comprar acá"
          title="El valor de cada compra va íntegro a la artesana"
          image="/img/hojas-chaguar.jpg"
          alt="Hojas de chaguar recién cosechadas"
          reverse
          tone="oscuro"
        >
          <p>
            No hay intermediarios: transferís directo a la cuenta de la mujer que tejió tu pieza.
            En una zona donde falta agua segura, salud y trabajo, el tejido es ingreso propio y
            autonomía.
          </p>
          <p>
            Comprar una pieza de Isilatäj es sostener una economía que se queda en la comunidad.
          </p>
        </StoryBand>

        <PiezasGrandes />
        <ComoComprar />
      </main>
      <Footer />
    </>
  )
}

export default App
