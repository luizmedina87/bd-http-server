import type { Request, Response } from "express";
import { respondWithError, respondWithJSON } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  const maxChirpLenght = 140;
  if (params.body.length > maxChirpLenght) {
    respondWithError(res, 400, "Chirp is too long");
    return;
  }

  const cleanedBodyText = params.body.replace(/\b(?:kerfuffle|sharbert|fornax)\b/gi, "****");
  respondWithJSON(res, 200, { cleanedBody: cleanedBodyText });
}
