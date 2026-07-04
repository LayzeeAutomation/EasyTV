// ─── TV Preset Types ─────────────────────────────────────────────────────────

export type TvPreset = 'roku' | 'google_tv' | 'samsung' | 'generic';

export interface TvCommandMap {
  up: string;
  down: string;
  left: string;
  right: string;
  select: string;
  back: string;
  home: string;
  play: string;
  pause: string;
  stop: string;
  forward: string;
  reverse: string;
  volume_up: string;
  volume_down: string;
  volume_mute: string;
  power?: string;
}

export const TV_PRESETS: Record<TvPreset, TvCommandMap> = {
  roku: {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    select: 'select',
    back: 'back',
    home: 'home',
    play: 'play',
    pause: 'pause',
    stop: 'stop',
    forward: 'forward',
    reverse: 'reverse',
    volume_up: 'volume_up',
    volume_down: 'volume_down',
    volume_mute: 'volume_mute',
    power: 'power',
  },
  google_tv: {
    up: 'DPAD_UP',
    down: 'DPAD_DOWN',
    left: 'DPAD_LEFT',
    right: 'DPAD_RIGHT',
    select: 'DPAD_CENTER',
    back: 'BACK',
    home: 'HOME',
    play: 'MEDIA_PLAY_PAUSE',
    pause: 'MEDIA_PAUSE',
    stop: 'MEDIA_STOP',
    forward: 'MEDIA_NEXT',
    reverse: 'MEDIA_PREVIOUS',
    volume_up: 'VOLUME_UP',
    volume_down: 'VOLUME_DOWN',
    volume_mute: 'VOLUME_MUTE',
    power: 'POWER',
  },
  samsung: {
    up: 'KEY_UP',
    down: 'KEY_DOWN',
    left: 'KEY_LEFT',
    right: 'KEY_RIGHT',
    select: 'KEY_ENTER',
    back: 'KEY_RETURN',
    home: 'KEY_HOME',
    play: 'KEY_PLAY',
    pause: 'KEY_PAUSE',
    stop: 'KEY_STOP',
    forward: 'KEY_FF',
    reverse: 'KEY_REWIND',
    volume_up: 'KEY_VOLUP',
    volume_down: 'KEY_VOLDOWN',
    volume_mute: 'KEY_MUTE',
    power: 'KEY_POWER',
  },
  generic: {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right',
    select: 'select',
    back: 'back',
    home: 'home',
    play: 'play',
    pause: 'pause',
    stop: 'stop',
    forward: 'forward',
    reverse: 'reverse',
    volume_up: 'volume_up',
    volume_down: 'volume_down',
    volume_mute: 'volume_mute',
  },
};

// ─── Section Config ───────────────────────────────────────────────────────────

export interface EasyTVSections {
  dpad: boolean;
  playback: boolean;
  volume: boolean;
  app_selector: boolean;
  power: boolean;
}

// ─── Card Config ──────────────────────────────────────────────────────────────

export interface EasyTVConfig {
  // Core
  type: string;
  name: string;
  icon?: string;

  // Entity bindings
  remote_entity: string;        // e.g. remote.bedroom_tv
  media_player_entity?: string; // e.g. media_player.bedroom_tv
  tracker_entity?: string;      // e.g. device_tracker.jvcrokutv_0lr
  app_select_entity?: string;   // e.g. select.bedroom_tv_application

  // Preset & commands
  tv_preset: TvPreset;
  command_overrides?: Partial<TvCommandMap>; // override individual commands

  // Popup / expand
  popup_hash?: string;          // e.g. #MBedroomTV-PopUp
  expand_mode: 'popup' | 'inline';

  // Sections visibility
  sections: EasyTVSections;

  // Appearance
  compact_rows?: number;
  show_name?: boolean;
  glassmorphism?: boolean;      // applies the blur/transparent glass style
}

export const DEFAULT_CONFIG: Partial<EasyTVConfig> = {
  tv_preset: 'roku',
  expand_mode: 'popup',
  show_name: true,
  glassmorphism: true,
  compact_rows: 1.7,
  sections: {
    dpad: true,
    playback: true,
    volume: true,
    app_selector: true,
    power: true,
  },
};
