import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError";
import { generalError, notFoundError } from "./errorMiddlewares";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const req: Partial<Request> = {};
const next = jest.fn() as NextFunction;

beforeEach(() => jest.clearAllMocks());

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its next method", () => {
      notFoundError(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives a request", () => {
    test("Then it should call its status method with 404", () => {
      const statusCode = 404;
      const error = new CustomError(
        "There was an error",
        404,
        "Something went wrong"
      );

      generalError(error, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });

  describe("When the error is not a customError", () => {
    test("Then it should respond with the public message 'Something went wrong' and a status code 500", () => {
      const error = new Error();
      const expectedPublicMessage = "Something went wrong";

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: expectedPublicMessage });
    });
  });
});
