# Traspaso a Ania — cierre de la maquetación

> **De:** Clia (CTO) · **Para:** Ania y quien integre · **Fecha:** 2026-09-08 · **Actualizado:** 2026-09-11
> Este documento no sustituye a las TASKs: las **ordena** y da el contexto que ninguna de ellas repite. Lo que hay que hacer está en cada TASK; esto dice en qué orden, por qué, y qué no hacer.

---

## 1 · Dónde está el proyecto

**La maquetación está terminada.** 22 páginas, la verificación en verde y las once TASKs cerradas y en `main`.

| Frente | Estado |
| --- | --- |
| Maquetación de páginas y componentes | 🟩 Completa |
| Comportamientos (JavaScript) | 🟩 20 de 20 dentro de alcance |
| Navegación | 🟩 Mapa único en `config.pug`, 19 destinos, subrayado animado |
| Jerarquía semántica | 🟩 0 saltos de titular en las 22 páginas |
| Contenido | ⏸️ Todo es relleno del origen. Nada definitivo |
| Assets | ⏸️ 36 marcadores de la demo del origen, **sin licencia** |
| Backend | ⏸️ Nada. Los formularios llevan `action=''` a propósito |

**Lo único de front-end que queda, y no tiene TASK:** el módulo del panel lateral del carrito —el marcado y sus cuatro hooks existen desde TASK-004— y los desplegables de escritorio. Todo lo demás depende de material externo.

## 2 · Qué es «origen»

**El sitio vivo: <https://playgrow.qodeinteractive.com/>.** El clon local `template-html-blackn-main` ya no existe en el disco y nunca tuvo el carrito, el checkout, la cuenta ni la lista de deseos.

Se navega y se inspecciona; **no se le envían formularios ni se le crean cuentas**. Su demo ya devuelve 403 al añadir a la cesta, así que hay cosas que no se pueden observar: cuando pase, se dice, no se rellena.

Su marcado lleva clases `qodef-*` y `woocommerce-*` de plugins de WordPress. **Esas clases no se copian.** Lo que se copia son los valores y la estructura visible.

---

## 3 · Lo que se hizo, y en qué orden

Se ejecutó en este orden y por este motivo: **la navegación fue primero porque todo lo demás enlaza.** Si el listado de tienda se hubiera hecho antes, sus tarjetas habrían nacido con `href='#'`.

| | TASK | Qué dejó |
| --- | --- | --- |
| 1.º | TASK-005 🔴 | Mapa único en `config.pug`, 33 enlaces → 7 declarados, subrayado animado |
| 2.º | TASK-006 🔴 | 12 productos, barra lateral, insignias `Sale`/`New`/`HOT`, borde punteado |
| 3.º | TASK-003 | Carrusel de categorías con `scroll-snap`, sin dependencias |
| 4.º | TASK-002 | Buscador a pantalla completa; sociales fuera de la cabecera |
| — | TASK-007 · 008 · 009 · 010 · 011 | Posición de insignias, jerarquía de titulares, fila de iconos, `crossorigin` del preload y el zoom fantasma |

Las decisiones que sostienen esto están en `docs/comms/DECISION-00{1,2,3,4}`.

## 4 · Lo que está declarado y NO se crea

Esto ya se decidió. Si lo creas, se revierte en review:

- **Variantes de 3/4/5/6 columnas** — son un parámetro del componente, no cuatro páginas.
- **Páginas por formato de entrada** (gallery, audio, video, quote, link) — sólo existe `blog-single.html`. Los formatos viven en `blog-card.pug`.
- **`hero-slider`** — descartado. Por eso hay ocho variantes de hero estáticas.
- **La insignia `HOT` NO se busca en el origen**: no está. Es una **adición del proyecto**, diseñada en [TASK-006](comms/TASK-006-listado-de-tienda.md) a petición de Miguel. Las otras dos, `Sale` y `New`, sí son del origen.
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

Dexia revisa mirando esto. El CTO audita ejecutando y probando en el navegador.

```bash
pnpm optimize && pnpm lint && pnpm validate && pnpm build && pnpm verify:render && pnpm validate:origen
pnpm preview
```

**Puertos fijos**, declarados en `vite.config.js` con `strictPort`: `pnpm dev` en
<http://localhost:5273> y `pnpm preview` en <http://localhost:5274>. Si el puerto
está ocupado el arranque falla a propósito — se libera el puerto, no se cambia el
número. Así un enlace pegado en un hilo sigue valiendo mañana.

- **La salida real pegada en el hilo**, no un «pasó todo».
- **0 FALLOS** en `verify:render`. Los avisos no bloquean, pero un valor arbitrario repetido **es un token que falta** y hay que resolverlo.
- **`validate:origen` sin regresiones** y con la frase «nada declarado como hecho está roto».
- **Servido a 375px y en escritorio**, y **navegando con el teclado**. Las dos correcciones 🔴 de TASK-004 fueron de teclado; se miran.
- **Rama `feat/TASK-XXX-slug`, REVIEW de Dexia antes del merge.** La primera vez se commiteó directo a `main` y quedó anotado.

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

## 9 · Nomenclatura y contrato con el tema

**La autoridad es [`contrato-con-el-tema.md`](contrato-con-el-tema.md).** Léelo antes de tocar una clase; aquí sólo queda el resumen y el porqué histórico.

**Aquí no hay BEM, y es deliberado.** El core del que salió esto, `lp-core`, usaba Sass por capas + BEM. Al reconstruir sobre Tailwind se retiró —tabla del [`README.md`](../README.md) y entrada del [`CHANGELOG.md`](../CHANGELOG.md)—, y con él la regla `class-naming` de Markuplint, que rechazaba cada `flex` y cada `mt-4`. BEM sigue documentado como el estándar de **la otra familia de proyectos**, no como trabajo pendiente de éste.

**Lo que cambia todo, y hay que saberlo antes de escribir una clase:** esta maquetación tiene un consumidor aguas abajo, el tema `wp-blackgrow-theme`, que **copia el HTML compilado clase por clase** y **no escribe CSS ni JavaScript propios**. Por eso el marcado no es sólo marcado: partes de él son **contrato**.

Las tres que más cuesta recordar:

1. **Los `js-*` y los `data-*` se portan textualmente.** Renombrar uno deja un bloque que se ve perfecto y no hace nada.
2. **`.snap-start` parece una utilidad de Tailwind y la lee `carousel.js`.** Quitarla no rompe nada visible: el carrusel sigue andando y avanza mal.
3. **Nunca cuelgues apariencia de un hook `js-*`.** Si además pinta, deja de poder renombrarse o retirarse.

El documento del contrato lleva la lista exacta de los 9 hooks que viajan a bloques editoriales, los 5 de formulario, y los dos valores que el tema **no** copia literales.

## 10 · Cómo arrancar

```text
1. git pull && git checkout main      → rama única; las de trabajo se borraron el 2026-09-10
2. Leo, en este orden:
   - AGENTS.md
   - docs/briefing-maquetacion.md (este documento)
   - mi ficha en docs/agentes/ y mis límites
   - docs/comms/README.md (protocolo) y docs/comms/tablero.md
   - src/styles/styles.css entero, y docs/tarjeta-de-decision.md a mano mientras escribo
3. pnpm install && pnpm build         → compruebo que la base está verde ANTES de tocar nada
4. pnpm dev en http://localhost:5273  → y miro las páginas servidas
5. Tomo mi TASK en su hilo (estado EN_PROGRESO), rama feat/TASK-XXX-slug
6. Al terminar: verificación completa, salida pegada en el hilo, EN_REVISION, aviso a Dexia
```

**Si algo de una TASK no se entiende o contradice lo que ves en el código, pregunta en el hilo antes de implementar.** Una duda escrita cuesta un mensaje; una suposición cuesta una iteración de review.
