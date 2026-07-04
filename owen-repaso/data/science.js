/* =========================================================================
   DATOS — SCIENCE (en inglés, como se enseña en el colegio bilingüe)
   -------------------------------------------------------------------------
   Cada TEMA tiene varias ACTIVIDADES (formato + nivel de dificultad).
   Solo contenido, sin lógica. Para agregar temas nuevos, añade objetos a
   "topics" (o actividades a "activities"). No hay que tocar el motor.

   activity.format:
     "trivia" / "fill"      -> items: [{ question|sentence, img?, options, answer }]
     "matching" / "memory"  -> pairs: [{ a:"palabra", b:"🍎" o "svg:root" }]
     "order"                -> prompt, steps:[ "Mouth 👄", "Stomach svg:stomach", ... ]
   Las imágenes pueden ser un emoji o "svg:nombre" (ver js/icons.js).
   ========================================================================= */
window.OWEN_DATA = window.OWEN_DATA || {};
window.OWEN_DATA.science = {
  id: "science",
  title: "Science",
  emoji: "🔬",
  color: "green",
  terms: [
    {
      id: "t1",
      title: "Term 1",
      topics: [
        {
          id: "living-things", title: "Alive or Not Alive", emoji: "🌱", cycle: "Cycle 1–2",
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "¿Está vivo o no está vivo? Toca la respuesta.",
              items: [
                { question: "Dog", img: "🐕", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Rock", img: "🪨", options: ["Alive", "Not alive"], answer: 1 },
                { question: "Tree", img: "🌳", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Car", img: "🚗", options: ["Alive", "Not alive"], answer: 1 },
                { question: "Bird", img: "🐦", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Chair", img: "🪑", options: ["Alive", "Not alive"], answer: 1 },
                { question: "Flower", img: "🌼", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Ball", img: "⚽", options: ["Alive", "Not alive"], answer: 1 }
              ]
            },
            {
              format: "memory", level: "Medio",
              instructions: "Encuentra las parejas: la palabra y su dibujo de seres vivos.",
              pairs: [
                { a: "Dog", b: "🐕" }, { a: "Cat", b: "🐈" }, { a: "Tree", b: "🌳" },
                { a: "Bird", b: "🐦" }, { a: "Fish", b: "🐟" }, { a: "Butterfly", b: "🦋" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Estas son más difíciles. ¿Vivo o no vivo?",
              items: [
                { question: "Egg (baby inside)", img: "🥚", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Cloud", img: "☁️", options: ["Alive", "Not alive"], answer: 1 },
                { question: "Seed", img: "🌰", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Teddy bear", img: "🧸", options: ["Alive", "Not alive"], answer: 1 },
                { question: "Mushroom", img: "🍄", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Phone", img: "📱", options: ["Alive", "Not alive"], answer: 1 },
                { question: "Grass", img: "🌱", options: ["Alive", "Not alive"], answer: 0 },
                { question: "Candle", img: "🕯️", options: ["Alive", "Not alive"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "my-body", title: "My Body", emoji: "🧍", cycle: "Cycle 3",
          activities: [
            {
              format: "memory", level: "Fácil",
              instructions: "Encuentra la parte del cuerpo y su dibujo.",
              pairs: [
                { a: "Hand", b: "✋" }, { a: "Foot", b: "🦶" }, { a: "Eye", b: "👁️" },
                { a: "Ear", b: "👂" }, { a: "Nose", b: "👃" }, { a: "Mouth", b: "👄" }
              ]
            },
            {
              format: "matching", level: "Medio",
              instructions: "Empareja cada parte del cuerpo con su dibujo.",
              pairs: [
                { a: "Eye", b: "👁️" }, { a: "Ear", b: "👂" }, { a: "Nose", b: "👃" },
                { a: "Mouth", b: "👄" }, { a: "Hand", b: "✋" }, { a: "Foot", b: "🦶" },
                { a: "Tooth", b: "🦷" }, { a: "Tongue", b: "👅" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "¿Qué parte del cuerpo usamos? Toca la respuesta.",
              items: [
                { question: "You SEE with your…", img: "👁️", options: ["Eyes", "Ears", "Feet"], answer: 0 },
                { question: "You HEAR with your…", img: "👂", options: ["Hands", "Ears", "Nose"], answer: 1 },
                { question: "You SMELL with your…", img: "👃", options: ["Nose", "Mouth", "Eyes"], answer: 0 },
                { question: "You WALK with your…", img: "🦶", options: ["Hands", "Feet", "Ears"], answer: 1 },
                { question: "You TASTE with your…", img: "👅", options: ["Tongue", "Nose", "Hair"], answer: 0 },
                { question: "You CLAP with your…", img: "👏", options: ["Feet", "Hands", "Eyes"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "digestive-system", title: "Digestive System", emoji: "🍎", cycle: "Cycle 4",
          activities: [
            {
              format: "order", level: "Fácil",
              instructions: "Ordena el camino de la comida. ¡Toca en orden!",
              prompt: "¿Por dónde pasa la comida? 🍎",
              steps: ["Mouth 👄", "Stomach svg:stomach", "Intestine svg:intestineSmall"]
            },
            {
              format: "trivia", level: "Medio",
              instructions: "Preguntas sobre la digestión. Toca la respuesta.",
              items: [
                { question: "We CHEW food with our…", img: "👄", options: ["Teeth", "Stomach", "Nose"], answer: 0 },
                { question: "Food goes down a tube called the…", img: "svg:esophagus", options: ["Esophagus", "Nose", "Ear"], answer: 0 },
                { question: "Food is crushed in the…", img: "svg:stomach", options: ["Stomach", "Mouth", "Eye"], answer: 0 },
                { question: "We TASTE food with our…", img: "👅", options: ["Tongue", "Foot", "Eye"], answer: 0 },
                { question: "Food goes into the long…", img: "svg:intestineSmall", options: ["Intestine", "Hand", "Hair"], answer: 0 }
              ]
            },
            {
              format: "order", level: "Difícil",
              instructions: "Ordena TODO el sistema digestivo. ¡Toca en orden!",
              prompt: "El camino completo de la comida 🍎",
              steps: ["Mouth 👄", "Esophagus svg:esophagus", "Stomach svg:stomach", "Small intestine svg:intestineSmall", "Large intestine svg:intestineLarge"]
            }
          ]
        },
        {
          id: "five-senses", title: "The 5 Senses", emoji: "👀", cycle: "Cycle 5–7",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Empareja cada sentido con la parte del cuerpo.",
              pairs: [
                { a: "Sight", b: "👁️" }, { a: "Hearing", b: "👂" }, { a: "Smell", b: "👃" },
                { a: "Taste", b: "👅" }, { a: "Touch", b: "✋" }
              ]
            },
            {
              format: "trivia", level: "Medio",
              instructions: "¿Qué sentido usamos? Toca la respuesta.",
              items: [
                { question: "A rainbow", img: "🌈", options: ["Sight", "Hearing", "Smell", "Taste", "Touch"], answer: 0 },
                { question: "Music", img: "🎵", options: ["Sight", "Hearing", "Smell", "Taste", "Touch"], answer: 1 },
                { question: "A flower's scent", img: "🌸", options: ["Sight", "Hearing", "Smell", "Taste", "Touch"], answer: 2 },
                { question: "Ice cream", img: "🍦", options: ["Sight", "Hearing", "Smell", "Taste", "Touch"], answer: 3 },
                { question: "A soft cat", img: "🐈", options: ["Sight", "Hearing", "Smell", "Taste", "Touch"], answer: 4 },
                { question: "A loud drum", img: "🥁", options: ["Sight", "Hearing", "Smell", "Taste", "Touch"], answer: 1 }
              ]
            },
            {
              format: "memory", level: "Difícil",
              instructions: "Encuentra el sentido y el órgano que usamos.",
              pairs: [
                { a: "See", b: "👁️" }, { a: "Hear", b: "👂" }, { a: "Smell", b: "👃" },
                { a: "Taste", b: "👅" }, { a: "Touch", b: "✋" }
              ]
            }
          ]
        },
        {
          id: "tastes", title: "Tastes", emoji: "👅", cycle: "Cycle 7",
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "¿Sweet (dulce) o salty (salado)? Toca la respuesta.",
              items: [
                { question: "Candy", img: "🍬", options: ["Sweet", "Salty"], answer: 0 },
                { question: "Fries", img: "🍟", options: ["Sweet", "Salty"], answer: 1 },
                { question: "Cake", img: "🍰", options: ["Sweet", "Salty"], answer: 0 },
                { question: "Popcorn", img: "🍿", options: ["Sweet", "Salty"], answer: 1 },
                { question: "Honey", img: "🍯", options: ["Sweet", "Salty"], answer: 0 },
                { question: "Pretzel", img: "🥨", options: ["Sweet", "Salty"], answer: 1 }
              ]
            },
            {
              format: "matching", level: "Medio",
              instructions: "Empareja cada comida con su dibujo.",
              pairs: [
                { a: "Lemon", b: "🍋" }, { a: "Candy", b: "🍬" }, { a: "Honey", b: "🍯" },
                { a: "Fries", b: "🍟" }, { a: "Coffee", b: "☕" }, { a: "Cake", b: "🍰" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Los 4 sabores: sweet, salty, sour (ácido), bitter (amargo).",
              items: [
                { question: "Lemon", img: "🍋", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 2 },
                { question: "Coffee", img: "☕", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 3 },
                { question: "Candy", img: "🍬", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 0 },
                { question: "Fries", img: "🍟", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 1 },
                { question: "Dark chocolate", img: "🍫", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 3 },
                { question: "Orange", img: "🍊", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 0 },
                { question: "Pretzel", img: "🥨", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 1 },
                { question: "Pickle", img: "🥒", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 2 }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "t2",
      title: "Term 2",
      topics: [
        {
          id: "plant-parts", title: "Parts of a Plant", emoji: "🌿", cycle: "Cycle 1",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Empareja cada parte de la planta con su dibujo.",
              pairs: [
                { a: "Root", b: "svg:root" }, { a: "Stem", b: "svg:stem" }, { a: "Leaf", b: "🍃" },
                { a: "Flower", b: "🌸" }, { a: "Fruit", b: "🍎" }
              ]
            },
            {
              format: "memory", level: "Medio",
              instructions: "Encuentra la parte de la planta y su dibujo.",
              pairs: [
                { a: "Root", b: "svg:root" }, { a: "Stem", b: "svg:stem" }, { a: "Leaf", b: "🍃" },
                { a: "Flower", b: "🌸" }, { a: "Fruit", b: "🍎" }, { a: "Seed", b: "🌰" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "¿Qué parte de la planta es? Toca la respuesta.",
              items: [
                { question: "Holds the plant in the soil", img: "svg:root", options: ["Root", "Stem", "Leaf", "Flower", "Fruit"], answer: 0 },
                { question: "Green and flat, makes food", img: "🍃", options: ["Root", "Stem", "Leaf", "Flower", "Fruit"], answer: 2 },
                { question: "Colorful, turns into a fruit", img: "🌸", options: ["Root", "Stem", "Leaf", "Flower", "Fruit"], answer: 3 },
                { question: "Carries water up the plant", img: "svg:stem", options: ["Root", "Stem", "Leaf", "Flower", "Fruit"], answer: 1 },
                { question: "Has seeds inside", img: "🍎", options: ["Root", "Stem", "Leaf", "Flower", "Fruit"], answer: 4 }
              ]
            }
          ]
        },
        {
          id: "plant-life-cycle", title: "Plant Life Cycle", emoji: "🌻", cycle: "Cycle 2",
          activities: [
            {
              format: "order", level: "Fácil",
              instructions: "Ordena cómo crece la planta. ¡Toca en orden!",
              prompt: "Del más pequeño al más grande 🌱",
              steps: ["Seed 🌰", "Sprout 🌱", "Plant 🪴"]
            },
            {
              format: "trivia", level: "Medio",
              instructions: "¿Qué necesita una planta? Toca la respuesta.",
              items: [
                { question: "A seed grows into a…", img: "🌱", options: ["Sprout", "Rock", "Fish"], answer: 0 },
                { question: "Plants need light from the…", img: "☀️", options: ["Sun", "Moon", "TV"], answer: 0 },
                { question: "Plants drink…", img: "💧", options: ["Water", "Milk", "Soda"], answer: 0 },
                { question: "Plants grow in the…", img: "🟫", options: ["Soil", "Sky", "Car"], answer: 0 },
                { question: "After the flower comes the…", img: "🍎", options: ["Fruit", "Seed", "Leaf"], answer: 0 }
              ]
            },
            {
              format: "order", level: "Difícil",
              instructions: "Ordena TODO el ciclo de vida. ¡Toca en orden!",
              prompt: "El ciclo completo de la planta 🌻",
              steps: ["Seed 🌰", "Sprout 🌱", "Plant 🪴", "Flower 🌸", "Fruit 🍎"]
            }
          ]
        },
        {
          id: "water-bodies", title: "Water World", emoji: "🌊", cycle: "Cycle 4",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Empareja el lugar con agua y un animal que vive ahí.",
              pairs: [
                { a: "Ocean", b: "🐋" }, { a: "River", b: "🐟" }, { a: "Lake", b: "🦆" }, { a: "Pond", b: "🐸" }
              ]
            },
            {
              format: "matching", level: "Medio",
              instructions: "Empareja cada lugar con agua con su animal.",
              pairs: [
                { a: "Ocean", b: "🐋" }, { a: "Sea", b: "🐠" }, { a: "River", b: "🐟" },
                { a: "Lake", b: "🦆" }, { a: "Pond", b: "🐸" }, { a: "Swamp", b: "🐊" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "¿Dónde vive cada animal? Toca la respuesta.",
              items: [
                { question: "A whale lives in the…", img: "🐋", options: ["Ocean", "River", "Lake", "Pond", "Swamp"], answer: 0 },
                { question: "A frog lives in a…", img: "🐸", options: ["Ocean", "River", "Lake", "Pond", "Swamp"], answer: 3 },
                { question: "A duck swims in a…", img: "🦆", options: ["Ocean", "River", "Lake", "Pond", "Swamp"], answer: 2 },
                { question: "A crocodile lives in a…", img: "🐊", options: ["Ocean", "River", "Lake", "Pond", "Swamp"], answer: 4 },
                { question: "A shark lives in the…", img: "🦈", options: ["Ocean", "River", "Lake", "Pond", "Swamp"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "day-night", title: "Day and Night", emoji: "🌗", cycle: "Cycle 5",
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "¿Pasa de día o de noche? Toca la respuesta.",
              items: [
                { question: "The sun is up", img: "☀️", options: ["Day", "Night"], answer: 0 },
                { question: "We see stars", img: "⭐", options: ["Day", "Night"], answer: 1 },
                { question: "The moon shines", img: "🌙", options: ["Day", "Night"], answer: 1 },
                { question: "We go to sleep", img: "😴", options: ["Day", "Night"], answer: 1 },
                { question: "We go to school", img: "🎒", options: ["Day", "Night"], answer: 0 },
                { question: "We eat breakfast", img: "🥞", options: ["Day", "Night"], answer: 0 }
              ]
            },
            {
              format: "matching", level: "Medio",
              instructions: "Empareja cada cosa del cielo con su dibujo.",
              pairs: [
                { a: "Sun", b: "☀️" }, { a: "Moon", b: "🌙" }, { a: "Star", b: "⭐" },
                { a: "Cloud", b: "☁️" }, { a: "Rainbow", b: "🌈" }, { a: "Night", b: "🌃" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Más difíciles. ¿De día o de noche?",
              items: [
                { question: "Owls hunt", img: "🦉", options: ["Day", "Night"], answer: 1 },
                { question: "The rooster crows", img: "🐓", options: ["Day", "Night"], answer: 0 },
                { question: "The sky is dark", img: "🌌", options: ["Day", "Night"], answer: 1 },
                { question: "We use a flashlight", img: "🔦", options: ["Day", "Night"], answer: 1 },
                { question: "Kids play at the park", img: "🛝", options: ["Day", "Night"], answer: 0 },
                { question: "Bats fly out", img: "🦇", options: ["Day", "Night"], answer: 1 },
                { question: "We eat lunch", img: "🍱", options: ["Day", "Night"], answer: 0 },
                { question: "We say goodnight", img: "🌙", options: ["Day", "Night"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "seasons", title: "The 4 Seasons", emoji: "🍂", cycle: "Cycle 6",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Empareja cada estación con su dibujo.",
              pairs: [
                { a: "Spring", b: "🌷" }, { a: "Summer", b: "🌞" }, { a: "Autumn", b: "🍂" }, { a: "Winter", b: "⛄" }
              ]
            },
            {
              format: "trivia", level: "Medio",
              instructions: "¿De qué estación hablamos? Toca la respuesta.",
              items: [
                { question: "It snows", img: "❄️", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 3 },
                { question: "Flowers bloom", img: "🌷", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 0 },
                { question: "Very hot, we go to the beach", img: "🏖️", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 1 },
                { question: "Leaves fall from trees", img: "🍂", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 2 },
                { question: "We wear a warm coat", img: "🧥", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 3 },
                { question: "We wear shorts", img: "🩳", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 1 }
              ]
            },
            {
              format: "memory", level: "Difícil",
              instructions: "Encuentra la palabra del clima y su dibujo.",
              pairs: [
                { a: "Spring", b: "🌷" }, { a: "Summer", b: "🌞" }, { a: "Autumn", b: "🍂" },
                { a: "Winter", b: "⛄" }, { a: "Rain", b: "🌧️" }, { a: "Snow", b: "❄️" }
              ]
            }
          ]
        },
        {
          id: "forces", title: "Forces: Push & Pull", emoji: "💪", cycle: "Cycle 7",
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "¿Es push (empujar) o pull (halar)? Toca la respuesta.",
              items: [
                { question: "Kicking a ball", img: "⚽", options: ["Push", "Pull"], answer: 0 },
                { question: "Opening a drawer", img: "🗄️", options: ["Push", "Pull"], answer: 1 },
                { question: "Pushing a swing", img: "🛝", options: ["Push", "Pull"], answer: 0 },
                { question: "Pulling a rope", img: "🪢", options: ["Push", "Pull"], answer: 1 },
                { question: "Pushing a cart", img: "🛒", options: ["Push", "Pull"], answer: 0 },
                { question: "A dog pulling the leash", img: "🐕", options: ["Push", "Pull"], answer: 1 }
              ]
            },
            {
              format: "matching", level: "Medio",
              instructions: "Empareja cada acción (fuerza) con su dibujo.",
              pairs: [
                { a: "Kick", b: "⚽" }, { a: "Throw", b: "🏀" }, { a: "Push", b: "🛒" },
                { a: "Pull", b: "🪢" }, { a: "Spin", b: "🌀" }, { a: "Bounce", b: "⛹️" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Más acciones. ¿Push o Pull?",
              items: [
                { question: "Open a door toward you", img: "🚪", options: ["Push", "Pull"], answer: 1 },
                { question: "Close a door", img: "🚪", options: ["Push", "Pull"], answer: 0 },
                { question: "Pull a wagon", img: "🛒", options: ["Push", "Pull"], answer: 1 },
                { question: "Kick a ball", img: "⚽", options: ["Push", "Pull"], answer: 0 },
                { question: "Press a button", img: "🔘", options: ["Push", "Pull"], answer: 0 },
                { question: "Reel in a fishing line", img: "🎣", options: ["Push", "Pull"], answer: 1 },
                { question: "Push a friend on a swing", img: "🛝", options: ["Push", "Pull"], answer: 0 },
                { question: "Tug of war", img: "🪢", options: ["Push", "Pull"], answer: 1 }
              ]
            }
          ]
        }
      ]
    }
  ]
};
