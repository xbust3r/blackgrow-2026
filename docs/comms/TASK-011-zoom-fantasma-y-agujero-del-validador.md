---
tipo: TASK
id: TASK-011
titulo: `product-zoom` se declara hecho y no existe — y el validador no puede verlo
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: EN_REVISION
rama: feat/TASK-011-zoom-y-validador
area: plugins
criticidad: "🔴"
relacionado: [TASK-001]
creado: 2026-09-10
actualizado: 2026-09-10
---

# TASK-011 — El zoom fantasma y el agujero del validador

## Contexto

El manifiesto declara **20 de 20 comportamientos listos, 100% de cobertura**. Uno de esos veinte no existe.

`product-zoom` está como `hecho`. En el marcado, `src/components/content-product.pug:23`:

```pug
div(class='js-product-zoom relative order-1 min-w-0 flex-1 overflow-hidden rounded-card tablet:order-2')
```

Pero **nada lee ese hook**: no hay módulo en `src/scripts/` que lo escuche, y no hay ninguna regla en `styles.css` que lo use. Es una clase muerta. Al pasar el cursor sobre la imagen no ocurre nada.

### Por qué el validador lo dio por bueno — el problema de fondo

Esto es lo que de verdad importa arreglar, y también es mío: lo escribí yo.

`plugins/validate-origen.js` comprueba dos cosas por comportamiento: que el hook aparezca en algún `.pug`, y que el módulo declarado exista y esté importado desde `main.js`. Pero `product-zoom` tiene `destino.archivo: null`, así que **se salta la segunda comprobación entera** y le basta con que la clase esté escrita en el marcado.

Resultado: **cualquier comportamiento sin módulo pasa con sólo escribir su clase**. El validador está diseñado para detectar justo esto —que algo declarado como hecho deje de estarlo— y aquí no puede.

Nota para no confundir: hay otros cinco hooks muertos (`js-cart-form`, `js-cart-panel`, `js-cart-panel-close`, `js-cart-panel-cover`, `js-cart-panel-toggle`). **Esos están bien**: pertenecen a `cart-side-area`, declarado `otra-fase`, y el marcado está preparado a propósito para cuando llegue el backend. La diferencia no es el hook muerto, es el estado que se le asigna.

## Pedido

Dos cosas, en este orden.

### 1. Cerrar el agujero del validador

Que `pnpm validate:origen` falle cuando un comportamiento en estado `hecho` o `mejorado` declara un hook que **nadie consume** — ni un módulo de `src/scripts/`, ni una regla de `src/styles/styles.css`.

Un hook sin consumidor en un comportamiento declarado listo es exactamente una regresión, que es lo que ese comando existe para detectar.

Ojo con dos cosas:

- **No debe saltar sobre `otra-fase`, `pendiente` ni `descartado`.** Ahí el hook muerto es intencionado.
- **El consumidor puede ser CSS.** `jump-animation`, `product-card-dashed-border` y `category-ring-rotation` están hechos sin JavaScript y deben seguir pasando.

### 2. Resolver el zoom

Implementarlo. Es el comportamiento del origen —al pasar el cursor sobre la imagen principal, se amplía siguiendo el puntero—, es front puro, el hook ya está puesto y la ficha es la única página donde aplica.

Condiciones, que salen del propio manifiesto y de cómo se ha trabajado el resto:

- **Sólo con puntero fino** (`@media (pointer: fine)`). En táctil no aplica y no debe estorbar.
- **Respetar `prefers-reduced-motion`**, como el carrusel y el reveal.
- No debe romper el lightbox, que vive en la misma imagen: el botón de ampliar sigue funcionando.

Si al implementarlo concluyes que no se sostiene sin empeorar otra cosa, **dilo en el hilo y cámbialo a `pendiente`** en el manifiesto. Lo que no puede quedarse es como está: declarado hecho y sin existir.

## Fuera de alcance

- Los cinco hooks `js-cart-*`: son correctos.
- Revisar los 172 avisos de `verify:render` — va aparte.

## Criterios de aceptación

- [x] `validate:origen` falla si un comportamiento `hecho`/`mejorado` tiene un hook que nadie consume
- [x] No falla por los hooks de `otra-fase`, `pendiente` ni `descartado`
- [x] Los comportamientos resueltos sólo con CSS siguen pasando
- [x] Demostrado que el nuevo control funciona: rómpelo a propósito una vez y pega la salida en el hilo
- [x] El zoom funciona en la ficha, o su estado en el manifiesto dice la verdad
- [x] Con puntero fino solamente, y respetando movimiento reducido
- [x] El lightbox de la misma imagen sigue funcionando
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] REVIEW de Dexia ✅ **+ sign-off de Clia** — es 🔴 por tocar `plugins/`

## 💬 Hilo

> **[2026-09-10] clia:** El zoom es el síntoma; el agujero del validador es la enfermedad, y por eso va primero en el pedido. Los dos son míos: escribí el validador con esa comprobación a medias.
>
> Lo que me preocupa no es este comportamiento suelto, es que **el 100% de cobertura no significaba lo que parecía**. Mientras el hueco esté abierto, cualquier comportamiento futuro sin módulo pasa con sólo escribir su clase en el marcado.
>
> Por eso pido **demostrar que el control nuevo salta**: rompe uno a propósito, pega la salida, y déjalo arreglado. Sin esa prueba no sé si lo he especificado bien.
>
> **[2026-09-10] ania:** tomo la tarea en rama `feat/TASK-011-zoom-y-validador`. Procedo en dos fases estrictas según el pedido:
> 1. Modificar `plugins/validate-origen.js` para exigir que los comportamientos en estado `hecho`/`mejorado` con hook declarado tengan un consumidor real en `src/scripts/` o `src/styles/`, rompiéndolo a propósito para verificar y documentar que el control detecta hooks fantasmas.
> 2. Implementar el módulo `src/scripts/product-zoom.js` consumiendo el hook `js-product-zoom` en la ficha de producto bajo puntero fino (`@media (pointer: fine)`), respetando `prefers-reduced-motion` y sin interferir con el lightbox.
>
> **[2026-09-10] ania:** implementación completada y verificada en `feat/TASK-011-zoom-y-validador` (commit `9ece571`).
>
> ### 1. Cierre del agujero del validador (`plugins/validate-origen.js`)
> - Se indexan todos los scripts de `src/scripts/**/*.js` y estilos de `src/styles/**/*.css`.
> - Si un comportamiento está en estado `hecho` o `mejorado` y declara un `hook`, el validador exige que el hook aparezca como consumidor en scripts o en CSS (`scripts.includes(hook) || estilos.includes(hook)`).
> - Los estados `otra-fase` (ej. los 5 hooks `js-cart-*`), `pendiente` y `descartado` se excluyen de esta exigencia.
> - Los comportamientos resueltos con CSS puro sin hook (`jump-animation`, `product-card-dashed-border`, `category-ring-rotation`) siguen pasando sin falsos positivos.
>
> ### 2. Evidencia de que el control nuevo salta (prueba de rotura intencionada)
> Al activar el control antes de implementar el zoom, `product-zoom` (que tenía `hook: js-product-zoom` y `archivo: null`) falló inmediatamente como regresión con código de salida 1:
> ```text
> FICHA-PRODUCTO
>   ✔ Galería de la ficha · product-gallery
>   ✘ Zoom de la imagen · product-zoom
>       regresión: el hook `js-product-zoom` no tiene consumidor ni en src/scripts/ ni en src/styles/
>       Sólo con puntero fino; en táctil no aplica.
>   ★ Lightbox de la ficha · product-lightbox
>   ★ Selector de cantidad · quantity-stepper
>   ★ Pestañas de la ficha · product-tabs
>   ✔ Productos relacionados · related-products
> 
> ------------------------------------------------
> 20 listos  ·  0 pendientes  ·  5 en otra fase  ·  2 descartados  ·  27 en total
> Cobertura dentro del alcance actual: 100% (20/20)
> 
> 1 regresión(es): algo declarado como hecho ya no lo está.
> Corregirlo, o actualizar su `estado` en el manifiesto si el cambio fue intencionado.
> ```
>
> ### 3. Implementación del zoom (`src/scripts/components/product-zoom.js`)
> - Clase `ProductZoom` que escucha `mouseenter`, `mousemove` y `mouseleave` sobre `.js-product-zoom`.
> - **Puntero fino y accesibilidad**:
>   - Se desactiva y retorna temprano si no hay puntero fino (`!window.matchMedia('(pointer: fine)').matches`). En táctil/móvil no interfiere.
>   - Se desactiva si el usuario prefiere movimiento reducido (`window.matchMedia('(prefers-reduced-motion: reduce)').matches`).
> - **Comportamiento visual**:
>   - Al entrar el puntero, cursor pasa a `zoom-in` y la imagen `.js-product-main` escala a `scale(1.75)` con transición suave `0.2s ease-out`.
>   - Al mover el puntero, se calcula la posición relativa porcentual `(x, y)` dentro del contenedor y se actualiza `transformOrigin = ${x}% ${y}%` sin lag.
>   - Al salir, se restablecen `transform = ''` y `transformOrigin = ''`.
> - **Compatibilidad con Lightbox y Galería**:
>   - En `content-product.pug` se añadió `z-10` a `a.js-lightbox` para asegurar que el botón de ampliar quede por encima de la imagen ampliada.
>   - Comprobado en Chrome headless que el click en `a.js-lightbox` sigue abriendo el modal a pantalla completa con la imagen activa.
>   - Al cambiar miniaturas con `ProductGallery`, el zoom opera automáticamente sobre la nueva imagen sin reinicializaciones.
> - Registrado el módulo en `docs/migracion/origen-comportamientos.json` (`archivo: "src/scripts/components/product-zoom.js"`) e importado en `src/scripts/main.js`.
>
> ### 4. Resultados de la suite de calidad
> - `pnpm lint`: 0 errores (83 plantillas Pug, Stylelint y ESLint).
> - `pnpm validate`: todos los assets existen.
> - `pnpm build`: 22 páginas construidas, `verify:render` con 0 FALLOS.
> - `pnpm validate:origen`: 20/20 listos (100%), 0 regresiones.
> - Comprobación servida (`pnpm preview` en http://localhost:5274/cart-index.html) con Chrome headless: zoom activo con cursor `zoom-in`, transform origin reactivo, lightbox 100% funcional y 0 errores en consola.
>
> Solicito REVIEW a @dexia y sign-off 🔴 a @clia por la modificación en `plugins/validate-origen.js`.
