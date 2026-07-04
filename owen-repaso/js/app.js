/* =========================================================================
   Owen — Modo de Repaso  ·  Motor de la app (sin contenido hardcodeado)
   -------------------------------------------------------------------------
   Todo el contenido vive en /data/science.js y /data/english.js.
   Este archivo solo sabe cómo NAVEGAR y cómo JUGAR cada tipo de juego.
   Para agregar temas nuevos, no se toca este archivo: solo los datos.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.OWEN_DATA || {};
  var app = document.getElementById("app");

  // -------- estado de navegación --------
  var state = { screen: "home", subjectId: null, topic: null };

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
    if ("subjectId" in opts) state.subjectId = opts.subjectId;
    if ("topic" in opts) state.topic = opts.topic;
    state.screen = screen;
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    app.innerHTML = "";
    if (state.screen === "home") return renderHome();
    if (state.screen === "topics") return renderTopics();
    if (state.screen === "game") return renderGame();
  }

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
      var count = countTopics(s);
      var card = el(
        '<button class="subject-card ' + s.color + '">' +
          '<div class="strip"></div>' +
          '<div class="emoji">' + s.emoji + '</div>' +
          '<div class="name">' + esc(s.title) + '</div>' +
          '<div class="desc">' + count + ' juegos</div>' +
        '</button>'
      );
      card.addEventListener("click", function () { go("topics", { subjectId: sid }); });
      grid.appendChild(card);
    });
    app.appendChild(grid);
    app.appendChild(el('<div class="footer-note">Gimnasio Los Arrayanes Bilingüe · Primero de primaria</div>'));
  }

  function countTopics(s) {
    var n = 0;
    s.terms.forEach(function (t) { n += t.topics.length; });
    return n;
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
            '<div class="t-emoji">' + topic.emoji + '</div>' +
            '<div class="t-name">' + esc(topic.title) + '</div>' +
            '<div class="t-meta">' +
              '<span class="chip">' + esc(topic.cycle) + '</span>' +
              '<span class="chip game">' + gameLabel(topic.gameType) + '</span>' +
            '</div>' +
          '</button>'
        );
        card.addEventListener("click", function () { go("game", { topic: topic }); });
        grid.appendChild(card);
      });
      block.appendChild(grid);
      app.appendChild(block);
    });
  }

  function gameLabel(type) {
    return {
      trivia: "🧠 Trivia",
      fill: "✏️ Completar",
      matching: "🔗 Emparejar",
      memory: "🃏 Memoria",
      order: "🔢 Ordenar"
    }[type] || type;
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

  // ============================ pantalla: JUEGO ============================
  function renderGame() {
    var topic = state.topic;
    app.appendChild(topbar(esc(topic.title), gameLabel(topic.gameType), function () { go("topics", { subjectId: state.subjectId }); }));
    app.appendChild(el('<div class="instructions">' + esc(topic.instructions) + '</div>'));

    var wrap = el('<div class="game-wrap"></div>');
    app.appendChild(wrap);

    var starter = {
      trivia: playQuiz, fill: playQuiz,
      matching: playMatching, memory: playMemory, order: playOrder
    }[topic.gameType];
    if (starter) starter(topic, wrap);
    else wrap.appendChild(el('<div class="instructions">Tipo de juego no reconocido 🤔</div>'));
  }

  // ---------- resultado (común a todos los juegos) ----------
  function showResult(wrap, topic, score, total) {
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
          '<button class="btn-secondary">📚 Elegir otro tema</button>' +
        '</div>' +
      '</div>'
    );
    box.querySelector(".btn-primary").addEventListener("click", function () { go("game", { topic: topic }); });
    box.querySelector(".btn-secondary").addEventListener("click", function () { go("topics", { subjectId: state.subjectId }); });
    wrap.appendChild(box);
  }

  // ============================ JUEGO: Trivia / Completar ============================
  function playQuiz(topic, wrap) {
    var items = shuffle(topic.items);
    var idx = 0, score = 0;
    var isFill = topic.gameType === "fill";

    var progress = el(
      '<div class="progress-row">' +
        '<div class="progress-track"><div class="progress-fill"></div></div>' +
        '<div class="progress-txt"></div>' +
      '</div>'
    );
    var stage = el('<div></div>');
    wrap.appendChild(progress);
    wrap.appendChild(stage);

    function draw() {
      var item = items[idx];
      progress.querySelector(".progress-fill").style.width = (idx / items.length * 100) + "%";
      progress.querySelector(".progress-txt").textContent = (idx + 1) + " / " + items.length;

      var qHtml;
      if (isFill) {
        var sentence = esc(item.sentence).replace("___", '<b>?</b>');
        qHtml = '<div class="q-emoji">' + (item.emoji || "✏️") + '</div>' +
                '<div class="q-text q-blank">' + sentence + '</div>';
      } else {
        qHtml = '<div class="q-emoji">' + (item.emoji || "❓") + '</div>' +
                '<div class="q-text">' + esc(item.question) + '</div>';
      }

      var nOpt = item.options.length;
      var optClass = nOpt === 2 ? "options two" : nOpt > 2 ? "options multi" : "options";

      stage.innerHTML = "";
      var card = el('<div class="question-card">' + qHtml + '</div>');
      var opts = el('<div class="' + optClass + '"></div>');
      item.options.forEach(function (o, i) {
        var b = el('<button class="opt">' + esc(o) + '</button>');
        b.addEventListener("click", function () { choose(i, opts, item); });
        opts.appendChild(b);
      });
      var fb = el('<div class="feedback"></div>');
      var next = el('<button class="btn-next hidden">Siguiente →</button>');
      next.addEventListener("click", function () {
        idx++;
        if (idx >= items.length) showResult(wrap, topic, score, items.length);
        else draw();
      });

      stage.appendChild(card);
      stage.appendChild(opts);
      stage.appendChild(fb);
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

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ============================ JUEGO: Emparejar ============================
  function playMatching(topic, wrap) {
    var pairs = topic.pairs;
    var left = shuffle(pairs.map(function (p, i) { return { id: i, txt: p.a, emoji: false }; }));
    var right = shuffle(pairs.map(function (p, i) { return { id: i, txt: p.b, emoji: true }; }));
    var matched = 0, mistakes = 0, selectedLeft = null, selectedRight = null, locked = false;

    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    wrap.appendChild(progress);
    var grid = el('<div class="match-grid"><div class="match-col" data-side="l"></div><div class="match-col" data-side="r"></div></div>');
    wrap.appendChild(grid);
    var lcol = grid.querySelector('[data-side="l"]');
    var rcol = grid.querySelector('[data-side="r"]');

    function updateProgress() {
      progress.querySelector(".progress-fill").style.width = (matched / pairs.length * 100) + "%";
      progress.querySelector(".progress-txt").textContent = matched + " / " + pairs.length;
    }

    function makeItem(data, col) {
      var b = el('<button class="match-item' + (data.emoji ? ' emoji' : '') + '">' + esc(data.txt) + '</button>');
      b.dataset.id = data.id;
      b.addEventListener("click", function () { onPick(b, col, data); });
      return b;
    }
    left.forEach(function (d) { lcol.appendChild(makeItem(d, "l")); });
    right.forEach(function (d) { rcol.appendChild(makeItem(d, "r")); });
    updateProgress();

    function onPick(btn, side, data) {
      if (locked || btn.classList.contains("done")) return;
      if (side === "l") {
        if (selectedLeft) selectedLeft.btn.classList.remove("selected");
        selectedLeft = { btn: btn, data: data };
      } else {
        if (selectedRight) selectedRight.btn.classList.remove("selected");
        selectedRight = { btn: btn, data: data };
      }
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
        if (matched === pairs.length) setTimeout(function () { finishMatching(); }, 350);
      } else {
        beep("bad"); mistakes++;
        l.btn.classList.add("shake"); r.btn.classList.add("shake");
        setTimeout(function () {
          l.btn.classList.remove("shake", "selected");
          r.btn.classList.remove("shake", "selected");
          selectedLeft = selectedRight = null; locked = false;
        }, 500);
      }
    }

    function finishMatching() {
      // puntaje: parejas menos penalización por errores, mínimo 0
      var score = Math.max(0, pairs.length - Math.floor(mistakes / 2));
      showResult(wrap, topic, score, pairs.length);
    }
  }

  // ============================ JUEGO: Memoria ============================
  function playMemory(topic, wrap) {
    var cards = shuffle(topic.pairs.reduce(function (acc, p, i) {
      acc.push({ id: i, face: p.a }); acc.push({ id: i, face: p.b }); return acc;
    }, []));
    var totalPairs = topic.pairs.length;
    var matched = 0, moves = 0, first = null, locked = false;

    var progress = el('<div class="progress-row"><div class="progress-track"><div class="progress-fill"></div></div><div class="progress-txt"></div></div>');
    wrap.appendChild(progress);
    var grid = el('<div class="memory-grid"></div>');
    wrap.appendChild(grid);

    function updateProgress() {
      progress.querySelector(".progress-fill").style.width = (matched / totalPairs * 100) + "%";
      progress.querySelector(".progress-txt").textContent = matched + " / " + totalPairs;
    }

    cards.forEach(function (c) {
      var card = el(
        '<div class="mem-card"><div class="mem-inner">' +
          '<div class="mem-face mem-back">?</div>' +
          '<div class="mem-face mem-front">' + esc(c.face) + '</div>' +
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
        if (matched === totalPairs) setTimeout(function () { finishMemory(); }, 400);
      } else {
        beep("bad"); locked = true;
        var a = first.card, b = card;
        setTimeout(function () {
          a.classList.remove("flipped"); b.classList.remove("flipped");
          first = null; locked = false;
        }, 750);
      }
    }

    function finishMemory() {
      // puntaje: ideal = totalPairs movimientos. Estrella completa si es eficiente.
      var extra = moves - totalPairs;
      var score = Math.max(1, totalPairs - Math.floor(extra / 2));
      if (score > totalPairs) score = totalPairs;
      showResult(wrap, topic, score, totalPairs);
    }
  }

  // ============================ JUEGO: Ordenar ============================
  function playOrder(topic, wrap) {
    var steps = topic.steps;
    var total = steps.length;
    var expected = 0, mistakes = 0;

    wrap.appendChild(el('<div class="order-prompt">' + esc(topic.prompt || "Ordena los pasos") + '</div>'));
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

    var order = shuffle(steps.map(function (s, i) { return { txt: s, pos: i }; }));
    order.forEach(function (d) {
      var chip = el('<button class="order-chip">' + esc(d.txt) + '</button>');
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
        var tchip = el('<div class="tray-chip"><span class="num">' + (expected + 1) + '</span>' + esc(d.txt) + '</div>');
        tray.appendChild(tchip);
        expected++; updateProgress();
        if (expected === total) setTimeout(function () {
          var score = Math.max(1, total - Math.floor(mistakes / 2));
          if (score > total) score = total;
          showResult(wrap, topic, score, total);
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
