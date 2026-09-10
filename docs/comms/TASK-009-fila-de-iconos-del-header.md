---
tipo: TASK
id: TASK-009
titulo: Falta la segunda fila del header de la home — iconos ilustrados y logo centrado
de: clia
para: ania
cc: [dexia]
prioridad: P1
estado: ABIERTA
rama: feat/TASK-009-fila-de-iconos-del-header
area: components
criticidad: "🟡"
relacionado: [TASK-005]
creado: 2026-09-10
actualizado: 2026-09-10
---

# TASK-009 — Fila de iconos del header

## Contexto

Miguel señala, con una captura del origen, que falta un componente del header. Tiene razón.

**El header de la home del origen tiene dos filas. Nosotros sólo migramos la primera.**

| | Contenido | Estado |
| --- | --- | --- |
| Fila 1 | Newsletter · nav · buscador · redes | ✅ Migrada |
| Fila 2 | **New In · About Us · LOGO · Wishlist · Cart $0.00** | ❌ **No existe** |

La fila 2 es una banda de cinco piezas con **iconos ilustrados** y el **logotipo centrado** entre ellas. Es lo primero que se ve al entrar en la home del origen, debajo de la barra de navegación.

### Por qué se perdió — y por qué importa el motivo

Esto es un error mío, del primer inventario, y conviene que quede escrito porque **el método que falló puede haber tapado más cosas**.

El clon local traía un `source/pug/pages/bk.pug`. Lo clasifiqué como *«copia de trabajo reconstruida del demo, no una página del sitio»* y recomendé no migrarlo. Sus líneas 39-62 **son exactamente esta fila**: `New In`, `About Us`, el logo, `Wishlist`, `Cart $0.00`.

Hubo además una segunda señal que leí al revés. En la auditoría de imágenes reporté que cuatro assets *«sólo aparecen en `bk.pug`, que correctamente no se migró»* — `rainbow.png`, `star.png`, `hearth.png` y `logo-img-1.png`. Son los cuatro de este componente. Que un supuesto borrador fuera el **único** sitio con cuatro imágenes propias era motivo para abrirlo, no para confirmar que sobraba.

Me guié por el nombre del archivo (`bk` = backup) en vez de por su contenido. Es justo el error contra el que avisa la guía de migración: *guiarse por el contenido de cada página, no por su nombre*.

**Consecuencia colateral:** el proyecto usa el nombre de marca **como texto** en las tres barras del header porque el único sitio del clon donde estaba el logotipo era `bk.pug`.

## Pedido

Maquetar la fila como componente e incluirla en el header, sólo en escritorio.

### Las cinco piezas, medidas en el origen a 1280px

| Orden | Etiqueta | Asset | Dimensiones | Enlace |
| --- | --- | --- | --- | --- |
| 1 | New In | `rainbow.png` | 98 × 70 | `/shop/` → `cart.html` |
| 2 | About Us | `star.png` | 73 × 70 | `/about-us/` → `page.html` |
| 3 | *(logotipo)* | `logo-img-1.png` | 461 × 140, se sirve a 231 × 70 | `/` → `index.html` |
| 4 | Wishlist | `hearth.png` | 56 × 70 | `/wishlist/` → `wishlist.html` |
| 5 | Cart $0.00 | `cart-empty-large.png` | 77 × 70 | `/cart/` → `cart-page.html` |

`hearth.png` está mal escrito **en el origen**. Es el nombre del archivo: se respeta al descargarlo, y el nombre local puede normalizarse (`heart.png`) siempre que quede anotado.

### Valores del origen

- Alto de la fila: **98px**. Todos los iconos miden **70px de alto**; el ancho varía.
- Etiqueta: **14px**, peso 400, `letter-spacing: 1.4px`, mayúsculas.
- Posiciones a 1280px: `107 · 329 · [logo 529-760] · 885 · 1079`. El reparto no es una rejilla exacta: dos piezas a la izquierda, el logo al centro, dos a la derecha.
- El contador del carrito (`0`) va sobre la esquina superior derecha de la cesta.

**El reparto lo eliges tú.** Rejilla de cinco columnas o flex con el logo centrado: las dos se sostienen. Explica en el hilo cuál y por qué.

### Responsive

**En el origen esta fila no existe en móvil** — medido a 375px, su alto es 0. La cabecera móvil del origen usa el logotipo, no las cinco piezas. Replicarlo: la fila es de escritorio, y el header móvil actual se queda como está.

### Assets

**Ninguno de los cinco está en el proyecto.** Hay que descargarlos del origen y declararlos en `docs/migracion/assets-pendientes.json` como marcador temporal sin licencia, igual que el resto.

Ojo: `src/assets/icons/icon-star.svg` **no sirve** aquí. Es el icono del sprite para las valoraciones; el del origen es una estrella ilustrada con cara, en PNG.

### El logotipo

Al traer `logo-img-1.png` aparece la pregunta de si las tres barras del header deben pasar de texto a logotipo. **No la resuelvas en esta TASK.** Aquí sólo entra el logo de la fila 2. Si quieres proponer el cambio del resto, abre un RFC.

## Fuera de alcance

- Tocar la fila 1 del header.
- Sustituir el nombre de marca por el logotipo en las otras tres barras.
- Comportamiento nuevo: el contador del carrito ya lo alimenta `config.pug`.
- Revisar el resto de `bk.pug` — va aparte, en la nota de abajo.

## Criterios de aceptación

- [ ] La fila existe como componente propio en `src/components/` y se incluye desde el header
- [ ] Las cinco piezas, con sus enlaces reales del mapa de `config.pug` — no `href="#"`
- [ ] Iconos a 70px de alto, con `width`/`height` reales de cada archivo
- [ ] Oculta en móvil, como en el origen
- [ ] El logotipo es un enlace a la home con nombre accesible
- [ ] Los 5 assets descargados y declarados en `assets-pendientes.json`
- [ ] Registrada en `src/pages/components.pug`
- [ ] Sin colores ni medidas de marca en el marcado
- [ ] Comprobado servido a 375px y en escritorio
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] Pendientes declarados, no resueltos inventando
- [ ] REVIEW de Dexia ✅

## 💬 Hilo

> **[2026-09-10] clia:** Abro la tarea. El hallazgo es de Miguel, que vio la fila en el origen y preguntó si faltaba. Falta.
>
> Dejo dicho lo que no se ve en la captura y cuesta encontrar: **la fila no está en móvil** —medido, alto 0 a 375px—, y **ninguno de los cinco assets está en el repositorio**, porque son justo los cuatro que descarté al no migrar `bk.pug`, más la cesta.
>
> Dos cosas más, para que no se resuelvan por inercia. La estrella del sprite **no vale**: es la de valoraciones, y la del origen es una ilustración con cara. Y `logo-img-1.png` abre la pregunta de si el resto del header deja de ser texto — **esa pregunta no es de esta TASK**; si la quieres plantear, RFC.
>
> **Pendiente que me llevo yo:** revisar el resto de `bk.pug` por si descarté algo más con el mismo criterio equivocado. Si aparece, será otra TASK.
