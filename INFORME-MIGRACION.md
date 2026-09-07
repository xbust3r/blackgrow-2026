# Informe de cierre — Migración Playgrow → Blackgrow 2026

Cierra la [tarea 10](./docs/migracion/tareas.md#tarea-10--cierre). Ejecutado y
validado por un agente distinto al que migró, siguiendo
[checklist-validacion.md](./docs/migracion/checklist-validacion.md).

## Qué se migró

Las 10 tareas del tasklist, completas: layout y 7 páginas
(`index`, `page`, `cart`, `cart-index`, `components`, `thanks`, `error`), tokens
en `@theme`, tipografía Jost recortada y servida, header con menú móvil
accesible, footer, los 8 heros, los 8 componentes de contenido, los 6 de
comercio, y la página catálogo para lo que no tiene ruta propia.

Los logs de cada fase están en `docs/migracion/logs/`.

## Decisiones tomadas durante la migración

- **Los dos grises.** `#8b8686` (origen: `$qode-gray-color`) y `#6e6e6e` (color
  del `body`) se mantuvieron como dos tokens distintos: `--color-ink-soft` y
  `--color-body`. Correcto — son dos grises distintos en el diseño —, pero
  **no quedó explicado en ningún sitio**, sólo en el propio nombre del token.
  Se documenta aquí porque el siguiente que lo lea no tiene por qué saberlo.
- **El naranja repetido.** `--color-brand` y `--color-brand-strong` se dejaron
  con el mismo valor (`#db915e`), tal como estaba en el origen (cinco variables
  Sass para el mismo color). No se inventó un tono de hover. Correcto.
- **Un token que el inventario no había previsto:** `--color-rating` (`#d9bf8d`).
  En el origen ese color no está en las variables Sass: está escrito a mano en
  el `fill` de un SVG inline dentro de `customers-reviews.pug`. Quien migró lo
  encontró leyendo el componente, no el inventario, y lo extrajo a token en vez
  de dejarlo suelto o perderlo. Es el acierto más fino de toda la migración.
- **`cart.pug` y `cart-index.pug` están cambiados de nombre respecto a lo que
  parecen.** En el origen, `cart-index.pug` es la ficha de un producto
  (`content-product` + `box-description`) y `cart.pug` es el listado
  (`shop-list`) — al revés de lo que sugieren los nombres. Se migró fiel a lo
  que cada archivo contiene, no a lo que su nombre sugiere. Verificado
  comparando ambos orígenes línea por línea.
- **El include roto de `page.pug`.** El origen apunta a
  `../heros/internal-hero`, que no existe (el archivo se llama `internal.pug`).
  Se resolvió usando el hero real sin tocar el origen. Documentado ya en el
  inventario.
- **Header duplicado.** `index.pug` del origen traía su propio header inline
  con el `include` del common comentado. Se consolidó en un único
  `src/components/header.pug`, comprobado sirviendo ambas páginas.

## Validación ejecutada (bloques A–I de la checklist)

**A · Automático** — en verde. `pnpm lint`, `pnpm validate`, `pnpm build` sin
errores. `pnpm verify:render`: **0 FALLO**, 39 AVISO. El aviso de tipografía
faltante ya no aparece — Jost se sirve y se pinta (confirmado en el navegador,
fuente computada del `body`: `Jost, sans-serif`).

La mayoría de los 39 avisos son falsos positivos del verificador: detecta una
cadena de clases repetida y no sabe distinguir si ya viene de un mixin
compartido (`+pendingImage`, `+heading` en `media.pug`) — que es exactamente la
solución correcta — de un componente sin nombre. No hace falta actuar sobre
ellos. Los que sí valen la pena — el título `h2` de columna del footer y de
otras secciones, repetido con las mismas 6 clases en varias páginas — son
candidatos reales a un mixin, pero no bloquean nada.

**B · Rastro de Qode** — limpio. Cero coincidencias de `qodeinteractive`,
`playgrow` ni `Qode` en `src/` ni en `dist/`. Ninguna imagen del sitio
construido apunta a un dominio externo. El manifiesto `assets-pendientes.json`
tiene 32 URLs únicas; las 6 que parecían faltar respecto al origen resultaron
ser: 2 duplicados de un artefacto de mi propio `grep` (comas de un `srcset`) y
4 imágenes que sólo aparecen en `bk.pug`, que correctamente no se migró.
Cobertura real: completa.

**C · Arquitectura** — en verde. Layout único, ninguna página repite `doctype`
ni incluye `header`/`footer` por su cuenta, las 7 extienden el layout, cada una
con su propio `<title>`. `bk.pug` no se migró.

**D · Tokens y estilos** — en verde, con una salvedad. Sin hexadecimales de
marca en el marcado, sin rastro de la rejilla del origen (`wcol`, `col-N`,
`allcenter`), sin breakpoints inventados (`sm:`, `md:`, etc.). `styles.css` se
mantiene en 262 líneas. La salvedad: las decisiones de los dos grises y del
naranja repetido estaban tomadas correctamente pero no explicadas en ningún
sitio — ya quedó dicho arriba.

**E · Componentes** — completo. Los 8 heros, los 8 de contenido, los 6 de
comercio, header, menú móvil y footer, todos incluidos en una página real o en
el catálogo. La repetición se resolvió con `each` en los cuatro casos que lo
necesitaban (`gallery-six` con 12 bloques, `customers-reviews`,
`latests-articles-3`, `products-cards-4`). Los heros de foto a sangre se
resolvieron como un mixin con variantes (`+photoHero`), tal como sugería la
guía.

**F · Accesibilidad** — en verde, verificado con interacción real, no sólo
lectura de código. El menú móvil: botón real con `aria-expanded`, **no** usa el
truco de `input[type=checkbox]` del origen, `Escape` cierra el panel, el foco
entra al abrir, cicla dentro del panel (`Tab`/`Shift+Tab`), y vuelve al botón
que lo abrió al cerrar. Los iconos sociales tienen nombre accesible real
(Facebook, Instagram, TikTok, Pinterest) — ya no queda el texto `fb`/`ins`/
`zxc`/`asd` del origen. Un solo `h1` por página, `skip-link` funcional.

**G · Responsive y fidelidad** — en verde. Sin desbordamiento horizontal en
375px en ninguna de las 7 páginas. Jost pintando de verdad. Comparado con el
original servido, no con capturas.

**H · Contenido y pendientes** — en verde. El contenido de relleno del origen
se mantuvo tal cual, typos incluidos — `Category: Crubs` (no «Cribs») está mal
escrito en el origen y se preservó igual de mal escrito, que es lo correcto: no
se corrige contenido que no es definitivo. El formulario del newsletter no
tiene `action`. Los `href="#"` del origen se mantienen. Sin identificadores de
GTM ni Osano copiados de otro proyecto.

**I · Entrega** — este documento la completa. El origen
(`~/Downloads/template-html-blackn-main`) se comprobó intacto.

## Lo que corrigió esta validación

Dos archivos huérfanos, sobras de antes de que empezara la migración —del
`lp-core` original sobre el que se construyó este core—, sin relación con
Playgrow: `src/components/head.pug` y `src/components/hero.pug`. Nada los
incluía; el layout usa `head-base.pug` y cada página compone su propio
contenido. Se eliminaron y se reconstruyó para confirmar que no rompía nada.

## Pendientes declarados

- **32 imágenes** listadas en `docs/migracion/assets-pendientes.json` esperan su
  asset real del proyecto; hoy se ven como marcadores con el rótulo
  `<nombre> / image pending`.
- **Tipografía**: Jost está migrada y sirviendo; si la marca definitiva usa otra
  familia, se sustituye en `src/assets/fonts/` y `@theme`.
- **Formulario del newsletter** sin destino (`action`).
- **Todos los `href="#"`** del origen, sin resolver — es fiel al origen, no un
  olvido.
- Los avisos de `verify:render` sobre clases repetidas: ninguno bloquea, dos o
  tres son candidatos reales a extraer un mixin si se sigue trabajando en estas
  páginas.

## Verificación

```
pnpm lint       → sin errores
pnpm validate   → Todos los assets existen
pnpm build      → ✓ built in ~1s
verify:render   → 0 FALLO, 39 AVISO (detallados arriba)
```

## Adenda — imágenes reales copiadas (2026-09-07)

A petición del responsable del proyecto, las 32 imágenes únicas que estaban
como marcador (`+pendingImage`) se descargaron del demo de origen
(`playgrow.qodeinteractive.com`) y se incrustaron localmente en
`src/assets/images/`, sustituyendo los recuadros de "image pending" por las
fotos reales del demo.

**Esto sigue sin ser el asset final del proyecto.** Son fotografías del demo
comercial de Playgrow (Qode Interactive); se copiaron únicamente como
marcador visual temporal de desarrollo, para poder ver el diseño con contenido
real mientras se consiguen los assets con licencia propia del proyecto.
`docs/migracion/assets-pendientes.json` queda actualizado con ese estado en
sus 36 entradas.

Al escribir los componentes se encontraron y corrigieron dos errores propios
antes de dar el trabajo por bueno: las cuatro imágenes de `title-with-steps`
compartían una sola medida en vez de la de cada archivo, y `article-b` de
`latests-articles-3` llevaba las dimensiones de `article-a`. Los detectó
`pnpm verify:render` (comprobación de proporción declarada contra proporción
real) antes de construir; ambos corregidos y reconstruido en verde.

Verificado: `pnpm lint`, `pnpm validate` y `pnpm build` sin errores, 0 FALLO en
`verify:render`, y las 57 imágenes de las 7 páginas cargando sin ninguna rota
(comprobado con `naturalWidth` en el navegador, no sólo leyendo el HTML).
