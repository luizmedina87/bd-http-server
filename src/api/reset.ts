import type { Request, Response } from "express";
import { config } from "../config.js";

export function handlerReset(_req: Request, res: Response) {
  config.fileserverHits = 0;
  res.write("hits reset to 0");
  res.end();
}
