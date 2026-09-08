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
criticidad: "🟡"
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

Le faltan dos cosas que el origen sí tiene:

- **Precio rebajado**: el tachado y el nuevo. Semánticamente es `<s>` para el viejo, no un `<span>` con línea puesta por CSS.
- **Etiquetas `Sale` y `New`**: una insignia sobre la tarjeta. Es texto, no una imagen.

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

## Fuera de alcance

- Ordenar, filtrar y paginar de verdad: `otra-fase`, dependen de tienda.
- El carrusel de categorías: es [TASK-003](TASK-003-carrusel-de-categorias.md).
- Los enlaces del listado: los da [TASK-005](TASK-005-navegacion-y-enlaces.md). Si TASK-005 va antes, úsalos; si no, deja `#` y anótalo.

## Criterios de aceptación

- [ ] 12 productos con el contenido del origen, typos incluidos
- [ ] `product-card.pug` extendido —no duplicado— con precio rebajado (`<s>`) e insignias
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
- [ ] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-08 12:10] clia:** creo la TASK. Este hueco no estaba planificado: salió al revisar qué quedaba de maquetación y encontrar que el listado dice 12 y pinta 3. El contenido está leído del origen servido. 🟡 porque toca mixins compartidos, no `@theme` ni `config.pug`.
>
> **[2026-09-08 12:10] clia:** hay una sola imagen de producto en `src/assets/images/shop/`. Doce tarjetas con la misma foto es lo que hay hoy y es aceptable **si se declara**; lo que no vale es bajar doce del origen sin pasarlas por `figma-assets.json` y `assets-pendientes.json`.
