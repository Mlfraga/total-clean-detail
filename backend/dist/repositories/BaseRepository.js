"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("@prisma/client");

class BaseRepository {
  constructor() {
    this.prisma = void 0;
    this.prisma = new _client.PrismaClient();
  }

  findAll() {
    throw new Error('Method not implemented.');
  }

  findById(id) {
    throw new Error('Method not implemented.');
  }

  create(data) {
    throw new Error('Method not implemented.');
  }

  update(id, data) {
    throw new Error('Method not implemented.');
  }

  delete(id) {
    throw new Error('Method not implemented.');
  }

}

exports.default = BaseRepository;