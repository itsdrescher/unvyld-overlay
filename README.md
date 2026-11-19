# UNVYLD Stream-Overlay (Fitness XP)

Overlay für den Twitch-Stream von [itsdrescher_](https://twitch.tv/itsdrescher_) – Fitness-Challenge im UNVYLD-Look.

## OBS-Browserquellen

| Quelle | Adresse | Größe |
|---|---|---|
| XP-Leiste, Quest-Log, Glücksrad | `https://itsdrescher.github.io/unvyld-overlay/fitness-xp.html` | 1920 × 1080 |
| Cam-Rahmen mit Banner | `https://itsdrescher.github.io/unvyld-overlay/fitness-cam.html` | passend zur Cam |
| Socials & App (Werbe-Karte) | `https://itsdrescher.github.io/unvyld-overlay/fitness-socials.html` | 520 × 110 |
| Werbebanner einzeln (optional) | `https://itsdrescher.github.io/unvyld-overlay/fitness-banner.html` | z. B. 1200 × 80 |

Nach Änderungen: in OBS bei der Quelle **„Cache der aktuellen Seite aktualisieren“**.

## Einstellungen

Alles Einstellbare steht in `fitness-config.js` (Regeln, Übungen, Glücksrad, Kanalpunkte, Cam-Name).
Vorschau im Browser: `fitness-xp.html?demo`, `fitness-cam.html?test`, `fitness-socials.html?test`.

Benötigt Streamer.bot mit aktiviertem WebSocket-Server (127.0.0.1:8080).
