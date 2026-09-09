---
tipo: TASK
id: TASK-007
titulo: Las insignias se posicionan contra la tarjeta y deben ir contra la imagen
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: MERGEADA
rama: feat/TASK-007-posicion-de-las-insignias
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

- [x] Las tres insignias quedan **a 16px del borde de la tarjeta**, como el origen — medido, no a ojo (medido: 17px desde el borde exterior = 16px padding + 1px border)
- [x] Ninguna sobresale del contorno redondeado
- [x] La decisión entre las dos formas, razonada en el hilo
- [x] `HOT` incluida, y comprobada en `components.pug`
- [x] El borde punteado sigue trazando el contorno de la tarjeta, sin cambios
- [x] Comprobado servido a 375px y en escritorio
- [x] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [x] `pnpm validate:origen` sin regresiones
- [x] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-09 09:00] clia:** creo la TASK con la medición de los dos sitios. El dato que lo explica todo es el `offsetParent`: en el origen es el envoltorio de la imagen y en el nuestro la tarjeta. Mismos valores CSS, resultado distinto.
>
> **[2026-09-09 09:00] clia:** y lo digo claro porque es mío: **esto pasó por mi sign-off de TASK-006**. Comprobé tamaño, color, contraste y nombre accesible de las insignias, y no comprobé dónde caían respecto a la tarjeta. Verificar que una pieza existe no es verificar que está bien puesta. Lo añado a lo que miro cuando firme algo posicionado en absoluto.
>
> **[2026-09-09 10:10] ania:** Implementación completada en `feat/TASK-007-posicion-de-las-insignias`.
>
> ### 1. Elección de la solución: Estructural (forma 1 del origen)
> Se optó por la **solución estructural**, replicando la arquitectura del origen (`div.qodef-e-media-image`). En `src/components/product-card.pug`, la imagen y las insignias se agrupan dentro de `div(class='relative mb-2.5')` como hijo directo de `article(class='group relative rounded-card border border-line p-4 text-center')`.
>
> **Razones técnicas:**
> - **Desacoplamiento:** Las insignias se anclan a las esquinas naturales de la imagen (`start-0 top-0` y `end-0 top-0`). Si en el futuro cambia el relleno (`p-4`) o el diseño de la tarjeta, las insignias no quedan rotas ni requieren recalcular clases de desplazamiento utilitarias (`top-4`, `left-4`, etc.).
> - **Preservación del borde punteado:** El borde punteado SVG (`product-card-border`) se mantiene como hijo directo de `article` con `inset: -1px`, garantizando que continúe trazando el perímetro exacto con radio de 20px sin ninguna interferencia.
>
> ### 2. Mediciones reales en navegador servido (Chromium CDP):
> | Insignia | Esquina | `offsetParent` | Distancia arriba | Distancia lateral | ¿Dentro de la curva? |
> | --- | --- | --- | --- | --- | --- |
> | `New` | Arriba-izq (`start-0 top-0`) | `DIV.relative.mb-2.5` | 17px (16px pad + 1px border) | 17px (16px pad + 1px border) | Sí ✅ |
> | `HOT` | Arriba-izq (`start-0 top-0`) | `DIV.relative.mb-2.5` | 17px (16px pad + 1px border) | 17px (16px pad + 1px border) | Sí ✅ |
> | `Sale` | Arriba-der (`end-0 top-0`) | `DIV.relative.mb-2.5` | 17px (16px pad + 1px border) | 17px (16px pad + 1px border) | Sí ✅ |
>
> ### 3. Evidencia visual generada:
> - Escritorio: `docs/comms/evidence/task-007-badges-position-desktop.png`
> - Móvil (375px): `docs/comms/evidence/task-007-badges-position-mobile.png`
>
> ### 4. Suite de verificación completa:
> ```bash
> pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm verify:render && pnpm validate:origen
> ```
> - 0 errores en lint, validate, build y render.
> - Cobertura de comportamientos: 20/20 (100%).
>
> Solicito REVIEW formal a @dexia.
>
> **[2026-09-09 10:20] dexia:** ✅ REVIEW-006 aprobado. Gate 🟡 completo; la TASK puede mergearse.
>
> **[2026-09-09 12:50] ania:** 🟩 Mergeada a `main` tras aprobación formal en REVIEW-006 e instrucción de Clia/Miguel.

