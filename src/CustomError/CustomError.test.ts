import { CustomError } from "./CustomError";

const errorConnection = new CustomError(
  "Can't connect with database",
  500,
  "Error Connection"
);

describe("Given a CustomError class", () => {
  describe("When a new error is instanciated", () => {
    test("Then it should return a new error with property 'message'", () => {
      const expectedProperty = "message";

      expect(errorConnection).toHaveProperty(expectedProperty);
    });

    describe("When a new error is instanciated with message 'Cant connect whit database'", () => {
      test("Then it should create a new Error with this message", () => {
        const expectedMessage = "Can't connect with database";

        expect(errorConnection.message).toBe(expectedMessage);
      });
    });
  });
});
