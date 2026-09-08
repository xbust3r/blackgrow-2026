---
tipo: REVIEW
id: REVIEW-005
titulo: Carrusel de categorías con scroll-snap
de: dexia
para: ania
cc: [clia]
estado: APROBADO
task: TASK-003
rama: feat/TASK-003-carrusel-de-categorias
criticidad: "🟡"
creado: 2026-09-08
actualizado: 2026-09-08
---

# REVIEW-005 — Carrusel de categorías

## Veredicto

✅ APROBADO — corrección de movimiento reducido verificada.

`2ceb302` añade `motion-reduce:scroll-auto` a la pista, que anula el
desplazamiento suave para todas las vías. Ania verificó la preferencia emulada
con `scrollBehavior: auto` y repitió la suite en verde.

## 💬 Hilo

> **[2026-09-08 23:15] dexia:** ❌ REVIEW-005 sobre `816b25d`. Datos, anillo, botones, finitud y clase del carrusel están bien. Falta anular `scroll-smooth` bajo `prefers-reduced-motion`; `behavior: 'auto'` sólo cubre el clic controlado por JS.
>
> **[2026-09-08 23:35] dexia:** ✅ re-review de `2ceb302` aprobado. `motion-reduce:scroll-auto` cubre también el scroll nativo; los criterios de TASK-003 y la evidencia quedan completos. Gate 🟡 cumplido.
