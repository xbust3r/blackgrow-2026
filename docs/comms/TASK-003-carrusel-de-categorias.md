---
tipo: TASK
id: TASK-003
titulo: Carrusel de categorías con scroll-snap
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: MERGEADA
area: components
criticidad: "🟡"
relacionado: [DECISION-002, TASK-001]
creado: 2026-09-07
actualizado: 2026-09-08
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

- [x] Las 8 categorías del origen, con sus nombres reales
- [x] La rejilla sigue disponible como variante, con la parametrización razonada en el hilo
- [x] Funciona sin JavaScript: fila desplazable con dedo, rueda y teclado
- [x] Sin dependencias nuevas
- [x] `carousel.js` es una clase, con hook `js-carousel`, importado desde `main.js`
- [x] Botones con nombre accesible; `disabled` en los extremos
- [x] Sin autoavance y sin diapositivas duplicadas en el DOM
- [x] `prefers-reduced-motion` respetado
- [x] `alt=''` en las imágenes; ni un `alt="s"`
- [x] Anillo con `--color-line`; ni un hex en el marcado
- [x] El anillo **gira** (`transform`, 5s lineal infinita), visible siempre y no sólo en hover
- [x] Con `prefers-reduced-motion` el giro para **y el anillo se sigue viendo**
- [x] Imágenes que faltan, declaradas como pendientes
- [x] Comprobado servido a 375px y en escritorio, con teclado y sin ratón
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [x] `pnpm validate:origen` — `product-carousel` pasa a `hecho` o `mejorado`, y «nada declarado como hecho está roto»
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
>
> **[2026-09-08 17:55] ania:** Tomo la tarea y paso a `EN_PROGRESO`.
> 1. **Parametrización razonada:** Se opta por un único mixin con opción `mixin categories(variant = 'carousel')` (aceptando `'carousel'` por defecto y `'grid'` como variante estática), siguiendo exactamente el patrón establecido en `blog-list-template.pug` (`mixin blogListTemplate(sidebar = 'right')`).
>    - **Por qué un mixin con opción y no dos mixins:**
>      a) **Fuente única de verdad para los datos:** Las 8 categorías (Cribs, Beds, Toys, Other, Specials, Carriage, New, Bottles), sus enlaces a `./cart.html` y sus imágenes se declaran una sola vez en un array y son compartidas por ambas representaciones. Dos mixins provocarían duplicación de datos o requerirían un archivo de datos intermedio innecesario.
>      b) **Consistencia con el resto del proyecto:** La parametrización declarativa (`+categories('carousel')` / `+categories('grid')`) es idéntica a `+blogListTemplate('right')` / `+blogListTemplate('left')` y `+productCard(p, shop = false)`.
>      c) **Invocación transparente:** Las páginas que la consumen (`index.pug`, `kids-store.pug`, `components.pug`) invocan `+categories('carousel')`, y `components.pug` muestra además la variante `+categories('grid')`.
> 2. **Mecanismo sin dependencias:** Se utiliza `scroll-snap-type: x mandatory` con `snap-x snap-mandatory` y `snap-start`, con `overflow-x: auto` nativo accesible por teclado (`tabindex='0'`, `role='region'`, `aria-label='Categories list'`). Sin JS, es 100% navegable con rueda, gestos táctiles y flechas de teclado.
> 3. **Módulo `src/scripts/components/carousel.js`:** Clase `Carousel` asociada al hook `js-carousel`. Controla botones anterior/siguiente con nombres accesibles («Previous categories» / «Next categories»), gestionando el estado con el atributo estándar `disabled` en los límites de scroll. Detecta `prefers-reduced-motion` para conmutar `behavior: 'auto'` vs `'smooth'`.
> 4. **Anillo animado (`category-ring-rotation`):** `@keyframes category-ring-rotation` en `src/styles/styles.css` con rotación 360deg a 5s lineales infinitas sobre el centro del SVG. Envoltorio con `color: var(--color-line)` y trazo punteado `stroke-dasharray='10' stroke-width='4'`. Bajo `prefers-reduced-motion`, el `@media` base congela la rotación y el anillo permanece nítidamente visible.
> 5. **Pendientes de assets:** Registrado que las 8 imágenes usan temporalmente `category.webp` y se declaran en `assets-pendientes.json`.
>
> **[2026-09-08 18:05] ania:** Entrega completada y lista para revisión. Estado a `EN_REVISION`.
>
> 1. **Implementación:**
>    - `src/components/categories.pug`: implementado `mixin categories(variant = 'carousel')` con soporte para `'carousel'` (por defecto) y `'grid'` (variante estática con las 8 categorías visibles simultáneamente). Incluye las 8 categorías del origen con sus nombres exactos (Cribs, Beds, Toys, Other, Specials, Carriage, New, Bottles), enlaces a `./cart.html`, `alt=''` para imágenes decorativas y el anillo punteado SVG con `category-ring`.
>    - `src/styles/styles.css`: declarada `@keyframes category-ring-rotation` (5s linear infinite 0→360deg) y `@utility category-ring` usando el token `var(--color-line)` con `opacity: 1` permanente. Al entrar `prefers-reduced-motion`, el giro se cancela inmediatamente manteniendo el anillo visible.
>    - `src/scripts/components/carousel.js`: clase `Carousel` con hook `js-carousel`. Gestiona botones anterior y siguiente con nombres accesibles («Previous categories» / «Next categories»), aplicando el atributo nativo `disabled` al alcanzar los límites izquierdo (`scrollLeft <= 2`) o derecho (`scrollLeft + clientWidth >= scrollWidth - 2`). Detecta `prefers-reduced-motion` para desplazar con `behavior: 'auto'` o `'smooth'`. Importado en `main.js`.
>    - Páginas actualizadas: `src/pages/index.pug` y `src/pages/kids-store.pug` invocan `+categories('carousel')`; `src/pages/components.pug` muestra tanto `+categories('carousel')` como `+categories('grid')`.
>    - Catálogo y pendientes: `docs/migracion/origen-comportamientos.json` actualizado (`product-carousel` a `mejorado` y `category-ring-rotation` a `hecho`), alcanzando el **100% de cobertura (20/20)** en el alcance actual. Anotado en `docs/migracion/assets-pendientes.json` el uso temporal de `category.webp` para las 8 categorías.
>
> 2. **Evidencia visual servida:**
>    - Escritorio (1440px): `docs/comms/evidence/task-003-desktop-carousel.png` (carrusel con 6 elementos visibles, botón previo deshabilitado, botón siguiente activo, anillos giratorios visibles).
>    - Móvil (375px): `docs/comms/evidence/task-003-mobile-carousel.png` (2 categorías centradas, botón de avance al borde sin solapamiento, touch targets y tipografía Jost nítida).
>    - Variantes en components: `docs/comms/evidence/task-003-components-variants.png` (carrusel arriba y rejilla de 8 abajo en la misma página).
>
> 3. **Salida real completa de la suite:**
>
> ```text
> $ pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm verify:render && pnpm validate:origen
> $ node plugins/convertWebp.js
> Start image optimization
> ------------------------------------------------
> ✅  Completed in 0.01s
>    • Processed: 0
>    • Skipped:  33
> ------------------------------------------------
> $ run-p lint:pug lint:css lint:js
> $ stylelint "src/**/*.css" --fix --cache --cache-location .stylelintcache
> $ markuplint "src/**/*.pug"
> $ eslint "src/**/*.js" --fix --cache --cache-location .eslintcache
> <markuplint> passed (79 files)
> $ node plugins/validate-assets.js
> 🔍 Iniciando validación estricta de assets...
> ✔ Todos los assets existen. Procediendo...
> $ vite build
> vite v8.1.5 building for production...
> ✓ 112 modules transformed.
> rendering chunks...
> computing gzip size...
> dist/index.html                     24.03 kB │ gzip:  4.68 kB
> dist/kids-store.html                19.06 kB │ gzip:  3.87 kB
> dist/components.html                48.40 kB │ gzip:  7.68 kB
> dist/cart.html                      22.25 kB │ gzip:  4.40 kB
> dist/assets/styles-D53P5ZlK.css     22.68 kB │ gzip:  5.23 kB
> dist/assets/main-BF7R716p.js        17.92 kB │ gzip:  5.58 kB
> ✓ built in 594ms
> ------------------------------------------------
> Comprobación de render
> ------------------------------------------------
> Páginas revisadas: 22  ·  assets medidos: 30
> 0 FALLOS
> $ node plugins/validate-origen.js
> Validador · playgrow origen
> https://playgrow.qodeinteractive.com/  ·  catálogo revisado 2026-09-08
> ------------------------------------------------
> CABECERA
>   ★ Menú móvil · mobile-menu
>   ✔ Cabecera fija al hacer scroll · header-sticky
>   ★ Buscador que cubre la cabecera · search-overlay
>   ◑ Panel lateral del carrito · cart-side-area
>   ★ Modal de suscripción · subscribe-popup
> FORMULARIOS
>   ★ Validación de formularios · form-validation
>   ✔ Filtros de entrada · input-masks
> GLOBAL
>   ✔ Botón volver arriba · back-to-top
> HOME
>   – Slider del hero · hero-slider
>   ★ Carrusel horizontal · product-carousel
>   ★ Galería con lightbox · gallery-lightbox
>   ✔ Aparición al hacer scroll · scroll-reveal
>   ✔ Animación de rebote · jump-animation
>   – Parallax con el cursor · parallax-cursor
>   ✔ Showcase interactivo de enlaces · interactive-link-showcase
>   ✔ Anillo punteado giratorio de las categorías · category-ring-rotation
> TIENDA
>   ◑ Selector de orden · shop-sorting
>   ◑ Paginación · shop-pagination
>   ◑ Añadir al carrito sin recargar · ajax-add-to-cart
>   ✔ Borde punteado animado de la tarjeta de producto · product-card-dashed-border
> FICHA-PRODUCTO
>   ✔ Galería de la ficha · product-gallery
>   ✔ Zoom de la imagen · product-zoom
>   ★ Lightbox de la ficha · product-lightbox
>   ★ Selector de cantidad · quantity-stepper
>   ★ Pestañas de la ficha · product-tabs
>   ✔ Productos relacionados · related-products
> CARRITO
>   ◑ Página de carrito · cart-page
> ------------------------------------------------
> 20 listos  ·  0 pendientes  ·  5 en otra fase  ·  2 descartados  ·  27 en total
> Cobertura dentro del alcance actual: 100% (20/20)
> Nada declarado como hecho está roto.
> ```
>
> Solicito REVIEW a Dexia.
>
> **[2026-09-08 23:15] dexia:** ❌ REVIEW-005 sobre `816b25d`. Datos, anillo, botones, finitud y clase del carrusel están bien. Falta anular `scroll-smooth` bajo `prefers-reduced-motion`; `behavior: 'auto'` sólo cubre el clic controlado por JS.
>
> **[2026-09-08 23:25] ania:** ✅ Corregido. Se añade `motion-reduce:scroll-auto` a `.js-carousel-track` en `src/components/categories.pug`.
>
> Comprobado con emulación activa de `prefers-reduced-motion: reduce`:
> ```json
> {
>   "scrollBehavior": "auto",
>   "hasMotionReduceClass": true
> }
> ```
> Capturas actualizadas en `docs/comms/evidence/task-003-*.png`.
>
> Suite de verificación en verde:
> - `pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm verify:render && pnpm validate:origen` (0 errores, 20/20 origen).
>
> Solicito re-review a Dexia.
>
> **[2026-09-08 23:35] dexia:** ✅ re-review de `2ceb302` aprobado. `motion-reduce:scroll-auto` cubre también el scroll nativo; los criterios de TASK-003 y la evidencia quedan completos. Gate 🟡 cumplido.
>
> **[2026-09-09 09:47] ania:** 🟩 Mergeada a `main` tras aprobación formal en REVIEW-005 e instrucción de Miguel.




