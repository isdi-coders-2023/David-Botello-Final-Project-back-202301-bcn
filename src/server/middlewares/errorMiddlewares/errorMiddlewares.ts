import { type NextFunction, type Response, type Request } from "express";
import createDebug from "debug";
import { CustomError } from "../../../CustomError/CustomError.js";

const debug = createDebug("simoworld-api:server:middlewares:errorMiddlewares");
const notFoundStatusCode = 404;
const generalErrorStatusCode = 500;
const publicMessageDefault = "Something went wrong";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Path not found",
    notFoundStatusCode,
    "Endpoint not found"
  );

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode || generalErrorStatusCode;
  const publicMessage = error.publicMessage || publicMessageDefault;

  res.status(statusCode).json({ error: publicMessage });
};
