import express, { type Express } from "express";
import { handlerReadiness } from "./api/readiness.js";
import {
  middlewareLogResponses,
  middlewareMetricsInc,
} from "./api/middleware.js";
import { handlerMetrics} from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";

const app: Express = express();
const port = 8080;

app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("src/app"));

app.get("/healthz", handlerReadiness);
app.get("/metrics", handlerMetrics);
app.get("/reset", handlerReset);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
