# Informe — Maquetado de los templates de tienda

Cubre las cuatro páginas que [`origen-componentes.md`](./docs/migracion/origen-componentes.md)
había marcado como «fase de backend» —Cart, Checkout, My Account y Wishlist— más
el panel lateral del carrito. **Sólo HTML y CSS**: ni un módulo de JavaScript
nuevo, ni un `action` inventado.

---

## 1. La referencia cambió, y está documentado

El clon local `~/Downloads/template-html-blackn-main` **ya no existe en el
disco**, y de todos modos nunca tuvo estas cuatro páginas. A partir de ahora
*origen* significa el sitio vivo <https://playgrow.qodeinteractive.com/>. Queda
escrito en:

- [`docs/migracion/README.md`](./docs/migracion/README.md) — aviso en cabecera y
  sección «La referencia es el sitio vivo», con la regla de que a un sitio de
  terceros se le navega y se le inspecciona, no se le envían formularios.
- [`docs/migracion/checklist-validacion.md`](./docs/migracion/checklist-validacion.md) — el
  punto **I7** ya no apunta a una carpeta que no está.

## 2. Lo que el origen no dejó ver

**El carrito no se puede llenar.** Su demo responde **403** a
`?wc-ajax=add_to_cart` y a `?add-to-cart=<id>`, así que `/cart/` sólo sirve el
estado vacío y `/checkout/` redirige a él. Esto coincide con lo que el catálogo
de comportamientos ya anotaba: *«En el demo está vacía»*.

Lo que sí se pudo leer, y es de donde salen los valores:

| Template | Cómo se obtuvo |
| --- | --- |
| Carrito vacío | **Observado servido.** Marcado y textos copiados. |
| My Account | **Observado servido.** Marcado copiado entero. |
| Wishlist | **Observado servido**, vacío. Columnas y encabezado copiados. |
| Carrito lleno | **Reconstruido desde las 442 reglas de CSS del propio origen**, que nombran todas las columnas y sus medidas. |
| Checkout | **Reconstruido igual**, desde sus reglas `#qodef-woo-page.qodef--checkout`. |

Reconstruir desde el CSS del origen no es inventar: sus selectores declaran
cada columna (`product-remove` 30px, `product-thumbnail` 72px, `product-name`,
`product-price`, `product-quantity`, `product-subtotal` a la derecha, `actions`
con el cupón al 70%), cada medida (celdas `15px 0 15px 15px`, totales a 440px y
85px por encima, campo de cantidad de 60px) y cada corte responsive (a 680px
desaparecen miniatura, subtotal y estado de stock). **Lo que no se pudo leer no
se rellenó**: no hay portes calculados, ni impuestos, ni pasarelas reales.

## 3. Archivos

**Componentes nuevos** — `src/components/`:

| Archivo | Qué es |
| --- | --- |
| `cart-table.pug` | Tabla de líneas + cupón + actualizar. Incluye el mixin `quantityField`. |
| `cart-totals.pug` | Totales y «Proceed to checkout». |
| `cart-empty.pug` | El estado vacío, copiado literal del origen. |
| `cart-side-area.pug` | Panel lateral de 430px y su abridor. |
| `checkout-form.pug` | Facturación + resumen del pedido + métodos de pago. |
| `account-login.pug` | Acceso a la cuenta. |
| `wishlist-table.pug` | Lista de deseos, con estado vacío. |

**Páginas nuevas** — `src/pages/`: `cart-page.pug`, `checkout.pug`,
`my-account.pug`, `wishlist.pug`. El proyecto pasa de 18 a **22 páginas**.

**Modificados:**

- `src/components/breadcrumb.pug` — parametrizado. La página declara
  `- const crumb = 'Checkout'` antes del `include`; sin declararlo se comporta
  como antes. El último tramo deja de ser un enlace, que es lo correcto para la
  página actual.
- `src/components/media.pug` — `shopButton` acepta `href` (por defecto sigue
  siendo `#`) y se añade `shopButtonAlt`, la variante de acento que el panel del
  carrito empareja con la principal.
- `src/components/header.pug` — el icono de carrito pasa a ser el abridor del
  panel, y el panel se monta una vez por página.
- `src/components/config.pug` — `cartCount`, `cartPreview` y `cartPreviewTotal`
  para el panel. Es presentación declarada como tal.
- `src/pages/components.pug` — los siete componentes nuevos, en el catálogo.

## 4. Tokens

El origen aportó tres valores que el sistema no tenía y uno que estaba de
relleno:

| Token | Valor | Por qué |
| --- | --- | --- |
| `--color-brand-strong` | `#db915e` → **`#e38443`** | **Estaba duplicando `--color-brand`, así que ningún `hover:bg-brand-strong` del proyecto hacía nada.** El origen declara `rgb(227, 132, 67)`. Este cambio se nota en botones que ya existían. |
| `--color-accent-strong` | `#91c6be` | Hover del botón secundario del panel. |
| `--color-ink-faint` | `#b5aeae` | Aspas de descarte. |
| `--spacing-cell` | `0.9375rem` | 15px de celda; se repite en cada `td` y cada `th`. |
| `--spacing-cart-panel` | `26.875rem` | 430px del panel, presente en las 22 páginas. |
| `--text-meta` | `0.8125rem` | 13px del precio en el panel. |

Los dos últimos salieron de que `verify:render` avisó: `max-w-[26.875rem]`
aparecía 22 veces y `text-[0.8125rem]` 66. Un valor repetido es un token que
falta, así que se convirtieron y los avisos desaparecieron.

## 5. Decisiones

1. **`cart-page.pug`, no `cart.pug`.** `cart.pug` ya es el listado de tienda y
   `cart-index.pug` la ficha de producto — un lío heredado que
   [`playgrow-origen.md`](./docs/migracion/playgrow-origen.md) ya advertía. No se
   renombran páginas existentes en este encargo; el nombre nuevo coincide con el
   id `cart-page` del catálogo de comportamientos.
2. **Los hooks se alinearon con el catálogo, no al revés.** El panel usa
   `js-cart-panel` porque es lo que `origen-comportamientos.json` ya declaraba.
   El selector de cantidad usa `js-quantity`, por lo mismo.
3. **El panel se entrega cerrado y accesible sin JavaScript**: `hidden` en el
   panel y en la cubierta, `aria-expanded='false'` y `aria-controls` en el
   abridor. Quien escriba `cart-panel.js` sólo tiene que mover esos estados.
4. **La fila `actions` del origen sale de la tabla.** En WooCommerce el cupón y
   «Update cart» van dentro del `tbody` con un `colspan`; aquí son un bloque
   propio, porque no son datos de una línea.
5. **La cantidad sigue siendo un `input[type=number]`** con sus `<button>` a los
   lados y etiqueta por producto. Si el módulo no carga, el teclado sigue
   funcionando.
6. **La tabla ancha scrollea dentro de su contenedor**, no la página.

## 6. Pendientes declarados

- **Backend entero**: autenticar, persistir la cesta, cobrar, calcular portes e
  impuestos. Los tres formularios llevan `action=''` a propósito.
- **Métodos de pago**: los tres del listado son los de WooCommerce por defecto.
  Cuáles se ofrecen de verdad lo decide la pasarela.
- **Comportamiento del panel** (`cart-panel.js`) y del selector de cantidad
  (`quantity.js`): siguen en la fase de JavaScript.
- **Assets**: las miniaturas usan el marcador de desarrollo
  `shop/product.webp`, como el resto de la tienda.
- **La tabla llena del carrito y el checkout no se han comparado contra el
  origen servido**, porque el origen no los sirve. Si algún día su demo permite
  llenar la cesta, es lo primero que hay que contrastar.

## 7. Verificación

Ejecutado en este orden:

```
pnpm optimize     33 imágenes ya al día
pnpm lint         77 plantillas · markuplint, stylelint y eslint sin errores
pnpm validate     todos los assets existen
pnpm build        22 páginas · verify:render 0 FALLOS, 99 avisos
pnpm validate:origen   «Nada declarado como hecho está roto»
```

Los 99 avisos de `verify:render` son los mismos de siempre: cadenas idénticas
que **ya vienen de un mixin compartido**, que el verificador no distingue desde
el HTML construido. Eran 82 con 18 páginas.

Auditoría anti-Qode: `grep -rniE "qodeinteractive|playgrow" src/` → **0
coincidencias**.

**Comprobado servido** en `http://localhost:5173`, sin errores de consola:

- 375px — las cuatro páginas, sin scroll horizontal de página
  (`window.scrollX` se queda en 0 tras intentar desplazar).
- 1280px — carrito con miniaturas, subtotal a la derecha, cupón a la izquierda y
  «Update cart» a la derecha, totales a 440px.
- Panel lateral abierto forzando los estados desde la consola, sólo para
  inspeccionarlo: 430px a la derecha, líneas con miniatura de 80px, banda de
  subtotal entre filetes y los dos botones al pie.

`pnpm install` hubo que ejecutarlo antes de todo esto: `node_modules/` estaba
vacío y pnpm no estaba instalado en la máquina.
