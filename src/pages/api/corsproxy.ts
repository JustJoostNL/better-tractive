import { NextApiRequest, NextApiResponse } from "next";

const skippedPassthroughHeaders = [
  "host",
  "user-agent",
  "content-length",
  "accept",
  "accept-encoding",
  "accept-language",
  "connection",
  "cookie",
  "origin",
  "referer",
  "sec-fetch-dest",
  "sec-fetch-mode",
  "sec-fetch-site",
  "user-agent",
];
const disallowedBodyMethods = ["GET", "HEAD"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url, ...queryParams } = req.query;
  const headers = req.headers;
  const body = req.body;
  const shouldSendBody = !disallowedBodyMethods.includes(req.method as string);

  if (typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const passthroughHeaders = Object.fromEntries(
    Object.entries(headers).filter(
      ([key]) => !skippedPassthroughHeaders.includes(key.toLowerCase()),
    ),
  );

  try {
    const fetchUrl = new URL(url);
    const existingParams = new URLSearchParams(fetchUrl.search);

    for (const [key, value] of Object.entries(queryParams)) {
      if (Array.isArray(value)) {
        value.forEach((val) => existingParams.append(key, val));
      } else {
        existingParams.append(key, value as string);
      }
    }

    fetchUrl.search = existingParams.toString();

    const response = await fetch(fetchUrl.toString(), {
      method: req.method,
      headers: {
        ...(passthroughHeaders as Record<string, string>),
      },
      ...(shouldSendBody && body ? { body: JSON.stringify(body) } : {}),
    });

    return res.status(response.status).send(await response.text());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
