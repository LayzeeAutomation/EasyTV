// EasyTV Card v0.4.11
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '0.4.11';

const TV_PRESETS = {
  roku: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute',power:'power',info:'info',replay:'replay' },
  google_tv: { up:'DPAD_UP',down:'DPAD_DOWN',left:'DPAD_LEFT',right:'DPAD_RIGHT',select:'DPAD_CENTER',back:'BACK',home:'HOME',play:'MEDIA_PLAY_PAUSE',pause:'MEDIA_PAUSE',stop:'MEDIA_STOP',forward:'MEDIA_NEXT',reverse:'MEDIA_PREVIOUS',volume_up:'VOLUME_UP',volume_down:'VOLUME_DOWN',volume_mute:'VOLUME_MUTE',power:'POWER',info:'INFO',source:'TV' },
  samsung: { up:'KEY_UP',down:'KEY_DOWN',left:'KEY_LEFT',right:'KEY_RIGHT',select:'KEY_ENTER',back:'KEY_RETURN',home:'KEY_HOME',play:'KEY_PLAY',pause:'KEY_PAUSE',stop:'KEY_STOP',forward:'KEY_FF',reverse:'KEY_REWIND',volume_up:'KEY_VOLUP',volume_down:'KEY_VOLDOWN',volume_mute:'KEY_MUTE',power:'KEY_POWER',info:'KEY_INFO',source:'KEY_SOURCE' },
  generic: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute' },
};

const LEGACY_DEFAULT_SECTIONS = { dpad:true, playback:true, volume:true, app_selector:true, power:true, utility:true, numpad:false, app_shortcuts:true };
const SECTION_ORDER = ['power', 'app_selector', 'utility', 'dpad', 'playback', 'volume', 'app_shortcuts', 'numpad'];
const SECTION_LABELS = {
  power: 'Power',
  app_selector: 'App',
  utility: 'Controls',
  dpad: 'Navigation',
  playback: 'Playback',
  volume: 'Volume',
  app_shortcuts: 'Apps',
  numpad: 'Channel / Number',
};

const VALID_WIDTHS = ['quarter', 'half', 'three-quarter', 'full'];

const GAP_OPTIONS = [
  ['0',  'None (0px)'],
  ['4',  'Tight (4px)'],
  ['8',  'Normal (8px)'],
  ['12', 'Relaxed (12px)'],
  ['16', 'Spacious (16px)'],
];
const DEFAULT_GAP = '8';

const QUICK_ACTION_DEFS = {
  volume_down:  { icon: 'mdi:volume-minus', title: 'Vol \u2212', cmd: (c) => c.volume_down },
  volume_up:    { icon: 'mdi:volume-plus',  title: 'Vol +', cmd: (c) => c.volume_up },
  volume_mute:  { icon: 'mdi:volume-off',   title: 'Mute',  cmd: (c) => c.volume_mute },
  play_pause:   { icon: 'mdi:play-pause',   title: 'Play/Pause', cmd: (c) => c.play },
  power:        { icon: 'mdi:power',        title: 'Power', cmd: (c) => c.power || 'power' },
  back:         { icon: 'mdi:arrow-left',   title: 'Back',  cmd: (c) => c.back },
  home:         { icon: 'mdi:home-outline', title: 'Home',  cmd: (c) => c.home },
  source:       { icon: 'mdi:import',       title: 'Source',cmd: (c) => c.source || 'input_av1' },
  forward:      { icon: 'mdi:fast-forward', title: 'Forward', cmd: (c) => c.forward },
  rewind:       { icon: 'mdi:rewind',       title: 'Rewind',  cmd: (c) => c.reverse },
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
    background: 'rgba(10, 10, 18, 0.55)',
    backdropFilter: 'blur(32px) saturate(1.4)',
    sectionBackground: 'rgba(255, 255, 255, 0.07)',
    buttonBackground: 'rgba(255, 255, 255, 0.10)',
    buttonHover: 'rgba(255, 255, 255, 0.18)',
    buttonActive: 'rgba(255, 255, 255, 0.26)',
    borderColor: 'rgba(255, 255, 255, 0.13)',
    textColor: '#ffffff',
    mutedColor: 'rgba(255, 255, 255, 0.55)',
    headerBorder: 'rgba(255, 255, 255, 0.10)',
    dropdownArrow: 'ffffff',
  },
  light: {
    background: 'rgba(240, 240, 248, 0.60)',
    backdropFilter: 'blur(32px) saturate(1.8)',
    sectionBackground: 'rgba(0, 0, 0, 0.05)',
    buttonBackground: 'rgba(0, 0, 0, 0.07)',
    buttonHover: 'rgba(0, 0, 0, 0.13)',
    buttonActive: 'rgba(0, 0, 0, 0.20)',
    borderColor: 'rgba(0, 0, 0, 0.10)',
    textColor: '#111111',
    mutedColor: 'rgba(0, 0, 0, 0.50)',
    headerBorder: 'rgba(0, 0, 0, 0.08)',
    dropdownArrow: '111111',
  },
};

const CARD_STYLES = `
  :host {
    display: block;
    --easytv-card-background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
    --easytv-surface-background: var(--secondary-background-color, var(--card-background-color, #2a2a2a));
    --easytv-text-color: var(--primary-text-color, #fff);
    --easytv-muted-color: var(--secondary-text-color, rgba(255,255,255,0.6));
    --easytv-border-color: var(--divider-color, rgba(255,255,255,0.12));
    --easytv-accent-color: var(--primary-color, #1976d2);
    --easytv-button-background: var(--easytv-surface-background);
    --easytv-button-background-hover: color-mix(in srgb, var(--easytv-button-background) 82%, white);
    --easytv-button-background-active: color-mix(in srgb, var(--easytv-button-background) 72%, white);
  }
  ha-card {
    background: transparent !important;
    box-shadow: none !important;
    overflow: visible;
  }
  .compact-single {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: 16px;
    background: var(--easytv-card-background);
    border: 1px solid var(--easytv-border-color);
    color: var(--easytv-text-color);
    gap: 10px;
  }
  .compact-single .c-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .compact-single .c-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .compact-double {
    display: flex; flex-direction: column;
    padding: 14px 14px 12px; border-radius: 16px;
    background: var(--easytv-card-background);
    border: 1px solid var(--easytv-border-color);
    color: var(--easytv-text-color);
    gap: 12px;
  }
  .compact-double .d-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .compact-double .d-top-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .compact-double .d-bottom { display: flex; align-items: center; gap: 8px; }
  .compact-double .d-bottom .qa-btn {
    flex: 1; height: 46px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    background: var(--easytv-button-background);
    border: 1px solid var(--easytv-border-color);
    color: var(--easytv-text-color);
    cursor: pointer; transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent; padding: 0;
  }
  .compact-double .d-bottom .qa-btn:hover { background: var(--easytv-button-background-hover); }
  .compact-double .d-bottom .qa-btn:active { background: var(--easytv-button-background-active); transform: scale(0.93); }
  .compact-double .d-bottom .qa-btn ha-icon { --mdc-icon-size: 22px; }
  .tv-icon { --mdc-icon-size: 26px; color: var(--easytv-accent-color); }
  .tv-name { font-weight: 600; font-size: 15px; color: var(--easytv-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .icon-btn {
    background: var(--easytv-button-background);
    border: 1px solid var(--easytv-border-color);
    cursor: pointer; color: var(--easytv-text-color);
    width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
    flex-shrink: 0;
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
  }
  @keyframes etvFadeIn { from { opacity:0; transform:translateY(20px) translateZ(0); } to { opacity:1; transform:translateY(0) translateZ(0); } }
  #easytv-overlay .overlay-header {
    display: flex; align-items: center; gap: 12px;
    padding: 18px 20px 12px; flex-shrink: 0;
  }
  #easytv-overlay .overlay-header ha-icon { --mdc-icon-size: 26px; }
  #easytv-overlay .overlay-title { flex:1; font-size:19px; font-weight:700; }
  #easytv-overlay .close-btn {
    cursor:pointer; width:40px; height:40px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    transition: background 0.15s; flex-shrink:0;
  }
  #easytv-overlay .close-btn ha-icon { --mdc-icon-size: 20px; }

  /* \u2500\u2500 4-column grid body \u2500\u2500 */
  #easytv-overlay .overlay-body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--etv-gap, 8px);
    padding: 4px 12px 32px;
    flex: 1; width: 100%; box-sizing: border-box;
    align-items: start;
  }
  #easytv-overlay .overlay-section { min-width: 0; box-sizing: border-box; }
  #easytv-overlay .overlay-section.width-full          { grid-column: span 4; }
  #easytv-overlay .overlay-section.width-three-quarter { grid-column: span 3; }
  #easytv-overlay .overlay-section.width-half          { grid-column: span 2; }
  #easytv-overlay .overlay-section.width-quarter       { grid-column: span 1; }

  /* Section wrapper — minimal padding so sections sit snug */
  #easytv-overlay .etv-section {
    display: flex; flex-direction: column; gap: 6px;
    border-radius: 16px; padding: 8px; width: 100%; box-sizing: border-box;
  }
  #easytv-overlay .section-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; padding: 0 2px 4px; }

  /* \u2500\u2500 Generic btn-row \u2500\u2500 */
  #easytv-overlay .btn-row { display: flex; align-items: center; gap: 6px; width: 100%; }
  #easytv-overlay .btn-row .icon-btn { flex: 1; border-radius: 14px; height: 52px; width: auto; }
  #easytv-overlay .btn-row .icon-btn ha-icon { --mdc-icon-size: 24px; }

  /* Power fills quarter-section height */
  #easytv-overlay .power-only-row { flex: 1; }
  #easytv-overlay .power-only-row .icon-btn {
    flex: 1 !important;
    height: 100% !important;
    min-height: 52px;
    border-radius: 14px !important;
    width: auto !important;
  }

  /* \u2500\u2500 D-pad 3\u00d73 grid \u2500\u2500
     Fixed 52px rows. Select cell uses place-self:center + explicit
     52\u00d752px so border-radius:50% always produces a true circle.      */
  #easytv-overlay .dpad-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 52px);
    gap: 6px;
    width: 100%;
  }
  /* All dpad buttons fill their cell */
  #easytv-overlay .dpad-grid .icon-btn {
    width: 100% !important;
    height: 100% !important;
    border-radius: 14px !important;
    flex: none !important;
    padding: 0 !important;
  }
  #easytv-overlay .dpad-grid .icon-btn ha-icon { --mdc-icon-size: 24px; }

  /* Select: fixed square centred in its cell so 50% radius = true circle */
  #easytv-overlay .dpad-grid .icon-btn.select-btn {
    width: 52px !important;
    height: 52px !important;
    border-radius: 50% !important;
    place-self: center;
  }

  #easytv-overlay .dpad-grid .dpad-empty {
    background: transparent;
    border: none;
    pointer-events: none;
  }

  /* Base overlay icon-btn */
  #easytv-overlay .icon-btn {
    cursor:pointer; border-radius: 14px; width:52px; height:52px;
    display:flex; align-items:center; justify-content:center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color:transparent; padding:0;
  }
  #easytv-overlay .icon-btn ha-icon { --mdc-icon-size: 24px; }

  #easytv-overlay .numpad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%; }
  #easytv-overlay .numpad-grid .icon-btn { border-radius: 14px; width: auto; height: 52px; font-size: 18px; font-weight: 600; }
  #easytv-overlay .numpad-grid .icon-btn:active { transform: scale(0.93); }
  #easytv-overlay .app-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: 100%; }
  #easytv-overlay .app-btn {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; padding: 10px 4px; border-radius: 14px;
    cursor: pointer; transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .app-btn:active { transform: scale(0.92); }
  #easytv-overlay .app-btn ha-icon { --mdc-icon-size: 26px; }
  #easytv-overlay .app-btn span { font-size: 10px; text-align:center; line-height:1.2; }
  #easytv-overlay .app-select-native {
    width: 100%; padding: 14px 16px; border-radius: 12px; box-sizing: border-box;
    font-size: 15px; font-family: inherit;
    appearance: none; -webkit-appearance: none;
    background-repeat: no-repeat; background-position: right 16px center; cursor: pointer;
  }
  #easytv-overlay .app-select-native:focus { outline: none; }
`;

const EDITOR_STYLES = `
  .editor { display: flex; flex-direction: column; gap: 14px; padding: 16px; font-family: var(--paper-font-body1_-_font-family, sans-serif); }
  .editor-panel {
    display: flex; flex-direction: column; gap: 12px;
    padding: 14px; border-radius: 14px;
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
    width: 100%; box-sizing: border-box;
    padding: 10px 12px; border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
    background: var(--secondary-background-color, #2a2a2a);
    color: var(--primary-text-color, #fff);
    font-size: 14px; font-family: inherit;
    outline: none; transition: border-color 0.15s;
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
  .section-list, .qa-list { display: flex; flex-direction: column; gap: 8px; }
  .section-item, .qa-item {
    display: grid; align-items: center;
    padding: 10px 12px; border-radius: 10px;
    background: var(--secondary-background-color, #2a2a2a);
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
  }
  .section-item { grid-template-columns: 32px 1fr auto auto auto; gap: 8px; }
  .qa-item { grid-template-columns: 32px 1fr auto; gap: 8px; }
  .section-handle, .section-move {
    border: 0; background: transparent; color: var(--secondary-text-color, rgba(255,255,255,0.6));
    font-size: 18px; cursor: pointer; width: 28px; height: 28px; border-radius: 6px;
  }
  .section-handle { cursor: grab; }
  .section-name { font-size: 14px; color: var(--primary-text-color, #fff); }
  .section-width { min-width: 110px; }
  .editor-note {
    font-size: 12px; line-height: 1.45;
    color: var(--secondary-text-color, rgba(255,255,255,0.6));
    padding: 2px 2px 0;
  }
`;

function mkIcon(name, color) {
  const el = document.createElement('ha-icon');
  el.setAttribute('icon', name);
  if (color) el.style.color = color;
  return el;
}

function iconBtn(iconName, onClick, title = '', extraClass = '', color) {
  const btn = document.createElement('button');
  btn.className = 'icon-btn' + (extraClass ? ' ' + extraClass : '');
  btn.title = title;
  btn.appendChild(mkIcon(iconName, color));
  btn.addEventListener('click', (e) => { e.stopPropagation(); onClick(e); });
  return btn;
}

function numBtn(label, onClick) {
  const btn = document.createElement('button');
  btn.className = 'icon-btn';
  btn.textContent = label;
  btn.addEventListener('click', (e) => { e.stopPropagation(); onClick(e); });
  return btn;
}

function sectionWrap(labelText) {
  const wrap = document.createElement('div');
  wrap.className = 'etv-section';
  if (labelText) {
    const lbl = document.createElement('div');
    lbl.className = 'section-label';
    lbl.textContent = labelText;
    wrap.appendChild(lbl);
  }
  return wrap;
}

function normalizeWidth(w) {
  return VALID_WIDTHS.includes(w) ? w : 'full';
}

function buildDefaultSectionLayout() {
  return [
    { id: 'power',        enabled: true,  width: 'quarter' },
    { id: 'app_selector', enabled: true,  width: 'three-quarter' },
    { id: 'utility',      enabled: true,  width: 'full' },
    { id: 'dpad',         enabled: true,  width: 'full' },
    { id: 'playback',     enabled: true,  width: 'full' },
    { id: 'volume',       enabled: true,  width: 'full' },
    { id: 'app_shortcuts',enabled: true,  width: 'full' },
    { id: 'numpad',       enabled: false, width: 'full' },
  ];
}

function normalizeSections(sections) {
  if (Array.isArray(sections)) {
    const map = new Map();
    sections.forEach((s) => {
      if (!s || !s.id) return;
      map.set(s.id, { id: s.id, enabled: s.enabled !== false, width: normalizeWidth(s.width) });
    });
    return SECTION_ORDER.map((id) => map.get(id) || {
      id,
      enabled: id !== 'numpad',
      width: (id === 'power') ? 'quarter' : (id === 'app_selector') ? 'three-quarter' : 'full',
    });
  }
  const legacy = { ...LEGACY_DEFAULT_SECTIONS, ...(sections || {}) };
  return [
    { id: 'power',        enabled: legacy.power !== false,        width: 'quarter' },
    { id: 'app_selector', enabled: legacy.app_selector !== false, width: 'three-quarter' },
    { id: 'utility',      enabled: legacy.utility !== false,      width: 'full' },
    { id: 'dpad',         enabled: legacy.dpad !== false,         width: 'full' },
    { id: 'playback',     enabled: legacy.playback !== false,     width: 'full' },
    { id: 'volume',       enabled: legacy.volume !== false,       width: 'full' },
    { id: 'app_shortcuts',enabled: legacy.app_shortcuts !== false,width: 'full' },
    { id: 'numpad',       enabled: !!legacy.numpad,               width: 'full' },
  ];
}

function editorField(labelText, inputEl) {
  const wrap = document.createElement('div');
  wrap.className = 'field-wrap';
  const lbl = document.createElement('label');
  lbl.textContent = labelText;
  wrap.appendChild(lbl);
  wrap.appendChild(inputEl);
  return wrap;
}

function editorInput(value, placeholder) {
  const el = document.createElement('input');
  el.className = 'etv-input';
  el.type = 'text';
  el.value = value || '';
  el.placeholder = placeholder || '';
  return el;
}

function editorTextarea(value, placeholder) {
  const el = document.createElement('textarea');
  el.className = 'etv-textarea';
  el.value = value || '';
  el.placeholder = placeholder || '';
  el.spellcheck = false;
  return el;
}

function editorSelect(options, currentValue, className = 'etv-select') {
  const el = document.createElement('select');
  el.className = className;
  options.forEach(([val, label]) => {
    const o = document.createElement('option');
    o.value = val;
    o.textContent = label;
    if (val === currentValue) o.selected = true;
    el.appendChild(o);
  });
  return el;
}

function editorRow(labelText, switchEl) {
  const row = document.createElement('div');
  row.className = 'row';
  const lbl = document.createElement('label');
  lbl.textContent = labelText;
  row.appendChild(lbl);
  row.appendChild(switchEl);
  return row;
}

function editorSwitch(checked) {
  const el = document.createElement('ha-switch');
  if (checked) el.setAttribute('checked', '');
  return el;
}

function editorH3(text) {
  const h = document.createElement('h3');
  h.textContent = text;
  return h;
}

function editorPanel(title, desc) {
  const panel = document.createElement('div');
  panel.className = 'editor-panel';
  const header = document.createElement('div');
  header.className = 'editor-panel-header';
  const titleEl = document.createElement('div');
  titleEl.className = 'editor-panel-title';
  titleEl.textContent = title;
  const descEl = document.createElement('div');
  descEl.className = 'editor-panel-desc';
  descEl.textContent = desc;
  header.appendChild(titleEl);
  header.appendChild(descEl);
  panel.appendChild(header);
  return panel;
}

class EasyTVCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode:'open' });
    this._expanded = false;
    this._overlayEl = null;
    this._overlayStyleEl = null;
  }

  connectedCallback() { this._injectGlobalStyle(); }
  disconnectedCallback() { this._removeOverlay(); }

  _injectGlobalStyle() {
    if (document.getElementById('easytv-overlay-styles')) return;
    const s = document.createElement('style');
    s.id = 'easytv-overlay-styles';
    s.textContent = OVERLAY_STYLES;
    document.head.appendChild(s);
  }

  _applyOverlayTheme(overlay) {
    const cfg = this._config;
    const theme = cfg.overlay_theme || 'dark';
    const t = OVERLAY_THEMES[theme] || OVERLAY_THEMES.dark;
    const showSectionBg  = cfg.overlay_section_bg    !== false;
    const showBtnBorders = cfg.overlay_button_borders !== false;
    const showLabels     = cfg.overlay_show_labels    !== false;
    const gap            = cfg.overlay_gap ?? DEFAULT_GAP;

    overlay.style.background = t.background;
    overlay.style.backdropFilter = t.backdropFilter;
    overlay.style.webkitBackdropFilter = t.backdropFilter;
    overlay.style.color = t.textColor;
    overlay.style.setProperty('--etv-gap', `${parseInt(gap, 10) || 0}px`);

    const dynId = 'easytv-overlay-theme-dynamic';
    let dynStyle = document.getElementById(dynId);
    if (!dynStyle) { dynStyle = document.createElement('style'); dynStyle.id = dynId; document.head.appendChild(dynStyle); }
    dynStyle.textContent = `
      #easytv-overlay .overlay-header { border-bottom: 1px solid ${t.headerBorder}; color: ${t.textColor}; }
      #easytv-overlay .overlay-header ha-icon { color: var(--primary-color, #1976d2); }
      #easytv-overlay .overlay-title { color: ${t.textColor}; }
      #easytv-overlay .close-btn { background: ${t.buttonBackground}; border: 1px solid ${t.borderColor}; color: ${t.textColor}; }
      #easytv-overlay .close-btn:hover { background: ${t.buttonHover}; }
      #easytv-overlay .etv-section {
        background: ${showSectionBg ? t.sectionBackground : 'transparent'};
        border: ${showSectionBg ? `1px solid ${t.borderColor}` : '1px solid transparent'};
      }
      #easytv-overlay .section-label { color: ${showLabels ? t.mutedColor : 'transparent'}; }
      #easytv-overlay .icon-btn {
        background: ${t.buttonBackground};
        border: ${showBtnBorders ? `1px solid ${t.borderColor}` : '1px solid transparent'};
        color: ${t.textColor};
      }
      #easytv-overlay .icon-btn:hover { background: ${t.buttonHover}; }
      #easytv-overlay .icon-btn:active { background: ${t.buttonActive}; transform: scale(0.91); }
      #easytv-overlay .dpad-grid .icon-btn.select-btn { background: color-mix(in srgb, var(--primary-color, #1976d2) 22%, ${t.buttonBackground}); border: 2px solid var(--primary-color, #1976d2); }
      #easytv-overlay .numpad-grid .icon-btn { color: ${t.textColor}; }
      #easytv-overlay .app-btn {
        background: ${t.buttonBackground};
        border: ${showBtnBorders ? `1px solid ${t.borderColor}` : '1px solid transparent'};
        color: ${t.textColor};
      }
      #easytv-overlay .app-btn:hover { background: ${t.buttonHover}; }
      #easytv-overlay .app-btn span { color: ${t.mutedColor}; }
      #easytv-overlay .app-select-native { background-color: ${t.buttonBackground}; border: 1px solid ${t.borderColor}; color: ${t.textColor}; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23${t.dropdownArrow}' d='M6 8L0 0h12z'/%3E%3C/svg%3E"); }
      #easytv-overlay .app-select-native:focus { border-color: var(--primary-color, #1976d2); }
    `;
  }

  _removeOverlay() {
    if (this._overlayEl && this._overlayEl.parentNode) this._overlayEl.parentNode.removeChild(this._overlayEl);
    if (this._overlayStyleEl && this._overlayStyleEl.parentNode) this._overlayStyleEl.parentNode.removeChild(this._overlayStyleEl);
    this._overlayEl = null;
    this._overlayStyleEl = null;
  }

  set hass(hass) { this._hass = hass; this._render(); }

  setConfig(config) {
    if (!config.remote_entity) throw new Error('EasyTV: remote_entity is required');
    this._config = { tv_preset:'roku', show_name:true, overlay_theme:'dark', compact_mode:'single', ...config };
    this._config.sections = normalizeSections(config.sections ?? buildDefaultSectionLayout());
    this._render();
  }

  static getConfigElement() { return document.createElement('easytv-card-editor'); }
  static getStubConfig() {
    return { name:'My TV', remote_entity:'remote.my_tv', tv_preset:'roku', overlay_theme:'dark', compact_mode:'single', sections: buildDefaultSectionLayout() };
  }

  get _commands() {
    const base = TV_PRESETS[this._config.tv_preset] || TV_PRESETS.generic;
    return { ...base, ...(this._config.command_overrides || {}) };
  }

  _send(command) {
    if (!this._hass) return;
    this._hass.callService('remote', 'send_command', { entity_id: this._config.remote_entity, command });
  }

  _toggleExpanded() {
    this._expanded = !this._expanded;
    if (this._expanded) this._mountOverlay(); else this._removeOverlay();
  }

  _compactSingle() {
    const { name, icon: ico, show_name, quick_actions, compact_button_bg, compact_button_border } = this._config;
    const actions = (quick_actions && quick_actions.length) ? quick_actions.slice(0, 3) : DEFAULT_QUICK_SINGLE;
    const wrap = document.createElement('div');
    const classes = ['compact-single'];
    if (compact_button_bg === false) classes.push('no-btn-bg');
    if (compact_button_border === false) classes.push('no-btn-border');
    wrap.className = classes.join(' ');
    const left = document.createElement('div');
    left.className = 'c-left';
    const tvIco = mkIcon(ico || 'mdi:television');
    tvIco.className = 'tv-icon';
    left.appendChild(tvIco);
    if (show_name !== false) {
      const s = document.createElement('span');
      s.className = 'tv-name';
      s.textContent = name || 'My TV';
      left.appendChild(s);
    }
    const right = document.createElement('div');
    right.className = 'c-actions';
    actions.forEach((key) => {
      const def = QUICK_ACTION_DEFS[key];
      if (!def) return;
      right.appendChild(iconBtn(def.icon, () => this._send(def.cmd(this._commands)), def.title));
    });
    right.appendChild(iconBtn('mdi:remote', () => this._toggleExpanded(), 'Open Remote'));
    wrap.appendChild(left);
    wrap.appendChild(right);
    return wrap;
  }

  _compactDouble() {
    const { name, icon: ico, show_name, quick_actions, compact_button_bg, compact_button_border } = this._config;
    const actions = (quick_actions && quick_actions.length) ? quick_actions.slice(0, 6) : DEFAULT_QUICK_DOUBLE;
    const wrap = document.createElement('div');
    const classes = ['compact-double'];
    if (compact_button_bg === false) classes.push('no-btn-bg');
    if (compact_button_border === false) classes.push('no-btn-border');
    wrap.className = classes.join(' ');
    const top = document.createElement('div');
    top.className = 'd-top';
    const topLeft = document.createElement('div');
    topLeft.className = 'd-top-left';
    const tvIco = mkIcon(ico || 'mdi:television');
    tvIco.className = 'tv-icon';
    topLeft.appendChild(tvIco);
    if (show_name !== false) {
      const s = document.createElement('span');
      s.className = 'tv-name';
      s.textContent = name || 'My TV';
      topLeft.appendChild(s);
    }
    top.appendChild(topLeft);
    top.appendChild(iconBtn('mdi:remote', () => this._toggleExpanded(), 'Open Remote'));
    wrap.appendChild(top);
    const bottom = document.createElement('div');
    bottom.className = 'd-bottom';
    actions.forEach((key) => {
      const def = QUICK_ACTION_DEFS[key];
      if (!def) return;
      const btn = document.createElement('button');
      btn.className = 'qa-btn';
      btn.title = def.title;
      btn.appendChild(mkIcon(def.icon));
      btn.addEventListener('click', (e) => { e.stopPropagation(); this._send(def.cmd(this._commands)); });
      bottom.appendChild(btn);
    });
    wrap.appendChild(bottom);
    return wrap;
  }

  _buildPower() {
    const c = this._commands;
    const wrap = sectionWrap('Power');
    wrap.style.flex = '1';
    const row = document.createElement('div');
    row.className = 'btn-row power-only-row';
    const btn = iconBtn('mdi:power', () => this._send(c.power || 'power'), 'Power');
    row.appendChild(btn);
    wrap.appendChild(row);
    return wrap;
  }

  _buildAppSelector() {
    const { app_select_entity } = this._config;
    if (!app_select_entity || !this._hass) return null;
    const state = this._hass.states[app_select_entity];
    if (!state) return null;
    const wrap = sectionWrap('App');
    const sel = document.createElement('select');
    sel.className = 'app-select-native';
    (state.attributes.options || []).forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.textContent = opt;
      if (opt === state.state) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', (e) => {
      e.stopPropagation();
      this._hass.callService('select', 'select_option', { entity_id: app_select_entity, option: e.target.value });
    });
    wrap.appendChild(sel);
    return wrap;
  }

  _buildDpad() {
    const c = this._commands;
    const wrap = sectionWrap('Navigation');

    const grid = document.createElement('div');
    grid.className = 'dpad-grid';

    const empty1 = document.createElement('div');
    empty1.className = 'dpad-empty';
    const upBtn    = iconBtn('mdi:arrow-up-bold',    () => this._send(c.up),     'Up');
    const empty2   = document.createElement('div');
    empty2.className = 'dpad-empty';
    const leftBtn  = iconBtn('mdi:arrow-left-bold',  () => this._send(c.left),   'Left');
    const selBtn   = iconBtn('mdi:keyboard-return',  () => this._send(c.select), 'Select', 'select-btn');
    const rightBtn = iconBtn('mdi:arrow-right-bold', () => this._send(c.right),  'Right');
    const backBtn  = iconBtn('mdi:arrow-left',       () => this._send(c.back),   'Back');
    const downBtn  = iconBtn('mdi:arrow-down-bold',  () => this._send(c.down),   'Down');
    const homeBtn  = iconBtn('mdi:home-outline',     () => this._send(c.home),   'Home');

    grid.appendChild(empty1);
    grid.appendChild(upBtn);
    grid.appendChild(empty2);
    grid.appendChild(leftBtn);
    grid.appendChild(selBtn);
    grid.appendChild(rightBtn);
    grid.appendChild(backBtn);
    grid.appendChild(downBtn);
    grid.appendChild(homeBtn);

    wrap.appendChild(grid);
    return wrap;
  }

  _buildUtility() {
    const c = this._commands;
    const wrap = sectionWrap('Controls');
    const row = document.createElement('div');
    row.className = 'btn-row';
    [
      iconBtn('mdi:import',              () => this._send(c.source   || 'input_av1'), 'Source'),
      iconBtn('mdi:menu',                () => this._send(c.menu     || 'menu'),      'Menu'),
      iconBtn('mdi:cog-outline',         () => this._send(c.settings || 'settings'),  'Settings'),
      iconBtn('mdi:information-outline', () => this._send(c.info     || 'info'),      'Info')
    ].forEach(b => { b.style.flex = '1'; b.style.borderRadius = '14px'; b.style.height = '52px'; row.appendChild(b); });
    wrap.appendChild(row);
    return wrap;
  }

  _buildPlayback() {
    const c = this._commands;
    const wrap = sectionWrap('Playback');
    const row = document.createElement('div');
    row.className = 'btn-row';
    [
      iconBtn('mdi:skip-previous', () => this._send(c.reverse),  'Prev'),
      iconBtn('mdi:rewind',        () => this._send(c.reverse),  'Rewind'),
      iconBtn('mdi:play-pause',    () => this._send(c.play),     'Play/Pause'),
      iconBtn('mdi:fast-forward',  () => this._send(c.forward),  'Forward'),
      iconBtn('mdi:skip-next',     () => this._send(c.forward),  'Next')
    ].forEach(b => { b.style.flex = '1'; b.style.borderRadius = '14px'; b.style.height = '52px'; row.appendChild(b); });
    wrap.appendChild(row);
    return wrap;
  }

  _buildVolume() {
    const c = this._commands;
    const wrap = sectionWrap('Volume');
    const row = document.createElement('div');
    row.className = 'btn-row';
    [
      iconBtn('mdi:volume-off',    () => this._send(c.volume_mute),  'Mute'),
      iconBtn('mdi:volume-medium', () => this._send(c.volume_down),  'Vol -'),
      iconBtn('mdi:volume-high',   () => this._send(c.volume_up),    'Vol +')
    ].forEach(b => { b.style.flex = '1'; b.style.borderRadius = '14px'; b.style.height = '52px'; row.appendChild(b); });
    wrap.appendChild(row);
    return wrap;
  }

  _buildNumpad() {
    const wrap = sectionWrap('Channel / Number');
    const grid = document.createElement('div');
    grid.className = 'numpad-grid';
    ['1','2','3','4','5','6','7','8','9','*','0','#'].forEach(k => {
      const btn = numBtn(k, () => this._send(k));
      btn.style.borderRadius = '14px'; btn.style.height = '52px'; btn.style.width = 'auto';
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  _buildAppShortcuts() {
    const apps = (this._config.app_shortcuts?.length) ? this._config.app_shortcuts : APP_SHORTCUTS;
    const wrap = sectionWrap('Apps');
    const grid = document.createElement('div');
    grid.className = 'app-grid';
    apps.forEach(app => {
      const btn = document.createElement('button');
      btn.className = 'app-btn';
      btn.appendChild(mkIcon(app.icon || 'mdi:television-play', app.color || null));
      const lbl = document.createElement('span');
      lbl.textContent = app.name;
      btn.appendChild(lbl);
      btn.addEventListener('click', (e) => { e.stopPropagation(); this._send(app.cmd); });
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  _buildSectionById(id) {
    switch (id) {
      case 'power':         return this._buildPower();
      case 'app_selector':  return this._buildAppSelector();
      case 'utility':       return this._buildUtility();
      case 'dpad':          return this._buildDpad();
      case 'playback':      return this._buildPlayback();
      case 'volume':        return this._buildVolume();
      case 'app_shortcuts': return this._buildAppShortcuts();
      case 'numpad':        return this._buildNumpad();
      default: return null;
    }
  }

  _mountOverlay() {
    this._removeOverlay();
    this._injectGlobalStyle();
    const cfg = this._config;
    const { name, icon: ico } = cfg;
    const showHeader = cfg.show_name !== false;

    const overlay = document.createElement('div');
    overlay.id = 'easytv-overlay';
    this._applyOverlayTheme(overlay);

    if (showHeader) {
      const header = document.createElement('div');
      header.className = 'overlay-header';
      header.appendChild(mkIcon(ico || 'mdi:television'));
      const title = document.createElement('span');
      title.className = 'overlay-title';
      title.textContent = name || 'My TV';
      header.appendChild(title);
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.appendChild(mkIcon('mdi:close'));
      closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this._expanded = false; this._removeOverlay(); });
      header.appendChild(closeBtn);
      overlay.appendChild(header);
    } else {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'close-btn';
      closeBtn.style.cssText = 'position:absolute;top:12px;right:12px;z-index:10;';
      closeBtn.appendChild(mkIcon('mdi:close'));
      closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this._expanded = false; this._removeOverlay(); });
      overlay.appendChild(closeBtn);
    }

    const body = document.createElement('div');
    body.className = 'overlay-body';
    if (!showHeader) body.style.paddingTop = '52px';

    normalizeSections(cfg.sections).forEach((section) => {
      if (!section.enabled) return;
      const content = this._buildSectionById(section.id);
      if (!content) return;
      const container = document.createElement('div');
      container.className = `overlay-section width-${normalizeWidth(section.width)}`;
      container.appendChild(content);
      body.appendChild(container);
    });
    overlay.appendChild(body);

    if (cfg.card_mod?.style) {
      const styleEl = document.createElement('style');
      styleEl.id = 'easytv-overlay-card-mod';
      styleEl.textContent = cfg.card_mod.style;
      document.body.appendChild(styleEl);
      this._overlayStyleEl = styleEl;
    }
    document.body.appendChild(overlay);
    this._overlayEl = overlay;
  }

  _render() {
    if (!this._config) return;
    const root = this.shadowRoot;
    root.innerHTML = '';
    const style = document.createElement('style');
    style.textContent = CARD_STYLES;
    root.appendChild(style);
    if (this._config.card_mod?.style) {
      const modStyle = document.createElement('style');
      modStyle.textContent = this._config.card_mod.style;
      root.appendChild(modStyle);
    }
    const card = document.createElement('ha-card');
    const mode = this._config.compact_mode || 'single';
    card.appendChild(mode === 'double' ? this._compactDouble() : this._compactSingle());
    root.appendChild(card);
  }

  getCardSize() { return (this._config?.compact_mode === 'double') ? 3 : 2; }
}

class EasyTVCardEditor extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  set hass(hass) { this._hass = hass; this._updatePickers(); }
  setConfig(config) {
    this._config = { ...config, sections: normalizeSections(config.sections ?? buildDefaultSectionLayout()) };
    this._render();
  }
  _fire(config) { this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true })); }
  _set(key, value) { this._fire({ ...this._config, [key]: value }); }
  _setSections(sections) { this._config = { ...this._config, sections }; this._fire({ ...this._config, sections }); this._render(); }
  _setQuickActions(qa) { this._config = { ...this._config, quick_actions: qa }; this._fire({ ...this._config, quick_actions: qa }); this._render(); }

  _updatePickers() {
    if (!this._hass || !this.shadowRoot) return;
    const rp = this.shadowRoot.querySelector('#etv-remote');
    const ap = this.shadowRoot.querySelector('#etv-appselect');
    if (rp) rp.hass = this._hass;
    if (ap) ap.hass = this._hass;
  }

  _moveSection(index, delta) {
    const next = [...this._config.sections];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    this._setSections(next);
  }

  _updateSection(index, patch) {
    const next = this._config.sections.map((item, i) => i === index ? { ...item, ...patch } : item);
    this._setSections(next);
  }

  _moveQA(index, delta) {
    const qa = [...(this._config.quick_actions || this._defaultQA())];
    const target = index + delta;
    if (target < 0 || target >= qa.length) return;
    const [item] = qa.splice(index, 1);
    qa.splice(target, 0, item);
    this._setQuickActions(qa);
  }

  _removeQA(index) {
    const qa = [...(this._config.quick_actions || this._defaultQA())];
    qa.splice(index, 1);
    this._setQuickActions(qa);
  }

  _addQA(key) {
    const qa = [...(this._config.quick_actions || this._defaultQA()), key];
    this._setQuickActions(qa);
  }

  _defaultQA() {
    return (this._config.compact_mode === 'double') ? [...DEFAULT_QUICK_DOUBLE] : [...DEFAULT_QUICK_SINGLE];
  }

  _renderSectionEditor(parent) {
    parent.appendChild(editorH3('Layout'));
    const note = document.createElement('div');
    note.className = 'editor-note';
    note.textContent = 'Reorder sections and set widths. Use \u00bc + \u00be or \u00bd + \u00bd pairs to place sections side by side.';
    parent.appendChild(note);
    const list = document.createElement('div');
    list.className = 'section-list';
    this._config.sections.forEach((section, index) => {
      const item = document.createElement('div');
      item.className = 'section-item';
      const handle = document.createElement('button');
      handle.className = 'section-handle';
      handle.textContent = '\u283f';
      handle.title = 'Drag handle';
      const name = document.createElement('div');
      name.className = 'section-name';
      name.textContent = SECTION_LABELS[section.id] || section.id;
      const sw = editorSwitch(section.enabled !== false);
      sw.addEventListener('change', e => this._updateSection(index, { enabled: e.target.checked }));
      const width = editorSelect(
        [['full','Full'],['three-quarter','\u00be'],['half','\u00bd'],['quarter','\u00bc']],
        normalizeWidth(section.width),
        'etv-select section-width'
      );
      width.addEventListener('change', e => this._updateSection(index, { width: e.target.value }));
      const moves = document.createElement('div');
      moves.style.cssText = 'display:flex;gap:4px;';
      const up = document.createElement('button');
      up.className = 'section-move'; up.textContent = '\u2191';
      up.addEventListener('click', () => this._moveSection(index, -1));
      const dn = document.createElement('button');
      dn.className = 'section-move'; dn.textContent = '\u2193';
      dn.addEventListener('click', () => this._moveSection(index, 1));
      moves.appendChild(up); moves.appendChild(dn);
      item.appendChild(handle); item.appendChild(name); item.appendChild(sw); item.appendChild(width); item.appendChild(moves);
      list.appendChild(item);
    });
    parent.appendChild(list);
  }

  _renderQAEditor(parent) {
    const mode = this._config.compact_mode || 'single';
    const limit = mode === 'double' ? 6 : 3;
    const qa = this._config.quick_actions || this._defaultQA();
    parent.appendChild(editorH3('Quick Actions'));
    const note = document.createElement('div');
    note.className = 'editor-note';
    note.textContent = `${mode === 'double' ? 'Double row supports up to 6 buttons.' : 'Single row supports up to 3 buttons.'}`;
    parent.appendChild(note);
    const list = document.createElement('div');
    list.className = 'qa-list';
    qa.slice(0, limit).forEach((key, index) => {
      const def = QUICK_ACTION_DEFS[key];
      if (!def) return;
      const item = document.createElement('div');
      item.className = 'qa-item';
      const handle = document.createElement('button');
      handle.className = 'section-handle'; handle.textContent = '\u283f';
      const name = document.createElement('div');
      name.className = 'section-name'; name.textContent = def.title;
      const moves = document.createElement('div');
      moves.style.cssText = 'display:flex;gap:4px;';
      const up = document.createElement('button');
      up.className = 'section-move'; up.textContent = '\u2191';
      up.addEventListener('click', () => this._moveQA(index, -1));
      const dn = document.createElement('button');
      dn.className = 'section-move'; dn.textContent = '\u2193';
      dn.addEventListener('click', () => this._moveQA(index, 1));
      const rm = document.createElement('button');
      rm.className = 'section-move'; rm.textContent = '\u2715'; rm.style.color = '#e74c3c';
      rm.addEventListener('click', () => this._removeQA(index));
      moves.appendChild(up); moves.appendChild(dn); moves.appendChild(rm);
      item.appendChild(handle); item.appendChild(name); item.appendChild(moves);
      list.appendChild(item);
    });
    parent.appendChild(list);
    if (qa.length < limit) {
      const addSel = editorSelect([['', '\u2014 Add action \u2014'], ...Object.entries(QUICK_ACTION_DEFS).map(([k, v]) => [k, v.title])], '', 'etv-select');
      addSel.addEventListener('change', e => { if (e.target.value) { this._addQA(e.target.value); e.target.value = ''; } });
      parent.appendChild(addSel);
    }
  }

  _render() {
    if (!this._config) return;
    const c = this._config;
    const root = this.shadowRoot;
    root.innerHTML = '';
    const style = document.createElement('style');
    style.textContent = EDITOR_STYLES;
    root.appendChild(style);
    const editor = document.createElement('div');
    editor.className = 'editor';

    const globalPanel = editorPanel('Global Settings', 'Core entities and command mapping shared by both the small card and the pop-out remote.');
    globalPanel.appendChild(editorH3('Identity'));
    const nameEl = editorInput(c.name, 'e.g. My TV');
    nameEl.addEventListener('change', e => this._set('name', e.target.value));
    globalPanel.appendChild(editorField('Card Title', nameEl));
    const iconEl = editorInput(c.icon, 'e.g. mdi:television');
    iconEl.addEventListener('change', e => this._set('icon', e.target.value));
    globalPanel.appendChild(editorField('Icon', iconEl));
    globalPanel.appendChild(editorH3('Entities'));
    const remotePicker = document.createElement('ha-entity-picker');
    remotePicker.id = 'etv-remote';
    if (this._hass) remotePicker.hass = this._hass;
    remotePicker.value = c.remote_entity || '';
    remotePicker.addEventListener('value-changed', e => this._set('remote_entity', e.detail.value));
    globalPanel.appendChild(editorField('Remote Entity (required)', remotePicker));
    const appPicker = document.createElement('ha-entity-picker');
    appPicker.id = 'etv-appselect';
    if (this._hass) appPicker.hass = this._hass;
    appPicker.value = c.app_select_entity || '';
    appPicker.addEventListener('value-changed', e => this._set('app_select_entity', e.detail.value));
    globalPanel.appendChild(editorField('App Select Entity', appPicker));
    globalPanel.appendChild(editorH3('Commands'));
    const presetEl = editorSelect([['roku','Roku'],['google_tv','Google TV'],['samsung','Samsung'],['generic','Generic']], c.tv_preset || 'roku');
    presetEl.addEventListener('change', e => this._set('tv_preset', e.target.value));
    globalPanel.appendChild(editorField('TV Preset', presetEl));
    globalPanel.appendChild(editorH3('Custom CSS'));
    const cssNote = document.createElement('div');
    cssNote.className = 'editor-note';
    cssNote.textContent = 'Injected into both the small card (shadow DOM) and the pop-out overlay. Targets #easytv-overlay for the remote.';
    globalPanel.appendChild(cssNote);
    const cssEl = editorTextarea(c.card_mod?.style || '', '/* e.g.\n#easytv-overlay { border-radius: 0; }\n*/');
    cssEl.addEventListener('change', e => {
      const val = e.target.value.trim();
      const existing = { ...(c.card_mod || {}) };
      if (val) { existing.style = val; } else { delete existing.style; }
      this._set('card_mod', Object.keys(existing).length ? existing : undefined);
    });
    globalPanel.appendChild(editorField('card_mod CSS', cssEl));
    editor.appendChild(globalPanel);

    const cardPanel = editorPanel('Card Settings', 'Controls the small always-visible card.');
    cardPanel.appendChild(editorH3('Appearance'));
    const modeEl = editorSelect([['single','Single row'],['double','Double row']], c.compact_mode || 'single');
    modeEl.addEventListener('change', e => this._set('compact_mode', e.target.value));
    cardPanel.appendChild(editorField('Compact Mode', modeEl));
    const showNameSw = editorSwitch(c.show_name !== false);
    showNameSw.addEventListener('change', e => this._set('show_name', e.target.checked));
    cardPanel.appendChild(editorRow('Show Name', showNameSw));
    const btnBgSw = editorSwitch(c.compact_button_bg !== false);
    btnBgSw.addEventListener('change', e => this._set('compact_button_bg', e.target.checked));
    cardPanel.appendChild(editorRow('Button Background', btnBgSw));
    const btnBorderSw = editorSwitch(c.compact_button_border !== false);
    btnBorderSw.addEventListener('change', e => this._set('compact_button_border', e.target.checked));
    cardPanel.appendChild(editorRow('Button Border', btnBorderSw));
    this._renderQAEditor(cardPanel);
    editor.appendChild(cardPanel);

    const popoutPanel = editorPanel('Pop Out Settings', 'Controls the fullscreen remote overlay.');
    popoutPanel.appendChild(editorH3('Appearance'));
    const themeEl = editorSelect([['dark','Dark (blur)'],['light','Light (blur)']], c.overlay_theme || 'dark');
    themeEl.addEventListener('change', e => this._set('overlay_theme', e.target.value));
    popoutPanel.appendChild(editorField('Overlay Theme', themeEl));
    const showLabelsSw = editorSwitch(c.overlay_show_labels !== false);
    showLabelsSw.addEventListener('change', e => this._set('overlay_show_labels', e.target.checked));
    popoutPanel.appendChild(editorRow('Section Labels', showLabelsSw));
    const sectionBgSw = editorSwitch(c.overlay_section_bg !== false);
    sectionBgSw.addEventListener('change', e => this._set('overlay_section_bg', e.target.checked));
    popoutPanel.appendChild(editorRow('Section Background & Border', sectionBgSw));
    const overlayBtnBorderSw = editorSwitch(c.overlay_button_borders !== false);
    overlayBtnBorderSw.addEventListener('change', e => this._set('overlay_button_borders', e.target.checked));
    popoutPanel.appendChild(editorRow('Button Borders', overlayBtnBorderSw));
    const showNameOverlaySw = editorSwitch(c.show_name !== false);
    showNameOverlaySw.addEventListener('change', e => this._set('show_name', e.target.checked));
    popoutPanel.appendChild(editorRow('Show Header / Name', showNameOverlaySw));
    const gapEl = editorSelect(GAP_OPTIONS, String(c.overlay_gap ?? DEFAULT_GAP));
    gapEl.addEventListener('change', e => this._set('overlay_gap', e.target.value));
    popoutPanel.appendChild(editorField('Section Gap', gapEl));
    this._renderSectionEditor(popoutPanel);
    editor.appendChild(popoutPanel);

    root.appendChild(editor);
  }
}

customElements.define('easytv-card', EasyTVCard);
customElements.define('easytv-card-editor', EasyTVCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'easytv-card',
  name: 'EasyTV Card',
  description: `TV remote card v${CARD_VERSION}`,
  preview: true,
});

console.info(`%c EasyTV Card %c v${CARD_VERSION} `, 'background:var(--primary-color,#1976d2);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px', 'background:#333;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px');
