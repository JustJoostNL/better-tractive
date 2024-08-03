import { IUserResponse } from "./api_types";

const tractiveClientId = "5728aa1fc9077f7c32000186";
const tractiveBaseUrl = "https://graph.tractive.com";

export enum TrackerCommand {
  LiveTracking = "live_tracking",
  BuzzerControl = "buzzer_control",
  LedControl = "led_control",
}

export enum ExportFormat {
  GPX = "gpx",
  KML = "kml",
}

class TractiveApiError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
  ) {
    super(message);
    this.name = "TractiveApiError";
  }
}

const authTokenPath = "/4/auth/token";

function userPath(userId: string) {
  return `/4/user/${userId}`;
}

function trackersPath(userId: string) {
  return `/4/user/${userId}/trackers`;
}

function trackerPath(trackerId: string) {
  return `/4/tracker/${trackerId}`;
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
  size: { width: string | number; height: string | number },
) {
  return `/4/media/resources/${mediaId}.${size.width.toString()}_${size.height.toString()}_1.jpg`;
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
  commandId: TrackerCommand,
  command: "on" | "off" | boolean,
) {
  const commandStr =
    typeof command === "boolean" ? (command ? "on" : "off") : command;
  return `/4/tracker/${trackerId}/command/${commandId}/${commandStr}`;
}

function geofencesPath(trackerId: string) {
  return `/4/tracker/${trackerId}/geofences`;
}

function geofencePath(fenceId: string) {
  return `/4/geofence/${fenceId}`;
}

function requestExportPath(
  trackerId: string,
  timeFrom: number,
  timeTo: number,
  format: ExportFormat,
) {
  return `/4/tracker/${trackerId}/positions/export?time_from=${timeFrom}&time_to=${timeTo}&format=${format}`;
}

function exportDownloadPath(
  trackerId: string,
  exportId: string,
  exportFormat: ExportFormat,
) {
  return `/4/tracker/${trackerId}/positions/export/${exportId}/export.${exportFormat}?format=${exportFormat}`;
}

function exportStatusPath(trackerId: string, exportId: string) {
  return `/4/tracker/${trackerId}/positions/export/${exportId}/status`;
}

function composeFetchOptions(
  method: string,
  authToken: string,
  body?: any,
  more?: any,
) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("X-Tractive-ID", tractiveClientId);
  headers.append("Authorization", `Bearer ${authToken}`);

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...more,
  };
}

// export async function getAuthToken(
//   email: string,
//   password: string,
// ): Promise<string | null> {
//   const response = await fetch(
//     tractiveBaseUrl + authTokenPath,
//     composeFetchOptions("POST", "", {
//       grant_type: "tractive",
//       platform_email: email,
//       platform_token: password,
//     }),
//   );

//   if (!response.ok) {
//     throw new TractiveApiError("Failed to get auth token", response);
//   }

//   const json: IAuthTokenResponse = await response.json();
//   return json.access_token || null;
// }

// export async function getUser(
//   userId: string,
//   authToken: string,
// ): Promise<IUserResponse> {
//   const response = await fetch(
//     tractiveBaseUrl + userPath(userId),
//     composeFetchOptions("GET", authToken),
//   );

//   if (!response.ok) {
//     throw new TractiveApiError("Failed to get user details", response);
//   }

//   const json = await response.json();
//   return json;
// }

// export async function getTrackers(
//   userId: string,
//   authToken: string,
// ): Promise<IObjectListResponse> {
//   const response = await fetch(
//     tractiveBaseUrl + trackersPath(userId),
//     composeFetchOptions("GET", authToken),
//   );

//   if (!response.ok) {
//     throw new TractiveApiError("Failed to get trackers", response);
//   }

//   const json = await response.json();
//   return await response.json();
// }

// export async function getTracker(
//   trackerId: string,
//   authToken: string,
// ): Promise<IObjectListResponse> {
//   const response = await fetch(
//     tractiveBaseUrl + trackerPath(trackerId),
//     composeFetchOptions("GET", authToken),
//   );

//   if (!response.ok) {
//     throw new TractiveApiError("Failed to get tracker", response);
//   }

//   return await response.json();
// }

// export async function getTrackableObjects(
//   userId: string,
//   authToken: string,
// ): Promise<IObjectListResponse> {
//   const response = await fetch(
//     tractiveBaseUrl + trackableObjectsPath(userId),
//     composeFetchOptions("GET", authToken),
//   );

//   if (!response.ok) {
//     throw new TractiveApiError("Failed to get trackable objects", response);
//   }

//   return await response.json();
// }

//we can don't have to define each function one by one because they are all similar
//instead we can define a generic function that takes the path and the parameters

enum ApiFunction {
  userPath,
  trackersPath,
  trackerPath,
  trackableObjectsPath,
  trackableObjectPath,
  deviceHardwareReportPath,
  devicePosReportPath,
  addressMetaByLocationPath,
  mediaResourcePath,
  weightActivityHistoryPath,
  positionHistoryPath,
  trackerCommandPath,
  geofencesPath,
  geofencePath,
  requestExportPath,
  exportDownloadPath,
  exportStatusPath,
}

type ApiFunctionTypes = {
  [ApiFunction.userPath]: () => string;
  [ApiFunction.trackersPath]: () => string;
  [ApiFunction.trackerPath]: (id: string) => string;
  [ApiFunction.trackableObjectsPath]: () => string;
  [ApiFunction.trackableObjectPath]: (id: string) => string;
  [ApiFunction.deviceHardwareReportPath]: (id: string) => string;
  [ApiFunction.devicePosReportPath]: (id: string) => string;
  [ApiFunction.addressMetaByLocationPath]: (lat: number, lon: number) => string;
  [ApiFunction.mediaResourcePath]: (
    id: string,
    size: { width: string | number; height: string | number },
  ) => string;
  [ApiFunction.weightActivityHistoryPath]: (id: string) => string;
  [ApiFunction.positionHistoryPath]: (
    timeFrom: number,
    timeTo: number,
    id: string,
    format: "json_segments",
  ) => string;
  [ApiFunction.trackerCommandPath]: (
    id: string,
    commandId: TrackerCommand,
    command: "on" | "off" | boolean,
  ) => string;
  [ApiFunction.geofencesPath]: (id: string) => string;
  [ApiFunction.geofencePath]: (id: string) => string;
  [ApiFunction.requestExportPath]: (
    id: string,
    timeFrom: number,
    timeTo: number,
    format: ExportFormat,
  ) => string;
  [ApiFunction.exportDownloadPath]: (
    id: string,
    exportId: string,
    format: ExportFormat,
  ) => string;
  [ApiFunction.exportStatusPath]: (id: string, exportId: string) => string;
};

const apiFunctionMap: Record<ApiFunction, ApiFunctionTypes[ApiFunction]> = {
  [ApiFunction.userPath]: userPath,
  [ApiFunction.trackersPath]: trackersPath,
  [ApiFunction.trackerPath]: trackerPath,
  [ApiFunction.trackableObjectsPath]: trackableObjectsPath,
  [ApiFunction.trackableObjectPath]: trackableObjectPath,
  [ApiFunction.deviceHardwareReportPath]: deviceHardwareReportPath,
  [ApiFunction.devicePosReportPath]: devicePosReportPath,
  [ApiFunction.addressMetaByLocationPath]: addressMetaByLocationPath,
  [ApiFunction.mediaResourcePath]: mediaResourcePath,
  [ApiFunction.weightActivityHistoryPath]: weightActivityHistoryPath,
  [ApiFunction.positionHistoryPath]: positionHistoryPath,
  [ApiFunction.trackerCommandPath]: trackerCommandPath,
  [ApiFunction.geofencesPath]: geofencesPath,
  [ApiFunction.geofencePath]: geofencePath,
  [ApiFunction.requestExportPath]: requestExportPath,
  [ApiFunction.exportDownloadPath]: exportDownloadPath,
  [ApiFunction.exportStatusPath]: exportStatusPath,
};

type ApiFunctionReturnTypes = {
  [ApiFunction.userPath]: IUserResponse;
  [ApiFunction.trackersPath]: unknown; // Replace with actual type
  [ApiFunction.trackerPath]: unknown; // Replace with actual type
  [ApiFunction.trackableObjectsPath]: unknown; // Replace with actual type
  [ApiFunction.trackableObjectPath]: unknown; // Replace with actual type
  [ApiFunction.deviceHardwareReportPath]: unknown; // Replace with actual type
  [ApiFunction.devicePosReportPath]: unknown; // Replace with actual type
  [ApiFunction.addressMetaByLocationPath]: unknown; // Replace with actual type
  [ApiFunction.mediaResourcePath]: unknown; // Replace with actual type
  [ApiFunction.weightActivityHistoryPath]: unknown; // Replace with actual type
  [ApiFunction.positionHistoryPath]: unknown; // Replace with actual type
  [ApiFunction.trackerCommandPath]: unknown; // Replace with actual type
  [ApiFunction.geofencesPath]: unknown; // Replace with actual type
  [ApiFunction.geofencePath]: unknown; // Replace with actual type
  [ApiFunction.requestExportPath]: unknown; // Replace with actual type
  [ApiFunction.exportDownloadPath]: unknown; // Replace with actual type
  [ApiFunction.exportStatusPath]: unknown; // Replace with actual type
};

export async function fetchTractiveApi<T extends ApiFunction>(
  authToken: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  apiFunction: T,
  ...args: Parameters<ApiFunctionTypes[T]>
): Promise<ApiFunctionReturnTypes[T]> {
  const response = await fetch(
    tractiveBaseUrl + apiFunctionMap[apiFunction](...args),
    composeFetchOptions(method, authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError(
      "Failed to fetch Tractive API: " + apiFunction.toString(),
      response,
    );
  }

  return response.json() as Promise<ApiFunctionReturnTypes[T]>;
}
