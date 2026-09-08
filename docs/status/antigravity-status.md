# 📋 Status: Antigravity (DEV principal)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-08

---

## 📝 Forma de trabajo

Antigravity opera desde Antigravity, con el repositorio en ejecución.
Comunicación por MDs en `docs/comms/` y sesión directa con Miguel.

**Canal de activación:** mensajes dirigidos a `antigravity` en
[`comms/tablero.md`](../comms/tablero.md).

---

## 🎯 Trabajo reciente

| Tarea | Estado | Notas |
| --- | --- | --- |
| [TASK-004](../comms/TASK-004-correcciones-fase-comportamientos.md) | 🟪 EN_REVISION | Correcciones de REVIEW-001 aplicadas (tokens funcionales `@theme` y lightbox en `main-template.pug`). |
| [REVIEW-001](../comms/REVIEW-001-task-004-lightbox-y-accesibilidad.md) | 🟪 EN_REVISION | Hallazgos 1 y 2 resueltos con verificación completa verde. Esperando sign-off 🔴 de Claude y re-evaluación de Codex. |
| [TASK-001](../comms/TASK-001-fase-comportamientos.md) | 🟪 EN_REVISION | 8 módulos completados, CSS jump, 89% cobertura origen. Esperando review de Codex |

---

## 📥 Pendiente de mí

| ID | Prioridad | Qué se espera |
| --- | --- | --- |
| [TASK-004](../comms/TASK-004-correcciones-fase-comportamientos.md) | P0 | En espera de sign-off del CTO y revisión por Codex. Una vez aprobado ✅, merge a main |
| [TASK-002](../comms/TASK-002-buscador-pantalla-completa.md) | P1 | Próxima tarea: buscador a pantalla completa |
| [TASK-003](../comms/TASK-003-carrusel-de-categorias.md) | P1 | Próxima tarea: carrusel de categorías |

---

## 🚦 Punto de entrada

Antes de la primera línea de código:

1. Leer [`AGENTS.md`](../../AGENTS.md), [`README.md`](../../README.md) y
   [`src/styles/styles.css`](../../src/styles/styles.css) entero.
2. Tener a mano la [tarjeta de decisión](../tarjeta-de-decision.md) — se lee
   *mientras* se escribe, no al empezar.
3. Leer [`docs/migracion/README.md`](../migracion/README.md): **origen es el
   sitio vivo**, `<https://playgrow.qodeinteractive.com/>`, no una carpeta local.
4. Mirar [`src/components/ui.pug`](../../src/components/ui.pug) y los
   componentes vecinos antes de crear nada.
5. Levantar el entorno y comprobar que la suite pasa **antes** de tocar nada:

   ```bash
   pnpm install
   pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm validate:origen
   pnpm preview
   ```

   Nota de entorno: `node_modules/` estuvo vacío y pnpm no estaba instalado en
   la máquina del CTO; hubo que instalarlo con `npm install -g pnpm`.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-07 | Claude | Creación del status |
