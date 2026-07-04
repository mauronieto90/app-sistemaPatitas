/* =========================================================================
   DATOS — ENGLISH
   -------------------------------------------------------------------------
   Contenido de los juegos de Inglés. Mismo formato que science.js.
   Para agregar temas nuevos, añade objetos "topic" dentro de "terms".
   ========================================================================= */
window.OWEN_DATA = window.OWEN_DATA || {};
window.OWEN_DATA.english = {
  id: "english",
  title: "English",
  emoji: "🔤",
  color: "blue",
  intro: "Repasa tu inglés jugando. ¡Tú puedes!",
  terms: [
    {
      id: "t1",
      title: "Term 1",
      topics: [
        {
          id: "vocabulary",
          title: "Vocabulary",
          emoji: "🖼️",
          cycle: "Cycle 1",
          gameType: "matching",
          instructions: "Empareja cada palabra en inglés con su dibujo.",
          pairs: [
            { a: "Red", b: "🔴" },
            { a: "Blue", b: "🔵" },
            { a: "Cow", b: "🐄" },
            { a: "Lion", b: "🦁" },
            { a: "Apple", b: "🍎" },
            { a: "Fish", b: "🐟" }
          ]
        },
        {
          id: "counting",
          title: "Numbers 1–50",
          emoji: "🔢",
          cycle: "Cycle 1",
          gameType: "fill",
          instructions: "¿Qué número falta? Toca el número correcto.",
          items: [
            { sentence: "1, 2, 3, ___, 5", emoji: "🔢", options: ["4", "6", "8"], answer: 0 },
            { sentence: "10, 20, ___, 40", emoji: "🔟", options: ["25", "30", "35"], answer: 1 },
            { sentence: "5, 10, 15, ___", emoji: "🖐️", options: ["16", "20", "25"], answer: 1 },
            { sentence: "___, 20, 30, 40", emoji: "⬆️", options: ["5", "10", "15"], answer: 1 },
            { sentence: "2, 4, 6, ___", emoji: "✌️", options: ["7", "8", "9"], answer: 1 },
            { sentence: "40, 30, 20, ___", emoji: "⬇️", options: ["10", "15", "0"], answer: 0 }
          ]
        },
        {
          id: "pronouns-be",
          title: "Pronouns + To Be",
          emoji: "🙋",
          cycle: "Cycle 2–4",
          gameType: "fill",
          instructions: "Completa con am, is o are. Toca la palabra correcta.",
          items: [
            { sentence: "I ___ a boy.", emoji: "👦", options: ["am", "is", "are"], answer: 0 },
            { sentence: "You ___ my friend.", emoji: "🧒", options: ["am", "is", "are"], answer: 2 },
            { sentence: "He ___ happy.", emoji: "😀", options: ["am", "is", "are"], answer: 1 },
            { sentence: "She ___ tall.", emoji: "👧", options: ["am", "is", "are"], answer: 1 },
            { sentence: "It ___ a cat.", emoji: "🐈", options: ["am", "is", "are"], answer: 1 },
            { sentence: "We ___ friends.", emoji: "👫", options: ["am", "is", "are"], answer: 2 },
            { sentence: "They ___ sisters.", emoji: "👭", options: ["am", "is", "are"], answer: 2 }
          ]
        },
        {
          id: "can-cant",
          title: "Can / Can't",
          emoji: "💪",
          cycle: "Cycle 5",
          gameType: "trivia",
          instructions: "¿Puede pasar? Responde Yes o No.",
          items: [
            { question: "Can a bird fly?", emoji: "🐦", options: ["Yes", "No"], answer: 0 },
            { question: "Can a fish walk?", emoji: "🐟", options: ["Yes", "No"], answer: 1 },
            { question: "Can a dog run?", emoji: "🐕", options: ["Yes", "No"], answer: 0 },
            { question: "Can a car eat?", emoji: "🚗", options: ["Yes", "No"], answer: 1 },
            { question: "Can a cat jump?", emoji: "🐈", options: ["Yes", "No"], answer: 0 },
            { question: "Can a rock sing?", emoji: "🪨", options: ["Yes", "No"], answer: 1 }
          ]
        },
        {
          id: "feelings",
          title: "Feelings",
          emoji: "😀",
          cycle: "Cycle 6",
          gameType: "matching",
          instructions: "Empareja cada emoción con su cara.",
          pairs: [
            { a: "Happy", b: "😄" },
            { a: "Sad", b: "😢" },
            { a: "Angry", b: "😠" },
            { a: "Scared", b: "😱" },
            { a: "Sleepy", b: "😴" },
            { a: "Surprised", b: "😮" }
          ]
        },
        {
          id: "possessive",
          title: "Possessive Adjectives",
          emoji: "🎒",
          cycle: "Cycle 7",
          gameType: "fill",
          instructions: "¿De quién es? Completa con my, your, his, her o its.",
          items: [
            { sentence: "(I) This is ___ ball.", emoji: "⚽", options: ["my", "your", "his", "her", "its"], answer: 0 },
            { sentence: "(you) That is ___ dog.", emoji: "🐕", options: ["my", "your", "his", "her", "its"], answer: 1 },
            { sentence: "(he) He loves ___ mom.", emoji: "👦", options: ["my", "your", "his", "her", "its"], answer: 2 },
            { sentence: "(she) She has ___ book.", emoji: "👧", options: ["my", "your", "his", "her", "its"], answer: 3 },
            { sentence: "(it) The cat licks ___ paw.", emoji: "🐈", options: ["my", "your", "his", "her", "its"], answer: 4 }
          ]
        },
        {
          id: "phonics",
          title: "Phonics Sounds",
          emoji: "🔡",
          cycle: "Cycle 2–8",
          gameType: "memory",
          instructions: "Encuentra la letra y el dibujo que empieza con ese sonido.",
          pairs: [
            { a: "Aa", b: "🍎" },
            { a: "Bb", b: "⚽" },
            { a: "Cc", b: "🐈" },
            { a: "Dd", b: "🐕" },
            { a: "Ss", b: "☀️" },
            { a: "Ff", b: "🐟" }
          ]
        },
        {
          id: "layla-bots",
          title: "Layla & the Bots",
          emoji: "🤖",
          cycle: "Cycle 4–9",
          gameType: "matching",
          instructions: "Palabras de la historia. Empareja cada palabra con su dibujo.",
          pairs: [
            { a: "Robot", b: "🤖" },
            { a: "Fix", b: "🛠️" },
            { a: "Battery", b: "🔋" },
            { a: "Gear", b: "⚙️" },
            { a: "Light", b: "💡" },
            { a: "Rocket", b: "🚀" }
          ]
        }
      ]
    },
    {
      id: "t2",
      title: "Term 2",
      topics: [
        {
          id: "do-does",
          title: "Present Simple (Do/Does)",
          emoji: "❓",
          cycle: "Cycle 1–2",
          gameType: "fill",
          instructions: "Completa la pregunta con Do o Does.",
          items: [
            { sentence: "___ you like pizza?", emoji: "🍕", options: ["Do", "Does"], answer: 0 },
            { sentence: "___ he play soccer?", emoji: "⚽", options: ["Do", "Does"], answer: 1 },
            { sentence: "___ she read books?", emoji: "📚", options: ["Do", "Does"], answer: 1 },
            { sentence: "___ they run fast?", emoji: "🏃", options: ["Do", "Does"], answer: 0 },
            { sentence: "___ it rain a lot?", emoji: "🌧️", options: ["Do", "Does"], answer: 1 },
            { sentence: "___ we go now?", emoji: "🚶", options: ["Do", "Does"], answer: 0 }
          ]
        },
        {
          id: "present-continuous",
          title: "Present Continuous (-ing)",
          emoji: "🏃",
          cycle: "Cycle 4",
          gameType: "fill",
          instructions: "¿Qué está pasando ahora? Elige la forma con -ing.",
          items: [
            { sentence: "She is ___. (run)", emoji: "🏃‍♀️", options: ["run", "running", "runs"], answer: 1 },
            { sentence: "I am ___. (eat)", emoji: "🍽️", options: ["eat", "ate", "eating"], answer: 2 },
            { sentence: "They are ___. (play)", emoji: "🎮", options: ["playing", "play", "plays"], answer: 0 },
            { sentence: "He is ___. (sleep)", emoji: "😴", options: ["sleep", "sleeping", "slept"], answer: 1 },
            { sentence: "We are ___. (read)", emoji: "📖", options: ["read", "reads", "reading"], answer: 2 }
          ]
        },
        {
          id: "singular-plural",
          title: "Singular & Plural",
          emoji: "➕",
          cycle: "Cycle 5",
          gameType: "trivia",
          instructions: "Elige el plural correcto.",
          items: [
            { question: "One cat, two ___", emoji: "🐈", options: ["cats", "cates", "cat"], answer: 0 },
            { question: "One box, two ___", emoji: "📦", options: ["boxs", "boxes", "box"], answer: 1 },
            { question: "One baby, two ___", emoji: "👶", options: ["babys", "babies", "baby"], answer: 1 },
            { question: "One dog, two ___", emoji: "🐕", options: ["dogs", "doges", "dog"], answer: 0 },
            { question: "One bus, two ___", emoji: "🚌", options: ["buss", "buses", "bus"], answer: 1 },
            { question: "One fox, two ___", emoji: "🦊", options: ["foxs", "foxes", "fox"], answer: 1 }
          ]
        },
        {
          id: "proper-common",
          title: "Proper & Common Nouns",
          emoji: "🔤",
          cycle: "Cycle 6",
          gameType: "trivia",
          instructions: "¿Es proper noun (nombre propio, con mayúscula) o common noun?",
          items: [
            { question: "Owen", emoji: "🧒", options: ["Proper noun", "Common noun"], answer: 0 },
            { question: "dog", emoji: "🐕", options: ["Proper noun", "Common noun"], answer: 1 },
            { question: "Colombia", emoji: "🌎", options: ["Proper noun", "Common noun"], answer: 0 },
            { question: "city", emoji: "🏙️", options: ["Proper noun", "Common noun"], answer: 1 },
            { question: "Monday", emoji: "📅", options: ["Proper noun", "Common noun"], answer: 0 },
            { question: "school", emoji: "🏫", options: ["Proper noun", "Common noun"], answer: 1 }
          ]
        },
        {
          id: "simple-past-was",
          title: "Simple Past: Was",
          emoji: "⏳",
          cycle: "Cycle 7",
          gameType: "fill",
          instructions: "Completa la oración sobre el pasado con was.",
          items: [
            { sentence: "Yesterday it ___ sunny.", emoji: "☀️", options: ["was", "is", "are"], answer: 0 },
            { sentence: "I ___ at home.", emoji: "🏠", options: ["was", "were", "am"], answer: 0 },
            { sentence: "The dog ___ happy.", emoji: "🐕", options: ["was", "were", "is"], answer: 0 },
            { sentence: "It ___ a phone.", emoji: "📱", options: ["was", "were", "are"], answer: 0 },
            { sentence: "She ___ my teacher.", emoji: "👩‍🏫", options: ["was", "were", "is"], answer: 0 }
          ]
        }
      ]
    }
  ]
};
