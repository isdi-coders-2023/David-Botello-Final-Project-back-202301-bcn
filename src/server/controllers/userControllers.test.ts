import { type NextFunction, type Request, type Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../../database/model/User";
import { type UserCredentials } from "../types";
import { loginUser } from "./usersControllers";
import { CustomError } from "../../CustomError/CustomError";
import bcryptjs from "bcryptjs";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<
  Request<Record<string, unknown>, Record<string, unknown>, UserCredentials>
> = {};
const next = jest.fn();

beforeEach(() => jest.clearAllMocks());

describe("Given a loginUser controller", () => {
  describe("When it receives a username called 'davo' and a password 'laLal@n9'", () => {
    test("Then it should invoke status method with 200 and' with a token", async () => {
      const user: UserCredentials = {
        username: "davo",
        password: "laLal@n9",
      };
      req.body = user;
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
      const expectedStatus = 200;
      const expectedResponse = { token };

      User.findOne = jest.fn().mockResolvedValue({
        ...user,
        _id: new mongoose.Types.ObjectId(),
      });

      bcryptjs.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a username called 'davo' and a wrong password '123456'", () => {
    test("Then it should respond with status '401'", async () => {
      const user: UserCredentials = {
        username: "davo",
        password: "123456",
      };

      req.body = user;

      const expectedError = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn().mockResolvedValue({
        ...user,
        _id: new mongoose.Types.ObjectId(),
      });

      bcryptjs.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a username called 'davo' and a wrong password '123456', but the user doesn't exist in the database", () => {
    test("Then it should respond with status '401'", async () => {
      const user: UserCredentials = {
        username: "davo",
        password: "123456",
      };

      req.body = user;

      const expectedError = new CustomError(
        "Wrong credentials",
        401,
        "Wrong credentials"
      );

      User.findOne = jest.fn().mockResolvedValue(undefined);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When the data base rejects the request and responds with an error", () => {
    test("Then it should call its next method", async () => {
      const error = new Error("Fatal error");

      User.findOne = jest.fn().mockRejectedValue(error);

      await loginUser(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          UserCredentials
        >,
        res as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
