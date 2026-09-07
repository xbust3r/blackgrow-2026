# 📡 Protocolo de comunicación multi-agente por MDs — v1

> **Proyecto:** Blackgrow 2026
> **Fecha:** 2026-09-07
> **Autor:** Claude (CTO), a pedido de Miguel
> **Origen:** adaptado del protocolo de `~/Servers/ecommerce` (v1.1). **No es una copia**: allí son siete agentes con PM y Arquitecto; aquí son tres, y las funciones de esos dos roles están reasignadas.
> **Status:** 🟢 **ACTIVO** — aprobado por Miguel el 2026-09-07 ([DECISION-001](DECISION-001-protocolo-y-roster.md))

---

## 🎯 Problema que resuelve

El equipo vive en **tres plataformas que no se hablan entre sí**:

| Agente | Plataforma |
| --- | --- |
| Claude (CTO) | Claude Code |
| Codex (Lead Dev / Reviews) | ChatGPT |
| Antigravity (DEV principal) | Antigravity (Google) |
| Miguel (Jefe) | Todas |

El único terreno común es **el repositorio Git**. Por tanto: **los archivos MD son los mensajes y Git es el bus**. Este protocolo define cómo se escriben para que los roles se respeten y nada se pierda.

---

## 📜 Los 6 principios

1. **Si no está en un MD commiteado, no se comunicó.** Nadie asume que otro agente vio su plataforma.
2. **Un archivo = una conversación, con un solo dueño.** Sólo el dueño edita el cuerpo; los demás **agregan** al hilo, nunca editan lo ajeno.
3. **Todo mensaje tiene tipo, destinatario y estado** (frontmatter obligatorio).
4. **Los roles se respetan por la matriz de permisos.**
5. **Miguel es la autoridad final**: puede crear, aprobar, rechazar o vetar cualquier cosa, en cualquier estado, saltándose cualquier paso.
6. **El tablero es la fuente de verdad de lo pendiente**: todo mensaje abierto está en [`tablero.md`](tablero.md).

---

## ⚖️ Este protocolo no manda sobre `AGENTS.md`

[`AGENTS.md`](../../AGENTS.md) y la [tarjeta de decisión](../tarjeta-de-decision.md) siguen siendo la ley del código: mobile first, ningún color en el marcado, clases en `class='…'`, no inventar contenido, `actionUrl` vacío. Este documento sólo dice **cómo se hablan los agentes**. Ante conflicto, manda `AGENTS.md`.

---

## 📬 Tipos de mensaje

| Tipo | Qué es | Quién lo crea | Quién lo cierra |
| --- | --- | --- | --- |
| **TASK** | Tarea de trabajo asignada a un agente | Claude (CTO) o Miguel | Claude, cuando el entregable + review están ✅ |
| **RFC** | Propuesta técnica o cambio de diseño que pide opinión | Cualquiera | Claude (CTO), con veto de Miguel |
| **REVIEW** | Revisión de un branch/PR | Codex (**nadie más emite reviews**) | Codex (veredicto) + CTO si el cambio es 🔴 |
| **DECISION** | Decisión vinculante para el proyecto | Claude (CTO) o Miguel | Miguel, o el CTO con silencio de Miguel > 48h en decisiones no estratégicas |
| **BLOCKER** | Algo que impide avanzar y no lo resuelve quien lo encuentra | Cualquiera | Quien lo desbloquea |
| **STATUS** | Estado por agente, en `/docs/status/` | Cada agente el suyo | Nunca se cierra; se actualiza |

**Nomenclatura:** `TIPO-###-slug-corto.md`, correlativo global por tipo. Ejemplo: `TASK-001-fase-javascript.md`.

> ⚠️ **Aquí no hay PM ni Arquitecto.** En el proyecto de origen, Misato creaba las TASKs y Lelouch aprobaba el diseño. Esas dos funciones las absorbe el **CTO**, y Miguel conserva el veto sobre ambas. Si el equipo crece, se separan otra vez.

---

## 📄 Anatomía de un mensaje

```markdown
---
tipo: TASK
id: TASK-001
titulo: Implementar la fase de comportamientos
de: claude
para: antigravity
cc: [codex]
prioridad: P0            # P0 | P1 | P2
estado: ABIERTA
area: scripts            # styles | components | pages | scripts | assets | plugins | docs
criticidad: "🟡"         # 🔴 | 🟡 | 🟢 — ver § Criticidad
relacionado: [origen-comportamientos.json]
creado: 2026-09-07
actualizado: 2026-09-07
---

# TASK-001 — (título)

## Contexto
(por qué existe; enlaces a docs)

## Pedido
(qué se espera exactamente)

## Criterios de aceptación
- [ ] …
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde, `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] REVIEW de Codex ✅ (+ sign-off del CTO si 🔴)

## 💬 Hilo
> **[2026-09-07 15:00] claude:** creo la task.
> **[2026-09-07 16:10] antigravity:** la tomo. Duda: …
```

Reglas del hilo:

- Formato: `> **[fecha hora] agente:** texto` — **append-only**, siempre al final.
- El cambio de `estado` lo hace quien tiene permiso, editando el frontmatter **y** dejando entrada en el hilo.
- Un commit por intervención: `comms(TASK-001): antigravity toma la task`.

---

## 🔄 Ciclo de estados

```text
ABIERTA ──▶ EN_PROGRESO ──▶ EN_REVISION ──▶ CERRADA ✅
   │             │               │
   │             ▼               ▼
   │         BLOQUEADA ⏸️     RECHAZADA ❌
   │        (→ BLOCKER-XXX)  (con motivo en el hilo)
   └──▶ RECHAZADA ❌ (no procede)
```

Al cerrar (✅ o ❌): mover la fila del [`tablero.md`](tablero.md) a «Cerrados». **El MD nunca se borra**: es el historial.

---

## 🔐 Matriz de permisos

| Acción | Miguel | Claude (CTO) | Codex (Lead / Reviews) | Antigravity (DEV) |
| --- | :---: | :---: | :---: | :---: |
| Crear TASK | ✅ | ✅ | ❌ (la pide en el hilo) | ❌ (la pide en el hilo) |
| Asignar prioridades | ✅ | ✅ | proponer | proponer |
| Crear RFC | ✅ | ✅ | ✅ | ✅ |
| Aprobar RFC | veto | ✅ | ❌ | ❌ |
| Emitir REVIEW | — | ❌ (audita, no revisa) | ✅ **exclusivo** | ❌ |
| Sign-off de cambios 🔴 | veto | ✅ **obligatorio** | prerequisito | ❌ |
| Emitir DECISION | ✅ | ✅ | ❌ | ❌ |
| Cerrar DECISION | ✅ | ✅ (no estratégicas) | ❌ | ❌ |
| Escribir código de producto | ✅ | ❌ **(ver nota)** | ❌ (prototipos en el hilo) | ✅ **dueño** |
| Tocar `styles.css` `@theme` / `config.pug` | ✅ | especifica y aprueba | ❌ | ✅ sólo con TASK 🔴 aprobada |
| Mergear a `main` | ✅ | ✅ | ❌ | ✅ sólo con el gate cumplido |
| Editar `tablero.md` | ✅ | ✅ | ✅ (sus filas) | ✅ (sus filas) |

> 🧠 **El CTO no implementa.** Especifica, audita y aprueba. Ejecuta comandos —`pnpm lint`, `build`, `verify:render`— porque tiene el repositorio delante y necesita comprobar antes de firmar, pero **no escribe features**. Si Miguel se lo pide directamente, entonces sí, y queda dicho en el hilo.

---

## 🚦 Criticidad y gates de merge

La criticidad **no se hereda del proyecto de origen**: aquí no hay Orders ni Inventory. Se mide por **cuánto se propaga un error y cuánto cuesta deshacerlo**.

| Nivel | Qué entra | Por qué |
| --- | --- | --- |
| 🔴 | `src/styles/styles.css` (`@theme`), `src/components/config.pug`, `src/layouts/main-template.pug`, `plugins/*.js`, nombres de campo de formulario, `actionUrl`, GTM | Un token mal puesto cambia las 22 páginas a la vez; un nombre de campo mal escrito manda datos a la nada; tocar un verificador desactiva la red de seguridad de todos. |
| 🟡 | Mixins compartidos de `src/components/`, módulos de `src/scripts/`, `main.js`, assets y sprite | Afectan a varias páginas, pero el fallo se ve. |
| 🟢 | Una página suelta de `src/pages/`, documentación, contenido de relleno | El radio de daño es el propio archivo. |

| Criticidad | Requisito para mergear |
| --- | --- |
| 🔴 | REVIEW de Codex ✅ **+ sign-off de Claude (CTO)** en el mismo MD + la verificación completa en verde |
| 🟡 | REVIEW de Codex ✅ + verificación completa en verde |
| 🟢 | REVIEW ligero de Codex, puede ser posterior al merge |

**«Verificación completa» es la de `AGENTS.md`**, sin sustitutos ni resúmenes:

```bash
pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm verify:render && pnpm validate:origen
```

Se pega la **salida real** en el hilo del MD, no un «pasó todo». Y se mira la página servida: ningún comando sabe si se parece al original.

---

## 🔁 Flujo típico

```text
1. Claude (CTO) crea TASK-XXX — alcance, criterios, criticidad     [ABIERTA]
2. Si hay diseño que decidir: RFC en el hilo → el CTO aprueba
3. Antigravity la toma y trabaja en feat/TASK-XXX-slug             [EN_PROGRESO]
4. Pide review en el hilo → Codex emite REVIEW-YYY                 [EN_REVISION]
   └─ ✅ / ⚠️ / ❌ con hallazgos; Antigravity corrige e itera
5. Si es 🔴 → Claude (CTO) firma el sign-off en REVIEW-YYY
6. Antigravity mergea → el CTO verifica criterios y cierra          [CERRADA ✅]
7. Cada agente actualiza su status/{agente}-status.md
```

**Codex no ejecuta código.** Cuando necesite evidencia, la pide en el hilo y la corre Antigravity —o el CTO— y se pega la salida.

---

## ⚖️ Desacuerdos

1. Se debate **en el hilo del MD**, máximo dos rondas por agente.
2. Sin consenso → se etiqueta al CTO (`cc: claude`) → el CTO emite `DECISION-XXX`.
3. Miguel puede vetar o revertir cualquier DECISION. Su palabra cierra el tema.

---

## 🕐 Rutina de sesión (todos)

1. `git pull`
2. Leer [`tablero.md`](tablero.md) → filtrar los mensajes donde figure en `para:` o `cc:`
3. Responder hilos / avanzar sus TASKs
4. Actualizar su `status/{agente}-status.md` si algo cambió
5. Actualizar sus filas del tablero
6. Commit + push: `comms(ID): resumen corto`

---

## 📂 Estructura

```text
docs/
├── equipo.md                  ← quién es quién y la cadena de mando
├── agentes/
│   ├── claude.md
│   ├── codex.md
│   └── antigravity.md
├── status/
│   ├── claude-status.md
│   ├── codex-status.md
│   └── antigravity-status.md
└── comms/
    ├── README.md              ← este protocolo
    ├── tablero.md             ← índice vivo
    ├── plantillas/{TASK,RFC,REVIEW,DECISION}.md
    └── TASK-001-….md          ← los mensajes, planos en esta carpeta
```

---

## ✅ Aprobado por Miguel — 2026-09-07

Registrado en [DECISION-001](DECISION-001-protocolo-y-roster.md):

1. ✅ **El CTO absorbe las funciones de PM y Arquitecto** —crear TASKs, priorizar y aprobar RFCs— mientras el equipo sea de tres.
2. ✅ **El gate 🔴 con doble aprobación** (Codex + CTO) sobre tokens, `config.pug`, el layout y los verificadores.
3. ✅ **La regla de cierre de DECISION por silencio de 48h** queda como está: en decisiones no estratégicas, si Miguel no responde en 48h, el CTO cierra. Las estratégicas siguen necesitando su ✅ explícito (`estrategica: true` en el frontmatter).

El protocolo está **ACTIVO**: cada agente adopta la rutina de sesión desde ya.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-07 | Claude (CTO) | Adaptación del protocolo de `~/Servers/ecommerce` a un equipo de tres agentes |
| v1.1 | 2026-09-07 | Miguel | Aprobado. Status → ACTIVO. Los tres puntos pendientes quedan confirmados en DECISION-001 |
