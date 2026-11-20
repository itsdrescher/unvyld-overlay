# UNVYLD Stream-Overlay (Fitness XP)

Overlay für den Twitch-Stream von [itsdrescher_](https://twitch.tv/itsdrescher_) – Fitness-Challenge im UNVYLD-Look.

## OBS-Browserquellen

| Quelle | Adresse | Größe |
|---|---|---|
| XP-Leiste, Quest-Log, Glücksrad | `https://itsdrescher.github.io/unvyld-overlay/fitness-xp.html` | 1920 × 1080 |
| Cam-Rahmen mit Banner | `https://itsdrescher.github.io/unvyld-overlay/fitness-cam.html` | passend zur Cam |
| Socials & App (Werbe-Karte) | `https://itsdrescher.github.io/unvyld-overlay/fitness-socials.html` | 520 × 110 |
| Just-Chatting-Szene (Rahmen + Chat) | `https://itsdrescher.github.io/unvyld-overlay/justchatting.html` | 1920 × 1080 |
| Herzfrequenz | `https://itsdrescher.github.io/unvyld-overlay/heartrate.html?id=HYPERATE_ID&key=API_KEY` | 520 × 120 |
| Strafen-Tafel (Spielszene) | `https://itsdrescher.github.io/unvyld-overlay/strafen-tafel.html` | 380 × 470 |
| Challenge-Szene (Cam groß, Spiel klein) | `https://itsdrescher.github.io/unvyld-overlay/challenge-szene.html` | 1920 × 1080 |
| Werbebanner einzeln (optional) | `https://itsdrescher.github.io/unvyld-overlay/fitness-banner.html` | z. B. 1200 × 80 |

Nach Änderungen: in OBS bei der Quelle **„Cache der aktuellen Seite aktualisieren“**.

## Einstellungen

Alles Einstellbare steht in `fitness-config.js` (Regeln, Übungen, Glücksrad, Kanalpunkte, Cam-Name).
Vorschau im Browser: `fitness-xp.html?demo`, `fitness-cam.html?test`, `fitness-socials.html?test`.

Benötigt Streamer.bot mit aktiviertem WebSocket-Server (127.0.0.1:8080).

## Szenenwechsel (Stinger)

`stinger/UNVYLD_Stinger.webm` herunterladen und in OBS als Übergang „Stinger“ einrichten:
Übergangspunkt **650 ms**, Audio-Überwachung nach Wunsch. Quelle der Animation: `stinger/stinger.html`.

## Just-Chatting-Szene

Kamera in OBS **unter** `justchatting.html` legen: Position x 48 · y 48, Größe 1360 × 765.
Fitness XP dort mit `fitness-xp.html?x=840&y=840`, Socials-Karte unten rechts (x 1440 · y 850, 432 × 92).
Thema unter der Cam in `fitness-config.js` → `justchatting.topic`.

## Herzfrequenz

Daten kommen von [HypeRate](https://www.hyperate.io) (kostenlos, Apple Watch über die HypeRate-App; API-Key über den kostenlosen „Research & Indie“-Plan) oder alternativ von Pulsoid (`?token=`). Zugangsdaten **nur in der OBS-Adresse** eintragen, nie in eine Datei im Repo.
Vorschau ohne Uhr: `heartrate.html?demo`. Farbzonen in `fitness-config.js` → `heartrate`.

## Stream-Deck-Challenges (z. B. GTA VI)

Challenges stehen in `fitness-config.js` → `challenges`. Pro Stream-Deck-Knopf eine Streamer.bot-Aktion:
1. Execute C# Code: `CPH.WebsocketBroadcastJson("{\"fitness\":\"challenge\",\"id\":\"tod\"}");`
2. Delay 300 ms
3. OBS → Set Current Scene „GTA Challenge“

Aktion „GTA Spielszene“ (OBS → Set Current Scene „GTA“) schaltet nach der letzten erledigten Challenge automatisch zurück.
Challenge-Szene: Kamera x 40 · y 40 · 1240 × 698, Spiel x 1310 · y 40 · 570 × 321, Fitness XP mit `?x=1315&y=690`.
