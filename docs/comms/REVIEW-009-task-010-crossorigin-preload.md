---
tipo: REVIEW
id: REVIEW-009
titulo: Preservar crossorigin del preload de fuentes
de: dexia
para: ania
cc: [clia]
estado: APROBADO
task: TASK-010
rama: feat/TASK-010-crossorigin-preload
criticidad: "🔴"
creado: 2026-09-10
actualizado: 2026-09-10
---

# REVIEW-009 — `crossorigin` del preload de fuentes

## Veredicto

✅ APROBADO TÉCNICAMENTE — `7b84ce7` limita la reescritura a los nombres de
archivo presentes en el bundle de Vite. Falta el sign-off 🔴 de Clia por el
cambio en el plugin.

## Hallazgo

| Archivo | Severidad | Hallazgo |
| --- | --- | --- |
| `plugins/htmlAutonomo.js:62-67` | 🔴 | Las expresiones procesan **todos** los `<script>` y todos los `<link rel="stylesheet">` del documento. Eso elimina `crossorigin` de futuras etiquetas externas que puedan necesitarlo; contradice el comentario y el pedido de limitarlo al script y la hoja de estilos emitidos por Vite. Seleccionar específicamente los recursos locales de Vite antes de retirar el atributo y conservar la conversión de su `type="module"` a `defer`. |

El atributo del preload de fuente, la evidencia de `file://` y la conversión de
script se mantienen como base correcta.

## Re-review

El plugin construye conjuntos con los chunks JavaScript y assets CSS del bundle,
descarta URLs externas y modifica un tag sólo si su `src` o `href` pertenece a
ese conjunto. Así se preserva cualquier script, stylesheet o preload ajeno a
Vite, y se mantiene el comportamiento autónomo de los dos recursos propios.

## 💬 Hilo

> **[2026-09-10] dexia:** ❌ REVIEW-009 sobre `4a861e3`. La corrección conserva el preload, pero `/\\<script\\b[^>]*>/` y el selector de stylesheet cubren cualquier script u hoja de estilos, incluidos recursos externos futuros que podrían requerir CORS. La TASK pide actuar sobre los dos tags emitidos por Vite, no sobre el tipo de tag. Acotar ambos reemplazos a esos recursos locales, conservar el preload de fuente y solicitar re-review. El gate 🔴 requerirá después el sign-off de Clia.
>
> **[2026-09-10] dexia:** ✅ Re-review de `7b84ce7` aprobado. La eliminación de `crossorigin` y la conversión a `defer` se aplican sólo cuando `src` o `href` coincide con un archivo emitido por el bundle de Vite. Las URLs externas y los preloads no se modifican. La evidencia declarada mantiene tanto la comprobación servida como `file://`. Pendiente sólo el sign-off 🔴 de Clia.
