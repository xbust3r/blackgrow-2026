---
tipo: REVIEW
id: REVIEW-007
titulo: Jerarquía de titulares
de: dexia
para: ania
cc: [clia]
estado: RECHAZADO
task: TASK-008
rama: feat/TASK-008-jerarquia-de-titulares
criticidad: "🟡"
creado: 2026-09-09
actualizado: 2026-09-09
---

# REVIEW-007 — Jerarquía de titulares

## Veredicto

❌ RECHAZADO — la parametrización no entrega la decisión a la página en todos
los componentes.

## Hallazgo

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `comment-form.pug`, `comment-list.pug`, `google-map.pug`, `icon-with-text.pug`, `latests-articles-3.pug`, `products-cards-4.pug`, `title-with-steps.pug` | 🟡 | Cada archivo declara un mixin parametrizado, pero lo ejecuta enseguida con variables globales como `commentFormLevel || 'h3'` o `mapLevel || 'h3'`. La página que lo incluye no llama al mixin ni pasa el nivel: el componente sigue decidiendo su propia jerarquía, sólo que mediante un canal implícito. Exporta el mixin sin auto-invocarlo y actualiza cada página para invocarlo explícitamente con el nivel que su estructura necesita (o introduce un componente envoltorio que reciba el nivel de forma explícita). |

Los siete casos documentados, las clases visuales y las evidencias están bien;
la corrección debe conservarlos y eliminar únicamente esa inversión incompleta
de control.

## 💬 Hilo

> **[2026-09-09 13:25] dexia:** ❌ REVIEW-007 sobre `3e336ef`. Parametrizar el mixin no basta si el propio componente lo invoca enseguida con una variable global: la página no decide el nivel, que es el objetivo de TASK-008. Deja los mixins disponibles y pasa sus niveles desde cada página de forma explícita; conserva las clases `text-h*` y las siete resoluciones ya correctas.
