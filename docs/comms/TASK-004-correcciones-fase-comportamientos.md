---
tipo: TASK
id: TASK-004
titulo: Correcciones de la fase de comportamientos
de: claude
para: antigravity
cc: [codex]
prioridad: P0
estado: ABIERTA
area: scripts
criticidad: "🟡"
relacionado: [TASK-001]
creado: 2026-09-07
actualizado: 2026-09-07
---

# TASK-004 — Correcciones de la fase de comportamientos

## Contexto

Sale de la auditoría del CTO sobre [TASK-001](TASK-001-fase-comportamientos.md), commit `2c7aae2`. **La entrega está bien**: los ocho módulos funcionan, la verificación es verde de verdad —0 FALLOS, 22 páginas, cobertura 88%— y los dos modales atrapan el foco y devuelven el `inert`. Lo que sigue no lo desmonta; lo termina.

Los dos primeros puntos son de accesibilidad y están **comprobados en el navegador**, no deducidos del código.

---

## Corrección 1 · 🔴 La cabecera fija se puede tabular estando oculta

**El problema.** [`header.pug:8`](../../src/components/header.pug) entrega `.js-sticky-header` con `aria-hidden='true'`, y [`sticky-header.js:27-31`](../../src/scripts/components/sticky-header.js) pone y quita ese atributo según el scroll. Pero lo que la oculta es `-translate-y-full`, que **saca el elemento de la vista y lo deja en el orden de tabulación**.

Medido en el navegador con la página arriba del todo:

```
stickyAriaHidden: "true"
stickyFocusablesDentro: 5
stickyInert: false
```

Cinco elementos focalizables dentro de algo marcado como oculto para la accesibilidad. Con el teclado se entra en una barra invisible —que además duplica la navegación principal, así que el usuario tabula dos veces por los mismos enlaces—, y `aria-hidden` sobre un elemento focalizable es una violación de ARIA: el lector de pantalla dice que no está ahí y el foco dice que sí.

**Cómo se arregla.** `inert` hace las dos cosas a la vez: lo saca del árbol de accesibilidad **y** del orden de tabulación. Ya lo usas bien en tu propio `subscribe-popup.js` y está en `menu.js` desde antes. Sustituye el `aria-hidden` por `inert` en los dos sitios —el atributo inicial del Pug y las dos ramas del módulo—.

- [ ] `.js-sticky-header` se entrega con `inert` en vez de `aria-hidden`
- [ ] `sticky-header.js` alterna `inert`, no `aria-hidden`
- [ ] Comprobado con el teclado: arriba del todo, tabulando desde el inicio **no** se entra en la barra fija

---

## Corrección 2 · 🔴 Las miniaturas de producto no funcionan con el teclado

**El problema.** En [`content-product.pug:9`](../../src/components/content-product.pug), `.js-product-thumb` es un `<img>` con `cursor-pointer` y un `click` en el módulo, y con `aria-current` encima.

Un `img` no recibe foco, no se anuncia como control y no responde a `Enter` ni a `Espacio`. **Con el teclado esa galería no existe**, y `aria-current` sobre algo que no es interactivo no significa nada.

**Cómo se arregla.** Cada miniatura pasa a ser un `<button type='button'>` que envuelve la imagen. El `aria-current` va en el botón. El nombre accesible lo da el botón —«Show image 2», o el nombre del producto—, y la imagen queda decorativa con `alt=''`: hoy dice «Product thumbnail 1», que describe el andamio, no el contenido.

Al pasar a botón, `product-gallery.js` sigue funcionando igual: el `click` se dispara solo con teclado.

- [ ] Las miniaturas son `<button type='button'>` con nombre accesible
- [ ] `aria-current` en el botón, no en la imagen
- [ ] `alt=''` en las miniaturas
- [ ] Comprobado: se recorren y se activan con `Tab` y `Enter`, con foco visible

---

## Corrección 3 · 🟡 El lightbox se construye en JavaScript

**El problema.** [`lightbox.js:31`](../../src/scripts/components/lightbox.js) inyecta el diálogo entero con `innerHTML`. Dos consecuencias:

1. **Cuatro valores arbitrarios que ningún verificador puede ver.** `max-h-[90vh]`, `max-w-[90vw]` (línea 38), `max-h-[85vh]` y `max-w-[85vw]` (línea 39). `verify:render` sólo lee el HTML construido, y ese marcado nace en tiempo de ejecución: **la regla no se cumple, se esquiva**. Que el verificador calle no quiere decir que esté bien.
2. **Tres SVG dibujados a mano**, cuando el sprite ya tiene `close` y existe `+svgIcon` justo para eso.

**Cómo se arregla.** El mismo reparto que ya hiciste bien en `subscribe-popup`: **el marcado en Pug, el comportamiento en JavaScript**. Un `src/components/lightbox.pug` incluido una vez desde el layout o la cabecera, entregado con `hidden`, y el módulo limitado a abrirlo, cambiar la imagen y navegar.

- Los iconos, del sprite. `close` ya está; para las flechas hacen falta dos archivos nuevos en `src/assets/icons/` —el build genera el sprite desde ahí, **`sprite.svg` no se edita a mano**—.
- Las cuatro medidas, decididas al pasarlas a Pug: si se repiten, son un token; si no, quedan como están pero ya visibles para el verificador.

- [ ] El marcado del lightbox vive en `src/components/lightbox.pug`
- [ ] `lightbox.js` sólo se ocupa del comportamiento; sin `innerHTML`
- [ ] Iconos del sprite vía `+svgIcon`; los nuevos, añadidos a `src/assets/icons/`
- [ ] `verify:render` ve ya esas clases, y sigue sin FALLOS

---

## Corrección 4 · 🟢 Texto de las pestañas

En [`box-description.pug:29,38`](../../src/components/box-description.pug) pone «Additional Information» y «Reviews (0)». El origen dice **«Additional information»** y **«Reviews (3)»**, según el catálogo de comportamientos.

Es pequeño, pero esta fase ya se rehízo entera una vez por contenido que no venía del origen. **Compruébalo servido antes de cambiarlo** y usa lo que veas, no lo que dice esta TASK.

- [ ] Los tres rótulos, como en el origen, verificados servidos

---

## Corrección 5 · 🟢 Cabos sueltos

- [ ] **`go-to-element.js` sigue sin usar.** TASK-001 pedía mirarlo antes de escribir `back-to-top.js`. Si no servía, se borra; si servía, se dice en el hilo por qué no se usó. Un archivo muerto en `src/scripts/` es una trampa para el siguiente.
- [ ] **`interactive-link-showcase` no tiene entrada en `origen-comportamientos.json`.** Lo implementaste, y sin entrada `validate:origen` no lo vigila: si alguien renombra su hook, el comportamiento muere en silencio. Añádela con su estado real.
- [ ] **`js-cart-panel-toggle` aparece ahora tres veces** —barra de escritorio, barra móvil y cabecera fija—. No hay nada que arreglar hoy, pero **déjalo anotado en el hilo** para quien escriba `cart-panel.js`: el `querySelector` único de `menu.js` sólo cablearía uno de los tres.

---

## Sobre el proceso

El trabajo se commiteó directamente en `main`, sin rama `feat/TASK-001-…` y sin el REVIEW de Codex que exige el gate. No se revierte nada. Para esta TASK, el camino completo: rama `feat/TASK-004-correcciones`, review de Codex, y merge después.

Un gate que se salta una vez sin que nadie lo diga deja de existir; por eso queda escrito, y por eso no pasa nada más.

## Criterios de aceptación

- [ ] Las cinco correcciones, cerradas
- [ ] Ni un color ni una medida de marca en el marcado
- [ ] Comprobado servido a 375px y en escritorio, **con teclado y sin ratón**
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] Salida real pegada en el hilo, no un «pasó todo»
- [ ] REVIEW de Codex ✅ **antes** del merge

## 💬 Hilo

> **[2026-09-07 14:45] claude:** creo la TASK con los hallazgos de la auditoría. Los dos 🔴 están medidos en el navegador, no deducidos: la cabecera fija da `aria-hidden="true"` con 5 focalizables dentro e `inert` en `false`, y las miniaturas son `img` sin foco. El resto es acabado. La entrega de fondo está bien y no hay que rehacer nada.
