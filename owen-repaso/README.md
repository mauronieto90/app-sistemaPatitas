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

## 🧩 Arquitectura — el contenido vive aparte del código

El código de la app **no** tiene preguntas hardcodeadas. Todo el contenido está en archivos de datos:

```
owen-repaso/
├─ index.html          ← página principal
├─ css/styles.css      ← estilos (grande, colorido, responsive)
├─ js/app.js           ← MOTOR: navegación + cómo se juega cada tipo (NO contiene contenido)
└─ data/
   ├─ science.js       ← CONTENIDO de Science  (por término → tema)
   └─ english.js       ← CONTENIDO de English (por término → tema)
```

Estructura de los datos: **materia → término (`terms`) → tema (`topics`) → items/pairs/steps**.
Cada tema indica su `cycle` (ciclo) y su `gameType`.

### ➕ Cómo agregar temas nuevos (próximos ciclos o términos)

Solo se editan los archivos de `data/`. **No hay que tocar `app.js`.**
Añade un objeto `topic` dentro del `term` correspondiente:

```js
// Trivia / Completar
{ id:"nuevo-tema", title:"Título", emoji:"🌟", cycle:"Cycle 8", gameType:"trivia",
  instructions:"Instrucción para Owen en español.",
  items:[ { question:"Cat", emoji:"🐈", options:["Alive","Not alive"], answer:0 } ] }

// fill: usa "___" en la oración e "items" igual que trivia, pero con "sentence"
// matching / memory: usa "pairs": [ { a:"Palabra", b:"🍎" }, ... ]
// order: usa "prompt" y "steps": [ "Paso 1 🌰", "Paso 2 🌱", ... ]  (en orden correcto)
```

Para crear una **materia nueva**, copia un archivo de `data/`, cámbiale el `id`/`title`,
y enlázalo en `index.html` con un `<script src="data/loquesea.js"></script>`. La pantalla
principal la mostrará automáticamente.

## 📚 Contenido inicial

Generado a partir de `temas_science_ingles_owen.md` (Google Classroom del colegio),
cubriendo los temas candidatos listados para **Science** (Term 1 y 2) e **English** (Term 1 y 2).
El contenido de Science está en inglés (colegio bilingüe); las instrucciones de la app están en español.
