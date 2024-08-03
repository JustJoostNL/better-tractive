import fetch from "cross-fetch";
import {
  IAddressMetaResponse,
  IAuthTokenResponse,
  IDeviceHWReportResponse,
  IDevicePosReportResponse,
  IExportStatusResponse,
  IGeofenceResponse,
  IObjectListResponse,
  IPositionHistoryResponse,
  IRequestExportResponse,
  ITrackableObjectResponse,
  ITrackerResponse,
  IUserResponse,
  IWeightActivityHistoryResponse,
} from "./api_types";
import {
  composeFetchOptions,
  ExportFormat,
  TrackerCommand,
  TractiveApiError,
  tractiveBaseUrl,
} from "./api_utils";
import {
  authTokenPath,
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
  geofencePath,
  geofencesPath,
  requestExportPath,
  exportStatusPath,
  exportDownloadPath,
} from "./api_paths";

export async function getAuthToken(
  email: string,
  password: string,
): Promise<string | null> {
  const response = await fetch(
    tractiveBaseUrl + authTokenPath,
    composeFetchOptions("POST", "", {
      grant_type: "tractive",
      platform_email: email,
      platform_token: password,
    }),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get auth token", response);
  }

  const json: IAuthTokenResponse = await response.json();
  return json.access_token || null;
}

export async function getUser(
  userId: string,
  authToken: string,
): Promise<IUserResponse> {
  const response = await fetch(
    tractiveBaseUrl + userPath(userId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get user details", response);
  }

  const json = await response.json();
  return json;
}

export async function getTrackers(
  userId: string,
  authToken: string,
): Promise<IObjectListResponse> {
  const response = await fetch(
    tractiveBaseUrl + trackersPath(userId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get trackers", response);
  }

  const json = await response.json();
  return json;
}

export async function getTracker(
  trackerId: string,
  authToken: string,
): Promise<ITrackerResponse> {
  const response = await fetch(
    tractiveBaseUrl + trackerPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get tracker", response);
  }

  const json = await response.json();
  return json;
}

export async function getTrackableObjects(
  userId: string,
  authToken: string,
): Promise<IObjectListResponse> {
  const response = await fetch(
    tractiveBaseUrl + trackableObjectsPath(userId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get trackable objects", response);
  }

  const json = await response.json();
  return json;
}

export async function getTrackableObject(
  trackableObjectId: string,
  authToken: string,
): Promise<ITrackableObjectResponse> {
  const response = await fetch(
    tractiveBaseUrl + trackableObjectPath(trackableObjectId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get trackable object", response);
  }

  const json = await response.json();
  return json;
}

export async function getDeviceHardwareReport(
  trackerId: string,
  authToken: string,
): Promise<IDeviceHWReportResponse> {
  const response = await fetch(
    tractiveBaseUrl + deviceHardwareReportPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError(
      "Failed to get device hardware report",
      response,
    );
  }

  const json = await response.json();
  return json;
}

export async function getDevicePosReport(
  trackerId: string,
  authToken: string,
): Promise<IDevicePosReportResponse> {
  const response = await fetch(
    tractiveBaseUrl + devicePosReportPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get device pos report", response);
  }

  const json = await response.json();
  return json;
}

export async function getAddressMetaByLocation(
  latitude: number,
  longitude: number,
  authToken: string,
): Promise<IAddressMetaResponse> {
  const response = await fetch(
    tractiveBaseUrl + addressMetaByLocationPath(latitude, longitude),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError(
      "Failed to get address meta by location",
      response,
    );
  }

  const json = await response.json();
  return json;
}

export async function getMediaResource(
  mediaId: string,
  width: string | number,
  height: string | number,
  authToken: string,
): Promise<Blob> {
  const response = await fetch(
    tractiveBaseUrl + mediaResourcePath(mediaId, { width, height }),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get media resource", response);
  }

  const blob = await response.blob();
  return blob;
}

export async function getWeightActivityHistory(
  trackableObjectId: string,
  authToken: string,
): Promise<IWeightActivityHistoryResponse> {
  const response = await fetch(
    tractiveBaseUrl + weightActivityHistoryPath(trackableObjectId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError(
      "Failed to get weight activity history",
      response,
    );
  }

  const json = await response.json();
  return json;
}

export async function getPositionHistory(
  timeFrom: number,
  timeTo: number,
  trackerId: string,
  authToken: string,
): Promise<IPositionHistoryResponse> {
  const response = await fetch(
    tractiveBaseUrl +
      positionHistoryPath(timeFrom, timeTo, trackerId, "json_segments"),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get position history", response);
  }

  const json = await response.json();
  return json;
}

export async function mutateTrackerState(
  trackerId: string,
  commandId: TrackerCommand,
  command: "on" | "off" | boolean,
  authToken: string,
): Promise<unknown> {
  const response = await fetch(
    tractiveBaseUrl + trackerCommandPath(trackerId, commandId, command),
    composeFetchOptions("POST", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to mutate tracker state", response);
  }

  const json = await response.json();
  return json;
}

export async function getGeofences(
  trackerId: string,
  authToken: string,
): Promise<IGeofenceResponse> {
  const response = await fetch(
    tractiveBaseUrl + geofencesPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get geofences", response);
  }

  const json = await response.json();
  return json;
}

export async function getGeofence(
  fenceId: string,
  authToken: string,
): Promise<unknown[]> {
  const response = await fetch(
    tractiveBaseUrl + geofencePath(fenceId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get geofence", response);
  }

  const json = await response.json();
  return json;
}

export async function requestExport(
  trackerId: string,
  timeFrom: number,
  timeTo: number,
  format: ExportFormat,
  authToken: string,
): Promise<IRequestExportResponse> {
  const response = await fetch(
    tractiveBaseUrl + requestExportPath(trackerId, timeFrom, timeTo, format),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to request export", response);
  }

  const json = await response.json();
  return json;
}

export async function getExportStatus(
  trackerId: string,
  exportId: string,
  authToken: string,
): Promise<IExportStatusResponse> {
  const response = await fetch(
    tractiveBaseUrl + exportStatusPath(trackerId, exportId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get export status", response);
  }

  const json = await response.json();
  return json;
}

export async function downloadExport(
  trackerId: string,
  exportId: string,
  exportFormat: ExportFormat,
  authToken: string,
): Promise<Blob> {
  const response = await fetch(
    tractiveBaseUrl + exportDownloadPath(trackerId, exportId, exportFormat),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to download export", response);
  }

  const blob = await response.blob();
  return blob;
}
