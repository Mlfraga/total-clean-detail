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
      company: true,
      service: true
    };
  }

  findAll() {
    return this.prisma.companyService.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.companyService.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  store(data) {
    return this.prisma.companyService.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.companyService.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.companyService.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByCompanyId(companyId) {
    return this.prisma.companyService.findMany({
      where: {
        companyId
      },
      include: this.include
    });
  }

  findByCompanyIdAndServiceId(companyId, serviceId) {
    return this.prisma.companyService.findMany({
      where: {
        companyId,
        serviceId
      },
      include: this.include
    });
  }

  updatePrice(id, price) {
    return this.prisma.companyService.update({
      where: {
        id
      },
      data: {
        price
      },
      include: this.include
    });
  }

}

var _default = new UserRepository();

exports.default = _default;