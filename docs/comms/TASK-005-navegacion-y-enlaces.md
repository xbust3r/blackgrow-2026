---
tipo: TASK
id: TASK-005
titulo: Hacer el sitio navegable — mapa único y enlaces reales
de: claude
para: antigravity
cc: [codex]
prioridad: P0
estado: ABIERTA
area: components
criticidad: "🔴"
relacionado: [TASK-002]
creado: 2026-09-08
actualizado: 2026-09-08
---

# TASK-005 — Hacer el sitio navegable

## Contexto

Hay **22 páginas construidas y no se puede llegar a casi ninguna**. Auditado hoy sobre `src/**/*.pug`:

- **33 enlaces con `href='#'`**, repartidos en 17 archivos.
- **6 enlaces internos reales** en todo el proyecto: tres a `index.html` y tres a `cart-index.html`.
- La navegación de la cabecera son **tres etiquetas inventadas** —`Home`, `About`, `Contact`— y el menú móvil cuatro, con un `Info` que no corresponde a ninguna página.
- El pie tiene cuatro columnas de `item 1`.

Esto era correcto hasta ahora: la migración declaró *«todos son `href="#"`. Se quedan así y se anotan»*, porque los del origen también lo eran y no había páginas a las que apuntar. **Ya las hay**, y Miguel pide que se navegue. Esta TASK resuelve ese pendiente declarado; hay que actualizar esa línea en [`docs/migracion/README.md`](../migracion/README.md) para que los documentos no se contradigan.

Es **🔴** porque toca `config.pug` y `main-template.pug`: pide sign-off del CTO además del REVIEW de Codex.

## El mapa, tomado del origen

El menú del origen —leído del sitio vivo— encaja casi uno a uno con lo que tenemos:

| Grupo | Entrada del origen | Nuestra página |
| --- | --- | --- |
| **Home** | Main Home | `index.html` |
| | Kids Store | `kids-store.html` |
| | Baby Shop | `baby-shop.html` |
| | Shop Grid | `shop-grid.html` |
| | Landing | `landing.html` |
| **Pages** | About Us | `page.html` |
| | FAQ Page | `faq.html` |
| | Contact Us | `contact.html` |
| **Shop** | Shop List | `cart.html` ⚠️ |
| | Shop Single | `cart-index.html` ⚠️ |
| | My Account | `my-account.html` |
| | Wishlist | `wishlist.html` |
| | Cart | `cart-page.html` |
| | Checkout | `checkout.html` |
| **Blog** | Right Sidebar | `blog.html` |
| | Left Sidebar | `blog-left-sidebar.html` |
| | No Sidebar | `blog-no-sidebar.html` |
| | Masonry List | `blog-masonry.html` |
| | Standard Post | `blog-single.html` |

**Lo que del origen no tiene destino** y se declara, no se inventa:

- *Three / Four / Five / Six Columns* — el catálogo ya decidió que son **un parámetro del componente, no cuatro páginas**. No se crean.
- *Gallery / Audio / Video / Quote / Link Post* — sólo existe `blog-single.html`. Los formatos están en `blog-card.pug`, pero no hay una página por formato. **Apuntan todos a `blog-single.html`** y se anota.

**Fuera de la navegación pública:** `components.html` (catálogo interno), `error.html` (404) y `thanks.html` (destino de formulario). Se llega a ellas por otro camino, no por el menú.

## ⚠️ Decisión previa: los dos nombres heredados

`cart.html` **es el listado de tienda** y `cart-index.html` **es la ficha de producto**. Es un lío heredado del clon que [`playgrow-origen.md`](../migracion/playgrow-origen.md) ya advertía, y hasta hoy daba igual porque nadie los enlazaba. En cuanto exista un menú que diga «Shop List → cart.html», el lío pasa a ser visible y permanente.

Renombrarlos a `shop.html` y `shop-single.html` cuesta **casi nada hoy** —hay 6 enlaces internos en todo el proyecto— y cuesta cada vez más a partir de mañana. No hay sitio en producción, así que no se rompe ninguna URL.

**Miguel decide.** Hasta que lo haga, **no renombres nada**: pregunta en el hilo y espera. Si dice que sí, va como primer paso, antes de escribir el mapa; si dice que no, el mapa usa los nombres actuales y se acabó.

## Pedido

### 1 · Un solo mapa, en `config.pug`

Hoy la cabecera declara sus etiquetas dos veces —barra de escritorio y cabecera fija—, el menú móvil una tercera y el pie inventa las suyas. **Cuatro sitios que ya divergen.**

El mapa del sitio se declara **una vez** en [`config.pug`](../../src/components/config.pug), como estructura de grupos y entradas, y de ahí lo leen la cabecera, la cabecera fija, el menú móvil y el pie. Es el mismo criterio por el que los nombres de campo viven ahí: si está en cuatro sitios, dentro de un mes hay cuatro menús distintos.

### 2 · Los 33 `href='#'`

Cada uno recibe su destino real, **o se queda y se declara** con su motivo. Los que sí tienen destino evidente:

| Dónde | A dónde |
| --- | --- |
| `product-card.pug` (4) | La ficha de producto |
| `header.pug` (4) | El mapa: navegación y sociales |
| `pagination.pug` (3) | La misma página del listado |
| `latests-articles-3.pug` (2), `blog-card.pug` | La entrada del blog |
| `blog-sidebar.pug` (2) | El listado y las entradas |
| `shop-list.pug`, `categories.pug`, `2-collections.pug` | El listado de tienda |
| `content-product.pug` (2) | Ficha y listado |
| `footer.pug` (2) | El mapa |

Los que **no** tienen destino y se quedan con su nota: redes sociales sin cuenta, `account-login.pug` («Lost your password?»), `checkout-form.pug` («Click here to enter your code»), `comment-list.pug` (responder), `media.pug` (`+shopButton` y `+textLink` genéricos, cuyo `href` lo pone quien los llama).

**No inventes URLs externas.** Un perfil de Instagram que no existe es peor que un `#`.

### 3 · La página actual se señala

El enlace de la página en la que estás lleva **`aria-current='page'`**. Es lo que convierte una lista de enlaces en una navegación: sin eso, quien usa lector de pantalla no sabe dónde está.

Cada página declara su identidad en su `block vars` —hay 22 y todas tienen ese bloque ya— y el mapa compara. Sin JavaScript.

### 4 · Las migas de pan

[`breadcrumb.pug`](../../src/components/breadcrumb.pug) ya está parametrizado y hoy sólo lo usan cuatro páginas; `cart.pug` además muestra «Cart» siendo la tienda. Cada página que lo incluya declara su tramo correcto, y el «Home» del principio apunta de verdad.

### 5 · El pie

Las cuatro columnas de `item 1` pasan a ser el mapa: los grupos reales con sus enlaces. En un sitio de 22 páginas el pie **es** el mapa del sitio, y además resuelve el acceso a todo sin depender de ningún desplegable.

## Fuera de alcance

- **Los desplegables de escritorio.** El origen abre submenús al pasar el cursor; hacerlo bien es el patrón ARIA de *disclosure* con `aria-expanded`, teclado y `Escape` — o sea, un módulo más. **Sale en su propia TASK**, porque es comportamiento y merece su propio review. Con esta TASK cerrada el sitio ya es navegable entero desde el menú móvil y el pie.
- El buscador: es [TASK-002](TASK-002-buscador-pantalla-completa.md).
- Crear páginas nuevas. Las variantes de columnas y los formatos de entrada **no se crean**: se declaran.

## Criterios de aceptación

- [ ] El mapa del sitio se declara **una sola vez**, en `config.pug`
- [ ] Cabecera, cabecera fija, menú móvil y pie leen de ahí; ninguna etiqueta escrita a mano
- [ ] Se llega a las 19 páginas públicas desde cualquier página, sin desplegables
- [ ] Los 33 `href='#'` resueltos o declarados con su motivo en el hilo
- [ ] Ninguna URL externa inventada
- [ ] `aria-current='page'` en el enlace de la página actual, sin JavaScript
- [ ] Las migas declaran su tramo correcto donde se usen
- [ ] `components.html`, `error.html` y `thanks.html` **no** están en la navegación pública
- [ ] Ni un color ni una medida de marca en el marcado
- [ ] Comprobado servido a 375px y en escritorio, **navegando con el teclado**
- [ ] **Ningún enlace roto**: recorrer los destinos y comprobar que responden
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] Salida real pegada en el hilo
- [ ] REVIEW de Codex ✅ **+ sign-off 🔴 del CTO** (toca `config.pug` y el layout)

## 💬 Hilo

> **[2026-09-08 11:00] claude:** creo la TASK. Auditado hoy: 33 `href='#'` en 17 archivos y sólo 6 enlaces internos reales en las 22 páginas. El mapa está tomado del menú del sitio vivo, no inventado; lo que el origen tiene y nosotros no —variantes de columnas y formatos de entrada— se declara en vez de crearse.
>
> **[2026-09-08 11:00] claude:** ⏸️ **bloqueante antes de empezar:** el renombrado de `cart.html` y `cart-index.html`. Pregunta en el hilo y espera respuesta de Miguel; no renombres por tu cuenta. Todo lo demás de la TASK puede prepararse mientras tanto, pero el mapa se escribe **después** de saberlo, para no escribirlo dos veces.
>
> **[2026-09-08 11:00] claude:** el mayor valor de esta TASK no son los enlaces, es el **mapa único**. Hoy las etiquetas de navegación están escritas en cuatro sitios y ya no coinciden entre sí —el menú móvil tiene un `Info` que no existe en ningún otro—. Si sales de aquí con cuatro listas sincronizadas a mano, la TASK no está hecha aunque todos los enlaces funcionen.
