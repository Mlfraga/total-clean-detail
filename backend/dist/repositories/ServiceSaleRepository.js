"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseRepository = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceSaleRepository extends _BaseRepository.default {
  constructor(...args) {
    super(...args);
    this.include = {
      sale: {
        include: {
          seller: {
            include: {
              company: true,
              unit: true
            }
          },
          person: true
        }
      },
      service: true
    };
  }

  findAll() {
    return this.prisma.serviceSale.findMany({
      include: this.include
    });
  }

  findById(id) {
    return this.prisma.serviceSale.findOne({
      where: {
        id
      },
      include: this.include
    });
  }

  create(data) {
    return this.prisma.serviceSale.create({
      data,
      include: this.include
    });
  }

  update(id, data) {
    return this.prisma.serviceSale.update({
      where: {
        id
      },
      data,
      include: this.include
    });
  }

  delete(id) {
    return this.prisma.serviceSale.delete({
      where: {
        id
      },
      include: this.include
    });
  }

  filterSale(serviceId, companyId, unitId, startDeliveryDate, endDeliveryDate) {
    return this.prisma.serviceSale.findMany({
      where: {
        service: {
          id: serviceId
        },
        sale: {
          deliveryDate: {
            gte: startDeliveryDate,
            lte: endDeliveryDate
          },
          seller: {
            companyId: companyId,
            unitId: unitId
          }
        }
      },
      include: this.include
    });
  }

}

var _default = new ServiceSaleRepository();

exports.default = _default;