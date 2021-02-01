"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnitRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);
    this.include = {
      company: true,
      Profile: {
        include: {
          user: true
        }
      }
    };
  }

  findAll() {
    return this.prisma.unit.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.unit.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.unit.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.unit.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.unit.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByCompany(companyId) {
    return this.prisma.unit.findMany({
      where: {
        companyId
      },
      include: this.include
    });
  }

  findByName(companyId, name) {
    return this.prisma.unit.findMany({
      where: {
        companyId,
        name
      },
      include: this.include
    });
  }

}

var _default = new UnitRepository();

exports.default = _default;