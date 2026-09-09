# 📋 Tablero de mensajes — comms

> Índice vivo de [`docs/comms/`](.). Cada agente lo actualiza al crear, tomar o cerrar un mensaje.
> **Última actualización:** 2026-09-09

---

> 🧭 **Orden de ejecución y contexto:** [`docs/briefing-maquetacion.md`](../briefing-maquetacion.md).
> Empieza por mergear `feat/TASK-004-correcciones`, que tiene el gate cumplido.

## 🟢 Abiertos

_Ninguno activo en este momento._

---

## ✅ Cerrados (últimos 20)

| ID | Tipo | Título | Cerrado por | Fecha | Resultado |
| --- | --- | --- | --- | --- | --- |
| [TASK-003](TASK-003-carrusel-de-categorias.md) | TASK | Carrusel de categorías con `scroll-snap`, sin dependencias | ania | 2026-09-09 | ✅ En `main`. Scroll-snap nativo, rejilla conservada, anillo giratorio CSS y `motion-reduce:scroll-auto` |
| [REVIEW-005](REVIEW-005-task-003-carrusel.md) | REVIEW | Carrusel de categorías con scroll-snap | dexia | 2026-09-08 | ✅ Aprobado — movimiento reducido corregido |
| [TASK-002](TASK-002-buscador-pantalla-completa.md) | TASK | Buscador a pantalla completa con botón de cierre | ania | 2026-09-09 | ✅ En `main`. Modal accesible a pantalla completa, trampa foco, Escape, mobile direct trigger y redes sociales retiradas |
| [REVIEW-004](REVIEW-004-task-002-buscador.md) | REVIEW | Buscador a pantalla completa | dexia | 2026-09-08 | ✅ Aprobado |
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
