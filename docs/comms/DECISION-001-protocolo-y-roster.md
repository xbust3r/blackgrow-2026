---
tipo: DECISION
id: DECISION-001
titulo: Protocolo de comunicación ACTIVO y roster de tres agentes
de: claude
para: [codex, antigravity]
cc: [miguel]
estado: EFECTIVA
estrategica: true
relacionado: [comms/README.md, equipo.md]
creado: 2026-09-07
actualizado: 2026-09-07
---

# DECISION-001 — Protocolo de comunicación ACTIVO y roster de tres agentes

## Contexto

El proyecto pasa a llevarse entre **tres agentes en tres plataformas que no se hablan entre sí** —Claude en Claude Code, Codex en ChatGPT, Antigravity en Antigravity— más Miguel. Hacía falta un canal común, y el único terreno compartido es el repositorio.

Se adaptó el protocolo de `~/Servers/ecommerce`, que funciona con siete agentes. Allí existen un PM (Misato) que crea y prioriza las TASKs, un Arquitecto (Lelouch) que aprueba el diseño y una DEV secundaria (Bulma). **Aquí no existe ninguno de los tres**, así que copiar la matriz de permisos tal cual habría dejado esas funciones sin dueño: nadie podría crear una TASK ni aprobar un RFC.

## Decisión

Queda **ACTIVO** el [protocolo de comunicación por MDs](README.md), con el roster de tres agentes de [`equipo.md`](../equipo.md), y con estos tres puntos confirmados por Miguel:

1. **El CTO absorbe las funciones de PM y de Arquitecto** —crear TASKs, priorizar y aprobar RFCs— mientras el equipo sea de tres. Miguel conserva el veto sobre ambas.
2. **El gate 🔴 exige doble aprobación** —REVIEW de Codex ✅ más sign-off del CTO— sobre `@theme`, `config.pug`, `main-template.pug`, los verificadores de `plugins/` y los contratos de formulario.
3. **La regla de cierre por silencio de 48h se mantiene**: en decisiones **no estratégicas**, si Miguel no responde en 48h, el CTO cierra. Las estratégicas —marcadas `estrategica: true`— siguen necesitando su ✅ explícito.

## Motivo

**Sobre el punto 1.** La alternativa era dejar las funciones sin dueño y resolverlas caso por caso, que es exactamente cómo se pierde una tarea: si nadie es responsable de priorizar, la prioridad la acaba poniendo quien tiene la sesión abierta. Concentrarlas en el CTO tiene el coste de que el mismo rol especifica y aprueba, y ese coste se compensa con el punto 2 y con el veto de Miguel.

**Sobre el punto 2.** La fricción es deliberada y está puesta donde el daño se propaga: un token mal puesto en `@theme` cambia las 22 páginas a la vez, un nombre de campo mal escrito manda datos a la nada, y tocar un verificador de `plugins/` desactiva la red de seguridad de todos los demás. Un fallo en una página suelta se ve; estos no.

**Sobre el punto 3.** Sin plazo, una decisión no estratégica puede quedar abierta indefinidamente esperando un ✅ que nadie recuerda que falta. Con plazo, el silencio también decide. Lo estratégico queda fuera de la regla porque ahí el silencio no debe valer como acuerdo.

## Consecuencias

- Desde ahora, **nada se comunica fuera de un MD commiteado**. Lo dicho en una sesión de una plataforma, para los otros dos agentes no ocurrió.
- **El CTO deja de implementar.** La migración del maquetado y los templates de tienda son suyos y se conservan; lo que venga lo escribe Antigravity. Excepción: pedido directo de Miguel, dicho en el hilo.
- **Codex es el único que emite REVIEWs.** El CTO audita, que no es lo mismo.
- Cada agente adopta la rutina de sesión: `git pull` → tablero → sus hilos → su status → commit.
- Si entra un cuarto agente, el punto 1 se revisa y las funciones de PM y Arquitecto se vuelven a separar.

## Documentos sincronizados

- [`comms/README.md`](README.md) — status 🟡 PROPUESTA → 🟢 ACTIVO
- [`equipo.md`](../equipo.md) · [`agentes/*.md`](../agentes/) · [`status/*.md`](../status/)
- [`AGENTS.md`](../../AGENTS.md) — sección «Quién eres y con quién hablas»

## Vigencia

Efectiva desde **2026-09-07**, aprobada explícitamente por Miguel.

## 💬 Hilo

> **[2026-09-07 00:00] claude:** propongo los tres puntos junto con el protocolo adaptado.
> **[2026-09-07 00:00] miguel:** aprobados los dos primeros —el CTO absorbe las dos funciones— y la regla de decisión por silencio de 48h queda como está. Protocolo a ACTIVO.
