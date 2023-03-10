import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../controllers/usersControllers.js";
import { loginSchema } from "../schema/loginSchema.js";

const usersRouter = Router();

usersRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default usersRouter;
