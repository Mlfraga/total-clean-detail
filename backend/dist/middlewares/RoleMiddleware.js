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

class RoleMiddleware {
  async isAdmin(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const role = decoded.payload.user.role;

    if (role !== "ADMIN") {
      return response.status(403).json({
        error: "User does not have admin permission."
      });
    }

    next();
  }

  async isManager(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const role = decoded.payload.user.role;

    if (role !== "MANAGER") {
      return response.status(403).json({
        error: "User does not have manager permission."
      });
    }

    next();
  }

  async isManagerOrAdmin(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const role = decoded.payload.user.role;

    if (role !== "MANAGER" && role !== "ADMIN") {
      return response.status(403).json({
        error: "User does not have manager or admin permission."
      });
    }

    next();
  }

  async isManagerOrSeller(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const role = decoded.payload.user.role;

    if (role !== "MANAGER" && role !== "SELLER") {
      return response.status(403).json({
        error: "User does not have manager or seller permission."
      });
    }

    next();
  }

}

var _default = new RoleMiddleware();

exports.default = _default;