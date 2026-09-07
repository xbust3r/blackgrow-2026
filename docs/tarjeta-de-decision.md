# Tarjeta de decisión

No se lee una vez al empezar: se relee **mientras se escribe**. Releerla cuesta
poco y es lo que evita escribir algo que el core ya resolvía.

## Antes de escribir un valor que sale del diseño

- ¿Existe el token en `@theme`? Se usa.
- ¿No existe pero es de marca —un color, una familia, un radio—? Se **añade el
  token** y luego se usa. No se escribe el valor en el marcado.
- ¿El diseño contradice un token que ya está? Se señala y se pregunta. No se
  inventa un tercer número.
- ¿Es una medida de un solo uso —tres píxeles para alinear un icono—? Puede ir
  entre corchetes. Si aparece por tercera vez, era un token.

## Antes de escribir una clase

- ¿Va en `class='…'`? Siempre. La notación de puntos de Pug rompe con `:`, `/`
  y `.`, que Tailwind usa constantemente.
- ¿Es un color? Nunca entre corchetes.
- ¿Empieza por `md:`, `lg:`, `sm:`? No existen. Los breakpoints de este core son
  `tablet:`, `desktop:` y `wide:`, y la base sin prefijo es mobile.
- ¿La cadena ya la escribí antes en esta página? A la tercera es un componente:
  va a un mixin de `src/components/`.
- ¿Es apariencia o es un hook? Si JavaScript la busca, empieza por `js-` y no
  lleva ni un solo estilo.

## Antes de escribir CSS propio

- ¿Se puede con utilidades? Entonces no se escribe CSS.
- ¿Es contenido que llega ya escrito y no admite clases? Va en `.cms-content`.
- ¿Es una decisión de proyecto que debe cambiar en un sitio y afectar a todos
  —el ancho del contenedor, el anillo de foco—? Va en `@utility` o en
  `@layer base`.
- ¿Es un componente con muchos estados? Antes de crear CSS, comprobar si el
  estado se puede expresar con un atributo y una variante: `aria-invalid:`,
  `[hidden]`, `has-`, `group-`.

## Antes de escribir un campo de formulario

- ¿Está el `name` en `config.pug`? Si no, se añade ahí, no en la plantilla.
- ¿Se puede usar el mixin `field`? Casi siempre sí, y así el
  `aria-describedby` no se pierde.
- ¿La restricción es de teclado o de validez? Filtro (`js-only-*`) y validación
  son cosas distintas y hacen falta las dos.
- ¿El `action` es real? Si no lo hay, se deja vacío y se anota como pendiente.

## Antes de añadir una imagen

- ¿Está declarada en `figma-assets.json`? Entre `pnpm figma:assets` y
  `pnpm optimize` no puede quedar ningún paso manual.
- ¿Lleva `width` y `height` con la proporción real del archivo? Si no cuadran,
  el verificador lo dice y la página salta al cargar.
- ¿Es la candidata a LCP? Entonces se precarga, y el `media` del preload replica
  exactamente el del `picture`. Si no lo es, no se precarga.
- ¿Es un icono del sistema? Va a `src/assets/icons/` y se usa con `+svgIcon`.

## Antes de escribir JavaScript

- ¿La sección tiene comportamiento de verdad? Si no, no lleva JavaScript.
- ¿Está importado desde `main.js`? Si no, no se ejecuta.
- ¿Las clases que añade están escritas enteras? Una clase compuesta en tiempo de
  ejecución no la genera Tailwind.
- ¿Funciona con teclado? ¿El foco va a donde tiene que ir después de la acción?

## Antes de dar un cambio por bueno

- ¿Se comprobó redimensionando el viewport de verdad? Estrechar un elemento no
  reevalúa las media queries.
- ¿Se probó con contenido real, el largo y el corto?
- ¿Se probó el estado de error, no sólo el feliz?

## Antes de entregar

- ¿Corrieron `lint`, `validate`, `build` y `verify:render`, en ese orden?
- ¿Los avisos del verificador están resueltos o explicados? Un aviso que se
  ignora sin decir por qué es un pendiente escondido.
- ¿Lo que no se pudo implementar está anotado como pendiente, con su motivo?
