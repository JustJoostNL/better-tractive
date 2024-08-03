export const tractiveBaseUrl = "api/corsproxy?url=https://graph.tractive.com";
export const tractiveClientId = "5728aa1fc9077f7c32000186";

export enum TrackerCommand {
  LiveTracking = "live_tracking",
  BuzzerControl = "buzzer_control",
  LedControl = "led_control",
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
