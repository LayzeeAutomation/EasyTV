// EasyTV Card v0.3.3
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '0.3.3';

const TV_PRESETS = {
  roku: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute',power:'power',info:'info',replay:'replay' },
  google_tv: { up:'DPAD_UP',down:'DPAD_DOWN',left:'DPAD_LEFT',right:'DPAD_RIGHT',select:'DPAD_CENTER',back:'BACK',home:'HOME',play:'MEDIA_PLAY_PAUSE',pause:'MEDIA_PAUSE',stop:'MEDIA_STOP',forward:'MEDIA_NEXT',reverse:'MEDIA_PREVIOUS',volume_up:'VOLUME_UP',volume_down:'VOLUME_DOWN',volume_mute:'VOLUME_MUTE',power:'POWER',info:'INFO',source:'TV' },
  samsung: { up:'KEY_UP',down:'KEY_DOWN',left:'KEY_LEFT',right:'KEY_RIGHT',select:'KEY_ENTER',back:'KEY_RETURN',home:'KEY_HOME',play:'KEY_PLAY',pause:'KEY_PAUSE',stop:'KEY_STOP',forward:'KEY_FF',reverse:'KEY_REWIND',volume_up:'KEY_VOLUP',volume_down:'KEY_VOLDOWN',volume_mute:'KEY_MUTE',power:'KEY_POWER',info:'KEY_INFO',source:'KEY_SOURCE' },
  generic: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute' },
};

const DEFAULT_SECTIONS = { dpad:true, playback:true, volume:true, app_selector:true, power:true, utility:true, numpad:false, app_shortcuts:true };

const APP_SHORTCUTS = [
  { name:'Netflix', cmd:'Netflix', color:'#E50914', icon:'mdi:netflix' },
  { name:'YouTube', cmd:'YouTube', color:'#FF0000', icon:'mdi:youtube' },
  { name:'Disney+', cmd:'Disney Plus', color:'#113CCF', icon:'mdi:disney-plus' },
  { name:'Prime', cmd:'Amazon Video', color:'#00A8E0', icon:'mdi:amazon' },
  { name:'Spotify', cmd:'Spotify', color:'#1DB954', icon:'mdi:spotify' },
  { name:'Plex', cmd:'Plex', color:'#E5A00D', icon:'mdi:plex' },
  { name:'Apple TV', cmd:'Apple TV', color:'#888888', icon:'mdi:apple' },
  { name:'Hulu', cmd:'Hulu', color:'#1CE783', icon:'mdi:television-play' },
  { name:'HBO Max', cmd:'HBO Max', color:'#5822B4', icon:'mdi:television-classic' },
  { name:'Peacock', cmd:'Peacock TV', color:'#FF6B35', icon:'mdi:bird' },
  { name:'Tubi', cmd:'Tubi', color:'#FA4B00', icon:'mdi:television' },
  { name:'Twitch', cmd:'Twitch', color:'#9146FF', icon:'mdi:twitch' },
];

const OVERLAY_THEMES = {
  dark: {
    background: 'rgba(10, 10, 18, 0.88)',
    backdropFilter: 'blur(28px)',
    sectionBackground: 'rgba(255, 255, 255, 0.06)',
    buttonBackground: 'rgba(255, 255, 255, 0.09)',
    buttonHover: 'rgba(255, 255, 255, 0.16)',
    buttonActive: 'rgba(255, 255, 255, 0.24)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    textColor: '#ffffff',
    mutedColor: 'rgba(255, 255, 255, 0.55)',
    headerBorder: 'rgba(255, 255, 255, 0.10)',
    dropdownArrow: 'ffffff',
  },
  light: {
    background: 'rgba(240, 240, 245, 0.88)',
    backdropFilter: 'blur(28px)',
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
    --easytv-section-background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
  }
  ha-card {
    background: transparent !important;
    box-shadow: none !important;
    overflow: visible;
  }
  .compact {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: 16px;
    background: var(--easytv-card-background);
    border: 1px solid var(--easytv-border-color);
    color: var(--easytv-text-color);
  }
  .compact-left { display: flex; align-items: center; gap: 10px; }
  .tv-icon { --mdc-icon-size: 26px; color: var(--easytv-accent-color); }
  .tv-name { font-weight: 600; font-size: 15px; color: var(--easytv-text-color); }
  .compact-actions { display: flex; align-items: center; gap: 4px; }
  .icon-btn {
    background: var(--easytv-button-background);
    border: 1px solid var(--easytv-border-color);
    cursor: pointer; color: var(--easytv-text-color);
    width: 44px; height: 44px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  .icon-btn:hover { background: var(--easytv-button-background-hover); }
  .icon-btn:active { background: var(--easytv-button-background-active); transform: scale(0.92); }
  .icon-btn ha-icon { --mdc-icon-size: 22px; }
  .icon-btn.compact-action { width: 40px; height: 40px; }
  .icon-btn.compact-action ha-icon { --mdc-icon-size: 20px; }
`;

const OVERLAY_STYLES = `
  #easytv-overlay {
    position: fixed; top:0; left:0; right:0; bottom:0; z-index:999999;
    display: flex; flex-direction: column; overflow-y: auto;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
    animation: etvFadeIn 0.2s ease;
  }
  @keyframes etvFadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

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

  #easytv-overlay .overlay-body {
    display: flex; flex-direction: column; align-items: stretch;
    gap: 8px; padding: 16px 16px 48px; flex:1; width: 100%; box-sizing: border-box;
  }

  #easytv-overlay .etv-section {
    display: flex; flex-direction: column; gap: 6px;
    border-radius: 16px;
    padding: 12px; width: 100%; box-sizing: border-box;
  }
  #easytv-overlay .section-label {
    font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;
    padding: 0 2px 4px;
  }

  #easytv-overlay .btn-row {
    display: flex; align-items: center; gap: 8px; width: 100%;
  }
  #easytv-overlay .btn-row .icon-btn { flex: 1; border-radius: 14px; height: 56px; width: auto; }
  #easytv-overlay .btn-row .icon-btn ha-icon { --mdc-icon-size: 26px; }

  #easytv-overlay .dpad-center-row .icon-btn.select-btn { flex: 1.4; height: 64px; }
  #easytv-overlay .dpad-center-row .icon-btn.select-btn ha-icon { --mdc-icon-size: 30px; }
  #easytv-overlay .dpad-up-row .icon-btn,
  #easytv-overlay .dpad-down-row .icon-btn { height: 52px; }

  #easytv-overlay .icon-btn {
    cursor:pointer; border-radius: 50%; width:62px; height:62px;
    display:flex; align-items:center; justify-content:center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color:transparent;
    padding:0;
  }
  #easytv-overlay .icon-btn ha-icon { --mdc-icon-size: 26px; }

  #easytv-overlay .numpad-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%;
  }
  #easytv-overlay .numpad-grid .icon-btn {
    border-radius: 14px; width: auto; height: 52px;
    font-size: 18px; font-weight: 600;
  }
  #easytv-overlay .numpad-grid .icon-btn:active { transform: scale(0.93); }

  #easytv-overlay .app-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: 100%;
  }
  #easytv-overlay .app-btn {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; padding: 10px 4px; border-radius: 14px;
    cursor: pointer; transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
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
  .editor { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
  h3 { margin: 8px 0 4px; font-size: 13px; font-weight: 600; color: var(--primary-color); text-transform: uppercase; letter-spacing: 0.05em; }
  ha-textfield, ha-entity-picker, ha-select { width: 100%; }
  ha-formfield { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
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
    const theme = this._config.overlay_theme || 'dark';
    const t = OVERLAY_THEMES[theme] || OVERLAY_THEMES.dark;

    overlay.style.background = t.background;
    overlay.style.backdropFilter = t.backdropFilter;
    overlay.style.webkitBackdropFilter = t.backdropFilter;
    overlay.style.color = t.textColor;

    const dynId = 'easytv-overlay-theme-dynamic';
    let dynStyle = document.getElementById(dynId);
    if (!dynStyle) {
      dynStyle = document.createElement('style');
      dynStyle.id = dynId;
      document.head.appendChild(dynStyle);
    }
    dynStyle.textContent = `
      #easytv-overlay .overlay-header {
        border-bottom: 1px solid ${t.headerBorder};
        color: ${t.textColor};
      }
      #easytv-overlay .overlay-header ha-icon { color: var(--primary-color, #1976d2); }
      #easytv-overlay .overlay-title { color: ${t.textColor}; }
      #easytv-overlay .close-btn {
        background: ${t.buttonBackground};
        border: 1px solid ${t.borderColor};
        color: ${t.textColor};
      }
      #easytv-overlay .close-btn:hover { background: ${t.buttonHover}; }
      #easytv-overlay .etv-section {
        background: ${t.sectionBackground};
        border: 1px solid ${t.borderColor};
      }
      #easytv-overlay .section-label { color: ${t.mutedColor}; }
      #easytv-overlay .icon-btn {
        background: ${t.buttonBackground};
        border: 1px solid ${t.borderColor};
        color: ${t.textColor};
      }
      #easytv-overlay .icon-btn:hover { background: ${t.buttonHover}; }
      #easytv-overlay .icon-btn:active { background: ${t.buttonActive}; transform: scale(0.91); }
      #easytv-overlay .dpad-center-row .icon-btn.select-btn {
        background: color-mix(in srgb, var(--primary-color, #1976d2) 22%, ${t.buttonBackground});
        border: 2px solid var(--primary-color, #1976d2);
      }
      #easytv-overlay .numpad-grid .icon-btn { color: ${t.textColor}; }
      #easytv-overlay .app-btn {
        background: ${t.buttonBackground};
        border: 1px solid ${t.borderColor};
        color: ${t.textColor};
      }
      #easytv-overlay .app-btn:hover { background: ${t.buttonHover}; }
      #easytv-overlay .app-btn span { color: ${t.mutedColor}; }
      #easytv-overlay .app-select-native {
        background-color: ${t.buttonBackground};
        border: 1px solid ${t.borderColor};
        color: ${t.textColor};
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23${t.dropdownArrow}' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
      }
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
    this._config = {
      tv_preset:'roku',
      expand_mode:'inline',
      show_name:true,
      overlay_theme:'dark',
      sections:{ ...DEFAULT_SECTIONS },
      ...config,
      sections:{ ...DEFAULT_SECTIONS, ...(config.sections||{}) },
    };
    this._render();
  }

  static getConfigElement() { return document.createElement('easytv-card-editor'); }
  static getStubConfig() {
    return { name:'My TV', remote_entity:'remote.my_tv', tv_preset:'roku', expand_mode:'inline', overlay_theme:'dark', sections:{ ...DEFAULT_SECTIONS } };
  }

  get _commands() {
    const base = TV_PRESETS[this._config.tv_preset] || TV_PRESETS.generic;
    return { ...base, ...(this._config.command_overrides||{}) };
  }

  _send(command) {
    if (!this._hass) return;
    this._hass.callService('remote', 'send_command', { entity_id: this._config.remote_entity, command });
  }

  _toggleExpanded() {
    const { expand_mode, popup_hash } = this._config;
    if (expand_mode === 'popup' && popup_hash && popup_hash.trim()) {
      history.pushState(null, '', popup_hash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      this._expanded = !this._expanded;
      if (this._expanded) this._mountOverlay(); else this._removeOverlay();
    }
  }

  _buildAppSelector() {
    const { app_select_entity } = this._config;
    if (!app_select_entity || !this._hass) return null;
    const state = this._hass.states[app_select_entity];
    if (!state) return null;
    const wrap = sectionWrap('App');
    const sel = document.createElement('select');
    sel.className = 'app-select-native';
    (state.attributes.options||[]).forEach(opt => {
      const o = document.createElement('option');
      o.value = opt; o.textContent = opt;
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
    const upRow = document.createElement('div'); upRow.className = 'btn-row dpad-up-row';
    const upBtn = iconBtn('mdi:arrow-up-bold', () => this._send(c.up), 'Up');
    upBtn.style.flex = '1'; upBtn.style.borderRadius = '14px'; upBtn.style.height = '52px';
    upRow.appendChild(upBtn);

    const midRow = document.createElement('div'); midRow.className = 'btn-row dpad-center-row';
    const leftBtn = iconBtn('mdi:arrow-left-bold', () => this._send(c.left), 'Left');
    const selBtn = iconBtn('mdi:keyboard-return', () => this._send(c.select), 'Select', 'select-btn');
    const rightBtn = iconBtn('mdi:arrow-right-bold', () => this._send(c.right), 'Right');
    [leftBtn, selBtn, rightBtn].forEach(b => { b.style.flex='1'; b.style.borderRadius='14px'; b.style.height='64px'; });
    selBtn.style.flex = '1.4';
    midRow.appendChild(leftBtn); midRow.appendChild(selBtn); midRow.appendChild(rightBtn);

    const botRow = document.createElement('div'); botRow.className = 'btn-row dpad-down-row';
    const backBtn = iconBtn('mdi:arrow-left', () => this._send(c.back), 'Back');
    const downBtn = iconBtn('mdi:arrow-down-bold', () => this._send(c.down), 'Down');
    const homeBtn = iconBtn('mdi:home-outline', () => this._send(c.home), 'Home');
    [backBtn, downBtn, homeBtn].forEach(b => { b.style.flex='1'; b.style.borderRadius='14px'; b.style.height='52px'; });
    botRow.appendChild(backBtn); botRow.appendChild(downBtn); botRow.appendChild(homeBtn);

    wrap.appendChild(upRow); wrap.appendChild(midRow); wrap.appendChild(botRow);
    return wrap;
  }

  _buildUtility() {
    const c = this._commands;
    const wrap = sectionWrap('Controls');
    const row = document.createElement('div'); row.className = 'btn-row';
    const btns = [
      iconBtn('mdi:power', () => this._send(c.power||'power'), 'Power'),
      iconBtn('mdi:import', () => this._send(c.source||'input_av1'), 'Source'),
      iconBtn('mdi:menu', () => this._send(c.menu||'menu'), 'Menu'),
      iconBtn('mdi:cog-outline', () => this._send(c.settings||'settings'), 'Settings'),
      iconBtn('mdi:information-outline', () => this._send(c.info||'info'), 'Info'),
    ];
    btns.forEach(b => { b.style.flex='1'; b.style.borderRadius='14px'; b.style.height='52px'; row.appendChild(b); });
    wrap.appendChild(row);
    return wrap;
  }

  _buildPlayback() {
    const c = this._commands;
    const wrap = sectionWrap('Playback');
    const row = document.createElement('div'); row.className = 'btn-row';
    const btns = [
      iconBtn('mdi:skip-previous', () => this._send(c.reverse), 'Prev'),
      iconBtn('mdi:rewind', () => this._send(c.reverse), 'Rewind'),
      iconBtn('mdi:play-pause', () => this._send(c.play), 'Play/Pause'),
      iconBtn('mdi:fast-forward', () => this._send(c.forward), 'Forward'),
      iconBtn('mdi:skip-next', () => this._send(c.forward), 'Next'),
    ];
    btns.forEach(b => { b.style.flex='1'; b.style.borderRadius='14px'; b.style.height='52px'; row.appendChild(b); });
    wrap.appendChild(row);
    return wrap;
  }

  _buildVolume() {
    const c = this._commands;
    const wrap = sectionWrap('Volume');
    const row = document.createElement('div'); row.className = 'btn-row';
    const muteBtn = iconBtn('mdi:volume-off', () => this._send(c.volume_mute), 'Mute');
    const volDownBtn = iconBtn('mdi:volume-medium', () => this._send(c.volume_down), 'Vol -');
    const volUpBtn = iconBtn('mdi:volume-high', () => this._send(c.volume_up), 'Vol +');
    [muteBtn, volDownBtn, volUpBtn].forEach(b => { b.style.flex='1'; b.style.borderRadius='14px'; b.style.height='52px'; row.appendChild(b); });
    wrap.appendChild(row);
    return wrap;
  }

  _buildNumpad() {
    const wrap = sectionWrap('Channel / Number');
    const grid = document.createElement('div'); grid.className = 'numpad-grid';
    const keys = ['1','2','3','4','5','6','7','8','9','*','0','#'];
    keys.forEach(k => {
      const btn = numBtn(k, () => this._send(k));
      btn.style.borderRadius = '14px'; btn.style.height = '52px'; btn.style.width = 'auto';
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  _buildAppShortcuts() {
    const customApps = this._config.app_shortcuts;
    const apps = (customApps && customApps.length) ? customApps : APP_SHORTCUTS;
    const wrap = sectionWrap('Apps');
    const grid = document.createElement('div'); grid.className = 'app-grid';
    apps.forEach(app => {
      const btn = document.createElement('button'); btn.className = 'app-btn';
      btn.appendChild(mkIcon(app.icon || 'mdi:television-play', app.color || null));
      const lbl = document.createElement('span'); lbl.textContent = app.name; btn.appendChild(lbl);
      btn.addEventListener('click', (e) => { e.stopPropagation(); this._send(app.cmd); });
      grid.appendChild(btn);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  _mountOverlay() {
    this._removeOverlay();
    this._injectGlobalStyle();

    const { name, icon: ico, sections } = this._config;
    const overlay = document.createElement('div');
    overlay.id = 'easytv-overlay';
    this._applyOverlayTheme(overlay);

    const header = document.createElement('div'); header.className = 'overlay-header';
    header.appendChild(mkIcon(ico || 'mdi:television'));
    const title = document.createElement('span'); title.className = 'overlay-title'; title.textContent = name || 'My TV';
    header.appendChild(title);
    const closeBtn = document.createElement('button'); closeBtn.className = 'close-btn';
    closeBtn.appendChild(mkIcon('mdi:close'));
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this._expanded = false; this._removeOverlay(); });
    header.appendChild(closeBtn);
    overlay.appendChild(header);

    const body = document.createElement('div'); body.className = 'overlay-body';
    if (sections.app_selector) { const a = this._buildAppSelector(); if (a) body.appendChild(a); }
    if (sections.utility !== false) body.appendChild(this._buildUtility());
    if (sections.dpad) body.appendChild(this._buildDpad());
    if (sections.playback) body.appendChild(this._buildPlayback());
    if (sections.volume) body.appendChild(this._buildVolume());
    if (sections.app_shortcuts) body.appendChild(this._buildAppShortcuts());
    if (sections.numpad) body.appendChild(this._buildNumpad());
    overlay.appendChild(body);

    if (this._config.card_mod?.style) {
      const styleEl = document.createElement('style');
      styleEl.id = 'easytv-overlay-card-mod';
      styleEl.textContent = this._config.card_mod.style;
      document.body.appendChild(styleEl);
      this._overlayStyleEl = styleEl;
    }

    document.body.appendChild(overlay);
    this._overlayEl = overlay;
  }

  _compactView() {
    const { name, icon: ico, sections, show_name } = this._config;
    const c = this._commands;
    const wrap = document.createElement('div'); wrap.className = 'compact';
    const left = document.createElement('div'); left.className = 'compact-left';
    const tvIco = mkIcon(ico || 'mdi:television'); tvIco.className = 'tv-icon'; left.appendChild(tvIco);
    if (show_name !== false) {
      const s = document.createElement('span'); s.className = 'tv-name'; s.textContent = name || 'My TV'; left.appendChild(s);
    }
    const actions = document.createElement('div'); actions.className = 'compact-actions';
    if (sections.volume) actions.appendChild(iconBtn('mdi:volume-minus', () => this._send(c.volume_down), 'Vol -', 'compact-action'));
    if (sections.playback) actions.appendChild(iconBtn('mdi:play-pause', () => this._send(c.play), 'Play/Pause', 'compact-action'));
    if (sections.volume) actions.appendChild(iconBtn('mdi:volume-plus', () => this._send(c.volume_up), 'Vol +', 'compact-action'));
    actions.appendChild(iconBtn('mdi:remote', () => this._toggleExpanded(), 'Open Remote', 'compact-action'));
    wrap.appendChild(left); wrap.appendChild(actions);
    return wrap;
  }

  _render() {
    if (!this._config) return;
    const root = this.shadowRoot; root.innerHTML = '';
    const style = document.createElement('style'); style.textContent = CARD_STYLES; root.appendChild(style);
    if (this._config.card_mod?.style) {
      const modStyle = document.createElement('style');
      modStyle.textContent = this._config.card_mod.style;
      root.appendChild(modStyle);
    }
    const card = document.createElement('ha-card');
    card.appendChild(this._compactView());
    root.appendChild(card);
  }

  getCardSize() { return this._config?.compact_rows || 2; }
}

class EasyTVCardEditor extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }
  set hass(hass) { this._hass = hass; }
  setConfig(config) { this._config = config; this._render(); }
  _fire(config) { this.dispatchEvent(new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true })); }
  _set(key, value) { this._fire({ ...this._config, [key]: value }); }
  _setSection(key, value) { this._fire({ ...this._config, sections: { ...this._config.sections, [key]: value } }); }

  _render() {
    if (!this._config) return;
    const c = this._config; const s = c.sections || {};
    const root = this.shadowRoot;

    root.innerHTML = `
      <style>${EDITOR_STYLES}</style>
      <div class="editor">
        <h3>General</h3>
        <ha-textfield id="etv-name" label="Card Title (e.g. My TV)"></ha-textfield>
        <ha-textfield id="etv-icon" label="Icon (e.g. mdi:television)"></ha-textfield>
        <h3>Entities</h3>
        <ha-entity-picker id="etv-remote" label="Remote Entity (required)"></ha-entity-picker>
        <ha-entity-picker id="etv-appselect" label="App Select Entity (Roku)"></ha-entity-picker>
        <h3>TV Preset</h3>
        <ha-select id="etv-preset" label="TV Preset">
          <mwc-list-item value="roku">Roku</mwc-list-item>
          <mwc-list-item value="google_tv">Google TV</mwc-list-item>
          <mwc-list-item value="samsung">Samsung</mwc-list-item>
          <mwc-list-item value="generic">Generic</mwc-list-item>
        </ha-select>
        <h3>Behaviour</h3>
        <ha-select id="etv-expandmode" label="Expand Mode">
          <mwc-list-item value="inline">Inline Expand</mwc-list-item>
          <mwc-list-item value="popup">Popup (Bubble Card)</mwc-list-item>
        </ha-select>
        <ha-textfield id="etv-popuphash" label="Popup Hash (e.g. #MyTV-PopUp)"></ha-textfield>
        <h3>Sections</h3>
        <ha-formfield label="Controls (Power/Source/Menu)"><ha-switch id="etv-s-utility" ${s.utility!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="D-Pad Navigation"><ha-switch id="etv-s-dpad" ${s.dpad!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Playback Controls"><ha-switch id="etv-s-playback" ${s.playback!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Volume Controls"><ha-switch id="etv-s-volume" ${s.volume!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="App Shortcuts Grid"><ha-switch id="etv-s-appshortcuts" ${s.app_shortcuts!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="App Selector Dropdown (Roku)"><ha-switch id="etv-s-appselector" ${s.app_selector!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Number Pad (0-9)"><ha-switch id="etv-s-numpad" ${s.numpad?'checked':''}></ha-switch></ha-formfield>
        <h3>Appearance</h3>
        <ha-formfield label="Show Name"><ha-switch id="etv-showname" ${c.show_name!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-select id="etv-overlaytheme" label="Overlay Theme">
          <mwc-list-item value="dark">Dark (blur)</mwc-list-item>
          <mwc-list-item value="light">Light (blur)</mwc-list-item>
        </ha-select>
      </div>
    `;

    // Set text field values via JS property (not HTML attribute) so HA web components pick them up
    root.querySelector('#etv-name').value = c.name || '';
    root.querySelector('#etv-icon').value = c.icon || '';
    root.querySelector('#etv-popuphash').value = c.popup_hash || '';

    // Entity pickers need hass + value
    const remotePicker = root.querySelector('#etv-remote');
    remotePicker.hass = this._hass;
    remotePicker.value = c.remote_entity || '';

    const appPicker = root.querySelector('#etv-appselect');
    appPicker.hass = this._hass;
    appPicker.value = c.app_select_entity || '';

    // ha-select: set value after a microtask so the component has upgraded
    setTimeout(() => {
      root.querySelector('#etv-preset').value = c.tv_preset || 'roku';
      root.querySelector('#etv-expandmode').value = c.expand_mode || 'inline';
      root.querySelector('#etv-overlaytheme').value = c.overlay_theme || 'dark';
    }, 0);

    // Text field listeners
    root.querySelector('#etv-name').addEventListener('change', e => this._set('name', e.target.value));
    root.querySelector('#etv-icon').addEventListener('change', e => this._set('icon', e.target.value));
    root.querySelector('#etv-popuphash').addEventListener('change', e => this._set('popup_hash', e.target.value));

    // Entity picker listeners
    remotePicker.addEventListener('value-changed', e => this._set('remote_entity', e.detail.value));
    appPicker.addEventListener('value-changed', e => this._set('app_select_entity', e.detail.value));

    // ha-select listeners
    root.querySelector('#etv-preset').addEventListener('selected', e => { e.stopPropagation(); this._set('tv_preset', root.querySelector('#etv-preset').value); });
    root.querySelector('#etv-preset').addEventListener('closed', e => e.stopPropagation());
    root.querySelector('#etv-expandmode').addEventListener('selected', e => { e.stopPropagation(); this._set('expand_mode', root.querySelector('#etv-expandmode').value); });
    root.querySelector('#etv-expandmode').addEventListener('closed', e => e.stopPropagation());
    root.querySelector('#etv-overlaytheme').addEventListener('selected', e => { e.stopPropagation(); this._set('overlay_theme', root.querySelector('#etv-overlaytheme').value); });
    root.querySelector('#etv-overlaytheme').addEventListener('closed', e => e.stopPropagation());

    // Switch listeners — sections
    root.querySelector('#etv-s-utility').addEventListener('change', e => this._setSection('utility', e.target.checked));
    root.querySelector('#etv-s-dpad').addEventListener('change', e => this._setSection('dpad', e.target.checked));
    root.querySelector('#etv-s-playback').addEventListener('change', e => this._setSection('playback', e.target.checked));
    root.querySelector('#etv-s-volume').addEventListener('change', e => this._setSection('volume', e.target.checked));
    root.querySelector('#etv-s-appshortcuts').addEventListener('change', e => this._setSection('app_shortcuts', e.target.checked));
    root.querySelector('#etv-s-appselector').addEventListener('change', e => this._setSection('app_selector', e.target.checked));
    root.querySelector('#etv-s-numpad').addEventListener('change', e => this._setSection('numpad', e.target.checked));

    // Switch listeners — booleans
    root.querySelector('#etv-showname').addEventListener('change', e => this._set('show_name', e.target.checked));
  }
}

customElements.define('easytv-card', EasyTVCard);
customElements.define('easytv-card-editor', EasyTVCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'easytv-card',
  name: 'EasyTV Card',
  description: `TV remote card v${CARD_VERSION} — theme-driven with dark/light blur overlay`,
  preview: true,
});

console.info(`%c EasyTV Card %c v${CARD_VERSION} `, 'background:var(--primary-color,#1976d2);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px', 'background:#333;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px');
