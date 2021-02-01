"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository extends _BaseRepository.default {
  findAll() {
    return this.prisma.car.findMany();
  }

  findById(id) {
    return this.prisma.car.findOne({
      where: {
        id
      }
    });
  }

  create(data) {
    return this.prisma.car.create({
      data
    });
  }

  update(id, data) {
    return this.prisma.car.update({
      where: {
        id
      },
      data
    });
  }

  delete(id) {
    return this.prisma.car.delete({
      where: {
        id
      }
    });
  }

  findByPlateAndPersonId(car, plate, personId) {
    return this.prisma.car.findMany({
      where: {
        car: car,
        carPlate: plate,
        personId: personId
      }
    });
  }

}

var _default = new UserRepository();

exports.default = _default;