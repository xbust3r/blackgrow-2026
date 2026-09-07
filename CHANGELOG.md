# Registro de cambios

Este archivo resume los cambios relevantes de los cores Front-end y el motivo de cada decisión. No reemplaza el historial de Git, los commits ni la descripción de los Pull Requests.

## Qué registrar

Agregar una entrada cuando un cambio afecte alguno de estos puntos:

- arquitectura o estructura de carpetas;
- comandos, build, rutas o proceso de entrega;
- dependencias o requisitos del entorno;
- convenciones y flujo de trabajo del equipo;
- integraciones, formularios, placeholders o contratos con backend/CMS;
- comportamiento, accesibilidad, rendimiento o compatibilidad;
- correcciones importantes que puedan explicar decisiones futuras.

No es necesario registrar correcciones ortográficas, ajustes de formato o cambios internos sin impacto relevante. Esos detalles ya quedan disponibles en Git.

## Cómo escribir una entrada

Cada cambio debe indicar brevemente:

1. **Qué cambió.**
2. **Por qué cambió.**
3. **Dónde aplica:** común, sitio o LP.
4. Un enlace al issue o Pull Request cuando exista.

Las entradas nuevas se agregan bajo **Sin publicar**. Al preparar una entrega, pueden agruparse bajo una versión y fecha.

## Sin publicar

### Reconstrucción sobre Tailwind — 6 de septiembre de 2026

**Qué cambió.** La capa de estilos pasa de Sass por capas + BEM a Tailwind v4 con
los tokens en `src/styles/styles.css`. Se retira la salida PHP y la integración
con Scarlet —`vitePugToPhp`, `adjustHtmlPathsPlugin`, `public/structure-*.conf`,
`info.php`, `cp.sh`—: el build produce HTML, CSS y JS. `config.pug` queda con una
marca neutral en lugar del switch multimarca. La validación de formularios se
reescribe con la API nativa e IMask; se retira jQuery y jQuery Validation.

**Por qué cambió.** Crear un bloque costaba tres archivos, una decisión de capa y
un registro en `styles.scss` que, si se olvidaba, dejaba el estilo sin aplicar sin
que ninguna comprobación protestara. Con utilidades cuesta un archivo y el
sistema de diseño queda en un sitio.

**Dónde aplica.** Este repositorio. No se promueve a `lp-core` ni a
`front-end-core`: es una divergencia deliberada, no una mejora neutral.

**Consecuencias.**

- La paleta y los breakpoints por defecto de Tailwind se vacían
  (`--color-*: initial`, `--breakpoint-*: initial`). Los breakpoints del proyecto
  son `tablet:`, `desktop:` y `wide:`.
- `pnpm verify:render` pierde las comprobaciones de arquitectura SCSS —utilidades
  reescritas, parciales sin conectar, herencia redeclarada— porque ya no
  significan nada, y gana dos: color arbitrario en el marcado (falla) y valor
  arbitrario repetido o cadena de clases repetida (avisa). El recuento de cadenas
  repetidas es por página, para no marcar el header incluido en las tres.
- Tailwind se integra por PostCSS y no por `@tailwindcss/vite`: con Vite 8 el
  plugin de Vite no llega a transformar el CSS y `@theme` sale sin procesar.
- Prettier usa `pugClassNotation: "attribute"`. Con `literal` reescribía
  `class='desktop:flex'` como `.desktop:flex`, que no compila.
- `plugins/htmlAutonomo.js` quita el `crossorigin` que Vite pone en la hoja de
  estilos y el script, y convierte el `type="module"` en `defer`. Sin eso el
  `dist/` abierto con doble clic se veía sin estilos y sin comportamiento: bajo
  `file://` el navegador bloquea ambas cosas por CORS. Servido por HTTP el
  resultado es idéntico. El plugin cancela el build si el JavaScript se parte en
  más de un archivo, porque entonces el `defer` dejaría de ser equivalente.
- Markuplint pierde la regla `class-naming`: el nombre de una clase de utilidad
  no dice nada de su calidad y el patrón BEM las rechazaba todas.

### Añadido

### Cambiado

### Corregido

## Versiones futuras

Formato sugerido:

```markdown
## 8.0.0 - AAAA-MM-DD

### Añadido

- **Sitio:** descripción del cambio y su motivo. PR #000.

### Cambiado

- **Común:** descripción del cambio y su motivo. PR #000.

### Corregido

- **LP:** descripción del problema corregido y su impacto. PR #000.
```
