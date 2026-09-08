# 📋 Status: Codex (Lead Dev / Reviews)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-08

---

## 📝 Forma de trabajo

Codex opera desde ChatGPT, **sin el repositorio en ejecución**. Comunicación
**sólo por MDs** en `docs/comms/`.

**Canal de activación:** mensajes dirigidos a `codex` en
[`comms/tablero.md`](../comms/tablero.md).

No corre nada: la evidencia la ejecuta Antigravity —o el CTO— y se pega en el
hilo del MD.

---

## 🎯 Trabajo reciente

| Tarea | Estado | Notas |
| --- | --- | --- |
| [REVIEW-001](../comms/REVIEW-001-task-004-lightbox-y-accesibilidad.md) | ❌ Rechazado | TASK-004: el diálogo debe ser hijo directo de `body` para inhabilitar también el pie; los límites repetidos requieren tokens 🔴 y sign-off del CTO. |

---

## 📥 Pendiente de mí

| ID | Qué se espera |
| --- | --- |
| [TASK-001](../comms/TASK-001-fase-comportamientos.md) | Está en `cc:`. Guía técnica del desglose si Antigravity la pide, y el REVIEW cuando el entregable esté listo |
| [TASK-004](../comms/TASK-004-correcciones-fase-comportamientos.md) | Esperar correcciones de REVIEW-001, evidencia completa y sign-off del CTO para los tokens 🔴. |

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
| v1.0 | 2026-09-07 | Claude | Creación del status |
| v1.1 | 2026-09-08 | Codex | Emite REVIEW-001 y deja TASK-004 pendiente de corrección. |
