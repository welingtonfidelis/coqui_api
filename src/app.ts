import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { resolve } from "path";

const enviromentPath = resolve(__dirname, "enviroments", ".env");
dotenv.config({ path: enviromentPath });

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

export { app };
