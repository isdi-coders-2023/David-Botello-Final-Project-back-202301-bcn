import { Joi } from "express-validation";

export const loginSchema = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(8).max(24).required(),
  }),
};
