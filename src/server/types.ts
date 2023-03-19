import { type JwtPayload } from "jsonwebtoken";

export type UserCredentials = Pick<UserStructure, "username" | "password">;

export interface UserStructure {
  email: string;
  name: string;
  lastname: string;
  username: string;
  password: string;
  admin: boolean;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
  name: string;
  admin: boolean;
}
