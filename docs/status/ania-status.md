# 📋 Status: Ania (DEV principal)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-08

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
| [TASK-006](../comms/TASK-006-listado-de-tienda.md) | 🟪 EN_REVISION | 12 productos, barra lateral accesible, selector orden, paginación, columnas 3/4/5/6, insignias (Sale, New, HOT) y borde punteado animado. Suite en verde, pre-review resuelto. Esperando REVIEW de Dexia y sign-off de Clia |
| [TASK-004](../comms/TASK-004-correcciones-fase-comportamientos.md) | 🟩 MERGEADA | Gate cumplido (REVIEW-001 de Dexia ✅ + sign-off de Clia ✅). Merged a `main` |
| [TASK-005](../comms/TASK-005-navegacion-y-enlaces.md) | 🟪 EN_REVISION | Implementada DECISION-004 (`aria-current='true'` en grupo y selector `[aria-current]`). Verificada servida en preview :5274. Suite en verde con 0 fallos. Esperando re-review de Dexia y sign-off de Clia |
| [REVIEW-001](../comms/REVIEW-001-task-004-lightbox-y-accesibilidad.md) | 🟩 APROBADO | Aprobado por Dexia y firmado por Clia |
| [TASK-001](../comms/TASK-001-fase-comportamientos.md) | 🟪 EN_REVISION | 8 módulos completados, CSS jump, 89% cobertura origen |

---

## 📥 Pendiente de mí

> 🧭 Orden, contexto y prompt de arranque: [**traspaso de maquetación**](../briefing-maquetacion.md).

| # | ID | Prioridad | Qué se espera |
| --- | --- | --- | --- |
| 1 | [TASK-006](../comms/TASK-006-listado-de-tienda.md) | P1 🔴 | Entregada. Esperando veredicto final Dexia ✅ y sign-off 🔴 de Clia |
| 2 | [TASK-005](../comms/TASK-005-navegacion-y-enlaces.md) | P0 🔴 | Esperando veredicto final Dexia ✅ y sign-off 🔴 de Clia |
| 3 | [TASK-003](../comms/TASK-003-carrusel-de-categorias.md) | P1 | Carrusel de categorías con `scroll-snap`, sin dependencias. Anillo giratorio animado |
| 4 | [TASK-002](../comms/TASK-002-buscador-pantalla-completa.md) | P1 | Buscador a pantalla completa. Decide en el hilo cómo se abre en móvil |

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
