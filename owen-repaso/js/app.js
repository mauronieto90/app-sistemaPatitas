/* =========================================================================
   Owen — Modo de Repaso  ·  Motor de la app (sin contenido hardcodeado)
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

  // Convierte un valor de imagen (emoji o "svg:nombre") en HTML para mostrar.
  function pic(val) {
    if (val == null) return "";
    val = String(val);
    if (val.indexOf("svg:") === 0) {
      var name = val.slice(4);
      return '<span class="pic-svg">' + (ICONS[name] || "❓") + "</span>";
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
    if (state.screen === "home") return renderHome();
    if (state.screen === "topics") return renderTopics();
    if (state.screen === "activities") return renderActivities();
    if (state.screen === "game") return renderGame();
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

  // ============================ pantalla: HOME ============================
  function renderHome() {
    app.appendChild(el(
      '<div class="hero">' +
        '<div class="mascot">🐾</div>' +
        '<h1>Modo de Repaso</h1>' +
        '<p>¡Hola Owen! Elige una materia para jugar 🎮</p>' +
      '</div>'
    ));
    app.appendChild(el('<div class="section-label">Materias</div>'));
    var grid = el('<div class="subjects"></div>');
    ["science", "english"].forEach(function (sid) {
      var s = DATA[sid];
      if (!s) return;
      var nTopics = 0, nGames = 0;
      s.terms.forEach(function (t) { t.topics.forEach(function (tp) { nTopics++; nGames += (tp.activities || []).length; }); });
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
    app.appendChild(el('<div class="footer-note">Gimnasio Los Arrayanes Bilingüe · Primero de primaria</div>'));
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
        var acts = topic.activities || [];
        var card = el(
          '<button class="topic-card">' +
            '<div class="t-emoji">' + pic(topic.emoji) + '</div>' +
            '<div class="t-name">' + esc(topic.title) + '</div>' +
            '<div class="t-meta">' +
              '<span class="chip">' + esc(topic.cycle) + '</span>' +
              '<span class="chip game">' + acts.length + ' juegos</span>' +
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
  function renderActivities() {
    var topic = state.topic;
    app.appendChild(topbar(esc(topic.title), "Elige un juego y nivel", function () { go("topics", { subjectId: state.subjectId }); }));
    app.appendChild(el('<div class="topic-hero">' + pic(topic.emoji) + '</div>'));

    var list = el('<div class="activities"></div>');
    (topic.activities || []).forEach(function (act) {
      var gm = GAME_META[act.format] || { label: act.format, icon: "🎮" };
      var lm = LEVEL_META[act.level] || { cls: "lvl-mid", icon: "⚪" };
      var card = el(
        '<button class="activity-card ' + lm.cls + '">' +
          '<span class="a-icon">' + gm.icon + '</span>' +
          '<span class="a-body">' +
            '<span class="a-title">' + esc(gm.label) + '</span>' +
            '<span class="a-count">' + countItems(act) + ' preguntas</span>' +
          '</span>' +
          '<span class="a-level">' + lm.icon + ' ' + esc(act.level) + '</span>' +
        '</button>'
      );
      card.addEventListener("click", function () { go("game", { activity: act }); });
      list.appendChild(card);
    });
    app.appendChild(list);
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
    var titles = ["¡Buen intento!", "¡Muy bien!", "¡Increíble, Owen!"];
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
    var items = shuffle(act.items);
    var idx = 0, score = 0;
    var isFill = act.format === "fill";

    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    var stage = el('<div></div>');
    wrap.appendChild(progress); wrap.appendChild(stage);

    function draw() {
      var item = items[idx];
      progress.querySelector(".progress-fill").style.width = (idx / items.length * 100) + "%";
      progress.querySelector(".progress-txt").textContent = (idx + 1) + " / " + items.length;

      var qHtml;
      if (isFill) {
        var sentence = esc(item.sentence).replace("___", '<b>?</b>');
        qHtml = '<div class="q-emoji">' + pic(item.img || "✏️") + '</div><div class="q-text q-blank">' + sentence + '</div>';
      } else {
        qHtml = '<div class="q-emoji">' + pic(item.img || "❓") + '</div><div class="q-text">' + esc(item.question) + '</div>';
      }
      var nOpt = item.options.length;
      var optClass = nOpt === 2 ? "options two" : "options multi";

      stage.innerHTML = "";
      stage.appendChild(el('<div class="question-card">' + qHtml + '</div>'));
      var opts = el('<div class="' + optClass + '"></div>');
      item.options.forEach(function (o, i) {
        var b = el('<button class="opt">' + esc(o) + '</button>');
        b.addEventListener("click", function () { choose(i, opts, item); });
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

    function choose(i, opts, item) {
      var buttons = opts.querySelectorAll(".opt");
      if (buttons[0].disabled) return;
      var correct = i === item.answer;
      buttons.forEach(function (b, bi) {
        b.disabled = true;
        if (bi === item.answer) b.classList.add("correct");
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
    var pairs = act.pairs;
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
      if (side === "l") { if (selectedLeft) selectedLeft.btn.classList.remove("selected"); selectedLeft = { btn: btn, data: data }; }
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
    var cards = shuffle(act.pairs.reduce(function (acc, p, i) {
      acc.push({ id: i, face: p.a }); acc.push({ id: i, face: p.b }); return acc;
    }, []));
    var totalPairs = act.pairs.length, matched = 0, moves = 0, first = null, locked = false;

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
