// EasyTV Card v0.6.0
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '0.6.0';

const TV_PRESETS = {
  roku: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute',power:'power',info:'info',replay:'replay' },
  google_tv: { up:'DPAD_UP',down:'DPAD_DOWN',left:'DPAD_LEFT',right:'DPAD_RIGHT',select:'DPAD_CENTER',back:'BACK',home:'HOME',play:'MEDIA_PLAY_PAUSE',pause:'MEDIA_PAUSE',stop:'MEDIA_STOP',forward:'MEDIA_NEXT',reverse:'MEDIA_PREVIOUS',volume_up:'VOLUME_UP',volume_down:'VOLUME_DOWN',volume_mute:'VOLUME_MUTE',power:'POWER',info:'INFO',source:'TV' },
  samsung: { up:'KEY_UP',down:'KEY_DOWN',left:'KEY_LEFT',right:'KEY_RIGHT',select:'KEY_ENTER',back:'KEY_RETURN',home:'KEY_HOME',play:'KEY_PLAY',pause:'KEY_PAUSE',stop:'KEY_STOP',forward:'KEY_FF',reverse:'KEY_REWIND',volume_up:'KEY_VOLUP',volume_down:'KEY_VOLDOWN',volume_mute:'KEY_MUTE',power:'KEY_POWER',info:'KEY_INFO',source:'KEY_SOURCE' },
  generic: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute' },
};

const LEGACY_DEFAULT_SECTIONS = { dpad:true, playback:true, volume:true, app_selector:true, power:true, utility:true, numpad:false, app_shortcuts:true };
const SECTION_ORDER = ['power', 'app_selector', 'utility', 'dpad', 'playback', 'volume', 'app_shortcuts', 'numpad'];
const SECTION_LABELS = {
  power: 'Power', app_selector: 'App', utility: 'Controls', dpad: 'Navigation',
  playback: 'Playback', volume: 'Volume', app_shortcuts: 'Apps', numpad: 'Channel / Number',
};

const VALID_WIDTHS = ['quarter', 'half', 'three-quarter', 'full'];
const GAP_OPTIONS = [['0','None (0px)'],['4','Tight (4px)'],['8','Normal (8px)'],['12','Relaxed (12px)'],['16','Spacious (16px)']];
const DEFAULT_GAP = '8';

const QUICK_ACTION_DEFS = {
  volume_down:  { icon: 'mdi:volume-minus', title: 'Vol \u2212', cmd: (c) => c.volume_down },
  volume_up:    { icon: 'mdi:volume-plus',  title: 'Vol +',      cmd: (c) => c.volume_up },
  volume_mute:  { icon: 'mdi:volume-off',   title: 'Mute',       cmd: (c) => c.volume_mute },
  play_pause:   { icon: 'mdi:play-pause',   title: 'Play/Pause', cmd: (c) => c.play },
  power:        { icon: 'mdi:power',        title: 'Power',      cmd: (c) => c.power || 'power' },
  back:         { icon: 'mdi:arrow-left',   title: 'Back',       cmd: (c) => c.back },
  home:         { icon: 'mdi:home-outline', title: 'Home',       cmd: (c) => c.home },
  source:       { icon: 'mdi:import',       title: 'Source',     cmd: (c) => c.source || 'input_av1' },
  forward:      { icon: 'mdi:fast-forward', title: 'Forward',    cmd: (c) => c.forward },
  rewind:       { icon: 'mdi:rewind',       title: 'Rewind',     cmd: (c) => c.reverse },
};

const DEFAULT_QUICK_SINGLE = ['volume_down', 'play_pause', 'volume_up'];
const DEFAULT_QUICK_DOUBLE = ['volume_down', 'play_pause', 'volume_up', 'power', 'home', 'back'];

const APP_SHORTCUTS = [
  { name:'Netflix',  cmd:'Netflix',       color:'#E50914', icon:'mdi:netflix' },
  { name:'YouTube',  cmd:'YouTube',       color:'#FF0000', icon:'mdi:youtube' },
  { name:'Disney+',  cmd:'Disney Plus',   color:'#113CCF', icon:'mdi:disney-plus' },
  { name:'Prime',    cmd:'Amazon Video',  color:'#00A8E0', icon:'mdi:amazon' },
  { name:'Spotify',  cmd:'Spotify',       color:'#1DB954', icon:'mdi:spotify' },
  { name:'Plex',     cmd:'Plex',          color:'#E5A00D', icon:'mdi:plex' },
  { name:'Apple TV', cmd:'Apple TV',      color:'#888888', icon:'mdi:apple' },
  { name:'Hulu',     cmd:'Hulu',          color:'#1CE783', icon:'mdi:television-play' },
  { name:'HBO Max',  cmd:'HBO Max',       color:'#5822B4', icon:'mdi:television-classic' },
  { name:'Peacock',  cmd:'Peacock TV',    color:'#FF6B35', icon:'mdi:bird' },
  { name:'Tubi',     cmd:'Tubi',          color:'#FA4B00', icon:'mdi:television' },
  { name:'Twitch',   cmd:'Twitch',        color:'#9146FF', icon:'mdi:twitch' },
];

const OVERLAY_THEMES = {
  dark: {
    background: 'rgba(10, 10, 18, 0.55)', backdropFilter: 'blur(32px) saturate(1.4)',
    sectionBackground: 'rgba(255,255,255,0.07)', buttonBackground: 'rgba(255,255,255,0.10)',
    buttonHover: 'rgba(255,255,255,0.18)', buttonActive: 'rgba(255,255,255,0.26)',
    borderColor: 'rgba(255,255,255,0.13)', textColor: '#ffffff',
    mutedColor: 'rgba(255,255,255,0.55)', headerBorder: 'rgba(255,255,255,0.10)', dropdownArrow: 'ffffff',
  },
  light: {
    background: 'rgba(240,240,248,0.60)', backdropFilter: 'blur(32px) saturate(1.8)',
    sectionBackground: 'rgba(0,0,0,0.05)', buttonBackground: 'rgba(0,0,0,0.07)',
    buttonHover: 'rgba(0,0,0,0.13)', buttonActive: 'rgba(0,0,0,0.20)',
    borderColor: 'rgba(0,0,0,0.10)', textColor: '#111111',
    mutedColor: 'rgba(0,0,0,0.50)', headerBorder: 'rgba(0,0,0,0.08)', dropdownArrow: '111111',
  },
};

const CARD_STYLES = `
  :host {
    display: block;
    --easytv-card-background:      var(--ha-card-background, var(--card-background-color, #1c1c1c));
    --easytv-card-border-radius:   var(--ha-card-border-radius, 16px);
    --easytv-card-border:          1px solid var(--divider-color, rgba(255,255,255,0.12));
    --easytv-card-box-shadow:      var(--ha-card-box-shadow, none);
    --easytv-card-backdrop-filter: none;
    --easytv-text-color:           var(--primary-text-color, #fff);
    --easytv-muted-color:          var(--secondary-text-color, rgba(255,255,255,0.6));
    --easytv-accent-color:         var(--primary-color, #1976d2);
    --easytv-button-background:    var(--secondary-background-color, var(--card-background-color, #2a2a2a));
    --easytv-button-border-radius: 50%;
    --easytv-button-border:        1px solid var(--divider-color, rgba(255,255,255,0.12));
    --easytv-button-background-hover:  color-mix(in srgb, var(--easytv-button-background) 82%, white);
    --easytv-button-background-active: color-mix(in srgb, var(--easytv-button-background) 72%, white);
  }
  ha-card { background: transparent !important; box-shadow: none !important; overflow: visible; }
  .compact-single {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: var(--easytv-card-border-radius);
    background: var(--easytv-card-background); border: var(--easytv-card-border);
    box-shadow: var(--easytv-card-box-shadow);
    backdrop-filter: var(--easytv-card-backdrop-filter); -webkit-backdrop-filter: var(--easytv-card-backdrop-filter);
    color: var(--easytv-text-color); gap: 10px;
  }
  .compact-single .c-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .compact-single .c-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .compact-double {
    display: flex; flex-direction: column; padding: 14px 14px 12px;
    border-radius: var(--easytv-card-border-radius); background: var(--easytv-card-background);
    border: var(--easytv-card-border); box-shadow: var(--easytv-card-box-shadow);
    backdrop-filter: var(--easytv-card-backdrop-filter); -webkit-backdrop-filter: var(--easytv-card-backdrop-filter);
    color: var(--easytv-text-color); gap: 12px;
  }
  .compact-double .d-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .compact-double .d-top-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .compact-double .d-bottom { display: flex; align-items: center; gap: 8px; }
  .compact-double .d-bottom .qa-btn {
    flex: 1; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
    background: var(--easytv-button-background); border: var(--easytv-button-border);
    color: var(--easytv-text-color); cursor: pointer; transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent; padding: 0;
  }
  .compact-double .d-bottom .qa-btn:hover { background: var(--easytv-button-background-hover); }
  .compact-double .d-bottom .qa-btn:active { background: var(--easytv-button-background-active); transform: scale(0.93); }
  .compact-double .d-bottom .qa-btn ha-icon { --mdc-icon-size: 22px; }
  .tv-icon { --mdc-icon-size: 26px; color: var(--easytv-accent-color); }
  .tv-name { font-weight: 600; font-size: 15px; color: var(--easytv-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .icon-btn {
    background: var(--easytv-button-background); border: var(--easytv-button-border);
    cursor: pointer; color: var(--easytv-text-color); width: 40px; height: 40px;
    border-radius: var(--easytv-button-border-radius); display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent; flex-shrink: 0;
  }
  .icon-btn:hover { background: var(--easytv-button-background-hover); }
  .icon-btn:active { background: var(--easytv-button-background-active); transform: scale(0.92); }
  .icon-btn ha-icon { --mdc-icon-size: 20px; }
  .no-btn-bg .icon-btn, .no-btn-bg .qa-btn { background: transparent !important; }
  .no-btn-border .icon-btn { border-color: transparent !important; }
  .no-btn-border .qa-btn { border-color: transparent !important; }
`;

const OVERLAY_STYLES = `
  #easytv-overlay {
    position: fixed; top:0; left:0; right:0; bottom:0; z-index:999999;
    display: flex; flex-direction: column; overflow-y: auto;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
    animation: etvFadeIn 0.2s ease;
    transform: translateZ(0); -webkit-transform: translateZ(0);
    will-change: backdrop-filter;
    --easytv-overlay-section-radius: 16px;
    --easytv-overlay-btn-radius: 14px;
  }
  @keyframes etvFadeIn { from { opacity:0; transform:translateY(20px) translateZ(0); } to { opacity:1; transform:translateY(0) translateZ(0); } }

  /* Header */
  #easytv-overlay .overlay-header {
    display: flex; align-items: center; gap: 12px; padding: 18px 20px 12px; flex-shrink: 0;
  }
  #easytv-overlay .overlay-header ha-icon { --mdc-icon-size: 26px; }
  #easytv-overlay .overlay-title { flex:1; font-size:19px; font-weight:700; }
  #easytv-overlay .close-btn {
    cursor:pointer; width:40px; height:40px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; transition: background 0.15s; flex-shrink:0;
  }
  #easytv-overlay .close-btn ha-icon { --mdc-icon-size: 20px; }

  /* Now Playing Pill */
  #easytv-overlay .now-playing-pill {
    display: flex; align-items: center; gap: 10px;
    margin: 0 12px 4px; padding: 10px 14px;
    border-radius: 14px; flex-shrink: 0; min-width: 0; overflow: hidden;
  }
  #easytv-overlay .now-playing-pill ha-icon { --mdc-icon-size: 18px; flex-shrink: 0; }
  #easytv-overlay .np-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  #easytv-overlay .np-title {
    font-size: 13px; font-weight: 600; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; line-height: 1.2;
  }
  #easytv-overlay .np-sub {
    font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2;
  }
  #easytv-overlay .np-progress-wrap {
    width: 100%; height: 3px; border-radius: 2px; overflow: hidden; margin-top: 4px;
    background: rgba(255,255,255,0.15);
  }
  #easytv-overlay .np-progress-bar { height: 100%; border-radius: 2px; transition: width 1s linear; }

  /* Body grid */
  #easytv-overlay .overlay-body {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--etv-gap, 8px);
    padding: 4px 12px 32px; flex: 1; width: 100%; box-sizing: border-box; align-items: start;
  }
  #easytv-overlay .overlay-body.no-header { padding-top: 56px; }
  #easytv-overlay .overlay-section { min-width: 0; box-sizing: border-box; }
  #easytv-overlay .overlay-section.width-full          { grid-column: span 4; }
  #easytv-overlay .overlay-section.width-three-quarter { grid-column: span 3; }
  #easytv-overlay .overlay-section.width-half          { grid-column: span 2; }
  #easytv-overlay .overlay-section.width-quarter       { grid-column: span 1; }

  #easytv-overlay .etv-section {
    display: flex; flex-direction: column; gap: 6px;
    border-radius: var(--easytv-overlay-section-radius); padding: 8px; width: 100%; box-sizing: border-box;
  }
  #easytv-overlay .section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; padding: 0 2px 4px; }
  #easytv-overlay .section-label.hidden { display: none; }

  #easytv-overlay .btn-row { display: flex; align-items: center; gap: 6px; width: 100%; }
  #easytv-overlay .btn-row .icon-btn { flex: 1; border-radius: var(--easytv-overlay-btn-radius); height: 52px; width: auto; }
  #easytv-overlay .btn-row .icon-btn ha-icon { --mdc-icon-size: 24px; }

  #easytv-overlay .power-only-row { flex: 1; }
  #easytv-overlay .power-only-row .icon-btn {
    flex: 1 !important; height: 100% !important; min-height: 52px;
    border-radius: var(--easytv-overlay-btn-radius) !important; width: auto !important;
  }

  /* Volume slider */
  #easytv-overlay .vol-row {
    display: flex; align-items: center; gap: 10px; width: 100%; padding: 4px 0;
  }
  #easytv-overlay .vol-row .icon-btn {
    flex-shrink: 0; width: 44px; height: 44px;
    border-radius: var(--easytv-overlay-btn-radius) !important;
  }
  #easytv-overlay .vol-slider-wrap { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  #easytv-overlay .vol-slider {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 6px; border-radius: 3px; outline: none; cursor: pointer;
    background: linear-gradient(to right, var(--primary-color, #1976d2) var(--vol-pct, 50%), rgba(255,255,255,0.18) var(--vol-pct, 50%));
  }
  #easytv-overlay .vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 20px; height: 20px; border-radius: 50%;
    background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.35); cursor: pointer;
  }
  #easytv-overlay .vol-slider::-moz-range-thumb {
    width: 20px; height: 20px; border-radius: 50%; border: none;
    background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.35); cursor: pointer;
  }
  #easytv-overlay .vol-pct-label { font-size: 11px; text-align: right; }

  /* SVG D-Pad */
  #easytv-overlay .svg-dpad-wrap { position: relative; width: 100%; padding-bottom: 100%; }
  #easytv-overlay .svg-dpad { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: visible; }
  #easytv-overlay .dpad-petal {
    cursor: pointer;
    fill: var(--easytv-overlay-btn-background, rgba(255,255,255,0.10));
    stroke: var(--easytv-overlay-border-color, rgba(255,255,255,0.13));
    stroke-width: 1.5; transition: fill 0.13s; -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .dpad-petal:hover  { fill: rgba(255,255,255,0.20); }
  #easytv-overlay .dpad-petal:active { fill: rgba(255,255,255,0.32); }
  #easytv-overlay .dpad-select-circle {
    cursor: pointer;
    fill: color-mix(in srgb, var(--primary-color, #1976d2) 22%, rgba(255,255,255,0.10));
    stroke: var(--primary-color, #1976d2); stroke-width: 2;
    transition: fill 0.13s, transform 0.1s; transform-origin: 50% 50%;
    -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .dpad-select-circle:active {
    fill: color-mix(in srgb, var(--primary-color, #1976d2) 45%, rgba(255,255,255,0.10));
    transform: scale(0.91);
  }
  #easytv-overlay .dpad-arrow {
    pointer-events: none; font-weight: 700;
    fill: var(--easytv-overlay-text-color, #fff);
    text-anchor: middle; dominant-baseline: central;
    user-select: none; -webkit-user-select: none;
  }
  #easytv-overlay .dpad-select-label {
    pointer-events: none; font-size: 9px; font-weight: 700;
    fill: var(--easytv-overlay-text-color, #fff);
    text-anchor: middle; dominant-baseline: central;
    user-select: none; -webkit-user-select: none; letter-spacing: 0.04em;
  }
  #easytv-overlay .dpad-aux-row { display: flex; gap: 8px; margin-top: 8px; }
  #easytv-overlay .dpad-aux-row .icon-btn {
    flex: 1; height: 44px;
    border-radius: var(--easytv-overlay-btn-radius) !important; width: auto !important;
  }
  #easytv-overlay .dpad-aux-row .icon-btn ha-icon { --mdc-icon-size: 22px; }

  #easytv-overlay .icon-btn {
    cursor:pointer; border-radius: var(--easytv-overlay-btn-radius); width:52px; height:52px;
    display:flex; align-items:center; justify-content:center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color:transparent; padding:0;
  }
  #easytv-overlay .icon-btn ha-icon { --mdc-icon-size: 24px; }

  #easytv-overlay .numpad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; }
  #easytv-overlay .numpad-grid .icon-btn { border-radius: var(--easytv-overlay-btn-radius); width: auto; height: 52px; font-size: 18px; font-weight: 600; }
  #easytv-overlay .numpad-grid .icon-btn:active { transform: scale(0.93); }
  #easytv-overlay .app-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: 100%; }
  #easytv-overlay .app-btn {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; padding: 10px 4px; border-radius: var(--easytv-overlay-btn-radius);
    cursor: pointer; transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .app-btn:active { transform: scale(0.92); }
  #easytv-overlay .app-btn ha-icon { --mdc-icon-size: 26px; }
  #easytv-overlay .app-btn span { font-size: 10px; text-align:center; line-height:1.2; }
  #easytv-overlay .app-select-native {
    width: 100%; padding: 14px 16px; border-radius: 12px; box-sizing: border-box;
    font-size: 15px; font-family: inherit; appearance: none; -webkit-appearance: none;
    background-repeat: no-repeat; background-position: right 16px center; cursor: pointer;
  }
  #easytv-overlay .app-select-native:focus { outline: none; }
`;

const EDITOR_STYLES = `
  .editor { display: flex; flex-direction: column; gap: 14px; padding: 16px; font-family: var(--paper-font-body1_-_font-family, sans-serif); }
  .editor-panel {
    display: flex; flex-direction: column; gap: 12px; padding: 14px; border-radius: 14px;
    background: var(--ha-card-background, var(--card-background-color, rgba(255,255,255,0.03)));
    border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
  }
  .editor-panel-header { display: flex; flex-direction: column; gap: 4px; }
  .editor-panel-title { font-size: 14px; font-weight: 700; color: var(--primary-text-color, #fff); }
  .editor-panel-desc { font-size: 12px; line-height: 1.4; color: var(--secondary-text-color, rgba(255,255,255,0.6)); }
  h3 { margin: 4px 0 0; font-size: 11px; font-weight: 600; color: var(--primary-color, #1976d2); text-transform: uppercase; letter-spacing: 0.08em; }
  .field-wrap { display: flex; flex-direction: column; gap: 4px; }
  .field-wrap label { font-size: 12px; color: var(--secondary-text-color, rgba(255,255,255,0.6)); padding-left: 2px; }
  .etv-input, .etv-select, .etv-textarea {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
    background: var(--secondary-background-color, #2a2a2a); color: var(--primary-text-color, #fff);
    font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.15s;
  }
  .etv-input:focus, .etv-select:focus, .etv-textarea:focus { border-color: var(--primary-color, #1976d2); }
  .etv-textarea { min-height: 90px; resize: vertical; font-family: monospace; font-size: 12px; line-height: 1.5; }
  .etv-select {
    appearance: none; -webkit-appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23888' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
  }
  ha-entity-picker { width: 100%; display: block; }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 6px 2px; gap: 12px; }
  .row label { font-size: 14px; color: var(--primary-text-color, #fff); }
  .section-list, .qa-list { display: flex; flex-direction: column; gap: 6px; }
  .section-item {
    border-radius: 10px; background: var(--secondary-background-color, #2a2a2a);
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15)); overflow: hidden; transition: border-color 0.2s, opacity 0.2s;
  }
  .section-item.disabled { opacity: 0.5; }
  .section-row1 { display: flex; align-items: center; gap: 8px; padding: 10px 10px; min-height: 44px; }
  .section-handle {
    border: 0; background: transparent; color: var(--secondary-text-color, rgba(255,255,255,0.5));
    font-size: 16px; cursor: grab; width: 24px; height: 24px; border-radius: 4px;
    flex-shrink: 0; display: flex; align-items: center; justify-content: center; padding: 0;
  }
  .section-name { flex: 1; font-size: 14px; color: var(--primary-text-color, #fff); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .section-row2 {
    display: flex; align-items: center; gap: 6px; padding: 0 10px;
    max-height: 0; overflow: hidden; transition: max-height 0.22s ease, padding 0.22s ease;
  }
  .section-row2.open { max-height: 52px; padding: 0 10px 10px; }
  .section-width {
    flex: 1; padding: 7px 10px; border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
    background: var(--ha-card-background, rgba(255,255,255,0.05)); color: var(--primary-text-color, #fff);
    font-size: 13px; font-family: inherit; appearance: none; -webkit-appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23888' d='M5 6L0 0h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 8px center; padding-right: 26px; outline: none;
  }
  .section-move {
    border: 0; background: transparent; color: var(--secondary-text-color, rgba(255,255,255,0.6));
    font-size: 16px; cursor: pointer; width: 30px; height: 30px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;