# Inventario del origen

Origen: `~/Downloads/template-html-blackn-main`. Las rutas de la columna
«Origen» son relativas a esa carpeta; las de «Destino», a
`~/servers/blackgrow 2026`.

Los tamaños son líneas de código y sirven para estimar, no para juzgar: un
componente de 30 líneas de SCSS con cuatro media queries cuesta más que uno de
100 lineal.

## Configuración y base

| Origen | Líneas | Destino | Nota |
| --- | --- | --- | --- |
| `scss/elements/_variables.scss` | 14 | `src/styles/styles.css` → `@theme` | 13 variables `$qode-*`. Ver mapa de color abajo. |
| `scss/settings/_settings.breakpoints.scss` | 9 | ya existe en `@theme` | `desktop` pasa de 980 a 1000px. |
| `scss/elements/_basic.scss` | 14 | `@layer base` (ya existe) | Jost 15px/1.46667, color `#6e6e6e`. |
| `scss/elements/_grid.scss` | 78 | **no se migra** | Rejilla propia; la sustituye Tailwind. |
| `scss/elements/_fonts.scss` | 0 | — | Vacío. |
| `pug/includes/head.pug` | 16 | `src/components/head.pug` (ya existe) | Sólo aportar preloads y metadatos reales. |
| `pug/includes/favicon.pug` | 8 | `src/components/favicon.pug` (ya existe) | Sustituir los archivos, no el marcado. |

### Mapa de color

| Variable del origen | Valor | Token del destino |
| --- | --- | --- |
| `$qode-main-color`, `$fill-color`, `$fill-hover-color` | `#DB915E` | `--color-brand` |
| `$qode-header-dark-hover-color`, `$qode-header-light-hover-color` | `#DB915E` | `--color-brand` (mismo valor) |
| `$qode-second-color` | `#B1CECA` | `--color-accent` |
| `$qode-gray-color` | `#8b8686` | `--color-ink-soft` |
| `$qode-black-color`, `$qode-header-dark-color` | `#000` | `--color-ink` |
| `$qode-header-light-color` | `#FFF` | `--color-surface` |
| `$qode-header-light-border-color` | `#eae3de` | `--color-line` |
| `$code-background-light-color` | `#f7f3f0` | `--color-surface-alt` |
| (en `_basic.scss`, sin variable) | `#6e6e6e` | `--color-ink-soft` o token propio |

Cinco de las trece variables son el mismo naranja con cuatro nombres distintos.
En el destino es **un** token. Que el hover y el color principal coincidan es
seguramente un descuido del origen: se migra tal cual y se señala.

Ojo con `$qode-gray-color` (`#8b8686`) y el `color` del body (`#6e6e6e`): son dos
grises distintos para texto secundario. Decidir si son uno o dos tokens mirando
la página, no el código.

## Estructura del sitio

| Origen | Líneas | Nota |
| --- | --- | --- |
| `pug/includes/header.pug` | 57 | Barra superior con newsletter, menú, buscador y redes. |
| `scss/elements/_header.scss` | 178 | |
| `scss/elements/_menu-mobile.scss` | 262 | Menú hamburguesa con `input[type=checkbox]`. El archivo más grande. |
| `pug/includes/footer.pug` | 37 | **Contiene el crédito a Qode Interactive.** |
| `scss/elements/_footer.scss` | 68 | |
| `pug/includes/header/menu.pug` | 0 | Vacío. |

El menú móvil del origen funciona con el truco del checkbox y no tiene JavaScript:
no hay `aria-expanded`, ni foco atrapado, ni cierre con `Escape`. Migrarlo tal
cual traslada esos tres problemas. El core trae `src/scripts/tools/trap-focus.js`
sin usar, que es justo lo que hace falta.

## Heros

Ocho variantes. Sólo una se usa en `index`; el resto viven en la página catálogo
`pug/pages/heros.pug`.

| Origen | Pug | SCSS | ¿En uso? |
| --- | --- | --- | --- |
| `heros/cloud-title` | 10 | 111 | **Sí**, en `index` y en el catálogo. |
| `heros/photo_hero_2_button` | 11 | (comparte SCSS) | **Sí**, en `page` y en el catálogo. |
| `heros/internal` | 11 | 177 | Sólo catálogo — ver aviso abajo. |
| `heros/default` | 12 | 126 | Sólo catálogo. |
| `heros/photo_hero` | 10 | 173 | Sólo catálogo. |
| `heros/photo_hero_2` | 9 | 127 | Sólo catálogo. |
| `heros/photo-hero-featured` | 13 | 90 | Sólo catálogo. |
| `heros/square` | 12 | 143 | **En ninguna página.** |

**Aviso: `page.pug` no compila.** Incluye `../heros/internal-hero`, y ese
archivo no existe: el hero se llama `internal.pug` y el nombre `internal-hero`
sólo sobrevive en `_internal-hero.scss` y en el HTML ya construido. Alguien
renombró el Pug y no actualizó el include. Consecuencias para la migración:

- El origen **no construye tal cual**. Si hace falta levantarlo, se corrige ese
  include primero (en el origen, es la única excepción a no tocarlo, o mejor:
  se corrige en una copia).
- `html/page.html` es salida vieja, anterior al renombrado. Sigue sirviendo como
  referencia visual —es lo que el componente debe parecer— pero no corresponde
  al Pug actual.

**Se migran los ocho**, incluido `square`, que no aparece en ninguna página. La
columna «¿En uso?» ya no sirve para descartar: sirve para saber en qué página
comprobar cada uno. Los que no tengan página propia se comprueban en el catálogo
visual de la [tarea 9](./tareas.md#tarea-9--página-catálogo-de-componentes).

## Componentes de contenido

| Origen | Pug | SCSS | Destino sugerido | Nota |
| --- | --- | --- | --- | --- |
| `components/title-with-text` | 4 | 34 | `section-title.pug` | Trivial. Buen primero. |
| `components/content/text-with-image` | 14 | 39 | `text-with-image.pug` | Dos columnas → apilado en móvil. |
| `components/content/title-with-steps` | 35 | 54 | `title-with-steps.pug` | |
| `components/gallery-six` | 61 | 78 | `gallery-six.pug` | **12** bloques repetidos pese al nombre → `each`. |
| `components/customers-reviews` | 51 | 86 | `customers-reviews.pug` | 3 reseñas repetidas → `each`. |
| `components/general/breadcrumb` | 6 | 39 | `breadcrumb.pug` | Sólo si hay varias páginas. |
| `components/general/separator-20` | 0 | — | — | Vacío. |

## Componentes de comercio

| Origen | Pug | SCSS | Nota |
| --- | --- | --- | --- |
| `ecommerce/products-cards-4` | 45 | 86 | 4 tarjetas idénticas copiadas. |
| `ecommerce/categories` | 31 | 31 | |
| `ecommerce/2-collections` | 16 | 73 | |
| `ecommerce/content-product` | 31 | 140 | Ficha de producto. |
| `ecommerce/shop-list` | 45 | 128 | Listado de tienda. |
| (sin Pug propio) | — | 83 | `_box-description.scss`. Su marcado está suelto dentro de `pages/cart-index.pug`, no en un componente: al migrarlo hay que extraerlo. |

## Otros

| Origen | Pug | SCSS | Nota |
| --- | --- | --- | --- |
| `blog/latests-articles-3` | 47 | 102 | 3 artículos repetidos → `each`. |
| `customers/newsletter-register` | 13 | 93 | Formulario sin destino. Ver guía. |

## Páginas

| Origen | Líneas | Composición |
| --- | --- | --- |
| `pages/index.pug` | 79 | Header en línea (no incluido) + 8 secciones + footer. |
| `pages/page.pug` | 13 | Página interior con hero `internal`. |
| `pages/cart.pug` | 10 | Carrito. |
| `pages/cart-index.pug` | 48 | Listado de tienda. |
| `pages/heros.pug` | 20 | Catálogo visual de heros. No es una página del sitio. |
| `pages/bk.pug` | 81 | Copia de trabajo reconstruida del demo. **No se migra.** |

`index.pug` tiene el header escrito dentro en vez de incluir
`includes/header.pug`, y ese include está comentado. Los dos headers han
divergido. Al migrar hay que decidir cuál es el bueno **mirando la página
servida**, no el código.

## Imágenes locales

Lo único que no viene de Qode:

```
source/images/elements/arco-iris.svg
source/images/heros/internal/internal-hero-desktop.jpg
source/images/heros/internal/internal-hero-desktop@2x.jpg
source/images/heros/internal/internal-hero-mobile.jpg
source/images/heros/internal/internal-hero-mobile@2x.jpg
```

Se copian a `src/assets/images/<componente>/`. Los `.psd` que hay junto a ellas
no se copian. Todo lo demás está enlazado en caliente contra
`playgrow.qodeinteractive.com` y no se lleva.
