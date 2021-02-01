"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);
    this.include = {
      cars: true
    };
  }

  findAll() {
    return this.prisma.person.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.person.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.person.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.person.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.person.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByContainsName(name) {
    return this.prisma.person.findMany({
      where: {
        name: {
          contains: name
        }
      },
      include: this.include
    });
  }

  findByName(name) {
    return this.prisma.person.findMany({
      where: {
        name
      },
      include: this.include
    });
  }

  findByCpf(cpf) {
    return this.prisma.person.findMany({
      where: {
        cpf
      },
      include: this.include
    });
  }

  findByContainsCpf(cpf) {
    return this.prisma.person.findMany({
      where: {
        cpf: {
          contains: cpf
        }
      },
      include: this.include
    });
  }

}

var _default = new PersonRepository();

exports.default = _default;