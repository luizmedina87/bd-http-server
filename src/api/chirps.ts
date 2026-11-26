import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  if (!params || typeof params.body !== "string") {
    throw new Error("Invalid JSON body");
  }

  const maxChirpLenght = 140;
  if (params.body.length > maxChirpLenght) {
    throw new Error("Chirp is too logn");
  }

  const cleanedBodyText = params.body.replace(
    /\b(?:kerfuffle|sharbert|fornax)\b/gi,
    "****",
  );
  respondWithJSON(res, 200, { cleanedBody: cleanedBodyText });
}
