---
tipo: TASK
id: TASK-006
titulo: Completar el listado de tienda y sus variantes de columnas
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: ABIERTA
area: components
criticidad: "🔴"
relacionado: [TASK-003, TASK-005]
creado: 2026-09-08
actualizado: 2026-09-08
---

# TASK-006 — El listado de tienda

## Contexto

[`shop-list.pug`](../../src/components/shop-list.pug) quedó a medias en la fase de maquetación y no lo cubría ninguna TASK. Hoy:

- Dice **«Showing 1–12 of 50 results»** y pinta **3 productos**.
- Los tres son «Product Category / Product Title Here / $200.00», con la misma foto.
- La barra lateral tiene dos categorías llamadas `item`.
- No hay selector de orden, ni productos populares, ni filtro de precio, ni paginación.

Un contador que dice 12 sobre tres tarjetas es de las cosas que se detectan en la primera mirada y hacen dudar del resto.

## Lo que hace el origen (leído del sitio vivo, `/shop/`)

**12 productos por página**, de 50, en tres columnas:

| Producto | Categoría | Precio |
| --- | --- | --- |
| Wooden Baby Cribe | CRIBS | $490.00 |
| Wooden Photo Camera | TOYS | ~~$70.00~~ **$60.00** · etiqueta **Sale** |
| The Candy Baby Carriage | CRIBS | $320.00 |
| Grey Teddy Bear Toy | TOYS | $90.00 · etiqueta **New** |
| Baby Bib Pink | TOYS | $40.00 |
| Baby Wooden Bed | CRIBS | $500.00 |
| Wooden Baby Chair | CRIBS | $240.00 |
| Big Baby Carriage | CRIBS | $370.00 |
| Wool Teady Bear Toy | TOYS | $100.00 |
| Wool Shark Toy | TOYS | $80.00 |
| Baby Bottle | TOYS | $50.00 |
| Baby Small Cribe | CRIBS | $300.00 |

`Teady` y `Cribe` son **typos del origen: se conservan**, como `PURCASE` y `necesetys`.

**Barra lateral**, en este orden:

1. **Categories** con su recuento: Cribs 7 · Accessorize 2 · Baby Equipment 12 · Beds 4 · Bottles 2 · Carriage 4 · Equipment 2 · New 6 · Other 3 · Soft Toys 2 · Specials 6 · Toys 8 · Toys & Books 4
2. **Popular products**: Baby Milk Cup $20.00 · Small Carriage $330.00 · Orange Teady Bear $100.00
3. **Filter by price**: de $20.00 a $500.00, con botón **APPLY**

**Encima del listado**, un selector de orden con seis opciones: Default sorting · Sort by popularity · Sort by average rating · Sort by latest · Sort by price: low to high · Sort by price: high to low.

**Debajo**, paginación de 5 páginas.

## Pedido

### 1 · Las 12 tarjetas

Con los nombres, categorías y precios de arriba. `product-card.pug` ya existe y ya acepta `shop`; **no crees otra tarjeta**, extiéndela si le falta algo.

Le faltan tres cosas que el origen sí tiene:

- **Precio rebajado**: el tachado y el nuevo. Semánticamente es `<s>` para el viejo, no un `<span>` con línea puesta por CSS.
- **Las insignias `Sale` y `New`** — ver el punto 6.
- **El borde punteado animado en hover** — ver el punto 7.

### 2 · La barra lateral

Los tres bloques, con el contenido del origen. El recuento de cada categoría va junto a su nombre y **no es decorativo**: forma parte del enlace o queda fuera del nombre accesible, pero no se lee como «Cribs siete» sin más — decide tú y explícalo.

**El filtro de precio es presentación.** No hay tienda detrás: se maqueta el control con sus dos valores y su botón, y se declara como pendiente. **No inventes un comportamiento de filtrado.**

### 3 · El selector de orden

Un `<select>` con las seis opciones, con su `<label>` —visible o `sr-only`, pero existe—. Igual que el filtro: es presentación, `shop-sorting` sigue siendo `otra-fase` en el catálogo. Que no parezca que ordena.

### 4 · La paginación

`pagination.pug` ya existe y se usa en el blog. **Reutilízalo.** Si no encaja, parametrízalo; no escribas una segunda paginación.

### 5 · Las variantes de columnas

El origen ofrece 3, 4, 5 y 6 columnas. [`origen-componentes.md`](../migracion/origen-componentes.md) ya decidió que **son un parámetro del componente, no cuatro páginas**, y esa decisión sigue en pie: no crees `shop-3-columns.html` ni sus hermanos.

`shop-list.pug` acepta el número de columnas como parámetro, con 3 por defecto. Las cuatro variantes se enseñan en [`components.pug`](../../src/pages/components.pug), que es justo para eso.

Ojo al mobile first: el parámetro describe **escritorio**. En móvil es una columna, y el salto se hace con `tablet:` y `desktop:`. La clase no se construye a trozos —`'desktop:grid-cols-' + n` no la genera Tailwind—: se escriben enteras y se elige entre ellas.

### 6 · Las insignias `Sale` y `New`

⚠️ **Corrijo lo que decía la primera versión de esta TASK** («es texto, no una imagen»). Lo medí en el origen y es un texto **sobre una forma orgánica dibujada en SVG**, puesta como `background-image` con un data URI.

| | `Sale` | `New` |
| --- | --- | --- |
| Forma | nube | estrella |
| Tamaño | 56 × 32 | 56 × 56 |
| Posición | `top: 0` · **`right: 0`** | `top: 0` · **`left: 0`** |
| Relleno de la forma | `#b1ceca` → **`--color-accent`** | `#db915e` → **`--color-brand`** |
| Texto | blanco, 14px, `line-height: 1`, sin mayúsculas | igual |
| Otros | `padding-top: 4px` | — |

Ambas: `position: absolute`, `z-index: 5`, flex centrado, `background-repeat: no-repeat`.

Los dos rellenos **ya son tokens del proyecto**, así que el SVG no lleva el hex escrito: se pinta con `currentColor` o con el token. Las dos formas son iconos, así que van a `src/assets/icons/` y salen por el sprite — **no como `background-image` con data URI**, que es lo que hace el origen y aquí sería un color fuera de `@theme`.

Semántica: la insignia **no** es decorativa, dice algo del producto. Va dentro del enlace de la tarjeta o con su texto accesible; que un lector de pantalla anuncie «Sale, White Carriage», no sólo el nombre.

### 7 · El borde punteado animado en hover

Miguel lo pidió expresamente. Medido en el origen:

```css
/* el envoltorio: invisible en reposo */
.qodef-woo-svg {
    position: absolute;
    inset: -1px;                 /* left/top -1px, tamaño calc(100% + 2px) */
    border-radius: 20px;
    opacity: 0;
    transition: opacity .2s ease-out;
}
li:hover .qodef-woo-svg { opacity: 1; }

/* el trazo: siempre en marcha */
rect {
    fill: none;
    stroke: #EAE3DE;             /* --color-line */
    stroke-width: 4;
    stroke-dasharray: 10;
    stroke-linecap: square;
    rx: 20; ry: 20;
    width: 100%; height: 100%;
    animation: woo-qodef-svg-animation 5s linear infinite;
}

@keyframes woo-qodef-svg-animation {
    0%   { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 100%; }
}
```

Los guiones **desfilan por el perímetro** de la tarjeta.

🚨 **No copies el patrón del subrayado de navegación.** Allí la animación está `paused` y el hover la **reanuda**. Aquí es al revés: **la animación corre siempre** y el hover sólo cambia la opacidad del envoltorio. Si la pausas, al entrar el puntero los guiones arrancan desde el fotograma cero y se nota el salto.

- El `@keyframes` va en `styles.css`, junto a `marquee`, `jump` y `nav-underline-slide`.
- `#EAE3DE` es `--color-line`. Ni un hex en el marcado.
- `prefers-reduced-motion`: el `@media` global ya para la animación. Comprueba que **el borde se siga viendo en hover** — lo que sobra es el desfile, no el borde.
- Es CSS puro y un `<rect>` en el marcado. **Sin JavaScript.**
- En el origen el borde no aparece en la variante alineada a la izquierda (`.qodef-align-left`). Si nuestra tarjeta tiene esa variante, respétalo; si no, ignóralo.

### 8 · La insignia `HOT` — adición del proyecto

`HOT` **no existe en el origen**: busqué en su DOM y en su CSS y sólo hay `Sale` y `New`. Miguel la quiere igualmente y me pidió diseñarla, así que **esto no es una migración, es una adición nuestra**. Queda dicho aquí para que nadie la «corrija» mañana contra el origen y para que no se busque en él: no está.

| | Valor | Por qué |
| --- | --- | --- |
| Forma | **sol**, 56 × 56 | Nube y estrella son motivos de cielo, de móvil de cuna. El sol es el tercero de esa familia y lee «caliente» sin la agresividad de una llama, que en una tienda de bebés desentona. |
| Relleno | **`--color-highlight`** (`#d9bf8d`) | Ver abajo: es el token que hoy se llama `--color-rating`. |
| Posición | `top: 0` · `left: 0` | La misma ranura que `New`. |
| Significado | **Más vendido / destacado** | Es el tercer eje que no solapa: `Sale` habla de precio, `New` de antigüedad, `HOT` de popularidad. |

**Regla de convivencia**, porque las tres pueden coincidir en un producto:

- `HOT` y `New` comparten esquina, así que son **mutuamente excluyentes**: un producto enseña una u otra, nunca las dos. Si le tocan ambas, gana `New`.
- `Sale` va en la otra esquina y **puede convivir** con cualquiera de las dos.

Esto es una decisión de producto, no una preferencia de maquetación: si Miguel prefiere que `HOT` gane a `New`, o que las tres puedan verse a la vez apiladas, se dice en el hilo y se cambia.

#### El token: `--color-rating` pasa a `--color-highlight`

`#d9bf8d` es el sand cálido que ya está en la paleta, y es el tercer tono que se distingue a la vez de `--color-brand` y de `--color-accent` sin añadir color nuevo.

El problema es el **nombre**. `AGENTS.md` es explícito: *«Los nombres son de función, no de color»*. Un token llamado `rating` pintando una insignia de «más vendido» es un nombre que miente, y ése es justo el mecanismo que mantiene el diseño en un sitio.

`--color-highlight` cubre honestamente los dos usos —las estrellas de valoración y la insignia de destacado—, y **el cambio cuesta dos líneas**: la declaración en `@theme` y su único uso actual, `customers-reviews.pug:5`.

> ⚠️ Esto convierte la TASK en **🔴**: toca `@theme`. Necesita REVIEW de Dexia **y** sign-off del CTO. Ya lo he decidido yo, así que la firma no será un debate; lo que sí quiero ver es que no quede ningún `rating` suelto.

#### 🚨 Las tres insignias llevan texto `--color-ink`, no blanco

Aquí **me aparto del origen a propósito**, y no por gusto. Medí el contraste de sus insignias:

| Insignia | Origen | Ratio | ¿AA a 14px? |
| --- | --- | --- | --- |
| `New` | blanco sobre `#db915e` | **2.55:1** | ❌ (pide 4.5:1) |
| `Sale` | blanco sobre `#b1ceca` | **1.67:1** | ❌ |

Las dos fallan, y la de `Sale` no se queda cerca. Con texto `--color-ink` en vez de blanco, las tres pasan de sobra y **sin tocar las formas ni los rellenos**:

| Insignia | Relleno | Texto `--color-ink` |
| --- | --- | --- |
| `Sale` | `--color-accent` | **12.55:1** ✅ |
| `New` | `--color-brand` | **8.22:1** ✅ |
| `HOT` | `--color-highlight` | **11.79:1** ✅ |

Es el mismo criterio que ya se aplicó al menú móvil, al buscador y al lightbox: se copia el origen salvo donde el origen está mal. Cambia el aspecto respecto a la demo —el texto pasa de blanco a negro— y es intencionado.

## Fuera de alcance

- Ordenar, filtrar y paginar de verdad: `otra-fase`, dependen de tienda.
- El carrusel de categorías: es [TASK-003](TASK-003-carrusel-de-categorias.md).
- Los enlaces del listado: los da [TASK-005](TASK-005-navegacion-y-enlaces.md). Si TASK-005 va antes, úsalos; si no, deja `#` y anótalo.

## Criterios de aceptación

- [ ] 12 productos con el contenido del origen, typos incluidos
- [ ] `product-card.pug` extendido —no duplicado— con precio rebajado (`<s>`) e insignias
- [ ] Insignias `Sale` (nube, `--color-accent`, arriba a la derecha) y `New` (estrella, `--color-brand`, arriba a la izquierda), con las formas en el sprite y **sin data URI**
- [ ] Las insignias tienen texto accesible: no son decorativas
- [ ] Borde punteado animado en hover, en CSS puro, con el `@keyframes` en `styles.css`
- [ ] La animación del borde **corre siempre**; el hover sólo conmuta la opacidad
- [ ] Con `prefers-reduced-motion` el desfile para **y el borde se sigue viendo**
- [ ] Insignia `HOT`: sol, `--color-highlight`, arriba a la izquierda, excluyente con `New`
- [ ] `--color-rating` renombrado a `--color-highlight`; ni un `rating` suelto en el proyecto
- [ ] Las tres insignias con texto `--color-ink`, no blanco
- [ ] Comprobado el contraste real de las tres sobre su relleno
- [ ] Barra lateral con categorías y recuento, populares y filtro de precio
- [ ] Selector de orden con sus seis opciones y su etiqueta
- [ ] `pagination.pug` reutilizado, no reescrito
- [ ] Columnas como parámetro; las cuatro variantes visibles en `components.pug`
- [ ] Ninguna página nueva de variantes de columnas
- [ ] Mobile first: una columna en móvil; ninguna clase construida a trozos
- [ ] Orden y filtro declarados como presentación, sin simular comportamiento
- [ ] Imágenes que falten, declaradas como pendientes
- [ ] Ni un color ni una medida de marca en el marcado
- [ ] Comprobado servido a 375px y en escritorio
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] REVIEW de Dexia ✅ **+ sign-off 🔴 del CTO** (toca `@theme`)

## 💬 Hilo

> **[2026-09-08 12:10] clia:** creo la TASK. Este hueco no estaba planificado: salió al revisar qué quedaba de maquetación y encontrar que el listado dice 12 y pinta 3. El contenido está leído del origen servido. 🟡 porque toca mixins compartidos, no `@theme` ni `config.pug`.
>
> **[2026-09-08 12:10] clia:** hay una sola imagen de producto en `src/assets/images/shop/`. Doce tarjetas con la misma foto es lo que hay hoy y es aceptable **si se declara**; lo que no vale es bajar doce del origen sin pasarlas por `figma-assets.json` y `assets-pendientes.json`.
>
> **[2026-09-08 15:30] clia:** Miguel pide dos cosas más y las mido en el origen: el **borde punteado animado** de la tarjeta (punto 7) y las **insignias** (punto 6). Ambas quedan registradas en `origen-comportamientos.json` como `product-card-dashed-border`, para que `validate:origen` las vigile.
>
> **[2026-09-08 15:30] clia:** dos avisos. **Uno:** corrijo mi propia TASK — dije que las insignias eran «texto, no una imagen» y es falso: son texto sobre una forma orgánica en SVG, nube y estrella. Los dos rellenos ya son tokens (`--color-accent` y `--color-brand`), así que las formas van al sprite y no como data URI con el hex dentro. **Dos:** `HOT` no existe en el origen —sólo Sale y New—; no se maqueta hasta que Miguel conteste.
>
> **[2026-09-08 16:00] clia:** Miguel: «sí, invéntalo». Diseñada en el punto 8 — **sol**, `--color-highlight`, arriba a la izquierda y excluyente con `New`. Va marcada como **adición del proyecto**: no está en el origen y no hay que buscarla allí.
>
> **[2026-09-08 16:00] clia:** dos consecuencias que salieron de diseñarla. **Una:** `--color-rating` pasa a `--color-highlight`, porque un token llamado «rating» pintando un «más vendido» es un nombre que miente, y `AGENTS.md` pide nombres de función. Cuesta dos líneas: la declaración y su único uso. Eso sube la TASK a **🔴**. **Dos, y es la que importa:** medí el contraste de las insignias del origen y **las dos fallan** —blanco sobre `--color-brand` da 2.55:1 y sobre `--color-accent` 1.67:1, cuando a 14px hace falta 4.5:1—. Con texto `--color-ink` las tres pasan de sobra sin tocar formas ni rellenos. Nos apartamos del origen ahí, a propósito, como ya se hizo con el menú y el buscador.

