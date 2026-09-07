# Checklist de validación

Esto no lo rellena quien migra: lo comprueba **otra persona o agente** al
recibir el trabajo. Quien migra puede usarla como guía de lo que se le va a
exigir, pero la validación es independiente a propósito — un autor no ve sus
propios huecos.

Cada punto dice **cómo** se comprueba. Un punto sin comprobar no se marca, y uno
que falle se anota con lo observado, no con «pendiente».

Marcar: `[x]` cumple · `[!]` falla · `[–]` no aplica, con motivo.

---

## A · Automático

Se ejecuta entero desde `~/servers/blackgrow 2026` y se pega la salida en el
informe. No basta con decir que pasó.

```bash
pnpm lint
pnpm validate
pnpm build          # ejecuta verify:render al terminar
```

- [ ] **A1.** `pnpm lint` sin errores — Markuplint, Stylelint y ESLint.
- [ ] **A2.** `pnpm validate` dice `Todos los assets existen`.
- [ ] **A3.** `pnpm build` termina sin error.
- [ ] **A4.** `verify:render` sin **FALLO**. Un color en el marcado
      (`bg-[#db915e]`) es fallo, no aviso.
- [ ] **A5.** Los **AVISO** de `verify:render` están resueltos o explicados uno
      por uno en el informe. Un aviso ignorado en silencio es un pendiente
      escondido.
- [ ] **A6.** El aviso `ningún token de @theme nombra una familia` **ya no
      aparece** — significa que la tipografía se entregó (tarea 3).

## B · Rastro de Qode

```bash
grep -rn "qodeinteractive\|playgrow\|Playgrow\|Qode" src/
```

- [ ] **B1.** El comando no devuelve nada.
- [ ] **B2.** Ninguna imagen del sitio construido apunta a un dominio externo:
      ```bash
      grep -rhoE 'src="https?://[^"]+"' dist/*.html | sort -u
      ```
      Lo que salga tiene que estar justificado en el informe.
- [ ] **B3.** El pie no dice `Designed by Qode Interactive` ni `Playgrow`.
- [ ] **B4.** Cada imagen sustituida por un marcador está listada como pendiente
      de asset real.

## C · Arquitectura

- [ ] **C1.** Existe `src/layouts/main-template.pug` y contiene el `doctype`.
- [ ] **C2.** **Ninguna** página repite el `doctype` ni incluye `header`/`footer`
      por su cuenta:
      ```bash
      grep -l "doctype" src/pages/*.pug        # debe salir vacío
      grep -ln "components/header" src/pages/*.pug   # debe salir vacío
      ```
- [ ] **C3.** Toda página empieza por `extends ../layouts/main-template`.
- [ ] **C4.** Cada página define su propio `block title` y su descripción. Dos
      páginas con el mismo `<title>` es un fallo.
- [ ] **C5.** El `head` está partido: lo común en `head-base.pug`, lo variable en
      bloques.
- [ ] **C6.** Las páginas del sitio existen y construyen: `index`, `page`,
      `cart`, `cart-index`, `components`, más `thanks` y `error`.
- [ ] **C7.** `bk.pug` **no** se migró.

## D · Tokens y estilos

- [ ] **D1.** Los colores del origen están en `@theme` según el mapa del
      inventario. Ningún `#hex` de marca fuera de ese bloque:
      ```bash
      grep -rniE --include='*.pug' "#(db915e|b1cece|b1ceca|8b8686|eae3de|f7f3f0|6e6e6e)" src/ --include=*.pug
      ```
      Debe salir vacío.
- [ ] **D2.** La decisión sobre los dos grises (`#8b8686` y `#6e6e6e`) está
      tomada y explicada.
- [ ] **D3.** El naranja repetido en cinco variables está señalado en el informe
      como probable descuido del origen, y **no** se inventó un tono de hover.
- [ ] **D4.** No se recreó la rejilla del origen. Estas clases no existen en el
      destino:
      ```bash
      grep -rnE "class='[^']*\b(wcol|allcenter|container-full|col-[0-9]{1,2})\b" src/
      ```
      Debe salir vacío.
- [ ] **D5.** No hay breakpoints inventados: sólo `mobile:`, `tablet:`,
      `desktop:`, `wide:`.
      ```bash
      grep -rnE "class='[^']*\b(sm|md|lg|xl|2xl):" src/   # debe salir vacío
      ```
- [ ] **D6.** El CSS propio sigue siendo corto. Si `src/styles/styles.css` pasó
      de ~400 líneas, hay que justificar qué no se pudo hacer con utilidades.

## E · Componentes

Uno por componente. Se marca sólo si está **incluido en una página o en el
catálogo** y se ha mirado servido.

**Heros** — los ocho, ninguno se descarta:

- [ ] `cloud-title` · [ ] `internal` · [ ] `photo_hero_2_button` · [ ] `photo_hero`
- [ ] `photo_hero_2` · [ ] `square` · [ ] `default` · [ ] `photo-hero-featured`

**Contenido:**

- [ ] `title-with-text` · [ ] `text-with-image` · [ ] `title-with-steps`
- [ ] `breadcrumb` · [ ] `customers-reviews` · [ ] `gallery-six`
- [ ] `latests-articles-3` · [ ] `newsletter-register`

**Comercio:**

- [ ] `products-cards-4` · [ ] `categories` · [ ] `2-collections`
- [ ] `content-product` · [ ] `shop-list` · [ ] `box-description` (extraído de
      `cart-index.pug`, no dejado suelto en la página)

**Estructura:**

- [ ] `header` · [ ] menú móvil · [ ] `footer`

Y sobre el conjunto:

- [ ] **E1.** El marcado repetido se resolvió con `each`. En concreto:
      `gallery-six` (12 bloques), `customers-reviews` (3),
      `latests-articles-3` (3), `products-cards-4` (4). Si alguno sigue copiado a
      mano, es un fallo.
- [ ] **E2.** Los cuatro heros de foto a sangre se revisaron para ver si eran un
      mixin con parámetros. La decisión, sea cual sea, está explicada.
- [ ] **E3.** Todo componente migrado se puede ver en algún sitio. Ninguno queda
      huérfano.

## F · Accesibilidad

Lo que los comandos no prueban. Se comprueba en el navegador, con el teclado.

- [ ] **F1.** El menú móvil se abre y cierra con teclado, tiene `aria-expanded`
      correcto, cierra con `Escape` y devuelve el foco al botón que lo abrió.
- [ ] **F2.** El menú móvil **no** usa el truco de `input[type=checkbox]`.
- [ ] **F3.** Los iconos sociales tienen nombre accesible. No queda ni un `fb`,
      `ins`, `zxc` ni `asd` como texto:
      ```bash
      grep -rnE ">[[:space:]]*(fb|ins|zxc|asd)[[:space:]]*<" dist/*.html   # debe salir vacío
      ```
- [ ] **F4.** Se recorre una página entera con `Tab` sin trampas y con el anillo
      de foco siempre visible.
- [ ] **F5.** Los niveles de titular siguen la estructura, no el tamaño. Ninguna
      página salta de `h1` a `h3`, y no hay dos `h1`.
- [ ] **F6.** El `skip-link` funciona: primer `Tab` en la página, aparece, y
      lleva a `#main`.

## G · Responsive y fidelidad

- [ ] **G1.** Comprobado **redimensionando el viewport de verdad** en 360, 700,
      1000 y 1200. Estrechar un elemento no reevalúa las media queries.
- [ ] **G2.** Sin desbordamiento horizontal en 360px, en todas las páginas:
      ```js
      document.documentElement.scrollWidth > document.documentElement.clientWidth
      ```
      Debe ser `false`.
- [ ] **G3.** Se invirtió el responsive: la clase **sin prefijo** describe móvil.
      Señal de que no se hizo: una página que se ve bien en el monitor y mal en
      el teléfono, o clases `desktop:` que ponen el valor que debería ser la
      base.
- [ ] **G4.** Comparado con el original **servido**, no con capturas ni con el
      código, en móvil y escritorio.
- [ ] **G5.** Jost se está pintando de verdad. Comprobar en el inspector la
      fuente calculada del `body`, no que el token exista.

## H · Contenido y pendientes

- [ ] **H1.** El contenido de relleno del origen se mantuvo como relleno. **No**
      se inventaron textos, nombres de producto ni precios nuevos.
- [ ] **H2.** El formulario del newsletter no tiene `action` inventado y está
      anotado como pendiente.
- [ ] **H3.** Los `href="#"` del origen siguen siendo `#` y están anotados como
      pendientes, no rellenados a ojo.
- [ ] **H4.** Ningún identificador de analítica copiado de otro proyecto:
      ```bash
      grep -rn "GTM-\|osano" src/
      ```
      Lo que salga tiene que ser del proyecto, no heredado.

## I · Entrega

- [ ] **I1.** Hay un documento de informe en la raíz del repositorio.
- [ ] **I2.** Lista, componente por componente, qué se migró.
- [ ] **I3.** Las decisiones de las tareas 2, 4 y 6 están explicadas con su
      motivo.
- [ ] **I4.** Los pendientes están declarados, no resueltos inventando.
- [ ] **I5.** Está la salida real de los cuatro comandos, no un resumen.
- [ ] **I6.** Lo que no se pudo migrar está dicho, con dónde está para retomarlo.
- [ ] **I7.** El origen está intacto. El origen es el sitio vivo
      <https://playgrow.qodeinteractive.com/>: se navega y se inspecciona, no se
      le envían formularios ni se le crean cuentas. El clon local
      `template-html-blackn-main` ya no existe.

---

## Lo que pasa la checklist y aun así está mal

Cosas que ningún comando detecta y hay que mirar a propósito:

- **Un componente que compila, valida y no se parece al original.** Es el fallo
  más común y sólo se ve comparando las dos páginas servidas, una al lado de la
  otra.
- **Responsive traducido en vez de invertido.** Pasa todas las validaciones.
- **Una fuente de sustitución.** `verify:render` detecta que falte el
  `@font-face`, no que el archivo esté mal y el navegador caiga a Helvetica.
- **`each` sobre datos inventados.** Resolver la repetición está bien; cambiar el
  contenido de relleno por otro contenido inventado, no.
- **Un token de más.** Añadir `--color-brand-hover` porque «hacía falta» cuando
  el origen usaba el mismo naranja es inventar diseño.
