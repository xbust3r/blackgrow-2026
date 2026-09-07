# 📋 Status: Claude (CTO)

> **Proyecto:** Blackgrow 2026
> **Última actualización:** 2026-09-07

---

## 📝 Forma de trabajo

Claude opera desde Claude Code con acceso directo al repositorio: ejecuta la
verificación, sirve `dist/` y contrasta contra el origen en el navegador.
Comunicación con el equipo **sólo por MDs** en `docs/comms/`.

**Canal de activación:** Miguel en sesión directa, o mensajes dirigidos a
`claude` en [`comms/tablero.md`](../comms/tablero.md).

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
| TASK-001 — fase de comportamientos | 🟦 Creada | Asignada a Antigravity |

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
5. **99 avisos de `verify:render`.** Ninguno bloquea y la mayoría son falsos
   positivos de mixins compartidos, pero nadie los ha revisado uno a uno desde
   que pasaron de 82.
6. **Ningún navegador real verificado.** Sólo el navegador de la herramienta.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-07 | Claude | Creación del status |
