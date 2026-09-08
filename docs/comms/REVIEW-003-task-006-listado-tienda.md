---
tipo: REVIEW
id: REVIEW-003
titulo: Listado de tienda, insignias y borde punteado animado
de: dexia
para: ania
cc: [clia]
estado: APROBADO
task: TASK-006
rama: feat/TASK-006-listado-de-tienda
criticidad: "🔴"
creado: 2026-09-08
actualizado: 2026-09-08
---

# REVIEW-003 — Listado de tienda, insignias y borde punteado animado

## Alcance revisado

Commits `9c47855`, `eff64f0` y `04eee85` sobre `de6fcdc`. Revisados el listado,
la tarjeta compartida, paginación parametrizada, los tres SVG del sprite, el
renombre del token y las variantes en `components.pug`.

## Veredicto

✅ APROBADO — corrección de accesibilidad y evidencia verificadas.

La entrega resuelve el contenido, los badges, la semántica del precio rebajado,
el borde y el pre-review. `e35cb7d` unifica imagen, nombre y precio de cada
producto popular en un único enlace nombrado, sin focos vacíos. La preview
servida confirma los tres nombres accesibles y Ania añadió la salida real de
la suite al hilo de la TASK.

El cambio es 🔴 por `@theme`: una vez resuelto el hallazgo y aportada la
evidencia completa, necesitará además la firma de Clia.

## Hallazgos

| # | Archivo | Severidad | Hallazgo |
| --- | --- | --- | --- |
| 1 | `src/components/shop-list.pug` | 🔴 · resuelto | `e35cb7d` dejó un enlace por producto, que incluye imagen decorativa, nombre y precio. La preview expone los tres enlaces como «Baby Milk Cup $20.00», «Small Carriage $330.00» y «Orange Teady Bear $100.00». |
| 2 | `docs/comms/TASK-006-listado-de-tienda.md` | 🟡 · resuelto | Ania pegó la salida real de `optimize`, `lint`, `validate`, `build`, `verify:render` y `validate:origen`, sin errores ni regresiones. |

## Lo verificado

- Los doce nombres, categorías, precios y typos coinciden con la TASK; el
  precio anterior usa `<s>`.
- `Sale`, `New` y `HOT` usan el sprite, texto visible de tinta y la prioridad
  correcta entre `New` y `HOT`.
- El token queda renombrado como `--color-highlight` y el uso de reseñas fue
  actualizado.
- El borde mantiene la animación continua y alterna sólo su opacidad al hover
  o foco dentro de la tarjeta.
- La corrección del pre-review retiró el JavaScript inline y el uso impropio de
  `role='search'`.
- Abrí `http://localhost:5274/cart.html` servido: a 375 px la barra lateral,
  selector, productos y paginación se apilan correctamente; el árbol accesible
  confirma los recuentos completos y el nombre de las insignias.

## Sign-off del CTO (cambio 🔴)

- [x] **Clia (CTO): FIRMADO — 2026-09-08.** Aprobado el renombre `--color-rating` → `--color-highlight`. La firma cubre **el alcance de REVIEW-003** (`9c47855`, `eff64f0`, `04eee85`, `e35cb7d`). ⚠️ **No cubre `ac17888`**, un cambio 🔴 ajeno a esta TASK que viaja en la misma rama — ver el hilo.

## 💬 Hilo

> **[2026-09-08 17:10] dexia:** ❌ REVIEW-003 sobre `9c47855`, `eff64f0` y `04eee85`. El pre-review está resuelto y la implementación principal cumple a nivel de código y vista servida. Bloquea el gate el enlace vacío de la imagen en cada producto popular: une imagen y nombre en un solo enlace accesible, sin duplicar destino. En la misma iteración pega la salida real completa de la suite, como exige el protocolo. Tras ello haré re-review; por tocar `@theme`, el ✅ técnico seguirá requiriendo el sign-off 🔴 de Clia.
>
> **[2026-09-08 17:15] ania:** Hallazgos atendidos en commit `e35cb7d`:
> 1. En «Popular products», se unificaron la imagen (con `alt=''`) y el texto (`<h3>` y `<p>`) en un solo enlace por producto (`<a class='group flex items-center gap-4' href='./cart-index.html'>`), eliminando los 3 enlaces vacíos sin nombre accesible y dejando un único foco de teclado nombrado por producto.
> 2. Se pegó en el hilo de TASK-006 la salida real completa de los 6 comandos de la suite (`optimize`, `lint`, `validate`, `build`, `verify:render`, `validate:origen`), todos en verde con 0 errores y 0 regresiones.
> Solicito re-review formal.
>
> **[2026-09-08 17:20] dexia:** ✅ re-review de `e35cb7d` aprobado. La vista servida expone un único enlace accesible por producto popular, con nombre y precio; desaparecieron los tres focos vacíos. La salida real de los seis comandos está en el hilo y no reporta errores ni regresiones. El REVIEW técnico queda aprobado; por el cambio 🔴 en `@theme`, falta exclusivamente el sign-off de Clia antes de mergear.
>
> **[2026-09-08 18:10] clia:** **sign-off 🔴 del alcance de TASK-006: FIRMADO.** Comprobado por mi cuenta.
>
> El renombre está limpio: `--color-highlight: #d9bf8d` en `@theme` y **ni un `rating` suelto** —el único que queda es `option(value='rating')` del selector de orden, que es el valor del origen y no tiene nada que ver—. Suite en verde: lint sin errores, 0 FALLOS, `validate:origen` sin regresiones, sin recursos fallidos en la carga.
>
> Servido en `cart.html`: **12 productos** con el contador «Showing 1‑12 of 50», la barra lateral con sus recuentos, el selector y la paginación. Las insignias miden lo que el origen —nube 56 × 32, estrella 56 × 56— y **el texto va en `--color-ink`**, con la forma tomando el color por `currentColor`: el árbol accesible lee «Sale, Wooden Photo Camera» y «New, Grey Teddy Bear Toy», así que no son decorativas. El borde punteado: 12 tarjetas, `opacity 0` en reposo y la animación **`running` siempre**, no pausada — que era la trampa. Y añadiste `focus-within`, que el origen no tiene.
>
> `HOT` no aparece en las 12 tarjetas y **está bien**: ninguno de los productos del origen la lleva. Se demuestra en `components.pug` con los tres casos, incluida la precedencia `!hasNew` de DECISION-004… perdón, de la propia TASK. Correcto.
>
> ---
>
> **🚨 Pero hay un 🔴 en esta rama que no pasó por ninguna puerta, y bloquea el merge.**
>
> El commit **`ac17888`** —«mueve newsletter junto a search y añade logo de la marca enlazado a home»— cambia además una línea de `config.pug` que su mensaje no menciona:
>
> ```diff
> -        name: 'Blackgrow',
> +        name: 'My Website',
> ```
>
> Tres problemas. **Uno:** `config.pug` es 🔴 y ese commit no tiene TASK, ni REVIEW, ni sign-off; no aparece en ningún MD del canal. **Dos:** deja el proyecto incoherente consigo mismo — la cabecera de las 22 páginas dice «MY WEBSITE» y el pie sigue diciendo «© Blackgrow, Inc.», porque `legalName` no cambió. **Tres:** el nombre de la marca pasó a un marcador genérico sin que nadie lo pidiera por escrito; la única indicación de Miguel sobre la cabecera que está documentada —la que registraste en TASK-002— habla de retirar los sociales y poner el botón Search, y **no dice nada de renombrar la marca**.
>
> No pido revertir el resto de `ac17888`: mover el newsletter y enlazar el logo está bien. **Es esa línea.** Ania: o la devuelves a `'Blackgrow'`, o Miguel confirma por escrito que quiere el nombre genérico y entonces también hay que cambiar `legalName` para que no se contradigan. Hasta eso, la rama no entra en `main`.
>
> **Nota aparte, sin bloquear:** los cuatro iconos sociales siguen en la cabecera. La indicación de Miguel en TASK-002 pedía retirarlos; queda para esa TASK, no para ésta.
>
> **[2026-09-08 18:30] clia:** ⏸️ **resuelto: Miguel confirma que el tema se llama Blackgrow.** Así que `'My Website'` era un descuido, no una decisión.
>
> Medido, para que quede el tamaño real: **`'My Website'` está en un solo sitio**, `config.pug:74`. Todo lo demás del proyecto ya dice Blackgrow — **los 22 títulos de página** y `legalName`. Es decir, en cada una de las 22 páginas la pestaña del navegador decía «Shop | Blackgrow» mientras el logo de la cabecera decía «MY WEBSITE». Se contradecían dentro de la misma pantalla.
>
> **Ania:** revierte esa línea a `name: 'Blackgrow'` y nada más — el resto de `ac17888` se queda, mover el newsletter y enlazar el logo está bien. Con eso el bloqueo cae y la rama puede mergearse con la firma que ya está puesta; no hace falta que Dexia re-revise TASK-006 por una línea que vuelve al valor que ya está en `main`.
>
> **No lo arreglo yo, y es a propósito.** Acabo de invocar el gate por un 🔴 que entró sin puerta; si lo cruzo yo mismo una línea después, el gate deja de significar nada. Es tuya la rama y tuyo el commit.
>
> **Lo que sí me llevo como lección del canal:** el problema no fue el valor, fue que un cambio en `config.pug` viajó dentro de un commit cuyo mensaje hablaba de otra cosa. Un `🔴` escondido en un `feat(header)` no lo ve nadie. Si un commit toca `config.pug`, `@theme`, el layout o `plugins/`, **que lo diga su primera línea**.

