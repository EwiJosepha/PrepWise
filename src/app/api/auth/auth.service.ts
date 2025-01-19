import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export interface JwtPayload {
  id: string;
  email: string;
}

const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME
const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

if (!JWT_SECRET) {
  throw new Error('JWT Secret does not exist')
}

export const AuthService = {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUNDS)
  },

  async matchPassword({ password, checkPassword }: { password: string, checkPassword: string }) {
    return await bcrypt.compare(password, checkPassword)
  },

  jwtSignUser(user: JwtPayload) {
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

  jwtVerifyUser(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as JwtPayload;
    } catch {
      return null;
    }
  }
}
