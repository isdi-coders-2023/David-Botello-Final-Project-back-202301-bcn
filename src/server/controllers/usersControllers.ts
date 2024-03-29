import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../CustomError/CustomError.js";
import User from "../../database/model/User.js";
import { type CustomJwtPayload, type UserCredentials } from "../types.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const customError = new CustomError(
  "Wrong credentials",
  401,
  "Wrong credentials"
);

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

    if (!user) {
      throw new Error("Wrong credentials");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new Error("Wrong credentials");
    }

    const jwtPayload: CustomJwtPayload = {
      sub: user._id.toString(),
      name: user.name,
      admin: user.admin,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });

    res.status(200).json({ token });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      401,
      "Wrong credentials"
    );

    next(customError);
  }
};
