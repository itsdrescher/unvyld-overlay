/* UNVYLD Challenges – gemeinsamer Zustand für Strafen-Tafel und Challenge-Szene.
   Hört auf die Stream-Deck-Knöpfe (Streamer.bot: CPH.WebsocketBroadcastJson) und auf !done / !fitness reset im Chat. */
(function () {
  const C = (typeof CONFIG !== "undefined") ? CONFIG : {};
  const CH = Object.assign({ group: "Challenge", title: "STRAFEN", list: [] }, C.challenges || {});
  const EX = C.exercises || {};
  const KEY = "unvyld-challenge-counts-v1";
  const listeners = [];
  let st = { counts: {}, reps: 0, current: null, done: false };
  try { st = Object.assign(st, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  const emit = (why) => listeners.forEach(fn => { try { fn(st, why); } catch (e) { console.error(e); } });

  function exName(key, reps) { const e = EX[key] || { name: key }; return reps === 1 && e.one ? e.one : e.name; }

  const api = window.Challenges = {
    config: CH,
    state: () => st,
    exName,
    onChange(fn) { listeners.push(fn); fn(st, "init"); },
    trigger(id) {
      const c = CH.list.find(x => x.id === id); if (!c) return;
      st.counts[id] = (st.counts[id] || 0) + 1;
      st.reps += c.reps;
      st.current = { id, t: Date.now() }; st.done = false;
      save(); emit("challenge");
    },
    done() { if (st.current && !st.done) { st.done = true; save(); emit("done"); } },
    reset() { st = { counts: {}, reps: 0, current: null, done: false }; save(); emit("reset"); },
  };

  function onCustom(d) {
    if (typeof d === "string") { try { d = JSON.parse(d); } catch (e) { return; } }
    d = d && (d.fitness ? d : (d.data && d.data.fitness ? d.data : d));
    if (!d || !d.fitness) return;
    if (d.fitness === "challenge") api.trigger(d.id);
    else if (d.fitness === "done") api.done();
    else if (d.fitness === "reset") api.reset();
  }
  function onChat(d) {
    const m = d.message && typeof d.message === "object" ? d.message : {};
    const text = String((typeof d.message === "string" ? d.message : m.message) ?? "").trim().toLowerCase();
    if (!text.startsWith("!")) return;
    const role = Number(m.role ?? d.user?.role ?? 0);
    const badges = (m.badges || d.user?.badges || []).map(b => String(b.name || b.setId || b).toLowerCase());
    const isMod = role >= 3 || badges.includes("broadcaster") || badges.includes("moderator");
    if (!isMod) return;
    if ((C.cmdDone || ["!done"]).includes(text)) api.done();
    else if (text === (C.cmdReset || "!fitness reset")) api.reset();
  }

  const params = new URLSearchParams(location.search);
  if (params.has("demo")) {
    let i = 0;
    setInterval(() => { const c = CH.list[i++ % CH.list.length]; if (!c) return; api.trigger(c.id); setTimeout(() => api.done(), 3500); }, 6000);
    return;
  }
  if (typeof StreamerbotClient === "undefined") return;
  const opts = { host: C.streamerbot?.host || "127.0.0.1", port: C.streamerbot?.port || 8080, endpoint: "/", autoReconnect: true };
  if (C.streamerbot?.password) opts.password = C.streamerbot.password;
  const client = new StreamerbotClient(opts);
  client.on("General.Custom", ({ data }) => onCustom(data));
  client.on("Twitch.ChatMessage", ({ data }) => onChat(data || {}));
})();
