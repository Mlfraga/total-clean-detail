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
      user: true,
      company: true,
      unit: true
    };
  }

  findAll() {
    return this.prisma.profile.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.profile.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.profile.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.profile.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.profile.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByName(name) {
    return this.prisma.profile.findMany({
      where: {
        name: {
          contains: name
        }
      },
      include: this.include
    });
  }

  findByUnitId(id) {
    return this.prisma.profile.findMany({
      where: {
        unitId: id
      },
      include: this.include
    });
  }

  findByCompanyId(id) {
    return this.prisma.profile.findMany({
      where: {
        companyId: id
      },
      include: this.include
    });
  }

}

var _default = new UserRepository();

exports.default = _default;