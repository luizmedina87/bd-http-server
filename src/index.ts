import express, { type Express } from "express";
import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses } from "./api/logresponse.js";

const app: Express = express();
const port = 8080;


app.get("/healthz", handlerReadiness);

app.use(middlewareLogResponses);
app.use("/app", express.static("src/app"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
