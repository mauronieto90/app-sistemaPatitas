/* =========================================================================
   DATOS — ENGLISH
   -------------------------------------------------------------------------
   Mismo formato que science.js: "activities" (trivia/fill/order) + un banco
   "pairs" compartido que genera Emparejar y Memoria en cada nivel.
   Las parejas pueden ser palabra↔dibujo o palabra↔palabra (ej. sujeto↔auxiliar).
   ========================================================================= */
window.OWEN_DATA = window.OWEN_DATA || {};
window.OWEN_DATA.english = {
  id: "english", title: "English", emoji: "🔤", color: "blue",
  terms: [
    {
      id: "t1", title: "Term 1",
      topics: [
        {
          id: "vocabulary", title: "Vocabulary", emoji: "🖼️", cycle: "Cycle 1",
          pairsInstr: "Empareja cada palabra con su dibujo.",
          pairs: [
            { a: "Red", b: "🔴" }, { a: "Blue", b: "🔵" }, { a: "Green", b: "🟢" }, { a: "Yellow", b: "🟡" },
            { a: "Cow", b: "🐄" }, { a: "Lion", b: "🦁" }, { a: "Dog", b: "🐕" }, { a: "Duck", b: "🦆" },
            { a: "Apple", b: "🍎" }, { a: "Banana", b: "🍌" }, { a: "Fish", b: "🐟" }, { a: "Cat", b: "🐈" },
            { a: "Elephant", b: "🐘" }, { a: "Monkey", b: "🐒" }
          ],
          activities: []
        },
        {
          id: "counting", title: "Numbers 1–50", emoji: "🔢", cycle: "Cycle 1",
          pairsInstr: "Empareja el número con su palabra.",
          pairs: [
            { a: "One", b: "1" }, { a: "Two", b: "2" }, { a: "Three", b: "3" }, { a: "Four", b: "4" },
            { a: "Five", b: "5" }, { a: "Ten", b: "10" }, { a: "Twenty", b: "20" }
          ],
          activities: [
            {
              format: "fill", level: "Fácil", instructions: "¿Qué número falta?",
              items: [
                { sentence: "1, 2, 3, ___, 5", img: "🔢", options: ["4", "6", "8"], answer: 0 },
                { sentence: "2, 3, ___, 5", img: "🔢", options: ["4", "1", "7"], answer: 0 },
                { sentence: "6, 7, 8, ___", img: "🔢", options: ["9", "10", "5"], answer: 0 },
                { sentence: "1, ___, 3, 4", img: "🔢", options: ["2", "5", "9"], answer: 0 },
                { sentence: "8, 9, ___", img: "🔢", options: ["10", "7", "12"], answer: 0 },
                { sentence: "3, 4, 5, ___", img: "🔢", options: ["6", "2", "9"], answer: 0 },
                { sentence: "___, 2, 3, 4", img: "🔢", options: ["1", "5", "8"], answer: 0 },
                { sentence: "7, 8, ___, 10", img: "🔢", options: ["9", "6", "11"], answer: 0 }
              ]
            },
            {
              format: "trivia", level: "Medio", instructions: "¿Qué número sigue?",
              items: [
                { question: "After 10 comes…", img: "🔟", options: ["11", "20", "9"], answer: 0 },
                { question: "After 19 comes…", img: "🔢", options: ["20", "21", "18"], answer: 0 },
                { question: "After 29 comes…", img: "🔢", options: ["30", "40", "28"], answer: 0 },
                { question: "Count by 10: 30 then…", img: "🔢", options: ["40", "35", "31"], answer: 0 },
                { question: "After 9 comes…", img: "🔢", options: ["10", "11", "8"], answer: 0 },
                { question: "Before 20 is…", img: "🔢", options: ["19", "21", "10"], answer: 0 },
                { question: "Count by 5: 15 then…", img: "🖐️", options: ["20", "16", "25"], answer: 0 },
                { question: "After 25 comes…", img: "🔢", options: ["26", "30", "24"], answer: 0 }
              ]
            },
            {
              format: "order", level: "Difícil", instructions: "Ordena los números de menor a mayor. ¡Toca en orden!",
              prompt: "Cuenta de 10 en 10 🔢", steps: ["10", "20", "30", "40", "50"]
            }
          ]
        },
        {
          id: "pronouns-be", title: "Pronouns + To Be", emoji: "🙋", cycle: "Cycle 2–4",
          pairsInstr: "Empareja el pronombre con su dibujo.",
          pairs: [
            { a: "I", b: "🙋" }, { a: "You", b: "👉" }, { a: "He", b: "👦" }, { a: "She", b: "👧" },
            { a: "It", b: "🐱" }, { a: "We", b: "🧑‍🤝‍🧑" }, { a: "They", b: "👨‍👩‍👧‍👦" }
          ],
          activities: [
            {
              format: "fill", level: "Fácil", instructions: "Completa con am, is o are.",
              items: [
                { sentence: "I ___ a boy.", img: "👦", options: ["am", "is", "are"], answer: 0 },
                { sentence: "You ___ happy.", img: "🙂", options: ["am", "is", "are"], answer: 2 },
                { sentence: "He ___ tall.", img: "👦", options: ["am", "is", "are"], answer: 1 },
                { sentence: "She ___ nice.", img: "👧", options: ["am", "is", "are"], answer: 1 },
                { sentence: "It ___ a cat.", img: "🐈", options: ["am", "is", "are"], answer: 1 },
                { sentence: "We ___ friends.", img: "🧑‍🤝‍🧑", options: ["am", "is", "are"], answer: 2 },
                { sentence: "They ___ sisters.", img: "👭", options: ["am", "is", "are"], answer: 2 },
                { sentence: "The dog ___ big.", img: "🐕", options: ["am", "is", "are"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Medio", instructions: "¿Cuál está bien escrita?",
              items: [
                { question: "Choose the correct one:", img: "👦", options: ["He are happy", "He is happy"], answer: 1 },
                { question: "Choose the correct one:", img: "👬", options: ["They are friends", "They is friends"], answer: 0 },
                { question: "Choose the correct one:", img: "6️⃣", options: ["I is six", "I am six"], answer: 1 },
                { question: "Choose the correct one:", img: "👧", options: ["She is tall", "She are tall"], answer: 0 },
                { question: "Choose the correct one:", img: "🧑‍🤝‍🧑", options: ["We is a team", "We are a team"], answer: 1 },
                { question: "Choose the correct one:", img: "🐈", options: ["It is a cat", "It are a cat"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Difícil", instructions: "Preguntas y frases negativas. Elige la palabra correcta.",
              items: [
                { sentence: "___ she your sister?", img: "❓", options: ["Is", "Are", "Am"], answer: 0 },
                { sentence: "___ they friends?", img: "👨‍👩‍👧‍👦", options: ["Is", "Are", "Am"], answer: 1 },
                { sentence: "___ I late?", img: "❓", options: ["Is", "Are", "Am"], answer: 2 },
                { sentence: "She is ___ a boy.", img: "🚫", options: ["not", "no", "are"], answer: 0 },
                { sentence: "We ___ not ready.", img: "🧑‍🤝‍🧑", options: ["is", "are", "am"], answer: 1 },
                { sentence: "It ___ not big.", img: "🚫", options: ["is", "are", "am"], answer: 0 },
                { sentence: "___ you happy?", img: "🙂", options: ["Are", "Is", "Am"], answer: 0 },
                { sentence: "They ___ not here.", img: "👬", options: ["is", "are", "am"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "can-cant", title: "Can / Can't", emoji: "💪", cycle: "Cycle 5",
          pairsInstr: "Empareja el animal con su dibujo.",
          pairs: [
            { a: "Bird", b: "🐦" }, { a: "Fish", b: "🐟" }, { a: "Dog", b: "🐕" }, { a: "Cat", b: "🐈" },
            { a: "Frog", b: "🐸" }, { a: "Snake", b: "🐍" }, { a: "Kangaroo", b: "🦘" }, { a: "Cheetah", b: "🐆" }
          ],
          activities: [
            {
              format: "trivia", level: "Fácil", instructions: "¿Puede pasar? Responde Yes o No.",
              items: [
                { question: "Can a bird fly?", img: "🐦", options: ["Yes", "No"], answer: 0 },
                { question: "Can a fish walk?", img: "🐟", options: ["Yes", "No"], answer: 1 },
                { question: "Can a dog run?", img: "🐕", options: ["Yes", "No"], answer: 0 },
                { question: "Can a car eat?", img: "🚗", options: ["Yes", "No"], answer: 1 },
                { question: "Can a cat jump?", img: "🐈", options: ["Yes", "No"], answer: 0 },
                { question: "Can a rock sing?", img: "🪨", options: ["Yes", "No"], answer: 1 },
                { question: "Can a duck swim?", img: "🦆", options: ["Yes", "No"], answer: 0 },
                { question: "Can a chair talk?", img: "🪑", options: ["Yes", "No"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Medio", instructions: "Completa con can o can't.",
              items: [
                { sentence: "A bird ___ fly.", img: "🐦", options: ["can", "can't"], answer: 0 },
                { sentence: "A fish ___ walk.", img: "🐟", options: ["can", "can't"], answer: 1 },
                { sentence: "A kangaroo ___ jump.", img: "🦘", options: ["can", "can't"], answer: 0 },
                { sentence: "A pig ___ fly.", img: "🐷", options: ["can", "can't"], answer: 1 },
                { sentence: "A monkey ___ climb.", img: "🐒", options: ["can", "can't"], answer: 0 },
                { sentence: "A turtle ___ run fast.", img: "🐢", options: ["can", "can't"], answer: 1 },
                { sentence: "A dog ___ bark.", img: "🐕", options: ["can", "can't"], answer: 0 },
                { sentence: "A cow ___ fly.", img: "🐄", options: ["can", "can't"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil", instructions: "¿Qué SÍ puede hacer?",
              items: [
                { question: "A fish can…", img: "🐟", options: ["swim", "fly", "walk"], answer: 0 },
                { question: "A bird can…", img: "🐦", options: ["swim", "fly", "drive"], answer: 1 },
                { question: "A cheetah can…", img: "🐆", options: ["read", "cook", "run fast"], answer: 2 },
                { question: "A frog can…", img: "🐸", options: ["jump", "drive", "sing"], answer: 0 },
                { question: "A bat can…", img: "🦇", options: ["fly", "swim", "talk"], answer: 0 },
                { question: "A snake can…", img: "🐍", options: ["clap", "slither", "walk"], answer: 1 },
                { question: "A kangaroo can…", img: "🦘", options: ["hop", "drive", "read"], answer: 0 },
                { question: "A dolphin can…", img: "🐬", options: ["swim", "walk", "fly"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "feelings", title: "Feelings", emoji: "😀", cycle: "Cycle 6",
          pairsInstr: "Empareja la emoción con su cara.",
          pairs: [
            { a: "Happy", b: "😄" }, { a: "Sad", b: "😢" }, { a: "Angry", b: "😠" }, { a: "Scared", b: "😱" },
            { a: "Sleepy", b: "😴" }, { a: "Surprised", b: "😮" }, { a: "Excited", b: "🤩" }, { a: "Sick", b: "🤒" }
          ],
          activities: [
            {
              format: "trivia", level: "Difícil", instructions: "¿Cómo se siente?",
              items: [
                { question: "The boy got a gift. He is…", img: "🎁", options: ["happy", "sad", "angry"], answer: 0 },
                { question: "Her ice cream fell. She is…", img: "🍦", options: ["happy", "sad", "sleepy"], answer: 1 },
                { question: "It is very late. He is…", img: "🌙", options: ["sleepy", "angry", "scared"], answer: 0 },
                { question: "A big spider! She is…", img: "🕷️", options: ["scared", "happy", "hungry"], answer: 0 },
                { question: "The opposite of happy is…", img: "🙂", options: ["sad", "big", "fast"], answer: 0 },
                { question: "The opposite of big is…", img: "📏", options: ["small", "tall", "hot"], answer: 0 },
                { question: "She won a prize. She is…", img: "🏆", options: ["happy", "sad", "scared"], answer: 0 },
                { question: "He lost his toy. He is…", img: "🧸", options: ["sad", "happy", "sleepy"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "possessive", title: "Possessive Adjectives", emoji: "🎒", cycle: "Cycle 7",
          pairsInstr: "Empareja el pronombre con su posesivo.",
          pairs: [
            { a: "I", b: "my" }, { a: "You", b: "your" }, { a: "He", b: "his" }, { a: "She", b: "her" },
            { a: "It", b: "its" }, { a: "We", b: "our" }, { a: "They", b: "their" }
          ],
          activities: [
            {
              format: "fill", level: "Fácil", instructions: "¿De quién es? Completa con my o your.",
              items: [
                { sentence: "(I) This is ___ ball.", img: "⚽", options: ["my", "your"], answer: 0 },
                { sentence: "(you) That is ___ dog.", img: "🐕", options: ["my", "your"], answer: 1 },
                { sentence: "(I) Here is ___ book.", img: "📕", options: ["my", "your"], answer: 0 },
                { sentence: "(you) Is this ___ pen?", img: "🖊️", options: ["my", "your"], answer: 1 },
                { sentence: "(I) I love ___ family.", img: "👨‍👩‍👦", options: ["my", "your"], answer: 0 },
                { sentence: "(you) Where is ___ bag?", img: "🎒", options: ["my", "your"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Medio", instructions: "Completa con my, your, his o her.",
              items: [
                { sentence: "(he) He loves ___ mom.", img: "👦", options: ["my", "your", "his", "her"], answer: 2 },
                { sentence: "(she) She has ___ book.", img: "👧", options: ["my", "your", "his", "her"], answer: 3 },
                { sentence: "(I) This is ___ toy.", img: "🧸", options: ["my", "your", "his", "her"], answer: 0 },
                { sentence: "(you) Where is ___ bag?", img: "🎒", options: ["my", "your", "his", "her"], answer: 1 },
                { sentence: "(he) That is ___ bike.", img: "🚲", options: ["my", "your", "his", "her"], answer: 2 },
                { sentence: "(she) I like ___ dress.", img: "👗", options: ["my", "your", "his", "her"], answer: 3 },
                { sentence: "(I) These are ___ shoes.", img: "👟", options: ["my", "your", "his", "her"], answer: 0 },
                { sentence: "(you) Is that ___ hat?", img: "🧢", options: ["my", "your", "his", "her"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil", instructions: "¿Cuál está bien escrita?",
              items: [
                { question: "Choose the correct one:", img: "👧", options: ["She brushes his hair", "She brushes her hair"], answer: 1 },
                { question: "Choose the correct one:", img: "👦", options: ["He kicks his ball", "He kicks her ball"], answer: 0 },
                { question: "Choose the correct one:", img: "👨‍👩‍👧‍👦", options: ["They ride his bikes", "They ride their bikes"], answer: 1 },
                { question: "Choose the correct one:", img: "🧑‍🤝‍🧑", options: ["We clean our room", "We clean their room"], answer: 0 },
                { question: "Choose the correct one:", img: "🐕", options: ["The dog wags your tail", "The dog wags its tail"], answer: 1 },
                { question: "Choose the correct one:", img: "❤️", options: ["I love my mom", "I love your mom"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "phonics", title: "Phonics Sounds", emoji: "🔡", cycle: "Cycle 2–8",
          pairsInstr: "Empareja la letra con un dibujo que empieza con ese sonido.",
          pairs: [
            { a: "Aa", b: "🍎" }, { a: "Bb", b: "⚽" }, { a: "Cc", b: "🐈" }, { a: "Dd", b: "🐕" },
            { a: "Ss", b: "☀️" }, { a: "Ff", b: "🐟" }, { a: "Mm", b: "🌙" }, { a: "Tt", b: "🌳" }
          ],
          activities: [
            {
              format: "trivia", level: "Difícil", instructions: "¿Qué palabra empieza con ese sonido?",
              items: [
                { question: "Which starts with B?", img: "🔤", options: ["Ball", "Apple", "Sun"], answer: 0 },
                { question: "Which starts with S?", img: "🔤", options: ["Fish", "Sun", "Cat"], answer: 1 },
                { question: "Which starts with A?", img: "🔤", options: ["Dog", "Apple", "Ball"], answer: 1 },
                { question: "Which starts with F?", img: "🔤", options: ["Fish", "Cat", "Sun"], answer: 0 },
                { question: "Which starts with C?", img: "🔤", options: ["Apple", "Cat", "Ball"], answer: 1 },
                { question: "Which starts with D?", img: "🔤", options: ["Dog", "Sun", "Fish"], answer: 0 },
                { question: "Which starts with M?", img: "🔤", options: ["Moon", "Ball", "Fish"], answer: 0 },
                { question: "Which starts with T?", img: "🔤", options: ["Tree", "Apple", "Sun"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "layla-bots", title: "Layla & the Bots", emoji: "🤖", cycle: "Cycle 4–9",
          pairsInstr: "Empareja la palabra de la historia con su dibujo.",
          pairs: [
            { a: "Robot", b: "🤖" }, { a: "Fix", b: "🛠️" }, { a: "Battery", b: "🔋" }, { a: "Light", b: "💡" },
            { a: "Gear", b: "⚙️" }, { a: "Rocket", b: "🚀" }, { a: "Magnet", b: "🧲" }, { a: "Tool", b: "🔧" },
            { a: "Screen", b: "📺" }, { a: "Button", b: "🔘" }
          ],
          activities: []
        }
      ]
    },
    {
      id: "t2", title: "Term 2",
      topics: [
        {
          id: "do-does", title: "Present Simple (Do/Does)", emoji: "❓", cycle: "Cycle 1–2",
          pairsInstr: "Empareja el pronombre con su dibujo.",
          pairs: [
            { a: "I", b: "🙋" }, { a: "You", b: "👉" }, { a: "He", b: "👦" }, { a: "She", b: "👧" },
            { a: "It", b: "🐱" }, { a: "We", b: "🧑‍🤝‍🧑" }, { a: "They", b: "👨‍👩‍👧‍👦" }
          ],
          activities: [
            {
              format: "fill", level: "Fácil", instructions: "Completa la pregunta con Do o Does.",
              items: [
                { sentence: "___ you like pizza?", img: "🍕", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ he play soccer?", img: "⚽", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ they run?", img: "🏃", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ she sing?", img: "🎤", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ we go?", img: "🚶", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ it fly?", img: "🐦", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ you read?", img: "📚", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ he swim?", img: "🏊", options: ["Do", "Does"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Medio", instructions: "¿Cuál pregunta está bien escrita?",
              items: [
                { question: "Choose the correct one:", img: "👧", options: ["Do she like it?", "Does she like it?"], answer: 1 },
                { question: "Choose the correct one:", img: "🧒", options: ["Do you play?", "Does you play?"], answer: 0 },
                { question: "Choose the correct one:", img: "👦", options: ["Do he run?", "Does he run?"], answer: 1 },
                { question: "Choose the correct one:", img: "👬", options: ["Do they jump?", "Does they jump?"], answer: 0 },
                { question: "Choose the correct one:", img: "🐈", options: ["Does it work?", "Do it work?"], answer: 0 },
                { question: "Choose the correct one:", img: "🧑‍🤝‍🧑", options: ["Does we go?", "Do we go?"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Difícil", instructions: "Frases negativas. Completa con do o does.",
              items: [
                { sentence: "She ___ not like peas.", img: "👧", options: ["do", "does"], answer: 1 },
                { sentence: "They ___ not play.", img: "👬", options: ["do", "does"], answer: 0 },
                { sentence: "He ___ not run.", img: "👦", options: ["do", "does"], answer: 1 },
                { sentence: "I ___ not know.", img: "🙋", options: ["do", "does"], answer: 0 },
                { sentence: "It ___ not work.", img: "🤖", options: ["do", "does"], answer: 1 },
                { sentence: "We ___ not sleep.", img: "🧑‍🤝‍🧑", options: ["do", "does"], answer: 0 },
                { sentence: "The dog ___ not bark.", img: "🐕", options: ["do", "does"], answer: 1 },
                { sentence: "Cats ___ not fly.", img: "🐈", options: ["do", "does"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "present-continuous", title: "Present Continuous (-ing)", emoji: "🏃", cycle: "Cycle 4",
          pairsInstr: "Empareja la acción con su dibujo.",
          pairs: [
            { a: "Run", b: "🏃" }, { a: "Eat", b: "🍽️" }, { a: "Sleep", b: "😴" }, { a: "Swim", b: "🏊" },
            { a: "Sing", b: "🎤" }, { a: "Read", b: "📖" }, { a: "Jump", b: "🤸" }, { a: "Draw", b: "✏️" }
          ],
          activities: [
            {
              format: "fill", level: "Fácil", instructions: "¿Qué pasa ahora? Elige la forma con -ing.",
              items: [
                { sentence: "She is ___. (run)", img: "🏃‍♀️", options: ["run", "running"], answer: 1 },
                { sentence: "I am ___. (eat)", img: "🍽️", options: ["eat", "eating"], answer: 1 },
                { sentence: "He is ___. (sleep)", img: "😴", options: ["sleep", "sleeping"], answer: 1 },
                { sentence: "They are ___. (play)", img: "🎮", options: ["play", "playing"], answer: 1 },
                { sentence: "We are ___. (read)", img: "📖", options: ["read", "reading"], answer: 1 },
                { sentence: "She is ___. (jump)", img: "🤸", options: ["jump", "jumping"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil", instructions: "Piensa bien. Toca la respuesta correcta.",
              items: [
                { question: "Which is happening NOW?", img: "⏰", options: ["She is dancing", "She dances"], answer: 0 },
                { question: "Which question is correct?", img: "❓", options: ["Are you eating?", "You are eating?"], answer: 0 },
                { question: "She ___ eating.", img: "🍽️", options: ["is", "are", "am"], answer: 0 },
                { question: "They ___ running.", img: "🏃", options: ["is", "are", "am"], answer: 1 },
                { question: "___ you reading?", img: "📖", options: ["Are", "Is", "Am"], answer: 0 },
                { question: "Which word has -ing?", img: "🔤", options: ["playing", "played"], answer: 0 },
                { question: "He ___ swimming.", img: "🏊", options: ["is", "are", "am"], answer: 0 },
                { question: "We ___ singing.", img: "🎤", options: ["are", "is", "am"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "singular-plural", title: "Singular & Plural", emoji: "➕", cycle: "Cycle 5",
          pairsInstr: "Empareja el singular con su plural.",
          pairs: [
            { a: "cat", b: "cats" }, { a: "box", b: "boxes" }, { a: "baby", b: "babies" },
            { a: "man", b: "men" }, { a: "foot", b: "feet" }, { a: "mouse", b: "mice" }
          ],
          activities: [
            {
              format: "trivia", level: "Fácil", instructions: "Elige el plural (con -s).",
              items: [
                { question: "One cat, two ___", img: "🐈", options: ["cats", "cat"], answer: 0 },
                { question: "One dog, two ___", img: "🐕", options: ["dog", "dogs"], answer: 1 },
                { question: "One car, two ___", img: "🚗", options: ["cars", "car"], answer: 0 },
                { question: "One book, two ___", img: "📚", options: ["book", "books"], answer: 1 },
                { question: "One pen, two ___", img: "🖊️", options: ["pens", "pen"], answer: 0 },
                { question: "One ball, two ___", img: "⚽", options: ["ball", "balls"], answer: 1 },
                { question: "One bird, two ___", img: "🐦", options: ["birds", "bird"], answer: 0 },
                { question: "One hat, two ___", img: "🧢", options: ["hat", "hats"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Medio", instructions: "Estos plurales llevan -es. Completa.",
              items: [
                { sentence: "One box, two ___.", img: "📦", options: ["boxes", "boxs"], answer: 0 },
                { sentence: "One bus, two ___.", img: "🚌", options: ["buss", "buses"], answer: 1 },
                { sentence: "One fox, two ___.", img: "🦊", options: ["foxes", "foxs"], answer: 0 },
                { sentence: "One dish, two ___.", img: "🍽️", options: ["dishs", "dishes"], answer: 1 },
                { sentence: "One brush, two ___.", img: "🪥", options: ["brushes", "brushs"], answer: 0 },
                { sentence: "One glass, two ___.", img: "🥛", options: ["glasss", "glasses"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil", instructions: "Plurales difíciles (-ies e irregulares).",
              items: [
                { question: "One baby, two ___", img: "👶", options: ["babys", "babies", "baby"], answer: 1 },
                { question: "One party, two ___", img: "🎉", options: ["partys", "parties", "partyes"], answer: 1 },
                { question: "One man, two ___", img: "👨", options: ["mans", "men", "mens"], answer: 1 },
                { question: "One foot, two ___", img: "🦶", options: ["foots", "feet", "feets"], answer: 1 },
                { question: "One mouse, two ___", img: "🐭", options: ["mouses", "mice", "mouse"], answer: 1 },
                { question: "One child, two ___", img: "🧒", options: ["childs", "children", "childrens"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "proper-common", title: "Proper & Common Nouns", emoji: "🔤", cycle: "Cycle 6",
          pairsInstr: "Empareja el nombre propio con su nombre común.",
          pairs: [
            { a: "Ana", b: "girl" }, { a: "Colombia", b: "country" }, { a: "Monday", b: "day" },
            { a: "Bogotá", b: "city" }, { a: "Rex", b: "dog" }, { a: "December", b: "month" }
          ],
          activities: [
            {
              format: "trivia", level: "Fácil", instructions: "¿Nombre propio (proper) o común (common)?",
              items: [
                { question: "Ana", img: "🧒", options: ["Proper", "Common"], answer: 0 },
                { question: "dog", img: "🐕", options: ["Proper", "Common"], answer: 1 },
                { question: "Maria", img: "👧", options: ["Proper", "Common"], answer: 0 },
                { question: "city", img: "🏙️", options: ["Proper", "Common"], answer: 1 },
                { question: "book", img: "📚", options: ["Proper", "Common"], answer: 1 },
                { question: "Bogotá", img: "🌆", options: ["Proper", "Common"], answer: 0 },
                { question: "teacher", img: "🍎", options: ["Proper", "Common"], answer: 1 },
                { question: "Rex (a dog's name)", img: "🐕", options: ["Proper", "Common"], answer: 0 }
              ]
            },
            {
              format: "trivia", level: "Difícil", instructions: "Piensa en la mayúscula.",
              items: [
                { question: "Which needs a capital letter?", img: "🔠", options: ["ana", "dog"], answer: 0 },
                { question: "Which needs a capital letter?", img: "🔠", options: ["cat", "colombia"], answer: 1 },
                { question: "Which is a proper noun?", img: "🔤", options: ["monday", "day"], answer: 0 },
                { question: "Which is a common noun?", img: "🔤", options: ["river", "Amazon"], answer: 0 },
                { question: "Which needs a capital?", img: "🔠", options: ["city", "bogota"], answer: 1 },
                { question: "Which is a proper noun?", img: "🔤", options: ["teacher", "Ms. Ana"], answer: 1 },
                { question: "Which needs a capital?", img: "🔠", options: ["dog", "rex"], answer: 1 },
                { question: "Which is a proper noun?", img: "🔤", options: ["Maria", "girl"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "simple-past-was", title: "Simple Past: Was", emoji: "⏳", cycle: "Cycle 7",
          pairsInstr: "Empareja el pronombre con su dibujo.",
          pairs: [
            { a: "I", b: "🙋" }, { a: "You", b: "👉" }, { a: "He", b: "👦" }, { a: "She", b: "👧" },
            { a: "It", b: "🐱" }, { a: "We", b: "🧑‍🤝‍🧑" }, { a: "They", b: "👨‍👩‍👧‍👦" }
          ],
          activities: [
            {
              format: "fill", level: "Fácil", instructions: "Habla del pasado. Completa con was.",
              items: [
                { sentence: "Yesterday it ___ sunny.", img: "☀️", options: ["was", "is"], answer: 0 },
                { sentence: "I ___ at home.", img: "🏠", options: ["was", "am"], answer: 0 },
                { sentence: "The dog ___ happy.", img: "🐕", options: ["was", "is"], answer: 0 },
                { sentence: "It ___ a phone.", img: "📱", options: ["was", "is"], answer: 0 },
                { sentence: "She ___ my teacher.", img: "👩‍🏫", options: ["was", "is"], answer: 0 },
                { sentence: "It ___ fun.", img: "🎈", options: ["was", "is"], answer: 0 }
              ]
            },
            {
              format: "trivia", level: "Medio", instructions: "¿Cuál habla del pasado?",
              items: [
                { question: "Yesterday…", img: "🌧️", options: ["it was rainy", "it is rainy"], answer: 0 },
                { question: "Last year…", img: "🎂", options: ["I was 5", "I am 5"], answer: 0 },
                { question: "A minute ago…", img: "⏱️", options: ["he was here", "he is here"], answer: 0 },
                { question: "In the past…", img: "⏳", options: ["it was cold", "it is cold"], answer: 0 },
                { question: "Yesterday…", img: "🤒", options: ["she was sick", "she is sick"], answer: 0 },
                { question: "Long ago…", img: "🦕", options: ["dinosaurs were big", "dinosaurs are big"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Difícil", instructions: "Completa con was o wasn't (was not).",
              items: [
                { sentence: "It was cold. It ___ hot.", img: "🥶", options: ["was", "wasn't"], answer: 1 },
                { sentence: "I ___ happy; I was sad.", img: "😢", options: ["was", "wasn't"], answer: 1 },
                { sentence: "___ it fun? Yes, it was!", img: "🎈", options: ["Was", "Wasn't"], answer: 0 },
                { sentence: "She ___ at school; she stayed home.", img: "🏠", options: ["was", "wasn't"], answer: 1 },
                { sentence: "The soup was cold. It ___ warm.", img: "🍲", options: ["was", "wasn't"], answer: 1 },
                { sentence: "He ___ my friend since first grade.", img: "🧑‍🤝‍🧑", options: ["was", "wasn't"], answer: 0 }
              ]
            }
          ]
        }
      ]
    }
  ]
};
