"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceRepository extends _BaseRepository.default {
  findAll() {
    return this.prisma.service.findMany();
  }

  findById(id) {
    return this.prisma.service.findOne({
      where: {
        id
      }
    });
  }

  create(data) {
    return this.prisma.service.create({
      data
    });
  }

  update(id, data) {
    return this.prisma.service.update({
      where: {
        id
      },
      data
    });
  }

  delete(id) {
    return this.prisma.service.delete({
      where: {
        id
      }
    });
  }

  findIfContainsName(name) {
    return this.prisma.service.findMany({
      where: {
        name: {
          contains: name
        }
      }
    });
  }

  findByName(name) {
    return this.prisma.service.findMany({
      where: {
        name
      }
    });
  }

}

var _default = new ServiceRepository();

exports.default = _default;