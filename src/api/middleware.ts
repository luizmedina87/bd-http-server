import { type Request, type Response, type NextFunction } from "express";
import { config } from "../config.js";
import { respondWithError } from "./json.js";

export function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    const statusCode = res.statusCode;
    if (statusCode >= 300) {
      console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`);
    }
  });
  next();
}

export function middlewareMetricsInc(
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  config.fileserverHits++;
  next();
}

export function middlewareError(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const resMsg = "Something went wrong on our end";
  const resCode = 500;

  console.error(err.message);
  
  respondWithError(res, resCode, resMsg);
}