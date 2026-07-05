// EasyTV Card v0.7.5
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '0.7.5';

// ─── TV Presets ───────────────────────────────────────────────────────────────

const TV_PRESETS = {
  roku:       { up:'up', down:'down', left:'left', right:'right', select:'select', back:'back', home:'home', play:'play', pause:'pause', stop:'stop', forward:'forward', reverse:'reverse', volume_up:'volume_up', volume_down:'volume_down', volume_mute:'volume_mute', power:'power', info:'info', replay:'replay', channel_up:'channel_up', channel_down:'channel_down' },
  google_tv:  { up:'DPAD_UP', down:'DPAD_DOWN', left:'DPAD_LEFT', right:'DPAD_RIGHT', select:'DPAD_CENTER', back:'BACK', home:'HOME', play:'MEDIA_PLAY_PAUSE', pause:'MEDIA_PAUSE', stop:'MEDIA_STOP', forward:'MEDIA_NEXT', reverse:'MEDIA_PREVIOUS', volume_up:'VOLUME_UP', volume_down:'VOLUME_DOWN', volume_mute:'VOLUME_MUTE', power:'POWER', info:'INFO', source:'TV', channel_up:'CHANNEL_UP', channel_down:'CHANNEL_DOWN' },
  samsung:    { up:'KEY_UP', down:'KEY_DOWN', left:'KEY_LEFT', right:'KEY_RIGHT', select:'KEY_ENTER', back:'KEY_RETURN', home:'KEY_HOME', play:'KEY_PLAY', pause:'KEY_PAUSE', stop:'KEY_STOP', forward:'KEY_FF', reverse:'KEY_REWIND', volume_up:'KEY_VOLUP', volume_down:'KEY_VOLDOWN', volume_mute:'KEY_MUTE', power:'KEY_POWER', info:'KEY_INFO', source:'KEY_SOURCE', channel_up:'KEY_CHUP', channel_down:'KEY_CHDOWN' },
  generic:    { up:'up', down:'down', left:'left', right:'right', select:'select', back:'back', home:'home', play:'play', pause:'pause', stop:'stop', forward:'forward', reverse:'reverse', volume_up:'volume_up', volume_down:'volume_down', volume_mute:'volume_mute', channel_up:'channel_up', channel_down:'channel_down' },
};

// ─── Quick Action Definitions ─────────────────────────────────────────────────

const QUICK_ACTION_DEFS = {
  volume_down:   { icon: 'mdi:volume-minus', title: 'Vol −',  cmd: (c) => c.volume_down },
  volume_up:     { icon: 'mdi:volume-plus',  title: 'Vol +',   cmd: (c) => c.volume_up },
  volume_mute:   { icon: 'mdi:volume-off',   title: 'Mute',    cmd: (c) => c.volume_mute },
  play_pause:    { icon: 'mdi:play-pause',   title: 'Play/Pause', cmd: (c) => c.play },
  power:         { icon: 'mdi:power',        title: 'Power',   cmd: (c) => c.power || 'power' },
  back:          { icon: 'mdi:arrow-left',   title: 'Back',    cmd: (c) => c.back },
  home:          { icon: 'mdi:home-outline', title: 'Home',    cmd: (c) => c.home },
  source:        { icon: 'mdi:import',       title: 'Source',  cmd: (c) => c.source || 'input_av1' },
  forward:       { icon: 'mdi:fast-forward', title: 'Forward', cmd: (c) => c.forward },
  rewind:        { icon: 'mdi:rewind',       title: 'Rewind',  cmd: (c) => c.reverse },
  channel_up:    { icon: 'mdi:chevron-up',   title: 'Ch +',    cmd: (c) => c.channel_up },
  channel_down:  { icon: 'mdi:chevron-down', title: 'Ch −',    cmd: (c) => c.channel_down },
};

const DEFAULT_QUICK_SINGLE = ['volume_down', 'play_pause', 'volume_up'];
const DEFAULT_QUICK_DOUBLE = ['volume_down', 'play_pause', 'volume_up', 'power', 'home', 'back'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Compact Card Styles ──────────────────────────────────────────────────────

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
  .compact-double .d-bottom .qa-btn:hover  { background: var(--easytv-button-background-hover); }
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
  .icon-btn:hover  { background: var(--easytv-button-background-hover); }
  .icon-btn:active { background: var(--easytv-button-background-active); transform: scale(0.92); }
  .icon-btn ha-icon { --mdc-icon-size: 20px; }
  .no-btn-bg .icon-btn, .no-btn-bg .qa-btn   { background: transparent !important; }
  .no-btn-border .icon-btn, .no-btn-border .qa-btn { border-color: transparent !important; }
`;

// ─── Overlay Styles ───────────────────────────────────────────────────────────

const OVERLAY_STYLES = `
  #easytv-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999999;
    display: flex; flex-direction: column;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
    animation: etvFadeIn 0.2s ease;
    transform: translateZ(0); -webkit-transform: translateZ(0);
    background: rgba(10,10,18,0.6);
    backdrop-filter: blur(32px) saturate(1.4);
    -webkit-backdrop-filter: blur(32px) saturate(1.4);
    --etv-text:       #ffffff;
    --etv-muted:      rgba(255,255,255,0.55);
    --etv-btn-bg:     rgba(255,255,255,0.10);
    --etv-btn-hover:  rgba(255,255,255,0.18);
    --etv-btn-active: rgba(255,255,255,0.26);
    --etv-border:     rgba(255,255,255,0.13);
    --etv-accent:     #1976d2;
    --etv-radius-btn: 14px;
  }
  @keyframes etvFadeIn {
    from { opacity: 0; transform: translateY(16px) translateZ(0); }
    to   { opacity: 1; transform: translateY(0)    translateZ(0); }
  }

  /* ── Header ── */
  #easytv-overlay .overlay-header {
    display: flex; align-items: center; gap: 12px;
    padding: 18px 20px 14px; flex-shrink: 0;
    border-bottom: 1px solid var(--etv-border);
  }
  #easytv-overlay .overlay-header ha-icon { --mdc-icon-size: 24px; color: var(--etv-text); }
  #easytv-overlay .overlay-title   { flex: 1; font-size: 18px; font-weight: 700; color: var(--etv-text); }
  #easytv-overlay .overlay-version { font-size: 11px; color: var(--etv-muted); }
  #easytv-overlay .close-btn {
    cursor: pointer; width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    transition: background 0.15s; flex-shrink: 0; color: var(--etv-text);
  }
  #easytv-overlay .close-btn:hover  { background: var(--etv-btn-hover); }
  #easytv-overlay .close-btn:active { background: var(--etv-btn-active); }
  #easytv-overlay .close-btn ha-icon { --mdc-icon-size: 20px; }

  /* ── Body ── */
  #easytv-overlay .overlay-body {
    flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
    display: flex; flex-direction: column; align-items: center;
    padding: 24px 20px 32px; gap: 20px;
  }

  /* ── SVG D-pad ── */
  #easytv-overlay .dpad-wrap {
    position: relative;
    width: min(280px, calc(100vw - 40px));
    aspect-ratio: 1; flex-shrink: 0;
  }
  #easytv-overlay .dpad-wrap svg { width: 100%; height: 100%; display: block; overflow: visible; }
  #easytv-overlay .dpad-petal {
    fill: var(--etv-btn-bg); stroke: var(--etv-border); stroke-width: 1;
    cursor: pointer; transition: fill 0.15s; -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .dpad-petal:hover  { fill: var(--etv-btn-hover); }
  #easytv-overlay .dpad-petal:active { fill: var(--etv-btn-active); }
  #easytv-overlay .dpad-center {
    fill: var(--etv-btn-bg); stroke: var(--etv-border); stroke-width: 1;
    cursor: pointer; transition: fill 0.15s; -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .dpad-center:hover  { fill: var(--etv-btn-hover); }
  #easytv-overlay .dpad-center:active { fill: var(--etv-btn-active); }
  #easytv-overlay .dpad-arrow-icon { fill: rgba(255,255,255,0.7); pointer-events: none; }
  #easytv-overlay .dpad-ok { fill: rgba(255,255,255,0.7); font-size: 14px; font-weight: 600; pointer-events: none; dominant-baseline: middle; text-anchor: middle; }

  /* ── Utility row ── */
  #easytv-overlay .util-row { display: flex; gap: 12px; justify-content: center; width: 100%; }
  #easytv-overlay .util-btn {
    display: flex; flex-direction: column; align-items: center; gap: 5px;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    border-radius: var(--etv-radius-btn); padding: 12px 0; flex: 1; max-width: 80px;
    cursor: pointer; color: var(--etv-text); transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .util-btn:hover  { background: var(--etv-btn-hover); }
  #easytv-overlay .util-btn:active { background: var(--etv-btn-active); transform: scale(0.93); }
  #easytv-overlay .util-btn ha-icon { --mdc-icon-size: 22px; }
  #easytv-overlay .util-btn span { font-size: 11px; color: var(--etv-muted); }

  /* ── Playback row ── */
  #easytv-overlay .playback-row { display: flex; gap: 10px; justify-content: center; width: 100%; }
  #easytv-overlay .pb-btn {
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    border-radius: var(--etv-radius-btn); width: 56px; height: 56px;
    cursor: pointer; color: var(--etv-text); transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .pb-btn:hover  { background: var(--etv-btn-hover); }
  #easytv-overlay .pb-btn:active { background: var(--etv-btn-active); transform: scale(0.93); }
  #easytv-overlay .pb-btn ha-icon { --mdc-icon-size: 24px; }

  /* ── Pill controls row (vol | mute | ch) ── */
  #easytv-overlay .pill-row {
    display: flex; gap: 12px; justify-content: center;
    align-items: center; width: 100%;
  }
  /* Tall vertical pill — split top/bottom tap zones */
  #easytv-overlay .pill-wrap {
    display: flex; flex-direction: column;
    flex: 1; max-width: 100px;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    border-radius: 32px; overflow: hidden;
  }
  #easytv-overlay .pill-half {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; padding: 18px 0;
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  #easytv-overlay .pill-half:hover  { background: var(--etv-btn-hover); }
  #easytv-overlay .pill-half:active { background: var(--etv-btn-active); }
  #easytv-overlay .pill-half ha-icon { --mdc-icon-size: 24px; }
  #easytv-overlay .pill-half span {
    font-size: 10px; color: var(--etv-muted); letter-spacing: 0.03em;
  }
  #easytv-overlay .pill-divider {
    height: 1px; background: var(--etv-border); margin: 0 12px;
  }
  /* Centre mute button */
  #easytv-overlay .pill-mute {
    width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .pill-mute:hover  { background: var(--etv-btn-hover); }
  #easytv-overlay .pill-mute:active { background: var(--etv-btn-active); transform: scale(0.92); }
  #easytv-overlay .pill-mute ha-icon { --mdc-icon-size: 26px; }
`;

// ─── Editor Styles ────────────────────────────────────────────────────────────

const EDITOR_STYLES = `
  .editor {
    display: flex; flex-direction: column; gap: 16px; padding: 16px;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
  }
  .editor-panel {
    display: flex; flex-direction: column; gap: 12px; padding: 14px;
    border-radius: 14px;
    background: var(--ha-card-background, var(--card-background-color, rgba(255,255,255,0.03)));
    border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
  }
  .panel-title {
    font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em;
    color: var(--primary-color, #1976d2); margin-bottom: 2px;
  }
  .field-wrap { display: flex; flex-direction: column; gap: 4px; }
  .field-wrap label {
    font-size: 12px; color: var(--secondary-text-color, rgba(255,255,255,0.6)); padding-left: 2px;
  }
  ha-entity-picker { width: 100%; display: block; }
  .etv-input, .etv-select {
    width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(255,255,255,0.15));
    background: var(--secondary-background-color, #2a2a2a);
    color: var(--primary-text-color, #fff);
    font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.15s;
  }
  .etv-input:focus, .etv-select:focus { border-color: var(--primary-color, #1976d2); }
  .etv-select {
    appearance: none; -webkit-appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23888' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px;
  }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 4px 2px; gap: 12px; }
  .row label { font-size: 14px; color: var(--primary-text-color, #fff); }
  .version-badge {
    font-size: 11px; color: var(--secondary-text-color, rgba(255,255,255,0.5));
    text-align: center; padding-top: 4px;
  }
`;

// ─── SVG D-pad builder ────────────────────────────────────────────────────────

function buildSvgDpad(cmds, getHass, entityId) {
  const cx = 120, cy = 120, R = 112, r = 40, gapDeg = 5;
  const toRad = d => d * Math.PI / 180;

  function petalPath(mid) {
    const half = 45 - gapDeg / 2;
    const a1 = toRad(mid - half), a2 = toRad(mid + half);
    const x1 = cx+r*Math.cos(a1), y1 = cy+r*Math.sin(a1);
    const x2 = cx+R*Math.cos(a1), y2 = cy+R*Math.sin(a1);
    const x3 = cx+R*Math.cos(a2), y3 = cy+R*Math.sin(a2);
    const x4 = cx+r*Math.cos(a2), y4 = cy+r*Math.sin(a2);
    return `M${x1},${y1} L${x2},${y2} A${R},${R} 0 0,1 ${x3},${y3} L${x4},${y4} A${r},${r} 0 0,0 ${x1},${y1} Z`;
  }

  function arrowPoly(mid, dist) {
    const rad = toRad(mid), px = cx+dist*Math.cos(rad), py = cy+dist*Math.sin(rad), s = 9;
    const tx = px+s*Math.cos(rad), ty = py+s*Math.sin(rad);
    const b1x = px-s*Math.cos(rad)+s*Math.cos(rad+Math.PI/2), b1y = py-s*Math.sin(rad)+s*Math.sin(rad+Math.PI/2);
    const b2x = px-s*Math.cos(rad)+s*Math.cos(rad-Math.PI/2), b2y = py-s*Math.sin(rad)+s*Math.sin(rad-Math.PI/2);
    return `${tx},${ty} ${b1x},${b1y} ${b2x},${b2y}`;
  }

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 240 240');

  [{ key:'up', mid:270 }, { key:'right', mid:0 }, { key:'down', mid:90 }, { key:'left', mid:180 }]
    .forEach(p => {
      const dist = (r + R) / 2;
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', petalPath(p.mid));
      path.setAttribute('class', 'dpad-petal');
      path.addEventListener('click', () => sendCmd(getHass(), entityId, cmds[p.key]));
      svg.appendChild(path);
      const arrow = document.createElementNS(NS, 'polygon');
      arrow.setAttribute('points', arrowPoly(p.mid, dist));
      arrow.setAttribute('class', 'dpad-arrow-icon');
      svg.appendChild(arrow);
    });

  const circle = document.createElementNS(NS, 'circle');
  circle.setAttribute('cx', cx); circle.setAttribute('cy', cy); circle.setAttribute('r', r - 2);
  circle.setAttribute('class', 'dpad-center');
  circle.addEventListener('click', () => sendCmd(getHass(), entityId, cmds.select));
  svg.appendChild(circle);

  const okTxt = document.createElementNS(NS, 'text');
  okTxt.setAttribute('x', cx); okTxt.setAttribute('y', cy);
  okTxt.setAttribute('class', 'dpad-ok');
  okTxt.textContent = 'OK';
  svg.appendChild(okTxt);

  return svg;
}

// ─── Main Card ────────────────────────────────────────────────────────────────

class EasyTVCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._overlayOpen = false;
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
    this._overlayOpen = false;
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
      cfg.no_background        ? 'no-bg'        : '',
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
          <div class="c-actions">
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
    if (this._overlayOpen) return;
    this._overlayOpen = true;
    const cfg      = this._config;
    const stateObj = this._hass?.states[cfg.entity];
    const name     = cfg.name || stateObj?.attributes?.friendly_name || cfg.entity;
    const cmds     = buildCmds(cfg);
    const getHass  = () => this._hass;

    const overlay = document.createElement('div');
    overlay.id = 'easytv-overlay';
    const style = document.createElement('style');
    style.textContent = OVERLAY_STYLES;
    overlay.appendChild(style);

    // Header
    const header = document.createElement('div');
    header.className = 'overlay-header';
    header.innerHTML = `
      <ha-icon icon="mdi:television"></ha-icon>
      <span class="overlay-title">${name}</span>
      <span class="overlay-version">v${CARD_VERSION}</span>
      <div class="close-btn" id="etv-close"><ha-icon icon="mdi:close"></ha-icon></div>`;
    overlay.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'overlay-body';

    // D-pad
    const dpadWrap = document.createElement('div');
    dpadWrap.className = 'dpad-wrap';
    dpadWrap.appendChild(buildSvgDpad(cmds, getHass, cfg.entity));
    body.appendChild(dpadWrap);

    // Utility row: Back / Home / Info
    const utilRow = document.createElement('div');
    utilRow.className = 'util-row';
    [
      { key: 'back', icon: 'mdi:arrow-left',         label: 'Back' },
      { key: 'home', icon: 'mdi:home-outline',        label: 'Home' },
      { key: 'info', icon: 'mdi:information-outline', label: 'Info' },
    ].forEach(({ key, icon, label }) => {
      const btn = document.createElement('div');
      btn.className = 'util-btn';
      btn.innerHTML = `<ha-icon icon="${icon}"></ha-icon><span>${label}</span>`;
      btn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds[key]));
      utilRow.appendChild(btn);
    });
    body.appendChild(utilRow);

    // Playback row
    const pbRow = document.createElement('div');
    pbRow.className = 'playback-row';
    [
      { key: 'reverse', icon: 'mdi:rewind'      },
      { key: 'play',    icon: 'mdi:play-pause'  },
      { key: 'forward', icon: 'mdi:fast-forward' },
    ].forEach(({ key, icon }) => {
      const btn = document.createElement('div');
      btn.className = 'pb-btn';
      btn.innerHTML = `<ha-icon icon="${icon}"></ha-icon>`;
      btn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds[key]));
      pbRow.appendChild(btn);
    });
    body.appendChild(pbRow);

    // Pill controls: [Vol pill] [Mute] [Ch pill]
    const pillRow = document.createElement('div');
    pillRow.className = 'pill-row';

    // Volume pill (left)
    const volPill = document.createElement('div');
    volPill.className = 'pill-wrap';
    const volUp = document.createElement('div');
    volUp.className = 'pill-half';
    volUp.innerHTML = `<ha-icon icon="mdi:volume-plus"></ha-icon><span>VOL +</span>`;
    volUp.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.volume_up));
    const volDivider = document.createElement('div');
    volDivider.className = 'pill-divider';
    const volDown = document.createElement('div');
    volDown.className = 'pill-half';
    volDown.innerHTML = `<ha-icon icon="mdi:volume-minus"></ha-icon><span>VOL −</span>`;
    volDown.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.volume_down));
    volPill.appendChild(volUp);
    volPill.appendChild(volDivider);
    volPill.appendChild(volDown);
    pillRow.appendChild(volPill);

    // Mute button (centre)
    const muteBtn = document.createElement('div');
    muteBtn.className = 'pill-mute';
    muteBtn.innerHTML = `<ha-icon icon="mdi:volume-off"></ha-icon>`;
    muteBtn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.volume_mute));
    pillRow.appendChild(muteBtn);

    // Channel pill (right)
    const chPill = document.createElement('div');
    chPill.className = 'pill-wrap';
    const chUp = document.createElement('div');
    chUp.className = 'pill-half';
    chUp.innerHTML = `<ha-icon icon="mdi:chevron-up"></ha-icon><span>CH +</span>`;
    chUp.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.channel_up));
    const chDivider = document.createElement('div');
    chDivider.className = 'pill-divider';
    const chDown = document.createElement('div');
    chDown.className = 'pill-half';
    chDown.innerHTML = `<ha-icon icon="mdi:chevron-down"></ha-icon><span>CH −</span>`;
    chDown.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.channel_down));
    chPill.appendChild(chUp);
    chPill.appendChild(chDivider);
    chPill.appendChild(chDown);
    pillRow.appendChild(chPill);

    body.appendChild(pillRow);
    overlay.appendChild(body);
    document.body.appendChild(overlay);
    this._overlayEl = overlay;

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('#etv-close')) this._closeOverlay();
    });
  }

  _closeOverlay() {
    if (this._overlayEl) { this._overlayEl.remove(); this._overlayEl = null; }
    this._overlayOpen = false;
  }

  getCardSize() { return 1; }
}

// ─── Editor ───────────────────────────────────────────────────────────────────

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
        <div class="row">
          <label>No card background</label>
          <ha-switch data-key="no_background"></ha-switch>
        </div>
        <div class="row">
          <label>No button background</label>
          <ha-switch data-key="no_button_background"></ha-switch>
        </div>
        <div class="row">
          <label>No button border</label>
          <ha-switch data-key="no_button_border"></ha-switch>
        </div>
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

    const switchKeys = { no_background: !!cfg.no_background, no_button_background: !!cfg.no_button_background, no_button_border: !!cfg.no_button_border };
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

// ─── Register ─────────────────────────────────────────────────────────────────

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
  '%c EasyTV Card v0.7.5 ',
  'color:#fff;background:#1976d2;font-weight:bold;border-radius:4px;padding:2px 6px;'
);
