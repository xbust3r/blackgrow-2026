---
tipo: TASK
id: TASK-007
titulo: Las insignias se posicionan contra la tarjeta y deben ir contra la imagen
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: ABIERTA
area: components
criticidad: "🟡"
relacionado: [TASK-006]
creado: 2026-09-09
actualizado: 2026-09-09
---

# TASK-007 — Posición de las insignias `Sale`, `New` y `HOT`

## Contexto

Miguel señala que las insignias «se ven mal» y que en el origen están bien alineadas. Tiene razón, y **la causa no son los valores: es el contexto de posicionamiento**.

Medido en los dos sitios, con las insignias en pantalla:

| | Origen | Nosotros |
| --- | --- | --- |
| `offsetParent` de la insignia | **`div.qodef-e-media-image`** — el envoltorio de la imagen | **`article.group`** — la tarjeta entera |
| `top` / `left` declarados | `0` / `0` | `0` / `0` |
| Distancia real al borde de la tarjeta | **16px arriba y 16px al lado** | **1px** (sólo el borde) |
| Radio de la tarjeta | 20px | 20px |

Los valores CSS son **idénticos**. Lo que cambia es contra qué se miden.

En el origen la insignia cuelga del envoltorio de la imagen, que está metido 16px dentro de la tarjeta, así que acaba a 16px del borde: **dentro de la curva**. En el nuestro cuelga de la tarjeta, así que `top: 0; left: 0` la deja en la **esquina cuadrada** de la caja de relleno — y como la tarjeta tiene 20px de radio, esa esquina cae **fuera del contorno visible**. De ahí que parezca flotando fuera.

Es un defecto que se me escapó al firmar TASK-006: comprobé el tamaño, el color, el texto accesible y la semántica, pero **di por buena la posición sin medirla contra la tarjeta**. Verifiqué que las insignias existían y no dónde caían.

## Pedido

Que la insignia se mida contra **la imagen**, no contra la tarjeta, como en el origen.

Dos formas de conseguirlo; **elige y explica en el hilo cuál y por qué**:

1. **Estructural, la del origen.** Envolver la imagen en un contenedor `relative` y colgar de él las insignias. Es lo que hace el origen y se sostiene solo si mañana cambia el relleno de la tarjeta.
2. **Por desplazamiento.** Dejarlas colgando de la tarjeta y desplazarlas el valor del relleno: `top-4` y `left-4` / `right-4` en vez de `top-0` / `left-0` / `right-0`. Son 16px, que es exactamente el `padding` de la tarjeta y coincide con el origen.

La segunda es una línea; la primera es más robusta porque no repite el valor del relleno en dos sitios. **Si eliges la segunda, el 16px queda acoplado al `p-4` de la tarjeta** — dilo en el hilo para que quien cambie ese relleno sepa que hay algo que le sigue.

Aplica a las **tres** insignias, en `product-card.pug`. `HOT` comparte esquina con `New`, así que hereda el mismo arreglo.

## Fuera de alcance

- **El borde punteado no se toca.** Su `inset: -1px` contra la tarjeta es correcto: traza el contorno de la tarjeta, que es justo lo que debe hacer.
- Tamaños, colores, formas y texto de las insignias: quedaron bien y están firmados.

## Criterios de aceptación

- [ ] Las tres insignias quedan **a 16px del borde de la tarjeta**, como el origen — medido, no a ojo
- [ ] Ninguna sobresale del contorno redondeado
- [ ] La decisión entre las dos formas, razonada en el hilo
- [ ] `HOT` incluida, y comprobada en `components.pug`
- [ ] El borde punteado sigue trazando el contorno de la tarjeta, sin cambios
- [ ] Comprobado servido a 375px y en escritorio
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-09 09:00] clia:** creo la TASK con la medición de los dos sitios. El dato que lo explica todo es el `offsetParent`: en el origen es el envoltorio de la imagen y en el nuestro la tarjeta. Mismos valores CSS, resultado distinto.
>
> **[2026-09-09 09:00] clia:** y lo digo claro porque es mío: **esto pasó por mi sign-off de TASK-006**. Comprobé tamaño, color, contraste y nombre accesible de las insignias, y no comprobé dónde caían respecto a la tarjeta. Verificar que una pieza existe no es verificar que está bien puesta. Lo añado a lo que miro cuando firme algo posicionado en absoluto.
