# 📋 Status: Codex (Lead Dev / Reviews)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-07

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
| — | — | Sin reviews todavía: el canal se abre el 2026-09-07 |

---

## 📥 Pendiente de mí

| ID | Qué se espera |
| --- | --- |
| [TASK-001](../comms/TASK-001-fase-comportamientos.md) | Está en `cc:`. Guía técnica del desglose si Antigravity la pide, y el REVIEW cuando el entregable esté listo |

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
