import { TrackerCommand, ExportFormat, LeaderboardType } from "./api_utils";

export const authTokenPath = "/4/auth/token";

export function userPath(userId: string) {
  return `/4/user/${userId}`;
}

export function trackersPath(userId: string) {
  return `/4/user/${userId}/trackers`;
}

export function trackerPath(trackerId: string) {
  return `/4/tracker/${trackerId}`;
}

export function trackableObjectsPath(userId: string) {
  return `/4/user/${userId}/trackable_objects`;
}

export function trackableObjectPath(trackableObjectId: string) {
  return `/4/trackable_object/${trackableObjectId}`;
}

export function deviceHardwareReportPath(trackerId: string) {
  return `/4/device_hw_report/${trackerId}`;
}

export function devicePosReportPath(trackerId: string) {
  return `/4/device_pos_report/${trackerId}`;
}

export function addressMetaByLocationPath(lat: number, lon: number) {
  return `/4/platform/geo/address/location?latitude=${lat}&longitude=${lon}`;
}

export function mediaResourcePath(
  mediaId: string,
  size: { width: string | number; height: string | number },
) {
  return `/4/media/resource/${mediaId}.${size.width.toString()}_${size.height.toString()}_1.jpg`;
}

export function mediaProfilePath(
  userId: string,
  size: { width: string | number; height: string | number },
) {
  return `/4/media/profile/${userId}.${size.width.toString()}_${size.height.toString()}_1.jpg`;
}

export function weightActivityHistoryPath(trackableObjectId: string) {
  return `/4/weight_activity_history/${trackableObjectId}`;
}

export function positionHistoryPath(
  timeFrom: number,
  timeTo: number,
  trackerId: string,
  format: "json_segments",
) {
  return `/4/tracker/${trackerId}/positions?time_from=${timeFrom}&time_to=${timeTo}&format=${format}`;
}

export function trackerCommandPath(
  trackerId: string,
  commandId: TrackerCommand,
  command: "on" | "off" | boolean,
) {
  const commandStr =
    typeof command === "boolean" ? (command ? "on" : "off") : command;
  return `/4/tracker/${trackerId}/command/${commandId}/${commandStr}`;
}

export function bulkRequestPath(partial: boolean = true) {
  const partialNum = partial ? 1 : 0;

  return `/4/bulk?partial=${partialNum}`;
}

export function geofencesPath(trackerId: string) {
  return `/4/tracker/${trackerId}/geofences`;
}

export function leaderbordPath(
  petId: string,
  boardType: LeaderboardType,
  boardLimit: string | number,
  petLimit: string | number,
  year: string | number,
  month: string | number,
) {
  return `/4/stream/boards/${boardType}?board_limit=${boardLimit}&pet_id=${petId}&pet_limit=${petLimit}&local_year=${year}&local_month=${month}`;
}

export function requestExportPath(
  trackerId: string,
  timeFrom: number,
  timeTo: number,
  format: ExportFormat,
) {
  return `/4/tracker/${trackerId}/positions/export?time_from=${timeFrom}&time_to=${timeTo}&format=${format}`;
}

export function exportStatusPath(trackerId: string, exportId: string) {
  return `/4/tracker/${trackerId}/positions/export/${exportId}/status`;
}

export function exportDownloadPath(
  trackerId: string,
  exportId: string,
  exportFormat: ExportFormat,
) {
  return `/4/tracker/${trackerId}/positions/export/${exportId}/export.${exportFormat}?format=${exportFormat}`;
}
