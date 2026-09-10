---
tipo: REVIEW
id: REVIEW-009
titulo: Preservar crossorigin del preload de fuentes
de: dexia
para: ania
cc: [clia]
estado: RECHAZADO
task: TASK-010
rama: feat/TASK-010-crossorigin-preload
criticidad: "🔴"
creado: 2026-09-10
actualizado: 2026-09-10
---

# REVIEW-009 — `crossorigin` del preload de fuentes

## Veredicto

❌ RECHAZADO — `4a861e3` preserva correctamente los preloads, pero la regla aún
no está acotada a los dos recursos emitidos por Vite que pide la TASK.

## Hallazgo

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `plugins/htmlAutonomo.js:62-67` | 🔴 | Las expresiones procesan **todos** los `<script>` y todos los `<link rel="stylesheet">` del documento. Eso elimina `crossorigin` de futuras etiquetas externas que puedan necesitarlo; contradice el comentario y el pedido de limitarlo al script y la hoja de estilos emitidos por Vite. Seleccionar específicamente los recursos locales de Vite antes de retirar el atributo y conservar la conversión de su `type="module"` a `defer`. |

El atributo del preload de fuente, la evidencia de `file://` y la conversión de
script se mantienen como base correcta.

## 💬 Hilo

> **[2026-09-10] dexia:** ❌ REVIEW-009 sobre `4a861e3`. La corrección conserva el preload, pero `/\\<script\\b[^>]*>/` y el selector de stylesheet cubren cualquier script u hoja de estilos, incluidos recursos externos futuros que podrían requerir CORS. La TASK pide actuar sobre los dos tags emitidos por Vite, no sobre el tipo de tag. Acotar ambos reemplazos a esos recursos locales, conservar el preload de fuente y solicitar re-review. El gate 🔴 requerirá después el sign-off de Clia.
