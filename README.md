# Blackgrow 2026 — landing page core

Base para desarrollar landing pages. Deriva de `lp-core`, con la capa de estilos
reconstruida sobre Tailwind y sin la integración con Scarlet/CMS: el build
produce **HTML, CSS y JavaScript estáticos**.

## Qué cambia respecto de `lp-core`

| Tema             | `lp-core`                                    | Este core                                       |
| ---------------- | -------------------------------------------- | ----------------------------------------------- |
| Estilos          | Sass por capas + BEM, un parcial por bloque   | Tailwind v4 con tokens en un solo archivo CSS   |
| Crear un bloque  | `.pug` + `_bloque.scss` + registro en `styles.scss` | Sólo el `.pug`                             |
| Sistema de diseño| Repartido entre `settings/` y los parciales   | `src/styles/styles.css`, bloque `@theme`        |
| Salida           | HTML + fragmentos PHP + `structure-*.conf`    | HTML, CSS y JS                                  |
| Formularios      | jQuery + jQuery Validation                    | Validación nativa + IMask, sin jQuery           |
| Marca            | Switch multimarca con GTM y Osano             | `config.pug` neutral, una marca                 |

El motivo del cambio es el coste de cableado: crear un bloque costaba tres
archivos, una decisión de capa y un registro que, si se olvidaba, dejaba el
estilo sin aplicar sin que nada protestara. Ahora cuesta un archivo.

Lo que **no** cambia es el pipeline de calidad, que era lo mejor del core
original y sigue entero —con dos comprobaciones nuevas específicas de Tailwind.

## Requisitos

- Node.js: la LTS actual (probado en v26).
- [pnpm](https://pnpm.io/installation), en la versión de `package.json`.
- [Python](https://www.python.org/), sólo para procesar fuentes.

## Instalación

```bash
pnpm install
python -m pip install -r requirements-fonts.txt
```

## Comandos

| Comando              | Uso                                                              |
| -------------------- | ---------------------------------------------------------------- |
| `pnpm dev`           | Servidor de desarrollo.                                          |
| `pnpm lint`          | Revisa Pug, CSS y JavaScript.                                    |
| `pnpm validate`      | Comprueba que los assets y fuentes referenciados existan.         |
| `pnpm validate:origen` | Cobertura de comportamiento frente al sitio de origen.         |
| `pnpm optimize`      | Genera los WebP configurados.                                    |
| `pnpm font:subset`   | Convierte y reduce fuentes a WOFF2.                              |
| `pnpm figma:assets`  | Descarga y limpia los assets declarados en `figma-assets.json`.  |
| `pnpm build`         | Valida y genera `dist/`.                                         |
| `pnpm verify:render` | Comprueba el resultado construido.                               |
| `pnpm preview`       | Sirve `dist/` localmente.                                        |

`dist/` es una salida generada: se valida, no se edita.

### Ver el resultado construido

```bash
pnpm build
pnpm preview
```

`pnpm preview` lo sirve por HTTP, que es como se comprueba: es el mismo protocolo
que en producción. El `dist/` también abre con doble clic —las rutas son
relativas, no hay `crossorigin` y el script no es un módulo—, pero eso es una
comodidad para enviarle la carpeta a alguien, no la forma de validar el trabajo.

Lo que **no** funciona con doble clic es el sprite SVG: un `<use href="sprite.svg#icon">`
es una petición a otro documento y el navegador la bloquea bajo `file://`. En
cuanto la página lleve iconos, hay que mirarla servida.

## Estructura

```text
docs/                  Tarjeta de decisión, criterios de aceptación y assets
examples/              Ejemplos neutrales de componentes
plugins/               Plugins y herramientas del build
src/
├── assets/
│   ├── fonts/         WOFF2 del proyecto
│   ├── icons/         SVG fuente del sprite
│   └── images/        Imágenes por componente o función
├── components/        Componentes y mixins Pug
├── pages/             Entradas que Vituum convierte en páginas
├── scripts/           main.js, components/ y tools/
└── styles/
    └── styles.css     El sistema de diseño entero
```

## El sistema de diseño

Todo está en `src/styles/styles.css`. El bloque `@theme` declara los colores,
breakpoints, tipografía, radios y sombras, y de ahí salen las clases: un token
`--color-brand` genera `bg-brand`, `text-brand` y `border-brand`.

La paleta y los breakpoints por defecto de Tailwind están borrados a propósito:

```css
--color-*: initial;
--breakpoint-*: initial;
```

`bg-slate-800` y `md:flex` no generan nada. Los breakpoints de este core son
`tablet:` (700px), `desktop:` (1000px) y `wide:` (1200px), y la base sin prefijo
es mobile. Es la regla que mantiene el diseño en un sitio: si falta un color, se
añade el token.

## Componentes

Un componente es un archivo Pug. Los que se repiten con marcado y cableado —un
botón, un campo de formulario— son mixins en `src/components/ui.pug`:

```pug
+field({ id: 'email', label: 'Email', name: form.email.name, type: 'email' })
+button('Get a Free Quote', { type: 'submit', class: 'mt-5 w-full' })
```

El mixin `field` monta etiqueta, control, hueco de error y el `aria-describedby`
que los relaciona. Escrito a mano, ese atributo se pierde una vez de cada tres.

**Las clases van siempre en `class='…'`**, nunca en la notación de puntos de Pug:
`.desktop:flex` y `.w-1/2` no compilan.

## Formularios

`config.pug` concentra marca, idioma, destino y los nombres de campo, que son un
contrato con quien recibe los datos. `forms.js` valida con la API nativa del
navegador: le quita la burbuja —que no se puede estilar ni anuncia un lector de
pantalla— y conserva todo lo demás. No corrige a nadie antes del primer intento
de envío, y bloquea el doble envío.

`actionUrl` vacío es el estado de partida: el formulario avisa por consola en vez
de simular un éxito que no existe.

## Trabajo con agentes de IA

Los agentes empiezan por [AGENTS.md](./AGENTS.md), que `CLAUDE.md` carga solo.
Además:

- [Tarjeta de decisión](./docs/tarjeta-de-decision.md) — se relee mientras se
  escribe, no al empezar.
- [Criterios de aceptación](./docs/criterios-de-aceptacion.md) — qué comprueba
  cada comando y qué no.
- [Assets, iconos y fuentes](./docs/assets.md) — incluido el flujo con el MCP de
  Figma.
- [Migración desde Playgrow](./docs/migracion/README.md) — guía, inventario y
  tareas para traer el maquetado ya avanzado del proyecto anterior. Escrita para
  un agente que no participó en la creación de este core.
- [Arquitectura BEM y contrato con el tema](./docs/contrato-con-el-tema.md) —
  la adaptación pendiente al estándar `c-section` del core, con el inventario de
  los 16 componentes de sección; y qué depende hoy de esta maquetación aguas
  abajo: los ganchos de comportamiento, las medidas de imagen y el breakpoint
  compartido con el tema.

`pnpm verify:render` incluye dos controles pensados para lo que un agente hace
cuando no encuentra un token: inventarlo entre corchetes. Un color en el marcado
falla; una medida arbitraria repetida tres veces avisa.

---

Derivado de [`lp-core`](https://github.com/ConfieDigital/lp-core), de Alejandro
Loayza.
