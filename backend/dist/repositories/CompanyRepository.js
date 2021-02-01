"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CompanyRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);
    this.include = {
      units: true,
      Profile: {
        include: {
          user: true
        }
      }
    };
  }

  findAll() {
    return this.prisma.company.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.company.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.company.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.company.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.company.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByName(name) {
    return this.prisma.company.findMany({
      where: {
        name
      },
      include: this.include
    });
  }

  findByCnpj(cnpj) {
    return this.prisma.company.findMany({
      where: {
        cnpj
      },
      include: this.include
    });
  }

}

var _default = new CompanyRepository();

exports.default = _default;