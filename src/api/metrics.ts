import type { Request, Response } from "express";
import { config } from "../config.js";

export function handlerMetrics(_req: Request, res: Response) {
  res.send(`Hits: ${config.fileserverHits}`);
}

