import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { User } from "@/types/user.js";

const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME
const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = Number( process.env.SALT_ROUNDS)

if(!JWT_SECRET) {
  throw new Error('JWT Secret does not exist')
}

export const AuthService = {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS)
  },

  async matchPassword({password, checkPassword}:{password: string, checkPassword: string}) {
    return await bcrypt.compare(password, checkPassword)
  },

  jwtSignUser(user: User) {
    return jwt.sign(
      {
        ...user,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRATION_TIME
      }
    )
  },

  jwtVerifyUser(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null
    }
  }
}
