import { NextApiRequest, NextApiResponse } from "next";

const skippedPassThroughHeaders = [
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
  const { url } = req.query;
  const headers = req.headers;
  const body = req.body;
  const shouldSendBody = !disallowedBodyMethods.includes(req.method as string);

  if (typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const passThroughHeaders = Object.fromEntries(
    Object.entries(headers).filter(
      ([key]) => !skippedPassThroughHeaders.includes(key),
    ),
  );

  try {
    const fetchUrl = new URL(url as string);
    fetchUrl.search = new URLSearchParams(
      req.query as Record<string, string>,
    ).toString();

    const response = await fetch(fetchUrl.toString(), {
      method: req.method,
      headers: {
        ...(passThroughHeaders as Record<string, string>),
      },
      ...(shouldSendBody && body ? { body: JSON.stringify(body) } : {}),
    });

    return res.status(response.status).send(await response.text());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
