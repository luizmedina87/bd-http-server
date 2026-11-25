import type { Request, Response } from "express";
import { respondWithError, respondWithJSON } from "./json.js";

export function handlerValidate(req: Request, res: Response) {
  type chirpBody = {
    body: string;
  };

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  let parsedBody: chirpBody;
  req.on("end", () => {
    try {
      parsedBody = JSON.parse(body);
    } catch (error) {
      respondWithError(res, 400, "Invalid JSON");
      return;
    }

    const maxChirpLenght = 140;
    if (parsedBody.body.length > maxChirpLenght) {
      respondWithError(res, 400, "Chirp is too long");
      return;
    }

    respondWithJSON(res, 200, { valid: true });
    return;
  });
}
