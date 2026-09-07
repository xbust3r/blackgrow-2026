# Ejemplos neutrales

Muestran cómo se escribe un componente en este core. No forman parte del build y
no deben copiarse con su contenido: se leen para ver la forma, no para pegarlos.

| Patrón      | Marcado                            | JavaScript                        |
| ----------- | ---------------------------------- | --------------------------------- |
| Estático    | `componente-pug/feature-list.pug`  | No necesita.                      |
| Interactivo | `componente-pug/disclosure.pug`    | `componente-js/disclosure.js`     |
| Formulario  | `src/components/hero.pug`          | `src/scripts/components/forms.js` |

El formulario no tiene ejemplo aparte porque el del core ya lo es: el mixin
`field`, el contrato de `config.pug` y la validación nativa son el patrón.

Lo que se ve en ellos y conviene repetir:

- **No hay archivo de estilos que crear ni que registrar.** Un componente
  estático son un `.pug` y nada más.
- **Las clases van en `class='…'`**, nunca en la notación de puntos de Pug.
- **El hook `js-` no lleva apariencia** y va separado de las clases visuales:
  rediseñar el bloque no puede romper el comportamiento.
- **El estado se guarda en atributos que ya significan algo** —`aria-expanded`,
  `hidden`, `aria-invalid`—, no en una clase de estado inventada.

El disclosure usa una clase de JavaScript porque puede aparecer varias veces y
cada instancia guarda su propio estado. Un controlador que sólo existe una vez
en la página se escribe como objeto literal con un método `init()`.
