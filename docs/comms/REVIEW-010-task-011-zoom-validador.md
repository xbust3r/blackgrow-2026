---
tipo: REVIEW
id: REVIEW-010
titulo: Zoom de producto y validación de hooks
de: dexia
para: ania
cc: [clia]
estado: APROBADO
task: TASK-011
rama: feat/TASK-011-zoom-y-validador
criticidad: "🔴"
creado: 2026-09-10
actualizado: 2026-09-10
---

# REVIEW-010 — Zoom de producto y validación de hooks

## Veredicto

✅ APROBADO TÉCNICAMENTE — `9ece571` cierra el hueco del validador y añade el
zoom sin interferir con el lightbox. Falta el sign-off 🔴 de Clia por los
cambios en `plugins/`.

## Comprobado

- Para comportamientos `hecho` o `mejorado`, un hook debe existir en Pug y tener
  consumidor en scripts o estilos; los estados fuera de alcance no entran en la
  exigencia.
- `product-zoom` queda registrado, importado desde `main.js` y consulta
  `.js-product-zoom` en su módulo.
- El zoom se limita a puntero fino, respeta movimiento reducido y el control de
  lightbox queda por encima de la imagen escalada.
- El hilo aporta la prueba de rotura solicitada y la salida declarada de la
  suite completa.


## Sign-off del CTO (cambio 🔴)

- [x] **Clia (CTO): FIRMADO — 2026-09-10.** Las dos partes verificadas por mí.
  **El control nuevo funciona:** quité el consumidor de `js-product-zoom` a
  propósito y `validate:origen` salió con `exit=1` y el mensaje exacto —«el hook
  no tiene consumidor ni en src/scripts/ ni en src/styles/»—; restaurado, vuelve
  a 0. Y no se pasa de listo: los hooks de `otra-fase` (`js-shop-sorting`,
  `js-add-to-cart` y los cinco `js-cart-*`) siguen sin disparar nada, que es lo
  correcto. **El zoom existe:** con puntero fino, al pasar el cursor la imagen
  escala a 1.75 y el `transform-origin` sigue al puntero; al salir vuelve a
  `none`; comprueba `pointer: fine` y `prefers-reduced-motion`, y el lightbox de
  la misma imagen sigue vivo.

  ⚠️ **Aviso sobre mi propia demostración:** mi primer intento de romperlo no
  detectó nada, y no porque el control fallara sino porque renombré el hook a
  `js-product-zoom-DESCONECTADO`, que **contiene** la cadena buscada. El `includes`
  seguía encontrándola. Quien vuelva a probar esto: hay que eliminar la
  referencia, no ampliarla.

## 💬 Hilo

> **[2026-09-10] dexia:** ✅ REVIEW-010 sobre `9ece571`. El validador ya falla cuando un comportamiento listo declara un hook sin consumidor, sin alcanzar los estados fuera de alcance. `product-zoom` consume su hook desde el módulo importado por `main.js`; sólo se activa con puntero fino, honra movimiento reducido y conserva el acceso al lightbox. La evidencia incluye la prueba de rotura y la suite en verde. El gate 🔴 queda pendiente únicamente del sign-off de Clia por `plugins/validate-origen.js`.
