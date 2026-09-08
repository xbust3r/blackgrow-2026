---
tipo: TASK
id: TASK-002
titulo: Buscador a pantalla completa con botón de cierre
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: ABIERTA
area: components
criticidad: "🟡"
relacionado: [TASK-001, origen-comportamientos.json]
creado: 2026-09-07
actualizado: 2026-09-07
---

# TASK-002 — Buscador a pantalla completa

## Contexto

`search-overlay` estaba dentro del alcance de [TASK-001](TASK-001-fase-comportamientos.md). **Sale de ahí y pasa a esta TASK**, porque Miguel ha cambiado su especificación y ya no es una migración fiel: es una decisión de producto.

### Lo que hace el origen (verificado servido, 1440px)

El icono de lupa **sólo tapa la cabecera**. La navegación se sustituye por un campo de búsqueda con un botón de lupa a la derecha, y donde estaban los iconos sociales aparece «✕ CLOSE». **El resto de la página sigue visible debajo** — en la home, el slider del hero queda justo ahí, pegado al buscador.

Marcado del origen, reducido a lo que importa:

```html
<form action="/" class="qodef-search-cover-form" method="get">
  <div class="qodef-input-holder">
    <input type="text" name="s" placeholder="Search..." autocomplete="off" required>
    <button class="qodef-search-cover-submit" type="submit"><svg>…</svg></button>
  </div>
</form>
```

Valores computados del origen:

| Pieza | Valor |
| --- | --- |
| Campo | Jost 30px, peso 400, color `rgb(181, 174, 174)`, alto 43px, fondo transparente, sin padding |
| Ancho del campo | 848px sobre un contenedor de 1425px — no ocupa todo el ancho |
| Placeholder | `Search...` |
| Cierre | Texto `Close`, 14px, mayúsculas, `letter-spacing: 1.4px`, color negro |
| Nombre del campo | `s` |

Correspondencia con nuestros tokens: `text-ink-faint` es exactamente ese `#b5aeae`; el cierre es `text-sm uppercase tracking-heading text-ink` (1.4px sobre 14px son los `0.1em` de `--tracking-heading`).

⚠️ **Un valor que hay que comprobar, no asumir.** El campo se ve con una línea inferior, pero el `border-bottom` computado sale `0px none` tanto en el campo como en su contenedor: la línea viene de otro sitio. Antes de maquetarla, mírala en el origen y averigua de dónde sale. No inventes un `border-b` y lo des por bueno.

## Pedido

**El buscador ocupa la ventana entera**, no sólo la cabecera. Es una desviación consciente del origen: **no es un error que haya que «corregir» después**. Queda registrada en el catálogo de comportamientos.

### 1 · El disparador no existe todavía

Hoy, en [`src/components/header.pug`](../../src/components/header.pug), «Search» es esto:

```pug
span(class='hidden items-center gap-2 text-sm uppercase tracking-heading desktop:flex')
    +svgIcon('search', 'size-4 text-brand')
    | Search
```

Un `<span>`. No es interactivo, no recibe foco y no se puede pulsar con el teclado. Tiene que pasar a `<button type='button'>` con `aria-expanded='false'` y `aria-controls`, conservando su apariencia.

### 2 · En móvil no hay por dónde abrirlo

Ese `span` es `desktop:flex`: **por debajo de 1000px no existe**. La barra móvil sólo tiene el logo, el carrito y el menú. Un buscador a pantalla completa al que no se puede llegar desde el teléfono no sirve de nada, y este proyecto es mobile first.

**Decide y propón en el hilo antes de implementar**, con una razón: ¿un tercer icono en la barra móvil, o el buscador dentro del menú móvil? Yo no lo cierro por ti — mira cómo queda la barra con tres iconos a 375px y dime qué ves.

### 3 · El overlay

- Ocupa la ventana entera, por encima de la cabecera.
- Fondo opaco de superficie: detrás no se lee nada.
- Se entrega **cerrado con `hidden`**, como el menú móvil.
- Dentro: el campo, el botón de enviar y el botón de cerrar.
- El campo no ocupa todo el ancho —en el origen son 848 de 1425— y va centrado.

### 4 · El comportamiento

**`src/scripts/components/search.js`, hook `js-search-toggle`**, importado desde `main.js`.

**Copia el patrón de [`menu.js`](../../src/scripts/components/menu.js).** Ya resuelve esto entero: `hidden` en el panel, `aria-expanded` en el disparador, `inert` en el resto del `body`, `focus.trap()` de [`trap-focus.js`](../../src/scripts/tools/trap-focus.js) —que además pone `overflow-hidden` en el `html`— y `focus.untrap()` que devuelve el foco a quien abrió. No escribas otra cosa distinta.

Dos cosas que el origen **no** hace y aquí sí:

1. **El foco va al campo al abrir.** `focus.trap()` enfoca el primer elemento focalizable; comprueba que sea el campo y no el botón de cerrar. Si no lo es, ordena el marcado para que lo sea, no parchees el módulo.
2. **`Escape` cierra.**

Copiar el origen fiel en esto sería un error, igual que lo habría sido copiar su menú móvil.

### 5 · El destino del formulario

**No hay buscador detrás.** `action=''` y se declara como pendiente, igual que contacto, comentarios y newsletter. Un `action` inventado parece implementado y no lo está.

El nombre del campo del origen es `s`, que es de WordPress. Consérvalo si quieres, pero **anótalo en el hilo**: cuando exista buscador real, ese nombre lo fija quien lo reciba, no nosotros.

## Criterios de aceptación

- [ ] «Search» es un `<button type='button'>` con `aria-expanded` y `aria-controls`
- [ ] Hay forma de abrirlo en móvil, con la decisión razonada en el hilo
- [ ] El overlay ocupa la ventana entera y detrás no se lee nada
- [ ] Se entrega cerrado con `hidden`; el estado vive en `hidden` y `aria-expanded`, no en clases inventadas
- [ ] `search.js` sigue el patrón de `menu.js`: `inert` en el fondo, `focus.trap`/`untrap`
- [ ] Al abrir, el foco cae en el campo
- [ ] `Escape` cierra y el foco vuelve al botón que abrió
- [ ] `action=''`, declarado como pendiente
- [ ] La línea del campo se maquetó **después** de averiguar de dónde sale en el origen
- [ ] Ni un color ni una medida de marca en el marcado
- [ ] La clase `js-search-toggle` no lleva apariencia
- [ ] Comprobado servido a 375px y en escritorio, con teclado y sin ratón
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` — `search-overlay` pasa a `mejorado`, y «nada declarado como hecho está roto»
- [ ] REVIEW de Dexia ✅

## Fuera de alcance

- Buscar de verdad: filtrar, sugerir o mostrar resultados. Eso necesita backend o un índice, y no existe.
- El resto de TASK-001. Esta TASK se lleva `search-overlay` y nada más.

## 💬 Hilo

> **[2026-09-07 00:00] clia:** creo la TASK sacando `search-overlay` de TASK-001, porque deja de ser una migración fiel: el origen tapa sólo la cabecera y Miguel lo quiere a pantalla completa. Verificado servido a 1440px y valores computados recogidos arriba. 🟡 porque toca `header.pug` —compartido por las 22 páginas— pero no `@theme` ni `config.pug`; si hiciera falta un token nuevo, se declara en el hilo antes de tocarlo.
>
> **[2026-09-07 00:00] clia:** dos huecos que encontré y que no cierro yo: en móvil no hay disparador —el «Search» actual es `desktop:flex`— y la línea inferior del campo no sale del `border-bottom`, así que hay que averiguar de dónde viene antes de maquetarla.
>
> **[2026-09-07 00:00] clia:** ⏸️ **resuelto:** Miguel aclara que el «slider» que mencionó es el **carrusel de categorías** del origen (Swiper: Cribs, Beds, Toys, Other, Specials, Carriage, New, Bottles). Queda **fuera de esta TASK** — se trata aparte, porque choca con una decisión ya tomada del proyecto. Lo que sí confirma es el motivo del overlay a pantalla completa: en el origen ese carrusel queda visible justo debajo del buscador.
>
> **[2026-09-07 00:00] clia:** Miguel señala también «un marcador de top» en el origen. Es `back-to-top`, y **ya está en [TASK-001](TASK-001-fase-comportamientos.md)** con su hook `js-back-to-top`. No se duplica aquí.
