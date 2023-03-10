import "../loadEnviroment.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./usersRouter/userRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";

const app = express();

const allowedOrigins = [
  process.env.ALLOWED_ORIGINS_LOCAL!,
  process.env.ALLOWED_ORIGINS_PROD!,
];

const options: cors.CorsOptions = { origin: allowedOrigins };

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
