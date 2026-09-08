# Guía de migración: Playgrow → Blackgrow 2026

Esta carpeta es para un agente que **no estuvo** en la conversación donde se
creó este core. Contiene todo lo necesario para migrar el maquetado ya avanzado
sin volver a decidir lo que ya está decidido.

> **«Origen» es el sitio vivo.** Cuando este documento —o cualquier encargo—
> dice *origen*, se refiere a <https://playgrow.qodeinteractive.com/>. El clon
> local `template-html-blackn-main` fue la referencia de la primera migración y
> **ya no está en el disco**; además nunca tuvo el carrito, el checkout, la
> cuenta ni la lista de deseos. Lo que quede por migrar se lee del sitio vivo,
> servido en el navegador, no de una carpeta local. Ver
> [La referencia es el sitio vivo](#la-referencia-es-el-sitio-vivo).

- **[inventario.md](./inventario.md)** — qué hay en origen y a qué corresponde.
  Sus rutas locales son históricas: describen el clon, que ya no existe.
- **[tareas.md](./tareas.md)** — la migración del maquetado del clon local, ya
  completada.
- **[tareas-html-css.md](./tareas-html-css.md)** — los componentes y páginas
  del tema que faltaban, sólo Pug y Tailwind. **Fase completada.**
- **[correcciones.md](./correcciones.md)** — **lo que toca ahora**: lo que salió
  de validar esa fase. La estructura está bien; lo que hay que arreglar es el
  contenido, que se inventó en vez de copiar el relleno del origen.
- **[playgrow-origen.md](./playgrow-origen.md)** — el validador de
  **comportamientos** contra el sitio vivo. El clon local era estático, así que
  para lo que el sitio tiene que *hacer* la referencia es
  <https://playgrow.qodeinteractive.com/>. Se ejecuta con
  `pnpm validate:origen`.
- **[origen-componentes.md](./origen-componentes.md)** — el tema **entero**
  explorado (23 páginas), comparado contra lo que hay en el proyecto. El clon
  local era un subconjunto pequeño; aquí está lo que falta, empezando por el
  blog.

Se lee esta guía entera antes de tocar la primera tarea. Después,
[`AGENTS.md`](../../AGENTS.md) y la [tarjeta de decisión](../tarjeta-de-decision.md)
mandan sobre cualquier cosa que aquí se dé por supuesta.

## La referencia es el sitio vivo

| | Origen | Destino |
| --- | --- | --- |
| Dónde | <https://playgrow.qodeinteractive.com/> | `~/Servers/blackgrow-2026` |
| Build | Gulp 4 + Pug + Sass + Bootstrap 5 | Vite 8 + Vituum + Pug + Tailwind v4 |
| Estilos | SCSS anidado con `&`, variables `$qode-*` | Utilidades + tokens en `@theme` |
| Rejilla | `.container` / `.wcol` / `.col-1`…`.col-12` propias | Flex y grid de Tailwind |
| Responsive | **Desktop first** (`@media (max-width: …)`) | **Mobile first** (`tablet:`, `desktop:`) |
| Imágenes | Enlazadas en caliente desde `playgrow.qodeinteractive.com` | Locales en `src/assets/images/` |

El origen **no se modifica**. Es la referencia visual; se lee, no se edita. Y
al ser un sitio de terceros, «no se modifica» es literal: se navega y se
inspecciona, no se le envían formularios ni se le crean cuentas. Lo único que se
admite tocar es la cesta de la propia sesión, y sólo cuando un template no puede
verse vacío —el carrito y el checkout son el caso—; eso se pide antes.

La fila «Build» y «Estilos» describen cómo estaba hecho el clon. El sitio vivo es
WordPress con WooCommerce y el tema Playgrow de Qode: el marcado que se
inspecciona lleva clases `qodef-*` y `woocommerce-*` generadas por plugins. Esas
clases **no se copian**; lo que se copia son los valores y la estructura visible.


## Qué es realmente esta migración

No es una conversión mecánica de SCSS a clases. Hay cuatro asuntos que cambian
el trabajo y conviene tener presentes desde la primera tarea.

### 1. El destino pasa de landing page a sitio — ya está decidido

**No hay que decidirlo, ya se decidió.** El origen es un sitio de cinco páginas
con navegación, carrito y ficha de producto. El destino, tal y como está hoy, es
un core de landing page: `src/pages/index.pug` incluye sus secciones
directamente, sin layout y sin rutas.

La migración convierte el destino en un sitio: se añade
`src/layouts/main-template.pug` y cada página lo extiende, siguiendo el patrón de
bloques de `front-end-core`. Es la
[tarea 1](./tareas.md#tarea-1--layout-y-páginas), y **bloquea todo lo demás**
porque cambia dónde viven `head`, `header` y `footer`.

**Se migra todo el maquetado, incluido lo que hoy no se incluye en ninguna
página.** Hay heros y componentes que no aparecen en ningún `pages/*.pug` del
origen —`square` es el caso claro—. No se descartan: están trabajados y se
quieren. Los que no tengan una página donde ir, van al catálogo visual de la
[tarea 9](./tareas.md#tarea-9--página-catálogo-de-componentes).

### 2. Ninguna imagen del origen se puede llevar tal cual

Hay unas 199 referencias a `playgrow.qodeinteractive.com`. Son imágenes de un
tema comercial de Qode Interactive servidas desde su demo: no son del proyecto,
se rompen si ellos las cambian, y mandan tráfico al sitio de origen. Además el
pie del origen conserva el crédito `Designed by Qode Interactive`.

Ninguna de esas URLs llega al destino. Cada imagen se sustituye por el asset
real del proyecto o por un marcador declarado como pendiente. Esto no es
opcional y no se pospone «para el final»: un componente migrado con la URL de
Qode dentro está sin terminar.

Ojo: **`pnpm validate` no lo detecta.** Ese comando comprueba que las rutas
locales existan e ignora las absolutas a propósito. La comprobación es la
[tarea 2](./tareas.md#tarea-2--auditar-que-no-queda-ninguna-url-de-qode).

### 3. El responsive se invierte, no se traduce

El origen es desktop first: la regla base describe escritorio y las
`@media (max-width: …)` corrigen hacia abajo.

```scss
.card {
    flex: 1 0 calc(25% - 20px);

    @media (max-width: map-get($mq-breakpoints, tablet)) {
        flex: 1 0 100%;
    }
}
```

El destino es mobile first. Ese mismo bloque es:

```pug
div(class='w-full desktop:w-1/4')
```

Traducir literalmente —poner el valor de escritorio sin prefijo— produce una
página que se ve bien en el monitor donde se revisó y mal en el teléfono, que es
donde importa. **Se lee el bloque entero, se identifica el valor de móvil, y ese
es el que va sin prefijo.**

Hay además un breakpoint que no coincide:

| | Origen | Destino |
| --- | --- | --- |
| mobile | 360px | 360px (`mobile:`) |
| tablet | 700px | 700px (`tablet:`) |
| **desktop** | **980px** | **1000px** (`desktop:`) |
| wide | 1200px | 1200px (`wide:`) |

20px de diferencia. Se usa el del destino y no se añade un breakpoint nuevo por
esto: ningún diseño depende de esos 20px, y meter un quinto valor por una
diferencia que nadie va a ver es exactamente cómo se degrada un sistema. Si
aparece un caso donde sí importe, se señala en el informe.

### 4. La rejilla del origen no se migra: desaparece

`.container`, `.container-full`, `.wcol`, `.row`, `.allcenter` y `.col-1`…`.col-12`
son un mini-Bootstrap escrito a mano en `source/scss/elements/_grid.scss`. No
tienen equivalente que crear en el destino: Tailwind ya hace eso.

| Origen | Destino |
| --- | --- |
| `.container` | `wrapper` (la utilidad del core) |
| `.container-full` | `flex justify-between w-full` |
| `.wcol` | `flex` |
| `.row` | `flex flex-col` |
| `.allcenter` | `items-center justify-center` |
| `.col-6` | `w-1/2` o `basis-1/2` |
| `.w-full` | `w-full` |

No crear una utilidad `col-6` en `@theme` para «que se parezca». La migración es
la ocasión de perder esa capa, no de conservarla con otro nombre.

## Cómo se migra un componente

El procedimiento es el mismo para todos y está detallado con un ejemplo completo
en la [tarea 4](./tareas.md#tarea-4--migrar-los-componentes-de-contenido).
Resumido:

1. Abrir el `.pug` y el `.scss` del origen **a la vez** —cuando existan; para lo
   que sólo está en el sitio vivo, el equivalente es inspeccionar el nodo y sus
   estilos calculados—. El estilo dice cosas que el marcado no: qué es una
   columna, qué se apila en móvil, qué tiene `hover`.
2. Abrir el componente en el sitio vivo y mirarlo de verdad, en móvil y en
   escritorio. No migrar a ciegas desde el código. Para lo que ya no tiene clon
   local, este paso es el único que hay: se leen del navegador el texto, la
   estructura y los valores calculados.
3. Escribir el `.pug` nuevo en `src/components/`, con las clases en `class='…'`.
4. Los valores de marca —colores, tipografía— **no se escriben en el marcado**:
   se añaden como tokens en `src/styles/styles.css` y se usan por su nombre.
5. Si el marcado repite un bloque, se resuelve con `each`, no copiando.
6. Incluirlo desde su página y comprobarlo servido, en móvil y en escritorio.

### Lo que se corrige por el camino

El maquetado del origen tiene defectos que no hay que arrastrar. Corregirlos es
parte de la migración, no trabajo extra:

- **Marcado repetido.** `products-cards-4.pug` son 45 líneas que repiten cuatro
  veces la misma tarjeta con el mismo contenido. Va con `each` sobre un array.
- **Texto de relleno visible.** Los iconos sociales del header llevan `fb`,
  `ins`, `zxc`, `asd` como texto. Los enlaces sin nombre accesible los rechaza
  Markuplint, así que hay que resolverlos: icono del sprite más texto
  `sr-only`.
- **Jerarquía de titulares por tamaño.** El origen usa `h5` para el nombre de un
  producto y `h3` para el título de una sección porque le cuadraba el tamaño. En
  el destino el nivel lo decide la estructura y el tamaño lo pone `text-h*`.
- **Imágenes sin proporción real.** Varias declaran `width`/`height` que no
  corresponden al archivo. `pnpm verify:render` lo va a decir; se corrige con las
  medidas del asset nuevo.
- **Archivos vacíos.** `source/scss/elements/_fonts.scss`,
  `source/pug/components/general/separator-20.pug` y
  `source/pug/includes/header/menu.pug` tienen cero bytes. No se migran.

### Lo que no se toca sin preguntar

- **Contenido final.** Los textos del origen son *lorem ipsum* y nombres de
  producto inventados. No se sustituyen por otros inventados: se mantienen como
  marcador y se anotan como pendiente de contenido real.
- **Enlaces.** Eran todos `href="#"` mientras no había páginas a las que
  apuntar. **Ese pendiente está resuelto:** con las 22 páginas construidas,
  Miguel pidió que el sitio se navegue, y la
  [TASK-005](../comms/TASK-005-navegacion-y-enlaces.md) declara el mapa del
  sitio en `config.pug` y les da destino real. Lo que siga sin destino —una
  red social sin cuenta— se queda en `#` y se anota; lo que no se hace nunca
  es inventar una URL externa.
- **El formulario del newsletter** no tiene destino. Se migra como presentación
  y se anota; no se le inventa un `action`.

## Verificación

Al cerrar **cada** tarea, no al final del bloque:

```bash
cd ~/servers/"blackgrow 2026"
pnpm lint
pnpm validate
pnpm build
pnpm preview
```

`pnpm build` ya ejecuta `verify:render` al terminar. Sus dos controles nuevos son
los que más van a saltar en esta migración:

- un color escrito en el marcado (`bg-[#db915e]`) **falla**: ese color es
  `--color-brand` y va en `@theme`;
- un valor arbitrario repetido tres veces **avisa**: era un token.

Y se mira la página servida. Ningún comando sabe si se parece al original.

## Informe

Al terminar cada bloque de tareas, dejar en la raíz del repositorio un documento
con: qué se migró, qué decisiones se tomaron y por qué, qué quedó pendiente y
por qué, y el resultado de las validaciones. Los pendientes se declaran; no se
resuelven inventando.
