# Traspaso a Antigravity — cierre de la maquetación

> **De:** Claude (CTO) · **Para:** Antigravity · **Fecha:** 2026-09-08
> Este documento no sustituye a las TASKs: las **ordena** y da el contexto que ninguna de ellas repite. Lo que hay que hacer está en cada TASK; esto dice en qué orden, por qué, y qué no hacer.

---

## 1 · Dónde está el proyecto

**22 páginas construidas, la verificación en verde y el sitio todavía no se puede navegar.** Ese es el resumen honesto.

| Frente | Estado |
| --- | --- |
| Maquetación de páginas y componentes | Completa, salvo el listado de tienda ([TASK-006](comms/TASK-006-listado-de-tienda.md)) |
| Comportamientos (JavaScript) | 16 de 18 dentro de alcance. Faltan buscador y carrusel |
| Navegación | **No existe.** 33 `href='#'` y 6 enlaces internos reales |
| Contenido | Todo es relleno del origen. Nada definitivo |
| Assets | Marcadores de la demo del origen, sin licencia |
| Backend | Nada. Los formularios llevan `action=''` a propósito |

**Lo primero, antes de escribir una línea:** `feat/TASK-004-correcciones` tiene el gate cumplido —REVIEW de Codex ✅ y sign-off del CTO ✅— y **sigue sin mergear**. Mergéala a `main` y arranca desde ahí; si no, trabajarás sobre una base vieja.

---

## 2 · Qué es «origen»

**El sitio vivo: <https://playgrow.qodeinteractive.com/>.** El clon local `template-html-blackn-main` ya no existe en el disco y nunca tuvo el carrito, el checkout, la cuenta ni la lista de deseos.

Se navega y se inspecciona; **no se le envían formularios ni se le crean cuentas**. Su demo ya devuelve 403 al añadir a la cesta, así que hay cosas que no se pueden observar: cuando pase, se dice, no se rellena.

Su marcado lleva clases `qodef-*` y `woocommerce-*` de plugins de WordPress. **Esas clases no se copian.** Lo que se copia son los valores y la estructura visible.

---

## 3 · Orden de ejecución

El orden importa: las tres primeras se pisan entre sí si van al revés.

### 1.º — [TASK-005](comms/TASK-005-navegacion-y-enlaces.md) · Navegación 🔴 P0

**Va primero porque las demás enlazan.** Si TASK-006 se hace antes, sus tarjetas quedan con `href='#'` y hay que volver a tocarlas.

Su valor no son los 33 enlaces: es el **mapa único en `config.pug`**. Hoy las etiquetas están escritas en cuatro sitios y ya divergen. Si sales con cuatro listas sincronizadas a mano, la TASK no está hecha aunque todo enlace bien.

Incluye el **subrayado animado** que pidió Miguel, medido en el origen.

> Es 🔴: toca `config.pug` y `main-template.pug`. Necesita REVIEW de Codex **y** sign-off del CTO.

### 2.º — [TASK-006](comms/TASK-006-listado-de-tienda.md) · Listado de tienda 🟡 P1

Doce productos donde hoy hay tres, la barra lateral, el selector de orden, la paginación y las variantes de columnas como parámetro. Consume los enlaces de TASK-005.

### 3.º — [TASK-003](comms/TASK-003-carrusel-de-categorias.md) · Carrusel de categorías 🟡 P1

Sale de [DECISION-002](comms/DECISION-002-carrusel-de-categorias.md), que revierte «no se quieren carruseles» **sólo para esta pieza**. `scroll-snap` nativo, sin dependencia. La rejilla se conserva como variante.

### 4.º — [TASK-002](comms/TASK-002-buscador-pantalla-completa.md) · Buscador a pantalla completa 🟡 P1

Es independiente de las otras tres; va al final porque es la que menos bloquea. Tiene un punto que **decides tú y explicas en el hilo**: cómo se abre en móvil, donde hoy no hay disparador.

---

## 4 · Lo que está declarado y NO se crea

Esto ya se decidió. Si lo creas, se revierte en review:

- **Variantes de 3/4/5/6 columnas** — son un parámetro del componente, no cuatro páginas.
- **Páginas por formato de entrada** (gallery, audio, video, quote, link) — sólo existe `blog-single.html`. Los formatos viven en `blog-card.pug`.
- **`hero-slider`** — descartado. Por eso hay ocho variantes de hero estáticas.
- **`parallax-cursor`** — descartado.
- **Carrito, cuenta, wishlist y checkout funcionando** — el marcado está; el backend es otra fase.

---

## 5 · Las cinco reglas que más se rompen

La ley completa está en [`AGENTS.md`](../AGENTS.md) y se lee entera. Estas cinco son las que han costado iteraciones reales en este proyecto:

1. **La paleta y los breakpoints de Tailwind están borrados a propósito.** `bg-slate-800` y `md:flex` no generan nada. Si falta un color, se añade el token; el hex en el marcado es **FALLO** del verificador.
2. **Mobile first es el orden de decidir, no de escribir.** El valor sin prefijo es el de móvil. Resolver escritorio y tratar móvil como lo que sobra sale al revés.
3. **No inventar contenido.** El relleno del origen se copia **con sus typos** — `PURCASE`, `MATRACES`, `necesetys`, `Teady`, `Cribe`. La fase de maquetación se rehízo entera una vez por copy de marketing verosímil. Lo obvio se reemplaza; lo verosímil se cuela a producción.
4. **El marcado va en Pug; JavaScript sólo lo mueve.** Lo que se construye con `innerHTML` **escapa a `verify:render`**. Ya pasó con el lightbox: cuatro valores arbitrarios invisibles para el verificador.
5. **El estado vive en atributos que ya significan algo** — `hidden`, `aria-expanded`, `inert`, `aria-current` —, no en clases inventadas. Y `-translate-y-full` **no** saca nada del orden de tabulación: eso es `inert`.

---

## 6 · Qué se te va a pedir en el review

Codex revisa mirando esto. El CTO audita ejecutando y probando en el navegador.

```bash
pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm verify:render && pnpm validate:origen
pnpm preview
```

- **La salida real pegada en el hilo**, no un «pasó todo».
- **0 FALLOS** en `verify:render`. Los avisos no bloquean, pero un valor arbitrario repetido **es un token que falta** y hay que resolverlo.
- **`validate:origen` sin regresiones** y con la frase «nada declarado como hecho está roto».
- **Servido a 375px y en escritorio**, y **navegando con el teclado**. Las dos correcciones 🔴 de TASK-004 fueron de teclado; se miran.
- **Rama `feat/TASK-XXX-slug`, REVIEW de Codex antes del merge.** La primera vez se commiteó directo a `main` y quedó anotado.

---

## 7 · Herramientas que ya existen y conviene no reescribir

| Pieza | Para qué |
| --- | --- |
| `src/scripts/tools/trap-focus.js` | Atrapa el foco y pone `overflow-hidden` en `html`. Lo usan `menu.js`, `subscribe-popup.js` y `lightbox.js` |
| `src/scripts/components/menu.js` | **El patrón de referencia** para cualquier panel: `hidden`, `aria-expanded`, `inert` en el fondo, trap y untrap |
| `src/scripts/tools/slide-toggle.js` | Sin usar todavía. Candidato si un panel lo necesita |
| `src/components/ui.pug` | `+button`, `+field` con su cableado de accesibilidad, `+svgIcon` |
| `src/components/media.pug` | `+pendingImage`, `+heading`, `+shopButton`, `+quantityField` |
| `src/components/pagination.pug` | Ya existe. TASK-006 la reutiliza, no la reescribe |

Los iconos salen de `src/assets/icons/`; **`sprite.svg` lo genera el build y no se edita a mano**.

---

## 8 · Lo que sigue sin dueño

No es tuyo hoy, pero conviene que lo sepas porque aparece al mirar cualquier página:

- **Tres formularios con `actionUrl` vacío** — contacto, comentarios y newsletter. Es el estado correcto; se resuelve cuando haya backend.
- **Todos los assets son marcadores sin licencia**, copiados de la demo del origen. Están en [`assets-pendientes.json`](migracion/assets-pendientes.json). No pueden ir a producción.
- **Los desplegables de escritorio** del menú del origen. Son comportamiento y **no tienen TASK todavía**. Con TASK-005 cerrada se navega todo desde el menú móvil y el pie, así que no bloquean.
- **Ningún navegador real verificado.** Sólo el navegador de la herramienta.

---

## 9 · Cómo arrancar

```text
Soy Antigravity, DEV de blackgrow-2026.

1. git pull && git checkout main
2. Mergeo feat/TASK-004-correcciones (gate cumplido: REVIEW-001 ✅ + sign-off CTO ✅)
3. Leo, en este orden:
   - AGENTS.md
   - docs/briefing-maquetacion.md (este documento)
   - docs/agentes/antigravity.md (mi ficha y mis límites)
   - docs/comms/README.md (protocolo) y docs/comms/tablero.md
   - src/styles/styles.css entero, y docs/tarjeta-de-decision.md a mano mientras escribo
4. pnpm install && pnpm build  → compruebo que la base está verde ANTES de tocar nada
5. Tomo TASK-005 en su hilo (estado EN_PROGRESO), rama feat/TASK-005-navegacion
6. Al terminar: verificación completa, salida pegada en el hilo, EN_REVISION, aviso a Codex
```

**Si algo de una TASK no se entiende o contradice lo que ves en el código, pregunta en el hilo antes de implementar.** Una duda escrita cuesta un mensaje; una suposición cuesta una iteración de review.
