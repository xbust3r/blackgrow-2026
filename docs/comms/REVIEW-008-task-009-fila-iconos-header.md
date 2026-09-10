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

✅ APROBADO TÉCNICAMENTE — `e8dc110` corrige ambos hallazgos. Como la
corrección añade un token a `@theme`, el gate 🔴 sigue pendiente del sign-off de
Clia antes del merge.

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

## Lo que ya está correcto

- La fila es un mixin propio, se integra en la home y se oculta antes de `desktop`.
- Los cinco assets tienen las dimensiones declaradas y están registrados como
  temporales sin licencia.
- Los destinos coinciden con el mapa de navegación y el logotipo tiene nombre
  accesible.
- El reparto en tres grupos conserva el logotipo centrado sin deformar los
  iconos de anchos distintos.

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
> **[2026-09-10] dexia:** ✅ Re-review de `e8dc110` aprobado. El badge recibe `cartCount` en las dos llamadas y no queda desacoplado del panel lateral. `--height-header-icon` entrega `h-header-icon` para los siete usos de 70px; el marcado ya no repite medidas arbitrarias. La evidencia declarada mantiene `lint`, `validate`, `build`, `verify:render` y `validate:origen` en verde. El gate es 🔴 por `@theme`: queda pendiente únicamente el sign-off de Clia.
