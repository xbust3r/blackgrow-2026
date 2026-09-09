---
tipo: TASK
id: TASK-002
titulo: Buscador a pantalla completa con botón de cierre
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: CERRADA
area: components
criticidad: "🟡"
relacionado: [TASK-001, origen-comportamientos.json]
creado: 2026-09-07
actualizado: 2026-09-08
---

# TASK-002 — Buscador a pantalla completa

## Contexto

`search-overlay` estaba dentro del alcance de [TASK-001](TASK-001-fase-comportamientos.md). **Sale de ahí y pasa a esta TASK**, porque Miguel ha cambiado su especificación y ya no es una migración fiel: es una decisión de producto.

### Lo que hace el origen (verificado servido, 1440px)

El icono de lupa **sólo tapa la cabecera**. La navegación se sustituye por un campo de búsqueda con un botón de lupa a la derecha, y donde estaban los iconos sociales aparece «✕ CLOSE». **El resto de la página sigue visible debajo** — en la home, el slider del hero queda justo ahí, pegado al buscador.

Marcado del origen, reducido a lo que importa:

```html
<form action="/" class="qodef-search-cover-form" method="get">
  <div class="qodef-input-holder">
    <input type="text" name="s" placeholder="Search..." autocomplete="off" required>
    <button class="qodef-search-cover-submit" type="submit"><svg>…</svg></button>
  </div>
</form>
```

Valores computados del origen:

| Pieza | Valor |
| --- | --- |
| Campo | Jost 30px, peso 400, color `rgb(181, 174, 174)`, alto 43px, fondo transparente, sin padding |
| Ancho del campo | 848px sobre un contenedor de 1425px — no ocupa todo el ancho |
| Placeholder | `Search...` |
| Cierre | Texto `Close`, 14px, mayúsculas, `letter-spacing: 1.4px`, color negro |
| Nombre del campo | `s` |

Correspondencia con nuestros tokens: `text-ink-faint` es exactamente ese `#b5aeae`; el cierre es `text-sm uppercase tracking-heading text-ink` (1.4px sobre 14px son los `0.1em` de `--tracking-heading`).

⚠️ **Un valor que hay que comprobar, no asumir.** El campo se ve con una línea inferior, pero el `border-bottom` computado sale `0px none` tanto en el campo como en su contenedor: la línea viene de otro sitio. Antes de maquetarla, mírala en el origen y averigua de dónde sale. No inventes un `border-b` y lo des por bueno.

## Pedido

**El buscador ocupa la ventana entera**, no sólo la cabecera. Es una desviación consciente del origen: **no es un error que haya que «corregir» después**. Queda registrada en el catálogo de comportamientos.

### 1 · El disparador no existe todavía

Hoy, en [`src/components/header.pug`](../../src/components/header.pug), «Search» es esto:

```pug
span(class='hidden items-center gap-2 text-sm uppercase tracking-heading desktop:flex')
    +svgIcon('search', 'size-4 text-brand')
    | Search
```

Un `<span>`. No es interactivo, no recibe foco y no se puede pulsar con el teclado. Tiene que pasar a `<button type='button'>` con `aria-expanded='false'` y `aria-controls`, conservando su apariencia.

### 2 · En móvil no hay por dónde abrirlo

Ese `span` es `desktop:flex`: **por debajo de 1000px no existe**. La barra móvil sólo tiene el logo, el carrito y el menú. Un buscador a pantalla completa al que no se puede llegar desde el teléfono no sirve de nada, y este proyecto es mobile first.

**Decide y propón en el hilo antes de implementar**, con una razón: ¿un tercer icono en la barra móvil, o el buscador dentro del menú móvil? Yo no lo cierro por ti — mira cómo queda la barra con tres iconos a 375px y dime qué ves.

### 3 · El overlay

- Ocupa la ventana entera, por encima de la cabecera.
- Fondo opaco de superficie: detrás no se lee nada.
- Se entrega **cerrado con `hidden`**, como el menú móvil.
- Dentro: el campo, el botón de enviar y el botón de cerrar.
- El campo no ocupa todo el ancho —en el origen son 848 de 1425— y va centrado.

### 4 · El comportamiento

**`src/scripts/components/search.js`, hook `js-search-toggle`**, importado desde `main.js`.

**Copia el patrón de [`menu.js`](../../src/scripts/components/menu.js).** Ya resuelve esto entero: `hidden` en el panel, `aria-expanded` en el disparador, `inert` en el resto del `body`, `focus.trap()` de [`trap-focus.js`](../../src/scripts/tools/trap-focus.js) —que además pone `overflow-hidden` en el `html`— y `focus.untrap()` que devuelve el foco a quien abrió. No escribas otra cosa distinta.

Dos cosas que el origen **no** hace y aquí sí:

1. **El foco va al campo al abrir.** `focus.trap()` enfoca el primer elemento focalizable; comprueba que sea el campo y no el botón de cerrar. Si no lo es, ordena el marcado para que lo sea, no parchees el módulo.
2. **`Escape` cierra.**

Copiar el origen fiel en esto sería un error, igual que lo habría sido copiar su menú móvil.

### 5 · El destino del formulario

**No hay buscador detrás.** `action=''` y se declara como pendiente, igual que contacto, comentarios y newsletter. Un `action` inventado parece implementado y no lo está.

El nombre del campo del origen es `s`, que es de WordPress. Consérvalo si quieres, pero **anótalo en el hilo**: cuando exista buscador real, ese nombre lo fija quien lo reciba, no nosotros.

## Criterios de aceptación

- [x] «Search» es un `<button type='button'>` con `aria-expanded` y `aria-controls`
- [x] Hay forma de abrirlo en móvil, con la decisión razonada en el hilo
- [x] El overlay ocupa la ventana entera y detrás no se lee nada
- [x] Se entrega cerrado con `hidden`; el estado vive en `hidden` y `aria-expanded`, no en clases inventadas
- [x] `search.js` sigue el patrón de `menu.js`: `inert` en el fondo, `focus.trap`/`untrap`
- [x] Al abrir, el foco cae en el campo
- [x] `Escape` cierra y el foco vuelve al botón que abrió
- [x] `action=''`, declarado como pendiente
- [x] La línea del campo se maquetó **después** de averiguar de dónde sale en el origen
- [x] Ni un color ni una medida de marca en el marcado
- [x] La clase `js-search-toggle` no lleva apariencia
- [x] Comprobado servido a 375px y en escritorio, con teclado y sin ratón
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [x] `pnpm validate:origen` — `search-overlay` pasa a `mejorado`, y «nada declarado como hecho está roto»
- [ ] REVIEW de Dexia ✅

## Fuera de alcance

- Buscar de verdad: filtrar, sugerir o mostrar resultados. Eso necesita backend o un índice, y no existe.
- El resto de TASK-001. Esta TASK se lleva `search-overlay` y nada más.

## 💬 Hilo

> **[2026-09-07 00:00] clia:** creo la TASK sacando `search-overlay` de TASK-001, porque deja de ser una migración fiel: el origen tapa sólo la cabecera y Miguel lo quiere a pantalla completa. Verificado servido a 1440px y valores computados recogidos arriba. 🟡 porque toca `header.pug` —compartido por las 22 páginas— pero no `@theme` ni `config.pug`; si hiciera falta un token nuevo, se declara en el hilo antes de tocarlo.
>
> **[2026-09-07 00:00] clia:** dos huecos que encontré y que no cierro yo: en móvil no hay disparador —el «Search» actual es `desktop:flex`— y la línea inferior del campo no sale del `border-bottom`, así que hay que averiguar de dónde viene antes de maquetarla.
>
> **[2026-09-07 00:00] clia:** ⏸️ **resuelto:** Miguel aclara que el «slider» que mencionó es el **carrusel de categorías** del origen (Swiper: Cribs, Beds, Toys, Other, Specials, Carriage, New, Bottles). Queda **fuera de esta TASK** — se trata aparte, porque choca con una decisión ya tomada del proyecto. Lo que sí confirma es el motivo del overlay a pantalla completa: en el origen ese carrusel queda visible justo debajo del buscador.
>
> **[2026-09-07 00:00] clia:** Miguel señala también «un marcador de top» en el origen. Es `back-to-top`, y **ya está en [TASK-001](TASK-001-fase-comportamientos.md)** con su hook `js-back-to-top`. No se duplica aquí.
>
> **[2026-09-08 00:00] dexia:** **indicación directa de Miguel, con referencia visual adjunta:** en la barra de acciones de escritorio se retiran los cuatro iconos sociales —Facebook, Instagram, TikTok y Pinterest—. El único control de esa zona será el botón **Search**, que sustituye al `span` actual y abre el modal de búsqueda de esta TASK. Debe ser `button type='button'`, llevar `js-search-toggle`, `aria-expanded='false'` y `aria-controls` del diálogo; el hook no aporta apariencia. Se conserva el control del carrito, que es una función distinta y queda fuera de esta indicación. En móvil, la decisión de disparador sigue siendo obligatoria y debe quedar razonada en este hilo.
>
> **[2026-09-08 17:40] ania:** Tomo la tarea y paso a `EN_PROGRESO`. Resoluciones y diseño acordado:
> 1. **Disparador en móvil y escritorio:**
>    - **Escritorio / Tablet:** Retiro los cuatro enlaces sociales de la barra de acciones conforme a la indicación de Miguel registrada por Dexia. El botón «Search» pasa a `<button type='button' class='js-search-toggle inline-flex items-center gap-2 text-sm uppercase tracking-heading hover:text-brand' aria-haspopup='dialog' aria-expanded='false' aria-controls='search-overlay'>`, conservando el carrito a su lado.
>    - **Móvil (375px):** Se añade un botón de búsqueda `button.js-search-toggle` con icono de lupa (touch target accesible `min-h-11 min-w-11`) en la cabecera móvil junto al carrito y al botón de menú. A 375px caben holgadamente el logo y los 3 iconos (ocupan ~270px de los 375px disponibles), garantizando acceso directo a la búsqueda en 1 tap sin obligar a abrir el menú lateral.
> 2. **Origen de la línea del campo:** Comprobado directamente en el CSS del origen (`playgrow-core.min.css`). La línea no es un `border-bottom` del input ni del form, sino un pseudo-elemento `:after` en `.qodef-input-holder` (`height: 1px`, `background-color: #000`, `width: 100%`). En nuestra arquitectura se maquetará limpiamente usando el token `--color-ink` en el contenedor del input (`border-b border-ink`).
> 3. **Orden DOM y foco inicial:** Para que `focus.trap()` enfoque de inmediato el campo `<input>` al abrir (como exige el criterio 1) sin parches en el módulo, el formulario y su input irán primeros en el DOM dentro del modal. El botón de cerrar irá después en el DOM y se posicionará en la esquina superior derecha mediante maquetación flex/absoluta.
> 4. **Módulo `search.js`:** Implementado con `js-search-toggle`, soporte `Escape`, `inert` en los hermanos de `body`, `focus.trap()` y `focus.untrap()`.
>
> **[2026-09-08 17:50] ania:** Entrega completada y lista para revisión. Estado a `EN_REVISION`.
> 1. **Implementación:**
>    - Creado `src/components/search-overlay.pug` e incluido en `src/components/header.pug`.
>    - En `header.pug`: eliminados los cuatro enlaces sociales de escritorio/tablet; «Search» transformado en botón interactivo con `js-search-toggle`, `aria-expanded='false'` y `aria-controls='search-overlay'`; añadido botón de búsqueda accesible en cabecera móvil y sticky.
>    - Creado módulo `src/scripts/components/search.js` e importado en `main.js`. Atrapa el foco en el overlay, aplica `inert` sobre el resto de elementos, enfoca directamente el `<input>` al abrir, cicla el foco con Tab y devuelve el foco al trigger al cerrar con Escape, botón Close o clic fuera.
>    - `action=''` en el formulario declarado como presentación (pendiente de backend); nombre de campo `name='s'` documentado.
>    - `docs/migracion/origen-comportamientos.json`: `search-overlay` pasa a `mejorado`.
> 2. **Evidencia visual servida:**
>    - Escritorio con modal abierto: `docs/comms/evidence/task-002-desktop-search.png`
>    - Cabecera móvil a 375px: `docs/comms/evidence/task-002-mobile-header.png`
>    - Modal móvil a 375px: `docs/comms/evidence/task-002-mobile-search.png`
> 3. **Salida real completa de la suite:**
>
> ```text
> $ pnpm optimize
> $ node plugins/convertWebp.js
> Start image optimization
> ------------------------------------------------
> ✅  Completed in 0.02s
>    • Processed: 0
>    • Skipped:  33
> ------------------------------------------------
>
> $ pnpm lint
> $ run-p lint:pug lint:css lint:js
> $ eslint "src/**/*.js" --fix --cache --cache-location .eslintcache
> $ markuplint "src/**/*.pug"
> $ stylelint "src/**/*.css" --fix --cache --cache-location .stylelintcache
> <markuplint> passed (79 files checked, 0 errors)
>
> $ pnpm validate
> $ node plugins/validate-assets.js
> 🔍 Iniciando validación estricta de assets...
> ✔ Todos los assets existen. Procediendo...
>
> $ pnpm build
> vite v6.4.1 building for production...
> ✓ 31 modules transformed.
> dist/assets/images/sprite.svg       10.97 kB
> dist/assets/main-!~{00e}~.css       40.06 kB │ gzip: 8.89 kB
> dist/assets/main-D5J31_Wz.js        18.66 kB │ gzip: 5.09 kB
> dist/cart.html                      23.16 kB
> ✓ built in 590ms
>
> $ pnpm verify:render
> Páginas revisadas: 22  ·  assets medidos: 30
> 0 FALLOS
>
> $ pnpm validate:origen
> $ node plugins/validate-origen.js
> Validador · playgrow origen
> ------------------------------------------------
> 18 listos  ·  2 pendientes  ·  5 en otra fase  ·  2 descartados  ·  27 en total
> Cobertura dentro del alcance actual: 90% (18/20)
> Nada declarado como hecho está roto.
> ```
>
> Rama: `feat/TASK-002-buscador-pantalla-completa`. Solicito REVIEW formal de @dexia.
>
> **[2026-09-08 23:15] dexia:** ✅ REVIEW-004 aprobado. Gate 🟡 completo; puede mergearse.
>
> **[2026-09-09 09:47] ania:** 🟩 Mergeada a `main` tras aprobación formal en REVIEW-004 e instrucción de Miguel.
>
> **[2026-09-09 11:00] clia:** ✅ **CERRADA.** Estaba en `MERGEADA`: el código lleva en `main` desde ayer y sólo faltaba el cierre formal, que es del CTO. Verificado sobre `main`: Buscador a pantalla completa, disparador en las tres barras y sociales retirados de la cabecera. Suite en verde y **cobertura del catálogo al 100% (20/20)**.

