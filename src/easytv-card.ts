import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from './ha-types';
import type { EasyTVConfig } from './types';
import { TV_PRESETS, DEFAULT_CONFIG } from './types';

@customElement('easytv-card')
export class EasyTVCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: EasyTVConfig;
  @state() private _expanded = false;

  // ─── Lovelace API ────────────────────────────────────────────────────────

  public setConfig(config: EasyTVConfig): void {
    if (!config.remote_entity) {
      throw new Error('EasyTV: remote_entity is required');
    }
    this._config = { ...DEFAULT_CONFIG, ...config } as EasyTVConfig;
  }

  public static getConfigElement() {
    return document.createElement('easytv-card-editor');
  }

  public static getStubConfig(): Partial<EasyTVConfig> {
    return {
      name: 'My TV',
      remote_entity: 'remote.my_tv',
      tv_preset: 'roku',
      expand_mode: 'popup',
      sections: {
        dpad: true,
        playback: true,
        volume: true,
        app_selector: true,
        power: true,
      },
    };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private get _commands() {
    const base = TV_PRESETS[this._config.tv_preset];
    return { ...base, ...this._config.command_overrides };
  }

  private _sendCommand(command: string, holdSecs = 0) {
    this.hass.callService('remote', 'send_command', {
      entity_id: this._config.remote_entity,
      command,
      hold_secs: holdSecs,
    });
  }

  private _toggleExpanded() {
    if (this._config.expand_mode === 'popup' && this._config.popup_hash) {
      history.pushState(null, '', this._config.popup_hash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      this._expanded = !this._expanded;
    }
  }

  // ─── Sub-renderers ───────────────────────────────────────────────────────

  private _renderCompact() {
    const { name, icon, sections } = this._config;
    const cmds = this._commands;
    return html`
      <div class="compact-card glass">
        <div class="compact-left">
          <ha-icon icon=${icon ?? 'mdi:television'} class="tv-icon"></ha-icon>
          ${this._config.show_name ? html`<span class="tv-name">${name}</span>` : ''}
        </div>
        <div class="compact-actions">
          ${sections.volume ? html`
            <mwc-icon-button @click=${() => this._sendCommand(cmds.volume_down)}>
              <ha-icon icon="mdi:volume-minus"></ha-icon>
            </mwc-icon-button>
          ` : ''}
          ${sections.playback ? html`
            <mwc-icon-button @click=${() => this._sendCommand(cmds.play)}>
              <ha-icon icon="mdi:play-pause"></ha-icon>
            </mwc-icon-button>
          ` : ''}
          ${sections.volume ? html`
            <mwc-icon-button @click=${() => this._sendCommand(cmds.volume_up)}>
              <ha-icon icon="mdi:volume-plus"></ha-icon>
            </mwc-icon-button>
          ` : ''}
          <mwc-icon-button @click=${this._toggleExpanded}>
            <ha-icon icon="mdi:remote"></ha-icon>
          </mwc-icon-button>
        </div>
      </div>
    `;
  }

  private _renderDpad() {
    const cmds = this._commands;
    return html`
      <div class="section dpad-grid">
        <div></div>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.up)}><ha-icon icon="mdi:arrow-up-bold"></ha-icon></mwc-icon-button>
        <div></div>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.left)}><ha-icon icon="mdi:arrow-left-bold"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.select)}><ha-icon icon="mdi:keyboard-return"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.right)}><ha-icon icon="mdi:arrow-right-bold"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.back)}><ha-icon icon="mdi:arrow-left"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.down)}><ha-icon icon="mdi:arrow-down-bold"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.home)}><ha-icon icon="mdi:home-outline"></ha-icon></mwc-icon-button>
      </div>
    `;
  }

  private _renderPlayback() {
    const cmds = this._commands;
    return html`
      <div class="section playback-row">
        <mwc-icon-button @click=${() => this._sendCommand(cmds.reverse)}><ha-icon icon="mdi:skip-previous"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.play)}><ha-icon icon="mdi:play-pause"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.forward)}><ha-icon icon="mdi:skip-next"></ha-icon></mwc-icon-button>
      </div>
    `;
  }

  private _renderVolume() {
    const cmds = this._commands;
    return html`
      <div class="section volume-row">
        <mwc-icon-button @click=${() => this._sendCommand(cmds.volume_mute)}><ha-icon icon="mdi:volume-off"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.volume_down)}><ha-icon icon="mdi:volume-medium"></ha-icon></mwc-icon-button>
        <mwc-icon-button @click=${() => this._sendCommand(cmds.volume_up)}><ha-icon icon="mdi:volume-high"></ha-icon></mwc-icon-button>
      </div>
    `;
  }

  private _renderAppSelector() {
    if (!this._config.app_select_entity) return html``;
    return html`
      <div class="section app-row">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config.app_select_entity}
          label="App"
        ></ha-entity-picker>
      </div>
    `;
  }

  private _renderExpanded() {
    const { sections } = this._config;
    return html`
      <div class="expanded-card glass">
        <div class="expanded-header">
          <ha-icon icon=${this._config.icon ?? 'mdi:television'}></ha-icon>
          <span>${this._config.name}</span>
          <mwc-icon-button @click=${this._toggleExpanded}>
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </mwc-icon-button>
        </div>
        ${sections.app_selector ? this._renderAppSelector() : ''}
        ${sections.dpad ? this._renderDpad() : ''}
        ${sections.playback ? this._renderPlayback() : ''}
        ${sections.volume ? this._renderVolume() : ''}
      </div>
    `;
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config || !this.hass) return html``;
    return this._expanded && this._config.expand_mode === 'inline'
      ? this._renderExpanded()
      : this._renderCompact();
  }

  // ─── Styles ──────────────────────────────────────────────────────────────

  static styles = css`
    :host {
      display: block;
    }

    .glass {
      background-color: rgba(0, 0, 0, 0) !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3) !important;
      backdrop-filter: blur(5px) !important;
      -webkit-backdrop-filter: blur(5px) !important;
      border-radius: 12px;
      padding: 8px;
    }

    .compact-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
    }

    .compact-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tv-name {
      font-weight: 500;
      font-size: 14px;
    }

    .compact-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .expanded-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
    }

    .expanded-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }

    .expanded-header span {
      flex: 1;
    }

    .section {
      display: flex;
      justify-content: center;
    }

    .dpad-grid {
      display: grid;
      grid-template-columns: repeat(3, 48px);
      grid-template-rows: repeat(3, 48px);
      justify-content: center;
    }

    .playback-row,
    .volume-row {
      display: flex;
      justify-content: center;
      gap: 8px;
    }

    .app-row {
      padding: 0 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'easytv-card': EasyTVCard;
  }
}
