// EasyTV Card v0.8.0
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '0.8.0';

// ── TV Presets ────────────────────────────────────────────────────────────────

const TV_PRESETS = {
  roku:      { up:'up', down:'down', left:'left', right:'right', select:'select', back:'back', home:'home', play:'play', pause:'pause', stop:'stop', forward:'forward', reverse:'reverse', volume_up:'volume_up', volume_down:'volume_down', volume_mute:'volume_mute', power:'power', info:'info', replay:'replay', channel_up:'channel_up', channel_down:'channel_down' },
  google_tv: { up:'DPAD_UP', down:'DPAD_DOWN', left:'DPAD_LEFT', right:'DPAD_RIGHT', select:'DPAD_CENTER', back:'BACK', home:'HOME', play:'MEDIA_PLAY_PAUSE', pause:'MEDIA_PAUSE', stop:'MEDIA_STOP', forward:'MEDIA_NEXT', reverse:'MEDIA_PREVIOUS', volume_up:'VOLUME_UP', volume_down:'VOLUME_DOWN', volume_mute:'VOLUME_MUTE', power:'POWER', info:'INFO', source:'TV', channel_up:'CHANNEL_UP', channel_down:'CHANNEL_DOWN' },
  samsung:   { up:'KEY_UP', down:'KEY_DOWN', left:'KEY_LEFT', right:'KEY_RIGHT', select:'KEY_ENTER', back:'KEY_RETURN', home:'KEY_HOME', play:'KEY_PLAY', pause:'KEY_PAUSE', stop:'KEY_STOP', forward:'KEY_FF', reverse:'KEY_REWIND', volume_up:'KEY_VOLUP', volume_down:'KEY_VOLDOWN', volume_mute:'KEY_MUTE', power:'KEY_POWER', info:'KEY_INFO', source:'KEY_SOURCE', channel_up:'KEY_CHUP', channel_down:'KEY_CHDOWN' },
  generic:   { up:'up', down:'down', left:'left', right:'right', select:'select', back:'back', home:'home', play:'play', pause:'pause', stop:'stop', forward:'forward', reverse:'reverse', volume_up:'volume_up', volume_down:'volume_down', volume_mute:'volume_mute', power:'power', channel_up:'channel_up', channel_down:'channel_down' },
};

// ── Default Sources ───────────────────────────────────────────────────────────

const DEFAULT_SOURCES = [
  { name: 'Netflix', icon: 'mdi:netflix', command: 'netflix' },
  { name: 'YouTube', icon: 'mdi:youtube', command: 'youtube' },
];

const MDI_PATHS = {
  'mdi:netflix':         'M6 2l3.5 10L13 2h3v20h-3V12l-3.5 10L6 12v10H3V2h3z',
  'mdi:youtube':         'M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z',
  'mdi:television-play': 'M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-10-3.5l6-3.5-6-3.5v7z',
};

function sourceSvg(icon) {
  const path = MDI_PATHS[icon] || MDI_PATHS['mdi:television-play'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" style="display:block"><path fill="rgba(255,255,255,0.85)" d="${path}"/></svg>`;
}

// Inline SVG arrows for d-pad (no ha-icon needed)
const ARROW_SVG = {
  up:    `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="rgba(255,255,255,0.7)" d="M7 14l5-5 5 5z"/></svg>`,
  down:  `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="rgba(255,255,255,0.7)" d="M7 10l5 5 5-5z"/></svg>`,
  left:  `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="rgba(255,255,255,0.7)" d="M14 7l-5 5 5 5z"/></svg>`,
  right: `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="rgba(255,255,255,0.7)" d="M10 17l5-5-5-5z"/></svg>`,
};

// Inline SVGs for utility/playback/pill buttons
const BTN_SVG = {
  power:       `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42A6.92 6.92 0 0 1 19 12c0 3.87-3.13 7-7 7A7 7 0 0 1 5 12c0-2.28 1.09-4.3 2.58-5.42L6.17 5.17A8.93 8.93 0 0 0 3 12a9 9 0 0 0 18 0c0-2.74-1.23-5.18-3.17-6.83z"/></svg>`,
  close:       `<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
  tv:          `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></svg>`,
  back:        `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
  home:        `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  info:        `<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  rewind:      `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>`,
  play_pause:  `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
  forward:     `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>`,
  vol_up:      `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
  vol_down:    `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>`,
  mute:        `<svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`,
  ch_up:       `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7 14l5-5 5 5z"/></svg>`,
  ch_down:     `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>`,
};

// ── Quick Action Definitions ──────────────────────────────────────────────────

const QUICK_ACTION_DEFS = {
  volume_down:  { icon: 'mdi:volume-minus', title: 'Vol −',      cmd: (c) => c.volume_down },
  volume_up:    { icon: 'mdi:volume-plus',  title: 'Vol +',      cmd: (c) => c.volume_up },
  volume_mute:  { icon: 'mdi:volume-off',   title: 'Mute',       cmd: (c) => c.volume_mute },
  play_pause:   { icon: 'mdi:play-pause',   title: 'Play/Pause', cmd: (c) => c.play },
  power:        { icon: 'mdi:power',        title: 'Power',      cmd: (c) => c.power || 'power' },
  back:         { icon: 'mdi:arrow-left',   title: 'Back',       cmd: (c) => c.back },
  home:         { icon: 'mdi:home-outline', title: 'Home',       cmd: (c) => c.home },
  source:       { icon: 'mdi:import',       title: 'Source',     cmd: (c) => c.source || 'input_av1' },
  forward:      { icon: 'mdi:fast-forward', title: 'Forward',    cmd: (c) => c.forward },
  rewind:       { icon: 'mdi:rewind',       title: 'Rewind',     cmd: (c) => c.reverse },
  channel_up:   { icon: 'mdi:chevron-up',   title: 'Ch +',       cmd: (c) => c.channel_up },
  channel_down: { icon: 'mdi:chevron-down', title: 'Ch −',       cmd: (c) => c.channel_down },
};

const DEFAULT_QUICK_SINGLE = ['volume_down', 'play_pause', 'volume_up'];
const DEFAULT_QUICK_DOUBLE = ['volume_down', 'play_pause', 'volume_up', 'power', 'home', 'back'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveCmd(cfg, key) {
  if (cfg.commands && cfg.commands[key] !== undefined) return cfg.commands[key];
  const preset = TV_PRESETS[cfg.tv_type || 'generic'] || TV_PRESETS.generic;
  return preset[key] !== undefined ? preset[key] : key;
}

function buildCmds(cfg) {
  const keys = ['up','down','left','right','select','back','home','play','pause','stop',
                 'forward','reverse','volume_up','volume_down','volume_mute','power','info',
                 'source','replay','channel_up','channel_down'];
  const out = {};
  keys.forEach(k => { out[k] = resolveCmd(cfg, k); });
  return out;
}

function sendCmd(hass, entityId, cmd) {
  if (!cmd || !hass || !entityId) return;
  hass.callService('remote', 'send_command', { entity_id: entityId, command: cmd });
}

// ── Overlay Custom Element (self-contained shadow DOM) ────────────────────────

const OVERLAY_CSS = `
  :host {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    z-index: 999999; display: flex; flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px; color: #fff;
    background: rgba(10,10,18,0.65);
    backdrop-filter: blur(32px) saturate(1.4);
    -webkit-backdrop-filter: blur(32px) saturate(1.4);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── variables ── */
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  .btn-bg   { background: rgba(255,255,255,0.10); }
  .btn-bdr  { border: 1px solid rgba(255,255,255,0.13); }

  /* ── Header ── */
  .hdr {
    display: flex; align-items: center; gap: 12px;
    padding: 18px 20px 14px; flex-shrink: 0;
    border-bottom: 1px solid rgba(255,255,255,0.13);
  }
  .hdr-title { flex: 1; font-size: 18px; font-weight: 700; }
  .hdr-ver   { font-size: 11px; color: rgba(255,255,255,0.45); }
  .close-btn {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    cursor: pointer; transition: background 0.15s;
  }
  .close-btn:hover  { background: rgba(255,255,255,0.18); }
  .close-btn:active { background: rgba(255,255,255,0.28); }

  /* ── Body ── */
  .body {
    flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 20px 32px; gap: 20px;
  }

  /* ── Power ── */
  .power-row { display: flex; justify-content: flex-start; width: 100%; }
  .power-btn {
    width: 52px; height: 52px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: rgba(220,50,50,0.15); border: 1px solid rgba(220,50,50,0.4);
    cursor: pointer; color: rgba(255,110,110,1);
    transition: background 0.15s, transform 0.1s;
  }
  .power-btn:hover  { background: rgba(220,50,50,0.28); }
  .power-btn:active { background: rgba(220,50,50,0.42); transform: scale(0.92); }

  /* ── Sources ── */
  .sources-row {
    display: flex; gap: 10px; width: 100%;
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    padding-bottom: 2px; scrollbar-width: none;
  }
  .sources-row::-webkit-scrollbar { display: none; }
  .source-btn {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 16px; padding: 14px 20px; flex-shrink: 0; min-width: 72px;
    cursor: pointer; transition: background 0.15s, transform 0.1s;
  }
  .source-btn:hover  { background: rgba(255,255,255,0.18); }
  .source-btn:active { background: rgba(255,255,255,0.28); transform: scale(0.93); }
  .source-label { font-size: 12px; color: rgba(255,255,255,0.65); white-space: nowrap; }

  /* ── D-pad ── */
  .dpad-wrap {
    width: min(280px, calc(100vw - 40px)); aspect-ratio: 1; flex-shrink: 0;
    display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr 1fr;
    gap: 6px;
  }
  .dpad-btn {
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px; cursor: pointer; transition: background 0.15s, transform 0.1s;
  }
  .dpad-btn:hover  { background: rgba(255,255,255,0.18); }
  .dpad-btn:active { background: rgba(255,255,255,0.28); transform: scale(0.93); }
  .dpad-center {
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px; cursor: pointer; transition: background 0.15s, transform 0.1s;
    font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.8);
  }
  .dpad-center:hover  { background: rgba(255,255,255,0.18); }
  .dpad-center:active { background: rgba(255,255,255,0.28); transform: scale(0.93); }
  .dpad-empty { background: transparent; border: none; pointer-events: none; }

  /* ── Utility row ── */
  .util-row { display: flex; gap: 12px; justify-content: center; width: 100%; }
  .util-btn {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px; padding: 14px 0; flex: 1; max-width: 80px;
    cursor: pointer; color: #fff; transition: background 0.15s, transform 0.1s;
  }
  .util-btn:hover  { background: rgba(255,255,255,0.18); }
  .util-btn:active { background: rgba(255,255,255,0.28); transform: scale(0.93); }
  .util-label { font-size: 11px; color: rgba(255,255,255,0.55); }

  /* ── Playback ── */
  .playback-row { display: flex; gap: 10px; justify-content: center; width: 100%; }
  .pb-btn {
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 14px; width: 56px; height: 56px;
    cursor: pointer; color: #fff; transition: background 0.15s, transform 0.1s;
  }
  .pb-btn:hover  { background: rgba(255,255,255,0.18); }
  .pb-btn:active { background: rgba(255,255,255,0.28); transform: scale(0.93); }

  /* ── Pill controls ── */
  .pill-row { display: flex; gap: 12px; justify-content: center; align-items: center; width: 100%; }
  .pill-wrap {
    display: flex; flex-direction: column; flex: 1; max-width: 100px;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    border-radius: 32px; overflow: hidden;
  }
  .pill-half {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; padding: 18px 0; cursor: pointer; color: #fff;
    transition: background 0.15s; user-select: none;
  }
  .pill-half:hover  { background: rgba(255,255,255,0.18); }
  .pill-half:active { background: rgba(255,255,255,0.28); }
  .pill-label { font-size: 10px; color: rgba(255,255,255,0.55); letter-spacing: 0.03em; }
  .pill-divider { height: 1px; background: rgba(255,255,255,0.13); margin: 0 12px; }
  .pill-mute {
    width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.13);
    cursor: pointer; color: #fff; transition: background 0.15s, transform 0.1s;
  }
  .pill-mute:hover  { background: rgba(255,255,255,0.18); }
  .pill-mute:active { background: rgba(255,255,255,0.28); transform: scale(0.92); }
`;

class EasyTVOverlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  init(cfg, hass, name) {
    this._cfg  = cfg;
    this._hass = hass;
    this._name = name;
    this._build();
  }

  _send(cmd) { sendCmd(this._hass, this._cfg.entity, cmd); }

  _build() {
    const sr   = this.shadowRoot;
    const cfg  = this._cfg;
    const cmds = buildCmds(cfg);

    // Styles
    const style = document.createElement('style');
    style.textContent = OVERLAY_CSS;
    sr.appendChild(style);

    // Header
    const hdr = document.createElement('div');
    hdr.className = 'hdr';
    hdr.innerHTML = `${BTN_SVG.tv}<span class="hdr-title">${this._name}</span><span class="hdr-ver">v${CARD_VERSION}</span>`;
    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = BTN_SVG.close;
    closeBtn.addEventListener('click', () => this.remove());
    hdr.appendChild(closeBtn);
    sr.appendChild(hdr);

    // Body
    const body = document.createElement('div');
    body.className = 'body';
    sr.appendChild(body);

    // Power
    const powerRow = document.createElement('div');
    powerRow.className = 'power-row';
    const powerBtn = document.createElement('div');
    powerBtn.className = 'power-btn';
    powerBtn.innerHTML = BTN_SVG.power;
    powerBtn.addEventListener('click', () => this._send(cmds.power));
    powerRow.appendChild(powerBtn);
    body.appendChild(powerRow);

    // Sources
    const sources = cfg.sources !== undefined ? cfg.sources : DEFAULT_SOURCES;
    if (sources && sources.length > 0) {
      const row = document.createElement('div');
      row.className = 'sources-row';
      sources.forEach(src => {
        const btn = document.createElement('div');
        btn.className = 'source-btn';
        btn.innerHTML = `${sourceSvg(src.icon)}<span class="source-label">${src.name || ''}</span>`;
        btn.addEventListener('click', () => this._send(src.command));
        row.appendChild(btn);
      });
      body.appendChild(row);
    }

    // D-pad (grid layout — no SVG path math, no ha-icon)
    const dpad = document.createElement('div');
    dpad.className = 'dpad-wrap';
    const dpadCells = [
      { type: 'empty' }, { key: 'up',    svg: ARROW_SVG.up    }, { type: 'empty' },
      { key: 'left',   svg: ARROW_SVG.left  }, { type: 'center' }, { key: 'right', svg: ARROW_SVG.right },
      { type: 'empty' }, { key: 'down',  svg: ARROW_SVG.down  }, { type: 'empty' },
    ];
    dpadCells.forEach(cell => {
      const el = document.createElement('div');
      if (cell.type === 'empty') {
        el.className = 'dpad-empty';
      } else if (cell.type === 'center') {
        el.className = 'dpad-center';
        el.textContent = 'OK';
        el.addEventListener('click', () => this._send(cmds.select));
      } else {
        el.className = 'dpad-btn';
        el.innerHTML = cell.svg;
        el.addEventListener('click', () => this._send(cmds[cell.key]));
      }
      dpad.appendChild(el);
    });
    body.appendChild(dpad);

    // Utility row
    const utilRow = document.createElement('div');
    utilRow.className = 'util-row';
    [
      { key: 'back', svg: BTN_SVG.back, label: 'Back' },
      { key: 'home', svg: BTN_SVG.home, label: 'Home' },
      { key: 'info', svg: BTN_SVG.info, label: 'Info' },
    ].forEach(({ key, svg, label }) => {
      const btn = document.createElement('div');
      btn.className = 'util-btn';
      btn.innerHTML = `${svg}<span class="util-label">${label}</span>`;
      btn.addEventListener('click', () => this._send(cmds[key]));
      utilRow.appendChild(btn);
    });
    body.appendChild(utilRow);

    // Playback row
    const pbRow = document.createElement('div');
    pbRow.className = 'playback-row';
    [
      { key: 'reverse', svg: BTN_SVG.rewind     },
      { key: 'play',    svg: BTN_SVG.play_pause  },
      { key: 'forward', svg: BTN_SVG.forward      },
    ].forEach(({ key, svg }) => {
      const btn = document.createElement('div');
      btn.className = 'pb-btn';
      btn.innerHTML = svg;
      btn.addEventListener('click', () => this._send(cmds[key]));
      pbRow.appendChild(btn);
    });
    body.appendChild(pbRow);

    // Pill controls
    const pillRow = document.createElement('div');
    pillRow.className = 'pill-row';

    const mkPill = (topSvg, topLabel, topCmd, botSvg, botLabel, botCmd) => {
      const wrap = document.createElement('div');
      wrap.className = 'pill-wrap';
      const top = document.createElement('div'); top.className = 'pill-half';
      top.innerHTML = `${topSvg}<span class="pill-label">${topLabel}</span>`;
      top.addEventListener('click', () => this._send(topCmd));
      const div = document.createElement('div'); div.className = 'pill-divider';
      const bot = document.createElement('div'); bot.className = 'pill-half';
      bot.innerHTML = `${botSvg}<span class="pill-label">${botLabel}</span>`;
      bot.addEventListener('click', () => this._send(botCmd));
      wrap.appendChild(top); wrap.appendChild(div); wrap.appendChild(bot);
      return wrap;
    };

    pillRow.appendChild(mkPill(BTN_SVG.vol_up, 'VOL +', cmds.volume_up, BTN_SVG.vol_down, 'VOL −', cmds.volume_down));

    const muteBtn = document.createElement('div');
    muteBtn.className = 'pill-mute';
    muteBtn.innerHTML = BTN_SVG.mute;
    muteBtn.addEventListener('click', () => this._send(cmds.volume_mute));
    pillRow.appendChild(muteBtn);

    pillRow.appendChild(mkPill(BTN_SVG.ch_up, 'CH +', cmds.channel_up, BTN_SVG.ch_down, 'CH −', cmds.channel_down));

    body.appendChild(pillRow);

    // Close on backdrop tap
    sr.addEventListener('click', e => { if (e.target === sr.host) this.remove(); });
  }
}

customElements.define('easytv-overlay', EasyTVOverlay);

// ── Compact Card Styles ───────────────────────────────────────────────────────

const CARD_STYLES = `
  :host {
    display: block;
    --easytv-bg:         var(--ha-card-background, var(--card-background-color, #1c1c1c));
    --easytv-radius:     var(--ha-card-border-radius, 16px);
    --easytv-border:     1px solid var(--divider-color, rgba(255,255,255,0.12));
    --easytv-shadow:     var(--ha-card-box-shadow, none);
    --easytv-text:       var(--primary-text-color, #fff);
    --easytv-accent:     var(--primary-color, #1976d2);
    --easytv-btn-bg:     var(--secondary-background-color, #2a2a2a);
    --easytv-btn-radius: 50%;
    --easytv-btn-border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
    --easytv-btn-hover:  color-mix(in srgb, var(--easytv-btn-bg) 82%, white);
    --easytv-btn-active: color-mix(in srgb, var(--easytv-btn-bg) 72%, white);
  }
  ha-card { background: transparent !important; box-shadow: none !important; overflow: visible; }
  .compact-single {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: var(--easytv-radius);
    background: var(--easytv-bg); border: var(--easytv-border);
    box-shadow: var(--easytv-shadow); color: var(--easytv-text); gap: 10px;
  }
  .c-left  { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .c-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .compact-double {
    display: flex; flex-direction: column; padding: 14px 14px 12px;
    border-radius: var(--easytv-radius); background: var(--easytv-bg);
    border: var(--easytv-border); box-shadow: var(--easytv-shadow);
    color: var(--easytv-text); gap: 12px;
  }
  .d-top      { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .d-top-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .d-bottom   { display: flex; align-items: center; gap: 8px; }
  .qa-btn {
    flex: 1; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center;
    background: var(--easytv-btn-bg); border: var(--easytv-btn-border);
    color: var(--easytv-text); cursor: pointer; transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .qa-btn:hover  { background: var(--easytv-btn-hover); }
  .qa-btn:active { background: var(--easytv-btn-active); transform: scale(0.93); }
  .qa-btn ha-icon { --mdc-icon-size: 22px; }
  .tv-icon { --mdc-icon-size: 26px; color: var(--easytv-accent); }
  .tv-name { font-weight: 600; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .icon-btn {
    background: var(--easytv-btn-bg); border: var(--easytv-btn-border);
    cursor: pointer; color: var(--easytv-text); width: 40px; height: 40px;
    border-radius: var(--easytv-btn-radius); display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent; flex-shrink: 0;
  }
  .icon-btn:hover  { background: var(--easytv-btn-hover); }
  .icon-btn:active { background: var(--easytv-btn-active); transform: scale(0.92); }
  .icon-btn ha-icon { --mdc-icon-size: 20px; }
  .no-btn-bg .icon-btn, .no-btn-bg .qa-btn     { background: transparent !important; }
  .no-btn-border .icon-btn, .no-btn-border .qa-btn { border-color: transparent !important; }
`;

// ── Editor Styles ─────────────────────────────────────────────────────────────

const EDITOR_STYLES = `
  .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px; font-family: inherit; }
  .editor-panel {
    display: flex; flex-direction: column; gap: 12px; padding: 14px; border-radius: 14px;
    background: var(--ha-card-background, rgba(255,255,255,0.03));
    border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
  }
  .panel-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--primary-color, #1976d2); }
  .panel-hint  { font-size: 12px; color: var(--secondary-text-color, rgba(255,255,255,0.5)); line-height: 1.5; }
  .field-wrap  { display: flex; flex-direction: column; gap: 4px; }
  .field-wrap label { font-size: 12px; color: var(--secondary-text-color, rgba(255,255,255,0.6)); padding-left: 2px; }
  ha-entity-picker { width: 100%; display: block; }
  .etv-input, .etv-select {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
    background: var(--secondary-background-color, #2a2a2a);
    color: var(--primary-text-color, #fff); font-size: 14px; font-family: inherit; outline: none;
  }
  .etv-select {
    appearance: none; -webkit-appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23888' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
  }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 4px 2px; gap: 12px; }
  .row label { font-size: 14px; color: var(--primary-text-color, #fff); }
  .version-badge { font-size: 11px; color: var(--secondary-text-color, rgba(255,255,255,0.5)); text-align: center; padding-top: 4px; }
`;

// ── Main Card ─────────────────────────────────────────────────────────────────

class EasyTVCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    if (!this.shadowRoot.querySelector('ha-card')) this._initialRender();
    this._updateCompact();
  }

  setConfig(config) {
    if (!config.entity) throw new Error('EasyTV: entity is required');
    this._config = config;
  }

  static getConfigElement() { return document.createElement('easytv-card-editor'); }
  static getStubConfig()    { return { entity: '', name: '', tv_type: 'google_tv', card_type: 'single' }; }

  _initialRender() {
    const s = document.createElement('style');
    s.textContent = CARD_STYLES;
    this.shadowRoot.appendChild(s);
    const card = document.createElement('ha-card');
    this.shadowRoot.appendChild(card);
    card.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'open-overlay') { this._openOverlay(); return; }
      if (action === 'quick-action') {
        const cmds = buildCmds(this._config);
        const def  = QUICK_ACTION_DEFS[btn.dataset.qa];
        if (def) sendCmd(this._hass, this._config.entity, def.cmd(cmds));
      }
    });
    this._updateCompact();
  }

  _updateCompact() {
    const card = this.shadowRoot.querySelector('ha-card');
    if (!card) return;
    const cfg      = this._config;
    const stateObj = this._hass?.states[cfg.entity];
    const name     = cfg.name || stateObj?.attributes?.friendly_name || cfg.entity;
    const cardType = cfg.card_type || 'single';
    const cls = [
      cfg.no_button_background ? 'no-btn-bg'    : '',
      cfg.no_button_border     ? 'no-btn-border' : '',
    ].filter(Boolean).join(' ');

    if (cardType === 'single') {
      const qaKeys = cfg.quick_actions || DEFAULT_QUICK_SINGLE;
      const qaBtns = qaKeys.map(qa => {
        const def = QUICK_ACTION_DEFS[qa];
        return def ? `<button class="icon-btn" data-action="quick-action" data-qa="${qa}" title="${def.title}"><ha-icon icon="${def.icon}"></ha-icon></button>` : '';
      }).join('');
      card.innerHTML = `
        <div class="compact-single ${cls}">
          <div class="c-left">
            <ha-icon class="tv-icon" icon="mdi:television"></ha-icon>
            <span class="tv-name">${name}</span>
          </div>
          <div class="c-right">
            ${qaBtns}
            <button class="icon-btn" data-action="open-overlay" title="Open remote"><ha-icon icon="mdi:remote"></ha-icon></button>
          </div>
        </div>`;
    } else {
      const qaKeys = cfg.quick_actions || DEFAULT_QUICK_DOUBLE;
      const qaBtns = qaKeys.map(qa => {
        const def = QUICK_ACTION_DEFS[qa];
        return def ? `<button class="qa-btn" data-action="quick-action" data-qa="${qa}" title="${def.title}"><ha-icon icon="${def.icon}"></ha-icon></button>` : '';
      }).join('');
      card.innerHTML = `
        <div class="compact-double ${cls}">
          <div class="d-top">
            <div class="d-top-left">
              <ha-icon class="tv-icon" icon="mdi:television"></ha-icon>
              <span class="tv-name">${name}</span>
            </div>
            <button class="icon-btn" data-action="open-overlay" title="Open remote"><ha-icon icon="mdi:remote"></ha-icon></button>
          </div>
          <div class="d-bottom">${qaBtns}</div>
        </div>`;
    }
  }

  _openOverlay() {
    if (document.querySelector('easytv-overlay')) return;
    const cfg      = this._config;
    const stateObj = this._hass?.states[cfg.entity];
    const name     = cfg.name || stateObj?.attributes?.friendly_name || cfg.entity;
    const overlay  = document.createElement('easytv-overlay');
    document.body.appendChild(overlay);
    overlay.init(cfg, this._hass, name);
  }

  getCardSize() { return 1; }
}

// ── Editor ────────────────────────────────────────────────────────────────────

class EasyTVCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._config = {};
  }

  set hass(hass) {
    this._hass = hass;
    this.shadowRoot.querySelectorAll('ha-entity-picker').forEach(p => { p.hass = hass; });
  }

  setConfig(config) {
    this._config = { ...config };
    this._render();
  }

  _render() {
    const cfg = this._config;
    const sr  = this.shadowRoot;
    sr.innerHTML = '';

    const style = document.createElement('style');
    style.textContent = EDITOR_STYLES;
    sr.appendChild(style);

    const editor = document.createElement('div');
    editor.className = 'editor';
    editor.innerHTML = `
      <div class="editor-panel">
        <div class="panel-title">Remote Entity</div>
        <div class="field-wrap">
          <label>Remote entity (required)</label>
          <ha-entity-picker data-key="entity" allow-custom-entity></ha-entity-picker>
        </div>
        <div class="field-wrap">
          <label>Display name (optional)</label>
          <input class="etv-input" data-key="name" value="${cfg.name || ''}" placeholder="Living Room TV">
        </div>
      </div>
      <div class="editor-panel">
        <div class="panel-title">Card</div>
        <div class="field-wrap">
          <label>TV preset</label>
          <select class="etv-select" data-key="tv_type">
            ${['google_tv','roku','samsung','generic'].map(t =>
              `<option value="${t}"${(cfg.tv_type || 'google_tv') === t ? ' selected' : ''}>${t.replace('_',' ').replace(/\b\w/g, c => c.toUpperCase())}</option>`
            ).join('')}
          </select>
        </div>
        <div class="field-wrap">
          <label>Card style</label>
          <select class="etv-select" data-key="card_type">
            <option value="single"${(cfg.card_type || 'single') === 'single' ? ' selected' : ''}>Single row</option>
            <option value="double"${cfg.card_type === 'double' ? ' selected' : ''}>Double row</option>
          </select>
        </div>
        <div class="row"><label>No button background</label><ha-switch data-key="no_button_background"></ha-switch></div>
        <div class="row"><label>No button border</label><ha-switch data-key="no_button_border"></ha-switch></div>
      </div>
      <div class="editor-panel">
        <div class="panel-title">Source Shortcuts</div>
        <p class="panel-hint">
          Defaults: Netflix &amp; YouTube (work on Google TV &amp; Roku).<br>
          Override with <code>sources:</code> in YAML. Samsung users: use commands like <code>KEY_APP_NETFLIX</code>.
        </p>
      </div>
      <div class="version-badge">EasyTV Card v${CARD_VERSION}</div>
    `;
    sr.appendChild(editor);

    editor.querySelectorAll('ha-entity-picker[data-key]').forEach(picker => {
      picker.hass  = this._hass;
      picker.value = cfg[picker.dataset.key] || '';
      picker.addEventListener('value-changed', e => {
        this._config = { ...this._config, [picker.dataset.key]: e.detail.value || undefined };
        this._fireChange();
      });
    });

    const switchKeys = { no_button_background: !!cfg.no_button_background, no_button_border: !!cfg.no_button_border };
    editor.querySelectorAll('ha-switch[data-key]').forEach(sw => {
      sw.checked = !!switchKeys[sw.dataset.key];
      sw.addEventListener('change', () => {
        this._config = { ...this._config, [sw.dataset.key]: sw.checked };
        this._fireChange();
      });
    });

    editor.querySelectorAll('.etv-input[data-key], .etv-select[data-key]').forEach(el => {
      el.addEventListener('change', () => {
        this._config = { ...this._config, [el.dataset.key]: el.value || undefined };
        this._fireChange();
      });
    });
  }

  _fireChange() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }
}

// ── Register ──────────────────────────────────────────────────────────────────

customElements.define('easytv-card',        EasyTVCard);
customElements.define('easytv-card-editor', EasyTVCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'easytv-card',
  name: 'EasyTV Card',
  description: 'Sleek TV remote card for Home Assistant',
  preview: false,
});

console.info(
  '%c EasyTV Card v0.8.0 ',
  'color:#fff;background:#1976d2;font-weight:bold;border-radius:4px;padding:2px 6px;'
);
