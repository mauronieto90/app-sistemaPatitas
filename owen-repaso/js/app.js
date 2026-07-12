/* =========================================================================
   Modo de Repaso — Grado Primero  ·  Motor de la app (sin contenido hardcodeado)
   -------------------------------------------------------------------------
   El contenido vive en /data/science.js y /data/english.js.
   Cada TEMA tiene varias ACTIVIDADES (formato + nivel de dificultad).

   Estructura de datos:
     materia -> terms[] -> topics[] -> activities[]
     activity = { format, level, instructions, ...contenido }
       format "trivia"/"fill"  -> items:[{ question|sentence, img?, options, answer }]
       format "matching"/"memory" -> pairs:[{ a:"palabra", b:"🍎" o "svg:root" }]
       format "order"          -> prompt, steps:[ "Paso 🌰", ... ]  (en orden)

   Las imágenes (img / b / steps) pueden ser un EMOJI o "svg:nombre"
   (ver js/icons.js). Así los dibujos quedan acordes al tema.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.OWEN_DATA || {};
  var ICONS = window.OWEN_ICONS || {};
  var app = document.getElementById("app");

  var state = { screen: "home", subjectId: null, topic: null, activity: null };

  // ============================ perfil (nombre + avatar) ============================
  // Perfil local del niño/niña, guardado en el dispositivo (sin cuentas ni internet).
  var PROFILE_KEY = "arrayanes-perfil-v1";
  // Avatares ilustrados propios (assets/avatars/<id>.svg)
  var AVATARS = [
    { id: "nino1", label: "Niño", group: "niño" },
    { id: "nino2", label: "Astronauta", group: "niño" },
    { id: "nino3", label: "Superhéroe", group: "niño" },
    { id: "nina1", label: "Niña", group: "niña" },
    { id: "nina2", label: "Princesa", group: "niña" },
    { id: "nina3", label: "Superheroína", group: "niña" }
  ];
  function avatarImg(av, cls) {
    if (!av) return "";
    return '<img class="av-img ' + (cls || "") + '" src="assets/avatars/' + av.id + '.svg" alt="' + esc(av.label) + '">';
  }
  function loadProfile() {
    try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch (e) { return null; }
  }
  function saveProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) { /* sin storage */ }
  }
  var profile = loadProfile();
  function avatarOf(p) {
    for (var i = 0; i < AVATARS.length; i++) if (AVATARS[i].id === (p && p.avatar)) return AVATARS[i];
    return null;
  }
  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || "").trim()); }

  // ============================ utilidades ============================
  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  // Toma n elementos al azar (para que cada partida sea distinta).
  function sample(arr, n) { var s = shuffle(arr); return (n && n < s.length) ? s.slice(0, n) : s; }
  // Cuántas preguntas/parejas mostrar por partida (si el banco es más grande).
  var PICK = { trivia: 6, fill: 6, matching: 6, memory: 6 };

  var EMOJI = window.OWEN_EMOJI || {};
  // Convierte un valor de imagen en HTML:
  //  - "svg:nombre"  -> ilustración SVG propia (js/icons.js)
  //  - un emoji que esté en el mapa -> imagen ilustrada de OpenMoji (assets/emoji/)
  //  - cualquier otra cosa -> se muestra tal cual (texto/emoji del sistema)
  function pic(val) {
    if (val == null) return "";
    val = String(val);
    if (val.indexOf("svg:") === 0) {
      var name = val.slice(4);
      return '<span class="pic-svg">' + (ICONS[name] || "❓") + "</span>";
    }
    if (EMOJI[val]) {
      return '<img class="pic-img" src="assets/emoji/' + EMOJI[val] + '.svg" alt="' + esc(val) + '" loading="lazy">';
    }
    return '<span class="pic-emoji">' + esc(val) + "</span>";
  }
  // Separa "Mouth 👄" o "Seed svg:seed" en {text, img} para chips ordenar.
  function splitStep(step) {
    if (typeof step === "object") return step; // { text, img }
    var m = String(step).match(/^(.*?)\s+(svg:\S+|[^\s\w].*)$/u);
    if (m) return { text: m[1], img: m[2] };
    return { text: String(step), img: null };
  }

  function countItems(a) {
    if (a.items) return a.items.length;
    if (a.pairs) return a.pairs.length;
    if (a.steps) return a.steps.length;
    return 0;
  }

  // ---------- apoyo de lectura (voz del navegador, en inglés) ----------
  var hasTTS = (typeof window.speechSynthesis !== "undefined") && (typeof window.SpeechSynthesisUtterance !== "undefined");
  function say(text) {
    if (!hasTTS || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) { /* sin voz */ }
  }
  // Botón 🔊 para leer una frase/palabra en voz alta (devuelve "" si no hay voz).
  function speakBtn(text) {
    if (!hasTTS) return "";
    return '<button class="read-btn" data-say="' + esc(text) + '" aria-label="Escuchar">🔊</button>';
  }
  // Activa todos los botones 🔊 dentro de un contenedor.
  function wireSpeak(root) {
    if (!hasTTS) return;
    root.querySelectorAll(".read-btn").forEach(function (b) {
      b.addEventListener("click", function (e) { e.stopPropagation(); say(b.getAttribute("data-say")); });
    });
  }
  // Texto legible de una oración con "___" (lee el hueco como una pausa).
  function readableSentence(s) { return String(s).replace(/_+/g, " … "); }

  // ---------- sonidos suaves (WebAudio, sin archivos) ----------
  var actx = null;
  function beep(kind) {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      var o = actx.createOscillator(), g = actx.createGain();
      o.connect(g); g.connect(actx.destination);
      var now = actx.currentTime;
      if (kind === "ok") { o.frequency.setValueAtTime(660, now); o.frequency.setValueAtTime(880, now + 0.09); }
      else if (kind === "win") { o.frequency.setValueAtTime(660, now); o.frequency.setValueAtTime(880, now + 0.1); o.frequency.setValueAtTime(1046, now + 0.2); }
      else { o.type = "square"; o.frequency.setValueAtTime(200, now); }
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "win" ? 0.35 : 0.18));
      o.start(now); o.stop(now + (kind === "win" ? 0.35 : 0.18));
    } catch (e) { /* silencio si no hay audio */ }
  }
  function confetti() {
    var emojis = ["🎉", "⭐", "🌟", "🎊", "✨", "🏆", "💜"];
    for (var i = 0; i < 26; i++) {
      (function (i) {
        var c = document.createElement("div");
        c.className = "confetti";
        c.textContent = emojis[i % emojis.length];
        c.style.left = Math.random() * 100 + "vw";
        c.style.animationDuration = (1.4 + Math.random() * 1.4) + "s";
        c.style.animationDelay = (Math.random() * 0.4) + "s";
        document.body.appendChild(c);
        setTimeout(function () { c.remove(); }, 3200);
      })(i);
    }
  }

  // ============================ navegación ============================
  function go(screen, opts) {
    opts = opts || {};
    ["subjectId", "topic", "activity"].forEach(function (k) { if (k in opts) state[k] = opts[k]; });
    state.screen = screen;
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    app.innerHTML = "";
    // Sin perfil todavía -> primero la ventana de registro
    if (!profile && state.screen !== "profile") { state.screen = "profile"; }
    if (state.screen === "profile") return renderProfile();
    if (state.screen === "home") return renderHome();
    if (state.screen === "topics") return renderTopics();
    if (state.screen === "activities") return renderActivities();
    if (state.screen === "game") return renderGame();
  }

  // ============================ pantalla: REGISTRO ============================
  function renderProfile() {
    var editing = !!profile;
    var chosen = editing ? profile.avatar : null;

    app.appendChild(el(
      '<div class="hero">' +
        '<div class="mascot"><img class="hero-logo" src="assets/logo-arrayanes.png" alt="Gimnasio Los Arrayanes Bilingüe"></div>' +
        '<h1>' + (editing ? "Tu perfil" : "¡Bienvenido!") + '</h1>' +
        '<p class="school">Gimnasio Los Arrayanes Bilingüe · Grado Primero</p>' +
      '</div>'
    ));

    var card = el(
      '<div class="profile-card">' +
        '<div class="form-block">' +
          '<label class="profile-label" for="p-name">¿Cómo te llamas?</label>' +
          '<input id="p-name" class="name-input" type="text" maxlength="14" autocomplete="off" placeholder="Escribe tu nombre" value="' + (editing ? esc(profile.name) : "") + '">' +
        '</div>' +
        '<div class="profile-label">Elige tu avatar</div>' +
        '<div class="avatar-group-label">Niños</div>' +
        '<div class="avatar-grid" data-group="niño"></div>' +
        '<div class="avatar-group-label">Niñas</div>' +
        '<div class="avatar-grid" data-group="niña"></div>' +

        '<div class="adult-box">' +
          '<div class="adult-title">👨‍👩‍👧 Para el papá, mamá o acudiente</div>' +
          '<label class="profile-label sm" for="p-email">Correo de un adulto</label>' +
          '<input id="p-email" class="name-input email-input" type="email" autocomplete="email" inputmode="email" placeholder="correo@ejemplo.com" value="' + (editing && profile.email ? esc(profile.email) : "") + '">' +
          '<label class="auth-check">' +
            '<input id="p-auth" type="checkbox"' + (editing && profile.authorized ? " checked" : "") + '>' +
            '<span>Autorizo, como adulto responsable, que este niño/a use la app de repaso y que se pueda <b>compartir con otros padres del Gimnasio Los Arrayanes</b>.</span>' +
          '</label>' +
        '</div>' +

        '<button class="btn-primary btn-start" disabled>' + (editing ? "Guardar 💾" : "¡Crear cuenta y jugar! 🎮") + '</button>' +
      '</div>'
    );

    AVATARS.forEach(function (av) {
      var b = el(
        '<button class="avatar-opt' + (chosen === av.id ? " selected" : "") + '" data-avatar="' + av.id + '">' +
          avatarImg(av) +
          '<span class="avatar-name">' + esc(av.label) + '</span>' +
        '</button>'
      );
      b.addEventListener("click", function () {
        chosen = av.id;
        card.querySelectorAll(".avatar-opt").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        check();
      });
      card.querySelector('.avatar-grid[data-group="' + av.group + '"]').appendChild(b);
    });

    var input = card.querySelector("#p-name");
    var email = card.querySelector("#p-email");
    var auth = card.querySelector("#p-auth");
    var startBtn = card.querySelector(".btn-start");
    function check() {
      startBtn.disabled = !(input.value.trim().length >= 2 && chosen && validEmail(email.value) && auth.checked);
    }
    input.addEventListener("input", check);
    email.addEventListener("input", check);
    auth.addEventListener("change", check);
    startBtn.addEventListener("click", function () {
      profile = {
        name: input.value.trim(),
        avatar: chosen,
        email: email.value.trim(),
        authorized: true,
        authorizedAt: (profile && profile.authorizedAt) || new Date().toISOString(),
        createdAt: (profile && profile.createdAt) || new Date().toISOString()
      };
      saveProfile(profile);
      beep("win"); confetti();
      go("home");
    });
    check();

    app.appendChild(card);
    app.appendChild(el('<div class="footer-note">La cuenta se guarda en este dispositivo (sin enviar datos a internet). 📱</div>'));
  }

  function topbar(title, sub, onBack) {
    var bar = el(
      '<div class="topbar">' +
        '<button class="btn-back" aria-label="Volver">←</button>' +
        '<div class="title-wrap"><h1>' + title + '</h1><div class="sub">' + sub + '</div></div>' +
      '</div>'
    );
    bar.querySelector(".btn-back").addEventListener("click", onBack);
    return bar;
  }

  var GAME_META = {
    trivia: { label: "Trivia", icon: "🧠" },
    fill: { label: "Completar", icon: "✏️" },
    matching: { label: "Emparejar", icon: "🔗" },
    memory: { label: "Memoria", icon: "🃏" },
    order: { label: "Ordenar", icon: "🔢" }
  };
  var LEVEL_META = {
    "Fácil": { cls: "lvl-easy", icon: "🟢" },
    "Medio": { cls: "lvl-mid", icon: "🟡" },
    "Difícil": { cls: "lvl-hard", icon: "🔴" }
  };
  var LEVELS = ["Fácil", "Medio", "Difícil"];
  var FORMAT_ORDER = { fill: 1, trivia: 2, order: 3, matching: 4, memory: 5 };

  // Cuántas parejas mostrar en Emparejar/Memoria según el nivel (dificultad
  // por tamaño). Se limita al tamaño del banco.
  function pickPairs(level, n) {
    var base = level === "Fácil" ? 4 : level === "Medio" ? 6 : 8;
    return Math.min(base, n);
  }

  // Un banco de parejas SOLO sirve para Emparejar/Memoria si es 1-a-1:
  // ninguna palabra ni dibujo puede repetirse (si no, hay varias cartas
  // iguales y el niño no sabe cuál va con cuál).
  function pairsAreOneToOne(pairs) {
    var seenA = {}, seenB = {};
    for (var i = 0; i < pairs.length; i++) {
      var a = pairs[i].a, b = pairs[i].b;
      if (seenA[a] || seenB[b]) return false;
      seenA[a] = 1; seenB[b] = 1;
    }
    return true;
  }

  // Construye la lista de juegos disponibles para un tema en un nivel:
  // los quizzes/orden escritos en los datos + Emparejar y Memoria
  // generados a partir del banco compartido topic.pairs (si es 1-a-1).
  function activitiesForLevel(topic, level) {
    var acts = (topic.activities || []).filter(function (a) { return a.level === level; }).slice();
    if (topic.pairs && topic.pairs.length >= 3 && pairsAreOneToOne(topic.pairs)) {
      var pk = pickPairs(level, topic.pairs.length);
      acts.push({ format: "matching", level: level, pick: pk, pairs: topic.pairs,
        instructions: topic.pairsInstr || "Empareja cada carta con su pareja." });
      acts.push({ format: "memory", level: level, pick: pk, pairs: topic.pairs,
        instructions: (topic.pairsInstr || "Encuentra las parejas.") + " ¡Encuentra las parejas!" });
    }
    acts.sort(function (a, b) { return (FORMAT_ORDER[a.format] || 9) - (FORMAT_ORDER[b.format] || 9); });
    return acts;
  }

  function countTopicGames(topic) {
    var n = 0;
    LEVELS.forEach(function (lv) { n += activitiesForLevel(topic, lv).length; });
    return n;
  }

  // ============================ pantalla: HOME ============================
  function renderHome() {
    var av = avatarOf(profile);
    app.appendChild(el(
      '<div class="hero">' +
        '<div class="mascot"><img class="hero-logo" src="assets/logo-arrayanes.png" alt="Gimnasio Los Arrayanes Bilingüe"></div>' +
        '<h1>Grado Primero</h1>' +
        '<p class="school">Gimnasio Los Arrayanes Bilingüe</p>' +
      '</div>'
    ));
    var greet = el(
      '<button class="player-chip" title="Cambiar perfil">' +
        (av ? '<span class="player-avatar">' + avatarImg(av) + '</span>' : "") +
        '<span class="player-txt">¡Hola, <b>' + esc(profile.name) + '</b>! Elige una materia 🎮</span>' +
        '<span class="player-edit">✏️</span>' +
      '</button>'
    );
    greet.addEventListener("click", function () { go("profile"); });
    app.appendChild(greet);
    app.appendChild(el('<div class="section-label">Materias</div>'));
    var grid = el('<div class="subjects"></div>');
    ["science", "english"].forEach(function (sid) {
      var s = DATA[sid];
      if (!s) return;
      var nTopics = 0, nGames = 0;
      s.terms.forEach(function (t) { t.topics.forEach(function (tp) { nTopics++; nGames += countTopicGames(tp); }); });
      var card = el(
        '<button class="subject-card ' + s.color + '">' +
          '<div class="strip"></div>' +
          '<div class="emoji">' + s.emoji + '</div>' +
          '<div class="name">' + esc(s.title) + '</div>' +
          '<div class="desc">' + nTopics + ' temas · ' + nGames + ' juegos</div>' +
        '</button>'
      );
      card.addEventListener("click", function () { go("topics", { subjectId: sid }); });
      grid.appendChild(card);
    });
    app.appendChild(grid);

    var share = el('<button class="btn-share">📤 Compartir con otros padres</button>');
    share.addEventListener("click", function () { shareApp(); });
    app.appendChild(share);

    app.appendChild(el('<div class="footer-note">Gimnasio Los Arrayanes Bilingüe · Primero de primaria</div>'));
  }

  function shareApp() {
    var url = location.href.split("#")[0];
    var data = {
      title: "Repaso · Grado Primero · Los Arrayanes",
      text: "App de repaso de Science e Inglés para Grado Primero del Gimnasio Los Arrayanes Bilingüe 🎮",
      url: url
    };
    if (navigator.share) {
      navigator.share(data).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { toast("¡Enlace copiado! 📋 Pégalo a otros padres."); }, function () { toast(url); });
    } else {
      toast(url);
    }
  }

  // toast breve (para avisos)
  function toast(msg) {
    var t = el('<div class="toast">' + esc(msg) + '</div>');
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 20);
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 300); }, 2200);
  }

  // ============================ pantalla: TEMAS ============================
  function renderTopics() {
    var s = DATA[state.subjectId];
    app.appendChild(topbar(esc(s.title), s.emoji + " Elige un tema", function () { go("home"); }));
    s.terms.forEach(function (term) {
      var block = el('<div class="term-block"></div>');
      block.appendChild(el('<div class="term-title">' + esc(term.title) + '</div>'));
      var grid = el('<div class="topics"></div>');
      term.topics.forEach(function (topic) {
        var card = el(
          '<button class="topic-card">' +
            '<div class="t-emoji">' + pic(topic.emoji) + '</div>' +
            '<div class="t-name">' + esc(topic.title) + '</div>' +
            '<div class="t-meta">' +
              '<span class="chip">' + esc(topic.cycle) + '</span>' +
              '<span class="chip game">' + countTopicGames(topic) + ' juegos</span>' +
            '</div>' +
          '</button>'
        );
        card.addEventListener("click", function () { go("activities", { topic: topic }); });
        grid.appendChild(card);
      });
      block.appendChild(grid);
      app.appendChild(block);
    });
  }

  // ============================ pantalla: ACTIVIDADES ============================
  // Agrupada por nivel: cada nivel muestra VARIOS formatos para escoger.
  function renderActivities() {
    var topic = state.topic;
    app.appendChild(topbar(esc(topic.title), "Elige un nivel y un juego", function () { go("topics", { subjectId: state.subjectId }); }));
    app.appendChild(el('<div class="topic-hero">' + pic(topic.emoji) + '</div>'));

    LEVELS.forEach(function (level) {
      var acts = activitiesForLevel(topic, level);
      if (!acts.length) return;
      var lm = LEVEL_META[level] || { cls: "lvl-mid", icon: "⚪" };
      var group = el('<div class="level-group"></div>');
      group.appendChild(el('<div class="level-head ' + lm.cls + '">' + lm.icon + ' ' + esc(level) + '</div>'));
      var list = el('<div class="activities"></div>');
      acts.forEach(function (act) {
        var gm = GAME_META[act.format] || { label: act.format, icon: "🎮" };
        var count = act.pairs ? (act.pick || act.pairs.length) : countItems(act);
        var unit = act.pairs ? "parejas" : "preguntas";
        var card = el(
          '<button class="activity-card ' + lm.cls + '">' +
            '<span class="a-icon">' + gm.icon + '</span>' +
            '<span class="a-body">' +
              '<span class="a-title">' + esc(gm.label) + '</span>' +
              '<span class="a-count">' + count + ' ' + unit + '</span>' +
            '</span>' +
          '</button>'
        );
        card.addEventListener("click", function () { go("game", { activity: act }); });
        list.appendChild(card);
      });
      group.appendChild(list);
      app.appendChild(group);
    });
  }

  // ============================ pantalla: JUEGO ============================
  function renderGame() {
    var topic = state.topic, act = state.activity;
    var gm = GAME_META[act.format] || { label: act.format, icon: "🎮" };
    app.appendChild(topbar(esc(topic.title), gm.icon + " " + gm.label + " · " + esc(act.level),
      function () { go("activities", { topic: topic }); }));
    app.appendChild(el('<div class="instructions">' + esc(act.instructions || "") + '</div>'));
    var wrap = el('<div class="game-wrap"></div>');
    app.appendChild(wrap);

    var starter = { trivia: playQuiz, fill: playQuiz, matching: playMatching, memory: playMemory, order: playOrder }[act.format];
    if (starter) starter(act, wrap);
    else wrap.appendChild(el('<div class="instructions">Tipo de juego no reconocido 🤔</div>'));
  }

  // ---------- resultado (común) ----------
  function showResult(wrap, score, total) {
    var pct = total > 0 ? score / total : 0;
    var stars = pct >= 0.85 ? 3 : pct >= 0.55 ? 2 : 1;
    var faces = ["😺", "😻", "🤩"];
    var who = profile && profile.name ? ", " + profile.name : "";
    var titles = ["¡Buen intento" + who + "!", "¡Muy bien" + who + "!", "¡Increíble" + who + "!"];
    var msgs = [
      "Sigue practicando, ¡lo vas a lograr! 💪",
      "¡Vas súper bien! Cada día aprendes más 🌟",
      "¡Eres una estrella! Lo hiciste genial 🏆"
    ];
    beep("win");
    if (stars >= 2) confetti();
    wrap.innerHTML = "";
    var starStr = "";
    for (var i = 0; i < 3; i++) starStr += i < stars ? "⭐" : "☆";
    var box = el(
      '<div class="result">' +
        '<div class="big-emoji">' + faces[stars - 1] + '</div>' +
        '<h2>' + titles[stars - 1] + '</h2>' +
        '<div class="stars">' + starStr + '</div>' +
        '<div class="score">' + score + ' de ' + total + ' 🎯</div>' +
        '<div class="msg">' + msgs[stars - 1] + '</div>' +
        '<div class="result-actions">' +
          '<button class="btn-primary">🔁 Jugar otra vez</button>' +
          '<button class="btn-secondary">🎮 Otro juego de este tema</button>' +
        '</div>' +
      '</div>'
    );
    box.querySelector(".btn-primary").addEventListener("click", function () { go("game", { activity: state.activity }); });
    box.querySelector(".btn-secondary").addEventListener("click", function () { go("activities", { topic: state.topic }); });
    wrap.appendChild(box);
  }

  // ============================ JUEGO: Trivia / Completar ============================
  function playQuiz(act, wrap) {
    var items = sample(act.items, act.pick || PICK[act.format]);
    var idx = 0, score = 0;
    var isFill = act.format === "fill";

    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    var stage = el('<div></div>');
    wrap.appendChild(progress); wrap.appendChild(stage);

    function draw() {
      var item = items[idx];
      progress.querySelector(".progress-fill").style.width = (idx / items.length * 100) + "%";
      progress.querySelector(".progress-txt").textContent = (idx + 1) + " / " + items.length;

      var qHtml, readText;
      if (isFill) {
        var sentence = esc(item.sentence).replace("___", '<b>?</b>');
        readText = readableSentence(item.sentence);
        qHtml = '<div class="q-emoji">' + pic(item.img || "✏️") + '</div><div class="q-text q-blank">' + sentence + '</div>';
      } else {
        readText = item.question;
        qHtml = '<div class="q-emoji">' + pic(item.img || "❓") + '</div><div class="q-text">' + esc(item.question) + '</div>';
      }
      var nOpt = item.options.length;
      var optClass = nOpt === 2 ? "options two" : "options multi";

      // Mezclamos el orden de las opciones para que la respuesta correcta
      // no quede siempre en el mismo lugar (y para variar entre partidas).
      var shown = shuffle(item.options.map(function (o, i) { return { text: o, ok: i === item.answer }; }));

      stage.innerHTML = "";
      var card = el('<div class="question-card">' + qHtml + speakBtn(readText) + '</div>');
      wireSpeak(card);
      stage.appendChild(card);
      say(readText); // apoyo de lectura: lee la frase al aparecer
      var opts = el('<div class="' + optClass + '"></div>');
      shown.forEach(function (o, i) {
        var b = el('<button class="opt">' + esc(o.text) + '</button>');
        b.addEventListener("click", function () { choose(i, opts, shown); });
        opts.appendChild(b);
      });
      stage.appendChild(opts);
      stage.appendChild(el('<div class="feedback"></div>'));
      var next = el('<button class="btn-next hidden">Siguiente →</button>');
      next.addEventListener("click", function () {
        idx++;
        if (idx >= items.length) showResult(wrap, score, items.length);
        else draw();
      });
      stage.appendChild(next);
    }

    function choose(i, opts, shown) {
      var buttons = opts.querySelectorAll(".opt");
      if (buttons[0].disabled) return;
      var correct = shown[i].ok;
      buttons.forEach(function (b, bi) {
        b.disabled = true;
        if (shown[bi].ok) b.classList.add("correct");
        else if (bi === i) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      var fb = stage.querySelector(".feedback");
      if (correct) { score++; fb.className = "feedback ok"; fb.textContent = pick(["¡Correcto! 🎉", "¡Muy bien! ✅", "¡Genial! 🌟"]); beep("ok"); }
      else { fb.className = "feedback bad"; fb.textContent = "¡Casi! Mira la respuesta 👀"; beep("bad"); }
      var next = stage.querySelector(".btn-next");
      next.classList.remove("hidden");
      next.textContent = idx + 1 >= items.length ? "Ver resultado 🏁" : "Siguiente →";
    }
    draw();
  }

  // ============================ JUEGO: Emparejar ============================
  function playMatching(act, wrap) {
    var pairs = sample(act.pairs, act.pick || PICK.matching);
    var left = shuffle(pairs.map(function (p, i) { return { id: i, txt: p.a }; }));
    var right = shuffle(pairs.map(function (p, i) { return { id: i, img: p.b }; }));
    var matched = 0, mistakes = 0, selectedLeft = null, selectedRight = null, locked = false;

    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    wrap.appendChild(progress);
    var grid = el('<div class="match-grid"><div class="match-col" data-side="l"></div><div class="match-col" data-side="r"></div></div>');
    wrap.appendChild(grid);
    var lcol = grid.querySelector('[data-side="l"]'), rcol = grid.querySelector('[data-side="r"]');

    function updateProgress() {
      progress.querySelector(".progress-fill").style.width = (matched / pairs.length * 100) + "%";
      progress.querySelector(".progress-txt").textContent = matched + " / " + pairs.length;
    }
    left.forEach(function (d) {
      var b = el('<button class="match-item word">' + esc(d.txt) + '</button>');
      b.dataset.id = d.id;
      b.addEventListener("click", function () { onPick(b, "l", d); });
      lcol.appendChild(b);
    });
    right.forEach(function (d) {
      var b = el('<button class="match-item emoji">' + pic(d.img) + '</button>');
      b.dataset.id = d.id;
      b.addEventListener("click", function () { onPick(b, "r", d); });
      rcol.appendChild(b);
    });
    updateProgress();

    function onPick(btn, side, data) {
      if (locked || btn.classList.contains("done")) return;
      if (side === "l") { say(data.txt); if (selectedLeft) selectedLeft.btn.classList.remove("selected"); selectedLeft = { btn: btn, data: data }; }
      else { if (selectedRight) selectedRight.btn.classList.remove("selected"); selectedRight = { btn: btn, data: data }; }
      btn.classList.add("selected");
      if (selectedLeft && selectedRight) evaluate();
    }
    function evaluate() {
      locked = true;
      var l = selectedLeft, r = selectedRight;
      if (l.data.id === r.data.id) {
        beep("ok");
        l.btn.classList.remove("selected"); r.btn.classList.remove("selected");
        l.btn.classList.add("done"); r.btn.classList.add("done");
        matched++; updateProgress();
        selectedLeft = selectedRight = null; locked = false;
        if (matched === pairs.length) setTimeout(function () { showResult(wrap, Math.max(1, pairs.length - Math.floor(mistakes / 2)), pairs.length); }, 350);
      } else {
        beep("bad"); mistakes++;
        l.btn.classList.add("shake"); r.btn.classList.add("shake");
        setTimeout(function () {
          l.btn.classList.remove("shake", "selected"); r.btn.classList.remove("shake", "selected");
          selectedLeft = selectedRight = null; locked = false;
        }, 500);
      }
    }
  }

  // ============================ JUEGO: Memoria ============================
  function playMemory(act, wrap) {
    var basePairs = sample(act.pairs, act.pick || PICK.memory);
    var cards = shuffle(basePairs.reduce(function (acc, p, i) {
      acc.push({ id: i, face: p.a }); acc.push({ id: i, face: p.b }); return acc;
    }, []));
    var totalPairs = basePairs.length, matched = 0, moves = 0, first = null, locked = false;

    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    wrap.appendChild(progress);
    var grid = el('<div class="memory-grid"></div>');
    if (totalPairs * 2 > 12) grid.classList.add("dense");
    wrap.appendChild(grid);

    function updateProgress() {
      progress.querySelector(".progress-fill").style.width = (matched / totalPairs * 100) + "%";
      progress.querySelector(".progress-txt").textContent = matched + " / " + totalPairs;
    }
    cards.forEach(function (c) {
      var card = el(
        '<div class="mem-card"><div class="mem-inner">' +
          '<div class="mem-face mem-back">?</div>' +
          '<div class="mem-face mem-front">' + pic(c.face) + '</div>' +
        '</div></div>'
      );
      card.dataset.pid = c.id;
      card.addEventListener("click", function () { flip(card, c); });
      grid.appendChild(card);
    });
    updateProgress();

    function flip(card, c) {
      if (locked || card.classList.contains("flipped") || card.classList.contains("matched")) return;
      card.classList.add("flipped");
      if (!first) { first = { card: card, c: c }; return; }
      moves++;
      if (first.c.id === c.id && first.card !== card) {
        beep("ok");
        first.card.classList.add("matched"); card.classList.add("matched");
        first = null; matched++; updateProgress();
        if (matched === totalPairs) setTimeout(function () {
          var extra = moves - totalPairs;
          showResult(wrap, Math.min(totalPairs, Math.max(1, totalPairs - Math.floor(extra / 2))), totalPairs);
        }, 400);
      } else {
        beep("bad"); locked = true;
        var a = first.card, b = card;
        setTimeout(function () { a.classList.remove("flipped"); b.classList.remove("flipped"); first = null; locked = false; }, 750);
      }
    }
  }

  // ============================ JUEGO: Ordenar ============================
  function playOrder(act, wrap) {
    var steps = act.steps.map(splitStep);
    var total = steps.length, expected = 0, mistakes = 0;

    wrap.appendChild(el('<div class="order-prompt">' + esc(act.prompt || "Ordena los pasos") + '</div>'));
    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    wrap.appendChild(progress);
    var tray = el('<div class="order-tray"></div>');
    wrap.appendChild(tray);
    var pool = el('<div class="order-pool"></div>');
    wrap.appendChild(pool);

    function updateProgress() {
      progress.querySelector(".progress-fill").style.width = (expected / total * 100) + "%";
      progress.querySelector(".progress-txt").textContent = expected + " / " + total;
    }
    shuffle(steps.map(function (s, i) { return { step: s, pos: i }; })).forEach(function (d) {
      var chip = el('<button class="order-chip">' + (d.step.img ? pic(d.step.img) + " " : "") + esc(d.step.text) + '</button>');
      chip.dataset.pos = d.pos;
      chip.addEventListener("click", function () { tap(chip, d); });
      pool.appendChild(chip);
    });
    updateProgress();

    function tap(chip, d) {
      if (chip.classList.contains("used")) return;
      if (d.pos === expected) {
        beep("ok");
        chip.classList.add("used");
        tray.appendChild(el('<div class="tray-chip"><span class="num">' + (expected + 1) + '</span>' +
          (d.step.img ? pic(d.step.img) + " " : "") + esc(d.step.text) + '</div>'));
        expected++; updateProgress();
        if (expected === total) setTimeout(function () {
          showResult(wrap, Math.min(total, Math.max(1, total - Math.floor(mistakes / 2))), total);
        }, 350);
      } else {
        beep("bad"); mistakes++;
        chip.classList.add("shake");
        setTimeout(function () { chip.classList.remove("shake"); }, 500);
      }
    }
  }

  // ============================ arranque ============================
  if (!DATA.science && !DATA.english) {
    app.innerHTML = '<div class="instructions">No se cargaron los datos. Revisa los archivos de /data 🧩</div>';
  } else {
    render();
  }
})();
