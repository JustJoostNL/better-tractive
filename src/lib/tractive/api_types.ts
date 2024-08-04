export interface IUserResponse {
  _id: string;
  _version: string;
  email: string;
  activated_at: number;
  profile_picture_id: string | null;
  membership_type: string;
  referral_bonus_type: string;
  guid: string;
  details: UserDetails;
  demographics: Demographics;
  settings: UserSettings;
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

export interface UserDetails {
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

export interface UserSettings {
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
  mail_settings: UserSettingsClass;
  push_settings: UserSettingsClass;
  web_push_settings: UserSettingsClass;
  push_sound_settings: null;
  _type: string;
}

export interface UserSettingsClass {
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

export interface ITrackerResponse {
  _id: string;
  _version: string;
  hw_id: string;
  model_number: string;
  hw_edition: string;
  bluetooth_mac: null;
  geofence_sensitivity: string;
  battery_save_mode: null;
  read_only: boolean;
  read_only_since: number;
  demo: boolean;
  self_test_available: boolean;
  capabilities: string[];
  supported_geofence_types: string[];
  fw_version: string;
  state: string;
  state_reason: string;
  charging_state: string;
  battery_state: string;
  power_saving_zone_id: string;
  prioritized_zone_id: string;
  prioritized_zone_type: string;
  prioritized_zone_last_seen_at: number;
  prioritized_zone_entered_at: number;
  _type: string;
}

export interface ITrackableObjectResponse {
  _id: string;
  _version: string;
  type: string;
  leaderboard_opt_out: boolean;
  device_id: string;
  _type: string;
  details: TrackableObjectDetails;
  read_only: boolean;
  created_at: number;
}

export interface TrackableObjectDetails {
  name: string;
  pet_type: string;
  breed_ids: string[];
  gender: string;
  birthday: number;
  profile_picture_frame: string | null;
  height: number | null;
  weight: number | null;
  chip_id: string | null;
  neutered: boolean;
  lim: string | number | null;
  ribcage: string | number | null;
  weight_is_default: boolean | null;
  height_is_default: boolean | null;
  instagram_username: string | null;
  profile_picture_id: string;
  cover_picture_id: string;
  characteristic_ids: string[];
  gallery_picture_ids: string[];
  _id: string;
  _type: string;
  _version: string;
  read_only: boolean;
}

export interface IDeviceHWReportResponse {
  time: number;
  battery_level: number;
  clip_mounted_state: string | null;
  _id: string;
  _type: string;
  _version: string;
  report_id: string;
  power_saving_zone_id: string;
  hw_status: string | null;
}

export interface IDevicePosReportResponse {
  time: number;
  time_rcvd: number;
  pos_status: string | null;
  latlong: number[];
  speed: string | number | null;
  pos_uncertainty: number;
  _id: string;
  _type: string;
  _version: string;
  altitude: number;
  report_id: string;
  sensor_used: string;
  nearby_user_id: string | null;
  power_saving_zone_id: string;
}

export interface IAddressMetaResponse {
  street: string;
  house_number: string;
  zip_code: string;
  city: string;
  country: string;
  full_address: string;
}

export interface IWeightActivityHistoryResponse {
  _id: string;
  _type: string;
  _version: string;
  value: number;
  interval_start: number;
  inverval_end: number;
  data: Array<number[]>;
}

export type IPositionHistoryResponse = IPositionHistoryItem[];
interface IPositionHistoryItem {
  time: number;
  latlong: number[];
  alt: number;
  speed: number | null;
  course: number | null;
  pos_uncertainty: number;
  sensor_used: SensorUsed;
}

export enum SensorUsed {
  GPS = "GPS",
  KNOWN_WIFI = "KNOWN_WIFI",
}

export type IGeofenceResponse = IGeofenceItem[];
export interface IGeofenceItem {
  _id: string;
  _type: string;
  _version: string;
}

export interface IRequestExportResponse {
  eid: string;
}

export interface IExportStatusResponse {
  status: boolean;
}

export type IBulkResponse = BulkItem[];
export interface BulkItem {
  _id: string;
  created_at?: number;
  updated_at?: number;
  _version: string;
  index?: number;
  shape?: string;
  coords?: Array<number[]>;
  radius?: number;
  trigger?: Trigger[];
  active: boolean;
  home_flag?: boolean;
  deleted_at?: number | null;
  name?: string;
  icon?: string;
  source_geofence_id?: string | null;
  fence_type?: string;
  entered_at?: number | null;
  device?: ObjectItem;
  _type: string;
  started_at?: number | null;
  timeout?: number;
  remaining?: number;
  pending?: boolean;
  reconnecting?: boolean;
}

export enum Trigger {
  InToOut = "IN_TO_OUT",
  OutToIn = "OUT_TO_IN",
}

export interface IMutateTrackerStateResponse {
  active: boolean;
  started_at: null;
  timeout: number;
  remaining: number;
  pending: boolean;
}
