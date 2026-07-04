// Minimal Home Assistant type stubs for TypeScript compilation
// These mirror the HA frontend types without pulling in the full dependency

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, HassServiceTarget>>;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: HassServiceTarget
  ): Promise<void>;
  language: string;
  locale: { language: string; number_format: string };
  themes: Record<string, unknown>;
  user: { name: string; is_admin: boolean };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: { id: string };
}

export interface HassServiceTarget {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
}
