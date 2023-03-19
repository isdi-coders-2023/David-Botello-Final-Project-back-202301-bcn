import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcryptjs, { hash } from "bcryptjs";
import app from "../../index.js";
import connectDatabase from "../../../database/connectDatabase.js";
import User from "../../../database/model/User.js";
import { type UserStructure, type UserCredentials } from "../../types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const mockUser: UserStructure = {
  username: "Agueda",
  password: "ratatata",
  name: "algoguay",
  email: "algogya@dljd.com",
  lastname: "bottle",
  admin: false,
};

const credentials: UserCredentials = {
  username: "Agueda",
  password: "ratatata",
};

describe("Given a POST 'users/login' endpoint", () => {
  describe("When it receives a request with name 'Agueda' and password 'ratatata'", () => {
    beforeAll(async () => {
      await User.create(mockUser);
    });
    test("Then it should respond with a status 200 and a property ", async () => {
      const expectedStatus = 200;
      const expectedProperty = "token";
      bcryptjs.compare = jest.fn().mockResolvedValueOnce(true);

      const response = await request(app)
        .post("/users/login")
        .send(credentials)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });
});
