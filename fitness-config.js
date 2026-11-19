/* =====================================================================
   FITNESS XP – EINSTELLUNGEN
   Gilt für beide Overlays: fitness-xp.html (Balken + Glücksrad)
   und fitness-cam.html (Kamera-Rahmen mit Regeln).
   Nach Änderungen in OBS bei beiden Quellen "Cache aktualisieren" klicken.
   ===================================================================== */
const CONFIG = {
  // Streamer.bot WebSocket-Server (Streamer.bot → Servers/Clients → WebSocket Server)
  streamerbot: { host: "127.0.0.1", port: 8080, password: "" },

  // Chat füllt den XP-Balken – voll = Glücksrad dreht sich
  chat: {
    // Chat-Tempo-Stufen: Ist der Balken schnell voll, steigt das Ziel für das nächste Level.
    // color = Farbe des Balkens in dieser Stufe
    levels: [
      { goal: 50,  label: "Chat ist normal", color: ["#9fc400", "#d4ff1e"] },
      { goal: 100, label: "Chat ist heiß",   color: ["#ff8a1f", "#ffc04a"] },
      { goal: 150, label: "Chat explodiert", color: ["#e0262e", "#ff5a4a"] },
    ],
    upIfFasterThanMin: 5,     // Balken in unter 5 Min voll → eine Stufe hoch
    downIfSlowerThanMin: 15,  // erst nach 15 Min oder mehr voll → eine Stufe runter
    // Felder auf dem Glücksrad. Format: [Übung, Wiederholungen]
    // Gleiche Einträge mehrfach = höhere Chance.
    wheel: [
      ["squat", 10],
      ["pushup", 10],
      ["jack", 15],
      ["burpee", 5],
    ],
  },
  chatCooldownSec: 3,               // pro Zuschauer zählt max. 1 Nachricht alle X Sekunden (gegen Spam)
  ignoreUsers: ["streamerbot", "nightbot", "streamelements", "moobot", "fossabot", "ecratio_bot"],

  // Events → Übungen
  follow:   { exercise: "jack",   reps: 10, waveSec: 10, waveMax: 100 },  // Follow-Welle: max. 100 Wdh.
  sub:      { exercise: "pushup", reps: 20 },                // Sub & Resub
  gift:     { exercise: "pushup", reps: 10 },                // pro verschenktem Sub
  bits:     { per: 100, exercise: "burpee", reps: 5 },       // je 100 Bits
  raid:     { exercise: "squat", perViewer: 1, min: 10, max: 100 },
  donation: { perEuro: 1, exercise: "burpee", max: 100 },    // pro Euro 1 Burpee (StreamElements, Streamlabs, Ko-fi, Tipeee)

  // Kanalpunkte-Belohnungen → Übungen. "title" muss genau wie der Name der Belohnung auf Twitch heißen.
  // Weitere einfach als neue Zeile ergänzen.
  rewards: [
    { title: "5 Burpees für Drescher", exercise: "burpee", reps: 5 },
  ],

  // Übungen (Name + Symbol)
  exercises: {
    squat:  { name: "Kniebeugen",   one: "Kniebeuge",   icon: "🦵" },
    pushup: { name: "Liegestütze",  one: "Liegestütze", icon: "💪" },
    jack:   { name: "Hampelmänner", one: "Hampelmann",  icon: "🤸" },
    burpee: { name: "Burpees",      one: "Burpee",      icon: "🔥" },
  },

  // Chat-Befehle (nur du und Mods)
  cmdDone:  ["!done", "!erledigt"],     // erste offene Quest abhaken
  cmdReset: "!fitness reset",           // alles zurücksetzen (neuer Stream)
  cmdTest:  "!fitness test",            // Beispiel-Quests
  cmdSpin:  "!fitness rad",             // Glücksrad zum Testen drehen

  // Optional: Streamer.bot-Aktion für Ansagen (z. B. Speaker.bot), bekommt %text%. Leer = aus.
  speakAction: "Fitness Ansage",   // Streamer.bot-Aktion mit Speaker.bot → Speak, Text: %text%
  speakDone: true,                 // auch bei !done etwas sagen ("Quest erledigt. Stark!")
  // Clip, wenn eine Quest mit !done abgehakt wird (Aktion mit "Create Clip"). Leer = aus.
  clipAction: "Fitness Clip",

  // Regeln im Chat (Aktion mit "Send Message" und Text %text%)
  rules: {
    action: "Fitness Regeln",
    commands: ["!regeln", "!rules", "!fitness"],
    cooldownSec: 60,
    everyMin: 20,
    minMsgs: 5,
  },

  // Sounds werden im Overlay erzeugt (kein Copyright-Problem).
  // Eigene Datei statt Klang: Dateiname eintragen (im selben Ordner).
  sounds: {
    enabled: true,
    volume: 0.6,
    newQuestFile: "",
    levelUpFile: "",
    doneFile: "",
  },

  // Kamera-Rahmen (fitness-cam.html)
  cam: {
    aspect: [4, 3],             // Seitenverhältnis deiner Kamera (z. B. [16, 9])
    name: "itsdrescher_",       // Namensschild am Rahmen (leer = aus)
    brand: "UNVYLD",            // Wortmarke neben dem Namen (leer = aus)
    slogan: "NEVER YIELD.",     // kleiner Slogan neben der Wortmarke (leer = aus)
    banner: true,               // Werbebanner unten im Kamerabild (false = aus, dann fitness-banner.html nutzen)
  },

  // Werbebanner: zeigt immer mal wieder EINE Regel als Lauftext
  banner: {
    everySec: 40,               // alle 40 Sekunden die nächste Regel
    showSec: 9,                 // so lange läuft der Text durch
    label: "WORKOUT",           // Schild links am Banner
  },

  // Socials & App als dezente Werbe-Karte (fitness-socials.html)
  // icon: insta, tiktok, youtube, twitch, web oder app. Reihenfolge = Reihenfolge der Einblendung.
  socials: {
    everySec: 45,               // alle 45 Sekunden die nächste Karte
    showSec: 8,                 // so lange ist eine Karte sichtbar (inkl. Ein-/Ausblenden)
    items: [
      { icon: "app",     label: "Meine App · kostenlos", handle: "UNVYLD", sub: "Training + Ernährung · ohne Werbung, ohne Abo" },
      { icon: "insta",   label: "Instagram", handle: "@itsdrescher_" },
      { icon: "tiktok",  label: "TikTok",    handle: "@itsdrescher91" },
      { icon: "youtube", label: "YouTube",   handle: "@itsdrescher" },
      { icon: "insta",   label: "App-News",  handle: "@unvyld_now" },
    ],
  },

  // Just-Chatting-Szene (justchatting.html)
  justchatting: {
    topic: "Feierabend-Talk · Fragen & Antworten",  // großer Text unter der Cam – vor dem Stream anpassen
    hint: "!app · !regeln",     // klein oben rechts im Chat
    maxMessages: 14,            // so viele Nachrichten bleiben sichtbar
    showCommands: false,        // !befehle im Chat anzeigen?
  },

  // Live-Herzfrequenz (heartrate.html, Daten von Pulsoid)
  // Den Pulsoid-Token NICHT hier eintragen (das Repo ist öffentlich), sondern in der OBS-Adresse: heartrate.html?token=…
  heartrate: {
    zones: [[0, "#d4ff1e"], [140, "#ff8a1f"], [165, "#e0262e"]],  // ab Puls → Farbe (Volt, Orange, Rot)
    graph: true,                // Verlaufslinie anzeigen
    graphSec: 120,              // Zeitraum der Linie in Sekunden
  },
};
