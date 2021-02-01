"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var dotenv = _interopRequireWildcard(require("dotenv"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dotenv.config();
let refreshTokens = [];
let accessTokens = [];

class AuthenticationMiddleware {
  async generateAccessToken(user) {
    const accessToken = _jsonwebtoken.default.sign({
      user
    }, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: '10s'
    });

    accessTokens.push(accessToken);
    return accessToken;
  }

  async generateReefreshToken(user) {
    const refreshToken = _jsonwebtoken.default.sign({
      user
    }, String(process.env.REFRESH_TOKEN_SECRET));

    refreshTokens.push(refreshToken);
    return refreshToken;
  }

  async logout(request, response) {
    if (!request.headers['authorization']) {
      return response.sendStatus(401);
    }

    const authHeader = request.headers['authorization'];
    const accessToken = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);
    refreshTokens = refreshTokens.filter(token => token !== request.body);
    accessTokens = accessTokens.filter(token => token !== accessToken);
    return response.sendStatus(204);
  }

  async refreshToken(request, response, next) {
    const refreshToken = request.body.token;

    if (!refreshTokens.includes(refreshToken)) {
      return response.status(403).json({
        error: "Invalid refresh Token (JWT)."
      });
    }

    if (!process.env.REFRESH_TOKEN_SECRET) {
      return response.status(404).json({
        error: "SECRET_KEY_INVALID."
      });
    }

    try {
      const decoded = _jsonwebtoken.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      if (!decoded) {
        return response.status(403).json({
          error: "Invalid refresh Token (JWT)."
        });
      }

      delete decoded.iat;
      delete decoded.exp;
      delete decoded.nbf;

      const accessToken = _jsonwebtoken.default.sign(decoded, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: '1000s'
      });

      accessTokens.push(accessToken);
      return response.json({
        accessToken
      });
    } catch (err) {
      return response.status(403).json({
        error: "Invalid refresh Token (JWT)."
      });
    }
  }

  async authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    if (token == null) {
      return response.sendStatus(401);
    }

    if (!accessTokens.includes(token)) {
      return response.status(404).json({
        error: "SECRET_KEY_INVALID."
      });
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      return response.status(404).json({
        error: "SECRET_KEY_INVALID."
      });
    }

    _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return response.status(403).json({
          error: "SECRET_KEY_INVALID."
        });
      }

      request.user = user;
      next();
    });
  }

}

var _default = new AuthenticationMiddleware();

exports.default = _default;