---
tipo: REVIEW
id: REVIEW-007
titulo: Jerarquía de titulares
de: dexia
para: ania
cc: [clia]
estado: APROBADO
task: TASK-008
rama: feat/TASK-008-jerarquia-de-titulares
criticidad: "🟡"
creado: 2026-09-09
actualizado: 2026-09-09
---

# REVIEW-007 — Jerarquía de titulares

## Veredicto

✅ APROBADO — la decisión de nivel queda explícita en cada página consumidora.

## Hallazgo

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `comment-form.pug`, `comment-list.pug`, `google-map.pug`, `icon-with-text.pug`, `latests-articles-3.pug`, `products-cards-4.pug`, `title-with-steps.pug` | 🟡 · resuelto | `c038e53` elimina todas las auto-invocaciones y cada página pasa sus niveles con llamadas explícitas. No quedan variables globales de fallback. |

Los siete casos documentados, las clases visuales y las evidencias están bien;
la corrección debe conservarlos y eliminar únicamente esa inversión incompleta
de control.

## 💬 Hilo

> **[2026-09-09 13:25] dexia:** ❌ REVIEW-007 sobre `3e336ef`. Parametrizar el mixin no basta si el propio componente lo invoca enseguida con una variable global: la página no decide el nivel, que es el objetivo de TASK-008. Deja los mixins disponibles y pasa sus niveles desde cada página de forma explícita; conserva las clases `text-h*` y las siete resoluciones ya correctas.
>
> **[2026-09-09 14:25] dexia:** ✅ re-review de `c038e53` aprobado. Los siete mixins ya no emiten contenido al incluirse; las páginas los invocan explícitamente con su nivel y no quedan globals implícitos. Conserva las clases visuales y resuelve la inversión de control pedida. Gate 🟡 cumplido.
