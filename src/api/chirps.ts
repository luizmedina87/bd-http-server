import type { Request, Response } from "express";

type chirpBody = {
  body: string;
};

export function handlerValidate(req: Request, res: Response) {
  const maxChirpLenght = 140;
  let body = "";
  let parsedBody: chirpBody;

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      parsedBody = JSON.parse(body);
    } catch (error) {
      res.status(400).json({ error: `Something went wrong: ${error}` });
      return;
    }

    if (
      typeof parsedBody !== "object" ||
      parsedBody === null ||
      !("body" in parsedBody) ||
      typeof parsedBody.body !== "string"
    ) {
      res.status(400).json({ error: "Invalid chirp body" });
      return;
    }

    if (parsedBody.body.length >= maxChirpLenght) {
      res.status(400).json({
        error: "Chirp is too long",
      });
      return;
    }

    res.status(200).json({ valid: true });
    return;
  });
}
