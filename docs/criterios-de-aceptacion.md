# Criterios de aceptación

## Controles automáticos

| Comando             | Qué comprueba                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `pnpm optimize`     | Genera los WebP que el marcado referencia a partir de las imágenes fuente.                             |
| `pnpm lint`         | Markuplint sobre el Pug —semántica, ARIA, atributos, ids—, Stylelint sobre el CSS y ESLint sobre el JS. |
| `pnpm validate`     | Que cada asset y cada fuente referenciados existan de verdad.                                          |
| `pnpm build`        | Que todo compile y genera `dist/`.                                                                     |
| `pnpm verify:render`| Lo que un archivo existente todavía puede hacer mal. Ver abajo.                                         |

### Qué comprueba `pnpm verify:render`

Trabaja sobre `dist/`, así que va después del build.

1. **Que cada asset pinte algo.** Un SVG con un `clipPath` vacío es un archivo
   válido, con peso y sin errores, que no dibuja nada. Sólo se distingue
   rasterizándolo y midiendo píxeles opacos.
2. **Que la proporción declarada sea la real.** Salta cuando el `width`/`height`
   del marcado obliga al navegador a corregir el hueco al cargar, y sólo cuando
   el desvío es a la vez mayor de 2px y del 5%: así no marca el redondeo del
   `viewBox` de un logotipo pero sí un export que no corresponde al frame.
3. **Que un preload no duplique la descarga.** Que lo precargado lo sirva un
   `picture` de la página o una regla del CSS, y que el `media` del preload
   replique el del `source`.
4. **Que los símbolos del sprite existan.** Un `#icon-icon-phone` por doble
   prefijo es una referencia rota que ningún linter detecta, porque el atributo
   es dinámico.
5. **Que la fuente que se nombra se entregue.** Si un token `--font-*` nombra una
   familia y ningún `@font-face` la sirve, la página se pinta con una fuente de
   sustitución.
6. **Que no haya colores sueltos en el marcado.** `bg-[#0a0a0a]` es un fallo: no
   hay color de un solo uso en un diseño.
7. **Que un valor arbitrario repetido se convierta en token.** Tres apariciones
   de `mt-[13px]` son un token que falta.
8. **Que un componente sin nombre acabe siendo un mixin.** Tres elementos de una
   misma página con seis clases idénticas ya no son una coincidencia de spacing.

Los puntos 1 a 6 fallan y cancelan. Los 7 y 8 avisan: piden una decisión, no
siempre un cambio.

### Qué no comprueban

Ninguno de estos comandos sabe si la página **se parece al diseño**. Markuplint
valida ARIA pero no si el nombre accesible tiene sentido. El verificador mide
proporciones pero no si la imagen es la correcta. Un resultado verde no sustituye
a mirar la página.

## Comprobación manual

- Redimensionar el viewport de verdad en los cuatro breakpoints. Estrechar un
  elemento no reevalúa las media queries.
- Recorrer la página entera con el teclado: orden de foco, anillo visible,
  ninguna trampa.
- Contenido real, el más largo y el más corto que pueda llegar.
- El formulario: campo vacío, formato inválido, envío correcto, doble clic en
  enviar y vuelta atrás del navegador.
- Consola y pestaña de red sin errores.

## Definición de terminado

1. Los comandos automáticos pasan, y los avisos están resueltos o explicados.
2. La página se comprobó a mano en mobile y desktop.
3. Los valores del diseño están en `@theme`, no repartidos por el marcado.
4. Lo que dependía de terceros —destino del formulario, tracking, textos
   legales— está implementado como presentación y anotado como pendiente, no
   inventado.
5. El informe dice qué se hizo, qué se supuso y qué queda.
