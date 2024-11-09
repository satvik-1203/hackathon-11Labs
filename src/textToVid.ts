import { Handler, RequestHandler } from "express";

export const textToVid: RequestHandler = async (req, res) => {
  const { prompt } = req.body;

  res.json({ message: "Hello World!" });
};

export const agentSignedUrl: Handler = async (req, res) => {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${process.env.AGENT_ID}`,
    {
      method: "GET",
      headers: {
        // Requesting a signed url requires your ElevenLabs API key
        // Do NOT expose your API key to the client!
        "xi-api-key": process.env.XI_API_KEY as string,
      },
    }
  );

  if (!response.ok) {
    res.status(500).send("Failed to get signed URL");
    return;
  }

  const body = (await response.json()) as any;
  res.send(body.signed_url);
  return;
};
