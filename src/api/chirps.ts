import type { Request, Response } from "express";
import { respondWithJSON } from "./json.js";
import { BadRequestError } from "./error.js";

export async function handlerChirpsValidate(req: Request, res: Response) {
  type parameters = {
    body: string;
  };

  const params: parameters = req.body;

  if (!params || typeof params.body !== "string") {
    throw new BadRequestError("Invalid JSON body");
  }

  const maxChirpLenght = 140;
  if (params.body.length > maxChirpLenght) {
    throw new BadRequestError(`Chirp is too long. Max length is ${maxChirpLenght}`);
  }

  const cleanedBodyText = params.body.replace(
    /\b(?:kerfuffle|sharbert|fornax)\b/gi,
    "****",
  );
  respondWithJSON(res, 200, { cleanedBody: cleanedBodyText });
}
