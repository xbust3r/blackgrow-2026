---
tipo: TASK
id: TASK-003
titulo: Carrusel de categorías con scroll-snap
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: ABIERTA
area: components
criticidad: "🟡"
relacionado: [DECISION-002, TASK-001]
creado: 2026-09-07
actualizado: 2026-09-07
---

# TASK-003 — Carrusel de categorías

## Contexto

Sale de [DECISION-002](DECISION-002-carrusel-de-categorias.md), que revierte «no se quieren carruseles» **sólo para esta pieza**. Lee esa decisión antes de empezar: explica por qué no entra Swiper y por qué la rejilla no se borra.

### Lo que hay hoy

[`categories.pug`](../../src/components/categories.pug) es una rejilla de 6 tarjetas idénticas, con imagen redonda y el texto «Category 1» repetido. Es la alternativa estática que se implementó cuando el carrusel estaba descartado.

### Lo que hace el origen (verificado servido, 1440px)

Un Swiper con **8 categorías reales**, en bucle:

| # | Categoría |
| --- | --- |
| 1 | Cribs |
| 2 | Beds |
| 3 | Toys |
| 4 | Other |
| 5 | Specials |
| 6 | Carriage |
| 7 | New |
| 8 | Bottles |

Cada tarjeta:

```html
<a href="/product-category/toys/">
  <span class="qodef-image-holder">
    <svg class="qodef-woo-svg" width="100%" height="100%">
      <rect width="100%" height="100%" fill="none" rx="50%" ry="50%"
            stroke="#EAE3DE" stroke-width="4" stroke-dasharray="10" stroke-linecap="square"/>
    </svg>
    <img width="92" height="92" src="…product-category-01.png" alt="s">
  </span>
  <p class="woocommerce-loop-category__title">Toys</p>
</a>
```

Valores computados:

| Pieza | Valor |
| --- | --- |
| Anillo | `stroke #EAE3DE`, ancho 4, `dasharray 10`, `linecap square`, círculo (`rx/ry 50%`) · **gira, ver abajo** |
| Imagen | 92 × 92 |
| Título | Jost 15px, peso 400, negro, **sin mayúsculas**, `margin: 10px 0` |
| Ancho de diapositiva | 183.33px a 1440px de ventana |
| Diapositivas en el DOM | 20 — 8 reales y 12 duplicadas por el bucle de Swiper |

`#EAE3DE` es exactamente `--color-line`. Úsalo por su nombre; el hex en el marcado es FALLO del verificador.

## Pedido

Convertir `categories.pug` en un carrusel, **conservando la rejilla como variante**.

### 1 · La rejilla no se borra

`categories.pug` pasa a ofrecer las dos formas —`+categories()` en rejilla y en carrusel—, no una que sustituye a la otra. DECISION-002 lo dice: la rejilla enseña las 8 categorías a la vez y el carrusel esconde la mitad; queremos poder volver.

Decide tú cómo se parametriza —dos mixins o uno con opción— y **explica en el hilo por qué**. Mira antes cómo lo resolvió `blog-list-template.pug`, que ya parametriza el lado de la barra lateral.

### 2 · El mecanismo: `scroll-snap`, sin dependencia

Una fila con `overflow-x: auto` y `scroll-snap-type: x mandatory`, cada tarjeta con `scroll-snap-align: start`.

**Esto tiene que funcionar sin JavaScript.** Sin el módulo, es una fila desplazable con el dedo, la rueda y el teclado, y eso ya es utilizable. El JavaScript **sólo** añade los botones de anterior y siguiente, que desplazan con `scrollBy({ behavior: 'smooth' })`.

**No instales Swiper ni ningún carrusel de terceros.** Si crees que hace falta, abre un RFC y lo discutimos; no lo metas y lo cuentes después.

### 3 · Módulo

`src/scripts/components/carousel.js`, hook **`js-carousel`** —el que el catálogo ya tenía reservado—, importado desde `main.js`.

- **Clase, no objeto literal.** `AGENTS.md`: clases para múltiples instancias con estado. Puede haber más de un carrusel en una página.
- Los botones son `<button type='button'>` con nombre accesible («Previous categories» / «Next categories»), no iconos desnudos.
- Cuando no hay más que desplazar, el botón se desactiva con `disabled`, no con una clase de estado inventada.
- Sin autoavance. El origen tampoco lo tiene, y un carrusel que se mueve solo es un problema de accesibilidad que nadie te ha pedido.
- `prefers-reduced-motion`: sin desplazamiento suave.

### 4 · Contenido y accesibilidad

- Las **8 categorías del origen**, con sus nombres. No 6 «Category 1».
- **Los `alt="s"` y `alt="f"` del origen no se copian.** Son texto alternativo basura —y el motivo de que al copiar la página aparezcan letras sueltas—. La imagen es decorativa y el nombre lo da el título: `alt=''`.
- Ocho imágenes distintas no existen en `src/assets/images/categories/` — sólo hay `category.webp`. Repítela y **anótalo como pendiente**, o usa `+pendingImage`. No descargues las del origen sin declararlas en `figma-assets.json` y en `assets-pendientes.json`.
- El anillo punteado va en SVG, con `currentColor` o el token; no un `border-dashed`, que no da el mismo trazo.

### 6 · ⚠️ El anillo gira — corrijo esta TASK

La primera versión lo daba por **estático**. Lo volví a medir en el origen y **rota sobre su centro, siempre**:

```css
.qodef-woo-svg { opacity: 1; }          /* visible siempre, no depende del hover */

rect {
    transform-origin: center center;
    animation: woo-qodef-svg-rotation-animation 5s linear infinite;
}

@keyframes woo-qodef-svg-rotation-animation {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

Ojo a la diferencia con el borde de la tarjeta de producto de [TASK-006](TASK-006-listado-de-tienda.md), que **parece** la misma animación y no lo es: allí los guiones desfilan (`stroke-dashoffset`) y sólo se ven en hover; aquí el anillo entero **gira** (`transform`) y se ve siempre. Comparten duración —5s lineales infinitas— y poco más.

- El `@keyframes` va en `styles.css`, con los demás.
- Sin JavaScript.
- `prefers-reduced-motion`: el `@media` global ya lo para. **El anillo tiene que seguir viéndose**: lo que sobra es el giro, no el anillo.
- Registrado en el catálogo como `category-ring-rotation`.
- La fila desplazable lleva nombre accesible y es alcanzable con el teclado.

### 5 · Sin bucle infinito

El origen duplica 12 diapositivas para simular el bucle. **No lo copies.** Duplicar contenido en el DOM lo duplica también para un lector de pantalla, y es la razón por la que al copiar la página salían las 8 categorías tres veces. Carrusel finito: se acaba y el botón se desactiva.

## Criterios de aceptación

- [ ] Las 8 categorías del origen, con sus nombres reales
- [ ] La rejilla sigue disponible como variante, con la parametrización razonada en el hilo
- [ ] Funciona sin JavaScript: fila desplazable con dedo, rueda y teclado
- [ ] Sin dependencias nuevas
- [ ] `carousel.js` es una clase, con hook `js-carousel`, importado desde `main.js`
- [ ] Botones con nombre accesible; `disabled` en los extremos
- [ ] Sin autoavance y sin diapositivas duplicadas en el DOM
- [ ] `prefers-reduced-motion` respetado
- [ ] `alt=''` en las imágenes; ni un `alt="s"`
- [ ] Anillo con `--color-line`; ni un hex en el marcado
- [ ] El anillo **gira** (`transform`, 5s lineal infinita), visible siempre y no sólo en hover
- [ ] Con `prefers-reduced-motion` el giro para **y el anillo se sigue viendo**
- [ ] Imágenes que faltan, declaradas como pendientes
- [ ] Comprobado servido a 375px y en escritorio, con teclado y sin ratón
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` — `product-carousel` pasa a `hecho` o `mejorado`, y «nada declarado como hecho está roto»
- [ ] REVIEW de Dexia ✅

## Fuera de alcance

- `hero-slider`: **sigue descartado**. No lo toques.
- Convertir en carrusel ningún otro componente. Esta reversión es de una pieza.

## 💬 Hilo

> **[2026-09-07 00:00] clia:** creo la TASK a partir de DECISION-002. 🟡 porque toca un mixin compartido y añade un módulo, pero no `@theme` —el anillo usa `--color-line`, que ya existe con ese valor exacto—. Si en el camino aparece un token que falte, se declara aquí antes de tocarlo.
>
> **[2026-09-07 00:00] clia:** dos cosas del origen que son defectos y **no** se migran: el `alt` basura y las 12 diapositivas duplicadas del bucle. Están explicadas arriba para que no parezca un olvido.
>
> **[2026-09-08 15:35] clia:** ⚠️ **corrijo la TASK**: el anillo del origen **no es estático, gira** —`transform: rotate(0→360deg)`, 5s lineales infinitas, siempre visible—. Está en el punto 6 con sus valores. Cuidado con confundirla con el borde punteado de la tarjeta de producto de TASK-006: se parecen y son distintas —allí desfilan los guiones y sólo en hover; aquí gira el anillo entero y siempre—.

