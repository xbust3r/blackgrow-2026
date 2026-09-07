# Validador «playgrow origen»

## Por qué existe

El marcado se migró desde un clon local (`template-html-blackn-main`) que era
**estático**: Pug y Sass, sin una sola línea de comportamiento. Ese clon no es
la referencia completa del proyecto, sólo de su maquetado.

La referencia de lo que el sitio tiene que **hacer** es el sitio vivo:
<https://playgrow.qodeinteractive.com/>. Este validador cataloga esos
comportamientos y cruza el catálogo contra `src/`.

```bash
pnpm validate:origen              # informe completo
node plugins/validate-origen.js --pendientes   # sólo lo que falta
```

## Qué hace y qué no

**No visita el sitio.** Un build no puede depender de que el servidor de un
tercero esté en pie, y el catálogo ya está escrito en
[`origen-comportamientos.json`](./origen-comportamientos.json). Cuando el origen
cambie, se revisa el catálogo a mano y se actualiza la fecha de `revisado`.

Responde dos preguntas distintas, y sólo una de ellas hace fallar el comando:

| Pregunta | Resultado |
| --- | --- |
| ¿Qué falta por migrar? | Informe de cobertura. **No falla** — un pendiente declarado no es un error. |
| ¿Lo que dice estar hecho, sigue estándolo? | **Falla.** |

Lo segundo es lo que lo convierte en validador y no en documento. Un hook `js-`
que alguien renombra en el Pug, o un módulo que se cae de `main.js`, dejan el
comportamiento muerto sin que ninguna otra comprobación se entere: el marcado
sigue compilando y el CSS sigue pintando igual.

**Ya pasó en la primera ejecución.** Al retirar un hero huérfano heredado del
`lp-core` desaparecieron los únicos `js-form` y `js-only-*` del marcado, así que
`forms.js` e `input-filters.js` quedaron cargados y sin nada a lo que
engancharse — y el formulario de newsletter mostraba huecos de error que ya no
rellenaba nadie. El validador lo señaló como regresión; se corrigió conectando
el newsletter a `js-form`.

## Estados

| Estado | Significado |
| --- | --- |
| `hecho` | Implementado y conectado. |
| `mejorado` | Implementado, y resuelto mejor que en el origen. |
| `pendiente` | El origen lo tiene, el destino no. |
| `requiere-backend` | No es sólo front: depende de un carrito o una tienda real. |
| `descartado` | El origen lo tiene y se decidió no llevarlo. |

`mejorado` no es autocomplacencia: se usa cuando el origen resuelve algo de una
forma que no se quiere copiar. El menú móvil del origen es un `<a>` sin
`aria-expanded`, sin foco atrapado y sin cierre con `Escape`; el del destino es
un `<button>` con las tres cosas. Copiarlo fiel habría sido un error.

## El stack del origen, y por qué no se porta

El tema carga jQuery 3.7, Swiper, Magnific Popup, Slider Revolution, GSAP +
ScrollTrigger, isotope, select2, perfect-scrollbar y WooCommerce. Nada de eso se
migra tal cual:

- **Slider Revolution** es un plugin de pago de WordPress.
- **Magnific Popup** y **select2** arrastran jQuery, que este core ya retiró.
- **GSAP + ScrollTrigger** para aparecer al hacer scroll es desproporcionado:
  `IntersectionObserver` lo resuelve sin dependencias.
- **perfect-scrollbar** reemplaza el scroll del sistema, que es justo lo que no
  hay que hacer.

Lo que se migra es **el comportamiento observado**, no la librería que lo
produce. Por eso el catálogo describe qué hace cada pieza y cuál es su marcador
en el origen, no qué plugin la implementa.

## Cobertura actual

3 de 24 comportamientos listos (13%). Los tres son de formulario y menú, que es
lo que el core ya traía; los 16 pendientes son casi todos del tema.

Que la cifra sea baja es esperable y no es una regresión: hasta ahora se migró
**maquetado**, y el maquetado está completo. Los comportamientos son la fase que
empieza ahora.

## Advertencia sobre nombres

En el clon local, `cart.pug` es el **listado de tienda** y `cart-index.pug` es la
**ficha de producto**. El carrito de verdad —tabla de líneas, cantidades, cupón,
totales— **no existía en el clon**. Al mirar el origen conviene guiarse por el
contenido de cada página, no por su nombre de archivo.
