# 📋 Status: Clia (CTO)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-10

---

## 📝 Forma de trabajo

Clia opera desde Claude Code con acceso directo al repositorio: ejecuta la
verificación, sirve `dist/` y contrasta contra el origen en el navegador.
Comunicación con el equipo **sólo por MDs** en `docs/comms/`.

**Canal de activación:** Miguel en sesión directa, o mensajes dirigidos a
`clia` en [`comms/tablero.md`](../comms/tablero.md).

**No implementa.** Especifica, audita y firma. El código lo escribe Antigravity.

---

## 🎯 Trabajo reciente

| Tarea | Estado | Notas |
| --- | --- | --- |
| Migración del maquetado desde el clon local | ✅ Hecho | [INFORME-MIGRACION.md](../../INFORME-MIGRACION.md) |
| Maquetación HTML + CSS del resto del tema | ✅ Hecho | [INFORME-FASE-HTML-CSS.md](../../INFORME-FASE-HTML-CSS.md) — 18 páginas |
| Corrección de contenido inventado | ✅ Hecho | Relleno del origen restaurado con sus typos; cita ficticia atribuida a una persona real, eliminada |
| Templates de tienda, sólo HTML y CSS | ✅ Hecho | [INFORME-FASE-TIENDA.md](../../INFORME-FASE-TIENDA.md) — 22 páginas |
| Protocolo de comunicación multi-agente | ✅ Activo | [comms/README.md](../comms/README.md) — aprobado por Miguel ([DECISION-001](../comms/DECISION-001-protocolo-y-roster.md)) |
| TASK-001, 004, 005 y 006 | ✅ Cerradas | En `main` desde `8f8bdd6`. 3 REVIEWs de Dexia y 3 sign-off 🔴 |
| DECISION-002, 003 y 004 | ✅ Efectivas | Carrusel de categorías, nombres de los agentes, realce de sección |
| TASK-002 y TASK-003 | ✅ Cerradas | Buscador a pantalla completa y carrusel de categorías, en `main` |
| TASK-007 y TASK-008 | ✅ Cerradas | Insignias y jerarquía de titulares. TASK-008 con el gate cumplido, lista para mergear |
| TASK-009 | 🟦 Abierta | Fila de iconos del header. Hallazgo de Miguel sobre un componente que descarté al no migrar `bk.pug` |
| Auditoría de la fase de comportamientos y tienda | ✅ Hecha | 0 FALLOS en 22 páginas. Pestañas, lightbox, buscador y cantidad verificados servidos. Tres hallazgos → TASK-010 y TASK-011 |
| TASK-009 · gate 🔴 | 🟥 No firmado | Token `--height-header-icon` autorizado; merge bloqueado por dos defectos que la REVIEW no alcanzó, ambos del mismo tipo que sí levantó |
| TASK-010 y TASK-011 | 🟦 Abiertas | Las dos 🔴 y las dos por fallos míos: la regex de `htmlAutonomo.js` y la comprobación a medias de `validate-origen.js` |

---

## ⚠️ Riesgos que vigilo

1. **El origen puede cambiar o caerse.** Es la demo de un tema comercial de un
   tercero y ya bloquea el carrito con 403. Todo lo que no se capture ahora,
   puede no estar mañana.
2. **Assets sin licencia.** Las imágenes son marcadores copiados de la demo del
   origen: no son del proyecto y no pueden ir a producción. Están declarados en
   [`assets-pendientes.json`](../migracion/assets-pendientes.json).
3. **Contenido sin definir.** Todo el copy es relleno del origen. El riesgo real
   no es que se note, es que **alguien lo dé por bueno** — ya pasó una vez.
4. **`actionUrl` vacío en tres formularios.** Contacto, comentarios y
   newsletter. Es el estado correcto, pero hay que resolverlo antes de publicar.
5. **172 avisos de `verify:render`.** Ninguno bloquea y la mayoría son falsos
   positivos de mixins compartidos, pero nadie los ha revisado uno a uno desde
   que eran 39. Han pasado de 89 a 172 con la fase de tienda.
6. **Ningún navegador real verificado.** Sólo el navegador de la herramienta, y
   **con un límite que no tenía medido**: corre con `visibilityState: hidden`,
   así que `requestAnimationFrame` no dispara. Todo comportamiento que dependa
   de rAF —el sticky header hoy— **no lo puedo verificar yo**. El código se lee
   correcto; no está comprobado.
7. **Descarté `bk.pug` por su nombre, no por su contenido.** Ahí estaba la fila
   de iconos del header ([TASK-009](../comms/TASK-009-fila-de-iconos-del-header.md)).
   Falta revisar el resto del archivo por si hay más: el criterio que falló pudo
   tapar otras piezas.

---

## ⚖️ Salidas de rol registradas

| Fecha | Qué | Por qué importa |
| --- | --- | --- |
| 2026-09-07 | Commit `63174bb` — retiré `novalidate` de `contact-form.pug` y `comment-form.pug` | Lo implementé yo después del corte del 2026-09-07, y tocaba **contratos de formulario**, que es 🔴: exigía REVIEW de Dexia + sign-off, y no pasó por ninguno. El arreglo era correcto; el proceso no. |
| 2026-09-10 | Ofrecí a Miguel maquetar la fila del header | Corregido antes de tocar nada: salió [TASK-009](../comms/TASK-009-fila-de-iconos-del-header.md) para Ania. |

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-07 | Clia | Creación del status |
| v1.1 | 2026-09-08 | Clia | Nombre propio: **Clia** |
