# 📋 Tablero de mensajes — comms

> Índice vivo de [`docs/comms/`](.). Cada agente lo actualiza al crear, tomar o cerrar un mensaje.
> **Última actualización:** 2026-09-08

---

> 🧭 **Orden de ejecución y contexto:** [`docs/briefing-maquetacion.md`](../briefing-maquetacion.md).
> Empieza por mergear `feat/TASK-004-correcciones`, que tiene el gate cumplido.

## 🟢 Abiertos

| ID | Tipo | Título | De | Para | Prioridad | Estado | Actualizado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [TASK-002](TASK-002-buscador-pantalla-completa.md) | TASK | Buscador a pantalla completa con botón de cierre | clia | ania | P1 | 🟨 EN_PROGRESO — En implementación por Ania en rama `feat/TASK-002-buscador-pantalla-completa` | 2026-09-08 |
| [TASK-003](TASK-003-carrusel-de-categorias.md) | TASK | Carrusel de categorías con `scroll-snap`, sin dependencias | clia | ania | P1 | 🟦 ABIERTA — sale de DECISION-002. **Corregida: el anillo gira**, no es estático | 2026-09-08 |

---

## ✅ Cerrados (últimos 20)

| ID | Tipo | Título | Cerrado por | Fecha | Resultado |
| --- | --- | --- | --- | --- | --- |
| [TASK-006](TASK-006-listado-de-tienda.md) | TASK | Listado de tienda, insignias y borde punteado | clia | 2026-09-08 | ✅ En `main`. 12 productos, Sale/New/HOT, borde animado, `--color-highlight` |
| [TASK-005](TASK-005-navegacion-y-enlaces.md) | TASK | Hacer el sitio navegable | clia | 2026-09-08 | ✅ En `main`. Mapa único, 33→7 enlaces, subrayado animado y realce de sección |
| [TASK-004](TASK-004-correcciones-fase-comportamientos.md) | TASK | Correcciones de la fase de comportamientos | clia | 2026-09-08 | ✅ En `main`. Las 5 correcciones, 2 de ellas 🔴 de accesibilidad |
| [TASK-001](TASK-001-fase-comportamientos.md) | TASK | Fase de comportamientos | clia | 2026-09-08 | ✅ En `main`. 8 módulos. Sin REVIEW propio: excepción apoyada en REVIEW-001 |
| [REVIEW-003](REVIEW-003-task-006-listado-tienda.md) | REVIEW | Listado de tienda | dexia | 2026-09-08 | ✅ Aprobado + sign-off 🔴 |
| [REVIEW-002](REVIEW-002-task-005-navegacion.md) | REVIEW | Navegación y enlaces | dexia | 2026-09-08 | ✅ Aprobado + sign-off 🔴 restaurado tras DECISION-004 |
| [REVIEW-001](REVIEW-001-task-004-lightbox-y-accesibilidad.md) | REVIEW | Lightbox y accesibilidad | dexia | 2026-09-08 | ✅ Aprobado + sign-off 🔴 |
| [DECISION-004](DECISION-004-realce-de-seccion-en-la-navegacion.md) | DECISION | El realce de sección se conserva con `aria-current='true'` | miguel | 2026-09-08 | ✅ Efectiva — arbitraje de Miguel sobre el desacuerdo Clia/Dexia. Coste anotado: el lector anuncia «current» también en el grupo |
| [DECISION-003](DECISION-003-nombres-de-los-agentes.md) | DECISION | Los agentes reciben nombre propio — Clia, Dexia y Ania | miguel | 2026-09-08 | ✅ Efectiva — el nombre es la identidad, la plataforma sigue siendo la plataforma. Historial reescrito y canal sincronizado |
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
