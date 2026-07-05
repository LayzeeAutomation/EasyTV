# EasyTV — App Shortcuts Reference

This table defines the commands used per platform when launching apps from the overlay.
Edit this file to propose changes before they are wired into the card.

## Platform notes

| Platform | Service called | Command format |
|---|---|---|
| `google_tv` / `generic` | `remote.send_command` | Android intent package name, e.g. `com.netflix.atv` |
| `samsung` | `remote.send_command` | `KEY_` shortcut where available, else package name |
| `roku` | `media_player.select_source` | Numeric Roku channel ID as a string, e.g. `"12"` |

> **Roku note:** Because Roku app launching uses `media_player.select_source` rather than `remote.send_command`, Roku users will need to add a `media_player_entity` field to their card config pointing to their Roku media player entity.

---

## App Command Table

| App | Key | MDI Icon | Roku ID | Android package (google_tv / generic) | Samsung |
|---|---|---|---|---|---|
| Netflix | `netflix` | `mdi:netflix` | `12` | `com.netflix.atv` | `KEY_NETFLIX` |
| YouTube | `youtube` | `mdi:youtube` | `195316` | `com.google.android.youtube.tv` | `com.google.android.youtube.tv` |
| BBC iPlayer | `bbc_iplayer` | `mdi:television-play` | `2285` | `bbc.iplayer.android` | `bbc.iplayer.android` |
| ITV X | `itvx` | `mdi:television-play` | `65287` | `air.ITVMobile` | `air.ITVMobile` |
| Prime Video | `prime_video` | `mdi:primevideo` | `13` | `com.amazon.amazonvideo.livingroom` | `KEY_PRIMEVIDEO` |
| Disney+ | `disney_plus` | `mdi:disney-plus` | `291097` | `com.disney.disneyplus` | `KEY_DISNEYPLUS` |
| All 4 (Channel 4) | `all4` | `mdi:television-play` | `52305` | `air.com.channel4.vodclient` | `air.com.channel4.vodclient` |
| Spotify | `spotify` | `mdi:spotify` | `22297` | `com.spotify.tv.android` | `com.spotify.tv.android` |
| Apple TV+ | `apple_tv` | `mdi:apple` | `551012` | `com.apple.atve.amazon.appletv` | `com.apple.atve.sony.appletv` |
| Plex | `plex` | `mdi:plex` | `13535` | `com.plexapp.android` | `com.plexapp.android` |

---

## YAML config (proposed)

```yaml
type: easytv-card
entity: remote.living_room_tv
tv_type: google_tv

# Optional: restrict which apps appear and in what order
apps:
  - netflix
  - youtube
  - bbc_iplayer
  - itvx
  - prime_video
  - disney_plus

# Required for Roku only
media_player_entity: media_player.living_room_roku

# Hide the app row entirely
show_apps: false
```
