# UNVYLD Stream-Overlay (Fitness XP)

Overlay für den Twitch-Stream von [itsdrescher_](https://twitch.tv/itsdrescher_) – Fitness-Challenge im UNVYLD-Look.

## OBS-Browserquellen

| Quelle | Adresse | Größe |
|---|---|---|
| XP-Leiste, Quest-Log, Glücksrad | `https://itsdrescher.github.io/unvyld-overlay/fitness-xp.html` | 1920 × 1080 |
| Cam-Rahmen mit Banner | `https://itsdrescher.github.io/unvyld-overlay/fitness-cam.html` | passend zur Cam |
| Socials & App (Werbe-Karte) | `https://itsdrescher.github.io/unvyld-overlay/fitness-socials.html` | 520 × 110 |
| Just-Chatting-Szene (Rahmen + Chat) | `https://itsdrescher.github.io/unvyld-overlay/justchatting.html` | 1920 × 1080 |
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
