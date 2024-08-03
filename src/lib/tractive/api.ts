const tractiveClientId = "5728aa1fc9077f7c32000186";
const tractiveBaseUrl = "https://graph.tractive.com";

const authTokenPath = "/4/auth/token";

function userPath(userId: string) {
  return `/4/user/${userId}`;
}

function trackableObjectsPath(userId: string) {
  return `/4/user/${userId}/trackable_objects`;
}

function trackableObjectPath(trackableObjectId: string) {
  return `/4/trackable_object/${trackableObjectId}`;
}

function deviceHardwareReportPath(trackerId: string) {
  return `/4/device_hw_report/${trackerId}`;
}

function devicePosReportPath(trackerId: string) {
  return `/4/device_pos_report/${trackerId}`;
}

function addressMetaByLocationPath(lat: number, lon: number) {
  return `/4/platform/geo/address/location?latitude=${lat}&longitude=${lon}`;
}

function mediaResourcePath(
  mediaId: string,
  size: { width: number; height: number },
) {
  return `/4/media/resources/${mediaId}.${size.width}_${size.height}_1.jpg`;
}

function weightActivityHistoryPath(trackableObjectId: string) {
  return `/4/weight_activity_history/${trackableObjectId}`;
}

function positionHistoryPath(
  timeFrom: number,
  timeTo: number,
  trackerId: string,
  format: "json_segments",
) {
  return `/4/tracker/${trackerId}/positions?time_from=${timeFrom}&time_to=${timeTo}&format=${format}`;
}

function trackerCommandPath(
  trackerId: string,
  commandId: "live_tracking" | "buzzer_control" | "led_control",
  command: "on" | "off" | boolean,
) {
  const commandStr =
    typeof command === "boolean" ? (command ? "on" : "off") : command;
  return `/4/tracker/${trackerId}/command/${commandId}/${commandStr}`;
}

function geofencesPath(trackerId: string) {
  return `/4/tracker/${trackerId}/geofences`;
}
