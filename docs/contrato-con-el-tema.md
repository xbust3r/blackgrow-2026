# Arquitectura BEM y contrato con el tema

Esta maquetación tiene un **consumidor aguas abajo**: el tema
[`xbust3r/wp-blackgrow-theme`](https://github.com/xbust3r/wp-blackgrow-theme), que porta sus
componentes a bloques ACF.

Este documento tiene dos partes:

1. **[El estándar BEM del core](#1--el-estándar-bem-c-section)** — referencia, y la base de las
   **mejoras futuras** de esta maquetación. **No es trabajo pendiente hoy.**
2. **[El contrato que ya existe](#2--el-contrato-que-ya-existe)** — lo que el tema depende hoy y
   que se rompe **en silencio** si cambia sin avisar. Esto **sí** aplica ya.

> El tema **copia** el HTML compilado de `dist/components.html` clase por clase, y **no puede
> escribir CSS ni JavaScript**: consume `dist/assets/styles/styles.css` y
> `dist/assets/scripts/main.js` tal cual. Por eso varias cosas de aquí son contrato, y por eso un
> cambio de arquitectura de clases hay que hacerlo aquí, no allí.

---

## 1 · El estándar BEM: `c-section`

### Dos familias de tema, y esta maquetación es de la clásica

Miguel (2026-09-11): el trabajo se reparte entre **dos arquitecturas de front**, y hay que saber
en cuál se está antes de escribir una clase.

| Familia | Maquetación | Temas | Arquitectura de clases |
|---|---|---|---|
| **BEM** | `freeway-3.0-html` | `wp-freewayinsure`, `wp-freewayseguros` | `c-section`, `c-section--*`, `c-section__content`, `o-wrapper`, utilidades `u-*` |
| **Clásica** | **ésta** (`blackgrow-2026`) | `wp-blackgrow-theme` | Utilidades de Tailwind + tokens en `@theme` |

**Esta maquetación es de la familia clásica y se queda así.** Lo que sigue es el estándar de la
otra familia, documentado aquí por dos razones: para que nadie mezcle convenciones al saltar entre
proyectos, y porque **es la base de las mejoras futuras** de este repositorio si algún día se
decide converger.

> ⚠️ **No hay que renombrar nada hoy.** La convergencia está aceptada como fase pendiente y sin fecha
> en [DECISION-005](./comms/DECISION-005-bem-como-fase-pendiente.md); arrancarla será una TASK explícita.
> Mientras no exista, maquetar aquí con utilidades es lo correcto. Lo único que cambia desde hoy: **los
> componentes nuevos se escriben en Forma B**, que separa sección y contenedor igual que BEM, para que la
> brecha no crezca mientras la fase espera.

### El estándar

| Clase | Papel |
|---|---|
| `c-section` | **El bloque padre.** La raíz de todo componente de sección |
| `c-section` **y nada más** | Significa «soy un envoltorio: contengo otros bloques» |
| `c-section--<modificador>` | Variante de la sección: `--bg-grey`, `--bg-gradient-rose`, `--small-padding` |
| `c-section__content` | El contenido de la sección |
| `o-wrapper` | El contenedor de ancho máximo — hoy es `.wrapper` |

La regla que importa: **una sección lleva `c-section` seguida de sus modificadores.** Solo el
componente envoltorio lleva `c-section` sola. Ejemplo del core:

```html
<section class="c-section c-section--bg-gradient-rose">
    <div class="o-wrapper c-section__content u-d-grid u-grid-col-minmax">
```

### Equivalencia entre las dos familias

| Papel | Familia BEM (freeway 3.0) | Familia clásica (aquí) |
|---|---|---|
| Sección — bloque padre | `c-section` | la `<section>` del componente, sin clase semántica |
| Contenedor de ancho máximo | `o-wrapper`, `o-wrapper--sm`, `o-wrapper--large` | `.wrapper` |
| Modificador de sección | `c-section--bg-light-blue`, `c-section--small-padding` | `bg-surface-alt`, `py-9`, … en el marcado |
| Contenido de la sección | `c-section__content` | sin clase propia |
| Cabecera de sección | `c-section-header` | sin clase propia |

Clases verificadas en `freeway-3.0-html`: 66 usos de `c-section` y 57 de `c-section-header`.

### Inventario: las tres formas que conviven aquí

Esto **sí es útil hoy**, independientemente de BEM: el tema porta la forma que traiga cada
componente y **cambiar una por otra rompe el diseño**. Clasificados los 16 componentes que el tema
convierte en bloques de sección.

**Forma A — la `section` lleva el `wrapper` (7).** El componente es la sección y el contenedor a
la vez. *(En BEM esto sería `c-section` en la `section` y el `wrapper` sacado a un `div` interior
con `o-wrapper c-section__content`.)*

`title-with-text` · `text-with-image` · `title-with-steps` · `2-collections` ·
`products-cards-4` · `categories` · `box-description`

**Forma B — `section` a sangre + `div.wrapper` dentro (3).** La `section` lleva el fondo o el
`overflow` y el contenedor va dentro, para que el fondo llegue a los bordes de la pantalla. Es la
forma **más cercana al estándar BEM**, que separa igual los dos papeles.

`customers-reviews` · `gallery-six` · `interactive-link-showcase`

**Fragmentos — el contenedor lo pone la página (6).** No tienen sección propia y dependen de que
la página los envuelva. **Son los que más trabajo dan al portar**: un bloque de Gutenberg se
inserta solo, así que el bloque tiene que aportar su propio contenedor.

| Componente | Empieza en | Quién le pone el `wrapper` hoy |
|---|---|---|
| `icon-with-text` | `div` | la propia sección del mixin, con `div.wrapper` dentro |
| `latests-articles-3` | `div` | la página |
| `text-marquee` | `section` sin `wrapper` | no necesita: es a sangre completa |
| `newsletter-register` | `section` sin `wrapper` | rejilla propia a sangre |
| `contact-form` | **`form`** | `contact.pug` lo envuelve en `div.wrapper.max-w-xl` dentro de una tarjeta |
| `google-map` | `section` sin `wrapper` | `contact.pug` lo envuelve en `div.wrapper` |

`contact-form` es el caso extremo: en `contact.pug` vive dentro de una tarjeta con su propio `h2`.
Al adaptarlo hay que decidir **qué parte de esa composición es del componente** y qué parte es de
la página.

### Si algún día se converge a BEM

No está decidido y **no se empieza sin una decisión explícita**. Cuando se plantee, tres cosas a
resolver, y ninguna es cosmética:

1. **Choca con la arquitectura de este repositorio.** `AGENTS.md` dice que el sistema de diseño
   vive entero en `@theme` y que se maqueta con utilidades. `c-section` y `c-section--bg-light-blue`
   son **clases de componente**, no utilidades: habría que decidir dónde se definen y cómo se
   relacionan con los tokens, sin reintroducir valores en crudo en los modificadores.
2. **`pnpm verify:render` puede protestar.** Sus dos controles están pensados para cazar valores
   inventados en el marcado; habría que comprobar cómo reaccionan a clases de componente antes de
   tocar 16 componentes.
3. **Cuanto más tarde, más caro.** Hoy el tema tiene 25 bloques pendientes y 0 portados: converger
   ahora costaría reescribir la maquetación; converger después cuesta además reescribir los
   bloques. Es el argumento a favor de decidirlo pronto, en un sentido o en otro.

---

## 2 · El contrato que ya existe

Independientemente de la adaptación a BEM, esto ya es contrato hoy.

### 2.1 · Los ganchos de comportamiento

El tema porta los `js-*` y `data-*` **textualmente**. Renombrar uno deja un bloque que se ve
perfecto y no hace nada. **Los ganchos no se renombran al adaptar a BEM.**

De los 44 `js-*` de la maquetación, estos **9** pertenecen a componentes que el tema convierte en
bloques editoriales:

| Componente | Ganchos | Script |
|---|---|---|
| `gallery-six` | `js-reveal` · `js-lightbox` · `data-lightbox-gallery` | `lightbox.js` + `reveal.js` |
| `box-description` | `js-tabs` + los seis `id` de `tab-*`/`panel-*` | `tabs.js` |
| `categories` | `js-carousel` · `js-carousel-track` · `js-carousel-prev` · `js-carousel-next` | `carousel.js` |
| `interactive-link-showcase` | `js-link-showcase` · `data-showcase-index` · `data-showcase-target` | `interactive-link-showcase.js` |

Y estos **5** viajan dentro de los dos bloques de formulario: `js-form`, `js-only-phone`,
`js-newsletter`, `js-newsletter-status`, `js-only-letters`.

El resto —cabecera, buscador, carrito, ficha de producto, modal del lightbox, back-to-top, popup de
suscripción— es infraestructura: el tema los pone en `header.php` / `footer.php` o los deja fuera
de fase.

#### `.snap-start` también es un gancho

Parece utilidad de Tailwind y **la lee el JS**:

```js
// src/scripts/components/carousel.js
const firstItem = this.track.querySelector('.snap-start');   // mide cuánto desplazar
```

Quitarla de los ítems del carrusel no rompe nada visible: el carrusel sigue funcionando y avanza
una distancia distinta. Es el tipo de cambio que nadie atribuye a una clase borrada.

#### Dos valores que el tema **no** copia literales

No es un defecto de la maquetación —en una página estática funcionan—, pero conviene saberlo para
no «corregirlo» al comparar:

| Dónde | Literal aquí | En el tema |
|---|---|---|
| `gallery-six` | `data-lightbox-gallery="gallery-six"` | el `$id` del bloque |
| `box-description` | `id="tab-description"`, `id="panel-description"`, … | prefijados con el `$id` |

Los scripts de esos dos resuelven con `document.getElementById()` y `document.querySelectorAll()`,
así que **dos instancias en una misma página colisionan**. Los otros dos (`carousel`,
`link-showcase`) buscan con `container.querySelector()` y no tienen el problema.

### 2.2 · Las medidas de las imágenes

El tema genera **cuatro `add_image_size` por imagen** —`-lg`, `-lg-2x`, `-sm`, `-sm-2x`— y las
deriva de los `width`/`height` del marcado compilado.

Cambiar las medidas declaradas de una imagen **invalida esos cuatro tamaños**, y el tema sigue
sirviendo recortes con la proporción antigua sin dar error. Se avisa.

El `<source media>` del tema usa `(min-width: 43.75rem)`, que es **`--breakpoint-tablet`** de
`src/styles/styles.css`. No es un número suelto: es el mismo punto en el que las clases `tablet:`
cambian el layout. **Si ese breakpoint se mueve, hay que decirlo**, o la imagen cambiará en un
punto distinto al del diseño.

### 2.3 · Lo que el tema no puede arreglar por su cuenta

Su `AGENTS.md` le prohíbe escribir CSS o JavaScript: ni `<style>` inline, ni un `.css` por bloque,
ni `viewScriptModule`. Consecuencias:

- **Un comportamiento que falte o falle se arregla aquí**, y vuelve compilado en `main.js`.
- **Una clase que no exista en `styles.css` no existe** para el tema. Comprobarlo es uno de sus
  cinco controles de verificación — y es justo lo que la adaptación a BEM va a mover.
- Los scripts se inicializan **una sola vez al cargar la página**. En el editor de Gutenberg un
  bloque recién insertado no se inicializa. No es un fallo de la maquetación.
- `reveal.js` deja el elemento en `opacity-0` hasta que dispara el `IntersectionObserver`. Dentro
  del iframe del editor puede no disparar nunca y el bloque **parece roto sin estarlo**.

---

## 3 · Qué hacer cuando algo de aquí cambie

Los dos repositorios son independientes y el tema tiene `template-html/` en su `.gitignore`: no
hay automatismo.

1. Si el cambio toca los ganchos, las formas de contenedor, las medidas de imagen o el breakpoint,
   **decirlo en el `CHANGELOG.md`** con el nombre del componente.
2. El tema sincroniza con `bin/sync-assets.sh` y compara contra `dist/components.html`. Cuanto más
   explícito el changelog, menos auditoría.
3. Si el cambio es de comportamiento, actualizar también
   [`docs/migracion/origen-comportamientos.json`](./migracion/origen-comportamientos.json), que es
   la fuente de verdad de los comportamientos.
4. **Si un componente cambia de forma** (A, B o fragmento), se avisa: el tema tiene que reescribir
   su `index.php`.
5. **La convergencia a BEM es una fase pendiente aceptada** — ver
   [DECISION-005](./comms/DECISION-005-bem-como-fase-pendiente.md). Es gradual, pero no en todo: el
   **esqueleto** (`c-section`, `o-wrapper`, `c-section__content`) afecta a los 16 componentes de
   sección **a la vez** y no admite goteo, porque el tema compara clase por clase y media docena en
   BEM y media en utilidades le obliga a cargar dos convenciones. El **interior** de cada componente
   sí va uno a uno.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-11 | Clia | Contrato con el tema; el estándar BEM `c-section` como referencia de la otra familia y base de mejoras futuras |
