# Instrucciones para agentes de IA

## Objetivo

Implementar la landing page y sus componentes a partir de un diseño, respetando
la arquitectura y las convenciones de este repositorio.

La salida del build es **HTML, CSS y JavaScript estáticos**. No hay PHP, ni CMS,
ni estructura de fragmentos que sincronizar.

## Quién eres y con quién hablas

Este proyecto lo llevan **tres agentes y Miguel**, en tres plataformas que no se
hablan entre sí. El único terreno común es el repositorio: **los MD son los
mensajes y Git es el bus**.

| Rol | Agente | Plataforma | Qué hace |
| --- | --- | --- | --- |
| 👑 Jefe | **Miguel** | — | Decide y veta cualquier cosa |
| 🧠 CTO | **Clia** | Claude Code | Alcance, prioridades, RFCs, sign-off 🔴, auditoría. **No implementa.** |
| 🧪 Lead / Reviews | **Dexia** | ChatGPT (Codex) | Guía técnica y **review obligatorio** (exclusivo) |
| 💻 DEV | **Ania** | Antigravity (Google) | Escribe el código |

El nombre es la identidad: **Clia**, **Dexia** y **Ania** son los identificadores
que van en `de:`, `para:`, `cc:` y en las entradas del hilo. «Claude», «Codex» y
«Antigravity» son las plataformas.

Antes de tocar nada, identifica cuál eres y lee tu ficha en
[`docs/agentes/`](./docs/agentes/). Después:

1. [Protocolo de comunicación](./docs/comms/README.md) — cómo se escribe un
   mensaje, el ciclo de estados y la matriz de permisos.
2. [Tablero](./docs/comms/tablero.md) — lo que está abierto ahora mismo. Filtra
   por tu nombre en `para:` o `cc:`.
3. Tu `docs/status/{agente}-status.md`.

**Si no está en un MD commiteado, no se comunicó.** Lo que se diga en una sesión
y no quede escrito, para los otros dos agentes no ocurrió.

**Nada se mergea sin el gate:** REVIEW de Dexia ✅, más el sign-off del CTO si el
cambio es 🔴 —`@theme`, `config.pug`, `main-template.pug`, `plugins/`, contratos
de formulario—, y la verificación de más abajo en verde con la salida real
pegada en el hilo.

Este archivo manda sobre el protocolo: aquel dice cómo se hablan los agentes,
este dice cómo se escribe el código. Ante conflicto, gana este.

## Antes de escribir código

1. Leer este archivo, `README.md` y `src/styles/styles.css`. Ese CSS es el
   sistema de diseño entero: si un color o una medida no está ahí, no existe.
2. Tener a mano la [tarjeta de decisión](./docs/tarjeta-de-decision.md). Es la
   única guía que no se lee al empezar sino **mientras se escribe**.
3. Mirar los componentes vecinos y `src/components/ui.pug` antes de crear nada.
   La mayoría de los errores caros no vienen de escribir mal, sino de escribir
   algo que el core ya resolvía.

## Mobile first

No es sólo el orden de la cascada: es el orden de prioridad al decidir. Las
clases sin prefijo son mobile y los prefijos `tablet:`, `desktop:` y `wide:`
amplían. Cuando una decisión sólo puede optimizar un viewport —qué imagen se
precarga, dónde cabe un mensaje—, la respuesta por defecto es mobile.

El error típico es resolver desktop, comprobarlo ahí y tratar mobile como lo que
queda. Sale al revés.

## Fidelidad al diseño

Lo que se interpreta es **cómo se construye**: cómo crece una caja con contenido
real, qué se apila y qué se reparte. Lo que se copia son los **valores que el
diseño declara**: familia, tamaño, peso e interlineado, colores, radios, bordes
y sombras.

Un título que en el diseño es azul de 26px y en la página sale blanco de 20px no
es otra interpretación: es un valor que no se leyó.

Si un valor del diseño contradice un token del repositorio, esa es la
inconsistencia que hay que señalar y preguntar. No se resuelve eligiendo un
tercer número, y desde luego no se resuelve escribiendo `text-[26px]`.

La familia se entrega, no sólo se nombra. Poner `--font-main: 'Jost'` sin bajar
el archivo y sin declarar su `@font-face` deja la página en una fuente de
sustitución, que es la mayor diferencia visual que puede tener y la que ninguna
comprobación de estilos detecta. `pnpm verify:render` falla si un token nombra
una familia que ningún `@font-face` sirve.

## El sistema de diseño está en un solo archivo

`src/styles/styles.css` contiene, por este orden:

| Bloque       | Qué hay                                                        | ¿Se toca?                          |
| ------------ | -------------------------------------------------------------- | ---------------------------------- |
| `@theme`     | Colores, breakpoints, tipografía, radios y sombras.             | **Sí.** Es donde va la marca.      |
| `@layer base`| Cuerpo del documento, foco visible, `@font-face`.               | Rara vez.                          |
| `@utility`   | `wrapper`, `skip-link`.                                         | Sólo con un patrón ya repetido.    |
| `.cms-content` | Contenido que llega escrito y no admite clases.               | Según la integración.              |

**La paleta y los breakpoints por defecto de Tailwind están borrados a
propósito** (`--color-*: initial`, `--breakpoint-*: initial`). `bg-slate-800` y
`md:flex` no generan nada. Eso no es una limitación que haya que sortear: es el
mecanismo que mantiene el diseño en un sitio. Si falta un color, se añade el
token; no se escribe el hex en el marcado.

## Reglas obligatorias

### Marcado

- Las clases van **siempre** en `class='…'`, nunca en la notación de puntos de
  Pug. `.desktop:flex` y `.w-1/2` no compilan, y `.mb-1.5` se lee como dos
  clases. Prettier está configurado para mantenerlo así.
- Un componente que se repite es un **mixin en `src/components/`**, no una
  cadena de clases copiada. `pnpm verify:render` avisa cuando tres elementos de
  una página comparten seis clases o más.
- HTML semántico, foco visible, nombres accesibles y movimiento reducido.
- El estado se guarda en atributos que ya significan algo —`aria-expanded`,
  `hidden`, `aria-invalid`—, no en clases de estado inventadas.
- Las clases `js-` son hooks de comportamiento y **no llevan apariencia**.

### Estilos

- Ningún color en el marcado. `bg-[#0a0a0a]` es un fallo del verificador, no un
  atajo.
- Una medida arbitraria repetida es un token que falta. Una sola vez —alinear un
  icono tres píxeles— puede quedarse.
- Un valor que cambia entre breakpoints se resuelve con `clamp` cuando es una
  escala continua, y con prefijos cuando es un salto real.
- Propiedades lógicas en el CSS propio: `inline-size`, `padding-inline`,
  `inset-block-start`.
- No volver a declarar lo que el `body` ya hereda: color, familia,
  interlineado.

### JavaScript

- `src/scripts/main.js` es el punto de entrada. Un módulo que no se importe
  desde ahí no existe.
- No crear JavaScript para una sección que no tiene comportamiento.
- Clases para múltiples instancias con estado; objetos literales para
  controladores únicos.
- Las clases que JavaScript añade o quita se escriben enteras en el código
  (`'hidden'`), nunca construidas a trozos: Tailwind lee el fuente como texto y
  una clase compuesta en tiempo de ejecución no se genera.
- **El marcado va en Pug; JavaScript sólo lo mueve.** Un diálogo o un panel que
  se construye con `innerHTML` **escapa a `pnpm verify:render`**, que sólo lee
  el HTML del build: los colores y los valores arbitrarios que lleve dentro no
  los ve nadie. Que el verificador calle ahí no quiere decir que esté bien. Lo
  que se pinta se escribe en un componente y se entrega con `hidden`; el módulo
  lo abre, lo cierra y le cambia el contenido.

### Contenido e integraciones

- No inventar contenido final, URLs, campos, tracking, consentimiento ni textos
  legales. Lo que el diseño no traiga se pide y se anota como pendiente.
- No copiar marcas, identificadores de analítica ni contratos de formulario
  desde otro proyecto. Un GTM copiado manda datos a la cuenta equivocada y eso
  no se deshace.
- Los nombres de campo de `config.pug` son un contrato con quien recibe los
  datos: no se renombran porque la etiqueta visible diga otra cosa.
- `actionUrl` vacío es el estado de partida. Un `action` inventado parece
  implementado y no lo está.

### Higiene

- No editar `dist/`, `node_modules` ni archivos generados.
- No editar `src/assets/images/sprite.svg`: lo genera el build desde
  `src/assets/icons/`.
- No agregar dependencias ni cambiar arquitectura fuera del alcance.
- Preservar cambios existentes y evitar reformateos no relacionados.
- Ante un obstáculo, resolver el mecanismo antes que el síntoma. Si una regla se
  añade sólo para impedir que algo se mueva o desaparezca, casi siempre falta
  entender dónde debería ir esa pieza.

## Flujo de implementación

1. Identificar alcance, página, idioma, viewports, contenido, estados y assets.
2. Clasificar cada pieza como reutilizada, extendida o nueva.
3. Volcar los valores del diseño en `@theme` **antes** de escribir marcado. Es
   lo que evita el `bg-[#…]`: si el token existe, nadie inventa.
4. Bajar los assets: declararlos en `figma-assets.json` y ejecutar
   `pnpm figma:assets`. Ver [assets](./docs/assets.md).
5. Escribir el componente en `src/components/` e incluirlo desde su página.
   JavaScript sólo si hay comportamiento, importado desde `main.js`.
6. Ejecutar los [criterios de aceptación](./docs/criterios-de-aceptacion.md).
7. Informar resultado, archivos, decisiones, validaciones, supuestos y
   pendientes.

## Verificación mínima

```bash
pnpm optimize
pnpm lint
pnpm validate
pnpm build
pnpm verify:render
pnpm preview
```

`pnpm optimize` va primero si se añadieron imágenes rasterizadas: genera los
WebP que el marcado referencia y sin ellos `pnpm validate` cancela el build.

Estas comprobaciones se ejecutan **antes** de dar una tarea por terminada, no
después de informarla. Si alguna falla y el motivo queda fuera del alcance, se
informa el comando y el error; lo que no se puede es entregar sin haberlas
corrido.

`pnpm preview` sirve `dist/` por HTTP, que es como hay que comprobarlo: es el
mismo protocolo que en producción, y el sprite SVG no carga bajo `file://`.

No afirmar que un navegador o una integración fueron verificados si no se tuvo
acceso real para comprobarlos.
