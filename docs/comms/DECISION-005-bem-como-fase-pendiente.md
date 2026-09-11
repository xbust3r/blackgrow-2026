---
tipo: DECISION
id: DECISION-005
titulo: La convergencia a BEM queda como fase pendiente, gradual y sin fecha
de: clia
para: [dexia, ania]
cc: [miguel]
estado: EFECTIVA
estrategica: true
relacionado: [contrato-con-el-tema.md]
creado: 2026-09-11
actualizado: 2026-09-11
---

# DECISION-005 — BEM como fase pendiente

## Contexto

`blackgrow-2026` es de la **familia clásica**: utilidades de Tailwind y tokens en `@theme`. La otra familia de proyectos —`freeway-3.0-html` y sus temas— usa **BEM** con el estándar `c-section`. Ambas están documentadas en [`contrato-con-el-tema.md`](../contrato-con-el-tema.md).

Miguel pregunta por la viabilidad de converger. Medido sobre el repositorio:

| | |
| --- | --- |
| Atributos `class=` a reescribir | **694** |
| Instancias de clase de utilidad | **2.887** · 435 distintas |
| Componentes `.pug` · páginas | 57 · 22 |
| Componentes de sección que porta el tema | **16** |
| CSS que hoy **no hay que escribir** y habría que escribir | ~57 bloques |

Lo caro no es renombrar. Es que **hay que escribir a mano el CSS que hoy generan las utilidades** —justo el trabajo que se eliminó al dejar `lp-core`—, que **se caen las redes de seguridad** —`verify:render` comprueba «un color en el marcado es FALLO» y «un valor arbitrario repetido es un token que falta», y ambas asumen utilidades—, y que **el coste se paga en dos repositorios**: `wp-blackgrow-theme` copia el HTML clase por clase.

## Decisión

**La convergencia a BEM queda como fase pendiente, gradual y sin fecha.** No se empieza hoy y **no se renombra nada** sin una TASK que lo diga.

### Cómo se hace gradual, porque «poco a poco» choca con el contrato

[`contrato-con-el-tema.md`](../contrato-con-el-tema.md) dice: *«una eventual convergencia a BEM afectaría a los 16 componentes de sección a la vez. No se haría por goteo: el tema compara clase por clase.»* Eso es cierto **del esqueleto**, no de todo. La resolución es separar las dos cosas:

| Fase | Qué | ¿Divisible? |
| --- | --- | --- |
| **0 · Hoy** | No se renombra nada. El estándar queda documentado y **los componentes nuevos se escriben en Forma B**, que es la más cercana a BEM. La brecha deja de crecer. | — |
| **1 · El esqueleto** | `c-section`, `o-wrapper` y `c-section__content` en los 16 componentes de sección. | **No.** Es atómico: media docena en BEM y media en utilidades obliga al tema a cargar dos convenciones |
| **2 · El interior** | Las utilidades de dentro de cada componente pasan a elementos y modificadores BEM. | **Sí, componente a componente** |

Es decir: **el esqueleto es indivisible, el interior sí va poco a poco.** Eso es lo que hace compatible la instrucción de Miguel con el contrato.

### Lo que no se toca en ninguna fase

- **Los 44 hooks `js-*` y los `data-*`.** Son contrato con el tema y se portan textualmente.
- **`.snap-start`.** Parece utilidad y la lee `carousel.js`. Un renombrado masivo la barre y el carrusel sigue andando mal, sin error.
- **Los 51 tokens de `@theme`.** BEM también necesita variables; lo que cambia es quién las consume.

## Motivo

**Por qué se acepta como fase y no como trabajo inmediato.** No arregla ningún problema actual: el proyecto está en verde, con cobertura completa y jerarquía correcta. Migrar hoy sería cambiar de convención, no ganar nada — y con los verificadores caídos durante el proceso, que es cuando más falta hacen.

**Por qué sí se registra y no se descarta.** La razón buena es la coherencia entre familias, y es legítima: mantener dos arquitecturas de front obliga a cambiar de cabeza al saltar de proyecto, y eso se paga en errores. Además **el coste crece con el tiempo**: cada componente que el tema porta hoy es uno más que re-copiar mañana.

**Lo que hace que «gradual» sea viable y no una trampa** es la Fase 0. Sin ella, la brecha sigue creciendo mientras la fase espera, y dentro de un año la migración es más cara que hoy. Con ella, esperar no cuesta.

## Consecuencias

- Los **componentes nuevos se escriben en Forma B** —`section` a sangre con `div.wrapper` dentro—, que separa los dos papeles igual que BEM. Hoy sólo tres de dieciséis lo hacen.
- Cuando se decida arrancar, la Fase 1 **es una sola TASK 🔴** que toca los 16 a la vez, coordinada con el tema. No se admite por goteo.
- Esta decisión **no obliga a converger**. Si se decide no hacerlo, se cierra con otra decisión de una línea.

## Vigencia

Efectiva desde **2026-09-11**, a petición de Miguel. Sin fecha de inicio.

## 💬 Hilo

> **[2026-09-11 11:00] miguel:** pongamos BEM como una fase pendiente que se verá poco a poco.
> **[2026-09-11 11:10] clia:** registrada. Señalo el choque en vez de esconderlo: el contrato dice que la convergencia **no se hace por goteo** porque el tema compara clase por clase, y eso contradice «poco a poco» tal cual. Lo resuelvo separando esqueleto —atómico— de interior —gradual—; si prefieres otra división, se cambia aquí. Y añado la Fase 0, que es lo único que hago hoy: escribir los componentes nuevos en Forma B para que la brecha no crezca mientras la fase espera.
