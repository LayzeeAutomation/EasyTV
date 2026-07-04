import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from './ha-types';
import type { EasyTVConfig } from './types';
import { TV_PRESETS } from './types';

@customElement('easytv-card-editor')
export class EasyTVCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private _config!: EasyTVConfig;

  public setConfig(config: EasyTVConfig): void {
    this._config = config;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private _valueChanged(ev: CustomEvent) {
    if (!this._config) return;
    const target = ev.target as HTMLInputElement;
    const key = target.dataset.key as keyof EasyTVConfig;
    const value = target.tagName === 'HA-SWITCH' ? target.checked : target.value;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: { ...this._config, [key]: value } },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _sectionChanged(ev: CustomEvent) {
    const target = ev.target as HTMLInputElement;
    const key = target.dataset.key as keyof EasyTVConfig['sections'];
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: {
          config: {
            ...this._config,
            sections: { ...this._config.sections, [key]: target.checked },
          },
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config) return html``;
    const { name, icon, remote_entity, media_player_entity, tracker_entity,
            app_select_entity, tv_preset, expand_mode, sections,
            show_name, glassmorphism, popup_hash } = this._config;

    return html`
      <div class="editor">

        <!-- GENERAL -->
        <h3>General</h3>
        <ha-textfield
          label="Name"
          .value=${name ?? ''}
          data-key="name"
          @change=${this._valueChanged}
        ></ha-textfield>
        <ha-textfield
          label="Icon (e.g. mdi:television)"
          .value=${icon ?? ''}
          data-key="icon"
          @change=${this._valueChanged}
        ></ha-textfield>

        <!-- ENTITIES -->
        <h3>Entities</h3>
        <ha-entity-picker
          label="Remote Entity (required)"
          .hass=${this.hass}
          .value=${remote_entity ?? ''}
          .includeDomains=${['remote']}
          data-key="remote_entity"
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Media Player Entity (optional)"
          .hass=${this.hass}
          .value=${media_player_entity ?? ''}
          .includeDomains=${['media_player']}
          data-key="media_player_entity"
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-entity-picker
          label="Device Tracker Entity (optional)"
          .hass=${this.hass}
          .value=${tracker_entity ?? ''}
          .includeDomains=${['device_tracker']}
          data-key="tracker_entity"
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-entity-picker
          label="App Select Entity (Roku only)"
          .hass=${this.hass}
          .value=${app_select_entity ?? ''}
          .includeDomains=${['select']}
          data-key="app_select_entity"
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>

        <!-- TV PRESET -->
        <h3>TV Preset</h3>
        <ha-select
          label="TV Preset"
          .value=${tv_preset}
          data-key="tv_preset"
          @selected=${this._valueChanged}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          ${Object.keys(TV_PRESETS).map(
            (p) => html`<mwc-list-item value=${p}>${p.replace('_', ' ').toUpperCase()}</mwc-list-item>`
          )}
        </ha-select>

        <!-- BEHAVIOUR -->
        <h3>Behaviour</h3>
        <ha-select
          label="Expand Mode"
          .value=${expand_mode}
          data-key="expand_mode"
          @selected=${this._valueChanged}
          @closed=${(e: Event) => e.stopPropagation()}
        >
          <mwc-list-item value="popup">Popup</mwc-list-item>
          <mwc-list-item value="inline">Inline Expand</mwc-list-item>
        </ha-select>
        ${expand_mode === 'popup' ? html`
          <ha-textfield
            label="Popup Hash (e.g. #MyTV-PopUp)"
            .value=${popup_hash ?? ''}
            data-key="popup_hash"
            @change=${this._valueChanged}
          ></ha-textfield>
        ` : ''}

        <!-- SECTIONS -->
        <h3>Sections</h3>
        <ha-formfield label="D-Pad Navigation">
          <ha-switch
            .checked=${sections?.dpad ?? true}
            data-key="dpad"
            @change=${this._sectionChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Playback Controls">
          <ha-switch
            .checked=${sections?.playback ?? true}
            data-key="playback"
            @change=${this._sectionChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Volume Controls">
          <ha-switch
            .checked=${sections?.volume ?? true}
            data-key="volume"
            @change=${this._sectionChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="App Selector (Roku)">
          <ha-switch
            .checked=${sections?.app_selector ?? true}
            data-key="app_selector"
            @change=${this._sectionChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Power Button">
          <ha-switch
            .checked=${sections?.power ?? true}
            data-key="power"
            @change=${this._sectionChanged}
          ></ha-switch>
        </ha-formfield>

        <!-- APPEARANCE -->
        <h3>Appearance</h3>
        <ha-formfield label="Show Name">
          <ha-switch
            .checked=${show_name ?? true}
            data-key="show_name"
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield label="Glassmorphism Style">
          <ha-switch
            .checked=${glassmorphism ?? true}
            data-key="glassmorphism"
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    h3 {
      margin: 8px 0 4px;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    ha-textfield,
    ha-entity-picker,
    ha-select {
      width: 100%;
    }
    ha-formfield {
      display: flex;
      justify-content: space-between;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'easytv-card-editor': EasyTVCardEditor;
  }
}
