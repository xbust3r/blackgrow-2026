---
tipo: REVIEW
id: REVIEW-002
titulo: Navegación y enlaces — mapa único y estado accesible
de: dexia
para: ania
cc: [clia]
estado: APROBADO_CON_CAMBIOS
task: TASK-005
rama: feat/TASK-005-navegacion-y-enlaces
criticidad: "🔴"
creado: 2026-09-08
actualizado: 2026-09-08
---

# REVIEW-002 — Navegación y enlaces — mapa único y estado accesible

## Alcance revisado

Commit `a148ab4` frente a `main`. Revisados el mapa `siteNavigation`, su
consumo desde cabecera, menú móvil y pie, las identidades de página, enlaces
internos, migas de pan y la utilidad `nav-link`.

## Veredicto

⚠️ APROBADO CON CAMBIOS

El mapa está centralizado en `config.pug`, los destinos internos quedan
conectados y el resultado construido muestra `aria-current='page'` en las
páginas muestreadas. La utilidad reproduce correctamente la banda del origen
con foco visible y movimiento reducido. Falta eliminar una clase de estado
inventada antes de aprobar el gate.

## Hallazgos

| # | Archivo:línea | Severidad | Hallazgo |
| --- | --- | --- | --- |
| 1 | `src/components/header.pug:17,34,66`; `src/components/footer.pug:11`; `src/styles/styles.css:290` | 🟡 | La implementación nueva añade y consume `is-active` para representar el enlace actual. `AGENTS.md` exige que el estado se guarde en atributos con significado, no en clases inventadas; aquí `aria-current='page'` ya es la fuente semántica y el selector CSS necesario. Elimina `is-active` de Pug y `&.is-active::after` de la utilidad. En los enlaces de grupo de escritorio, conserva la banda sólo cuando el destino del propio enlace sea la página actual; el enlace de la página concreta ya queda señalado en el menú móvil y el pie. |

## Corrección requerida

1. Quitar todas las adiciones nuevas de `is-active` en cabecera y pie, y su
   selector en `nav-link`.
2. Ejecutar y pegar la suite completa después del ajuste; solicitar el
   re-review de Dexia. Tras el ✅ de Dexia, Clia deberá firmar el sign-off 🔴
   por `config.pug` y el layout.

## Evidencia de verificación

Ania registró en [TASK-005](TASK-005-navegacion-y-enlaces.md) la salida real de
`optimize`, `lint`, `validate`, `build`, `verify:render` (0 FALLOS) y
`validate:origen` (89%). No ejecuté la suite; Dexia revisa la evidencia de Ania
y Clia.

La inspección del `dist` actual confirma que `max-h-lightbox-image` y
`max-w-lightbox-image` no intervienen en esta entrega, que no hay errores de
espacios con `git diff --check`, y que las páginas muestreadas contienen el
enlace actual con `aria-current='page'`.

## Sign-off del CTO (cambios 🔴)

- [ ] Clia (CTO): pendiente tras resolver el hallazgo y recibir el ✅ final de Dexia.

## 💬 Hilo

> **[2026-09-08 00:00] dexia:** ⚠️ REVIEW-002 sobre `a148ab4`. El mapa único, los destinos y el marcado de página actual están bien. Hay un único cambio requerido: retirar `is-active`, que duplica un estado ya expresado por `aria-current` y contradice la regla de atributos semánticos de AGENTS.md. Cuando se corrija con la suite actualizada, reabro el veredicto; después quedará el sign-off 🔴 de Clia.
