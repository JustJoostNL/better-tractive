export interface IUserResponse {
  _id: string;
  _version: string;
  email: string;
  activated_at: number;
  profile_picture_id: string | null;
  membership_type: string;
  referral_bonus_type: string;
  guid: string;
  details: Details;
  demographics: Demographics;
  settings: Settings;
  invoice_address: InvoiceAddress;
  shelter: unknown;
  profile_pictures: string[];
  _type: string;
  has_active_push_token: boolean;
  role: string[];
  referral_link: string;
  terms_accepted_at: number;
  privacy_policy_accepted_at: number;
  uses_federated_login: boolean;
}

export interface Demographics {
  _id: string;
  _version: string;
  locale: string;
  language: string;
  country: string;
  is_language_set_by_user: boolean;
  _type: string;
}

export interface Details {
  _id: string;
  _version: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  birthday: number;
  _type: string;
  unit_distance: string;
  unit_weight: string;
  unit_temperature: string;
}

export interface InvoiceAddress {
  _id: string;
  _version: string;
  first_name: string;
  last_name: string;
  street_name: string | null;
  street_number: string | null;
  city: string | null;
  zip_code: string | null;
  _type: string;
  country: string | null;
  state: string | null;
}

export interface Settings {
  _id: string;
  _version: string;
  email: string;
  metric_system: boolean;
  preferred_map_type_street: string;
  preferred_map_type_hybrid: string;
  pos_request_allowed: boolean;
  get_live_position_feature_enabled: boolean;
  no_pet_survey: boolean | null;
  distance_unit: string;
  weight_unit: string;
  badge_celebrations_disabled: boolean | null;
  mail_settings: SettingsClass;
  push_settings: SettingsClass;
  web_push_settings: SettingsClass;
  push_sound_settings: null;
  _type: string;
}

export interface SettingsClass {
  _id: string;
  _version: string;
  user_registered?: boolean;
  geofence_in: boolean;
  geofence_out: boolean;
  battery_full: boolean;
  battery_low: boolean;
  battery_critical: boolean;
  battery_empty: boolean;
  charging_reminder: boolean;
  tracker_clip_lost?: boolean;
  tracker_temperature_high_warning: boolean;
  tracker_temperature_low_warning: boolean;
  tracker_startup_shutdown: boolean;
  sharing: boolean;
  wellness_and_activity: boolean;
  point_of_interest_warnings: boolean;
  _type: string;
  support?: boolean;
}

export interface IAuthTokenResponse {
  //normal
  user_id?: string;
  client_id?: string;
  expires_at?: number;
  /*
   - Tokens are valid for 1 week
  */
  access_token?: string;
  //error
  code?: number;
  category?: string;
  message?: string;
  detail?: string | null;
}

//object list is either a tracker list of trackable object list
export type IObjectListResponse = ObjectItem[];
export interface ObjectItem {
  _id: string;
  _type: string;
  _version: string;
}
