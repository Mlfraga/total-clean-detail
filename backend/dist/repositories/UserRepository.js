"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);
    this.include = {
      profile: {
        include: {
          company: true,
          unit: true
        }
      }
    };
  }

  findAll() {
    return this.prisma.user.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.user.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.user.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.user.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.user.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByUsername(username) {
    return this.prisma.user.findOne({
      where: {
        username
      },
      include: this.include
    });
  }

  findByEmail(email) {
    return this.prisma.user.findOne({
      where: {
        email
      },
      include: this.include
    });
  }

  setUnable(id) {
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        enabled: false
      },
      include: this.include
    });
  }

}

var _default = new UserRepository();

exports.default = _default;