import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/model/User.js";

import { type UserCredentials } from "../types.js";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!(username && password === user?.password)) {
      throw new Error();
    }

    res.status(200).json({ username: user?.username, name: user?.name });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      401,
      "Must provide a username or password"
    );

    next(customError);
  }
};
