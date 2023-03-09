import "../loadEnviroment.js";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import morgan from "morgan";
import cors from "cors";
import usersRouter from "./usersRouter/userRouter.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import { validate, ValidationError } from "express-validation";
import { loginSchema } from "./schema/loginSchema.js";
import { type CustomError } from "../CustomError/CustomError.js";
import debug from "debug";

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

app.post("/login", validate(loginSchema, {}, {}), (req, res) => {
  res.json(200);
});
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
      const validationErrors = error.details.body
        ?.map((joiError) => joiError.message)
        .join(" & ");
      error.publicMessage = validationErrors!;
      debug(validationErrors!);
    }

    debug(error.message);
  }
);

app.use(notFoundError);
app.use(generalError);

export default app;
