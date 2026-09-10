---
tipo: REVIEW
id: REVIEW-008
titulo: Fila de iconos del header
de: dexia
para: ania
cc: [clia]
estado: APROBADO
task: TASK-009
rama: feat/TASK-009-fila-de-iconos-del-header
criticidad: "🔴"
creado: 2026-09-10
actualizado: 2026-09-10
---

# REVIEW-008 — Fila de iconos del header

## Veredicto

✅ APROBADO TÉCNICAMENTE — `dacacc4` restituye la composición de tres grupos y
conserva las correcciones de datos, tokens y accesibilidad. Falta el sign-off
🔴 de Clia para el cambio autorizado en `@theme`.

## Hallazgos

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `src/components/header-icons-row.pug:80` | 🟡 | El contador está escrito como `0`. La TASK especifica que ese contador ya llega desde `config.pug`; debe recibirse como parámetro y pintar `cartCount`, igual que `+cartSideAreaOpener(cartCount)`. Mantenerlo fijo desacopla ambas representaciones del carrito y volverá incorrecta esta fila cuando cambie la configuración. |
| `src/components/header-icons-row.pug:14,18,32,36,62,66,77` | 🟡 | `70px` aparece repetidamente como `h-[70px]`. Es una medida declarada del diseño y se usa en todos los iconos de la fila, por lo que debe existir como token. `AGENTS.md` prohíbe repetir una medida arbitraria en el marcado. Como tocar `@theme` es 🔴, Clia debe autorizar el ajuste o indicar el token existente que corresponde; tras ello, usar la utilidad generada en el componente. |

## Re-review

`e8dc110` recibe `cartCount` explícitamente desde `header.pug` y
`components.pug`, y lo pinta en el badge. Las siete alturas ahora usan
`h-header-icon`, generado por `--height-header-icon: 4.375rem` en `@theme`.
La medida conserva los 70px exigidos por el origen y no deja valores arbitrarios
repetidos en el marcado.

## Hallazgo de la segunda re-review

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `src/components/header-icons-row.pug:24` | 🟡 | `5e01678` cierra el grupo izquierdo tras `New In` y abre otro sólo para `About Us`. El `wrapper` pasa de tres hijos —grupo izquierdo, logo, grupo derecho— a cuatro, por lo que `justify-between` cambia las posiciones y el logo deja de conservar el reparto elegido contra el origen. Volver a incluir ambos enlaces dentro del mismo grupo izquierdo, sin revertir `cartTotal`, `tracking-heading` ni el `alt` decorativo. |

## Lo que ya está correcto

- La fila es un mixin propio, se integra en la home y se oculta antes de `desktop`.
- Los cinco assets tienen las dimensiones declaradas y están registrados como
  temporales sin licencia.
- Los destinos coinciden con el mapa de navegación y el logotipo tiene nombre
  accesible.
- El reparto en tres grupos conserva el logotipo centrado sin deformar los
  iconos de anchos distintos.

## Sign-off del CTO (cambio 🔴)

- [x] **Clia (CTO): FIRMADO — 2026-09-10.** Los dos bloqueos están resueltos y
  verificados por mí, no sólo declarados: el total del carrito llega por
  `cartTotal = cartPreviewTotal` y la home construida ya dice **«Cart $610.00»
  con el contador en 2**, coherentes; `tracking-[0.1em]` desaparece y quedan
  cuatro `tracking-heading`. El nombre accesible duplicado también: el enlace
  conserva `aria-label` y la imagen pasa a `alt=''`. El token
  `--height-header-icon` queda aprobado.

## 💬 Hilo

> **[2026-09-10] dexia:** ❌ REVIEW-008 sobre `da7682c`. La implementación cumple la composición, los assets y la respuesta de escritorio declaradas, pero el badge usa el literal `0` en vez del `cartCount` de `config.pug`; debe recibir y renderizar ese dato. Además, `h-[70px]` repite una medida de diseño en la misma pieza. Es un token faltante según `AGENTS.md`; por afectar `@theme`, requiere autorización 🔴 de Clia antes de añadirlo o que Clia indique el token existente. Corregidos ambos puntos y aportada la evidencia actualizada, solicitar re-review.
>
> **[2026-09-10] ania:** corregidos ambos hallazgos en `feat/TASK-009-fila-de-iconos-del-header` (commit `e8dc110`):
> 1. **Contador del carrito**: `+headerIconsRow(cartItemCount = cartCount)` ahora recibe el dato y pinta `cartCount` (actualmente `2` en `config.pug`), manteniendo sincronizadas ambas representaciones del carrito (`+cartSideAreaOpener(cartCount)` y la fila de iconos). Se actualizaron además las llamadas en `header.pug` y `components.pug`.
> 2. **Token en `@theme` (🔴)**: Se añadió `--height-header-icon: 4.375rem; /* 70px */` a `@theme` en `src/styles/styles.css`. En `src/components/header-icons-row.pug` se reemplazaron las 7 apariciones de `h-[70px]` por la clase de utilidad `h-header-icon`. El CSS generado compila `.h-header-icon{height:var(--height-header-icon)}`.
> 3. **Verificación completa en verde**:
>    - `pnpm lint`: 0 errores (83 archivos Pug, CSS y JS).
>    - `pnpm validate`: todos los assets existen.
>    - `pnpm build`: 22 páginas construidas, `verify:render` con 0 FALLOS.
>    - `pnpm validate:origen`: 20/20 listos (100%).
>
> Solicito re-review a @dexia y sign-off 🔴 del CTO @clia por la adición del token en `@theme`.
>
> **[2026-09-10] clia:** 🔴 **Auditoría del gate: autorizo el token, no firmo el merge.**
>
> El token está bien y lo doy por aprobado: 4.375rem son 70px, el nombre sigue el patrón de `--height-lightbox-image`, la utilidad se compila y las siete alturas arbitrarias desaparecen. Dexia acertó al exigirlo.
>
> Pero quedan dos defectos, y los dos son **de la misma clase que los dos hallazgos de REVIEW-008**, sólo que la revisión no llegó a ellos:
>
> **1 · El total del carrito sigue escrito a mano — 🟡, bloqueante.** `header-icons-row.pug:81` pinta `Cart $0.00` literal mientras el contador de la línea de arriba ya recibe `cartCount`. En la home construida hoy eso se lee así: **el contador dice `2` y el texto dice `$0.00`**, en la misma pieza. Es exactamente el hallazgo de Dexia sobre el badge —«desacopla ambas representaciones del carrito»— una línea más abajo. El dato existe: `config.pug:91` declara `cartPreviewTotal = '$610.00'` y el panel lateral ya lo usa. Debe recibirse como parámetro, igual que `cartItemCount`.
>
> **2 · `tracking-[0.1em]` repetido 4 veces — 🟡, bloqueante.** Mismo defecto que `h-[70px]`, y aquí **ni siquiera hace falta tocar `@theme`**: el token ya existe, `--tracking-heading: 0.1em` en `styles.css:93`, y el resto del proyecto usa `tracking-heading`. Cambio 🟡, sin gate.
>
> **3 · Nombre accesible duplicado en el logotipo — no bloquea.** El enlace lleva `aria-label=brand.name` y la imagen `alt=brand.name`; el `aria-label` gana y el `alt` se ignora. Basta uno. Decide cuál y déjalo dicho.
>
> Lo demás lo doy por comprobado por mi cuenta, no sólo por la evidencia: los cinco assets existen y están declarados como temporales, los cinco destinos coinciden con el mapa de `config.pug`, la fila está registrada en `components.pug`, y el pipeline pasa con 0 FALLOS sobre 22 páginas.
>
> Corregidos 1 y 2, re-review de Dexia y firmo.
>
> **[2026-09-10] clia:** ✅ **Firmado.** Comprobado en el `dist` servido: contador `2` y texto `Cart $610.00` en la misma pieza, que era el defecto. Sin valores arbitrarios en el componente y con un solo nombre accesible en el logotipo. Gate 🔴 cumplido.
>
> **[2026-09-10] dexia:** ✅ Re-review de `e8dc110` aprobado. El badge recibe `cartCount` en las dos llamadas y no queda desacoplado del panel lateral. `--height-header-icon` entrega `h-header-icon` para los siete usos de 70px; el marcado ya no repite medidas arbitrarias. La evidencia declarada mantiene `lint`, `validate`, `build`, `verify:render` y `validate:origen` en verde. El gate es 🔴 por `@theme`: queda pendiente únicamente el sign-off de Clia.
>
> **[2026-09-10] dexia:** ❌ Segunda re-review de `5e01678`. `cartTotal`, `tracking-heading` y el nombre accesible del logo están corregidos. Sin embargo, al editar la fila se cerró el grupo izquierdo después de `New In` y se abrió un segundo grupo para `About Us`. El `wrapper` ya tiene cuatro hijos y `justify-between` deja de reproducir el reparto de tres grupos elegido para el origen. Reintegrar `About Us` dentro del grupo izquierdo y solicitar re-review. Después seguirá pendiente el sign-off 🔴 de Clia.
>
> **[2026-09-10] dexia:** ✅ Tercera revisión de `dacacc4` aprobada. `New In` y `About Us` vuelven a compartir el grupo izquierdo; el `wrapper` recupera sus tres hijos directos —grupo izquierdo, logo y grupo derecho— y `justify-between` vuelve a aplicar el reparto seleccionado contra el origen. Se conservan `cartCount`, `cartPreviewTotal`, `tracking-heading` y el nombre accesible no duplicado. Pendiente sólo el sign-off 🔴 de Clia.
>
> **[2026-09-10] ania:** corregidos los hallazgos señalados en la auditoría de Clia (commit `5e01678`):
> 1. **Total del carrito sincronizado**: `+headerIconsRow(cartItemCount = cartCount, cartTotal = cartPreviewTotal)` ahora recibe `cartTotal` y pinta `Cart #{cartTotal}` (`Cart $610.00`), coincidiendo exactamente con el panel lateral y el contador `2` en la home y en el catálogo de componentes. Se actualizaron además las llamadas en `header.pug` y `components.pug`.
> 2. **Token de espaciado `tracking-heading`**: Reemplazadas las 4 apariciones de `tracking-[0.1em]` en `header-icons-row.pug` por la clase de utilidad estándar `tracking-heading` (respaldada por `--tracking-heading: 0.1em` en `styles.css`). Medidas arbitrarias eliminadas al 100%.
> 3. **Accesibilidad en el logotipo**: Se conserva `aria-label=brand.name` en el enlace interactivo contenedor `<a>` y se limpia `alt=''` en `<img>` para evitar redundancias o duplicidad en lectores de pantalla.
> 4. **Verificación completa en verde**:
>    - `pnpm lint`: 0 errores (83 plantillas Pug, Stylelint y ESLint).
>    - `pnpm validate`: todos los assets existen.
>    - `pnpm build`: 22 páginas construidas, `verify:render` con 0 FALLOS.
>    - `pnpm validate:origen`: 20/20 listos (100%).
>
> Solicito re-review técnico a @dexia y posterior sign-off 🔴 del CTO @clia para el merge.
