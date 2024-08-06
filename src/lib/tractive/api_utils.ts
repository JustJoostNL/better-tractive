export const tractiveBaseUrl = "https://graph.tractive.com";
export const tractiveProxyUrl =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/crsp?url=${tractiveBaseUrl}`
    : `/api/crsp?url=${tractiveBaseUrl}`;
export const tractiveClientId = "5728aa1fc9077f7c32000186";

export enum TrackerCommand {
  LiveTracking = "live_tracking",
  BuzzerControl = "buzzer_control",
  LedControl = "led_control",
}

export enum LeaderboardType {
  LOCAL = "local",
  WORLDWIDE = "worldwide",
  BREED = "breed",
  FRIENDS = "friends",
}

export enum ExportFormat {
  GPX = "gpx",
  KML = "kml",
}

export class TractiveApiError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
  ) {
    super(message);
    this.name = "TractiveApiError";
  }
}

export function formatErrorMessage(error: TractiveApiError) {
  return `${error.message}: ${error.response?.status} (${error.response?.statusText})`;
}

export function composeFetchOptions(
  method: string,
  authToken: string,
  body?: any,
  more?: any,
) {
  return {
    method,
    headers: {
      Origin: "https://my.tractive.com",
      Referer: "https://my.tractive.com/",
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
      "X-Tractive-Client": tractiveClientId,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...more,
  };
}
