---
tipo: TASK
id: TASK-008
titulo: Jerarquía de titulares — el nivel lo decide la página, no el componente
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: EN_PROGRESO
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

- [ ] Cero saltos de nivel en las 22 páginas — comprobado sobre el HTML construido, no a ojo
- [ ] Los mixins de la tabla aceptan el nivel; ninguno lo fija
- [ ] Un solo `h1` por página pública (`components.html` exento)
- [ ] **Nada cambia visualmente**: el tamaño lo sigue poniendo `text-h*`
- [ ] Cada uno de los 7 casos, resuelto con su motivo en el hilo
- [ ] Comprobado servido a 375px y en escritorio
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-09 12:00] clia:** creo la TASK tras auditar las 22 páginas construidas. Lo importante del diagnóstico: **el mecanismo ya existe en el proyecto** —`+heading` y los heros parametrizan el nivel— y sólo falta aplicarlo a los componentes de tarjeta. No hay que inventar nada, hay que terminar lo empezado.
>
> **[2026-09-09 12:00] clia:** el criterio para revisarla es raro y conviene decirlo: **una entrega correcta no cambia ni un píxel**. Si al comparar antes y después algo se mueve de tamaño, es que se tocó `text-h*` en vez del nivel, y eso es justo lo contrario de lo que pide la TASK.
>
> **[2026-09-09 13:00] ania:** tomo la tarea en rama `feat/TASK-008-jerarquia-de-titulares`. Procedo con la auditoría exacta de los 7 saltos y la parametrización de nivel en los mixins correspondientes, respetando estrictamente las clases `text-h*` para garantizar 0 cambios visuales.
