# EasyTV Card

A custom Home Assistant Lovelace card for controlling TVs with a visual editor, multi-TV preset support, and an expandable compact/full remote view.

## Features

- 📺 Compact tile with quick controls (volume, play/pause, expand)
- 🎮 Full remote with D-pad, playback, volume, and app selector
- 🔌 Inline expand or Bubble Card popup mode
- 🧩 TV presets: Roku, Google TV, Samsung, Generic
- 🎛️ Visual editor — no YAML required
- 👁️ Toggleable sections — hide unsupported controls per TV
- ✨ Glassmorphism styling built-in

## Installation

### HACS (recommended)

1. Add this repository as a custom HACS repository (Frontend type)
2. Install **EasyTV Card** from HACS
3. Add the resource to your dashboard

### Manual

1. Copy `dist/easytv-card.js` to your `www/` directory
2. Add as a Lovelace resource: `/local/easytv-card.js`

## Usage

```yaml
type: custom:easytv-card
name: Bedroom TV
remote_entity: remote.bedroom_tv
tv_preset: roku
expand_mode: popup
popup_hash: "#BedroomTV-PopUp"
app_select_entity: select.bedroom_tv_application
sections:
  dpad: true
  playback: true
  volume: true
  app_selector: true
  power: true
```

## TV Presets

| Preset | Description |
|--------|-------------|
| `roku` | Roku TV command set |
| `google_tv` | Android/Google TV DPAD commands |
| `samsung` | Samsung SmartThings remote commands |
| `generic` | Common generic remote commands |

## Development

```bash
npm install
npm run dev    # watch mode
npm run build  # production build
```
