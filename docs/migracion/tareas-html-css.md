# Fase HTML + CSS · componentes y páginas que faltan

Checklist para un agente que **no estuvo** en las decisiones anteriores. Se lee
entera antes de empezar, junto con [`AGENTS.md`](../../AGENTS.md) y la
[tarjeta de decisión](../tarjeta-de-decision.md).

Referencia visual: <https://playgrow.qodeinteractive.com/> — el sitio vivo. El
inventario de lo que falta está en
[origen-componentes.md](./origen-componentes.md).

## Alcance de esta fase

**Sólo maquetado: Pug + Tailwind.**

| Dentro | Fuera |
| --- | --- |
| Marcado, estructura, semántica | Escribir módulos JavaScript nuevos |
| Estilos con utilidades y tokens | Importar nada en `src/scripts/main.js` |
| Animaciones que son CSS puro | Comportamiento que exige JavaScript |
| Estados visuales (`hover`, `focus-visible`, `aria-*`) | Tienda, carrito, AJAX, backend |

No se crea ni un archivo en `src/scripts/`. Si una tarea parece necesitarlo,
está mal entendida: lo que toca es dejar el marcado **listo** para que la fase
de JavaScript se enganche sin reescribirlo.

### Las dos reglas que hacen que esto funcione

**1. El marcado declara su hook aunque el módulo no exista todavía.** Escribir
`js-tabs` ahora significa que la fase siguiente añade el módulo y ya está. El
validador (`pnpm validate:origen`) sabe que esos comportamientos están
`pendiente` y no protesta por un hook sin módulo.

**2. Sin JavaScript, la página tiene que seguir siendo legible y usable.** Es la
diferencia entre maquetar para que funcione después y maquetar una pieza rota:

- Las **pestañas** de la ficha muestran, sin JS, los tres paneles uno detrás de
  otro. No se ocultan con `hidden` en el marcado: los oculta el JS al arrancar.
- La **galería con lightbox** son enlaces `<a href="imagen-grande">` normales.
  Sin JS abren la imagen; con JS se interceptan.
- El **showcase interactivo** enseña su primera imagen ya puesta.
- Los **formularios** validan con los atributos nativos (`required`, `type`,
  `minlength`) aunque `forms.js` no llegue a cargar.

## Regalo: los formularios ya validan solos

`src/scripts/components/forms.js` **ya existe y está conectado**. Cualquier
formulario nuevo que lleve la clase `js-form` y use el mixin `+field` obtiene
validación, mensajes accesibles y guardia de doble envío sin escribir una línea
de JavaScript. Eso está dentro de esta fase.

---

## Bloque 0 · Prerrequisito

- [x] **Extender el mixin `field` con `textarea`.** Hoy
      `src/components/ui.pug` sólo resuelve `input` y `select`. El formulario de
      contacto y el de comentarios necesitan área de texto. Añadir una rama
      `o.control === 'textarea'` que respete el mismo `aria-describedby`, el
      mismo hueco de error y las mismas clases; con `rows` configurable.

      *Cierre:* un `+field({control: 'textarea', ...})` renderiza y
      `pnpm lint` pasa.

---

## Bloque 1 · Componentes sueltos

Cinco componentes del tema que el proyecto no tiene. Van en
`src/components/` y se añaden al catálogo `src/pages/components.pug`.

- [x] **`icon-with-text.pug`** — icono, título y texto en bloque.
      Referencia: <https://playgrow.qodeinteractive.com/kids-store/>.
      El icono sale del sprite con `+svgIcon`; si el icono aún no existe en
      `src/assets/icons/`, dejarlo declarado y anotarlo como pendiente de asset.
      Mixin con parámetros, porque se repite en varias páginas.

- [x] **`text-marquee.pug`** — banda de texto que se desplaza en horizontal, en
      bucle. Referencia: <https://playgrow.qodeinteractive.com/baby-shop/>.
      **Es CSS puro y se completa entera en esta fase.** `@keyframes` en
      `src/styles/styles.css` y el texto duplicado en el marcado para que el
      bucle no tenga costura.
      Obligatorio: dentro de `@media (prefers-reduced-motion: reduce)` la
      animación se detiene — el bloque ya existe en `styles.css`.
      El texto repetido va con `aria-hidden='true'` en las copias, para que un
      lector de pantalla lo lea una sola vez.

- [x] **`interactive-link-showcase.pug`** — lista de enlaces que cambia la
      imagen mostrada al pasar por encima.
      Referencia: <https://playgrow.qodeinteractive.com/baby-shop/>.
      En esta fase: la lista, la imagen y el estado de reposo con la **primera
      imagen ya visible**. Hook `js-link-showcase` declarado. El intercambio al
      pasar el cursor llega después.

- [x] **`contact-form.pug`** — nombre, email, teléfono y comentario.
      Referencia: <https://playgrow.qodeinteractive.com/contact-us/>.
      Con `js-form` y el mixin `+field`, **queda funcionando** salvo el envío.
      El `action` se deja **vacío**: no hay destino todavía y `forms.js` ya avisa
      en consola en vez de simular un éxito. Anotarlo como pendiente.

- [x] **`google-map.pug`** — mapa incrustado de Contacto.
      Necesita una clave de Google que el proyecto no tiene. Maquetar el
      contenedor con su proporción y un marcador visible; **no** incrustar un
      `iframe` con una clave ajena. Anotar como pendiente de integración.

---

## Bloque 2 · Blog · componentes

El bloque más grande. Todo maquetado, nada de comportamiento.
Referencia: <https://playgrow.qodeinteractive.com/right-sidebar/>.

- [x] **`blog-card.pug`** — tarjeta de artículo: imagen, categoría, fecha,
      autor, título, extracto y «Read More». Mixin con parámetros; el listado
      lo recorre con `each` sobre un array, como `products-cards-4.pug`.

- [x] **Formatos de entrada.** El formato cambia **qué encabeza la tarjeta**,
      no el resto. Resolverlo con un parámetro `formato` dentro de
      `blog-card.pug`, no con seis archivos:

      - [x] `standard` — imagen destacada.
      - [x] `quote` — cita con su autoría, sin imagen.
      - [x] `link` — enlace destacado, sin imagen.
      - [x] `gallery` — varias imágenes en rejilla.
      - [x] `audio` — `<audio controls>` nativo, sin librería.
      - [x] `video` — contenedor con proporción para el vídeo incrustado.

      En el listado del origen sólo se ven en uso `standard`, `quote` y `link`;
      los otros tres existen como formato del tema. Maquetar los seis.

- [x] **`blog-sidebar.pug`** — tres widgets: categorías, últimas entradas y
      redes sociales. Un mixin por widget dentro del mismo archivo.

- [x] **`pagination.pug`** — paginación numerada, con página actual marcada
      (`aria-current='page'`) y enlaces anterior/siguiente. Sin «cargar más» ni
      scroll infinito: el origen no los tiene.

- [x] **`comment-form.pug`** — comentario, nombre, email, web y casilla de
      consentimiento. Con `js-form` y `+field`, valida solo. `action` vacío.

- [x] **`comment-list.pug`** — lista de comentarios con avatar, autor, fecha,
      texto y enlace de responder. El demo no tiene ninguno; se maqueta con dos
      de ejemplo, uno de ellos anidado como respuesta.

---

## Bloque 3 · Blog · páginas

- [x] **`blog.pug`** — listado con barra lateral **a la derecha**.
- [x] **Variante barra a la izquierda.** No es una página nueva: es la misma
      plantilla con el lado como parámetro. Resolverlo con una variable, no
      duplicando el archivo.
- [x] **Variante sin barra**, a ancho completo. Mismo parámetro.
- [x] **`blog-masonry.pug`** — mampostería a 3 / 3 / 2 / 1 columnas.
      **Se resuelve con `columns` de CSS**, no con isotope ni JavaScript: el
      origen usa una librería que aquí no hace falta.
- [x] **`blog-single.pug`** — artículo: cabecera con título, autor y fecha;
      cuerpo con cita destacada; `comment-list` y `comment-form` al pie.

Las tres variantes de listado se registran en `src/pages/` como páginas
distintas —para poder verlas— pero comparten plantilla.

---

## Bloque 4 · Páginas sueltas

- [x] **`contact.pug`** — usa `contact-form` y `google-map`.
      Referencia: <https://playgrow.qodeinteractive.com/contact-us/>.

- [x] **`faq.pug`** — preguntas frecuentes.
      Referencia: <https://playgrow.qodeinteractive.com/faq-page/>.
      **No es un acordeón.** Son pares pregunta/respuesta planos: un `h3` con su
      párrafo debajo. Verificado en el origen. No construir un desplegable que
      el origen no tiene, ni añadirle JavaScript.

---

## Bloque 5 · Home alternativas

Cuatro composiciones nuevas de componentes que en su mayoría ya existen. Se
hacen **después** de los bloques 1 y 2, porque los consumen.

- [x] **`kids-store.pug`** — testimonios, icono-con-texto y productos.
- [x] **`baby-shop.pug`** — marquesina, showcase interactivo y galería.
- [x] **`shop-grid.pug`** — rejilla de producto como protagonista.
- [x] **`landing.pug`** — imagen-con-texto, marquesina, galería e iconos.

Antes de escribir marcado nuevo en cualquiera de las cuatro, comprobar si la
sección ya existe como componente. La mayoría sí.

---

## Bloque 6 · Cierre

- [x] **Todo componente nuevo aparece en `src/pages/components.pug`**, con su
      nombre visible. Es donde se comprueban los que no tienen página propia.
- [x] **Toda página nueva extiende `src/layouts/main-template.pug`** y define su
      propio `block title` y descripción. Dos páginas con el mismo `<title>` es
      un fallo.
- [x] **Validaciones en verde**, en este orden:
      ```bash
      pnpm lint
      pnpm validate
      pnpm build
      pnpm preview
      ```
- [x] **Comprobado servido y con teclado**, en 360 y en 1200. Redimensionando el
      viewport de verdad: estrechar un elemento no reevalúa las media queries.
- [x] **Informe** en la raíz: qué se hizo, qué se supuso, qué quedó pendiente y
      la salida de los comandos.

---

## Recordatorios del proyecto

Lo que más se olvida al llegar nuevo:

- Las clases van **siempre** en `class='…'`, nunca en la notación de puntos de
  Pug: `.desktop:flex` y `.w-1/2` no compilan.
- Mobile primero. Los breakpoints son `tablet:`, `desktop:` y `wide:`; `sm:`,
  `md:` y `lg:` **no existen** en este proyecto.
- Ningún color en el marcado. Si falta, se añade el token en `@theme`.
  `bg-[#db915e]` hace fallar el build.
- Lo que se repite va con `each` o con un mixin, no copiado.
- No inventar contenido: el relleno del origen se copia tal cual, typos
  incluidos.
- El sprite se genera solo desde `src/assets/icons/`; no se edita a mano.
- Los assets del origen que hay hoy son **marcadores temporales sin licencia**
  (`docs/migracion/assets-pendientes.json`). Si una pieza nueva necesita una
  imagen que no está, se declara el marcador y se anota; no se descarga nada
  nuevo del demo.
