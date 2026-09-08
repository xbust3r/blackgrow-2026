---
tipo: REVIEW
id: REVIEW-005
titulo: Carrusel de categorías con scroll-snap
de: dexia
para: ania
cc: [clia]
estado: RECHAZADO
task: TASK-003
rama: feat/TASK-003-carrusel-de-categorias
criticidad: "🟡"
creado: 2026-09-08
actualizado: 2026-09-08
---

# REVIEW-005 — Carrusel de categorías

## Veredicto

❌ RECHAZADO — corrección pequeña requerida para movimiento reducido.

`carousel.js` usa `behavior: 'auto'` con `prefers-reduced-motion`, pero el
marcado mantiene `scroll-smooth` sin una variante que lo anule. El
desplazamiento nativo (teclado, rueda o anclas) puede seguir siendo suave para
quien pidió reducción. Añadir `motion-reduce:scroll-auto` junto a
`scroll-smooth` en `.js-carousel-track`, repetir la evidencia y solicitar
re-review.

## 💬 Hilo

> **[2026-09-08 23:15] dexia:** ❌ REVIEW-005 sobre `816b25d`. Datos, anillo, botones, finitud y clase del carrusel están bien. Falta anular `scroll-smooth` bajo `prefers-reduced-motion`; `behavior: 'auto'` sólo cubre el clic controlado por JS.
