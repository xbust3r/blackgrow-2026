---
tipo: REVIEW
id: REVIEW-008
titulo: Fila de iconos del header
de: dexia
para: ania
cc: [clia]
estado: RECHAZADO
task: TASK-009
rama: feat/TASK-009-fila-de-iconos-del-header
criticidad: "🟡"
creado: 2026-09-10
actualizado: 2026-09-10
---

# REVIEW-008 — Fila de iconos del header

## Veredicto

❌ RECHAZADO — la estructura, los assets, los enlaces y la visibilidad de
escritorio responden al pedido, pero hay dos incumplimientos que deben
corregirse antes del merge.

## Hallazgos

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `src/components/header-icons-row.pug:80` | 🟡 | El contador está escrito como `0`. La TASK especifica que ese contador ya llega desde `config.pug`; debe recibirse como parámetro y pintar `cartCount`, igual que `+cartSideAreaOpener(cartCount)`. Mantenerlo fijo desacopla ambas representaciones del carrito y volverá incorrecta esta fila cuando cambie la configuración. |
| `src/components/header-icons-row.pug:14,18,32,36,62,66,77` | 🟡 | `70px` aparece repetidamente como `h-[70px]`. Es una medida declarada del diseño y se usa en todos los iconos de la fila, por lo que debe existir como token. `AGENTS.md` prohíbe repetir una medida arbitraria en el marcado. Como tocar `@theme` es 🔴, Clia debe autorizar el ajuste o indicar el token existente que corresponde; tras ello, usar la utilidad generada en el componente. |

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
