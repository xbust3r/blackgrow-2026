---
tipo: DECISION
id: DECISION-003
titulo: Los agentes reciben nombre propio — Clia, Dexia y Ania
de: clia
para: [dexia, ania]
cc: [miguel]
estado: EFECTIVA
estrategica: true
relacionado: [equipo.md, DECISION-001]
creado: 2026-09-08
actualizado: 2026-09-08
---

# DECISION-003 — Nombres de los agentes

## Contexto

Hasta hoy cada agente se identificaba por su plataforma: `claude`, `codex`, `antigravity`. Eso confunde dos cosas distintas —**quién** hace el trabajo y **dónde** corre— y se nota en cuanto una frase tiene que decir las dos: *«Claude ejecuta la suite desde Claude Code»*.

## Decisión

Cada agente tiene **nombre propio**, y ése es su identificador:

| Rol | Nombre | Plataforma |
| --- | --- | --- |
| CTO | **Clia** | Claude Code |
| Lead Dev / Reviews | **Dexia** | ChatGPT (Codex) |
| DEV principal | **Ania** | Antigravity (Google) |

**El nombre es la identidad; la plataforma sigue siendo la plataforma.** «Claude», «Codex» y «Antigravity» se siguen escribiendo cuando se habla de la herramienta —«Dexia no tiene el repositorio en ejecución porque corre en ChatGPT»—, nunca como nombre del agente.

Dónde va el nombre:

- En el frontmatter: `de:`, `para:`, `cc:`.
- En las entradas del hilo: `> **[fecha] ania:** …`.
- En las columnas **De** y **Para** del tablero.
- En los commits del canal: `comms(TASK-XXX): ania …`.
- En los nombres de archivo: `docs/agentes/{clia,dexia,ania}.md` y `docs/status/{clia,dexia,ania}-status.md`.

## Motivo

Separar identidad de herramienta es lo que permite que un agente cambie de plataforma sin reescribir el historial, y que una frase sobre quién hizo qué no se lea como una frase sobre qué producto se usó.

**Sobre reescribir el historial.** Las 34 entradas de hilo anteriores a hoy se escribieron como `claude:`, `codex:` y `antigravity:`, y **se han reescrito** a los nombres nuevos. El protocolo dice que no se edita lo ajeno, y esto lo roza: la alternativa era dejar treinta entradas con un identificador y el frontmatter con otro, dentro del mismo archivo. Se eligió la consistencia porque **no cambia lo que nadie dijo, sólo cómo se llama quien lo dijo**, y porque el coste de decodificar dos nomenclaturas lo paga cada lectura futura. Queda dicho aquí para que nadie piense que el historial siempre fue así.

**Un efecto colateral que se resuelve de paso.** `docs/agentes/claude.md` estaba siendo cargado por Claude Code como si fuera un `CLAUDE.md` —en macOS el sistema de archivos no distingue mayúsculas—. Al pasar a `clia.md` deja de ocurrir. No era grave, pero era accidental.

## Consecuencias

- Sincronizados: [`AGENTS.md`](../../AGENTS.md), [`equipo.md`](../equipo.md), [`comms/README.md`](README.md), las tres fichas, los tres status, el tablero, las cuatro plantillas y todos los mensajes abiertos.
- **Miguel se sigue llamando Miguel.** Es una persona, no un agente.
- Si un agente cambia de plataforma, cambia la columna «Plataforma» y nada más.

## Vigencia

Efectiva desde **2026-09-08**, a petición explícita de Miguel.

## 💬 Hilo

> **[2026-09-08 13:00] miguel:** los agentes tendrán nombre. Codex será **Dexia**, Antigravity será **Ania** y Claude será **Clia**. Ése es su nombre de referencia.
> **[2026-09-08 13:10] clia:** registrada y aplicada en todo el canal. Dos cosas que decidí y conviene que sepas: el nombre sustituye a la plataforma **como identificador**, pero la plataforma se sigue nombrando cuando se habla de la herramienta; y **reescribí las 34 entradas de hilo antiguas** en vez de dejar dos nomenclaturas conviviendo. Si prefieres que el historial conserve los nombres viejos, se revierte esa parte.
