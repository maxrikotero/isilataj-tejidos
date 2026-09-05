# ISILATÄJ — Tejidos con Historia

Landing page del emprendimiento textil comunitario **ISILATÄJ**, formado por 15 mujeres artesanas
de la Comunidad Wichí 27 de Junio, en La Puntana, Santa Victoria Este (Salta, Argentina).

Las piezas se tejen a mano en fibra de chaguar y se tiñen con semillas, raíces y hojas del monte.
Cada compra se transfiere íntegra a la artesana que hizo la pieza, sin intermediarios.

🌐 **https://isilataj-tejidos-historia.web.app**

## Stack

- React 19 + Vite
- CSS plano (sin framework), paleta tomada del logo
- Firebase Hosting

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
firebase deploy --only hosting
```

## Editar el catálogo

Todo el contenido de productos vive en `src/data/catalog.js`: artesanas, piezas, descripciones y
datos de contacto. Las fotos van en `public/img/` y se referencian desde ese mismo archivo.

Los precios no se publican en el sitio a propósito: se consultan por WhatsApp para evitar
información desactualizada.

## Estructura

```
src/
  components/    Header, Hero, Destacados, VideoHistoria, StoryBand,
                 ArtisanBlock, ProductCard, ColoresMonte, PiezasGrandes,
                 ComoComprar, Ubicacion, Footer
  data/          catalog.js — artesanas, piezas y contacto
  index.css      estilos globales y paleta
public/img/      fotos del catálogo
```

---

Art by [Salta Innovation Team](https://salta-innovation-team.web.app/)
