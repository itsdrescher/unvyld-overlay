/* Fitness XP – Werbebanner
   Zeigt immer mal wieder EINE Workout-Regel als Lauftext auf einem goldenen Band.
   Wird von fitness-banner.html und (optional) fitness-cam.html benutzt. */
(function () {
  const css = `
  .fx-banner { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
  .fx-ribbon { position: absolute; inset: 0; display: flex; align-items: center; transform: translateX(105%);
    background: rgba(12,13,15,.94); border-top: calc(var(--fx-h) * .05) solid #4a4f55; border-bottom: calc(var(--fx-h) * .05) solid #4a4f55; }
  .fx-label { flex: none; height: 100%; display: flex; align-items: center; padding: 0 calc(var(--fx-h) * .6) 0 calc(var(--fx-h) * .35);
    font-family: "Barlow Condensed", "Arial Narrow", sans-serif; font-style: italic; font-weight: 900; font-size: calc(var(--fx-h) * .5);
    letter-spacing: calc(var(--fx-h) * .03); color: #0c0d0f; background: #d4ff1e; clip-path: polygon(0 0, 100% 0, calc(100% - var(--fx-h) * .35) 100%, 0 100%); }
  .fx-track { position: relative; flex: 1; height: 100%; overflow: hidden;
    -webkit-mask: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); mask: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent); }
  .fx-text { position: absolute; top: 50%; left: 0; transform: translate(100vw, -50%); white-space: nowrap;
    font-family: Inter, system-ui, sans-serif; font-weight: 800; font-size: calc(var(--fx-h) * .42); color: #f5f6f2; }
  .fx-text b { color: #d4ff1e; font-weight: 900; }
  .fx-text .arr { color: #d4ff1e; margin: 0 .35em; }`;

  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  function ruleList(C) {
    const ex = k => C.exercises[k] || { name: k, icon: "🏋️" };
    const word = (n, e) => (n === 1 && e.one) ? e.one : e.name;
    const r = (icon, ev, what) => `${icon} <b>${esc(ev)}</b><span class="arr">→</span>${esc(what)}`;
    return [
      r(ex(C.follow.exercise).icon, "Follow", `${C.follow.reps}× ${ex(C.follow.exercise).name}`),
      r(ex(C.sub.exercise).icon, "Sub", `${C.sub.reps}× ${ex(C.sub.exercise).name}`),
      r("💬", `${C.chat.levels.map(l => l.goal).join(" / ")} Chat-Nachrichten`, "🎡 Glücksrad dreht sich"),
      r(ex(C.gift.exercise).icon, "Gift-Sub", `${C.gift.reps}× ${ex(C.gift.exercise).name} pro Sub`),
      r(ex(C.donation.exercise).icon, "Spende", `${C.donation.perEuro} ${word(C.donation.perEuro, ex(C.donation.exercise))} pro €`),
      r(ex(C.bits.exercise).icon, `${C.bits.per} Bits`, `${C.bits.reps}× ${ex(C.bits.exercise).name}`),
      r(ex(C.raid.exercise).icon, "Raid", `${C.raid.perViewer} ${word(C.raid.perViewer, ex(C.raid.exercise))} pro Zuschauer`),
      ...(C.rewards || []).map(rw => r(ex(rw.exercise).icon, "Kanalpunkte", `${rw.title}`)),
      `📜 Alle Regeln im Chat: <b>!regeln</b>`,
    ];
  }

  window.startFitnessBanner = function (container, opts) {
    const C = (typeof CONFIG !== "undefined") ? CONFIG : window.CONFIG;   // const-Variablen hängen nicht an window
    const B = Object.assign({ everySec: 40, showSec: 9, label: "WORKOUT" }, C.banner || {}, opts || {});
    if (!document.getElementById("fx-banner-css")) {
      const st = document.createElement("style"); st.id = "fx-banner-css"; st.textContent = css; document.head.appendChild(st);
    }
    const wrap = document.createElement("div");
    wrap.className = "fx-banner";
    wrap.innerHTML = `<div class="fx-ribbon"><div class="fx-label">${esc(B.label)}</div><div class="fx-track"><div class="fx-text"></div></div></div>`;
    container.appendChild(wrap);
    const ribbon = wrap.querySelector(".fx-ribbon"), track = wrap.querySelector(".fx-track"), text = wrap.querySelector(".fx-text");

    function size() { wrap.style.setProperty("--fx-h", wrap.getBoundingClientRect().height + "px"); }
    size(); window.addEventListener("resize", size);

    const rules = ruleList(C);
    let i = 0, busy = false;
    async function showNext() {
      if (busy) return;
      busy = true; size();
      text.innerHTML = rules[i % rules.length]; i++;
      await ribbon.animate([{ transform: "translateX(105%)" }, { transform: "translateX(0)" }],
        { duration: 600, easing: "cubic-bezier(.2,.9,.3,1)", fill: "forwards" }).finished;
      const from = track.clientWidth, to = -text.scrollWidth;
      await text.animate([{ transform: `translate(${from}px, -50%)` }, { transform: `translate(${to}px, -50%)` }],
        { duration: B.showSec * 1000, easing: "linear", fill: "forwards" }).finished;
      await ribbon.animate([{ transform: "translateX(0)" }, { transform: "translateX(-105%)" }],
        { duration: 500, easing: "cubic-bezier(.6,0,.8,.4)", fill: "forwards" }).finished;
      ribbon.getAnimations().forEach(a => a.cancel()); text.getAnimations().forEach(a => a.cancel());
      busy = false;
    }
    setTimeout(showNext, 3000);
    setInterval(showNext, B.everySec * 1000);
    return { showNext };
  };
})();
