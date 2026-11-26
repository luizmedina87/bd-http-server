import { type Request, type Response, type NextFunction } from "express";
import { config } from "../config.js";
import { respondWithError } from "./json.js";
import {
  BadRequestError,
  NotFoundError,
  UserForbiddenError,
  UserNotAuthenticatedError,
} from "./error.js";
import type { HttpErrorCode } from "./error.js";

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
  let errMsg = err.message;
  let errCode: HttpErrorCode;

  console.error(err.message);

  if (err instanceof BadRequestError) {
    errCode = 400;
  } else if (err instanceof UserNotAuthenticatedError) {
    errCode = 401;
  } else if (err instanceof UserForbiddenError) {
    errCode = 403;
  } else if (err instanceof NotFoundError) {
    errCode = 404;
  } else {
    errCode = 500;
    errMsg = "Something went wrong on our end";
  }

  if (errCode >= 500) {
    console.error(err.message);
  }

  respondWithError(res, errCode, errMsg);
}
