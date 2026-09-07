# Assets, iconos y fuentes

## Dónde vive cada cosa

```text
src/assets/
├── fonts/    TTF de origen y los WOFF2 que genera `pnpm font:subset`
├── icons/    SVG fuente del sprite; el sprite se genera, no se edita
└── images/   Imágenes agrupadas por componente o función
```

Las referencias se escriben como `/src/assets/…` y las corrige el build. Nunca
se apunta a `dist/`.

## Bajar los assets del diseño

Una **persona** exporta desde la interfaz de Figma y guarda el archivo en
`src/assets/`. Esa exportación sale limpia: sólo la capa seleccionada.

Un **agente** no tiene esa interfaz: obtiene los assets por el MCP de Figma, que
devuelve URLs temporales y envuelve cada export en el contexto de la página —un
rect opaco, el del artboard, los de la tarjeta contenedora—. Guardados tal cual,
el icono se pinta sobre una caja sólida. Para eso está `pnpm figma:assets`: lee
`figma-assets.json`, descarga y limpia.

```json
{
    "file": "<fileKey>",
    "assets": [
        {
            "nodeId": "171:405",
            "asset": "98ffeb0f-7186-4a0c-ab8d-03fd3e5cd9d7.svg",
            "target": "src/assets/icons/icon-phone.svg",
            "currentColor": true
        }
    ]
}
```

El `fileKey` sale de la URL del diseño —`figma.com/design/:fileKey/:nombre`— y es
lo que permite resolver las descargas por la API REST. Con `FIGMA_TOKEN` en el
entorno las URLs dejan de caducar:

```bash
export FIGMA_TOKEN=figd_...
```

El token se saca en *Settings → Security → Personal access tokens*, basta con
lectura de contenido y caduca a los 90 días como mucho. Si falta o no vale, el
comando lo dice y vuelve a las URLs del manifiesto; no cancela nada.

Ajustes por asset:

| Campo          | Cuándo se usa                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| `currentColor` | Iconos del sprite que deben heredar el color del componente.                                               |
| `onlyPaths`    | Iconos del sprite: descarta rellenos fijos y los filtros que Figma arrastra del contenedor.                |
| `keepGroup`    | Lo que sobra no es un rect sino una forma que la limpieza genérica no distingue de la ilustración.         |
| `dropGroup`    | El nodo que interesa es el frame menos una de sus partes.                                                  |
| `strip: false` | El export debe conservarse íntegro.                                                                        |

La extensión del `target` decide el formato que se le pide a Figma. Iconos y
logotipos en `.svg`. Una ilustración que haya que rasterizar, en **`.png`**: es
sin pérdida y `pnpm optimize` genera el WebP desde un original limpio en vez de
heredar los artefactos de una compresión previa. El `.jpg` queda para
fotografía.

La regla que lo sostiene: entre `pnpm figma:assets` y `pnpm optimize` **no puede
quedar ningún paso manual**. Si un asset se declara en SVG y alguien lo rasteriza
a mano, ese archivo intermedio no lo regenera nadie: en un clon limpio el WebP no
existe y `pnpm validate` cancela el build. Por eso cada variante que el marcado
consume —1x y 2x, desktop y mobile— necesita su propia entrada, aunque salgan del
mismo nodo.

Conviene comprobar que ningún asset queda invisible después de limpiarlo, no sólo
que el archivo existe. Eso lo hace `pnpm verify:render`.

## Sprite SVG

Los iconos fuente van en `src/assets/icons/`; el sprite se genera en
`src/assets/images/sprite.svg` y no se edita.

```pug
+svgIcon('phone', 'size-5 text-brand')
```

El generador ya prefija los símbolos, así que el identificador de
`icon-phone.svg` es `#icon-phone` y la llamada correcta es `+svgIcon('phone')`.
Pasar `'icon-phone'` genera `#icon-icon-phone`: una referencia rota que ningún
linter detecta porque el atributo es dinámico.

Los SVG que no necesitan heredar color ni formar parte del sistema de iconos se
mantienen como imágenes independientes.

## Fuentes

```bash
python -m pip install -r requirements-fonts.txt
pnpm font:subset
```

Convierte los TTF de `src/assets/fonts/` a WOFF2 con subset latino ampliado. Los
TTF de origen se versionan junto a los WOFF2: sin ellos nadie puede regenerar las
fuentes.

El resultado es **un WOFF2 por peso y estilo**, ya recortado. No traer
subconjuntos partidos por rango de caracteres, como los `latin` y `latin-ext` que
sirve Google Fonts: duplican archivos y obligan a declarar `unicode-range` en
`@font-face`, que aquí sobra porque el recorte ya lo hizo el comando.

Después de generar una fuente:

1. declarar su `@font-face` en `src/styles/styles.css`;
2. apuntar `--font-main` o `--font-aux` a esa familia;
3. añadirla al array `fonts` de `head.pug` sólo si es crítica para el primer
   viewport;
4. ejecutar `pnpm validate` y `pnpm verify:render`;
5. probar con contenido real, signos y textos legales.
