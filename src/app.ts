import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { resolve } from "path";
import { errorHandleMidleware } from "./middlewares/ErrorHandle";
import { router } from "./routes";
import mongoConnection from "./database/mongoConnection";

const enviromentPath = resolve(__dirname, "enviroments", ".env");
dotenv.config({ path: enviromentPath });

mongoConnection();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(errorHandleMidleware);

export { app };
