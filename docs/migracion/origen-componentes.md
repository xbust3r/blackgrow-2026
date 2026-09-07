# Componentes del origen · comparación con el proyecto

Explorado sobre <https://playgrow.qodeinteractive.com/> el 2026-09-07,
recorriendo las 5 home, las 3 páginas sueltas, la tienda y las 4 vistas de blog.

El clon local del que se migró el marcado (`template-html-blackn-main`) era un
subconjunto pequeño del tema. Este documento cataloga **el tema entero**, que es
lo que el proyecto tiene delante.

## Resumen

| | Origen | Proyecto | Falta |
| --- | --- | --- | --- |
| Páginas | 23 | 7 | 16 (4 en fase de backend) |
| Componentes reutilizables | 14 | 9 | 5 |
| Bloque de blog | completo | nada | **todo** |

El agujero grande no son componentes sueltos: es el **blog entero**, que en el
proyecto no existe ni como página ni como plantilla. Lo único parecido es
`latests-articles-3.pug`, que es el teaser de tres tarjetas de la home, no una
vista de blog.

## Páginas

### Las que hay

| Origen | Proyecto |
| --- | --- |
| Main Home | `pages/index.pug` |
| About Us | `pages/page.pug` |
| Shop List | `pages/cart.pug` |
| Shop Single | `pages/cart-index.pug` |
| 404 | `pages/error.pug` |

### Las que faltan

| Origen | Qué es | Nota |
| --- | --- | --- |
| Kids Store | Home alternativa | Testimonios + icono-con-texto + productos. |
| Baby Shop | Home alternativa | Marquesina de texto + showcase interactivo + galería. |
| Shop Grid | Home alternativa | Rejilla de producto como protagonista. |
| Landing | Portada del tema | Imagen-con-texto, marquesina, galería, iconos. |
| FAQ Page | Preguntas frecuentes | **No es un acordeón**: son pares pregunta/respuesta planos. No inventar un desplegable que el origen no tiene. |
| Contact Us | Contacto | Formulario (nombre, email, teléfono, comentario) + mapa de Google. |
| Blog · Right Sidebar | Listado con barra lateral | |
| Blog · Left Sidebar | Listado, barra a la izquierda | Misma plantilla, lado invertido. |
| Blog · No Sidebar | Listado a ancho completo | |
| Blog · Masonry List | Listado en mampostería | 3 / 3 / 2 / 1 columnas. El origen usa isotope; hoy `columns` de CSS o grid lo hacen sin librería. |
| Blog Single | Artículo | Con formulario de comentarios. |
| Shop · 3, 4, 5, 6 columnas | Variantes del listado | Sólo cambia el número de columnas: es un parámetro del componente, no cuatro páginas. |
| My Account · Wishlist · Cart · Checkout | Tienda | **Fase de backend.** |

## Componentes reutilizables

Los temas de Qode marcan cada componente con `qodef-shortcode`. Esta es la unión
de todos los encontrados, y a qué corresponden en el proyecto.

### Los que ya existen

| Origen | Proyecto |
| --- | --- |
| `qodef-section-title` | `title-with-text.pug` |
| `qodef-image-with-text` | `text-with-image.pug` |
| `qodef-image-gallery` | `gallery-six.pug` |
| `qodef-testimonials-list` | `customers-reviews.pug` |
| `qodef-button` | mixin `+button` en `ui.pug` |
| `qodef-single-image` | marcado directo |
| `qodef-separator` | utilidades de espaciado |
| `qodef-woo-shortcode` | `products-cards-4.pug`, `categories.pug`, `shop-list.pug` |
| `qodef-blog` (teaser) | `latests-articles-3.pug` — sólo la versión de tres tarjetas |

### Los que faltan

| Origen | Qué hace | Front puro |
| --- | --- | --- |
| `qodef-icon-with-text` | Icono, título y texto en bloque. Aparece en Kids Store y Landing. | Sí |
| `qodef-text-marquee` | Banda de texto que se desplaza en horizontal, continua. | Sí — CSS puro con `@keyframes`, y parada con `prefers-reduced-motion`. |
| `qodef-interactive-link-showcase` | Lista de enlaces que cambian la imagen mostrada al pasar por encima. | Sí |
| `qodef-google-map` | Mapa incrustado en Contacto. | Sí, aunque depende de una clave de Google. |
| `qodef-contact-form-7` | Formulario de contacto: nombre, email, teléfono, comentario. | El marcado y la validación sí; el envío es backend. |

## El blog, en detalle

Nada de esto existe en el proyecto. Es el bloque de trabajo más grande que queda.

### Listado

- **Tarjeta de artículo**: imagen, categoría, fecha, autor, título, extracto y
  «Read More».
- **Barra lateral**: widget de categorías, widget de últimas entradas y bloque
  de redes sociales. Tres disposiciones —derecha, izquierda y sin barra— que son
  la misma plantilla con el lado como parámetro.
- **Paginación** estándar, numerada. Sin «cargar más» ni scroll infinito.
- **Mampostería** como cuarta disposición.

### Artículo

- Cabecera con título, autor y fecha.
- Cuerpo con cita destacada.
- **Formulario de comentarios**: comentario, nombre, email, web y casilla de
  consentimiento de cookies. Front puro salvo el envío.
- La lista de comentarios existe como plantilla aunque el demo no tenga ninguno.

### Formatos de entrada

El tema define siete. Cada uno cambia **qué encabeza la tarjeta**:

| Formato | Qué muestra en lugar de la imagen |
| --- | --- |
| Standard | La imagen destacada. |
| Quote | Una cita con su autoría, sin imagen. |
| Link | Un enlace destacado, sin imagen. |
| Gallery | Varias imágenes. |
| Audio | Un reproductor de audio. |
| Video | Un vídeo incrustado. |
| No Sidebar | No es un formato: es la misma entrada a ancho completo. |

En el listado sólo se vieron en uso `standard`, `quote` y `link`. Los tres son
maquetado sin comportamiento; `gallery`, `audio` y `video` sí traen su propia
pieza.

## Decisiones de alcance del proyecto

Anotadas para que nadie las reabra por su cuenta:

- **Sin sliders ni carruseles.** El hero del origen es un Slider Revolution de
  3 diapositivas; el proyecto tiene ocho variantes de hero precisamente porque
  cada una es la alternativa estática, y las ocho ya están migradas.
- **Sin parallax.**
- **Sin jQuery.** El origen es WordPress y arrastra jQuery 3.7, Magnific Popup,
  select2, isotope y perfect-scrollbar. Se migra el comportamiento observado,
  no la librería: `IntersectionObserver`, `<dialog>`, `columns` de CSS.
- **Backend en otra fase.** Carrito, cuenta, lista de deseos, checkout,
  ordenación, paginación de tienda y todo el AJAX quedan fuera del alcance
  actual.
