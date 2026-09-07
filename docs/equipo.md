# 🏢 Equipo de proyecto — Blackgrow 2026

> **Jefe del proyecto:** Miguel
> **Fecha:** 2026-09-07
> **Comunicación:** por MDs commiteados — ver [protocolo](./comms/README.md)

---

## 👥 Miembros

| Rol | Agente | Plataforma | Comunicación | Responsabilidad |
| --- | --- | --- | --- | --- |
| 👑 Jefe / Director | **Miguel** | Humano | Todas + MDs | Visión, decisiones finales, veto sobre cualquier decisión |
| 🧠 CTO | **Claude** | Claude Code | **Solo MDs** (`docs/comms/`) | Dirección técnica, alcance y prioridades, aprobación de RFCs, sign-off 🔴, auditoría docs↔código. **No implementa.** |
| 🧪 Lead Dev / Reviews | **Codex** | ChatGPT | **Solo MDs** (`docs/comms/`) | Guía técnica de implementación y **code review obligatorio** (rol exclusivo) |
| 💻 DEV principal | **Antigravity** | Antigravity (Google) | **Solo MDs** (`docs/comms/`) + sesión con Miguel | Implementación: Pug, Tailwind, JavaScript, assets y build |

> 📜 **Nota de origen.** Este arreglo está adaptado del equipo de `~/Servers/ecommerce`, que tiene siete miembros. Allí existen un PM (Misato), un Arquitecto (Lelouch) y una DEV secundaria (Bulma). **Aquí no.** Sus funciones —crear TASKs, priorizar, aprobar diseño— las absorbe el CTO mientras el equipo sea de tres. Si entra un cuarto agente, se vuelven a separar.

---

## 🧭 Cadena de mando

```text
              Miguel (Jefe)
                   │  decisión final / veto
                   ▼
             Claude (CTO)
                   │  alcance, prioridades, RFCs, sign-off 🔴
                   ▼
       Codex (Lead Dev / Reviews)
                   │  guía técnica + review obligatorio
                   ▼
            Antigravity (DEV)
                 implementa
```

- **Miguel** puede saltarse cualquier nivel y decidir directamente.
- **Claude** especifica y aprueba; **no escribe features** salvo pedido directo de Miguel.
- **Codex** no mergea nada: revisa. Su ✅ es condición de merge.
- **Antigravity** no mergea sin el gate cumplido.

---

## 📡 Canales

| Para | Dónde |
| --- | --- |
| Tareas, propuestas, reviews, decisiones | `docs/comms/` — un MD por conversación |
| Lo pendiente ahora mismo | [`docs/comms/tablero.md`](./comms/tablero.md) |
| Estado de cada agente | `docs/status/{agente}-status.md` |
| Reglas del código (mandan sobre todo) | [`AGENTS.md`](../AGENTS.md) y la [tarjeta de decisión](./tarjeta-de-decision.md) |

**Nada se comunica fuera de un MD commiteado.** Lo que se diga en una sesión de una plataforma y no quede escrito, para los otros dos agentes no ocurrió.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-07 | Miguel + Claude | Creación del equipo de tres agentes |
