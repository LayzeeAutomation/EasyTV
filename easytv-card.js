// EasyTV Card v0.1.6
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '0.1.6';

const TV_PRESETS = {
  roku: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute',power:'power' },
  google_tv: { up:'DPAD_UP',down:'DPAD_DOWN',left:'DPAD_LEFT',right:'DPAD_RIGHT',select:'DPAD_CENTER',back:'BACK',home:'HOME',play:'MEDIA_PLAY_PAUSE',pause:'MEDIA_PAUSE',stop:'MEDIA_STOP',forward:'MEDIA_NEXT',reverse:'MEDIA_PREVIOUS',volume_up:'VOLUME_UP',volume_down:'VOLUME_DOWN',volume_mute:'VOLUME_MUTE',power:'POWER' },
  samsung: { up:'KEY_UP',down:'KEY_DOWN',left:'KEY_LEFT',right:'KEY_RIGHT',select:'KEY_ENTER',back:'KEY_RETURN',home:'KEY_HOME',play:'KEY_PLAY',pause:'KEY_PAUSE',stop:'KEY_STOP',forward:'KEY_FF',reverse:'KEY_REWIND',volume_up:'KEY_VOLUP',volume_down:'KEY_VOLDOWN',volume_mute:'KEY_MUTE',power:'KEY_POWER' },
  generic: { up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute' },
};

const DEFAULT_SECTIONS = { dpad:true, playback:true, volume:true, app_selector:true, power:true };

const CARD_STYLES = `
  :host { display: block; }
  ha-card { background: transparent !important; box-shadow: none !important; overflow: visible; }
  .compact {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; border-radius: 16px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  }
  .compact-left { display: flex; align-items: center; gap: 10px; }
  .tv-icon { --mdc-icon-size: 26px; color: var(--primary-text-color); }
  .tv-name { font-weight: 600; font-size: 15px; color: var(--primary-text-color); }
  .compact-actions { display: flex; align-items: center; gap: 4px; }
  .icon-btn {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
    cursor: pointer; color: var(--primary-text-color);
    width: 44px; height: 44px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  .icon-btn:hover { background: rgba(255,255,255,0.15); }
  .icon-btn:active { background: rgba(255,255,255,0.25); transform: scale(0.92); }
  .icon-btn ha-icon { --mdc-icon-size: 22px; }
  .icon-btn.compact-action { width: 40px; height: 40px; }
  .icon-btn.compact-action ha-icon { --mdc-icon-size: 20px; }
`;

const OVERLAY_STYLES = `
  #easytv-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 999999;
    background: rgba(10,10,20,0.95);
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    display: flex; flex-direction: column;
    overflow-y: auto;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
    animation: etvFadeIn 0.2s ease;
  }
  @keyframes etvFadeIn { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  #easytv-overlay .overlay-header {
    display: flex; align-items: center; gap: 12px;
    padding: 20px 20px 14px;
    border-bottom: 1px solid rgba(255,255,255,0.1); flex-shrink: 0;
  }
  #easytv-overlay .overlay-header ha-icon { --mdc-icon-size: 28px; color: #90caf9; }
  #easytv-overlay .overlay-title { flex: 1; font-size: 20px; font-weight: 700; color: #fff; }
  #easytv-overlay .close-btn {
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    cursor: pointer; color: #fff;
    width: 42px; height: 42px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s; flex-shrink: 0;
  }
  #easytv-overlay .close-btn:hover { background: rgba(255,255,255,0.2); }
  #easytv-overlay .close-btn ha-icon { --mdc-icon-size: 22px; }
  #easytv-overlay .overlay-body {
    display: flex; flex-direction: column; align-items: center;
    gap: 28px; padding: 28px 24px 48px; flex: 1;
  }
  #easytv-overlay .section-label {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em;
    color: rgba(255,255,255,0.35); margin-bottom: -20px;
    align-self: flex-start; padding-left: 4px;
  }
  #easytv-overlay .app-section { width: 100%; }
  #easytv-overlay .app-select-native {
    width: 100%; padding: 14px 16px; border-radius: 12px; box-sizing: border-box;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 15px; font-family: inherit;
    appearance: none; -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23ffffff' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 16px center; cursor: pointer;
  }
  #easytv-overlay .app-select-native:focus { outline: none; border-color: #90caf9; }
  #easytv-overlay .icon-btn {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer; color: #fff; width: 62px; height: 62px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  #easytv-overlay .icon-btn:hover { background: rgba(255,255,255,0.18); }
  #easytv-overlay .icon-btn:active { background: rgba(255,255,255,0.28); transform: scale(0.90); }
  #easytv-overlay .icon-btn ha-icon { --mdc-icon-size: 28px; }
  #easytv-overlay .icon-btn.select-btn {
    width: 74px; height: 74px;
    background: rgba(255,255,255,0.14); border: 2px solid rgba(255,255,255,0.3);
  }
  #easytv-overlay .icon-btn.select-btn ha-icon { --mdc-icon-size: 34px; }
  #easytv-overlay .dpad-wrap { display: flex; flex-direction: column; align-items: center; }
  #easytv-overlay .dpad-row { display: flex; align-items: center; justify-content: center; gap: 10px; margin: 5px 0; }
  #easytv-overlay .dpad-spacer { width: 62px; height: 62px; display: block; }
  #easytv-overlay .media-row, #easytv-overlay .volume-row {
    display: flex; align-items: center; justify-content: center; gap: 20px; width: 100%;
  }
`;

const EDITOR_STYLES = `
  .editor { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
  h3 { margin: 8px 0 4px; font-size: 13px; font-weight: 600; color: var(--primary-color); text-transform: uppercase; letter-spacing: 0.05em; }
  ha-textfield, ha-entity-picker, ha-select { width: 100%; }
  ha-formfield { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
`;

function mkIcon(name) {
  const el = document.createElement('ha-icon');
  el.setAttribute('icon', name);
  return el;
}

function iconBtn(iconName, onClick, title = '', extraClass = '') {
  const btn = document.createElement('button');
  btn.className = 'icon-btn' + (extraClass ? ' ' + extraClass : '');
  btn.title = title;
  btn.appendChild(mkIcon(iconName));
  btn.addEventListener('click', (e) => { e.stopPropagation(); onClick(e); });
  return btn;
}

class EasyTVCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._expanded = false;
    this._overlayEl = null;
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

  _removeOverlay() {
    if (this._overlayEl && this._overlayEl.parentNode) {
      this._overlayEl.parentNode.removeChild(this._overlayEl);
    }
    this._overlayEl = null;
  }

  set hass(hass) { this._hass = hass; this._render(); }

  setConfig(config) {
    if (!config.remote_entity) throw new Error('EasyTV: remote_entity is required');
    this._config = {
      tv_preset: 'roku', expand_mode: 'inline', show_name: true, glassmorphism: true,
      sections: { ...DEFAULT_SECTIONS }, ...config,
      sections: { ...DEFAULT_SECTIONS, ...(config.sections || {}) },
    };
    this._render();
  }

  static getConfigElement() { return document.createElement('easytv-card-editor'); }
  static getStubConfig() {
    return { name: 'My TV', remote_entity: 'remote.my_tv', tv_preset: 'roku', expand_mode: 'inline', sections: { ...DEFAULT_SECTIONS } };
  }

  get _commands() {
    const base = TV_PRESETS[this._config.tv_preset] || TV_PRESETS.generic;
    return { ...base, ...(this._config.command_overrides || {}) };
  }

  _send(command, holdSecs = 0) {
    if (!this._hass) return;
    this._hass.callService('remote', 'send_command', { entity_id: this._config.remote_entity, command, hold_secs: holdSecs });
  }

  _toggleExpanded() {
    const { expand_mode, popup_hash } = this._config;
    if (expand_mode === 'popup' && popup_hash && popup_hash.trim() !== '') {
      history.pushState(null, '', popup_hash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      this._expanded = !this._expanded;
      if (this._expanded) { this._mountOverlay(); } else { this._removeOverlay(); }
    }
  }

  _buildAppSelector() {
    const { app_select_entity } = this._config;
    if (!app_select_entity || !this._hass) return null;
    const state = this._hass.states[app_select_entity];
    if (!state) return null;
    const options = state.attributes.options || [];
    const wrap = document.createElement('div'); wrap.className = 'app-section';
    const label = document.createElement('div'); label.className = 'section-label'; label.textContent = 'App';
    wrap.appendChild(label);
    const sel = document.createElement('select'); sel.className = 'app-select-native';
    options.forEach(opt => {
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
    const wrap = document.createElement('div'); wrap.className = 'dpad-wrap';
    const row1 = document.createElement('div'); row1.className = 'dpad-row';
    const sp1a = document.createElement('span'); sp1a.className = 'dpad-spacer'; row1.appendChild(sp1a);
    row1.appendChild(iconBtn('mdi:arrow-up-bold', () => this._send(c.up), 'Up'));
    const sp1b = document.createElement('span'); sp1b.className = 'dpad-spacer'; row1.appendChild(sp1b);
    const row2 = document.createElement('div'); row2.className = 'dpad-row';
    row2.appendChild(iconBtn('mdi:arrow-left-bold', () => this._send(c.left), 'Left'));
    row2.appendChild(iconBtn('mdi:keyboard-return', () => this._send(c.select), 'Select', 'select-btn'));
    row2.appendChild(iconBtn('mdi:arrow-right-bold', () => this._send(c.right), 'Right'));
    const row3 = document.createElement('div'); row3.className = 'dpad-row';
    row3.appendChild(iconBtn('mdi:arrow-left', () => this._send(c.back), 'Back'));
    row3.appendChild(iconBtn('mdi:arrow-down-bold', () => this._send(c.down), 'Down'));
    row3.appendChild(iconBtn('mdi:home-outline', () => this._send(c.home), 'Home'));
    wrap.appendChild(row1); wrap.appendChild(row2); wrap.appendChild(row3);
    return wrap;
  }

  _buildPlayback() {
    const c = this._commands;
    const row = document.createElement('div'); row.className = 'media-row';
    row.appendChild(iconBtn('mdi:skip-previous', () => this._send(c.reverse), 'Previous'));
    row.appendChild(iconBtn('mdi:play-pause', () => this._send(c.play), 'Play/Pause'));
    row.appendChild(iconBtn('mdi:skip-next', () => this._send(c.forward), 'Next'));
    return row;
  }

  _buildVolume() {
    const c = this._commands;
    const row = document.createElement('div'); row.className = 'volume-row';
    row.appendChild(iconBtn('mdi:volume-off', () => this._send(c.volume_mute), 'Mute'));
    row.appendChild(iconBtn('mdi:volume-medium', () => this._send(c.volume_down), 'Volume Down'));
    row.appendChild(iconBtn('mdi:volume-high', () => this._send(c.volume_up), 'Volume Up'));
    return row;
  }

  _mountOverlay() {
    this._removeOverlay();
    this._injectGlobalStyle();
    const { name, icon: ico, sections } = this._config;
    const overlay = document.createElement('div');
    overlay.id = 'easytv-overlay';
    const header = document.createElement('div'); header.className = 'overlay-header';
    header.appendChild(mkIcon(ico || 'mdi:television'));
    const title = document.createElement('span'); title.className = 'overlay-title'; title.textContent = name || 'TV';
    header.appendChild(title);
    const closeBtn = document.createElement('button'); closeBtn.className = 'close-btn';
    closeBtn.appendChild(mkIcon('mdi:close'));
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); this._expanded = false; this._removeOverlay(); });
    header.appendChild(closeBtn);
    overlay.appendChild(header);
    const body = document.createElement('div'); body.className = 'overlay-body';
    if (sections.app_selector) { const a = this._buildAppSelector(); if (a) body.appendChild(a); }
    if (sections.dpad) body.appendChild(this._buildDpad());
    if (sections.playback) body.appendChild(this._buildPlayback());
    if (sections.volume) body.appendChild(this._buildVolume());
    overlay.appendChild(body);
    document.body.appendChild(overlay);
    this._overlayEl = overlay;
  }

  _compactView() {
    const { name, icon: ico, sections, show_name } = this._config;
    const c = this._commands;
    const wrap = document.createElement('div'); wrap.className = 'compact';
    const left = document.createElement('div'); left.className = 'compact-left';
    const tvIco = mkIcon(ico || 'mdi:television'); tvIco.className = 'tv-icon';
    left.appendChild(tvIco);
    if (show_name !== false) {
      const s = document.createElement('span'); s.className = 'tv-name'; s.textContent = name || 'TV'; left.appendChild(s);
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
        <ha-textfield label="Name" value="${c.name || ''}" data-key="name"></ha-textfield>
        <ha-textfield label="Icon (e.g. mdi:television)" value="${c.icon || ''}" data-key="icon"></ha-textfield>
        <h3>Entities</h3>
        <ha-entity-picker label="Remote Entity (required)" data-key="remote_entity"></ha-entity-picker>
        <ha-entity-picker label="Media Player Entity (optional)" data-key="media_player_entity"></ha-entity-picker>
        <ha-entity-picker label="App Select Entity (Roku)" data-key="app_select_entity"></ha-entity-picker>
        <h3>TV Preset</h3>
        <ha-select label="TV Preset" data-key="tv_preset">
          <mwc-list-item value="roku">Roku</mwc-list-item>
          <mwc-list-item value="google_tv">Google TV</mwc-list-item>
          <mwc-list-item value="samsung">Samsung</mwc-list-item>
          <mwc-list-item value="generic">Generic</mwc-list-item>
        </ha-select>
        <h3>Behaviour</h3>
        <ha-select label="Expand Mode" data-key="expand_mode">
          <mwc-list-item value="inline">Inline Expand</mwc-list-item>
          <mwc-list-item value="popup">Popup (Bubble Card)</mwc-list-item>
        </ha-select>
        <ha-textfield label="Popup Hash (e.g. #MyTV-PopUp)" value="${c.popup_hash || ''}" data-key="popup_hash"></ha-textfield>
        <h3>Sections</h3>
        <ha-formfield label="D-Pad Navigation"><ha-switch data-section="dpad" ${s.dpad !== false ? 'checked' : ''}></ha-switch></ha-formfield>
        <ha-formfield label="Playback Controls"><ha-switch data-section="playback" ${s.playback !== false ? 'checked' : ''}></ha-switch></ha-formfield>
        <ha-formfield label="Volume Controls"><ha-switch data-section="volume" ${s.volume !== false ? 'checked' : ''}></ha-switch></ha-formfield>
        <ha-formfield label="App Selector (Roku)"><ha-switch data-section="app_selector" ${s.app_selector !== false ? 'checked' : ''}></ha-switch></ha-formfield>
        <ha-formfield label="Power Button"><ha-switch data-section="power" ${s.power !== false ? 'checked' : ''}></ha-switch></ha-formfield>
        <h3>Appearance</h3>
        <ha-formfield label="Show Name"><ha-switch data-key-bool="show_name" ${c.show_name !== false ? 'checked' : ''}></ha-switch></ha-formfield>
        <ha-formfield label="Glassmorphism Style"><ha-switch data-key-bool="glassmorphism" ${c.glassmorphism !== false ? 'checked' : ''}></ha-switch></ha-formfield>
      </div>
    `;
    root.querySelectorAll('ha-entity-picker').forEach(el => {
      el.hass = this._hass; el.value = c[el.dataset.key] || '';
      el.addEventListener('value-changed', (e) => this._set(el.dataset.key, e.detail.value));
    });
    root.querySelectorAll('ha-textfield').forEach(el => {
      el.addEventListener('change', (e) => this._set(e.target.dataset.key, e.target.value));
    });
    root.querySelectorAll('ha-select').forEach(el => {
      el.value = c[el.dataset.key] || '';
      el.addEventListener('selected', () => { if (el.dataset.key) this._set(el.dataset.key, el.value); });
      el.addEventListener('closed', (e) => e.stopPropagation());
    });
    root.querySelectorAll('ha-switch[data-section]').forEach(el => {
      el.addEventListener('change', () => this._setSection(el.dataset.section, el.checked));
    });
    root.querySelectorAll('ha-switch[data-key-bool]').forEach(el => {
      el.addEventListener('change', () => this._set(el.dataset.keyBool, el.checked));
    });
  }
}

customElements.define('easytv-card', EasyTVCard);
customElements.define('easytv-card-editor', EasyTVCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'easytv-card',
  name: 'EasyTV Card',
  description: `TV remote card v${CARD_VERSION} — fullscreen overlay, multi-preset, visual editor`,
  preview: true,
});

console.info(`%c EasyTV Card %c v${CARD_VERSION} `, 'background:#1976d2;color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px', 'background:#333;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px');
