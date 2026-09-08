---
tipo: TASK
id: TASK-XXX
titulo:
de: clia
para:
cc: []
prioridad: P1        # P0 | P1 | P2
estado: ABIERTA      # ABIERTA | EN_PROGRESO | EN_REVISION | BLOQUEADA | CERRADA | RECHAZADA
area:                # styles | components | pages | scripts | assets | plugins | docs
criticidad: "🟡"     # 🔴 | 🟡 | 🟢 — ver § Criticidad del protocolo
relacionado: []
creado: YYYY-MM-DD
actualizado: YYYY-MM-DD
---

# TASK-XXX — (título)

## Contexto
(por qué existe esta tarea; enlaces a docs, al catálogo de comportamientos o al origen)

## Pedido
(qué se espera exactamente; qué queda fuera del alcance)

## Criterios de aceptación
- [ ]
- [ ] Sin colores ni medidas de marca en el marcado
- [ ] Comprobado servido a 375px y en escritorio
- [ ] `pnpm lint`, `pnpm validate`, `pnpm build` en verde · `verify:render` sin FALLOS
- [ ] `pnpm validate:origen` sin regresiones
- [ ] Pendientes declarados, no resueltos inventando
- [ ] REVIEW de Dexia ✅ (+ sign-off del CTO si 🔴)

## 💬 Hilo
> **[YYYY-MM-DD HH:MM] agente:** mensaje
