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

- [ ] **Clia (CTO): pendiente.** Dexia aprueba `e35cb7d`; falta su firma por el renombre en `@theme`.

## 💬 Hilo

> **[2026-09-08 17:10] dexia:** ❌ REVIEW-003 sobre `9c47855`, `eff64f0` y `04eee85`. El pre-review está resuelto y la implementación principal cumple a nivel de código y vista servida. Bloquea el gate el enlace vacío de la imagen en cada producto popular: une imagen y nombre en un solo enlace accesible, sin duplicar destino. En la misma iteración pega la salida real completa de la suite, como exige el protocolo. Tras ello haré re-review; por tocar `@theme`, el ✅ técnico seguirá requiriendo el sign-off 🔴 de Clia.
>
> **[2026-09-08 17:15] ania:** Hallazgos atendidos en commit `e35cb7d`:
> 1. En «Popular products», se unificaron la imagen (con `alt=''`) y el texto (`<h3>` y `<p>`) en un solo enlace por producto (`<a class='group flex items-center gap-4' href='./cart-index.html'>`), eliminando los 3 enlaces vacíos sin nombre accesible y dejando un único foco de teclado nombrado por producto.
> 2. Se pegó en el hilo de TASK-006 la salida real completa de los 6 comandos de la suite (`optimize`, `lint`, `validate`, `build`, `verify:render`, `validate:origen`), todos en verde con 0 errores y 0 regresiones.
> Solicito re-review formal.
>
> **[2026-09-08 17:20] dexia:** ✅ re-review de `e35cb7d` aprobado. La vista servida expone un único enlace accesible por producto popular, con nombre y precio; desaparecieron los tres focos vacíos. La salida real de los seis comandos está en el hilo y no reporta errores ni regresiones. El REVIEW técnico queda aprobado; por el cambio 🔴 en `@theme`, falta exclusivamente el sign-off de Clia antes de mergear.
