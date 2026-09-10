# 📋 Status: Dexia (Lead Dev / Reviews)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-10

---

## 📝 Forma de trabajo

Dexia opera desde ChatGPT, **sin el repositorio en ejecución**. Comunicación
**sólo por MDs** en `docs/comms/`.

**Canal de activación:** mensajes dirigidos a `dexia` en
[`comms/tablero.md`](../comms/tablero.md).

No corre nada: la evidencia la ejecuta Ania —o el CTO— y se pega en el
hilo del MD.

---

## 🎯 Trabajo reciente

| Tarea | Estado | Notas |
| --- | --- | --- |
| [REVIEW-001](../comms/REVIEW-001-task-004-lightbox-y-accesibilidad.md) | ✅ Aprobado | TASK-004: corregidos los tokens del lightbox y el aislamiento del fondo; sólo falta el sign-off 🔴 del CTO. |
| [REVIEW-002](../comms/REVIEW-002-task-005-navegacion.md) | ✅ Aprobado | TASK-005: DECISION-004 re-revisada en `de6fcdc`; pendiente sólo restaurar el sign-off 🔴 de Clia. |
| [REVIEW-003](../comms/REVIEW-003-task-006-listado-tienda.md) | ✅ Aprobado | TASK-006: enlaces populares accesibles y salida real de suite verificadas; queda la firma 🔴 de Clia. |
| [REVIEW-006](../comms/REVIEW-006-task-007-insignias.md) | ✅ Aprobado | TASK-007: insignias ancladas a la imagen y verificadas en escritorio y móvil. |
| [REVIEW-007](../comms/REVIEW-007-task-008-titulares.md) | ✅ Aprobado | TASK-008: niveles entregados por cada página y jerarquía sin saltos. |
| [REVIEW-008](../comms/REVIEW-008-task-009-fila-iconos-header.md) | ❌ Rechazado | TASK-009: `5e01678` separa indebidamente el grupo izquierdo y altera el reparto. |
| [REVIEW-009](../comms/REVIEW-009-task-010-crossorigin-preload.md) | ❌ Rechazado | TASK-010: la eliminación de `crossorigin` sigue afectando etiquetas ajenas a Vite. |
| [REVIEW-010](../comms/REVIEW-010-task-011-zoom-validador.md) | ✅ Aprobado técnicamente | TASK-011: zoom y validador correctos; pendiente sólo sign-off 🔴 de Clia. |

---

## 📥 Pendiente de mí

| ID | Qué se espera |
| --- | --- |
| [TASK-001](../comms/TASK-001-fase-comportamientos.md) | Está en `cc:`. Guía técnica del desglose si Ania la pide, y el REVIEW cuando el entregable esté listo |
| [TASK-004](../comms/TASK-004-correcciones-fase-comportamientos.md) | Esperar el sign-off del CTO para los cambios 🔴 en `@theme` y `main-template.pug`; la revisión de Codex está aprobada. |
| [TASK-005](../comms/TASK-005-navegacion-y-enlaces.md) | Re-review de DECISION-004 aprobado; esperar sólo restauración del sign-off 🔴 de Clia. |
| [TASK-002](../comms/TASK-002-buscador-pantalla-completa.md) | Indicación de Miguel documentada: retirar redes sociales de cabecera y dejar Search como disparador del modal. |
| [TASK-006](../comms/TASK-006-listado-de-tienda.md) | REVIEW-003 aprobado; esperar únicamente el sign-off 🔴 de Clia. |
| [TASK-009](../comms/TASK-009-fila-de-iconos-del-header.md) | Rechazada en segunda re-review: restaurar el grupo izquierdo de dos enlaces. |
| [TASK-010](../comms/TASK-010-crossorigin-del-preload-de-fuentes.md) | Rechazada: limitar la regla a los recursos Vite afectados. |
| [TASK-011](../comms/TASK-011-zoom-fantasma-y-agujero-del-validador.md) | Aprobada técnicamente; esperar sólo el sign-off 🔴 de Clia. |

---

## 📌 Contexto mínimo para el primer review

- La ley es [`AGENTS.md`](../../AGENTS.md); el sistema de diseño entero está en
  [`src/styles/styles.css`](../../src/styles/styles.css).
- La paleta y los breakpoints por defecto de Tailwind **están borrados a
  propósito**: `bg-slate-800` y `md:flex` no generan nada.
- Un color escrito en el marcado es **FALLO** del verificador, no un atajo.
- El contenido es relleno del origen y **se conserva con sus typos**
  (`PURCASE`, `MATRACES`, `necesetys`). No es un descuido que haya que corregir.
- Historia útil: la fase de maquetación se cerró y luego hubo que corregirla
  entera porque se había inventado copy de marketing verosímil. Vigilar eso.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-07 | Clia | Creación del status |
| v1.1 | 2026-09-08 | Clia | Nombre propio: **Dexia** |
| v1.1 | 2026-09-08 | Codex | Emite REVIEW-001 y deja TASK-004 pendiente de corrección. |
| v1.2 | 2026-09-08 | Codex | Aprueba técnicamente REVIEW-001; queda pendiente el sign-off 🔴 del CTO. |
| v1.3 | 2026-09-08 | Dexia | Emite REVIEW-002 sobre TASK-005: un ajuste semántico pendiente. |
| v1.4 | 2026-09-08 | Dexia | Confirma el ajuste semántico; mantiene REVIEW-002 pendiente de evidencia visual. |
| v1.5 | 2026-09-08 | Dexia | Aprueba REVIEW-002 tras revisar la evidencia visual servida. |
| v1.6 | 2026-09-08 | Dexia | Documenta la indicación de Miguel para TASK-002 sobre cabecera y buscador. |
| v1.7 | 2026-09-10 | Dexia | Emite REVIEW-008 rechazado sobre TASK-009. |
| v1.8 | 2026-09-10 | Dexia | Aprueba técnicamente el re-review de TASK-009; queda pendiente el sign-off 🔴 del CTO. |
| v1.9 | 2026-09-10 | Dexia | Revisa TASK-009, TASK-010 y TASK-011: aprueba técnicamente TASK-011 y rechaza las otras dos. |
