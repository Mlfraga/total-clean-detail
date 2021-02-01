"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class HeaderMiddleware {
  async Header(request, response, next) {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      console.log('passou');
      return response.status(400).json({
        error: "The authorization header was not passed."
      });
    }

    next();
  }

}

var _default = new HeaderMiddleware();

exports.default = _default;