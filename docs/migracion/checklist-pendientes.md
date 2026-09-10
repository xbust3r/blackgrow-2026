# 📋 Checklist de la parte faltante — Blackgrow 2026

> **Responsable de ejecución:** Ania (DEV principal)  
> **Aprobación técnica:** Dexia (Lead / Reviews)  
> **Supervisión y sign-off:** Clia (CTO) · Miguel (Jefe)  
> **Fecha:** 2026-09-10  
> **Referencia:** [`docs/migracion/origen-componentes.md`](./origen-componentes.md) · [`docs/briefing-maquetacion.md`](../briefing-maquetacion.md)

---

## 🎯 Resumen del estado actual

| Área | Estado | Qué queda |
| --- | --- | --- |
| **Maquetado HTML + CSS** | 🟩 100% Completo | 22 páginas construidas sin fallos. |
| **Comportamientos (JS)** | 🟨 20/20 núcleo cubierto | Faltan 2 comportamientos UI front-end: desplegables desktop y panel lateral del carrito. |
| **Auditoría de Jerarquía** | 🟩 Completo | TASK-008 mergeada (0 saltos de titular). |
| **Validación de Migración** | 🟨 Pendiente de marcado | Completar la auditoría formal en `checklist-validacion.md`. |
| **Avisos `verify:render`** | 🟨 0 fallos, avisos pendientes | Reducir avisos por repetición de clases en componentes del blog y tienda. |
| **Backend & Assets reales** | ⏸️ Otra fase | Formularios con `actionUrl: ''` y sustitución de assets demo (`assets-pendientes.json`). |

---

## 🚀 1. Comportamientos Front-end UI faltantes

Estos dos elementos pertenecen al front-end visual y pueden implementarse sin depender de backend:

- [ ] **1.1 Panel lateral del carrito (`cart-side-area.js`)**
  - **Contexto:** El marcado ya existe en `src/components/cart-side-area.pug` con los hooks `js-cart-panel`, `js-cart-panel-toggle`, `js-cart-panel-close` y `js-cart-panel-cover`.
  - **Tarea:** Crear el módulo `src/scripts/components/cart-panel.js` e importarlo en `src/scripts/main.js`.
  - **Accesibilidad y comportamiento:**
    - Conmutar `hidden` y `aria-expanded` en el disparador del carrito de la cabecera.
    - Atrapado de foco con `trap-focus.js` (`trap(panel)` / `untrap()`).
    - Cierre mediante el botón de aspa (`js-cart-panel-close`), clic en la cortina de fondo (`js-cart-panel-cover`) y pulsación de la tecla `Escape`.
    - Devolución del foco al elemento que abrió el panel.

- [ ] **1.2 Desplegables de navegación en escritorio (Submenús header)**
  - **Contexto:** Identificado en `docs/briefing-maquetacion.md` (§8). En móvil la navegación está completa, pero en escritorio los enlaces del menú principal no despliegan sus submenús.
  - **Tarea:** Añadir el despliegue accesible de submenús en la cabecera de escritorio.
  - **Accesibilidad y comportamiento:**
    - Indicador `aria-haspopup='true'` y `aria-expanded`.
    - Apertura por hover y por foco con teclado (`Tab` / flechas).
    - Cierre al perder el foco o presionar `Escape`.

---

## 🧹 2. Limpieza de avisos y refinamiento de componentes

- [ ] **2.1 Reducción de avisos en `verify:render`**
  - **Contexto:** Hay avisos informativos sobre elementos que comparten 6 o más clases de utilidad en `blog*.html`, `cart.html` y `baby-shop.html`.
  - **Tarea:**
    - Extraer patrones recurrentes de tarjetas de blog y badges a mixins dedicados en `src/components/`.
    - Mantener `npm run build` con **0 FALLOS** y reducir drásticamente los avisos.

- [ ] **2.2 Verificación visual servida**
  - Comprobar en `http://localhost:5274` (`pnpm preview`) tanto a 375px como a 1280px que no existan desbordamientos ni anomalías visuales.

---

## 📋 3. Auditoría formal de la migración

- [ ] **3.1 Completar [`docs/migracion/checklist-validacion.md`](./checklist-validacion.md)**
  - **Bloque A (Automático):** Verificar y marcar A1 a A6 (`pnpm lint`, `pnpm validate`, `pnpm build`, `pnpm verify:render`, fuentes Jost).
  - **Bloque B (Anti-Qode):** Ejecutar y documentar `grep -rn "qodeinteractive\|playgrow\|Playgrow\|Qode" src/` (resultado `limpio`).
  - **Bloque C (Arquitectura):** Verificar layout único `main-template.pug`, bloques y ausencia de duplicados.
  - **Bloque D (Tokens):** Verificar que ningún `#hex` de marca esté en el marcado Pug.
  - **Bloque E (Componentes):** Validar la inclusión de los 8 heros y componentes de contenido y comercio.
  - **Bloque F (Accesibilidad):** Validar navegación por teclado completa, foco visible y skip-link.
  - **Bloque G (Responsive):** Validar con `document.documentElement.scrollWidth <= document.documentElement.clientWidth` en 360px.
  - **Bloque H & I (Contenido y Entrega):** Confirmar que no hay contenido inventado y registrar el estado final.

---

## 📁 4. Actualización del sistema de comunicación (Comms)

- [ ] **4.1 Cerrar formalmente TASK-008 en el tablero**
  - Actualizar `docs/comms/TASK-008-jerarquia-de-titulares.md` a `estado: CERRADA`.
  - Mover la fila de TASK-008 en `docs/comms/tablero.md` de «🟢 Abiertos» a «✅ Cerrados».
  - Reflejar el estado en `docs/status/ania-status.md`.

---

## ⏳ 5. Elementos pendientes para fase posterior (Backend & Producción)

*Para seguimiento y registro, no bloquean el front estático:*

- [ ] **5.1 Endpoints de formularios:** Conectar `actionUrl` en contacto, comentarios y newsletter cuando el backend/servicio esté disponible.
- [ ] **5.2 Reemplazo de assets:** Reemplazar las imágenes de demo listadas en `docs/migracion/assets-pendientes.json` por fotografías con licencia definitiva.
- [ ] **5.3 Funcionalidad de tienda:** Integración con WooCommerce / API de carrito, persistencia y pasarela de pago.
