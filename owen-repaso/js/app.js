/* =========================================================================
   Modo de Repaso — Grado Primero · Gimnasio Los Arrayanes Bilingüe
   Motor estilo Duolingo (sin contenido hardcodeado)
   -------------------------------------------------------------------------
   El contenido vive en /data/science.js y /data/english.js (no se toca).

   Cómo funciona el "modo Duolingo":
   - CAMINO (path): cada materia es un camino de nodos (uno por tema),
     agrupados por Term. Un nodo se desbloquea cuando el anterior tiene
     al menos 1 corona. Cada tema acumula CORONAS 👑 (0→3):
       0 coronas -> la lección se juega en Fácil
       1 corona  -> Medio
       2 coronas -> Difícil
       3 coronas -> práctica (Difícil, sin corona nueva)
   - LECCIÓN: mezcla ejercicios generados desde los bancos del tema:
     completar/trivia (items), elegir imagen y escuchar 🔊 (pairs),
     emparejar (pairs) y ordenar (steps). Los errores restan un corazón
     y el ejercicio SE REPITE al final, como en Duolingo.
   - PROGRESO: XP ⚡, racha diaria 🔥 y coronas se guardan en el
     dispositivo (localStorage). Sin cuentas ni internet.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.OWEN_DATA || {};
  var ICONS = window.OWEN_ICONS || {};
  var EMOJI = window.OWEN_EMOJI || {};
  var app = document.getElementById("app");

  var LEVELS = ["Fácil", "Medio", "Difícil"];
  var HEARTS_MAX = 5;

  var state = { screen: "home", subjectId: null, topic: null };

  // ============================ progreso guardado ============================
  var STORE_KEY = "arrayanes-repaso-v1";
  var S = (function () {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  })();
  S.xp = S.xp || 0;
  S.crowns = S.crowns || {};            // topicId -> 0..3
  S.streak = S.streak || { count: 0, last: null };
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* sin storage */ }
  }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }
  function touchStreak() {
    var t = todayStr();
    if (S.streak.last === t) return;
    var y = new Date(); y.setDate(y.getDate() - 1);
    var yest = y.getFullYear() + "-" + (y.getMonth() + 1) + "-" + y.getDate();
    S.streak.count = (S.streak.last === yest) ? S.streak.count + 1 : 1;
    S.streak.last = t;
  }
  function crownsOf(topicId) { return S.crowns[topicId] || 0; }

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
  function sample(arr, n) { var s = shuffle(arr); return (n && n < s.length) ? s.slice(0, n) : s; }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

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
  function splitStep(step) {
    if (typeof step === "object") return step;
    var m = String(step).match(/^(.*?)\s+(svg:\S+|[^\s\w].*)$/u);
    if (m) return { text: m[1], img: m[2] };
    return { text: String(step), img: null };
  }
  function pairsAreOneToOne(pairs) {
    var seenA = {}, seenB = {};
    for (var i = 0; i < pairs.length; i++) {
      if (seenA[pairs[i].a] || seenB[pairs[i].b]) return false;
      seenA[pairs[i].a] = 1; seenB[pairs[i].b] = 1;
    }
    return true;
  }
  function usablePairs(topic) {
    return (topic.pairs && topic.pairs.length >= 4 && pairsAreOneToOne(topic.pairs)) ? topic.pairs : null;
  }

  // ---------- voz (escuchar 🔊) ----------
  var hasTTS = (typeof window.speechSynthesis !== "undefined") && (typeof window.SpeechSynthesisUtterance !== "undefined");
  function say(text) {
    if (!hasTTS) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    } catch (e) { /* sin voz */ }
  }

  // ---------- sonidos ----------
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
    } catch (e) { /* silencio */ }
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
  function toast(msg) {
    var t = el('<div class="toast">' + msg + '</div>');
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 20);
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 300); }, 1400);
  }

  // ============================ navegación ============================
  function go(screen, opts) {
    opts = opts || {};
    ["subjectId", "topic"].forEach(function (k) { if (k in opts) state[k] = opts[k]; });
    state.screen = screen;
    render();
    window.scrollTo(0, 0);
  }
  function render() {
    app.innerHTML = "";
    if (state.screen === "home") return renderHome();
    if (state.screen === "path") return renderPath();
    if (state.screen === "lesson") return renderLesson();
  }

  function statsBar() {
    var totalCrowns = 0;
    Object.keys(S.crowns).forEach(function (k) { totalCrowns += S.crowns[k]; });
    return el(
      '<div class="stats-bar">' +
        '<span class="stat">🔥 ' + S.streak.count + '</span>' +
        '<span class="stat">⚡ ' + S.xp + '</span>' +
        '<span class="stat">👑 ' + totalCrowns + '</span>' +
      '</div>'
    );
  }

  // ============================ pantalla: HOME ============================
  function renderHome() {
    app.appendChild(statsBar());
    app.appendChild(el(
      '<div class="hero">' +
        '<div class="mascot"><img class="hero-logo" src="assets/logo-arrayanes.png" alt="Gimnasio Los Arrayanes Bilingüe"></div>' +
        '<h1>Grado Primero</h1>' +
        '<p class="school">Gimnasio Los Arrayanes Bilingüe</p>' +
        '<p>¡Hola! Elige tu curso y sigue el camino 🗺️</p>' +
      '</div>'
    ));
    app.appendChild(el('<div class="section-label">Cursos</div>'));
    var grid = el('<div class="subjects"></div>');
    ["science", "english"].forEach(function (sid) {
      var s = DATA[sid];
      if (!s) return;
      var topics = allTopics(s);
      var earned = 0;
      topics.forEach(function (tp) { earned += crownsOf(tp.id); });
      var card = el(
        '<button class="subject-card ' + s.color + '">' +
          '<div class="strip"></div>' +
          '<div class="emoji">' + s.emoji + '</div>' +
          '<div class="name">' + esc(s.title) + '</div>' +
          '<div class="desc">👑 ' + earned + ' / ' + (topics.length * 3) + '</div>' +
        '</button>'
      );
      card.addEventListener("click", function () { go("path", { subjectId: sid }); });
      grid.appendChild(card);
    });
    app.appendChild(grid);
    app.appendChild(el('<div class="footer-note">Gimnasio Los Arrayanes Bilingüe · Primero de primaria</div>'));
  }

  function allTopics(subject) {
    var out = [];
    subject.terms.forEach(function (t) { t.topics.forEach(function (tp) { out.push(tp); }); });
    return out;
  }

  // ============================ pantalla: CAMINO ============================
  function renderPath() {
    var s = DATA[state.subjectId];
    var bar = el(
      '<div class="topbar">' +
        '<button class="btn-back" aria-label="Volver">←</button>' +
        '<div class="title-wrap"><h1>' + esc(s.title) + '</h1><div class="sub">' + s.emoji + ' Sigue el camino</div></div>' +
      '</div>'
    );
    bar.querySelector(".btn-back").addEventListener("click", function () { go("home"); });
    app.appendChild(bar);
    app.appendChild(statsBar());

    var idx = 0;          // índice global del nodo dentro de la materia
    var prevTopic = null; // para la regla de desbloqueo
    var OFFSETS = [0, -70, -100, -70, 0, 70, 100, 70];

    s.terms.forEach(function (term) {
      app.appendChild(el('<div class="unit-banner ' + s.color + '">' + esc(term.title) + ' · ' + esc(s.title) + '</div>'));
      var path = el('<div class="path"></div>');
      term.topics.forEach(function (topic) {
        var crowns = crownsOf(topic.id);
        var unlocked = (prevTopic === null) || crownsOf(prevTopic.id) >= 1;
        var isCurrent = unlocked && crowns < 3;
        var cls = !unlocked ? "locked" : (crowns >= 3 ? "done" : "current");

        var wrap = el('<div class="node-wrap" style="transform:translateX(' + OFFSETS[idx % OFFSETS.length] + 'px)"></div>');
        if (isCurrent && (prevTopic === null || crownsOf(prevTopic.id) >= 1) && crowns === 0 && firstPending(s) === topic.id) {
          wrap.appendChild(el('<div class="start-bubble">¡EMPIEZA!</div>'));
        }
        var node = el(
          '<button class="node ' + cls + " " + s.color + '" ' + (unlocked ? "" : "disabled") + ">" +
            '<span class="node-emoji">' + (unlocked ? pic(topic.emoji) : "🔒") + '</span>' +
            (crowns > 0 ? '<span class="crowns">👑' + crowns + '</span>' : "") +
          '</button>'
        );
        node.dataset.topic = topic.id;
        (function (topic, unlocked) {
          node.addEventListener("click", function () {
            if (!unlocked) { node.classList.add("shake"); setTimeout(function () { node.classList.remove("shake"); }, 450); toast("Completa el nodo anterior 🔒"); return; }
            go("lesson", { topic: topic });
          });
        })(topic, unlocked);
        wrap.appendChild(node);
        wrap.appendChild(el('<div class="node-label">' + esc(topic.title) + '</div>'));
        path.appendChild(wrap);
        prevTopic = topic;
        idx++;
      });
      app.appendChild(path);
    });
    app.appendChild(el('<div class="footer-note">👑 Gana 3 coronas en cada tema: Fácil → Medio → Difícil</div>'));
  }

  function firstPending(subject) {
    var topics = allTopics(subject);
    for (var i = 0; i < topics.length; i++) {
      var unlocked = i === 0 || crownsOf(topics[i - 1].id) >= 1;
      if (unlocked && crownsOf(topics[i].id) < 3) return topics[i].id;
    }
    return null;
  }

  // ============================ generador de LECCIÓN ============================
  // Mezcla ejercicios desde los bancos del tema, según el nivel actual.
  function optCount(level) { return level === "Fácil" ? 3 : 4; }
  function matchCount(level, n) {
    var base = level === "Fácil" ? 4 : level === "Medio" ? 5 : 6;
    return Math.min(base, n);
  }

  function buildLesson(topic, level) {
    var ex = [];
    var pairs = usablePairs(topic);

    // 1) preguntas escritas (trivia / completar) de este nivel
    var qitems = [];
    (topic.activities || []).forEach(function (a) {
      if ((a.format === "trivia" || a.format === "fill") && a.level === level) {
        a.items.forEach(function (it) { qitems.push({ fill: a.format === "fill", item: it, instructions: a.instructions }); });
      }
    });
    sample(qitems, 4).forEach(function (q) { ex.push({ kind: "quiz", fill: q.fill, item: q.item, instructions: q.instructions }); });

    // 2) sintetizados desde el banco de parejas
    if (pairs) {
      var nSel = qitems.length ? 2 : 4;
      for (var i = 0; i < nSel; i++) ex.push(makeSelect(pairs, level, i % 2 === 1));
      ex.push({ kind: "match", pairs: sample(pairs, matchCount(level, pairs.length)), instructions: topic.pairsInstr || "Empareja las cartas." });
      if (hasTTS) ex.push(makeListen(pairs, level));
      if (!qitems.length && hasTTS) ex.push(makeListen(pairs, level));
    }

    // 3) ordenar (si el tema lo tiene en este nivel)
    var orders = (topic.activities || []).filter(function (a) { return a.format === "order" && a.level === level; });
    if (orders.length) ex.push({ kind: "order", act: orders[0] });

    // Mínimo 6 ejercicios: rellenar con más "elige la imagen"
    while (ex.length < 6 && pairs) ex.push(makeSelect(pairs, level, ex.length % 2 === 0));

    return shuffle(ex);
  }

  function makeSelect(pairs, level, reverse) {
    var chosen = sample(pairs, optCount(level));
    var target = chosen[0];
    return { kind: "select", reverse: !!reverse, target: target, options: shuffle(chosen) };
  }
  function makeListen(pairs, level) {
    var chosen = sample(pairs, optCount(level));
    return { kind: "listen", target: chosen[0], options: shuffle(chosen) };
  }

  // ============================ pantalla: LECCIÓN ============================
  function renderLesson() {
    var topic = state.topic;
    var crowns = crownsOf(topic.id);
    var level = LEVELS[Math.min(crowns, 2)];
    var practice = crowns >= 3;

    var queue = buildLesson(topic, level);
    var idx = 0, hearts = HEARTS_MAX, combo = 0, best = 0, mistakes = 0;

    // --- barra superior estilo Duolingo: salir, progreso, corazones ---
    var top = el(
      '<div class="lesson-top">' +
        '<button class="btn-quit" aria-label="Salir">✕</button>' +
        '<div class="progress-track"><div class="progress-fill"></div></div>' +
        '<div class="hearts">❤️ <b>' + hearts + '</b></div>' +
      '</div>'
    );
    top.querySelector(".btn-quit").addEventListener("click", function () { go("path", { subjectId: state.subjectId }); });
    app.appendChild(top);
    app.appendChild(el('<div class="lesson-meta">' + pic(topic.emoji) + ' <b>' + esc(topic.title) + '</b> · ' + esc(level) + (practice ? " · Práctica" : "") + '</div>'));

    var stage = el('<div class="game-wrap"></div>');
    app.appendChild(stage);

    function updateTop() {
      top.querySelector(".progress-fill").style.width = Math.round(idx / queue.length * 100) + "%";
      top.querySelector(".hearts b").textContent = hearts;
    }

    function next() {
      idx++;
      if (idx >= queue.length) return finish();
      updateTop();
      show(queue[idx]);
    }

    // answered: true = bien, false = mal (resta corazón y re-encola), null = sin corazones (match/order)
    function answered(ok) {
      if (ok === true) {
        combo++; if (combo > best) best = combo;
        if (combo === 3 || combo === 5 || combo === 8) toast("¡Racha de " + combo + "! 🔥");
      } else if (ok === false) {
        combo = 0; mistakes++; hearts--;
        updateTop();
        // el ejercicio se repite al final, como en Duolingo
        var clone = {}; for (var k in queue[idx]) clone[k] = queue[idx][k];
        clone.requeued = true;
        queue.push(clone);
        if (hearts <= 0) return fail();
      }
      next();
    }

    function finish() {
      touchStreak();
      var gained = practice ? 5 : 10;
      if (mistakes === 0) gained += 5;
      S.xp += gained;
      if (!practice) S.crowns[topic.id] = Math.min(3, crowns + 1);
      save();
      beep("win"); confetti();

      stage.innerHTML = "";
      top.querySelector(".progress-fill").style.width = "100%";
      var newCrowns = crownsOf(topic.id);
      var owl = EMOJI["🦉"] ? '<img class="owl" src="assets/emoji/' + EMOJI["🦉"] + '.svg" alt="">' : '<div class="big-emoji">🤩</div>';
      var box = el(
        '<div class="result">' + owl +
          '<h2>' + (mistakes === 0 ? "¡Lección perfecta!" : "¡Lección completada!") + '</h2>' +
          (!practice ? '<div class="stars">👑 ' + newCrowns + ' / 3</div>' : '<div class="stars">💪 Práctica</div>') +
          '<div class="xp-pill">⚡ +' + gained + ' XP</div>' +
          '<div class="msg">Racha 🔥 ' + S.streak.count + ' · Mejor combo: ' + best + '</div>' +
          '<div class="result-actions">' +
            '<button class="btn-primary">Continuar →</button>' +
          '</div>' +
        '</div>'
      );
      box.querySelector(".btn-primary").addEventListener("click", function () { go("path", { subjectId: state.subjectId }); });
      stage.appendChild(box);
    }

    function fail() {
      beep("bad");
      stage.innerHTML = "";
      var box = el(
        '<div class="result">' +
          '<div class="big-emoji">💔</div>' +
          '<h2>¡Se acabaron los corazones!</h2>' +
          '<div class="msg">No pasa nada. ¡Inténtalo otra vez, tú puedes! 💪</div>' +
          '<div class="result-actions">' +
            '<button class="btn-primary">🔁 Intentar de nuevo</button>' +
            '<button class="btn-secondary">🗺️ Volver al camino</button>' +
          '</div>' +
        '</div>'
      );
      box.querySelector(".btn-primary").addEventListener("click", function () { go("lesson", { topic: topic }); });
      box.querySelector(".btn-secondary").addEventListener("click", function () { go("path", { subjectId: state.subjectId }); });
      stage.appendChild(box);
    }

    // ---------- render de cada tipo de ejercicio ----------
    function show(ex) {
      stage.innerHTML = "";
      if (ex.kind === "quiz") return showQuiz(ex);
      if (ex.kind === "select") return showSelect(ex);
      if (ex.kind === "listen") return showListen(ex);
      if (ex.kind === "match") return showMatch(ex);
      if (ex.kind === "order") return showOrder(ex);
      next();
    }

    function feedbackAndNext(ok, correctLabel) {
      var fb = stage.querySelector(".feedback");
      if (ok) { fb.className = "feedback ok"; fb.textContent = pick(["¡Correcto! 🎉", "¡Muy bien! ✅", "¡Genial! 🌟"]); beep("ok"); }
      else { fb.className = "feedback bad"; fb.textContent = "La respuesta era: " + correctLabel + " 👀"; beep("bad"); }
      var btn = el('<button class="btn-next">Continuar →</button>');
      btn.addEventListener("click", function () { answered(ok); });
      stage.appendChild(btn);
    }

    function showQuiz(ex) {
      var item = ex.item;
      stage.appendChild(el('<div class="instructions">' + esc(ex.instructions || (ex.fill ? "Completa la oración." : "Elige la respuesta.")) + '</div>'));
      var qHtml;
      if (ex.fill) {
        qHtml = '<div class="q-emoji">' + pic(item.img || "✏️") + '</div><div class="q-text q-blank">' + esc(item.sentence).replace("___", "<b>?</b>") + '</div>';
      } else {
        qHtml = '<div class="q-emoji">' + pic(item.img || "❓") + '</div><div class="q-text">' + esc(item.question) + '</div>';
      }
      stage.appendChild(el('<div class="question-card">' + qHtml + '</div>'));
      var shown = shuffle(item.options.map(function (o, i) { return { text: o, ok: i === item.answer }; }));
      var opts = el('<div class="options ' + (shown.length === 2 ? "two" : "multi") + '"></div>');
      shown.forEach(function (o) {
        var b = el('<button class="opt"' + (o.ok ? ' data-ok="1"' : "") + '>' + esc(o.text) + '</button>');
        b.addEventListener("click", function () { lockOpts(opts, o, b); feedbackAndNext(o.ok, correctText(shown)); });
        opts.appendChild(b);
      });
      stage.appendChild(opts);
      stage.appendChild(el('<div class="feedback"></div>'));
    }

    function correctText(shown) {
      for (var i = 0; i < shown.length; i++) if (shown[i].ok) return shown[i].text || shown[i].label || "";
      return "";
    }
    function lockOpts(opts, chosen, btn) {
      opts.querySelectorAll(".opt").forEach(function (b) {
        b.disabled = true;
        if (b.dataset.ok === "1") b.classList.add("correct");
        else if (b === btn) b.classList.add("wrong");
        else b.classList.add("dim");
      });
    }

    function showSelect(ex) {
      // reverse=false: palabra -> elige imagen | reverse=true: imagen -> elige palabra
      var t = ex.target;
      if (!ex.reverse) {
        stage.appendChild(el('<div class="instructions">Elige el dibujo correcto.</div>'));
        stage.appendChild(el('<div class="question-card"><div class="q-text big-word">' + esc(t.a) + '</div></div>'));
        var opts = el('<div class="options multi select-grid"></div>');
        ex.options.forEach(function (p) {
          var ok = p === t;
          var b = el('<button class="opt img-opt"' + (ok ? ' data-ok="1"' : "") + '>' + pic(p.b) + '</button>');
          b.addEventListener("click", function () { lockOpts(opts, null, b); feedbackAndNext(ok, t.a); });
          opts.appendChild(b);
        });
        stage.appendChild(opts);
      } else {
        stage.appendChild(el('<div class="instructions">Elige la palabra correcta.</div>'));
        stage.appendChild(el('<div class="question-card"><div class="q-emoji">' + pic(t.b) + '</div></div>'));
        var opts2 = el('<div class="options multi"></div>');
        ex.options.forEach(function (p) {
          var ok = p === t;
          var b = el('<button class="opt"' + (ok ? ' data-ok="1"' : "") + '>' + esc(p.a) + '</button>');
          b.addEventListener("click", function () { lockOpts(opts2, null, b); feedbackAndNext(ok, t.a); });
          opts2.appendChild(b);
        });
        stage.appendChild(opts2);
      }
      stage.appendChild(el('<div class="feedback"></div>'));
    }

    function showListen(ex) {
      var t = ex.target;
      stage.appendChild(el('<div class="instructions">Escucha y elige el dibujo. 🔊</div>'));
      var spk = el('<div class="question-card"><button class="speaker-btn" aria-label="Escuchar">🔊</button></div>');
      spk.querySelector(".speaker-btn").addEventListener("click", function () { say(t.a); });
      stage.appendChild(spk);
      setTimeout(function () { say(t.a); }, 350);
      var opts = el('<div class="options multi select-grid"></div>');
      ex.options.forEach(function (p) {
        var ok = p === t;
        var b = el('<button class="opt img-opt"' + (ok ? ' data-ok="1"' : "") + '>' + pic(p.b) + '</button>');
        b.addEventListener("click", function () { lockOpts(opts, null, b); feedbackAndNext(ok, t.a); });
        opts.appendChild(b);
      });
      stage.appendChild(opts);
      stage.appendChild(el('<div class="feedback"></div>'));
    }

    function showMatch(ex) {
      stage.appendChild(el('<div class="instructions">' + esc(ex.instructions) + '</div>'));
      var pairs = ex.pairs;
      var left = shuffle(pairs.map(function (p, i) { return { id: i, txt: p.a }; }));
      var right = shuffle(pairs.map(function (p, i) { return { id: i, img: p.b }; }));
      var matched = 0, selL = null, selR = null, locked = false;
      var grid = el('<div class="match-grid"><div class="match-col" data-side="l"></div><div class="match-col" data-side="r"></div></div>');
      stage.appendChild(grid);
      var lcol = grid.querySelector('[data-side="l"]'), rcol = grid.querySelector('[data-side="r"]');
      left.forEach(function (d) {
        var b = el('<button class="match-item word">' + esc(d.txt) + '</button>');
        b.dataset.id = d.id;
        b.addEventListener("click", function () { tap(b, "l", d); });
        lcol.appendChild(b);
      });
      right.forEach(function (d) {
        var b = el('<button class="match-item emoji">' + pic(d.img) + '</button>');
        b.dataset.id = d.id;
        b.addEventListener("click", function () { tap(b, "r", d); });
        rcol.appendChild(b);
      });
      function tap(btn, side, data) {
        if (locked || btn.classList.contains("done")) return;
        if (side === "l") { if (selL) selL.btn.classList.remove("selected"); selL = { btn: btn, data: data }; }
        else { if (selR) selR.btn.classList.remove("selected"); selR = { btn: btn, data: data }; }
        btn.classList.add("selected");
        if (selL && selR) evaluate();
      }
      function evaluate() {
        locked = true;
        if (selL.data.id === selR.data.id) {
          beep("ok");
          selL.btn.classList.remove("selected"); selR.btn.classList.remove("selected");
          selL.btn.classList.add("done"); selR.btn.classList.add("done");
          matched++; selL = selR = null; locked = false;
          if (matched === pairs.length) setTimeout(function () { answered(true); }, 380);
        } else {
          beep("bad");
          var a = selL.btn, b = selR.btn;
          a.classList.add("shake"); b.classList.add("shake");
          setTimeout(function () {
            a.classList.remove("shake", "selected"); b.classList.remove("shake", "selected");
            selL = selR = null; locked = false;
          }, 500);
        }
      }
    }

    function showOrder(ex) {
      var act = ex.act;
      var steps = act.steps.map(splitStep);
      var expected = 0;
      stage.appendChild(el('<div class="instructions">' + esc(act.instructions || "Ordena los pasos.") + '</div>'));
      stage.appendChild(el('<div class="order-prompt">' + esc(act.prompt || "") + '</div>'));
      var tray = el('<div class="order-tray"></div>');
      stage.appendChild(tray);
      var pool = el('<div class="order-pool"></div>');
      stage.appendChild(pool);
      shuffle(steps.map(function (s, i) { return { step: s, pos: i }; })).forEach(function (d) {
        var chip = el('<button class="order-chip">' + (d.step.img ? pic(d.step.img) + " " : "") + esc(d.step.text) + '</button>');
        chip.dataset.pos = d.pos;
        chip.addEventListener("click", function () {
          if (chip.classList.contains("used")) return;
          if (d.pos === expected) {
            beep("ok");
            chip.classList.add("used");
            tray.appendChild(el('<div class="tray-chip"><span class="num">' + (expected + 1) + '</span>' + (d.step.img ? pic(d.step.img) + " " : "") + esc(d.step.text) + '</div>'));
            expected++;
            if (expected === steps.length) setTimeout(function () { answered(true); }, 380);
          } else {
            beep("bad");
            chip.classList.add("shake");
            setTimeout(function () { chip.classList.remove("shake"); }, 500);
          }
        });
        pool.appendChild(chip);
      });
    }

    updateTop();
    show(queue[0]);
  }

  // ============================ arranque ============================
  if (!DATA.science && !DATA.english) {
    app.innerHTML = '<div class="instructions">No se cargaron los datos. Revisa los archivos de /data 🧩</div>';
  } else {
    render();
  }
})();
