/* =========================================================================
   DATOS — SCIENCE (en inglés, como se enseña en el colegio bilingüe)
   -------------------------------------------------------------------------
   Este archivo SOLO contiene contenido (temas, preguntas, respuestas y el
   tipo de juego). No hay lógica de la app aquí. Para agregar temas nuevos
   de próximos ciclos o términos, edita/añade objetos "topic" a "terms".

   Tipos de juego disponibles (gameType):
     - "trivia"   -> items: [{ question, emoji?, options:[...], answer:Idx }]
     - "fill"     -> items: [{ sentence (usa "___"), emoji?, options, answer }]
     - "matching" -> pairs: [{ a:"palabra", b:"emoji o palabra" }]
     - "memory"   -> pairs: [{ a, b }]  (cada par genera 2 cartas)
     - "order"    -> prompt, steps:[...]  (en el ORDEN correcto)
   ========================================================================= */
window.OWEN_DATA = window.OWEN_DATA || {};
window.OWEN_DATA.science = {
  id: "science",
  title: "Science",
  emoji: "🔬",
  color: "green",
  intro: "Repasa Science en inglés, ¡como en el colegio!",
  terms: [
    {
      id: "t1",
      title: "Term 1",
      topics: [
        {
          id: "living-things",
          title: "Alive or Not Alive",
          emoji: "🌱",
          cycle: "Cycle 1–2",
          gameType: "trivia",
          instructions: "¿Está vivo o no está vivo? Toca la respuesta correcta.",
          items: [
            { question: "Dog", emoji: "🐕", options: ["Alive", "Not alive"], answer: 0 },
            { question: "Rock", emoji: "🪨", options: ["Alive", "Not alive"], answer: 1 },
            { question: "Tree", emoji: "🌳", options: ["Alive", "Not alive"], answer: 0 },
            { question: "Car", emoji: "🚗", options: ["Alive", "Not alive"], answer: 1 },
            { question: "Bird", emoji: "🐦", options: ["Alive", "Not alive"], answer: 0 },
            { question: "Chair", emoji: "🪑", options: ["Alive", "Not alive"], answer: 1 },
            { question: "Flower", emoji: "🌼", options: ["Alive", "Not alive"], answer: 0 },
            { question: "Ball", emoji: "⚽", options: ["Alive", "Not alive"], answer: 1 }
          ]
        },
        {
          id: "my-body",
          title: "My Body",
          emoji: "🧍",
          cycle: "Cycle 3",
          gameType: "memory",
          instructions: "Encuentra las parejas: la palabra en inglés y su dibujo.",
          pairs: [
            { a: "Hand", b: "✋" },
            { a: "Foot", b: "🦶" },
            { a: "Eye", b: "👁️" },
            { a: "Ear", b: "👂" },
            { a: "Nose", b: "👃" },
            { a: "Mouth", b: "👄" }
          ]
        },
        {
          id: "digestive-system",
          title: "Digestive System",
          emoji: "🍎",
          cycle: "Cycle 4",
          gameType: "order",
          instructions: "Ordena el camino de la comida dentro del cuerpo. ¡Toca en orden!",
          prompt: "¿Por dónde pasa la comida primero? 🍎",
          steps: ["Mouth 👄", "Esophagus 🫧", "Stomach 🫃", "Small intestine 🌀", "Large intestine ➿"]
        },
        {
          id: "five-senses",
          title: "The 5 Senses",
          emoji: "👀",
          cycle: "Cycle 5–7",
          gameType: "matching",
          instructions: "Empareja cada sentido con la parte del cuerpo que usamos.",
          pairs: [
            { a: "Sight (see)", b: "👁️" },
            { a: "Hearing (hear)", b: "👂" },
            { a: "Smell", b: "👃" },
            { a: "Taste", b: "👅" },
            { a: "Touch", b: "✋" }
          ]
        },
        {
          id: "tastes",
          title: "Tastes",
          emoji: "👅",
          cycle: "Cycle 7",
          gameType: "trivia",
          instructions: "¿A qué sabe? Elige: sweet (dulce), salty (salado), sour (ácido) o bitter (amargo).",
          items: [
            { question: "Candy", emoji: "🍬", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 0 },
            { question: "Lemon", emoji: "🍋", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 2 },
            { question: "Fries", emoji: "🍟", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 1 },
            { question: "Honey", emoji: "🍯", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 0 },
            { question: "Popcorn", emoji: "🍿", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 1 },
            { question: "Coffee", emoji: "☕", options: ["Sweet", "Salty", "Sour", "Bitter"], answer: 3 }
          ]
        }
      ]
    },
    {
      id: "t2",
      title: "Term 2",
      topics: [
        {
          id: "plant-parts",
          title: "Parts of a Plant",
          emoji: "🌿",
          cycle: "Cycle 1",
          gameType: "matching",
          instructions: "Empareja cada parte de la planta con su dibujo.",
          pairs: [
            { a: "Root", b: "🥕" },
            { a: "Stem", b: "🌿" },
            { a: "Leaf", b: "🍃" },
            { a: "Flower", b: "🌸" },
            { a: "Fruit", b: "🍎" }
          ]
        },
        {
          id: "plant-life-cycle",
          title: "Plant Life Cycle",
          emoji: "🌻",
          cycle: "Cycle 2",
          gameType: "order",
          instructions: "Ordena el ciclo de vida de la planta. ¡Toca en orden!",
          prompt: "¿Cómo crece una planta? 🌱",
          steps: ["Seed 🌰", "Sprout 🌱", "Plant 🪴", "Flower 🌸", "Fruit 🍎"]
        },
        {
          id: "water-bodies",
          title: "Water World",
          emoji: "🌊",
          cycle: "Cycle 4",
          gameType: "matching",
          instructions: "Empareja cada lugar con agua con un animal que vive ahí.",
          pairs: [
            { a: "Ocean", b: "🐋" },
            { a: "River", b: "🐟" },
            { a: "Lake", b: "🦆" },
            { a: "Pond", b: "🐸" }
          ]
        },
        {
          id: "day-night",
          title: "Day and Night",
          emoji: "🌗",
          cycle: "Cycle 5",
          gameType: "trivia",
          instructions: "¿Pasa de día o de noche? Toca la respuesta.",
          items: [
            { question: "The sun is up", emoji: "☀️", options: ["Day", "Night"], answer: 0 },
            { question: "We see stars", emoji: "⭐", options: ["Day", "Night"], answer: 1 },
            { question: "The moon shines", emoji: "🌙", options: ["Day", "Night"], answer: 1 },
            { question: "We go to sleep", emoji: "😴", options: ["Day", "Night"], answer: 1 },
            { question: "We go to school", emoji: "🎒", options: ["Day", "Night"], answer: 0 },
            { question: "We eat breakfast", emoji: "🥞", options: ["Day", "Night"], answer: 0 }
          ]
        },
        {
          id: "seasons",
          title: "The 4 Seasons",
          emoji: "🍂",
          cycle: "Cycle 6",
          gameType: "matching",
          instructions: "Empareja cada estación con su clima.",
          pairs: [
            { a: "Spring", b: "🌷" },
            { a: "Summer", b: "🌞" },
            { a: "Autumn", b: "🍂" },
            { a: "Winter", b: "⛄" }
          ]
        },
        {
          id: "forces",
          title: "Forces: Push & Pull",
          emoji: "💪",
          cycle: "Cycle 7",
          gameType: "trivia",
          instructions: "¿Es push (empujar) o pull (halar)? Toca la respuesta.",
          items: [
            { question: "Kicking a ball", emoji: "⚽", options: ["Push", "Pull"], answer: 0 },
            { question: "Opening a drawer", emoji: "🗄️", options: ["Push", "Pull"], answer: 1 },
            { question: "Pushing a swing", emoji: "🛝", options: ["Push", "Pull"], answer: 0 },
            { question: "Pulling a rope", emoji: "🪢", options: ["Push", "Pull"], answer: 1 },
            { question: "Pushing a cart", emoji: "🛒", options: ["Push", "Pull"], answer: 0 },
            { question: "A dog pulling the leash", emoji: "🐕", options: ["Push", "Pull"], answer: 1 }
          ]
        }
      ]
    }
  ]
};
