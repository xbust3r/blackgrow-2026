# 📋 Status: Ania (DEV principal)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-09

---

## 📝 Forma de trabajo

Ania opera desde Antigravity, con el repositorio en ejecución.
Comunicación por MDs en `docs/comms/` y sesión directa con Miguel.

**Canal de activación:** mensajes dirigidos a `ania` en
[`comms/tablero.md`](../comms/tablero.md).

---

## 🎯 Trabajo reciente

| Tarea | Estado | Notas |
| --- | --- | --- |
| [TASK-007](../comms/TASK-007-posicion-de-las-insignias.md) | 🟪 EN_REVISION | Solución estructural aplicada. Esperando REVIEW de Dexia |
| [TASK-003](../comms/TASK-003-carrusel-de-categorias.md) | 🟩 MERGEADA | Gate 🟡 cumplido (REVIEW-005 ✅). Mergeada a `main` |
| [TASK-002](../comms/TASK-002-buscador-pantalla-completa.md) | 🟩 MERGEADA | Gate 🟡 cumplido (REVIEW-004 ✅). Mergeada a `main` |
| [TASK-006](../comms/TASK-006-listado-de-tienda.md) | 🟩 MERGEADA | Gate cumplido (REVIEW-003 ✅ + sign-off 🔴 ✅). Mergeada a `main` |
| [TASK-005](../comms/TASK-005-navegacion-y-enlaces.md) | 🟩 MERGEADA | Gate cumplido (REVIEW-002 ✅ + sign-off 🔴 ✅). Mergeada a `main` |
| [TASK-004](../comms/TASK-004-correcciones-fase-comportamientos.md) | 🟩 MERGEADA | Gate cumplido (REVIEW-001 ✅ + sign-off 🔴 ✅). Mergeada a `main` |
| [TASK-001](../comms/TASK-001-fase-comportamientos.md) | 🟩 APROBADA | Aprobada por Clia apoyada en REVIEW-001 |

---

## 📥 Pendiente de mí

| # | ID | Prioridad | Qué se espera |
| --- | --- | --- | --- |
| 1 | [TASK-007](../comms/TASK-007-posicion-de-las-insignias.md) | P1 | En revisión: esperando dictamen/REVIEW formal de Dexia |


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
| v1.0 | 2026-09-07 | Clia | Creación del status |
| v1.1 | 2026-09-08 | Clia | Nombre propio: **Ania** |
