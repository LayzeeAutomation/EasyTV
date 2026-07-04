// EasyTV Card v0.1.2
// https://github.com/LayzeeAutomation/EasyTV

const TV_PRESETS = {
  roku: {
    up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',
    play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',
    volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute',power:'power',
  },
  google_tv: {
    up:'DPAD_UP',down:'DPAD_DOWN',left:'DPAD_LEFT',right:'DPAD_RIGHT',select:'DPAD_CENTER',
    back:'BACK',home:'HOME',play:'MEDIA_PLAY_PAUSE',pause:'MEDIA_PAUSE',stop:'MEDIA_STOP',
    forward:'MEDIA_NEXT',reverse:'MEDIA_PREVIOUS',
    volume_up:'VOLUME_UP',volume_down:'VOLUME_DOWN',volume_mute:'VOLUME_MUTE',power:'POWER',
  },
  samsung: {
    up:'KEY_UP',down:'KEY_DOWN',left:'KEY_LEFT',right:'KEY_RIGHT',select:'KEY_ENTER',
    back:'KEY_RETURN',home:'KEY_HOME',play:'KEY_PLAY',pause:'KEY_PAUSE',stop:'KEY_STOP',
    forward:'KEY_FF',reverse:'KEY_REWIND',
    volume_up:'KEY_VOLUP',volume_down:'KEY_VOLDOWN',volume_mute:'KEY_MUTE',power:'KEY_POWER',
  },
  generic: {
    up:'up',down:'down',left:'left',right:'right',select:'select',back:'back',home:'home',
    play:'play',pause:'pause',stop:'stop',forward:'forward',reverse:'reverse',
    volume_up:'volume_up',volume_down:'volume_down',volume_mute:'volume_mute',
  },
};

const DEFAULT_SECTIONS = {dpad:true,playback:true,volume:true,app_selector:true,power:true};

const CARD_STYLES = `
  :host{display:block;}
  ha-card{background:transparent!important;box-shadow:none!important;overflow:visible;}
  .glass{
    background:rgba(0,0,0,0)!important;
    border:1px solid rgba(255,255,255,0.2)!important;
    box-shadow:4px 4px 12px rgba(0,0,0,0.3)!important;
    backdrop-filter:blur(5px)!important;
    -webkit-backdrop-filter:blur(5px)!important;
    border-radius:12px;padding:8px 12px;
  }
  .compact{display:flex;align-items:center;justify-content:space-between;}
  .compact-left{display:flex;align-items:center;gap:8px;}
  .tv-name{font-weight:500;font-size:14px;color:var(--primary-text-color);}
  .compact-actions{display:flex;align-items:center;gap:2px;}
  .icon-btn{
    background:none;border:none;cursor:pointer;color:var(--primary-text-color);
    padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    transition:background 0.15s;
  }
  .icon-btn:hover{background:rgba(255,255,255,0.1);}
  .icon-btn:active{background:rgba(255,255,255,0.2);}
  .expanded{display:flex;flex-direction:column;gap:10px;padding:12px;}
  .exp-header{display:flex;align-items:center;gap:8px;font-weight:600;font-size:15px;color:var(--primary-text-color);}
  .exp-header span{flex:1;}
  .section{display:flex;justify-content:center;}
  .dpad-grid{display:grid;grid-template-columns:repeat(3,48px);grid-template-rows:repeat(3,48px);justify-content:center;gap:2px;}
  .playback-row,.volume-row{display:flex;justify-content:center;gap:8px;}
  .app-row{padding:0 4px;}
  .app-row select{
    width:100%;padding:6px 8px;border-radius:8px;
    background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);
    color:var(--primary-text-color);font-size:13px;
  }
`;

const EDITOR_STYLES = `
  .editor{display:flex;flex-direction:column;gap:12px;padding:16px;}
  h3{margin:8px 0 4px;font-size:13px;font-weight:600;color:var(--primary-color);text-transform:uppercase;letter-spacing:0.05em;}
  ha-textfield,ha-entity-picker,ha-select{width:100%;}
  ha-formfield{display:flex;justify-content:space-between;}
`;

function mkIcon(name){const el=document.createElement('ha-icon');el.setAttribute('icon',name);return el;}
function iconBtn(iconName,onClick,title=''){
  const btn=document.createElement('button');
  btn.className='icon-btn';btn.title=title;
  btn.appendChild(mkIcon(iconName));
  btn.addEventListener('click',onClick);
  return btn;
}

class EasyTVCard extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});this._expanded=false;}

  set hass(hass){this._hass=hass;this._render();}

  setConfig(config){
    if(!config.remote_entity)throw new Error('EasyTV: remote_entity is required');
    this._config={
      tv_preset:'roku',
      expand_mode:'inline',
      show_name:true,
      glassmorphism:true,
      sections:{...DEFAULT_SECTIONS},
      ...config,
      sections:{...DEFAULT_SECTIONS,...(config.sections||{})},
    };
    this._render();
  }

  static getConfigElement(){return document.createElement('easytv-card-editor');}

  static getStubConfig(){
    return {name:'My TV',remote_entity:'remote.my_tv',tv_preset:'roku',expand_mode:'inline',sections:{...DEFAULT_SECTIONS}};
  }

  get _commands(){
    const base=TV_PRESETS[this._config.tv_preset]||TV_PRESETS.generic;
    return {...base,...(this._config.command_overrides||{})};
  }

  _send(command,holdSecs=0){
    if(!this._hass)return;
    this._hass.callService('remote','send_command',{entity_id:this._config.remote_entity,command,hold_secs:holdSecs});
  }

  _toggleExpanded(){
    const{expand_mode,popup_hash}=this._config;
    // If popup mode AND a hash is set, navigate to the popup
    if(expand_mode==='popup'&&popup_hash&&popup_hash.trim()!==''){
      history.pushState(null,'',popup_hash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      // Always fall back to inline expand if popup is misconfigured or mode is inline
      this._expanded=!this._expanded;
      this._render();
    }
  }

  _dpad(){
    const c=this._commands;
    const grid=document.createElement('div');grid.className='section dpad-grid';
    const layout=[
      [null,null],['mdi:arrow-up-bold',()=>this._send(c.up),'Up'],[null,null],
      ['mdi:arrow-left-bold',()=>this._send(c.left),'Left'],
      ['mdi:keyboard-return',()=>this._send(c.select),'Select'],
      ['mdi:arrow-right-bold',()=>this._send(c.right),'Right'],
      ['mdi:arrow-left',()=>this._send(c.back),'Back'],
      ['mdi:arrow-down-bold',()=>this._send(c.down),'Down'],
      ['mdi:home-outline',()=>this._send(c.home),'Home'],
    ];
    layout.forEach(([ico,fn,t])=>{
      if(ico)grid.appendChild(iconBtn(ico,fn,t));
      else grid.appendChild(document.createElement('div'));
    });
    return grid;
  }

  _playback(){
    const c=this._commands;
    const row=document.createElement('div');row.className='section playback-row';
    row.appendChild(iconBtn('mdi:skip-previous',()=>this._send(c.reverse),'Previous'));
    row.appendChild(iconBtn('mdi:play-pause',()=>this._send(c.play),'Play/Pause'));
    row.appendChild(iconBtn('mdi:skip-next',()=>this._send(c.forward),'Next'));
    return row;
  }

  _volume(){
    const c=this._commands;
    const row=document.createElement('div');row.className='section volume-row';
    row.appendChild(iconBtn('mdi:volume-off',()=>this._send(c.volume_mute),'Mute'));
    row.appendChild(iconBtn('mdi:volume-medium',()=>this._send(c.volume_down),'Volume Down'));
    row.appendChild(iconBtn('mdi:volume-high',()=>this._send(c.volume_up),'Volume Up'));
    return row;
  }

  _appSelector(){
    const{app_select_entity}=this._config;
    if(!app_select_entity||!this._hass)return null;
    const state=this._hass.states[app_select_entity];
    if(!state)return null;
    const options=state.attributes.options||[];
    const wrap=document.createElement('div');wrap.className='section app-row';
    const sel=document.createElement('select');
    options.forEach(opt=>{
      const o=document.createElement('option');
      o.value=opt;o.textContent=opt;
      if(opt===state.state)o.selected=true;
      sel.appendChild(o);
    });
    sel.addEventListener('change',(e)=>{
      this._hass.callService('select','select_option',{entity_id:app_select_entity,option:e.target.value});
    });
    wrap.appendChild(sel);
    return wrap;
  }

  _compactView(){
    const{name,icon:ico,sections,show_name,glassmorphism}=this._config;
    const c=this._commands;
    const wrap=document.createElement('div');
    wrap.className='compact'+(glassmorphism?' glass':'');
    const left=document.createElement('div');left.className='compact-left';
    left.appendChild(mkIcon(ico||'mdi:television'));
    if(show_name!==false){const s=document.createElement('span');s.className='tv-name';s.textContent=name||'TV';left.appendChild(s);}
    const actions=document.createElement('div');actions.className='compact-actions';
    if(sections.volume)actions.appendChild(iconBtn('mdi:volume-minus',()=>this._send(c.volume_down),'Volume Down'));
    if(sections.playback)actions.appendChild(iconBtn('mdi:play-pause',()=>this._send(c.play),'Play/Pause'));
    if(sections.volume)actions.appendChild(iconBtn('mdi:volume-plus',()=>this._send(c.volume_up),'Volume Up'));
    actions.appendChild(iconBtn('mdi:remote',()=>this._toggleExpanded(),'Open Remote'));
    wrap.appendChild(left);wrap.appendChild(actions);
    return wrap;
  }

  _expandedView(){
    const{name,icon:ico,sections,glassmorphism}=this._config;
    const wrap=document.createElement('div');wrap.className='expanded'+(glassmorphism?' glass':'');
    const header=document.createElement('div');header.className='exp-header';
    header.appendChild(mkIcon(ico||'mdi:television'));
    const title=document.createElement('span');title.textContent=name||'TV';header.appendChild(title);
    header.appendChild(iconBtn('mdi:chevron-up',()=>this._toggleExpanded(),'Close'));
    wrap.appendChild(header);
    if(sections.app_selector){const a=this._appSelector();if(a)wrap.appendChild(a);}
    if(sections.dpad)wrap.appendChild(this._dpad());
    if(sections.playback)wrap.appendChild(this._playback());
    if(sections.volume)wrap.appendChild(this._volume());
    return wrap;
  }

  _render(){
    if(!this._config)return;
    const root=this.shadowRoot;root.innerHTML='';
    const style=document.createElement('style');style.textContent=CARD_STYLES;root.appendChild(style);
    const card=document.createElement('ha-card');
    card.appendChild((this._expanded)?this._expandedView():this._compactView());
    root.appendChild(card);
  }

  getCardSize(){return this._expanded?6:(this._config?.compact_rows||2);}
}

class EasyTVCardEditor extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});}
  set hass(hass){this._hass=hass;}
  setConfig(config){this._config=config;this._render();}

  _fire(config){
    this.dispatchEvent(new CustomEvent('config-changed',{detail:{config},bubbles:true,composed:true}));
  }
  _set(key,value){this._fire({...this._config,[key]:value});}
  _setSection(key,value){this._fire({...this._config,sections:{...this._config.sections,[key]:value}});}

  _render(){
    if(!this._config)return;
    const c=this._config;
    const s=c.sections||{};
    const root=this.shadowRoot;
    root.innerHTML=`
      <style>${EDITOR_STYLES}</style>
      <div class="editor">
        <h3>General</h3>
        <ha-textfield label="Name" value="${c.name||''}" data-key="name"></ha-textfield>
        <ha-textfield label="Icon (e.g. mdi:television)" value="${c.icon||''}" data-key="icon"></ha-textfield>
        <h3>Entities</h3>
        <ha-entity-picker label="Remote Entity (required)" data-key="remote_entity"></ha-entity-picker>
        <ha-entity-picker label="Media Player Entity (optional)" data-key="media_player_entity"></ha-entity-picker>
        <ha-entity-picker label="Device Tracker (optional)" data-key="tracker_entity"></ha-entity-picker>
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
        <ha-textfield label="Popup Hash (e.g. #MyTV-PopUp)" value="${c.popup_hash||''}" data-key="popup_hash"></ha-textfield>
        <h3>Sections</h3>
        <ha-formfield label="D-Pad Navigation"><ha-switch data-section="dpad" ${s.dpad!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Playback Controls"><ha-switch data-section="playback" ${s.playback!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Volume Controls"><ha-switch data-section="volume" ${s.volume!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="App Selector (Roku)"><ha-switch data-section="app_selector" ${s.app_selector!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Power Button"><ha-switch data-section="power" ${s.power!==false?'checked':''}></ha-switch></ha-formfield>
        <h3>Appearance</h3>
        <ha-formfield label="Show Name"><ha-switch data-key-bool="show_name" ${c.show_name!==false?'checked':''}></ha-switch></ha-formfield>
        <ha-formfield label="Glassmorphism Style"><ha-switch data-key-bool="glassmorphism" ${c.glassmorphism!==false?'checked':''}></ha-switch></ha-formfield>
      </div>
    `;
    root.querySelectorAll('ha-entity-picker').forEach(el=>{
      el.hass=this._hass;
      el.value=c[el.dataset.key]||'';
      el.addEventListener('value-changed',(e)=>this._set(el.dataset.key,e.detail.value));
    });
    root.querySelectorAll('ha-textfield').forEach(el=>{
      el.addEventListener('change',(e)=>this._set(e.target.dataset.key,e.target.value));
    });
    root.querySelectorAll('ha-select').forEach(el=>{
      el.value=c[el.dataset.key]||'';
      el.addEventListener('selected',()=>{if(el.dataset.key)this._set(el.dataset.key,el.value);});
      el.addEventListener('closed',(e)=>e.stopPropagation());
    });
    root.querySelectorAll('ha-switch[data-section]').forEach(el=>{
      el.addEventListener('change',()=>this._setSection(el.dataset.section,el.checked));
    });
    root.querySelectorAll('ha-switch[data-key-bool]').forEach(el=>{
      el.addEventListener('change',()=>this._set(el.dataset.keyBool,el.checked));
    });
  }
}

customElements.define('easytv-card',EasyTVCard);
customElements.define('easytv-card-editor',EasyTVCardEditor);

window.customCards=window.customCards||[];
window.customCards.push({
  type:'easytv-card',
  name:'EasyTV Card',
  description:'TV remote control card with visual editor, multi-TV presets, and compact/expanded views',
  preview:true,
});
