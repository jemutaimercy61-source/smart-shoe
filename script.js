/* =========================================================
   TechLink Innovations | SmartStep AI Leather Shoe
   Demo interactions. All data is SIMULATED. No backend needed.
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header + mobile menu ---------- */
  var header = $('.site-header');
  var navToggle = $('#navToggle');
  var navMenu = $('#navMenu');

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', navMenu).forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setMenu(false); }
    });
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 960) setMenu(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Active nav link (scroll spy) ---------- */
  var navLinks = $$('.nav-menu a');
  var spyTargets = navLinks
    .map(function (a) { return $(a.getAttribute('href')); })
    .filter(Boolean);

  function updateSpy() {
    var y = window.scrollY + 140;
    var current = null;
    spyTargets.forEach(function (sec) { if (sec.offsetTop <= y) current = sec; });
    navLinks.forEach(function (a) {
      var on = current && a.getAttribute('href') === '#' + current.id;
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', updateSpy, { passive: true });
  updateSpy();

  /* ---------- Solution flow diagram ---------- */
  var flowSteps = [
    { t: 'Foot', d: 'Every step the wearer takes creates pressure, warmth and movement patterns inside the shoe.' },
    { t: 'Sensors', d: 'Prototype pressure, temperature and movement sensors in the insole are designed to measure these patterns.' },
    { t: 'Data collection', d: 'A small processing unit gathers the readings, filters noise and organises them over time.' },
    { t: 'AI analysis', d: 'AI-based analysis compares new readings with the wearer\u2019s usual pattern to find anything unusual.' },
    { t: 'Warning / feedback', d: 'If an unusual pattern is detected, the wearer receives a potential early warning and is encouraged to check their foot or seek professional advice.' }
  ];
  var flowNodes = $$('.flow-node');
  var flowIdx = 0;
  var flowTimer = null;

  function setFlow(i) {
    flowIdx = i;
    flowNodes.forEach(function (n, k) {
      var on = k === i;
      n.classList.toggle('active', on);
      n.setAttribute('aria-pressed', String(on));
    });
    $('#flowTitle').textContent = flowSteps[i].t;
    $('#flowText').textContent = flowSteps[i].d;
  }
  function startFlow() {
    if (reduceMotion || flowTimer) return;
    flowTimer = setInterval(function () { setFlow((flowIdx + 1) % flowSteps.length); }, 2800);
  }
  function stopFlow() { clearInterval(flowTimer); flowTimer = null; }

  if (flowNodes.length) {
    flowNodes.forEach(function (n) {
      n.addEventListener('click', function () {
        stopFlow();
        setFlow(parseInt(n.getAttribute('data-index'), 10));
      });
    });
    var flowBox = $('#flow');
    flowBox.addEventListener('mouseenter', stopFlow);
    flowBox.addEventListener('mouseleave', startFlow);
    flowBox.addEventListener('focusin', stopFlow);
    flowBox.addEventListener('focusout', startFlow);
    setFlow(0);
    startFlow();
  }

  /* ---------- Prototype component explorer ---------- */
  var comps = {
    pressure: {
      t: 'Pressure sensors',
      d: 'Thin sensors placed under the toe, forefoot, arch and heel are designed to show how load is spread across the foot while standing and walking.',
      n: 'Prototype component: sensor type, number and exact positions are still to be tested.'
    },
    temp: {
      t: 'Temperature sensor',
      d: 'A small sensor is designed to track foot temperature over time so that gradual changes can be noticed.',
      n: 'Prototype component: placement and accuracy are to be validated.'
    },
    motion: {
      t: 'Movement sensor',
      d: 'A compact motion sensor (accelerometer / gyroscope) is designed to recognise activity such as standing, walking or resting, so readings can be understood in context.',
      n: 'Prototype component: activity recognition is a planned feature.'
    },
    mcu: {
      t: 'Small processing unit',
      d: 'A low-power microcontroller is designed to collect sensor readings, run basic checks and send data onward, for example by Bluetooth.',
      n: 'Prototype component: final hardware to be selected.'
    },
    battery: {
      t: 'Battery / power system',
      d: 'A small rechargeable battery with a power-management circuit is designed to keep the electronics running through the day.',
      n: 'Prototype component: safe, comfortable battery placement and charging method are to be developed.'
    }
  };
  var compBtns = $$('.comp-btn');
  var hotspots = $$('.hotspot');

  function selectComp(key) {
    var c = comps[key];
    if (!c) return;
    $('#compTitle').textContent = c.t;
    $('#compText').textContent = c.d;
    $('#compNote').textContent = c.n;
    compBtns.forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-key') === key); });
    hotspots.forEach(function (h) { h.classList.toggle('active', h.getAttribute('data-key') === key); });
  }
  compBtns.forEach(function (b) {
    b.addEventListener('click', function () { selectComp(b.getAttribute('data-key')); });
  });
  hotspots.forEach(function (h) {
    h.addEventListener('click', function () { selectComp(h.getAttribute('data-key')); });
    h.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectComp(h.getAttribute('data-key')); }
    });
  });
  selectComp('pressure');

  /* ---------- Shared illustrative scoring rule ----------
     NOTE: This is a simple, rule-based illustration used for the demo.
     A real product would use a trained and clinically validated model. */
  var BASELINE_TEMP = 34.5;
  var ALERT_THRESHOLD = 0.5;

  function computeScore(temp, peakPressure) {
    var pScore = Math.max(0, (peakPressure - 60) / 40);
    var tScore = Math.max(0, ((temp - BASELINE_TEMP) - 0.8) / 2.0);
    return Math.min(1, 0.55 * Math.min(1, pScore) + 0.45 * Math.min(1, tScore));
  }
  function pressureLevel(v) { return v >= 80 ? 'high' : (v >= 65 ? 'elev' : 'ok'); }
  var levelText = { ok: 'Normal', elev: 'Elevated', high: 'High' };
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- Live demo dashboard ---------- */
  var ZONES = ['toe', 'fore', 'mid', 'heel'];
  var TARGETS = {
    normal: { temp: 34.5, L: { toe: 28, fore: 48, mid: 24, heel: 45 }, R: { toe: 29, fore: 47, mid: 25, heel: 44 } },
    warning: { temp: 37.6, L: { toe: 70, fore: 91, mid: 27, heel: 46 }, R: { toe: 29, fore: 49, mid: 25, heel: 44 } }
  };

  var dash = {
    running: false,
    mode: 'normal',
    timer: null,
    alerting: false,
    history: [],
    reading: null
  };

  function freshReading() {
    return {
      temp: 34.5,
      L: { toe: 28, fore: 48, mid: 24, heel: 45 },
      R: { toe: 29, fore: 47, mid: 25, heel: 44 },
      activity: 'Walking'
    };
  }

  /* Simulated data source. To use real sensors later, replace this
     with data from your device and call processReading(reading). */
  function generateReading(ease) {
    var tg = TARGETS[dash.mode];
    var prev = dash.reading || freshReading();
    var next = { temp: 0, L: {}, R: {}, activity: 'Walking' };
    next.temp = clamp(prev.temp + (tg.temp - prev.temp) * ease + rand(-0.12, 0.12), 32, 39.5);
    ['L', 'R'].forEach(function (side) {
      ZONES.forEach(function (z) {
        var p = prev[side][z];
        next[side][z] = clamp(p + (tg[side][z] - p) * ease + rand(-2.5, 2.5), 0, 100);
      });
    });
    return next;
  }

  function peak(side) {
    return Math.max.apply(null, ZONES.map(function (z) { return side[z]; }));
  }

  function logEvent(text, warn) {
    var list = $('#eventLog');
    var first = list.firstElementChild;
    if (first && first.classList.contains('muted')) list.removeChild(first);
    var d = new Date();
    var li = document.createElement('li');
    if (warn) li.className = 'warn';
    var time = document.createElement('time');
    time.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    li.appendChild(time);
    li.appendChild(document.createTextNode(text));
    list.insertBefore(li, list.firstChild);
    while (list.children.length > 8) list.removeChild(list.lastChild);
  }

  function setBanner(level, text) {
    var b = $('#alertBanner');
    if (b.getAttribute('data-level') !== level) {
      // restart animation when switching to warn
      b.setAttribute('data-level', level);
    }
    $('#alertText').textContent = text;
  }

  function setStatus(state, label) {
    var pill = $('#statusPill');
    pill.setAttribute('data-state', state);
    pill.textContent = label;
    $('#monVal').textContent = state === 'paused' ? 'Paused' : (state === 'alert' ? 'Alert' : 'Active');
  }

  function drawChart() {
    var h = dash.history;
    var min = 33, max = 39, W = 600, H = 160, N = 40;
    var pts = h.map(function (v, i) {
      var x = h.length === 1 ? 0 : (i / (N - 1)) * W;
      var y = H - ((v - min) / (max - min)) * H;
      return x.toFixed(1) + ',' + y.toFixed(1);
    });
    $('#chartLine').setAttribute('points', pts.join(' '));
    var baseY = H - ((BASELINE_TEMP - min) / (max - min)) * H;
    $('#baseLine').setAttribute('y1', baseY);
    $('#baseLine').setAttribute('y2', baseY);
  }

  function render(reading, score) {
    $('#tempVal').textContent = reading.temp.toFixed(1);
    var pct = clamp(((reading.temp - 33) / 6) * 100, 4, 100);
    var bar = $('#tempBar');
    bar.style.width = pct + '%';
    bar.classList.toggle('hot', reading.temp >= BASELINE_TEMP + 1.5);

    ['L', 'R'].forEach(function (side) {
      var lvl = pressureLevel(peak(reading[side]));
      var el = $(side === 'L' ? '#lpVal' : '#rpVal');
      el.textContent = levelText[lvl];
      el.setAttribute('data-level', lvl);
      ZONES.forEach(function (z) {
        var zl = pressureLevel(reading[side][z]);
        var c = $('#' + side + '-' + z);
        c.setAttribute('class', 'zone ' + zl);
      });
    });

    $('#actVal').textContent = reading.activity;

    var s = Math.round(score * 100);
    $('#scoreVal').textContent = s + '%';
    $('#scoreBar').style.width = s + '%';

    drawChart();
  }

  /* Core pipeline: reading in -> analysis -> display.
     Real sensor data can be passed to this function (see README). */
  function processReading(reading) {
    dash.reading = reading;
    dash.history.push(reading.temp);
    if (dash.history.length > 40) dash.history.shift();

    var maxP = Math.max(peak(reading.L), peak(reading.R));
    var score = computeScore(reading.temp, maxP);
    var isAlert = score >= ALERT_THRESHOLD;

    render(reading, score);

    if (isAlert && !dash.alerting) {
      dash.alerting = true;
      setStatus('alert', 'Alert');
      setBanner('warn', 'Warning: Unusual pressure/temperature pattern detected. Please check your foot and consider seeking professional medical advice.');
      logEvent('Unusual pressure/temperature pattern detected (simulated).', true);
    } else if (!isAlert && dash.alerting) {
      dash.alerting = false;
      setStatus('active', 'Monitoring active');
      setBanner('good', 'Readings are back within the simulated usual range.');
      logEvent('Readings returned to the usual range (simulated).', false);
    }
  }

  function tick(ease) { processReading(generateReading(ease)); }

  function startMonitoring() {
    if (dash.running) return;
    dash.running = true;
    $('#btnStart').textContent = 'Pause Monitoring';
    $('#btnStart').setAttribute('aria-pressed', 'true');
    setStatus(dash.alerting ? 'alert' : 'active', dash.alerting ? 'Alert' : 'Monitoring active');
    if (!dash.alerting) setBanner('good', 'Monitoring started. Readings are within the simulated usual range.');
    logEvent('Monitoring started (simulated).', false);
    dash.timer = setInterval(function () { tick(0.4); }, 1000);
    tick(0.4);
  }

  function stopMonitoring() {
    if (!dash.running) return;
    dash.running = false;
    clearInterval(dash.timer);
    dash.timer = null;
    $('#btnStart').textContent = 'Start Monitoring';
    $('#btnStart').setAttribute('aria-pressed', 'false');
    setStatus('paused', 'Paused');
    logEvent('Monitoring paused.', false);
  }

  function simulate(mode) {
    dash.mode = mode;
    if (!dash.running) {
      startMonitoring();
    }
    tick(0.85);
    if (mode === 'normal') {
      logEvent('Simulated normal reading applied.', false);
      if (!dash.alerting) setBanner('good', 'Simulated normal reading: all values are within the usual range.');
    } else {
      logEvent('Simulated warning scenario applied.', false);
    }
  }

  function resetDashboard() {
    stopMonitoringSilently();
    dash.mode = 'normal';
    dash.alerting = false;
    dash.history = [];
    dash.reading = null;
    var r = freshReading();
    $('#eventLog').innerHTML = '<li class="muted">No events yet.</li>';
    render(r, 0);
    $('#chartLine').setAttribute('points', '');
    setStatus('paused', 'Paused');
    setBanner('ok', 'Demo reset. Press \u201cStart Monitoring\u201d to begin the simulation.');
  }

  function stopMonitoringSilently() {
    dash.running = false;
    clearInterval(dash.timer);
    dash.timer = null;
    $('#btnStart').textContent = 'Start Monitoring';
    $('#btnStart').setAttribute('aria-pressed', 'false');
  }

  if ($('#dashboard')) {
    $('#btnStart').addEventListener('click', function () {
      if (dash.running) stopMonitoring(); else startMonitoring();
    });
    $('#btnNormal').addEventListener('click', function () { simulate('normal'); });
    $('#btnWarn').addEventListener('click', function () { simulate('warning'); });
    $('#btnReset').addEventListener('click', resetDashboard);

    // Initial display with the example values (not running yet)
    render(freshReading(), 0);
  }

  /* Public hook for future real data (see README):
       SmartStepDemo.ingest({ temp: 35.1, L: {toe, fore, mid, heel}, R: {...}, activity: 'Walking' })
     Pressure values are expected as a 0-100 relative index. */
  window.SmartStepDemo = {
    ingest: function (reading) {
      if (!reading || typeof reading.temp !== 'number' || !reading.L || !reading.R) {
        console.warn('SmartStepDemo.ingest: invalid reading format.');
        return;
      }
      reading.activity = reading.activity || 'Walking';
      if (!dash.running) startMonitoringExternal();
      processReading(reading);
    }
  };
  function startMonitoringExternal() {
    // Show "Active" status without starting the simulation timer.
    dash.running = true;
    $('#btnStart').textContent = 'Pause Monitoring';
    setStatus('active', 'Monitoring active');
  }

  /* ---------- AI playground ---------- */
  var aiTemp = $('#aiTemp');
  var aiPress = $('#aiPress');
  function updateAi() {
    var t = parseFloat(aiTemp.value);
    var p = parseFloat(aiPress.value);
    $('#aiTempOut').textContent = t.toFixed(1);
    $('#aiPressOut').textContent = String(p);
    var score = computeScore(t, p);
    var s = Math.round(score * 100);
    $('#aiScoreVal').textContent = s + '%';
    $('#aiScoreBar').style.width = s + '%';
    var v = $('#aiVerdict');
    if (score >= ALERT_THRESHOLD) {
      v.setAttribute('data-level', 'warn');
      v.textContent = 'Unusual pattern: a potential early warning would be raised. Check your foot and consider professional advice.';
    } else if (score > 0.2) {
      v.setAttribute('data-level', 'ok');
      v.textContent = 'Slightly above usual, but not enough to raise a warning.';
    } else {
      v.setAttribute('data-level', 'ok');
      v.textContent = 'Within the usual simulated range.';
    }
  }
  if (aiTemp && aiPress) {
    aiTemp.addEventListener('input', updateAi);
    aiPress.addEventListener('input', updateAi);
    updateAi();
  }

  /* ---------- Impact tabs ---------- */
  var tabs = $$('#impactTabs [role="tab"]');
  function activateTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.setAttribute('tabindex', on ? '0' : '-1');
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { activateTab(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var n = tabs.length, idx = null;
      if (e.key === 'ArrowRight') idx = (i + 1) % n;
      else if (e.key === 'ArrowLeft') idx = (i - 1 + n) % n;
      else if (e.key === 'Home') idx = 0;
      else if (e.key === 'End') idx = n - 1;
      if (idx !== null) { e.preventDefault(); activateTab(tabs[idx], true); }
    });
  });
})();
