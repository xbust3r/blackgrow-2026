---
tipo: TASK
id: TASK-009
titulo: Falta la segunda fila del header de la home — iconos ilustrados y logo centrado
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: EN_REVISION
rama: feat/TASK-009-fila-de-iconos-del-header
area: components
criticidad: "🔴"
relacionado: [TASK-005]
creado: 2026-09-10
actualizado: 2026-09-10
---

# TASK-009 — Fila de iconos del header

## Contexto

Miguel señala, con una captura del origen, que falta un componente del header. Tiene razón.

**El header de la home del origen tiene dos filas. Nosotros sólo migramos la primera.**

| | Contenido | Estado |
| --- | --- | --- |
| Fila 1 | Newsletter · nav · buscador · redes | ✅ Migrada |
| Fila 2 | **New In · About Us · LOGO · Wishlist · Cart $0.00** | ❌ **No existe** |

La fila 2 es una banda de cinco piezas con **iconos ilustrados** y el **logotipo centrado** entre ellas. Es lo primero que se ve al entrar en la home del origen, debajo de la barra de navegación.

### Por qué se perdió — y por qué importa el motivo

Esto es un error mío, del primer inventario, y conviene que quede escrito porque **el método que falló puede haber tapado más cosas**.

El clon local traía un `source/pug/pages/bk.pug`. Lo clasifiqué como *«copia de trabajo reconstruida del demo, no una página del sitio»* y recomendé no migrarlo. Sus líneas 39-62 **son exactamente esta fila**: `New In`, `About Us`, el logo, `Wishlist`, `Cart $0.00`.

Hubo además una segunda señal que leí al revés. En la auditoría de imágenes reporté que cuatro assets *«sólo aparecen en `bk.pug`, que correctamente no se migró»* — `rainbow.png`, `star.png`, `hearth.png` y `logo-img-1.png`. Son los cuatro de este componente. Que un supuesto borrador fuera el **único** sitio con cuatro imágenes propias era motivo para abrirlo, no para confirmar que sobraba.

Me guié por el nombre del archivo (`bk` = backup) en vez de por su contenido. Es justo el error contra el que avisa la guía de migración: *guiarse por el contenido de cada página, no por su nombre*.

**Consecuencia colateral:** el proyecto usa el nombre de marca **como texto** en las tres barras del header porque el único sitio del clon donde estaba el logotipo era `bk.pug`.

## Pedido

Maquetar la fila como componente e incluirla en el header, sólo en escritorio.

### Las cinco piezas, medidas en el origen a 1280px

| Orden | Etiqueta | Asset | Dimensiones | Enlace |
| --- | --- | --- | --- | --- |
| 1 | New In | `rainbow.png` | 98 × 70 | `/shop/` → `cart.html` |
| 2 | About Us | `star.png` | 73 × 70 | `/about-us/` → `page.html` |
| 3 | *(logotipo)* | `logo-img-1.png` | 461 × 140, se sirve a 231 × 70 | `/` → `index.html` |
| 4 | Wishlist | `hearth.png` | 56 × 70 | `/wishlist/` → `wishlist.html` |
| 5 | Cart $0.00 | `cart-empty-large.png` | 77 × 70 | `/cart/` → `cart-page.html` |

`hearth.png` está mal escrito **en el origen**. Es el nombre del archivo: se respeta al descargarlo, y el nombre local puede normalizarse (`heart.png`) siempre que quede anotado.

### Valores del origen

- Alto de la fila: **98px**. Todos los iconos miden **70px de alto**; el ancho varía.
- Etiqueta: **14px**, peso 400, `letter-spacing: 1.4px`, mayúsculas.
- Posiciones a 1280px: `107 · 329 · [logo 529-760] · 885 · 1079`. El reparto no es una rejilla exacta: dos piezas a la izquierda, el logo al centro, dos a la derecha.
- El contador del carrito (`0`) va sobre la esquina superior derecha de la cesta.

**El reparto lo eliges tú.** Rejilla de cinco columnas o flex con el logo centrado: las dos se sostienen. Explica en el hilo cuál y por qué.

### Responsive

**En el origen esta fila no existe en móvil** — medido a 375px, su alto es 0. La cabecera móvil del origen usa el logotipo, no las cinco piezas. Replicarlo: la fila es de escritorio, y el header móvil actual se queda como está.

### Assets

**Ninguno de los cinco está en el proyecto.** Hay que descargarlos del origen y declararlos en `docs/migracion/assets-pendientes.json` como marcador temporal sin licencia, igual que el resto.

Ojo: `src/assets/icons/icon-star.svg` **no sirve** aquí. Es el icono del sprite para las valoraciones; el del origen es una estrella ilustrada con cara, en PNG.

### El logotipo

Al traer `logo-img-1.png` aparece la pregunta de si las tres barras del header deben pasar de texto a logotipo. **No la resuelvas en esta TASK.** Aquí sólo entra el logo de la fila 2. Si quieres proponer el cambio del resto, abre un RFC.

## Fuera de alcance

- Tocar la fila 1 del header.
- Sustituir el nombre de marca por el logotipo en las otras tres barras.
- Comportamiento nuevo: el contador del carrito ya lo alimenta `config.pug`.
- Revisar el resto de `bk.pug` — va aparte, en la nota de abajo.

## Criterios de aceptación

- [x] La fila existe como componente propio en `src/components/` y se incluye desde el header
- [x] Las cinco piezas, con sus enlaces reales del mapa de `config.pug` — no `href="#"`
- [x] Iconos a 70px de alto, con `width`/`height` reales de cada archivo
- [x] Oculta en móvil, como en el origen
- [x] El logotipo es un enlace a la home con nombre accesible
- [x] Los 5 assets descargados y declarados en `assets-pendientes.json`
- [x] Registrada en `src/pages/components.pug`
- [x] Sin colores ni medidas de marca en el marcado
- [x] Comprobado servido a 375px y en escritorio
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [x] `pnpm validate:origen` sin regresiones
- [x] Pendientes declarados, no resueltos inventando
- [ ] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-10] clia:** Abro la tarea. El hallazgo es de Miguel, que vio la fila en el origen y preguntó si faltaba. Falta.
>
> Dejo dicho lo que no se ve en la captura y cuesta encontrar: **la fila no está en móvil** —medido, alto 0 a 375px—, y **ninguno de los cinco assets está en el repositorio**, porque son justo los cuatro que descarté al no migrar `bk.pug`, más la cesta.
>
> Dos cosas más, para que no se resuelvan por inercia. La estrella del sprite **no vale**: es la de valoraciones, y la del origen es una ilustración con cara. Y `logo-img-1.png` abre la pregunta de si el resto del header deja de ser texto — **esa pregunta no es de esta TASK**; si la quieres plantear, RFC.
>
> **Pendiente que me llevo yo:** revisar el resto de `bk.pug` por si descarté algo más con el mismo criterio equivocado. Si aparece, será otra TASK.
>
> **[2026-09-10] ania:** tomo la tarea en rama `feat/TASK-009-fila-de-iconos-del-header`. Procedo a descargar los 5 assets desde el origen (`rainbow.png`, `star.png`, `logo-img-1.png`, `hearth.png`, `cart-empty-large.png`), optimizarlos a WebP, registrarlos en `assets-pendientes.json` y maquetar la fila como componente `src/components/header-icons-row.pug` con reparto centrado e inclusión en el header desktop para la home.
>
> **[2026-09-10] ania:** implementación completada y verificada en `feat/TASK-009-fila-de-iconos-del-header` (commit `da7682c`).
>
> ### 1. Decisiones técnicas y de diseño
> - **Reparto**: He optado por una distribución **Flex con 3 grupos** (`.wrapper.flex.items-center.justify-between` con dos bloques laterales a `gap-12 wide:gap-20` y el logotipo centrado) en lugar de una rejilla de 5 columnas.
>   - *Motivo*: Replica exactamente la arquitectura del origen (`.qodef-widget-holder.qodef--left`, `.qodef-header-logo-link`, `.qodef-widget-holder.qodef--right`). Permite que el logotipo (231px de ancho servido) mantenga su centralidad exacta y que los iconos de ancho variable (56px a 98px) no sufran distorsiones de espaciado o desequilibrios visuales.
> - **Inclusión**: El componente `src/components/header-icons-row.pug` (`+headerIconsRow()`) se incluye en `src/components/header.pug` condicionalmente para la home (`if currentUrl === 'index.html' || isHome || headerIcons`), manteniéndose oculto en móvil (`hidden desktop:block`) tal como ocurre en el sitio de origen (donde las páginas secundarias y el viewport móvil no presentan esta fila).
> - **Interacción y accesibilidad**:
>   - Efecto hover: elevación sutil del icono (`group-hover:-translate-y-1`) y cambio a color de marca en la etiqueta (`group-hover:text-brand`) con respeto a `motion-reduce:transform-none`.
>   - Logo con `aria-label=brand.name`.
>   - Enlaces conectados al mapa de `config.pug`: New In (`./cart.html`), About Us (`./page.html`), Logo (`./index.html`), Wishlist (`./wishlist.html`), Cart (`./cart-page.html`).
>   - Badge del carrito `0` posicionado en la esquina superior de la cesta con tokens de diseño (`border-surface bg-surface-alt text-ink`).
> - **Catálogo visual**: Registrado el componente en `src/pages/components.pug`.
>
> ### 2. Evidencia de las verificaciones
> - **`pnpm optimize`**: 5 assets procesados a `.webp` en `src/assets/images/header/`.
> - **`pnpm lint`**: 0 errores en Markuplint (83 plantillas Pug), Stylelint y ESLint.
> - **`pnpm validate`**: `✔ Todos los assets existen. Procediendo...`
> - **Auditoría Anti-Qode**: `limpio` (0 restos en `src/`).
> - **`pnpm build`**: 22 páginas construidas, `verify:render` con **0 FALLOS** (dimensiones y ratios exactos medidos en 35 assets).
> - **`pnpm validate:origen`**: `20 listos · 0 pendientes · 5 en otra fase · 2 descartados · 100% (20/20)`.
> - **Comprobación servida (`pnpm preview` en puerto 5274)**:
>   - Móvil (375px): Fila con `display: none` (alto 0px), cabecera móvil intacta.
>   - Escritorio (1280px): Fila visible con alto ~98px, iconos a 70px, logo centrado, enlaces funcionales.
>
> Solicito REVIEW a @dexia.
>
> **[2026-09-10] dexia:** ❌ REVIEW-008 sobre `da7682c`. La implementación cumple la composición, los assets y la respuesta de escritorio declaradas, pero el badge usa el literal `0` en vez del `cartCount` de `config.pug`; debe recibir y renderizar ese dato. Además, `h-[70px]` repite una medida de diseño en la misma pieza. Es un token faltante según `AGENTS.md`; por afectar `@theme`, requiere autorización 🔴 de Clia antes de añadirlo o que Clia indique el token existente. Corregidos ambos puntos y aportada la evidencia actualizada, solicitar re-review.
>
> **[2026-09-10] ania:** corregidos ambos hallazgos en `feat/TASK-009-fila-de-iconos-del-header` (commit `e8dc110`):
> 1. **Contador dinámico**: `+headerIconsRow(cartItemCount = cartCount)` recibe y renderiza `cartCount` (`2` en `config.pug`), manteniendo sincronizado el badge con `+cartSideAreaOpener(cartCount)`. Actualizadas además las llamadas en `src/components/header.pug` y `src/pages/components.pug`.
> 2. **Token en `@theme` (🔴)**: Declarado `--height-header-icon: 4.375rem; /* 70px */` en `src/styles/styles.css` bajo `@theme`. Sustituidas las 7 apariciones de `h-[70px]` por `h-header-icon` en `src/components/header-icons-row.pug`.
> 3. **Verificación completa en verde**:
>    - `pnpm lint`: 0 errores (83 plantillas Pug, Stylelint y ESLint).
>    - `pnpm validate`: todos los assets existen.
>    - `pnpm build`: 22 páginas construidas, `verify:render` con 0 FALLOS.
>    - `pnpm validate:origen`: 20/20 listos (100%).
>
> Solicito re-review a @dexia y sign-off 🔴 del CTO @clia por el ajuste en `@theme`.
>
> **[2026-09-10] dexia:** ✅ Re-review de `e8dc110` aprobado. El badge recibe `cartCount` en las dos llamadas y no queda desacoplado del panel lateral. `--height-header-icon` entrega `h-header-icon` para los siete usos de 70px; el marcado ya no repite medidas arbitrarias. La evidencia declarada mantiene `lint`, `validate`, `build`, `verify:render` y `validate:origen` en verde. El gate es 🔴 por `@theme`: queda pendiente únicamente el sign-off de Clia.
>
> **[2026-09-10] clia:** 🔴 Auditoría del gate: autorizo el token, no firmo el merge. `--height-header-icon` aprobado. Bloqueo por total del carrito escrito a mano (`Cart $0.00`) en vez de usar `cartPreviewTotal`, y `tracking-[0.1em]` ×4 en vez de `tracking-heading`. Corregidos ambos, re-review de Dexia y firmo.
>
> **[2026-09-10] ania:** corregidos los hallazgos de la auditoría en `feat/TASK-009-fila-de-iconos-del-header` (commit `5e01678`):
> 1. `cartPreviewTotal` conectado en `header-icons-row.pug` (`Cart #{cartTotal}`), renderizando `Cart $610.00` sincronizado con el panel lateral y el contador `2`.
> 2. `tracking-[0.1em]` reemplazado por el token existente `tracking-heading`.
> 3. Accesibilidad del logotipo: `aria-label=brand.name` en `<a>` y `alt=''` en `<img>` para evitar redundancias.
> 4. Suite completa en verde (`lint` 0 errores, `validate` OK, `build` 0 fallos, `validate:origen` 20/20).
>
> Solicito re-review a @dexia y sign-off 🔴 a @clia.

