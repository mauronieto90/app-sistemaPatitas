# 🐾 Owen · Modo de Repaso

App web de juegos didácticos de repaso para **Owen** (Primero de primaria — Gimnasio Los Arrayanes Bilingüe).
Cubre las materias de **Science** e **English**. Sin login, sin cuentas: es solo para uso familiar.

## ▶️ Cómo abrirla

- **Fácil (offline):** abre `index.html` con doble clic en el navegador. Funciona sin internet
  (los datos se cargan como scripts, no requieren servidor).
- **En el celular:** publica la carpeta en cualquier hosting estático (por ejemplo GitHub Pages)
  y entra desde el navegador del teléfono. También puedes "Agregar a pantalla de inicio".

> Nota: se usa una fuente de Google Fonts para verse más bonita. Sin internet, el navegador
> usa una fuente parecida automáticamente; todo sigue funcionando.

## 🎮 Tipos de juego

| Tipo | `gameType` | Se usa para… |
|------|-----------|--------------|
| Trivia de opción múltiple | `trivia` | clasificar, preguntas rápidas |
| Completar espacios | `fill` | gramática, secuencias de números |
| Emparejar (matching) | `matching` | vocabulario palabra ↔ imagen |
| Memoria (memory cards) | `memory` | vocabulario, phonics |
| Ordenar secuencia | `order` | ciclo de vida de la planta, sistema digestivo |

Cada juego da **feedback inmediato** (correcto/incorrecto, colores y sonido suave) y un
**puntaje con estrellas** al final, con mensajes motivadores para un niño de 6–7 años.

**Modo Duolingo 🦉.** Cada materia es un **camino de nodos** (uno por tema, agrupados
por Term) que se desbloquean en orden. Cada tema acumula **coronas 👑 (0→3)**:
la 1ª lección se juega en Fácil, la 2ª en Medio y la 3ª en Difícil. Cada **lección
mezcla ejercicios** (completar, trivia, elegir imagen, escuchar 🔊 con voz en inglés,
emparejar y ordenar); los errores restan un **corazón ❤️** (5 por lección) y el
ejercicio se repite al final. El progreso — **XP ⚡, racha diaria 🔥 y coronas** —
se guarda en el dispositivo (localStorage), sin cuentas.

### 🖼️ Dibujos
La mayoría de dibujos son **emoji grandes** en tarjetas tipo flashcard. Para conceptos
que el emoji no representa bien (raíz, tallo, esófago, estómago, intestinos) se usan
**ilustraciones SVG** propias (`js/icons.js`), livianas y que funcionan sin internet.
En los datos se escriben como `"svg:root"`, `"svg:stomach"`, etc.

## 🧩 Arquitectura — el contenido vive aparte del código

El código de la app **no** tiene preguntas hardcodeadas. Todo el contenido está en archivos de datos:

```
owen-repaso/
├─ index.html          ← página principal
├─ css/styles.css      ← estilos (grande, colorido, responsive)
├─ js/app.js           ← MOTOR: navegación + cómo se juega cada tipo (NO contiene contenido)
├─ js/icons.js         ← dibujos SVG para conceptos sin buen emoji
└─ data/
   ├─ science.js       ← CONTENIDO de Science  (por término → tema → actividades)
   └─ english.js       ← CONTENIDO de English (por término → tema → actividades)
```

Estructura de los datos: **materia → término (`terms`) → tema (`topics`) → actividades
(`activities`)**. Cada tema indica su `cycle`; cada actividad tiene su `format`, su
`level` (Fácil/Medio/Difícil) y su contenido (`items` / `pairs` / `steps`).

### ➕ Cómo agregar temas o juegos nuevos (próximos ciclos o términos)

Solo se editan los archivos de `data/`. **No hay que tocar `app.js`.**
Añade un objeto `topic` (o una nueva actividad a un tema existente):

```js
{
  id:"nuevo-tema", title:"Título", emoji:"🌟", cycle:"Cycle 8",
  activities:[
    // Trivia / Completar
    { format:"trivia", level:"Fácil", instructions:"Instrucción en español.",
      items:[ { question:"Cat", img:"🐈", options:["Alive","Not alive"], answer:0 } ] },
    // fill: igual que trivia pero con "sentence" que incluye "___"
    // matching / memory: pairs:[ { a:"Palabra", b:"🍎" }, ... ]   (b puede ser "svg:root")
    // order: prompt:"...", steps:[ "Seed 🌰", "Sprout 🌱", ... ]   (en orden correcto)
  ]
}
```

`level` puede ser `"Fácil"`, `"Medio"` o `"Difícil"`. Las imágenes (`img` / `b` / `steps`)
pueden ser un emoji o `"svg:nombre"` (definido en `js/icons.js`).

Para crear una **materia nueva**, copia un archivo de `data/`, cámbiale el `id`/`title`,
y enlázalo en `index.html` con un `<script src="data/loquesea.js"></script>`. La pantalla
principal la mostrará automáticamente.

## 📚 Contenido inicial

Generado a partir de `temas_science_ingles_owen.md` (Google Classroom del colegio),
cubriendo los temas candidatos listados para **Science** (Term 1 y 2) e **English** (Term 1 y 2).
El contenido de Science está en inglés (colegio bilingüe); las instrucciones de la app están en español.
