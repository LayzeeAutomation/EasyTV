// EasyTV Card v1.0.7
// https://github.com/LayzeeAutomation/EasyTV

const CARD_VERSION = '1.0.7';

// ── TV Presets ────────────────────────────────────────────────────────────────

const TV_PRESETS = {
  roku:       { up:'up', down:'down', left:'left', right:'right', select:'select', back:'back', home:'home', play:'play', pause:'pause', stop:'stop', forward:'forward', reverse:'reverse', volume_up:'volume_up', volume_down:'volume_down', volume_mute:'volume_mute', power:'power', info:'info', replay:'replay', channel_up:'channel_up', channel_down:'channel_down' },
  google_tv:  { up:'DPAD_UP', down:'DPAD_DOWN', left:'DPAD_LEFT', right:'DPAD_RIGHT', select:'DPAD_CENTER', back:'BACK', home:'HOME', play:'MEDIA_PLAY_PAUSE', pause:'MEDIA_PAUSE', stop:'MEDIA_STOP', forward:'MEDIA_NEXT', reverse:'MEDIA_PREVIOUS', volume_up:'VOLUME_UP', volume_down:'VOLUME_DOWN', volume_mute:'VOLUME_MUTE', power:'POWER', info:'INFO', source:'TV', channel_up:'CHANNEL_UP', channel_down:'CHANNEL_DOWN' },
  samsung:    { up:'KEY_UP', down:'KEY_DOWN', left:'KEY_LEFT', right:'KEY_RIGHT', select:'KEY_ENTER', back:'KEY_RETURN', home:'KEY_HOME', play:'KEY_PLAY', pause:'KEY_PAUSE', stop:'KEY_STOP', forward:'KEY_FF', reverse:'KEY_REWIND', volume_up:'KEY_VOLUP', volume_down:'KEY_VOLDOWN', volume_mute:'KEY_MUTE', power:'KEY_POWER', info:'KEY_INFO', source:'KEY_SOURCE', channel_up:'KEY_CHUP', channel_down:'KEY_CHDOWN' },
  generic:    { up:'up', down:'down', left:'left', right:'right', select:'select', back:'back', home:'home', play:'play', pause:'pause', stop:'stop', forward:'forward', reverse:'reverse', volume_up:'volume_up', volume_down:'volume_down', volume_mute:'volume_mute', power:'power', channel_up:'channel_up', channel_down:'channel_down' },
};

// ── App Shortcuts ────────────────────────────────────────────────────────────

const APP_SHORTCUTS = [
  {
    id: 'netflix',
    label: 'Netflix',
    icon: 'mdi:netflix',
    bg: '#E50914', fg: '#ffffff',
    commands: { google_tv: 'com.netflix.atv', generic: 'com.netflix.atv', samsung: 'KEY_NETFLIX', roku: '12' },
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: 'mdi:youtube',
    bg: '#FF0000', fg: '#ffffff',
    commands: { google_tv: 'com.google.android.youtube.tv', generic: 'com.google.android.youtube.tv', samsung: 'com.google.android.youtube.tv', roku: '195316' },
  },
  {
    id: 'bbc_iplayer',
    label: 'iPlayer',
    icon: 'mdi:television-play',
    bg: '#FF6B00', fg: '#ffffff',
    commands: { google_tv: 'bbc.iplayer.android', generic: 'bbc.iplayer.android', samsung: 'bbc.iplayer.android', roku: '2285' },
  },
  {
    id: 'itvx',
    label: 'ITVX',
    icon: 'mdi:television-play',
    bg: '#000000', fg: '#8B5CF6',
    commands: { google_tv: 'air.ITVMobile', generic: 'air.ITVMobile', samsung: 'air.ITVMobile', roku: '65287' },
  },
  {
    id: 'prime_video',
    label: 'Prime',
    icon: 'mdi:amazon',
    bg: '#00A8E1', fg: '#ffffff',
    commands: { google_tv: 'com.amazon.amazonvideo.livingroom', generic: 'com.amazon.amazonvideo.livingroom', samsung: 'KEY_PRIMEVIDEO', roku: '13' },
  },
  {
    id: 'disney_plus',
    label: 'Disney+',
    icon: 'mdi:disney-plus',
    bg: '#0A1931', fg: '#ffffff',
    commands: { google_tv: 'com.disney.disneyplus', generic: 'com.disney.disneyplus', samsung: 'KEY_DISNEYPLUS', roku: '291097' },
  },
  {
    id: 'all4',
    label: 'All 4',
    icon: 'mdi:television-play',
    bg: '#8C1EFF', fg: '#ffffff',
    commands: { google_tv: 'air.com.channel4.vodclient', generic: 'air.com.channel4.vodclient', samsung: 'air.com.channel4.vodclient', roku: '52305' },
  },
  {
    id: 'spotify',
    label: 'Spotify',
    icon: 'mdi:spotify',
    bg: '#1DB954', fg: '#ffffff',
    commands: { google_tv: 'com.spotify.tv.android', generic: 'com.spotify.tv.android', samsung: 'com.spotify.tv.android', roku: '22297' },
  },
  {
    id: 'apple_tv',
    label: 'Apple TV+',
    icon: 'mdi:apple',
    bg: '#1C1C1E', fg: '#ffffff',
    commands: { google_tv: 'com.apple.atve.amazon.appletv', generic: 'com.apple.atve.amazon.appletv', samsung: 'com.apple.atve.sony.appletv', roku: '551012' },
  },
  {
    id: 'plex',
    label: 'Plex',
    icon: 'mdi:plex',
    bg: '#E5A00D', fg: '#000000',
    commands: { google_tv: 'com.plexapp.android', generic: 'com.plexapp.android', samsung: 'com.plexapp.android', roku: '13535' },
  },
];

const APP_SHORTCUT_MAP = Object.fromEntries(APP_SHORTCUTS.map(a => [a.id, a]));

// ── Quick Action Definitions ──────────────────────────────────────────────────

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
  info:          { icon: 'mdi:information-outline', title: 'Info', cmd: (c) => c.info },
};

const DEFAULT_QUICK_SINGLE = ['volume_down', 'play_pause', 'volume_up'];
const DEFAULT_QUICK_DOUBLE = ['volume_down', 'play_pause', 'volume_up', 'power', 'home', 'back'];
const DEFAULT_APPS = APP_SHORTCUTS.map(a => a.id);

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

function sendApp(hass, cfg, appId) {
  const app    = APP_SHORTCUT_MAP[appId];
  if (!app || !hass) return;
  const tvType = cfg.tv_type || 'generic';
  const command = app.commands[tvType] || app.commands.generic;
  if (!command) return;
  if (tvType === 'roku') {
    const mpEntity = cfg.media_player_entity;
    if (!mpEntity) { console.warn('EasyTV: media_player_entity required for Roku'); return; }
    hass.callService('media_player', 'select_source', { entity_id: mpEntity, source: command });
  } else {
    hass.callService('remote', 'send_command', { entity_id: cfg.entity, command });
  }
}

// ── Compact Card Styles ───────────────────────────────────────────────────────

const CARD_STYLES = `
  :host {
    display: block;
    --easytv-accent:        var(--primary-color, #1976d2);
    --easytv-text:          var(--primary-text-color, #fff);
    --easytv-muted:         var(--secondary-text-color, rgba(255,255,255,0.55));
    --easytv-bg:            rgba(255,255,255,0.04);
    --easytv-border:        var(--divider-color, rgba(255,255,255,0.12));
    --easytv-radius:        28px;
    --easytv-btn-bg:        rgba(255,255,255,0.07);
    --easytv-btn-hover:     rgba(255,255,255,0.14);
    --easytv-btn-active:    rgba(255,255,255,0.22);
    --easytv-btn-border:    rgba(255,255,255,0.10);
    --easytv-pill-bg:       rgba(255,255,255,0.06);
    --easytv-pill-border:   rgba(255,255,255,0.10);
    --easytv-tv-icon-color: #7DD3FC;
  }

  /*
   * Fully suppress ha-card's own border/background/shadow.
   * HA themes set these via CSS variables; we must override all of them
   * so only our single .etv-card border is visible (no double-border).
   */
  ha-card {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    border-width: 0 !important;
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0px;
    --ha-card-border-color: transparent;
    --ha-card-border-radius: 0px;
    overflow: visible !important;
    padding: 0 !important;
  }

  @keyframes etvCardIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Single clean border lives here only */
  .etv-card {
    border-radius: var(--easytv-radius);
    background: var(--easytv-bg);
    border: 1px solid var(--easytv-border);
    box-shadow: 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.07);
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
    color: var(--easytv-text);
    overflow: hidden;
    animation: etvCardIn 0.25s ease both;
  }

  /* ════ SINGLE ROW ════ */
  .compact-single {
    display: flex; align-items: center;
    padding: 12px 14px 12px 16px;
    gap: 12px;
  }
  .c-left {
    display: flex; align-items: center; gap: 10px;
    flex: 1; min-width: 0;
  }
  .tv-icon-wrap { flex-shrink: 0; }
  .tv-icon { --mdc-icon-size: 20px; color: var(--easytv-tv-icon-color); display: block; }
  .tv-info { flex: 1; min-width: 0; }
  .tv-name {
    font-weight: 600; font-size: 13px; color: var(--easytv-text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2;
  }
  .c-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .qa-pill {
    display: flex; align-items: stretch;
    background: var(--easytv-pill-bg);
    border: 1px solid var(--easytv-pill-border);
    border-radius: 12px; overflow: hidden;
  }
  .qa-pill-btn {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 38px;
    cursor: pointer; color: var(--easytv-text);
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent; flex-shrink: 0;
  }
  .qa-pill-btn:not(:last-child) { border-right: 1px solid var(--easytv-pill-border); }
  .qa-pill-btn:hover  { background: var(--easytv-btn-hover); }
  .qa-pill-btn:active { background: var(--easytv-btn-active); transform: scale(0.91); }
  .qa-pill-btn ha-icon { --mdc-icon-size: 18px; }

  .icon-btn {
    background: var(--easytv-btn-bg); border: 1px solid var(--easytv-btn-border);
    cursor: pointer; color: var(--easytv-text);
    width: 40px; height: 40px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent; flex-shrink: 0;
  }
  .icon-btn:hover  { background: var(--easytv-btn-hover); }
  .icon-btn:active { background: var(--easytv-btn-active); transform: scale(0.92); }
  .icon-btn ha-icon { --mdc-icon-size: 20px; }

  /* ════ DOUBLE ROW ════ */
  .compact-double {
    display: flex; flex-direction: column;
    padding: 14px 14px 14px 16px; gap: 0;
  }
  .d-top {
    display: flex; align-items: center;
    justify-content: space-between; gap: 10px; padding-bottom: 12px;
  }
  .d-top-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .d-actions { display: flex; gap: 6px; }
  .d-qa-btn {
    flex: 1; height: 42px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: var(--easytv-btn-bg); border: 1px solid var(--easytv-btn-border);
    color: var(--easytv-text); cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .d-qa-btn:hover  { background: var(--easytv-btn-hover); }
  .d-qa-btn:active { background: var(--easytv-btn-active); transform: scale(0.93); }
  .d-qa-btn ha-icon { --mdc-icon-size: 20px; }

  .no-btn-bg  .qa-pill-btn, .no-btn-bg  .d-qa-btn, .no-btn-bg  .icon-btn { background: transparent !important; }
  .no-btn-border .qa-pill-btn, .no-btn-border .d-qa-btn, .no-btn-border .icon-btn,
  .no-btn-border .qa-pill { border-color: transparent !important; }
`;

// ── Overlay Styles ────────────────────────────────────────────────────────────

const OVERLAY_STYLES = `
  :host {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999999;
    display: flex; flex-direction: column;
    font-family: var(--paper-font-body1_-_font-family, sans-serif);
    animation: etvFadeIn 0.2s ease;
    background: rgba(10,10,18,0.65);
    backdrop-filter: blur(32px) saturate(1.4);
    -webkit-backdrop-filter: blur(32px) saturate(1.4);
    --etv-text:       #ffffff;
    --etv-muted:      rgba(255,255,255,0.55);
    --etv-btn-bg:     rgba(255,255,255,0.08);
    --etv-btn-hover:  rgba(255,255,255,0.16);
    --etv-btn-active: rgba(255,255,255,0.24);
    --etv-border:     rgba(255,255,255,0.13);
    --etv-highlight:  rgba(255,255,255,0.18);
    --etv-accent:     #1976d2;
    --etv-radius-btn: 14px;
    --etv-power-bg:      rgba(220,50,50,0.18);
    --etv-power-border:  rgba(220,50,50,0.5);
    --etv-power-hover:   rgba(220,50,50,0.32);
    --etv-power-active:  rgba(220,50,50,0.46);
    --etv-power-color:   rgba(255,100,100,1);
    --etv-power-glow:    0 0 14px rgba(220,50,50,0.45);
    --etv-vol-bg:     rgba(30,100,220,0.15);
    --etv-vol-border: rgba(60,140,255,0.35);
    --etv-vol-hover:  rgba(30,100,220,0.26);
    --etv-vol-active: rgba(30,100,220,0.38);
    --etv-ch-bg:      rgba(20,160,100,0.15);
    --etv-ch-border:  rgba(40,200,130,0.35);
    --etv-ch-hover:   rgba(20,160,100,0.26);
    --etv-ch-active:  rgba(20,160,100,0.38);
    --etv-play-bg:    rgba(255,255,255,0.13);
    --etv-play-border:rgba(255,255,255,0.28);
    --etv-play-hover: rgba(255,255,255,0.22);
    --etv-play-active:rgba(255,255,255,0.32);
    --etv-play-glow:  0 0 10px rgba(255,255,255,0.12);
    --etv-app-gap: 10px;
    --etv-app-cols: 3;
  }
  @keyframes etvFadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .overlay-header {
    display: flex; align-items: center; gap: 12px;
    padding: 18px 20px 14px; flex-shrink: 0;
    border-bottom: 1px solid var(--etv-border);
  }
  .overlay-header ha-icon { --mdc-icon-size: 24px; color: var(--etv-text); }
  .overlay-title   { flex: 1; font-size: 18px; font-weight: 700; color: var(--etv-text); }
  .overlay-version { font-size: 11px; color: var(--etv-muted); }
  .close-btn {
    cursor: pointer; width: 40px; height: 40px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    box-shadow: inset 0 1px 0 var(--etv-highlight);
    transition: background 0.15s; flex-shrink: 0; color: var(--etv-text);
  }
  .close-btn:hover  { background: var(--etv-btn-hover); }
  .close-btn:active { background: var(--etv-btn-active); }
  .close-btn ha-icon { --mdc-icon-size: 20px; }
  .overlay-body {
    flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
    display: flex; flex-direction: column; align-items: center;
    padding: 20px 20px 32px; gap: 20px;
  }
  .power-row { display: flex; align-items: center; justify-content: space-between; width: 100%; }
  .power-btn {
    width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-power-bg); border: 1px solid var(--etv-power-border);
    box-shadow: inset 0 1px 0 rgba(255,120,120,0.2), var(--etv-power-glow);
    cursor: pointer; color: var(--etv-power-color);
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .power-btn:hover  { background: var(--etv-power-hover); box-shadow: inset 0 1px 0 rgba(255,120,120,0.2), 0 0 20px rgba(220,50,50,0.6); }
  .power-btn:active { background: var(--etv-power-active); transform: scale(0.92); box-shadow: none; }
  .power-btn ha-icon { --mdc-icon-size: 26px; }
  .source-btn {
    width: 52px; height: 52px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    box-shadow: inset 0 1px 0 var(--etv-highlight);
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, transform 0.1s; -webkit-tap-highlight-color: transparent;
  }
  .source-btn:hover  { background: var(--etv-btn-hover); }
  .source-btn:active { background: var(--etv-btn-active); transform: scale(0.92); }
  .source-btn ha-icon { --mdc-icon-size: 24px; }
  .dpad-scene {
    position: relative;
    width: min(300px, calc(100vw - 40px));
    padding: 24px; box-sizing: border-box; flex-shrink: 0;
  }
  .dpad-scene.numpad-mode { padding: 0; }
  .dpad-wrap { position: relative; width: 100%; aspect-ratio: 1; }
  .dpad-wrap svg { width: 100%; height: 100%; display: block; overflow: visible; }
  .dpad-petal {
    fill: url(#petalGrad); stroke: rgba(255,255,255,0.18); stroke-width: 1;
    cursor: pointer; transition: fill 0.15s; -webkit-tap-highlight-color: transparent;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
  }
  .dpad-petal:hover  { fill: url(#petalGradHover); }
  .dpad-petal:active { fill: url(#petalGradActive); }
  .dpad-center {
    fill: url(#centerGrad); stroke: rgba(255,255,255,0.2); stroke-width: 1.5;
    cursor: pointer; transition: fill 0.15s; -webkit-tap-highlight-color: transparent;
  }
  .dpad-center:hover  { fill: url(#centerGradHover); }
  .dpad-center:active { fill: url(#centerGradActive); }
  .dpad-arrow-icon { fill: rgba(255,255,255,0.75); pointer-events: none; }
  .dpad-ok { fill: rgba(255,255,255,0.85); font-size: 14px; font-weight: 700; pointer-events: none; dominant-baseline: middle; text-anchor: middle; }
  .numpad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 100%; box-sizing: border-box; }
  .num-btn {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    box-shadow: inset 0 1px 0 var(--etv-highlight), 0 2px 6px rgba(0,0,0,0.3);
    border-radius: 14px; cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent; aspect-ratio: 1; user-select: none;
  }
  .num-btn:hover  { background: var(--etv-btn-hover); }
  .num-btn:active { background: var(--etv-btn-active); transform: scale(0.93); box-shadow: none; }
  .num-btn .num-digit { font-size: 20px; font-weight: 700; line-height: 1; }
  .num-btn .num-label { font-size: 8px; letter-spacing: 0.12em; color: var(--etv-muted); margin-top: 2px; }
  .num-back {
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    box-shadow: inset 0 1px 0 var(--etv-highlight), 0 2px 6px rgba(0,0,0,0.3);
    border-radius: 50%; cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent; aspect-ratio: 1; user-select: none;
  }
  .num-back:hover  { background: var(--etv-btn-hover); }
  .num-back:active { background: var(--etv-btn-active); transform: scale(0.93); }
  .num-back ha-icon { --mdc-icon-size: 22px; }
  .num-spacer { aspect-ratio: 1; }
  .corner-btn {
    position: absolute; width: 48px; height: 48px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    box-shadow: inset 0 1px 0 var(--etv-highlight), 0 2px 8px rgba(0,0,0,0.35);
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .corner-btn:hover  { background: var(--etv-btn-hover); box-shadow: inset 0 1px 0 var(--etv-highlight), 0 0 12px rgba(255,255,255,0.08); }
  .corner-btn ha-icon { --mdc-icon-size: 22px; }
  .corner-toggle { top: 24px; left: 24px; transform: translate(-50%, -50%); }
  .corner-toggle:active { background: var(--etv-btn-active); box-shadow: none; transform: translate(-50%,-50%) scale(0.92); }
  .corner-info { top: 24px; right: 24px; transform: translate(50%, -50%); }
  .corner-info:active { background: var(--etv-btn-active); box-shadow: none; transform: translate(50%,-50%) scale(0.92); }
  .corner-back { bottom: 24px; left: 24px; transform: translate(-50%, 50%); }
  .corner-back:active { background: var(--etv-btn-active); box-shadow: none; transform: translate(-50%,50%) scale(0.92); }
  .corner-home { bottom: 24px; right: 24px; transform: translate(50%, 50%); }
  .corner-home:active { background: var(--etv-btn-active); box-shadow: none; transform: translate(50%,50%) scale(0.92); }
  .media-section { display: flex; align-items: center; gap: 12px; width: 100%; }
  .pill-wrap-vol {
    display: flex; flex-direction: column;
    background: var(--etv-vol-bg); border: 1px solid var(--etv-vol-border);
    box-shadow: inset 0 1px 0 rgba(100,180,255,0.15), 0 2px 8px rgba(0,0,0,0.3);
    border-radius: 32px; overflow: hidden; flex-shrink: 0; width: 52px;
  }
  .pill-wrap-ch {
    display: flex; flex-direction: column;
    background: var(--etv-ch-bg); border: 1px solid var(--etv-ch-border);
    box-shadow: inset 0 1px 0 rgba(60,210,150,0.15), 0 2px 8px rgba(0,0,0,0.3);
    border-radius: 32px; overflow: hidden; flex-shrink: 0; width: 52px;
  }
  .pill-half {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px; padding: 16px 0; flex: 1;
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s; -webkit-tap-highlight-color: transparent; user-select: none;
  }
  .pill-wrap-vol .pill-half:hover  { background: var(--etv-vol-hover); }
  .pill-wrap-vol .pill-half:active { background: var(--etv-vol-active); }
  .pill-wrap-ch  .pill-half:hover  { background: var(--etv-ch-hover); }
  .pill-wrap-ch  .pill-half:active { background: var(--etv-ch-active); }
  .pill-half ha-icon { --mdc-icon-size: 22px; }
  .pill-half span { font-size: 9px; color: var(--etv-muted); letter-spacing: 0.03em; }
  .pill-divider { height: 1px; background: var(--etv-border); margin: 0 8px; flex-shrink: 0; }
  .centre-controls { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .pb-btn-wide {
    display: flex; align-items: center; justify-content: center;
    background: var(--etv-play-bg); border: 1px solid var(--etv-play-border);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), var(--etv-play-glow);
    border-radius: var(--etv-radius-btn); height: 52px; width: 100%;
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .pb-btn-wide:hover  { background: var(--etv-play-hover); box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 0 16px rgba(255,255,255,0.18); }
  .pb-btn-wide:active { background: var(--etv-play-active); transform: scale(0.97); box-shadow: none; }
  .pb-btn-wide ha-icon { --mdc-icon-size: 28px; }
  .centre-row2 { display: flex; gap: 8px; }
  .pb-btn {
    flex: 1; display: flex; align-items: center; justify-content: center;
    background: var(--etv-btn-bg); border: 1px solid var(--etv-border);
    box-shadow: inset 0 1px 0 var(--etv-highlight), 0 2px 6px rgba(0,0,0,0.25);
    border-radius: var(--etv-radius-btn); height: 52px;
    cursor: pointer; color: var(--etv-text);
    transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }
  .pb-btn:hover  { background: var(--etv-btn-hover); box-shadow: inset 0 1px 0 var(--etv-highlight), 0 0 10px rgba(255,255,255,0.07); }
  .pb-btn:active { background: var(--etv-btn-active); transform: scale(0.93); box-shadow: none; }
  .pb-btn ha-icon { --mdc-icon-size: 22px; }
  .app-row {
    display: flex; gap: var(--etv-app-gap); width: 100%;
    overflow-x: auto; padding-bottom: 4px;
    -webkit-overflow-scrolling: touch; scrollbar-width: none;
    scroll-snap-type: x mandatory;
    overflow: hidden; overflow-x: auto;
  }
  .app-row::-webkit-scrollbar { display: none; }
  .app-btn {
    flex: 0 0 calc((100% - (var(--etv-app-cols) - 1) * var(--etv-app-gap)) / var(--etv-app-cols));
    scroll-snap-align: start;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; padding: 10px 6px; border-radius: 14px; cursor: pointer;
    transition: transform 0.15s, filter 0.15s, box-shadow 0.15s;
    -webkit-tap-highlight-color: transparent; user-select: none;
    border: 1px solid transparent;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12);
    box-sizing: border-box;
  }
  .app-btn:hover  { filter: brightness(1.15); box-shadow: 0 4px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18); }
  .app-btn:active { transform: scale(0.91); filter: brightness(0.9); box-shadow: none; }
  .app-btn ha-icon { --mdc-icon-size: 26px; }
  .app-btn span {
    font-size: 10px; font-weight: 600; letter-spacing: 0.01em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; text-align: center;
  }
  .etv-hidden { visibility: hidden; pointer-events: none; height: 0 !important; overflow: hidden; margin: 0 !important; padding: 0 !important; min-height: 0 !important; }
`;

// ── Editor Styles ─────────────────────────────────────────────────────────────

const EDITOR_STYLES = `
  .editor { display: flex; flex-direction: column; gap: 16px; padding: 16px; font-family: var(--paper-font-body1_-_font-family, sans-serif); }
  .editor-panel {
    display: flex; flex-direction: column; gap: 12px; padding: 14px; border-radius: 14px;
    background: var(--ha-card-background, var(--card-background-color, rgba(255,255,255,0.03)));
    border: 1px solid var(--divider-color, rgba(255,255,255,0.12));
  }
  .panel-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--primary-color, #1976d2); margin-bottom: 2px; }
  .field-wrap { display: flex; flex-direction: column; gap: 4px; }
  .field-wrap label { font-size: 12px; color: var(--secondary-text-color, rgba(255,255,255,0.6)); padding-left: 2px; }
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
  .version-badge { font-size: 11px; color: var(--secondary-text-color, rgba(255,255,255,0.5)); text-align: center; padding-top: 4px; }
`;

// ── SVG D-pad builder ─────────────────────────────────────────────────────────

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
  const defs = document.createElementNS(NS, 'defs');
  const gradDefs = [
    { id:'petalGrad',       cx:'50%',cy:'50%',r:'70%', s1:'rgba(255,255,255,0.14)', s2:'rgba(255,255,255,0.05)' },
    { id:'petalGradHover',  cx:'50%',cy:'50%',r:'70%', s1:'rgba(255,255,255,0.24)', s2:'rgba(255,255,255,0.12)' },
    { id:'petalGradActive', cx:'50%',cy:'50%',r:'70%', s1:'rgba(255,255,255,0.32)', s2:'rgba(255,255,255,0.18)' },
    { id:'centerGrad',      cx:'40%',cy:'35%',r:'65%', s1:'rgba(255,255,255,0.18)', s2:'rgba(255,255,255,0.07)' },
    { id:'centerGradHover', cx:'40%',cy:'35%',r:'65%', s1:'rgba(255,255,255,0.28)', s2:'rgba(255,255,255,0.14)' },
    { id:'centerGradActive',cx:'40%',cy:'35%',r:'65%', s1:'rgba(255,255,255,0.38)', s2:'rgba(255,255,255,0.22)' },
  ];
  gradDefs.forEach(({ id, cx: gcx, cy: gcy, r: gr, s1, s2 }) => {
    const g = document.createElementNS(NS, 'radialGradient');
    g.setAttribute('id', id); g.setAttribute('cx', gcx); g.setAttribute('cy', gcy); g.setAttribute('r', gr);
    const st1 = document.createElementNS(NS, 'stop'); st1.setAttribute('offset','0%'); st1.setAttribute('stop-color', s1);
    const st2 = document.createElementNS(NS, 'stop'); st2.setAttribute('offset','100%'); st2.setAttribute('stop-color', s2);
    g.appendChild(st1); g.appendChild(st2); defs.appendChild(g);
  });
  svg.appendChild(defs);
  [{ key:'up', mid:270 }, { key:'right', mid:0 }, { key:'down', mid:90 }, { key:'left', mid:180 }]
    .forEach(p => {
      const dist = (r + R) / 2;
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('d', petalPath(p.mid)); path.setAttribute('class', 'dpad-petal');
      path.addEventListener('click', () => sendCmd(getHass(), entityId, cmds[p.key]));
      svg.appendChild(path);
      const arrow = document.createElementNS(NS, 'polygon');
      arrow.setAttribute('points', arrowPoly(p.mid, dist)); arrow.setAttribute('class', 'dpad-arrow-icon');
      svg.appendChild(arrow);
    });
  const circle = document.createElementNS(NS, 'circle');
  circle.setAttribute('cx', cx); circle.setAttribute('cy', cy); circle.setAttribute('r', r - 2);
  circle.setAttribute('class', 'dpad-center');
  circle.addEventListener('click', () => sendCmd(getHass(), entityId, cmds.select));
  svg.appendChild(circle);
  const okTxt = document.createElementNS(NS, 'text');
  okTxt.setAttribute('x', cx); okTxt.setAttribute('y', cy); okTxt.setAttribute('class', 'dpad-ok');
  okTxt.textContent = 'OK'; svg.appendChild(okTxt);
  return svg;
}

// ── Number pad builder ────────────────────────────────────────────────────────

const NUM_KEYS = [
  { digit: '1', label: '' },   { digit: '2', label: 'ABC' }, { digit: '3', label: 'DEF' },
  { digit: '4', label: 'GHI' },{ digit: '5', label: 'JKL' }, { digit: '6', label: 'MNO' },
  { digit: '7', label: 'PQRS'},{ digit: '8', label: 'TUV' }, { digit: '9', label: 'WXYZ' },
];

function buildNumpad(getHass, entityId, onBack) {
  const grid = document.createElement('div');
  grid.className = 'numpad-grid';
  NUM_KEYS.forEach(({ digit, label }) => {
    const btn = document.createElement('div'); btn.className = 'num-btn';
    btn.innerHTML = `<span class="num-digit">${digit}</span>${label ? `<span class="num-label">${label}</span>` : ''}`;
    btn.addEventListener('click', () => sendCmd(getHass(), entityId, digit));
    grid.appendChild(btn);
  });
  const backCell = document.createElement('div'); backCell.className = 'num-back';
  backCell.innerHTML = `<ha-icon icon="mdi:arrow-left"></ha-icon>`;
  backCell.addEventListener('click', () => onBack()); grid.appendChild(backCell);
  const zeroBtn = document.createElement('div'); zeroBtn.className = 'num-btn';
  zeroBtn.innerHTML = `<span class="num-digit">0</span><span class="num-label">+</span>`;
  zeroBtn.addEventListener('click', () => sendCmd(getHass(), entityId, '0')); grid.appendChild(zeroBtn);
  const spacer = document.createElement('div'); spacer.className = 'num-spacer'; grid.appendChild(spacer);
  return grid;
}

// ── App row builder (overlay) ─────────────────────────────────────────────────

function buildAppRow(cfg, getHass) {
  const row = document.createElement('div');
  row.className = 'app-row';
  const appIds = cfg.apps || DEFAULT_APPS;
  appIds.forEach(id => {
    const app = APP_SHORTCUT_MAP[id]; if (!app) return;
    const btn = document.createElement('div'); btn.className = 'app-btn';
    btn.style.background = app.bg; btn.style.color = app.fg;
    btn.style.borderColor = `color-mix(in srgb, ${app.bg} 55%, white)`;
    btn.innerHTML = `<ha-icon icon="${app.icon}"></ha-icon><span>${app.label}</span>`;
    btn.addEventListener('click', () => sendApp(getHass(), cfg, id));
    row.appendChild(btn);
  });
  return row;
}

// ── Overlay Element ───────────────────────────────────────────────────────────

class EasyTVOverlayEl extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); }

  _requestClose() {
    this.dispatchEvent(new CustomEvent('etv-close', { bubbles: true, composed: true }));
  }

  open(cfg, getHass, name) {
    const sr = this.shadowRoot;
    const cmds = buildCmds(cfg);
    let numpadMode = false;

    const style = document.createElement('style');
    style.textContent = OVERLAY_STYLES;
    sr.appendChild(style);

    const header = document.createElement('div');
    header.className = 'overlay-header';
    header.innerHTML = `
      <ha-icon icon="mdi:television"></ha-icon>
      <span class="overlay-title">${name}</span>
      <span class="overlay-version">v${CARD_VERSION}</span>
      <div class="close-btn" id="etv-close"><ha-icon icon="mdi:close"></ha-icon></div>`;
    sr.appendChild(header);
    sr.querySelector('#etv-close').addEventListener('click', () => this._requestClose());

    const body = document.createElement('div');
    body.className = 'overlay-body';
    sr.appendChild(body);

    const powerRow = document.createElement('div'); powerRow.className = 'power-row';
    const powerBtn = document.createElement('div'); powerBtn.className = 'power-btn';
    powerBtn.innerHTML = `<ha-icon icon="mdi:power"></ha-icon>`;
    powerBtn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.power));
    powerRow.appendChild(powerBtn);
    const sourceBtn = document.createElement('div'); sourceBtn.className = 'source-btn';
    sourceBtn.innerHTML = `<ha-icon icon="mdi:import"></ha-icon>`; sourceBtn.title = 'Source';
    sourceBtn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.source));
    powerRow.appendChild(sourceBtn);
    body.appendChild(powerRow);

    const enterNumpad = () => {
      numpadMode = true; dpadWrap.innerHTML = ''; dpadWrap.appendChild(numGrid);
      dpadScene.classList.add('numpad-mode'); toggleBtn.classList.add('etv-hidden');
      cornerBtnEls.forEach(b => b.classList.add('etv-hidden'));
      mediaSection.classList.add('etv-hidden');
      appRowEl && appRowEl.classList.add('etv-hidden');
    };
    const exitNumpad = () => {
      numpadMode = false; dpadWrap.innerHTML = ''; dpadWrap.appendChild(navSvg);
      dpadScene.classList.remove('numpad-mode'); toggleBtn.classList.remove('etv-hidden');
      cornerBtnEls.forEach(b => b.classList.remove('etv-hidden'));
      mediaSection.classList.remove('etv-hidden');
      appRowEl && appRowEl.classList.remove('etv-hidden');
    };

    const dpadScene = document.createElement('div'); dpadScene.className = 'dpad-scene';
    const dpadWrap = document.createElement('div'); dpadWrap.className = 'dpad-wrap';
    const navSvg = buildSvgDpad(cmds, getHass, cfg.entity);
    const numGrid = buildNumpad(getHass, cfg.entity, exitNumpad);
    dpadWrap.appendChild(navSvg); dpadScene.appendChild(dpadWrap);

    const toggleBtn = document.createElement('div'); toggleBtn.className = 'corner-btn corner-toggle';
    toggleBtn.innerHTML = `<ha-icon icon="mdi:numeric"></ha-icon>`;
    toggleBtn.title = 'Switch to number pad';
    toggleBtn.addEventListener('click', () => { if (numpadMode) exitNumpad(); else enterNumpad(); });
    dpadScene.appendChild(toggleBtn);

    const cornerBtnsData = [
      { cls: 'corner-btn corner-info', icon: 'mdi:information-outline', key: 'info' },
      { cls: 'corner-btn corner-back', icon: 'mdi:arrow-left',          key: 'back' },
      { cls: 'corner-btn corner-home', icon: 'mdi:home-outline',        key: 'home' },
    ];
    const cornerBtnEls = cornerBtnsData.map(({ cls, icon, key }) => {
      const btn = document.createElement('div'); btn.className = cls;
      btn.innerHTML = `<ha-icon icon="${icon}"></ha-icon>`;
      btn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds[key]));
      dpadScene.appendChild(btn); return btn;
    });
    body.appendChild(dpadScene);

    const mediaSection = document.createElement('div'); mediaSection.className = 'media-section';
    const volPill = document.createElement('div'); volPill.className = 'pill-wrap-vol';
    const volUp = document.createElement('div'); volUp.className = 'pill-half';
    volUp.innerHTML = `<ha-icon icon="mdi:volume-plus"></ha-icon><span>VOL +</span>`;
    volUp.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.volume_up));
    const volDiv = document.createElement('div'); volDiv.className = 'pill-divider';
    const volDown = document.createElement('div'); volDown.className = 'pill-half';
    volDown.innerHTML = `<ha-icon icon="mdi:volume-minus"></ha-icon><span>VOL −</span>`;
    volDown.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.volume_down));
    volPill.appendChild(volUp); volPill.appendChild(volDiv); volPill.appendChild(volDown);
    mediaSection.appendChild(volPill);
    const centreControls = document.createElement('div'); centreControls.className = 'centre-controls';
    const playBtn = document.createElement('div'); playBtn.className = 'pb-btn-wide';
    playBtn.innerHTML = `<ha-icon icon="mdi:play-pause"></ha-icon>`;
    playBtn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.play));
    centreControls.appendChild(playBtn);
    const centreRow2 = document.createElement('div'); centreRow2.className = 'centre-row2';
    [{ key:'reverse', icon:'mdi:rewind' }, { key:'volume_mute', icon:'mdi:volume-off' }, { key:'forward', icon:'mdi:fast-forward' }]
      .forEach(({ key, icon }) => {
        const btn = document.createElement('div'); btn.className = 'pb-btn';
        btn.innerHTML = `<ha-icon icon="${icon}"></ha-icon>`;
        btn.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds[key]));
        centreRow2.appendChild(btn);
      });
    centreControls.appendChild(centreRow2);
    mediaSection.appendChild(centreControls);
    const chPill = document.createElement('div'); chPill.className = 'pill-wrap-ch';
    const chUp = document.createElement('div'); chUp.className = 'pill-half';
    chUp.innerHTML = `<ha-icon icon="mdi:chevron-up"></ha-icon><span>CH +</span>`;
    chUp.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.channel_up));
    const chDiv = document.createElement('div'); chDiv.className = 'pill-divider';
    const chDown = document.createElement('div'); chDown.className = 'pill-half';
    chDown.innerHTML = `<ha-icon icon="mdi:chevron-down"></ha-icon><span>CH −</span>`;
    chDown.addEventListener('click', () => sendCmd(getHass(), cfg.entity, cmds.channel_down));
    chPill.appendChild(chUp); chPill.appendChild(chDiv); chPill.appendChild(chDown);
    mediaSection.appendChild(chPill);
    body.appendChild(mediaSection);

    let appRowEl = null;
    if (cfg.show_apps !== false) {
      appRowEl = buildAppRow(cfg, getHass);
      body.appendChild(appRowEl);
    }
  }
}

customElements.define('easytv-overlay-el', EasyTVOverlayEl);

// ── Main Card ─────────────────────────────────────────────────────────────────

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

    const extraCls = [
      cfg.no_button_background ? 'no-btn-bg'    : '',
      cfg.no_button_border     ? 'no-btn-border' : '',
    ].filter(Boolean).join(' ');

    if (cardType === 'single') {
      const qaKeys = cfg.quick_actions || DEFAULT_QUICK_SINGLE;
      const qaPillBtns = qaKeys.map(qa => {
        const def = QUICK_ACTION_DEFS[qa];
        return def
          ? `<div class="qa-pill-btn" data-action="quick-action" data-qa="${qa}" title="${def.title}"><ha-icon icon="${def.icon}"></ha-icon></div>`
          : '';
      }).join('');

      card.innerHTML = `
        <div class="etv-card compact-single ${extraCls}">
          <div class="c-left">
            <div class="tv-icon-wrap">
              <ha-icon class="tv-icon" icon="mdi:television"></ha-icon>
            </div>
            <div class="tv-info">
              <div class="tv-name">${name}</div>
            </div>
          </div>
          <div class="c-actions">
            <div class="qa-pill">${qaPillBtns}</div>
            <button class="icon-btn" data-action="open-overlay" title="Open remote"><ha-icon icon="mdi:remote"></ha-icon></button>
          </div>
        </div>`;

    } else {
      const qaKeys = cfg.quick_actions || DEFAULT_QUICK_DOUBLE;
      const qaRowBtns = qaKeys.map(qa => {
        const def = QUICK_ACTION_DEFS[qa];
        return def
          ? `<div class="d-qa-btn" data-action="quick-action" data-qa="${qa}" title="${def.title}"><ha-icon icon="${def.icon}"></ha-icon></div>`
          : '';
      }).join('');

      card.innerHTML = `
        <div class="etv-card compact-double ${extraCls}">
          <div class="d-top">
            <div class="d-top-left">
              <div class="tv-icon-wrap">
                <ha-icon class="tv-icon" icon="mdi:television"></ha-icon>
              </div>
              <div class="tv-info">
                <div class="tv-name">${name}</div>
              </div>
            </div>
            <button class="icon-btn" data-action="open-overlay" title="Open remote"><ha-icon icon="mdi:remote"></ha-icon></button>
          </div>
          <div class="d-actions">${qaRowBtns}</div>
        </div>`;
    }
  }

  _openOverlay() {
    if (this._overlayOpen) return;
    this._overlayOpen = true;
    const cfg      = this._config;
    const stateObj = this._hass?.states[cfg.entity];
    const name     = cfg.name || stateObj?.attributes?.friendly_name || cfg.entity;
    const getHass  = () => this._hass;
    const overlay  = document.createElement('easytv-overlay-el');
    document.body.appendChild(overlay);
    overlay.open(cfg, getHass, name);
    this._overlayEl = overlay;
    overlay.addEventListener('etv-close', () => this._closeOverlay());
    overlay.addEventListener('click', e => {
      if (e.composedPath()[0] === overlay) this._closeOverlay();
    });
  }

  _closeOverlay() {
    if (this._overlayEl) { this._overlayEl.remove(); this._overlayEl = null; }
    this._overlayOpen = false;
  }

  getCardSize() { return this._config?.card_type === 'double' ? 2 : 1; }
}

// ── Editor ────────────────────────────────────────────────────────────────────

class EasyTVCardEditor extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: 'open' }); this._config = {}; }

  set hass(hass) {
    this._hass = hass;
    this.shadowRoot.querySelectorAll('ha-entity-picker').forEach(p => { p.hass = hass; });
  }

  setConfig(config) { this._config = { ...config }; this._render(); }

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
        <div class="panel-title">App Shortcuts (overlay)</div>
        <div class="row"><label>Show app shortcuts</label><ha-switch data-key="show_apps" data-default="true"></ha-switch></div>
        <div class="field-wrap">
          <label>Roku media player entity (Roku only)</label>
          <ha-entity-picker data-key="media_player_entity" allow-custom-entity></ha-entity-picker>
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
    const switchKeys = {
      no_button_background: !!cfg.no_button_background,
      no_button_border:     !!cfg.no_button_border,
      show_apps:            cfg.show_apps !== false,
    };
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
  '%c EasyTV Card v1.0.7 ',
  'color:#fff;background:#1976d2;font-weight:bold;border-radius:4px;padding:2px 6px;'
);
