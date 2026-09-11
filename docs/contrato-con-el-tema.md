# Arquitectura BEM y contrato con el tema

Esta maquetación tiene un **consumidor aguas abajo**: el tema
[`xbust3r/wp-blackgrow-theme`](https://github.com/xbust3r/wp-blackgrow-theme), que porta sus
componentes a bloques ACF.

Este documento tiene dos partes:

1. **[La arquitectura BEM a la que hay que adaptarse](#1--la-arquitectura-bem-c-section)** —
   decisión de Miguel, 2026-09-11. Es trabajo pendiente en este repositorio.
2. **[El contrato que ya existe](#2--el-contrato-que-ya-existe)** — lo que el tema depende hoy y
   que se rompe **en silencio** si cambia sin avisar.

> El tema **copia** el HTML compilado de `dist/components.html` clase por clase, y **no puede
> escribir CSS ni JavaScript**: consume `dist/assets/styles/styles.css` y
> `dist/assets/scripts/main.js` tal cual. Por eso varias cosas de aquí son contrato, y por eso un
> cambio de arquitectura de clases hay que hacerlo aquí, no allí.

---

## 1 · La arquitectura BEM: `c-section`

**Decisión de Miguel (2026-09-11): la maquetación se adapta al estándar `c-section` del core.**

Los temas del core (`wp-inoconnect.core` y los suyos) usan BEM —bloque, elemento, modificador— con
un contrato de contenedores explícito. Esta maquetación es Tailwind puro y **no lo cumple
todavía**.

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

### Equivalencia con lo que hay hoy

| Papel | Estándar del core | Hoy en esta maquetación |
|---|---|---|
| Sección — bloque padre | `c-section` | la `<section>` del componente, sin clase semántica |
| Contenedor de ancho máximo | `o-wrapper` | `.wrapper` |
| Modificador de sección | `c-section--bg-grey` | `bg-surface-alt`, `py-9`, … suelto en el marcado |
| Contenido de la sección | `c-section__content` | sin clase propia |

### Inventario: en qué estado está cada componente

Clasificados los 16 componentes que el tema porta como bloques de sección. **Ninguno tiene todavía
una clase semántica de sección**, y además hay tres formas distintas conviviendo:

**Forma A — la `section` lleva el `wrapper` (7).** Al adaptar: `c-section` en la `section` y sacar
el `wrapper` a un `div` interior con `o-wrapper c-section__content`.

`title-with-text` · `text-with-image` · `title-with-steps` · `2-collections` ·
`products-cards-4` · `categories` · `box-description`

**Forma B — `section` a sangre + `div.wrapper` dentro (3).** Es la más cercana al estándar: la
`section` ya es el padre y hay contenedor interior. Al adaptar: añadir `c-section` y convertir los
modificadores.

`customers-reviews` · `gallery-six` · `interactive-link-showcase`

**Fragmentos — el contenedor lo pone la página (6).** Son los que **más cambian**: hoy no tienen
sección propia y dependen de que la página los envuelva.

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

### Lo que hay que tener en cuenta antes de empezar

Esto **no es un renombrado de clases**. Tres cosas a resolver, y ninguna es cosmética:

1. **Choca con la arquitectura actual del repositorio.** `AGENTS.md` dice que el sistema de diseño
   vive entero en `@theme` y que se maqueta con utilidades. `c-section` y `c-section--bg-grey` son
   **clases de componente**, no utilidades: hay que decidir dónde se definen y cómo se relacionan
   con los tokens. Los modificadores no deberían reintroducir valores en crudo.
2. **`pnpm verify:render` puede protestar.** Sus dos controles están pensados para cazar valores
   inventados en el marcado; conviene comprobar cómo reaccionan a clases de componente antes de
   migrar 16 componentes.
3. **El tema tiene 25 bloques pendientes de portar y 0 portados.** Es el momento barato: adaptar
   ahora cuesta reescribir la maquetación; adaptar después cuesta además reescribir los bloques.
   **Conviene decidir el orden con el equipo del tema antes de que empiece a portar.**

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
4. **La adaptación a BEM afecta a los 16 componentes de sección a la vez.** No se hace por goteo
   sin avisar: el tema compara clase por clase.

---

## 🔄 Control de versiones

| Versión | Fecha | Autor | Acción |
| --- | --- | --- | --- |
| v1.0 | 2026-09-11 | Clia | Contrato con el tema + directiva de adaptación a BEM `c-section` |
