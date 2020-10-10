import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

import { User } from '../../prisma/Studio/-Projetos-TotalCleanDetail-backend';

import * as dotenv from "dotenv";
import { decode } from 'querystring';

dotenv.config();

let refreshTokens: string[] = [];
let accessTokens: string[] = [];

class AuthenticationMiddleware {

  async generateAccessToken(user: User) {
    const accessToken = JWT.sign({ user }, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '10s' });

    accessTokens.push(accessToken);
    return accessToken;
  }

  async generateReefreshToken(user: User) {
    const refreshToken = JWT.sign({ user }, String(process.env.REFRESH_TOKEN_SECRET));

    refreshTokens.push(refreshToken);
    return refreshToken;
  }

  async logout(request: Request, response: Response) {

    if (!request.headers['authorization']) {
      return response.sendStatus(401);
    }

    const authHeader = request.headers['authorization'];
    const accessToken = authHeader && authHeader?.split(' ')[1];

    refreshTokens = refreshTokens.filter(token => token !== request.body)
    accessTokens = accessTokens.filter(token => token !== accessToken)
    return response.sendStatus(204);
  }

  async refreshToken(request: Request, response: Response, next: NextFunction) {
    const refreshToken = request.body.token;

    if (!refreshTokens.includes(refreshToken)) {
      return response.
        status(403)
        .json({ error: "Invalid refresh Token (JWT)." })
    }

    if (!process.env.REFRESH_TOKEN_SECRET) {
      return response
        .status(404)
        .json({ error: "SECRET_KEY_INVALID." })
    }

    try {
      const decoded: any = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      if (!decoded) {
        return response
          .status(403)
          .json({ error: "Invalid refresh Token (JWT)." })
      }

      delete decoded.iat
      delete decoded.exp
      delete decoded.nbf

      console.log(decoded.user.id)

      const accessToken = JWT.sign(decoded, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '1000s' });
      accessTokens.push(accessToken);

      return response.json({ accessToken })
    } catch (err) {
      return response
        .status(403)
        .json({ error: "Invalid refresh Token (JWT)." })
    }

  }

  async authenticateToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];

    if (token == null) {
      return response
        .sendStatus(401)
    }

    if (!accessTokens.includes(token)) {
      return response
        .status(404)
        .json({ error: "SECRET_KEY_INVALID." })
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return response
        .status(404)
        .json({ error: "SECRET_KEY_INVALID." })
    }

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return response
          .status(403)
          .json({ error: "SECRET_KEY_INVALID." })
      }

      request.user = user as User;

      next();
    })
  }
}

export default new AuthenticationMiddleware();
