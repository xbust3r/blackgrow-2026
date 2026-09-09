---
tipo: TASK
id: TASK-008
titulo: Jerarquía de titulares — el nivel lo decide la página, no el componente
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: EN_REVISION
rama: feat/TASK-008-jerarquia-de-titulares
area: components
criticidad: "🟡"
relacionado: [TASK-006]
creado: 2026-09-09
actualizado: 2026-09-09
---

# TASK-008 — Jerarquía de titulares

## Contexto

Esto es una plantilla que se va a integrar en WordPress. Lo que sobrevive a esa integración no son las clases de Tailwind: es **la estructura semántica**. Un `h3` colgando de un `h1` sin `h2` de por medio viaja tal cual al tema, y allí se audita.

Auditado sobre las 22 páginas construidas.

### Lo que está bien

| | |
| --- | --- |
| Un solo `h1` por página | ✅ 21 de 22 |
| `h1` con texto propio y distinto | ✅ 22 textos distintos |
| Titulares vacíos | ✅ ninguno |
| `<title>` y `<meta description>` únicos | ✅ 22 y 22 |
| Imágenes sin `alt` | ✅ ninguna |

### El defecto: 7 páginas saltan de `h1` a `h3`

```
baby-shop.html           h1 → h3 (nombre de producto)
blog.html                h1 → h3 (título de artículo)
blog-left-sidebar.html   h1 → h3 (Categories)
blog-no-sidebar.html     h1 → h3 (título de artículo)
blog-masonry.html        h1 → h3 (título de artículo)
faq.html                 h1 → h3 (pregunta)
kids-store.html          h1 → h3 (Title)
```

**La causa no es de las páginas, es de los componentes.** El proyecto ya tiene el mecanismo bueno y está **a medio aplicar**: `+heading(text, level)`, `photoHero(kind, level)`, `framedHero(kind, level)` y `productDetails(level)` **sí** aceptan el nivel. Los de tarjeta y sección **lo fijan**:

| Componente | Nivel clavado |
| --- | --- |
| `product-card.pug:35` | `h3` |
| `blog-card.pug:23,53` | `h4` y `h3` |
| `latests-articles-3.pug:20` | `h3` |
| `icon-with-text.pug:7` | `h3` |
| `title-with-steps.pug:15` | `h3` |
| `blog-sidebar.pug:5,15,25` | `h3` |
| `google-map.pug:7` | `h3` |
| `comment-list.pug:2` · `comment-form.pug:5` | `h3` |

Cuando una página pone su `h1` y debajo suelta una de esas tarjetas sin un `h2` de sección en medio, salta.

Es exactamente la regla que `AGENTS.md` ya declara y que quedó a medias:

> *«El origen usa `h5` para el nombre de un producto y `h3` para el título de una sección porque le cuadraba el tamaño. En el destino **el nivel lo decide la estructura** y el tamaño lo pone `text-h*`.»*

El **tamaño** sí se desacopló —hay `h2` con `text-h3`, y está bien—. El **nivel** no.

## Pedido

**Que el nivel lo decida quien coloca el componente, no el componente.**

Los mixins de la tabla pasan a aceptar el nivel como parámetro, con un valor por defecto sensato, igual que ya hacen `+heading` y los heros:

```pug
mixin productCard(product, shop = false, level = 'h3')
    …
    #{level}(class='mt-1.5 text-h4 font-normal text-ink')
```

Y cada página elige el que le toca por su estructura. **El tamaño no cambia**: lo sigue poniendo `text-h*`, así que visualmente no debe moverse nada.

Después, las 7 páginas del salto se resuelven **eligiendo**, y hay dos formas legítimas según el caso:

1. **Bajar el nivel del componente** a `h2` cuando cuelga directo del `h1`. Es lo que toca en `faq` —las preguntas son las secciones de la página— y en los listados de blog, donde cada artículo es una sección.
2. **Añadir el `h2` de sección que falta** cuando el bloque sí es una sección con nombre. En `baby-shop` y `kids-store`, un grupo de productos debería tener su título de sección; si el diseño no lo muestra, va con `sr-only`.

**Decide caso por caso y explícalo en el hilo.** No apliques la misma a las siete.

## Dos cosas que NO son defectos

- **`components.html` tiene 3 `h1`.** Es el catálogo interno de componentes, no una página pública ni del tema. Se queda.
- **El `h1` de `cart.html` es `sr-only`.** Correcto: la página no muestra un título visible y aun así necesita uno. Déjalo, pero anótalo — en WordPress el `h1` de un archivo suele ser el título del archivo, y quien integre debe saber que ahí hay uno oculto a propósito.

## Fuera de alcance

- El `noindex` de `head-base.pug`. Es deliberado mientras el contenido sea relleno y los assets no tengan licencia.
- `canonical`, `robots.txt`, Open Graph y datos estructurados: los pone WordPress al integrar, no la plantilla.
- Cambiar tamaños o apariencia. **Si algo se ve distinto, está mal hecho.**

## Criterios de aceptación

- [x] Cero saltos de nivel en las 22 páginas — comprobado sobre el HTML construido, no a ojo
- [x] Los mixins de la tabla aceptan el nivel; ninguno lo fija
- [x] Un solo `h1` por página pública (`components.html` exento)
- [x] **Nada cambia visualmente**: el tamaño lo sigue poniendo `text-h*`
- [x] Cada uno de los 7 casos, resuelto con su motivo en el hilo
- [x] Comprobado servido a 375px y en escritorio
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [x] `pnpm validate:origen` sin regresiones
- [ ] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-09 12:00] clia:** creo la TASK tras auditar las 22 páginas construidas. Lo importante del diagnóstico: **el mecanismo ya existe en el proyecto** —`+heading` y los heros parametrizan el nivel— y sólo falta aplicarlo a los componentes de tarjeta. No hay que inventar nada, hay que terminar lo empezado.
>
> **[2026-09-09 12:00] clia:** el criterio para revisarla es raro y conviene decirlo: **una entrega correcta no cambia ni un píxel**. Si al comparar antes y después algo se mueve de tamaño, es que se tocó `text-h*` en vez del nivel, y eso es justo lo contrario de lo que pide la TASK.
>
> **[2026-09-09 13:00] ania:** tomo la tarea en rama `feat/TASK-008-jerarquia-de-titulares`. Procedo con la auditoría exacta de los 7 saltos y la parametrización de nivel en los mixins correspondientes, respetando estrictamente las clases `text-h*` para garantizar 0 cambios visuales.
>
> **[2026-09-09 13:10] ania:** implementación completada y verificada en `feat/TASK-008-jerarquia-de-titulares` (commit `3e336ef`).
>
> ### 1. Parametrización de los mixins (sin alterar ninguna clase visual `text-h*`):
> - `src/components/product-card.pug`: `mixin productCard(product, shop = false, level = 'h3')` usando `#{level}` en `mt-1.5 text-h4 font-normal text-ink`.
> - `src/components/products-cards-4.pug`: `mixin productsCards4(level = 'h3')` delegando `level` a `productCard`.
> - `src/components/blog-card.pug`: `mixin blogCard(post = {}, level = 'h3')` usando `#{level}` en `mt-2 text-h3 font-medium text-ink` (link) y `text-h3 font-medium text-ink` (estándar).
> - `src/components/latests-articles-3.pug`: `mixin articleCard(index, level = 'h3')` y `mixin latestsArticles3(level = 'h3')`.
> - `src/components/icon-with-text.pug`: `mixin iconWithText(item, level = 'h3')` y `mixin featuresSection(level = 'h2', itemLevel = 'h3', sectionTitle = 'Features')` con `h2.sr-only`.
> - `src/components/title-with-steps.pug`: `mixin stepCard(title, index, level = 'h3')` y `mixin titleWithSteps(headingLevel = 'h2', itemLevel = 'h3')`.
> - `src/components/blog-sidebar.pug`: `mixin blogCategories(level = 'h2')`, `mixin blogRecentPosts(level = 'h2', postLevel = 'h3')`, `mixin blogSocial(level = 'h2')`, `mixin blogSidebar(level = 'h2', postLevel = 'h3')`.
> - `src/components/google-map.pug`: `mixin googleMap(level = 'h3')`.
> - `src/components/comment-list.pug`: `mixin commentList(level = 'h3', authorLevel = 'h4')`.
> - `src/components/comment-form.pug`: `mixin commentForm(level = 'h3')`.
> - `src/components/blog-list-template.pug`: `mixin blogListTemplate(sidebar = 'right', cardLevel = 'h2', sidebarLevel = 'h2', sidebarPostLevel = 'h3')`.
> - `src/components/shop-list.pug`: `mixin shopList(..., productLevel = 'h3')`.
>
> ### 2. Resolución caso por caso de las 7 páginas:
> 1. **`faq.pug`**: Bajar nivel de preguntas a `h2` (`h2.text-lg.font-semibold.uppercase.tracking-heading.text-ink`).
>    - *Motivo*: Las preguntas son las secciones temáticas directas del documento que cuelgan del `h1` general ("FAQ Page").
> 2. **`blog.pug`**: En `blogListTemplate`, las tarjetas de artículo pasan a `h2` y la barra lateral a `h2` (Categories, Recent Posts, Follow Us) con `h3` en los posts recientes.
>    - *Motivo*: Cada entrada de blog es un artículo semántico independiente que cuelga directamente del `h1` ("Our Blog").
> 3. **`blog-left-sidebar.pug`**: Misma resolución con barra lateral a la izquierda. Al presentarse antes en el DOM, `Categories` (`h2`) y `Recent Posts` (`h2`) evitan el salto desde `h1`.
> 4. **`blog-no-sidebar.pug`**: Las tarjetas de artículo cuelgan como `h2` directos de `h1` ("Our Blog").
> 5. **`blog-masonry.pug`**: Las tarjetas en la rejilla masonry se configuran con `+blogCard(post, 'h2')`.
>    - *Motivo*: Cada tarjeta es un artículo directo bajo el `h1` ("Blog Masonry").
> 6. **`baby-shop.pug`**: Se añade titular de sección `h2(class='sr-only') Featured Products` previo a `products-cards-4`.
>    - *Motivo*: El bloque de productos conforma una sección con entidad propia; la etiqueta accesible `sr-only` provee el nivel `h2` sin impacto visual y aloja los nombres de producto en `h3`.
> 7. **`kids-store.pug`**: `icon-with-text` provee su encabezado accesible `h2.sr-only Features` para sus 3 items `h3`, y se añade `h2(class='sr-only') Featured Products` para los productos `h3`.
>    - *Motivo*: Ambas son secciones con entidad propia con elementos subordinados; la estructura `h1` -> `h2: Features` (`h3`) -> `h2: Featured Products` (`h3`) -> `h2: Happy Customers` es impecable.
>
> ### 3. Verificaciones realizadas:
> - **Auditoría de jerarquía de encabezados**: Cero saltos detectados en las 22 páginas de `dist/`.
> - **Inspección visual y computada (Chrome CDP)**:
>   - FAQ `h2`: `18px`, `font-weight: 600`, `text-transform: uppercase`, `line-height: 28px` (idéntico a la clase `text-lg font-semibold`).
>   - Blog `h2`: `24px`, `font-weight: 500` (idéntico a `text-h3 font-medium`).
>   - `sr-only` en Baby Shop y Kids Store: `rect: 0x0`, `clip: rect(0, 0, 0, 0)`, cero píxeles de desplazamiento visual.
>   - Evidencias capturadas en `docs/comms/evidence/`: `task-008-baby-shop-desktop.png`, `task-008-baby-shop-mobile.png`, `task-008-blog-desktop.png`, `task-008-blog-mobile.png`, `task-008-faq-desktop.png`, `task-008-faq-mobile.png`.
> - **Suite de comprobaciones**:
>   - `pnpm optimize` ✅
>   - `pnpm lint` ✅ (83 archivos Pug en verde)
>   - `pnpm validate` ✅
>   - `pnpm build` ✅
>   - `pnpm verify:render` ✅ (0 FALLOS en 22 páginas)
>   - `pnpm validate:origen` ✅ (100% 20/20 listos)
>
> Solicito REVIEW formal a @dexia.

