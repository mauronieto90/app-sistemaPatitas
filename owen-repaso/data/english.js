/* =========================================================================
   DATOS — ENGLISH
   -------------------------------------------------------------------------
   Mismo formato que science.js. Cada tema tiene varias actividades
   (formato + nivel de dificultad). Ver comentarios en science.js/app.js.
   ========================================================================= */
window.OWEN_DATA = window.OWEN_DATA || {};
window.OWEN_DATA.english = {
  id: "english",
  title: "English",
  emoji: "🔤",
  color: "blue",
  terms: [
    {
      id: "t1",
      title: "Term 1",
      topics: [
        {
          id: "vocabulary", title: "Vocabulary", emoji: "🖼️", cycle: "Cycle 1",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Empareja cada palabra con su dibujo.",
              pairs: [
                { a: "Red", b: "🔴" }, { a: "Blue", b: "🔵" }, { a: "Cow", b: "🐄" },
                { a: "Lion", b: "🦁" }, { a: "Apple", b: "🍎" }, { a: "Fish", b: "🐟" }
              ]
            },
            {
              format: "memory", level: "Medio",
              instructions: "Encuentra la palabra y su dibujo.",
              pairs: [
                { a: "Green", b: "🟢" }, { a: "Yellow", b: "🟡" }, { a: "Dog", b: "🐕" },
                { a: "Duck", b: "🦆" }, { a: "Banana", b: "🍌" }, { a: "Cat", b: "🐈" }
              ]
            },
            {
              format: "matching", level: "Difícil",
              instructions: "Más palabras. Empareja cada una con su dibujo.",
              pairs: [
                { a: "Elephant", b: "🐘" }, { a: "Monkey", b: "🐒" }, { a: "Tiger", b: "🐅" },
                { a: "Orange", b: "🍊" }, { a: "Grapes", b: "🍇" }, { a: "Star", b: "⭐" },
                { a: "Heart", b: "❤️" }, { a: "Sun", b: "☀️" }
              ]
            }
          ]
        },
        {
          id: "counting", title: "Numbers 1–50", emoji: "🔢", cycle: "Cycle 1",
          activities: [
            {
              format: "fill", level: "Fácil",
              instructions: "¿Qué número falta? Toca el correcto.",
              items: [
                { sentence: "1, 2, 3, ___, 5", img: "🔢", options: ["4", "6", "8"], answer: 0 },
                { sentence: "2, 3, ___, 5", img: "🔢", options: ["4", "1", "7"], answer: 0 },
                { sentence: "6, 7, 8, ___", img: "🔢", options: ["9", "10", "5"], answer: 0 },
                { sentence: "1, ___, 3, 4", img: "🔢", options: ["2", "5", "9"], answer: 0 },
                { sentence: "8, 9, ___", img: "🔢", options: ["10", "7", "12"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Cuenta de 2 en 2, de 5 en 5 y de 10 en 10.",
              items: [
                { sentence: "10, 20, ___, 40", img: "🔟", options: ["25", "30", "35"], answer: 1 },
                { sentence: "5, 10, 15, ___", img: "🖐️", options: ["16", "20", "25"], answer: 1 },
                { sentence: "2, 4, 6, ___", img: "✌️", options: ["7", "8", "9"], answer: 1 },
                { sentence: "10, 20, 30, ___", img: "🔢", options: ["40", "45", "50"], answer: 0 },
                { sentence: "40, 30, 20, ___", img: "⬇️", options: ["10", "15", "0"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Difícil",
              instructions: "Secuencias más difíciles. ¿Qué número falta?",
              items: [
                { sentence: "5, 10, ___, 20, 25", img: "🖐️", options: ["12", "15", "18"], answer: 1 },
                { sentence: "___, 20, 30, 40, 50", img: "⬆️", options: ["5", "10", "15"], answer: 1 },
                { sentence: "2, 4, ___, 8, 10", img: "✌️", options: ["5", "6", "7"], answer: 1 },
                { sentence: "50, 40, ___, 20", img: "⬇️", options: ["25", "30", "35"], answer: 1 },
                { sentence: "3, 6, 9, ___", img: "🔢", options: ["10", "12", "15"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "pronouns-be", title: "Pronouns + To Be", emoji: "🙋", cycle: "Cycle 2–4",
          activities: [
            {
              format: "fill", level: "Fácil",
              instructions: "Completa con am, is o are.",
              items: [
                { sentence: "I ___ a boy.", img: "👦", options: ["am", "is", "are"], answer: 0 },
                { sentence: "You ___ happy.", img: "🙂", options: ["am", "is", "are"], answer: 2 },
                { sentence: "He ___ tall.", img: "👦", options: ["am", "is", "are"], answer: 1 },
                { sentence: "She ___ nice.", img: "👧", options: ["am", "is", "are"], answer: 1 },
                { sentence: "It ___ a cat.", img: "🐈", options: ["am", "is", "are"], answer: 1 },
                { sentence: "We ___ friends.", img: "👫", options: ["am", "is", "are"], answer: 2 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Piensa en el sujeto y completa con am, is o are.",
              items: [
                { sentence: "They ___ sisters.", img: "👭", options: ["am", "is", "are"], answer: 2 },
                { sentence: "The dog ___ big.", img: "🐕", options: ["am", "is", "are"], answer: 1 },
                { sentence: "My friends ___ here.", img: "🧑‍🤝‍🧑", options: ["am", "is", "are"], answer: 2 },
                { sentence: "I ___ six years old.", img: "6️⃣", options: ["am", "is", "are"], answer: 0 },
                { sentence: "Owen ___ my son.", img: "🧒", options: ["am", "is", "are"], answer: 1 },
                { sentence: "You and I ___ a team.", img: "🤝", options: ["am", "is", "are"], answer: 2 }
              ]
            },
            {
              format: "fill", level: "Difícil",
              instructions: "Preguntas y frases negativas. Elige la palabra correcta.",
              items: [
                { sentence: "___ she your sister?", img: "❓", options: ["Is", "Are", "Am"], answer: 0 },
                { sentence: "___ they friends?", img: "❓", options: ["Is", "Are", "Am"], answer: 1 },
                { sentence: "___ I late?", img: "❓", options: ["Is", "Are", "Am"], answer: 2 },
                { sentence: "She is ___ a boy.", img: "🚫", options: ["not", "no", "are"], answer: 0 },
                { sentence: "We ___ not ready.", img: "🚫", options: ["is", "are", "am"], answer: 1 },
                { sentence: "It ___ not big.", img: "🚫", options: ["is", "are", "am"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "can-cant", title: "Can / Can't", emoji: "💪", cycle: "Cycle 5",
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "¿Puede pasar? Responde Yes o No.",
              items: [
                { question: "Can a bird fly?", img: "🐦", options: ["Yes", "No"], answer: 0 },
                { question: "Can a fish walk?", img: "🐟", options: ["Yes", "No"], answer: 1 },
                { question: "Can a dog run?", img: "🐕", options: ["Yes", "No"], answer: 0 },
                { question: "Can a car eat?", img: "🚗", options: ["Yes", "No"], answer: 1 },
                { question: "Can a cat jump?", img: "🐈", options: ["Yes", "No"], answer: 0 },
                { question: "Can a rock sing?", img: "🪨", options: ["Yes", "No"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Completa con can o can't.",
              items: [
                { sentence: "A bird ___ fly.", img: "🐦", options: ["can", "can't"], answer: 0 },
                { sentence: "A fish ___ walk.", img: "🐟", options: ["can", "can't"], answer: 1 },
                { sentence: "A kangaroo ___ jump.", img: "🦘", options: ["can", "can't"], answer: 0 },
                { sentence: "A pig ___ fly.", img: "🐷", options: ["can", "can't"], answer: 1 },
                { sentence: "A monkey ___ climb.", img: "🐒", options: ["can", "can't"], answer: 0 },
                { sentence: "A turtle ___ run fast.", img: "🐢", options: ["can", "can't"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "¿Qué SÍ puede hacer? Toca la respuesta.",
              items: [
                { question: "A fish can…", img: "🐟", options: ["swim", "fly", "walk"], answer: 0 },
                { question: "A bird can…", img: "🐦", options: ["swim", "fly", "drive"], answer: 1 },
                { question: "A cheetah can…", img: "🐆", options: ["read", "cook", "run fast"], answer: 2 },
                { question: "A frog can…", img: "🐸", options: ["jump", "drive", "sing"], answer: 0 },
                { question: "A bat can…", img: "🦇", options: ["fly", "swim", "talk"], answer: 0 },
                { question: "A snake can…", img: "🐍", options: ["clap", "slither", "walk"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "feelings", title: "Feelings", emoji: "😀", cycle: "Cycle 6",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Empareja cada emoción con su cara.",
              pairs: [
                { a: "Happy", b: "😄" }, { a: "Sad", b: "😢" }, { a: "Angry", b: "😠" }, { a: "Scared", b: "😱" }
              ]
            },
            {
              format: "memory", level: "Medio",
              instructions: "Encuentra la emoción y su cara.",
              pairs: [
                { a: "Happy", b: "😄" }, { a: "Sad", b: "😢" }, { a: "Angry", b: "😠" },
                { a: "Scared", b: "😱" }, { a: "Sleepy", b: "😴" }, { a: "Surprised", b: "😮" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "¿Cómo se siente? Toca la respuesta.",
              items: [
                { question: "Owen got a gift. He is…", img: "🎁", options: ["happy", "sad", "angry"], answer: 0 },
                { question: "Her ice cream fell. She is…", img: "🍦", options: ["happy", "sad", "sleepy"], answer: 1 },
                { question: "It is very late. He is…", img: "🌙", options: ["sleepy", "angry", "scared"], answer: 0 },
                { question: "A big spider! She is…", img: "🕷️", options: ["scared", "happy", "hungry"], answer: 0 },
                { question: "The opposite of happy is…", img: "🙂", options: ["sad", "big", "fast"], answer: 0 },
                { question: "The opposite of big is…", img: "📏", options: ["small", "tall", "hot"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "possessive", title: "Possessive Adjectives", emoji: "🎒", cycle: "Cycle 7",
          activities: [
            {
              format: "fill", level: "Fácil",
              instructions: "¿De quién es? Completa con my o your.",
              items: [
                { sentence: "(I) This is ___ ball.", img: "⚽", options: ["my", "your"], answer: 0 },
                { sentence: "(you) That is ___ dog.", img: "🐕", options: ["my", "your"], answer: 1 },
                { sentence: "(I) Here is ___ book.", img: "📕", options: ["my", "your"], answer: 0 },
                { sentence: "(you) Is this ___ pen?", img: "🖊️", options: ["my", "your"], answer: 1 },
                { sentence: "(I) I love ___ family.", img: "👨‍👩‍👦", options: ["my", "your"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Completa con my, your, his o her.",
              items: [
                { sentence: "(he) He loves ___ mom.", img: "👦", options: ["my", "your", "his", "her"], answer: 2 },
                { sentence: "(she) She has ___ book.", img: "👧", options: ["my", "your", "his", "her"], answer: 3 },
                { sentence: "(I) This is ___ toy.", img: "🧸", options: ["my", "your", "his", "her"], answer: 0 },
                { sentence: "(you) Where is ___ bag?", img: "🎒", options: ["my", "your", "his", "her"], answer: 1 },
                { sentence: "(he) That is ___ bike.", img: "🚲", options: ["my", "your", "his", "her"], answer: 2 },
                { sentence: "(she) I like ___ dress.", img: "👗", options: ["my", "your", "his", "her"], answer: 3 }
              ]
            },
            {
              format: "fill", level: "Difícil",
              instructions: "Completa con his, her, its, our o their.",
              items: [
                { sentence: "(it) The cat licks ___ paw.", img: "🐈", options: ["his", "her", "its", "our", "their"], answer: 2 },
                { sentence: "(they) The kids ride ___ bikes.", img: "🚲", options: ["his", "her", "its", "our", "their"], answer: 4 },
                { sentence: "(we) This is ___ house.", img: "🏠", options: ["his", "her", "its", "our", "their"], answer: 3 },
                { sentence: "(she) She brushes ___ hair.", img: "💇‍♀️", options: ["his", "her", "its", "our", "their"], answer: 1 },
                { sentence: "(he) He kicks ___ ball.", img: "⚽", options: ["his", "her", "its", "our", "their"], answer: 0 },
                { sentence: "(it) The dog wags ___ tail.", img: "🐕", options: ["his", "her", "its", "our", "their"], answer: 2 }
              ]
            }
          ]
        },
        {
          id: "phonics", title: "Phonics Sounds", emoji: "🔡", cycle: "Cycle 2–8",
          activities: [
            {
              format: "memory", level: "Fácil",
              instructions: "Encuentra la letra y el dibujo con ese sonido.",
              pairs: [
                { a: "Aa", b: "🍎" }, { a: "Bb", b: "⚽" }, { a: "Cc", b: "🐈" }, { a: "Dd", b: "🐕" }
              ]
            },
            {
              format: "memory", level: "Medio",
              instructions: "Encuentra la letra y el dibujo con ese sonido.",
              pairs: [
                { a: "Aa", b: "🍎" }, { a: "Bb", b: "⚽" }, { a: "Cc", b: "🐈" },
                { a: "Dd", b: "🐕" }, { a: "Ss", b: "☀️" }, { a: "Ff", b: "🐟" }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "¿Qué palabra empieza con ese sonido? Toca la respuesta.",
              items: [
                { question: "Which starts with B?", img: "🔤", options: ["Ball", "Apple", "Sun"], answer: 0 },
                { question: "Which starts with S?", img: "🔤", options: ["Fish", "Sun", "Cat"], answer: 1 },
                { question: "Which starts with A?", img: "🔤", options: ["Dog", "Apple", "Ball"], answer: 1 },
                { question: "Which starts with F?", img: "🔤", options: ["Fish", "Cat", "Sun"], answer: 0 },
                { question: "Which starts with C?", img: "🔤", options: ["Apple", "Cat", "Ball"], answer: 1 },
                { question: "Which starts with D?", img: "🔤", options: ["Dog", "Sun", "Fish"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "layla-bots", title: "Layla & the Bots", emoji: "🤖", cycle: "Cycle 4–9",
          activities: [
            {
              format: "matching", level: "Fácil",
              instructions: "Palabras de la historia. Empareja con su dibujo.",
              pairs: [
                { a: "Robot", b: "🤖" }, { a: "Fix", b: "🛠️" }, { a: "Battery", b: "🔋" }, { a: "Light", b: "💡" }
              ]
            },
            {
              format: "memory", level: "Medio",
              instructions: "Encuentra la palabra de la historia y su dibujo.",
              pairs: [
                { a: "Robot", b: "🤖" }, { a: "Fix", b: "🛠️" }, { a: "Battery", b: "🔋" },
                { a: "Light", b: "💡" }, { a: "Gear", b: "⚙️" }, { a: "Rocket", b: "🚀" }
              ]
            },
            {
              format: "matching", level: "Difícil",
              instructions: "Más palabras de robots. Empareja con su dibujo.",
              pairs: [
                { a: "Robot", b: "🤖" }, { a: "Gear", b: "⚙️" }, { a: "Battery", b: "🔋" },
                { a: "Magnet", b: "🧲" }, { a: "Screen", b: "📺" }, { a: "Rocket", b: "🚀" },
                { a: "Tool", b: "🔧" }, { a: "Bulb", b: "💡" }
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
          id: "do-does", title: "Present Simple (Do/Does)", emoji: "❓", cycle: "Cycle 1–2",
          activities: [
            {
              format: "fill", level: "Fácil",
              instructions: "Completa la pregunta con Do o Does.",
              items: [
                { sentence: "___ you like pizza?", img: "🍕", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ he play soccer?", img: "⚽", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ they run?", img: "🏃", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ she sing?", img: "🎤", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ we go?", img: "🚶", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ it fly?", img: "🐦", options: ["Do", "Does"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Piensa en el sujeto. ¿Do o Does?",
              items: [
                { sentence: "___ I know you?", img: "❓", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ the dog bark?", img: "🐕", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ your friends play?", img: "🧒", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ Owen like books?", img: "📚", options: ["Do", "Does"], answer: 1 },
                { sentence: "___ cats drink milk?", img: "🐈", options: ["Do", "Does"], answer: 0 },
                { sentence: "___ the sun shine?", img: "☀️", options: ["Do", "Does"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Difícil",
              instructions: "Frases negativas. Completa con do o does.",
              items: [
                { sentence: "She ___ not like peas.", img: "🚫", options: ["do", "does"], answer: 1 },
                { sentence: "They ___ not play.", img: "🚫", options: ["do", "does"], answer: 0 },
                { sentence: "He ___ not run.", img: "🚫", options: ["do", "does"], answer: 1 },
                { sentence: "I ___ not know.", img: "🚫", options: ["do", "does"], answer: 0 },
                { sentence: "It ___ not work.", img: "🚫", options: ["do", "does"], answer: 1 },
                { sentence: "We ___ not sleep.", img: "🚫", options: ["do", "does"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "present-continuous", title: "Present Continuous (-ing)", emoji: "🏃", cycle: "Cycle 4",
          activities: [
            {
              format: "fill", level: "Fácil",
              instructions: "¿Qué pasa ahora? Elige la forma con -ing.",
              items: [
                { sentence: "She is ___. (run)", img: "🏃‍♀️", options: ["run", "running"], answer: 1 },
                { sentence: "I am ___. (eat)", img: "🍽️", options: ["eat", "eating"], answer: 1 },
                { sentence: "He is ___. (sleep)", img: "😴", options: ["sleep", "sleeping"], answer: 1 },
                { sentence: "They are ___. (play)", img: "🎮", options: ["play", "playing"], answer: 1 },
                { sentence: "We are ___. (read)", img: "📖", options: ["read", "reading"], answer: 1 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Elige la forma correcta con -ing.",
              items: [
                { sentence: "She is ___. (run)", img: "🏃‍♀️", options: ["run", "running", "runs"], answer: 1 },
                { sentence: "I am ___. (jump)", img: "🤸", options: ["jumps", "jumping", "jump"], answer: 1 },
                { sentence: "The dog is ___. (bark)", img: "🐕", options: ["bark", "barking", "barked"], answer: 1 },
                { sentence: "You are ___. (draw)", img: "✏️", options: ["draw", "drawing", "drew"], answer: 1 },
                { sentence: "He is ___. (swim)", img: "🏊", options: ["swimming", "swim", "swam"], answer: 0 },
                { sentence: "We are ___. (sing)", img: "🎤", options: ["sang", "sing", "singing"], answer: 2 }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Piensa bien. Toca la respuesta correcta.",
              items: [
                { question: "Which is happening NOW?", img: "⏰", options: ["She is dancing", "She dances"], answer: 0 },
                { question: "Which question is correct?", img: "❓", options: ["Are you eating?", "You are eating?"], answer: 0 },
                { question: "She ___ eating.", img: "🍽️", options: ["is", "are", "am"], answer: 0 },
                { question: "They ___ running.", img: "🏃", options: ["is", "are", "am"], answer: 1 },
                { question: "___ you reading?", img: "📖", options: ["Are", "Is", "Am"], answer: 0 },
                { question: "Which word has -ing?", img: "🔤", options: ["playing", "played"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "singular-plural", title: "Singular & Plural", emoji: "➕", cycle: "Cycle 5",
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "Elige el plural (con -s).",
              items: [
                { question: "One cat, two ___", img: "🐈", options: ["cats", "cat"], answer: 0 },
                { question: "One dog, two ___", img: "🐕", options: ["dogs", "dog"], answer: 0 },
                { question: "One car, two ___", img: "🚗", options: ["cars", "car"], answer: 0 },
                { question: "One book, two ___", img: "📚", options: ["books", "book"], answer: 0 },
                { question: "One pen, two ___", img: "🖊️", options: ["pens", "pen"], answer: 0 }
              ]
            },
            {
              format: "trivia", level: "Medio",
              instructions: "Estos plurales llevan -es. Elige el correcto.",
              items: [
                { question: "One box, two ___", img: "📦", options: ["boxs", "boxes"], answer: 1 },
                { question: "One bus, two ___", img: "🚌", options: ["buss", "buses"], answer: 1 },
                { question: "One fox, two ___", img: "🦊", options: ["foxs", "foxes"], answer: 1 },
                { question: "One dish, two ___", img: "🍽️", options: ["dishs", "dishes"], answer: 1 },
                { question: "One brush, two ___", img: "🪥", options: ["brushs", "brushes"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Plurales difíciles (-ies e irregulares). Elige el correcto.",
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
          activities: [
            {
              format: "trivia", level: "Fácil",
              instructions: "¿Nombre propio (proper) o común (common)?",
              items: [
                { question: "Owen", img: "🧒", options: ["Proper", "Common"], answer: 0 },
                { question: "dog", img: "🐕", options: ["Proper", "Common"], answer: 1 },
                { question: "Maria", img: "👧", options: ["Proper", "Common"], answer: 0 },
                { question: "city", img: "🏙️", options: ["Proper", "Common"], answer: 1 },
                { question: "book", img: "📚", options: ["Proper", "Common"], answer: 1 },
                { question: "Bogotá", img: "🌆", options: ["Proper", "Common"], answer: 0 }
              ]
            },
            {
              format: "trivia", level: "Medio",
              instructions: "Días, meses y países son nombres propios. Elige.",
              items: [
                { question: "Monday", img: "📅", options: ["Proper", "Common"], answer: 0 },
                { question: "school", img: "🏫", options: ["Proper", "Common"], answer: 1 },
                { question: "Colombia", img: "🌎", options: ["Proper", "Common"], answer: 0 },
                { question: "teacher", img: "🍎", options: ["Proper", "Common"], answer: 1 },
                { question: "December", img: "🗓️", options: ["Proper", "Common"], answer: 0 },
                { question: "river", img: "🏞️", options: ["Proper", "Common"], answer: 1 }
              ]
            },
            {
              format: "trivia", level: "Difícil",
              instructions: "Piensa en la mayúscula. Toca la respuesta.",
              items: [
                { question: "Which needs a capital letter?", img: "🔠", options: ["owen", "dog"], answer: 0 },
                { question: "Which needs a capital letter?", img: "🔠", options: ["cat", "colombia"], answer: 1 },
                { question: "Which is a proper noun?", img: "🔤", options: ["monday", "day"], answer: 0 },
                { question: "Which is a common noun?", img: "🔤", options: ["river", "Amazon"], answer: 0 },
                { question: "Which needs a capital?", img: "🔠", options: ["city", "bogota"], answer: 1 },
                { question: "Which is a proper noun?", img: "🔤", options: ["teacher", "Ms. Ana"], answer: 1 }
              ]
            }
          ]
        },
        {
          id: "simple-past-was", title: "Simple Past: Was", emoji: "⏳", cycle: "Cycle 7",
          activities: [
            {
              format: "fill", level: "Fácil",
              instructions: "Habla del pasado. Completa con was.",
              items: [
                { sentence: "Yesterday it ___ sunny.", img: "☀️", options: ["was", "is"], answer: 0 },
                { sentence: "I ___ at home.", img: "🏠", options: ["was", "am"], answer: 0 },
                { sentence: "The dog ___ happy.", img: "🐕", options: ["was", "is"], answer: 0 },
                { sentence: "It ___ a phone.", img: "📱", options: ["was", "is"], answer: 0 },
                { sentence: "She ___ my teacher.", img: "👩‍🏫", options: ["was", "is"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Medio",
              instructions: "Pasado (was) o presente (is)? Elige.",
              items: [
                { sentence: "Now it is sunny. Yesterday it ___ rainy.", img: "🌧️", options: ["was", "is"], answer: 0 },
                { sentence: "Today I am 6. Last year I ___ 5.", img: "🎂", options: ["was", "am"], answer: 0 },
                { sentence: "He ___ sick yesterday, but is fine now.", img: "🤒", options: ["was", "is"], answer: 0 },
                { sentence: "The park ___ full yesterday.", img: "🏞️", options: ["was", "is"], answer: 0 },
                { sentence: "This ___ my old toy.", img: "🧸", options: ["was", "is"], answer: 0 }
              ]
            },
            {
              format: "fill", level: "Difícil",
              instructions: "Completa con was o wasn't (was not).",
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
