# Correcciones de la fase HTML + CSS

Salen de validar el commit `a9aacc3`. La maquetación es correcta: el pipeline
pasa entero, 0 fallos, cero desbordamiento a 375px y las trampas de la fase
—FAQ plano, mampostería con `columns`, marquesina en CSS, plantilla de blog con
el lado como parámetro— se esquivaron todas.

Lo que queda es **contenido**, no estructura.

---

## Ya corregido

- [x] **`novalidate` fuera del marcado.** `forms.js` pone `noValidate` desde
      JavaScript a propósito para que, sin él, el navegador siga validando. Con
      el atributo escrito en el Pug, contacto y comentarios se enviaban vacíos
      si el JavaScript no cargaba. Commit `63174bb`.

---

## Corrección 1 · El contenido está inventado

**El problema.** Las 12 páginas nuevas no tienen ni una línea del relleno del
origen. En su lugar hay copy de marketing verosímil: «Sustainable Nursery
Essentials for Growing Families», «Are all textile products 100% certified
organic?», «123 Nursery Boulevard, Suite 400, New York, NY 10001».

**Por qué importa.** El relleno obvio se ve y se reemplaza. Una copy que parece
terminada se cuela a producción. La migración anterior fue escrupulosa con esto
—conservó `Crubs`, `prueba de titulo`, `Title`, `item 1`— y esta fase rompió esa
línea.

**La regla**, en `AGENTS.md`: *no inventar contenido final*. El relleno del
origen se copia tal cual, typos incluidos.

### 1.1 · FAQ

- [ ] Sustituir las 6 preguntas inventadas por las 7 del origen. **Los typos
      `PURCASE` y `MATRACES` son del origen y se conservan.**

| # | Pregunta |
| --- | --- |
| 1 | WHERE CAN I PURCHASE YOUR PRODUCTS? |
| 2 | HOW DO I REGISTER ON THE ONLINE SHOP? |
| 3 | HOW CAN I PAY THE PURCASE ONLINE? |
| 4 | CAN I USE PAYPAL FOR CHECKOUT? |
| 5 | HOW CAN I CONTACT YOU? |
| 6 | WHICH ARE YOUR PREMIUM CRIBS? |
| 7 | WHAT MATRACES DO YOU USE? |

Las respuestas del origen son lorem ipsum. Sirve cualquiera de las que ya hay en
el proyecto, o esta, que es la primera del origen:

> Cursus mattis molestie a iaculis at erat pellentesque adipiscing. Ipsum
> faucibus vitae aliquet ullamcor si Tempus quam pellentesque nec nam aliquam
> sem et tortor. Rutrum quisque non tellus orci ac.

### 1.2 · Blog

- [ ] Sustituir los artículos inventados por los del origen.

| Formato | Título |
| --- | --- |
| standard | A guide to packing travel clothes and necesetys for a family vacation |
| standard | Must have toys to carry with you to the seaside for a successful creative playtime |
| quote | "Tellus pellentesque eu tincidunt tortor an nua ali qu am facilisia crasoned ferment." |
| standard | Create a safe space environment for your children to play in and be fulfilled inside |
| standard | Toys that bring kids joy and become their playful buddies for pretend play time |
| standard | Unique spoon set nowadays |
| standard | Keep your children clean |
| standard | New trendy toys for toddlers |

`necesetys` es un typo del origen: **se conserva**.

- Autor de todos: **`by Saira Bishon`** — uno solo, no cinco nombres distintos.
- Extracto de todos, el mismo:
  > Pretium fusce id velit ut tortor. Euismod quis viverra nibh cras pulvinar
  > mattis nunc. Arc…
- Categorías de la barra lateral: **Care, Nursery, Nurturing, Play, Toys**.

- [ ] **Quitar la cita atribuida a Maria Montessori.** Es una persona real a la
      que se le atribuyó una frase inventada. La cita del origen es lorem ipsum
      y no lleva autor de verdad; la del listado va firmada `JULY, CALIFORNIA`.
      Esto no es una preferencia de estilo: atribuir palabras inventadas a
      alguien real no se hace.

### 1.3 · Contacto

- [ ] Quitar la dirección inventada de `google-map.pug`
      («123 Nursery Boulevard, Suite 400, New York, NY 10001»). Dejar el
      marcador sin dirección, o el texto de pendiente que ya lleva.
- [ ] Los nombres de campo del origen son `your-name`, `your-email`,
      `your-phone` y `your-textarea`; el botón dice **Send message**. Si el
      formulario ya usa otros nombres, no pasa nada mientras se anote: el
      contrato real lo fija el backend, que es otra fase.
- [ ] Encabezados del origen: **HAPPY TO ANSWER ALL YOUR QUESTIONS** y
      **WHERE TO FIND US?**

### 1.4 · Las cuatro home y el resto

- [ ] Revisar `kids-store`, `baby-shop`, `shop-grid` y `landing` con el mismo
      criterio. Donde una sección reutilice un componente ya migrado, el texto
      ya es el del origen y no hay nada que tocar; lo que haya que revisar es lo
      escrito nuevo para esta fase.

---

## Corrección 2 · Revisar los avisos de `verify:render`

- [ ] Los avisos pasaron de 39 a 82 al triplicarse las páginas. **No hay ningún
      FALLO**, así que nada bloquea. Conviene mirarlos una vez y decidir:
      buena parte son falsos positivos —cadenas idénticas que ya vienen de un
      mixin compartido, que es justo la solución correcta y el verificador no lo
      distingue desde el HTML construido—, pero si alguna cadena larga se repite
      en una misma página sin venir de un mixin, ahí sí falta extraer uno.

---

## Cierre

- [ ] `pnpm lint`, `pnpm validate` y `pnpm build` en verde.
- [ ] Comprobado servido: FAQ y blog con el contenido del origen.
- [ ] Actualizar el informe de la fase con lo corregido.

## Lo que NO hay que hacer

- No «mejorar» el relleno del origen. Si es feo o tiene faltas, así se queda:
  es lo que hace evidente que falta contenido real.
- No inventar direcciones, nombres de persona, precios ni citas.
- No añadir JavaScript: sigue siendo otra fase.
