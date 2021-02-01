"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SaleRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);
    this.include = {
      seller: true,
      person: true,
      car: true,
      serviceSale: {
        include: {
          service: true
        }
      }
    };
  }

  findAll() {
    return this.prisma.sale.findMany({
      include: this.include,
      orderBy: {
        requestDate: 'desc'
      }
    });
  }

  findByDate(initialDate, finalDate) {
    return this.prisma.sale.findMany({
      where: {
        availabilityDate: {
          gte: initialDate,
          lte: finalDate
        }
      },
      include: this.include
    });
  }

  findByDateAndStatus(initialDate, finalDate, status) {
    return this.prisma.sale.findMany({
      where: {
        availabilityDate: {
          gte: initialDate,
          lte: finalDate
        },
        status
      },
      include: this.include
    });
  }

  findWithAllFilters(company, service, initialDate, finalDate) {
    return this.prisma.sale.findMany({
      where: {
        availabilityDate: {
          gte: initialDate,
          lte: finalDate
        },
        seller: {
          companyId: company
        },
        serviceSale: {
          some: {
            id: service
          }
        }
      },
      include: this.include
    });
  }

  findByStatus(status) {
    return this.prisma.sale.findMany({
      where: {
        status
      },
      include: this.include,
      orderBy: {
        requestDate: 'desc'
      }
    });
  }

  findById(id) {
    return this.prisma.sale.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.sale.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.sale.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.sale.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  findByUnit(unitId) {
    return this.prisma.sale.findMany({
      where: {
        seller: {
          unitId
        }
      },
      include: this.include,
      orderBy: {
        requestDate: 'desc'
      }
    });
  }

  findBySeller(sellerId) {
    return this.prisma.sale.findMany({
      where: {
        sellerId
      },
      include: this.include,
      orderBy: {
        requestDate: 'desc'
      }
    });
  }

  findByCompanyAndFinishedStatus(companyId) {
    return this.prisma.sale.findMany({
      where: {
        status: 'FINISHED',
        seller: {
          companyId
        }
      },
      include: this.include,
      orderBy: {
        requestDate: 'desc'
      }
    });
  }

  changeStatus(id, status) {
    return this.prisma.sale.update({
      where: {
        id
      },
      data: {
        status: status
      },
      include: this.include
    });
  }

}

var _default = new SaleRepository();

exports.default = _default;