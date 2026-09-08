# 📋 Tablero de mensajes — comms

> Índice vivo de [`docs/comms/`](.). Cada agente lo actualiza al crear, tomar o cerrar un mensaje.
> **Última actualización:** 2026-09-08

---

> 🧭 **Orden de ejecución y contexto:** [`docs/briefing-maquetacion.md`](../briefing-maquetacion.md).
> Empieza por mergear `feat/TASK-004-correcciones`, que tiene el gate cumplido.

## 🟢 Abiertos

| ID | Tipo | Título | De | Para | Prioridad | Estado | Actualizado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [TASK-001](TASK-001-fase-comportamientos.md) | TASK | Fase de comportamientos — módulos de JavaScript pendientes | claude | antigravity, codex | P0 | 🟪 EN_REVISION — 8 módulos, verificación verde. **Auditoría del CTO: 2 hallazgos 🔴 de accesibilidad** (cabecera fija focalizable bajo `aria-hidden`; miniaturas que no son botones). Esperando REVIEW de Codex | 2026-09-07 |
| [TASK-005](TASK-005-navegacion-y-enlaces.md) | TASK | Hacer el sitio navegable — mapa único, enlaces reales y subrayado animado | claude | antigravity | P0 | 🟦 ABIERTA — 33 `href='#'` en 17 archivos y sólo 6 enlaces internos reales. 🔴 toca `config.pug` y el layout. **Desbloqueada: no se renombra nada** | 2026-09-08 |
| [TASK-002](TASK-002-buscador-pantalla-completa.md) | TASK | Buscador a pantalla completa con botón de cierre | claude | antigravity | P1 | 🟦 ABIERTA — desviación consciente del origen, que sólo tapa la cabecera. Falta decidir el disparador en móvil | 2026-09-07 |
| [TASK-004](TASK-004-correcciones-fase-comportamientos.md) | TASK | Correcciones de la fase de comportamientos | claude | antigravity, codex | P0 | 🟩 **GATE CUMPLIDO** — REVIEW-001 de Codex ✅ + sign-off 🔴 del CTO ✅ + suite en verde. Lista para mergear desde `feat/TASK-004-correcciones` | 2026-09-08 |
| [REVIEW-001](REVIEW-001-task-004-lightbox-y-accesibilidad.md) | REVIEW | Correcciones de comportamientos — accesibilidad y lightbox | codex | antigravity, claude | P0 | 🟩 APROBADO — 2 hallazgos 🔴 resueltos en `c248dce`; **sign-off del CTO firmado** | 2026-09-08 |
| [TASK-006](TASK-006-listado-de-tienda.md) | TASK | Completar el listado de tienda y sus variantes de columnas | claude | antigravity | P1 | 🟦 ABIERTA — hoy dice «Showing 1–12 of 50» y pinta 3 productos «Product Title Here». 12 productos del origen, barra lateral, orden y paginación | 2026-09-08 |
| [TASK-003](TASK-003-carrusel-de-categorias.md) | TASK | Carrusel de categorías con `scroll-snap`, sin dependencias | claude | antigravity | P1 | 🟦 ABIERTA — sale de DECISION-002. La rejilla se conserva como variante | 2026-09-07 |

---

## ✅ Cerrados (últimos 20)

| ID | Tipo | Título | Cerrado por | Fecha | Resultado |
| --- | --- | --- | --- | --- | --- |
| [DECISION-002](DECISION-002-carrusel-de-categorias.md) | DECISION | Se revierte «no se quieren carruseles» para el carrusel de categorías | miguel | 2026-09-07 | ✅ Efectiva — alcance mínimo: sólo esa pieza, `hero-slider` sigue descartado, y sin dependencia nueva |
| [DECISION-001](DECISION-001-protocolo-y-roster.md) | DECISION | Protocolo de comunicación ACTIVO y roster de tres agentes | miguel | 2026-09-07 | ✅ Efectiva — el CTO absorbe PM y Arquitecto; gate 🔴 con doble aprobación; regla de 48h vigente |

---

## 📌 Trabajo previo al protocolo

Lo hecho antes del 2026-09-07 no pasó por este canal: lo implementó el CTO en sesión directa con Miguel, antes de que existiera el equipo de tres. Queda como registro, no como precedente.

| Fase | Informe | Estado |
| --- | --- | --- |
| Migración del maquetado desde el clon local | [INFORME-MIGRACION.md](../../INFORME-MIGRACION.md) | ✅ Cerrada |
| Maquetación HTML + CSS del resto del tema | [INFORME-FASE-HTML-CSS.md](../../INFORME-FASE-HTML-CSS.md) | ✅ Cerrada |
| Templates de tienda (cart, checkout, cuenta, wishlist) | [INFORME-FASE-TIENDA.md](../../INFORME-FASE-TIENDA.md) | ✅ Cerrada |
