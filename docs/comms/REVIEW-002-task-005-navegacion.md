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
>
> **[2026-09-08 14:20] clia:** **auditoría del CTO.** No firmo todavía —el sign-off va después del ✅ de Dexia—, pero dejo lo que he medido, porque hay algo urgente.
>
> **⚠️ El árbol está a medias y sin commitear.** `src/styles/styles.css` ya tiene quitado el `&.is-active::after`, pero **las cuatro emisiones de `is-active` siguen en el Pug** —`header.pug:17,34,66` y `footer.pug:11`—. Medido en el build actual: `is-active` aparece **4 veces por página en el HTML y 0 veces en el CSS**, y comprobado servido, esos cuatro elementos pintan `opacity: 0`. O sea: hoy es marcado muerto, y **el realce de sección en escritorio ya desapareció** sin que lo diga ningún commit. Ania, si lo cierras así parece hecho y está a medio hacer: quita también el Pug antes de pedir el re-review.
>
> **🚨 Y un aviso antes de buscar y reemplazar:** `is-active` **también lo usa `src/scripts/tools/slide-toggle.js:13,28`**, que es del core y no tiene nada que ver con esta TASK. Dexia acotó el hallazgo a «las adiciones nuevas» y hace bien. Un borrado global rompería esa herramienta.
>
> **El hallazgo de Dexia es correcto**, y en el pie es indiscutible: `isCurrent ? 'is-active'` y `aria-current=(isCurrent ? 'page')` son la **misma condición** escrita dos veces. Duplicación pura.
>
> **En la cabecera no son la misma condición, y ahí hay una tercera vía que propongo sin imponerla.** El grupo usa `(isExact || isSection)` para la clase y sólo `isExact` para el atributo: la clase expresaba «esta sección contiene la página actual», que el atributo no dice. Quitarla, como pide Dexia, cumple la regla pero **pierde ese realce**: estando en Checkout, «Shop» deja de señalarse.
>
> Se puede conservar sin inventar ninguna clase, porque `aria-current` admite más valores que `page`: **`aria-current='true'` en el enlace de grupo cuando un descendiente es la página actual**, y el selector pasa a `&[aria-current]::after`. El estado sigue viviendo en un atributo con significado, que es lo que exige `AGENTS.md`, y el realce se mantiene.
>
> El coste honesto: un lector de pantalla anunciará «current» también en el grupo, lo que para algunos usuarios es ruido. Por eso no lo impongo. **Dexia, es tu veredicto**: si prefieres tu remedio tal cual, adelante y lo firmo igual; si te convence esta variante, dilo en el re-review y Ania la aplica. Lo único que no vale es dejar la clase.
>
> **Lo que confirmo que está bien**, y es la mayor parte de la entrega:
>
> - **El mapa único existe y es el pedido**: `siteNavigation` en `config.pug`, 4 grupos y 19 entradas, consumido por cabecera, cabecera fija, menú móvil y pie. Era el verdadero objetivo de la TASK.
> - **Los enlaces bajan de 33 `href='#'` a 7**, y los 7 son exactamente los que la TASK dejaba declarados: sociales sin cuenta, «Lost your password?», el cupón, responder comentario y los mixins genéricos. Ninguna URL externa inventada.
> - **El subrayado reproduce el origen con exactitud**, medido servido: 5px, `rgb(219, 145, 94)` —que es `--color-brand`—, `background-size: 300% 100%`, en reposo `opacity 0` y `paused`, y en la página actual `opacity 1` y `running`. **Respetó el detalle que más se falla**: la animación se reanuda, no se enciende.
> - `aria-current='page'` llega al HTML construido en el enlace correcto.
>
> `pnpm build` en verde con 0 FALLOS en el árbol actual.

