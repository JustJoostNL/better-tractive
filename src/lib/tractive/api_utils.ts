export const tractiveBaseUrl = "https://graph.tractive.com";
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
