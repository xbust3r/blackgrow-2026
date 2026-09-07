# Tareas de migración

Antes de la primera: leer [README.md](./README.md) e
[inventario.md](./inventario.md) de esta carpeta, y
[`AGENTS.md`](../../AGENTS.md) de la raíz.

Rutas: origen `~/Downloads/template-html-blackn-main` (**no se modifica**),
destino `~/servers/blackgrow 2026`.

## Decisiones ya tomadas

No hay que volver a plantearlas:

1. **El destino es un sitio**, no una landing page. Lleva
   `src/layouts/main-template.pug` y cada página lo extiende, con el patrón de
   bloques de `front-end-core`.
2. **Se migra todo el maquetado**, incluidos los Pug que hoy no se incluyen en
   ninguna página. Están trabajados y se quieren. Lo que no tenga página propia
   va al catálogo visual (tarea 9).
3. **Ninguna URL de `playgrow.qodeinteractive.com` llega al destino** y el
   crédito a Qode Interactive tampoco.

## Orden y dependencias

```text
1. Layout y páginas ─┬─> 4. Header ─┐
                     ├─> 5. Footer ─┤
2. Tokens ───────────┼─> 6. Heros ──┼─> 9. Catálogo ─> 10. Cierre
3. Tipografía ───────┼─> 7. Contenido ┤
                     └─> 8. Comercio ─┘
                     
0. Auditoría anti-Qode: se repite al cerrar cada tarea.
```

Las tareas 1, 2 y 3 son independientes entre sí y se pueden hacer en paralelo.
Ninguna de la 4 a la 8 se empieza sin la 1 y la 2 cerradas.

Cada tarea se cierra con sus validaciones antes de empezar la siguiente. Al
terminar todas, la validación formal está en
[checklist-validacion.md](./checklist-validacion.md).

---

## Tarea 0 · Auditoría anti-Qode

**Se ejecuta al cerrar cada una de las demás tareas.** No es una tarea final.

```bash
cd ~/servers/"blackgrow 2026"
grep -rn "qodeinteractive\|playgrow\|Playgrow\|Qode" src/ && echo "HAY RESTOS" || echo "limpio"
```

Debe decir `limpio`. `pnpm validate` **no** detecta esto: ignora las URLs
absolutas a propósito.

Cada imagen del origen se sustituye por el asset real del proyecto o por un
marcador declarado como pendiente. Un componente migrado con una URL de Qode
dentro está sin terminar.

---

## Tarea 1 · Layout y páginas

**Bloquea:** todo. **No depende de:** nada.

El core actual no tiene layout: `src/pages/index.pug` incluye `head`, `header`,
`main` y `footer` directamente, y `thanks.pug` y `error.pug` repiten esa misma
estructura. Con cinco páginas más eso es insostenible.

### 1.1 Crear `src/layouts/main-template.pug`

Contiene el documento completo: `doctype`, `html`, `head`, tracking, header,
`main` y footer. Expone bloques para que cada vista aporte lo suyo:

```pug
include ../components/config
doctype html
html(lang=language)
    head
        block title
            title= pageTitle
        block description
            meta(name='description', content=pageDescription)
        include ../components/head-base
        block preload
        include ../components/tag-manager-head

    body(class='flex min-h-dvh flex-col')
        include ../components/tag-manager-body
        a(class='skip-link', href='#main') Skip to content

        if header !== false
            include ../components/header

        main#main(class='flex-1', tabindex='-1')
            block content

        if footer !== false
            include ../components/footer

        include ../components/scripts
```

Hay que partir el `head.pug` actual: lo común —charset, viewport, favicon,
fuentes, hoja de estilos— se queda en `head-base.pug`; el título, la descripción
y los preloads pasan a bloques de la vista, porque cambian por página.

Una vista queda así:

```pug
extends ../layouts/main-template

block vars
    - const header = true;
    - const footer = true;

block title
    title Cart

block content
    include ../components/breadcrumb
    include ../components/cart-summary
```

### 1.2 Migrar las tres páginas existentes

`index.pug`, `thanks.pug` y `error.pug` pasan a extender el layout. Su marcado no
cambia, sólo dónde vive.

### 1.3 Crear las páginas del sitio

Del origen: `page` (interior), `cart`, `cart-index` (listado de tienda). La
página `heros` del origen no es una página del sitio: es un catálogo, y se trata
en la tarea 9. `bk.pug` no se migra.

**Cierre:** las seis páginas construyen, `pnpm build` en verde, y ninguna repite
el `doctype` ni el `header`.

---

## Tarea 2 · Tokens en `@theme`

**Bloquea:** de la 4 a la 9. Si los tokens no están, cada componente inventará un
color entre corchetes y `verify:render` fallará.

En `src/styles/styles.css`, bloque `@theme`, sustituir los valores de marcador por
los del origen según el **mapa de color** de
[inventario.md](./inventario.md#mapa-de-color).

Dos decisiones que se toman **mirando la página servida**, no el código:

- `#8b8686` (`$qode-gray-color`) y `#6e6e6e` (el `color` del `body`) son dos
  grises de texto secundario. ¿Uno o dos tokens?
- El color principal y el de hover son el mismo naranja `#DB915E` repartido en
  cinco variables. Casi seguro es un descuido del origen: se migra tal cual y se
  señala en el informe. **No se inventa un tono de hover.**

**Cierre:** `pnpm build` en verde y una página usando `bg-brand` y `text-ink-soft`
con el color correcto, comprobado en el navegador.

---

## Tarea 3 · Tipografía

**Bloquea:** el parecido con el original más que ninguna otra cosa.

El origen usa **Jost** desde Google Fonts por `<link>`. El destino sirve sus
fuentes él mismo, recortadas.

1. Revisar los `font-weight` del SCSS del origen para saber qué pesos hacen falta.
2. Dejar los TTF en `src/assets/fonts/` y ejecutar:
   ```bash
   python -m pip install -r requirements-fonts.txt
   pnpm font:subset
   ```
3. Declarar un `@font-face` por peso en `src/styles/styles.css` — hay plantilla
   comentada.
4. Apuntar `--font-main` a `Jost`.
5. Añadir al array `fonts` de `head-base.pug` sólo los pesos críticos del primer
   viewport.

Detalle en [assets.md](../assets.md#fuentes).

**Cierre:** `pnpm build` sin el aviso `ningún token de @theme nombra una
familia`, y Jost pintando en el navegador — comprobado ahí, no en el CSS.

---

## Tarea 4 · Header y menú móvil

**Depende de:** 1 y 2. Es la tarea más grande: 178 + 262 líneas de SCSS.

**El origen tiene dos headers y han divergido.** `index.pug` lleva el suyo
escrito dentro y tiene comentado el `include ../includes/header`. Cuál es el
bueno se decide **mirando las dos páginas servidas**, no leyendo el código.

**El menú móvil no es accesible.** Funciona con el truco de
`input[type=checkbox]`: sin `aria-expanded`, sin foco atrapado, sin cierre con
`Escape`. Migrarlo tal cual traslada los tres problemas y Markuplint rechazará
parte del marcado. Se rehace con un `button` y un módulo en
`src/scripts/components/`; el core ya trae `src/scripts/tools/trap-focus.js` sin
usar, que es justo para esto.

Los iconos sociales del origen son clases de FontAwesome con texto de relleno
(`fb`, `ins`, `zxc`, `asd`). Van al sprite —`src/assets/icons/`, uso con
`+svgIcon`— y el enlace lleva su nombre accesible en un `span` con `sr-only`.

**Cierre:** navegable entero con teclado, `Escape` cierra el menú, el foco vuelve
al botón que lo abrió, `pnpm lint` en verde, comprobado redimensionando el
viewport de verdad.

---

## Tarea 5 · Footer

**Depende de:** 1 y 2. 68 líneas de SCSS.

Lo importante no es el CSS: **el pie del origen dice `© 2022 Playgrow. All Rights
Reserved. Designed by Qode Interactive`.** Playgrow es un tema comercial de Qode
Interactive y ese texto no puede aparecer en el destino. Se sustituye por los
datos reales; si no se saben, se deja el marcador que ya trae `config.pug`
(`brand.legalName`) y se anota como pendiente.

**Cierre:** tarea 0 limpia.

---

## Tarea 6 · Heros — los ocho

**Depende de:** 1, 2 y 3.

| Hero | SCSS | Dónde comprobarlo |
| --- | --- | --- |
| `cloud-title` | 111 | `index` |
| `internal` | 177 | catálogo (ver aviso) |
| `photo_hero_2_button` | comparte | `page` |
| `photo_hero` | 173 | catálogo |
| `photo_hero_2` | 127 | catálogo |
| `square` | 143 | catálogo — no está en ninguna página del origen |
| `default` | 126 | catálogo |
| `photo-hero-featured` | 90 | catálogo |

**Aviso: `page.pug` del origen no compila.** Incluye `../heros/internal-hero` y
ese archivo no existe: el hero se llama `internal.pug`. Alguien lo renombró y no
actualizó el include. Consecuencias:

- Si hace falta levantar el origen, se corrige ese include **en una copia**, no
  en el original.
- `html/page.html` es salida vieja anterior al renombrado: sirve como referencia
  visual, pero no corresponde al Pug actual.

Cuatro de los ocho comparten estructura de foto a sangre con texto encima. Antes
de migrar el segundo, mirar si son un mixin con parámetros en vez de cuatro
archivos. Si lo son, `verify:render` lo dirá igual al tercero.

**Cierre:** los ocho migrados, incluidos en su página o en el catálogo, y
comparados con el original servido en móvil y escritorio.

---

## Tarea 7 · Componentes de contenido

**Depende de:** 1 y 2. Orden de menos a más:
`title-with-text`, `text-with-image`, `title-with-steps`, `breadcrumb`,
`customers-reviews`, `gallery-six`, `latests-articles-3`,
`newsletter-register`.

### Procedimiento, con ejemplo completo

Origen: `source/pug/components/ecommerce/products-cards-4.pug` +
`source/scss/components/ecommerce/_products-card-4.scss`. 45 líneas de Pug que
repiten cuatro veces la misma tarjeta, más 86 de SCSS anidado.

Lo que dice el SCSS y el Pug no: la tarjeta es `flex: 1 0 calc(25% - 20px)` y
pasa a `100%` por debajo de `tablet`. Es decir, **una columna en móvil y cuatro
en escritorio** — y como el origen es desktop first, el valor de móvil es el que
está dentro de la media query.

En el destino, `src/components/products-cards.pug`:

```pug
include ui

-
    const productos = [
        { categoria: 'Crib', nombre: 'Product name', precio: '$99.00' },
        // …
    ];

section(class='py-12 desktop:py-20')
    div(class='wrapper grid gap-5 desktop:grid-cols-4')
        each producto in productos
            article(class='rounded-[20px] border border-line p-4 transition-colors hover:border-brand')
                img(
                    class='mb-2.5 w-full',
                    src='/src/assets/images/products/<archivo>.webp',
                    alt='',
                    width='220',
                    height='198',
                    loading='lazy'
                    )
                p(class='text-xs uppercase tracking-[0.1em] text-ink-soft')= producto.categoria
                h3(class='mt-1.5 text-xl text-ink')= producto.nombre
                p(class='mt-1.5 text-base text-ink-soft')= producto.precio
```

Qué pasó ahí, y es lo que hay que repetir:

- Las cuatro copias son un `each`. El contenido de relleno se mantiene como
  relleno; no se inventa otro.
- `.container` → `wrapper`. `.wcol.allcenter.card` → la rejilla de Tailwind. La
  rejilla del origen no se migra.
- `flex: 1 0 25%` corregido a `100%` en móvil → una columna que pasa a
  `desktop:grid-cols-4`. **Se invirtió**, no se copió.
- `$qode-header-light-border-color` → `border-line`; `$qode-main-color` →
  `hover:border-brand`. Ningún hex en el marcado.
- `h5.product-name` pasa a `h3`: el nivel lo decide la estructura, el tamaño lo
  pone la clase.
- `rounded-[20px]` es un valor arbitrario deliberado y de un solo uso. Si aparece
  en un tercer componente, `verify:render` avisará y entonces será
  `--radius-card`.
- Imagen local y `.webp`.

### Avisos por componente

- **`gallery-six` tiene 12 bloques repetidos**, no 6 pese al nombre. Va con
  `each`.
- **`customers-reviews`** son 3 reseñas repetidas. Igual.
- **`newsletter-register`** es un formulario sin destino. Se migra como
  presentación, **no se le inventa un `action`**, y se anota como pendiente. Los
  campos pueden usar el mixin `field` de `ui.pug`.
- **`breadcrumb`** ahora sí tiene sentido: el destino es un sitio.

**Cierre de cada componente:** incluido en su página, `pnpm build` en verde,
tarea 0 limpia, comparado con el original servido en móvil y escritorio.

---

## Tarea 8 · Comercio

**Depende de:** 1, 2 y 7 (el procedimiento está ahí).

`products-cards-4`, `categories`, `2-collections`, `content-product`,
`shop-list`, y **`box-description`, cuyo marcado está suelto dentro de
`pages/cart-index.pug`** en vez de en un componente: hay que extraerlo a
`src/components/box-description.pug`.

Ninguno tiene lógica: son maquetado. No inventar carrito funcional, precios
reales ni integración de tienda.

**Cierre:** migrados e incluidos en `cart.pug` y `cart-index.pug`, validaciones
en verde.

---

## Tarea 9 · Página catálogo de componentes

**Depende de:** 6, 7 y 8.

El origen tiene `pages/heros.pug`, que no es una página del sitio sino un
escaparate para verlos juntos. En el destino se convierte en
`src/pages/components.pug`: **todos** los componentes y heros, cada uno con su
nombre visible.

Es lo que da un sitio donde comprobar `square` y los demás que no tienen página
propia, y sirve para detectar regresiones de un vistazo.

**Cierre:** todo componente migrado aparece en el catálogo o en una página real.
Ninguno queda sin sitio donde verse.

---

## Tarea 10 · Cierre

**Depende de:** todas.

1. Ejecutar la [checklist de validación](./checklist-validacion.md) entera y
   dejarla marcada.
2. Documento en la raíz del repositorio con:
   - qué se migró, componente por componente;
   - las decisiones de las tareas 2, 4 y 6, con su motivo;
   - los pendientes: assets reales, contenido definitivo, enlaces (`href="#"` en
     todo el origen), destino del formulario del newsletter;
   - salida de `pnpm lint`, `pnpm validate`, `pnpm build` y `pnpm verify:render`;
   - lo que no se pudo migrar y por qué.
