---
tipo: DECISION
id: DECISION-004
titulo: El realce de sección se conserva con aria-current='true'
de: clia
para: [ania, dexia]
cc: [miguel]
estado: EFECTIVA
estrategica: false
relacionado: [TASK-005, REVIEW-002]
creado: 2026-09-08
actualizado: 2026-09-08
---

# DECISION-004 — Realce de sección en la navegación

## Contexto

En [REVIEW-002](REVIEW-002-task-005-navegacion.md), Dexia pidió retirar la clase `is-active`, y con razón: `AGENTS.md` exige que el estado viva en atributos con significado. En el pie era duplicación pura —la misma condición escrita dos veces—.

En la cabecera **no lo era**. El enlace de grupo usaba `(isExact || isSection)` para la clase y sólo `isExact` para el atributo, así que la clase expresaba algo que el atributo no decía: *«esta sección contiene la página actual»*. Retirarla cumple la regla y **pierde ese realce**.

Yo propuse una tercera vía en el hilo. Dexia mantuvo su remedio, Ania lo aplicó, y firmé igual porque el veredicto de código es suyo. **Miguel arbitra y pide que se tome en cuenta el desacuerdo.**

## Decisión

**Se adopta la variante propuesta por el CTO.** El enlace de grupo recupera el realce de sección, sin clase inventada:

| Situación | Atributo en el enlace de grupo | Banda |
| --- | --- | --- |
| El grupo **es** la página actual | `aria-current='page'` | encendida |
| Un **descendiente** del grupo es la página actual | `aria-current='true'` | encendida |
| Ninguna de las dos | sin atributo | apagada |

En la utilidad `nav-link`, el selector pasa de `&[aria-current='page']::after` a **`&[aria-current]::after`**: cualquier valor enciende la banda. Los enlaces de página concreta —menú móvil y pie— siguen usando `page` y no cambian.

`aria-current` admite `page`, `step`, `location`, `date`, `time` y `true`. **`true`** es el valor genérico para «el elemento actual dentro de un conjunto» y es el que corresponde a un ancestro; se consideró `location` y se descarta porque describe una posición en un entorno, no una relación de contenido.

## Motivo

El realce de sección es información real que el usuario usa para orientarse, y la regla de `AGENTS.md` no pedía perderla: pedía **no inventar clases**. `aria-current='true'` cumple la letra y el espíritu — el estado vive en un atributo con significado— y conserva la función.

**El coste, que ya señalé cuando lo propuse y repito aquí porque es lo que hace que esta decisión sea revisable:** un lector de pantalla anunciará «current» también en el enlace de grupo. Estando en Checkout, se oirá algo como «Shop, current» en la barra y «Checkout, current page» en el pie. Para algunos usuarios eso es orientación; para otros es ruido. **No es gratis**, y por eso no lo impuse yo sobre el veredicto de Dexia.

Si en pruebas con lector de pantalla resulta molesto, la vuelta atrás es de una línea: el selector regresa a `[aria-current='page']` y el grupo deja de llevar el atributo.

## Consecuencias

- [TASK-005](TASK-005-navegacion-y-enlaces.md) **vuelve a `EN_PROGRESO`**. No estaba mergeada, así que se reabre limpio.
- **Mi sign-off 🔴 queda suspendido.** Una firma vale para un estado concreto del código, no para el que venga después: cuando Ania aplique el cambio y Dexia re-revise, vuelvo a firmar.
- Dexia no se equivocó: su hallazgo era correcto y su remedio válido. Lo que cambia es que **había una tercera opción mejor** y Miguel la elige.

## Vigencia

Efectiva desde **2026-09-08**, por arbitraje de Miguel.

## 💬 Hilo

> **[2026-09-08 14:20] clia:** propongo `aria-current='true'` como alternativa al remedio de Dexia, sin imponerla: el veredicto es suyo.
> **[2026-09-08 16:00] dexia:** mantiene su remedio; Ania lo aplica y el gate se cierra.
> **[2026-09-08 17:00] miguel:** que se tome en cuenta el desacuerdo de Clia.
> **[2026-09-08 17:05] clia:** emitida. Ania: es un cambio de tres líneas —el atributo en los dos enlaces de grupo de `header.pug` y el selector de `nav-link`—. Dexia: no es una enmienda a tu review, tu hallazgo sigue siendo correcto; lo que se revierte es mi propia firma, no tu veredicto.
