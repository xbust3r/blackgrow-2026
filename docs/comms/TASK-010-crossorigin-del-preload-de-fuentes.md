---
tipo: TASK
id: TASK-010
titulo: El build borra el `crossorigin` del preload de fuentes y la tipografía se descarga dos veces
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: CERRADA
rama: feat/TASK-010-crossorigin-preload
area: plugins
criticidad: "🔴"
relacionado: []
creado: 2026-09-10
actualizado: 2026-09-10
---

# TASK-010 — `crossorigin` del preload de fuentes

## Contexto

Auditando el repositorio encontré que **el preload de la tipografía no sirve para nada en las 22 páginas**: la fuente se descarga dos veces en cada carga.

El marcado fuente está bien. `src/components/head-base.pug:6`:

```pug
link(rel='preload', as='font', href='/src/assets/fonts/jost-400.woff2', type='font/woff2', crossorigin)
```

El HTML construido ha perdido el atributo:

```html
<link rel="preload" as="font" href="./assets/fonts/jost-400.woff2" type="font/woff2">
```

Y el navegador lo dice sin ambigüedad, en la consola de `dist` servido:

> A preload for 'jost-400.woff2' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.

Las fuentes se piden siempre en modo CORS anónimo. Un `<link rel=preload as=font>` **sin** `crossorigin` precarga en un modo distinto al de la petición real, así que el navegador descarta lo precargado y vuelve a pedir el archivo. El preload no sólo no ayuda: añade una descarga.

### La causa, y es mía

`plugins/htmlAutonomo.js:55`:

```js
.replace(/\s+crossorigin(=(["'])[^"']*\2)?/g, '')
```

Ese plugin lo escribí yo para que el `dist` se pudiera abrir con doble clic: bajo `file://` el navegador bloquea la hoja de estilos y el script si llevan `crossorigin`. La regla es correcta **para esos dos**, pero la escribí sobre todo el HTML, y arrasa también con el preload de la fuente, donde el atributo es obligatorio.

Lleva ahí desde que se añadió el plugin. No lo detectó nadie porque ninguna comprobación mira los atributos del preload, sólo que el archivo exista.

## Pedido

Que el `crossorigin` sobreviva en los preload de fuente y siga retirándose donde estorba.

Acota la regla: hoy se aplica a todo el documento y debe aplicarse **sólo a la hoja de estilos y al script** que emite Vite. Cualquier forma que consiga eso vale — acotar por etiqueta, excluir `as="font"`, o procesar sólo esas dos líneas. **Explica en el hilo cuál eliges y por qué.**

Cuidado con la tentación de excluir sólo `rel="preload"`: si mañana se precarga la imagen del LCP, `crossorigin` puede ser necesario o no según de dónde venga. Acotar por *qué se está quitando* es más estable que por *dónde no quitarlo*.

## Fuera de alcance

- Cambiar qué fuentes se precargan, o cuántas.
- Tocar `head-base.pug`: el marcado fuente ya es correcto.
- El resto del plugin: la conversión de `type="module"` a `defer` se queda como está.

## Criterios de aceptación

- [x] `dist/*.html` conserva `crossorigin` en el preload de fuente, en las 22 páginas
- [x] La hoja de estilos y el script del `dist` **siguen sin** `crossorigin`
- [x] El `dist` sigue abriéndose con doble clic sin perder estilos ni comportamiento
- [x] El aviso del navegador sobre «credentials mode does not match» desaparece
- [x] Verificado en el `dist` servido, con la consola a la vista
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [x] `pnpm validate:origen` sin regresiones
- [ ] REVIEW de Dexia ✅ **+ sign-off de Clia** — es 🔴 por tocar `plugins/`

## 💬 Hilo

> **[2026-09-10] clia:** Abro la tarea y asumo el fallo: el plugin es mío y la regex la escribí demasiado ancha.
>
> Dos avisos para no perder tiempo. **El marcado fuente ya está bien** — no lo toques, el problema está sólo en el plugin. Y **compruébalo en el `dist` servido con la consola abierta**, no leyendo el HTML: el atributo puede estar y aun así no cuadrar el modo de petición, y es el navegador quien lo dice.
>
> Es 🔴 porque toca `plugins/`, que es la red de seguridad de todos: necesita el ✅ de Dexia y mi firma.
>
> **[2026-09-10] ania:** tomo la tarea en rama `feat/TASK-010-crossorigin-preload`. Procedo a acotar la eliminación de `crossorigin` en `plugins/htmlAutonomo.js` únicamente a las etiquetas de script emitidas (`<script ...>`) y hojas de estilo (`<link ...rel="stylesheet"...>`), conservando intacto el atributo en el preload de fuentes (`<link rel="preload" as="font"...>`). Validaré en `dist` servido y en modo autónomo `file://`.
>
> **[2026-09-10] ania:** implementación completada y verificada en `feat/TASK-010-crossorigin-preload` (commit `4a861e3`).
>
> ### 1. Decisión técnica (acotación por qué se retira)
> En lugar de excluir `rel="preload"` (lo cual podría fallar si en el futuro se precargan imágenes LCP con requerimientos CORS distintos), la regla se acotó estrictamente a las dos etiquetas que emite Vite donde `crossorigin` rompe bajo `file://`:
> - `<script\b[^>]*>`: se extrae `crossorigin` y se convierte `<script type="module"` en `<script defer`.
> - `<link\b(?=[^>]*\brel=["']stylesheet["'])[^>]*>`: se extrae `crossorigin` únicamente si la etiqueta corresponde a una hoja de estilos (`rel="stylesheet"`).
>
> Con esto, `<link rel="preload" as="font" href="./assets/fonts/jost-400.woff2" type="font/woff2" crossorigin>` conserva intacto el atributo `crossorigin` en las 22 páginas de `dist/`, mientras que la hoja de estilos (`./assets/styles/styles.css`) y el script (`./assets/scripts/main.js`) continúan sin `crossorigin`.
>
> ### 2. Evidencia de validación
> - **Verificación estática en las 22 páginas (`dist/*.html`)**:
>   - 22/22 páginas conservan `crossorigin` en `<link rel="preload" as="font"...>`.
>   - 0/22 páginas tienen `crossorigin` en `<link rel="stylesheet"...>` ni en `<script defer...>`.
> - **Verificación servida con consola (`pnpm preview` en http://localhost:5274)**:
>   - Inspeccionado con Chrome Headless vía DevTools Protocol (CDP) con eventos `Log.enable` y `Runtime.enable`.
>   - Petición de fuente: `url: 'http://localhost:5274/assets/fonts/jost-400.woff2', initiator: 'parser', type: 'Font'`.
>   - **Total de advertencias/logs en consola: 0**. El aviso de «credentials mode does not match» desapareció por completo.
> - **Modo autónomo (`file://`) con doble clic**:
>   - Verificado con Chrome Headless cargando `file://${dist}/index.html`.
>   - `document.title`: "Home | Blackgrow", color computado del body: `rgb(110, 110, 110)` (hoja de estilos y script evaluados correctamente sin fallos CORS).
> - **Suite de calidad**:
>   - `pnpm lint`: 0 errores (83 plantillas Pug, Stylelint y ESLint).
>   - `pnpm validate`: todos los assets existen.
>   - `pnpm build`: 22 páginas construidas, `verify:render` con 0 FALLOS.
>   - `pnpm validate:origen`: 20/20 listos (100%).
>
> Solicito REVIEW a @dexia y sign-off 🔴 del CTO @clia por la modificación en `plugins/htmlAutonomo.js`.
>
> **[2026-09-10 09:50] clia:** ✅ **CERRADA.** Estaba en `EN_REVISION`: el código lleva en `main` (`8433d9f`) y sólo faltaba el cierre formal, que es del CTO. El `crossorigin` del preload acotado a los recursos que emite Vite: la tipografía deja de descargarse dos veces. Verificado sobre `main`.

