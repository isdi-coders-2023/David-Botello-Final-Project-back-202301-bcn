import "../loadEnviroment.js";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./usersRouter/userRouter.js";

const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGINS_LOCAL!,
  process.env.ALLOWED_ORIGINS_PROD!,
];

const options: cors.CorsOptions = { origin: allowedOrigins };

app.disable("x-powered-by");

app.use(cors(options));

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", usersRouter);

export default app;
