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
  tractiveProxyUrl,
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
): Promise<{ token: string | undefined; userId: string | undefined }> {
  const response = await fetch(
    tractiveProxyUrl + authTokenPath,
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
  return { token: json.access_token, userId: json.user_id };
}

export async function getUser({
  userId,
  authToken,
}: {
  userId: string;
  authToken: string;
}): Promise<IUserResponse> {
  const response = await fetch(
    tractiveProxyUrl + userPath(userId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get user details", response);
  }

  const json = await response.json();
  return json;
}

export async function getTrackers({
  userId,
  authToken,
}: {
  userId: string;
  authToken: string;
}): Promise<IObjectListResponse> {
  const response = await fetch(
    tractiveProxyUrl + trackersPath(userId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get trackers", response);
  }

  const json = await response.json();
  return json;
}

export async function getTracker({
  trackerId,
  authToken,
}: {
  trackerId: string;
  authToken: string;
}): Promise<ITrackerResponse> {
  const response = await fetch(
    tractiveProxyUrl + trackerPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get tracker", response);
  }

  const json = await response.json();
  return json;
}

export async function getTrackableObjects({
  userId,
  authToken,
}: {
  userId: string;
  authToken: string;
}): Promise<IObjectListResponse> {
  const response = await fetch(
    tractiveProxyUrl + trackableObjectsPath(userId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get trackable objects", response);
  }

  const json = await response.json();
  return json;
}

export async function getTrackableObject({
  trackableObjectId,
  authToken,
}: {
  trackableObjectId: string;
  authToken: string;
}): Promise<ITrackableObjectResponse> {
  const response = await fetch(
    tractiveProxyUrl + trackableObjectPath(trackableObjectId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get trackable object", response);
  }

  const json = await response.json();
  return json;
}

export async function getDeviceHardwareReport({
  trackerId,
  authToken,
}: {
  trackerId: string;
  authToken: string;
}): Promise<IDeviceHWReportResponse> {
  const response = await fetch(
    tractiveProxyUrl + deviceHardwareReportPath(trackerId),
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

export async function getDevicePosReport({
  trackerId,
  authToken,
}: {
  trackerId: string;
  authToken: string;
}): Promise<IDevicePosReportResponse> {
  const response = await fetch(
    tractiveProxyUrl + devicePosReportPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get device pos report", response);
  }

  const json = await response.json();
  return json;
}

export async function getAddressMetaByLocation({
  latitude,
  longitude,
  authToken,
}: {
  latitude: number;
  longitude: number;
  authToken: string;
}): Promise<IAddressMetaResponse> {
  const response = await fetch(
    tractiveProxyUrl + addressMetaByLocationPath(latitude, longitude),
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

export async function getMediaResource({
  mediaId,
  width,
  height,
  authToken,
}: {
  mediaId: string;
  width: string | number;
  height: string | number;
  authToken: string;
}): Promise<Blob> {
  const response = await fetch(
    tractiveProxyUrl + mediaResourcePath(mediaId, { width, height }),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get media resource", response);
  }

  const blob = await response.blob();
  return blob;
}

export async function getWeightActivityHistory({
  trackableObjectId,
  authToken,
}: {
  trackableObjectId: string;
  authToken: string;
}): Promise<IWeightActivityHistoryResponse> {
  const response = await fetch(
    tractiveProxyUrl + weightActivityHistoryPath(trackableObjectId),
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

export async function getPositionHistory({
  timeFrom,
  timeTo,
  trackerId,
  authToken,
}: {
  timeFrom: number;
  timeTo: number;
  trackerId: string;
  authToken: string;
}): Promise<IPositionHistoryResponse> {
  const response = await fetch(
    tractiveProxyUrl +
      positionHistoryPath(timeFrom, timeTo, trackerId, "json_segments"),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get position history", response);
  }

  const json = await response.json();
  return json;
}

export async function mutateTrackerState({
  trackerId,
  commandId,
  command,
  authToken,
}: {
  trackerId: string;
  commandId: TrackerCommand;
  command: "on" | "off" | boolean;
  authToken: string;
}): Promise<unknown> {
  const response = await fetch(
    tractiveProxyUrl + trackerCommandPath(trackerId, commandId, command),
    composeFetchOptions("POST", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to mutate tracker state", response);
  }

  const json = await response.json();
  return json;
}

export async function getGeofences({
  trackerId,
  authToken,
}: {
  trackerId: string;
  authToken: string;
}): Promise<IGeofenceResponse> {
  const response = await fetch(
    tractiveProxyUrl + geofencesPath(trackerId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get geofences", response);
  }

  const json = await response.json();
  return json;
}

export async function getGeofence({
  fenceId,
  authToken,
}: {
  fenceId: string;
  authToken: string;
}): Promise<unknown[]> {
  const response = await fetch(
    tractiveProxyUrl + geofencePath(fenceId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get geofence", response);
  }

  const json = await response.json();
  return json;
}

export async function requestExport({
  trackerId,
  timeFrom,
  timeTo,
  format,
  authToken,
}: {
  trackerId: string;
  timeFrom: number;
  timeTo: number;
  format: ExportFormat;
  authToken: string;
}): Promise<IRequestExportResponse> {
  const response = await fetch(
    tractiveProxyUrl + requestExportPath(trackerId, timeFrom, timeTo, format),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to request export", response);
  }

  const json = await response.json();
  return json;
}

export async function getExportStatus({
  trackerId,
  exportId,
  authToken,
}: {
  trackerId: string;
  exportId: string;
  authToken: string;
}): Promise<IExportStatusResponse> {
  const response = await fetch(
    tractiveProxyUrl + exportStatusPath(trackerId, exportId),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to get export status", response);
  }

  const json = await response.json();
  return json;
}

export async function downloadExport({
  trackerId,
  exportId,
  exportFormat,
  authToken,
}: {
  trackerId: string;
  exportId: string;
  exportFormat: ExportFormat;
  authToken: string;
}): Promise<Blob> {
  const response = await fetch(
    tractiveProxyUrl + exportDownloadPath(trackerId, exportId, exportFormat),
    composeFetchOptions("GET", authToken),
  );

  if (!response.ok) {
    throw new TractiveApiError("Failed to download export", response);
  }

  const blob = await response.blob();
  return blob;
}
