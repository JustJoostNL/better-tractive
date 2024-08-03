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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query;
  const headers = req.headers;
  const body = req.body;

  if (typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const passThroughHeaders = Object.fromEntries(
    Object.entries(headers).filter(
      ([key]) => !skippedPassThroughHeaders.includes(key),
    ),
  );

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...(passThroughHeaders as Record<string, string>),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return res.status(response.status).send(await response.text());
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
