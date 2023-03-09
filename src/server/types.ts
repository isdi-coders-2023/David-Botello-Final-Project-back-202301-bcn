import { type JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserStructure {
  email: string;
  name: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
  username: string;
}
