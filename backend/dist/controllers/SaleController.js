"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _locale = require("date-fns/locale");

var _dateFns = require("date-fns");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _SaleRepository = _interopRequireDefault(require("../repositories/SaleRepository"));

var _PersonRepository = _interopRequireDefault(require("../repositories/PersonRepository"));

var _CarRepository = _interopRequireDefault(require("../repositories/CarRepository"));

var _UnitRepository = _interopRequireDefault(require("../repositories/UnitRepository"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _ServiceRepository = _interopRequireDefault(require("../repositories/ServiceRepository"));

var _CompanyServiceRepository = _interopRequireDefault(require("../repositories/CompanyServiceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SaleController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object({
          deliveryDate: _celebrate.Joi.date().required(),
          availabilityDate: _celebrate.Joi.date().required(),
          companyPrice: _celebrate.Joi.number().required(),
          costPrice: _celebrate.Joi.number().required(),
          source: _celebrate.Joi.string().required(),
          name: _celebrate.Joi.string().required(),
          cpf: _celebrate.Joi.string().required(),
          car: _celebrate.Joi.string().required(),
          carPlate: _celebrate.Joi.string().required().min(7).max(8),
          carModel: _celebrate.Joi.string().required(),
          carColor: _celebrate.Joi.string().required(),
          comments: _celebrate.Joi.string()
        })
      },
      index: {
        query: _celebrate.Joi.object({
          date: _celebrate.Joi.date().allow(null),
          status: _celebrate.Joi.string().allow(null)
        })
      },
      listSalesForReport: {
        query: _celebrate.Joi.object({
          initialDate: _celebrate.Joi.date().allow(null),
          finalDate: _celebrate.Joi.date().allow(null),
          company: _celebrate.Joi.number().allow(null),
          service: _celebrate.Joi.number().allow(null)
        })
      },
      findByStatus: {
        body: _celebrate.Joi.object({
          doneSearch: _celebrate.Joi.string().required()
        })
      },
      findByUnit: {
        body: _celebrate.Joi.object({
          unitId: _celebrate.Joi.number().required()
        })
      },
      findBySeller: {
        body: _celebrate.Joi.object({
          sellerId: _celebrate.Joi.number().required()
        })
      },
      findByCompany: {
        body: _celebrate.Joi.object({
          companyId: _celebrate.Joi.number().required()
        })
      }
    };
  }

  async index(request, response) {
    const {
      date,
      status
    } = request.query;
    let sales;

    if (date && status) {
      const initialDay = (0, _dateFns.startOfDay)(new Date(date.toString()));
      const finalDay = (0, _dateFns.endOfDay)(new Date(date.toString()));

      if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
        return response.status(400).json({
          error: "Status not found."
        });
      }

      sales = await _SaleRepository.default.findByDateAndStatus(initialDay, finalDay, status);
      return response.json(sales);
    }

    if (date) {
      const initialDay = (0, _dateFns.startOfDay)(new Date(date.toString()));
      const finalDay = (0, _dateFns.endOfDay)(new Date(date.toString()));
      sales = await _SaleRepository.default.findByDate(initialDay, finalDay);
      return response.json(sales);
    }

    if (status) {
      if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
        return response.status(400).json({
          error: "Status not found."
        });
      }

      sales = await _SaleRepository.default.findByStatus(status);
      return response.json(sales);
    }

    sales = await _SaleRepository.default.findAll();
    return response.json(sales);
  }

  async listSalesForReport(request, response) {
    const {
      company,
      service,
      initialDate,
      finalDate
    } = request.query;
    let sales;

    if (company && service && initialDate && finalDate) {
      sales = await _SaleRepository.default.findWithAllFilters(Number(company), Number(service), (0, _dateFns.startOfDay)(new Date(initialDate.toString())), (0, _dateFns.endOfDay)(new Date(finalDate.toString())));
    }

    sales = await _SaleRepository.default.findAll();
    return response.json(sales);
  }

  async store(request, response) {
    const {
      deliveryDate,
      availabilityDate,
      comments,
      companyPrice,
      costPrice,
      source,
      name,
      cpf,
      car,
      carPlate,
      carColor,
      carModel
    } = request.body;
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const sellerId = decoded.payload.user.id;
    const role = decoded.payload.user.role;

    if (role !== "MANAGER" && role !== "SELLER") {
      return response.status(404).json({
        error: 'User is not allowed to make sales.'
      });
    }

    if (source !== "NEW" && source !== "USED" && source !== "WORKSHOP") {
      return response.status(404).json({
        error: 'The source is unavailable.'
      });
    }

    const personByCpf = await _PersonRepository.default.findByCpf(cpf);

    if (personByCpf.length === 0) {
      const person = await _PersonRepository.default.create({
        name,
        cpf
      });
      const createdCar = await _CarRepository.default.create({
        car,
        carColor,
        carModel,
        carPlate,
        person: {
          connect: {
            id: person === null || person === void 0 ? void 0 : person.id
          }
        }
      });

      if (!createdCar) {
        return response.status(400).json({
          error: 'Car cannot be registered.'
        });
      }

      const sale = await _SaleRepository.default.create({
        deliveryDate,
        availabilityDate,
        companyPrice,
        costPrice,
        source,
        comments,
        seller: {
          connect: {
            userId: sellerId
          }
        },
        person: {
          connect: {
            id: person === null || person === void 0 ? void 0 : person.id
          }
        },
        car: {
          connect: {
            id: createdCar.id
          }
        }
      });
      return response.json(sale);
    } else if (personByCpf.length > 1) {
      return response.status(409).json({
        error: 'One or more users have been found.'
      });
    }

    const carByPlateAndPersonId = await _CarRepository.default.findByPlateAndPersonId(car, carPlate, personByCpf[0].id);

    if (carByPlateAndPersonId.length === 0) {
      const createdCar = await _CarRepository.default.create({
        car,
        carColor,
        carModel,
        carPlate,
        person: {
          connect: {
            id: personByCpf[0].id
          }
        }
      });

      if (!createdCar) {
        return response.status(400).json({
          error: 'Car cannot be registered.'
        });
      }

      const sale = await _SaleRepository.default.create({
        deliveryDate,
        availabilityDate,
        companyPrice,
        costPrice,
        source,
        comments,
        seller: {
          connect: {
            userId: sellerId
          }
        },
        person: {
          connect: {
            id: personByCpf[0].id
          }
        },
        car: {
          connect: {
            id: createdCar.id
          }
        }
      });
      return response.json(sale);
    }

    const sale = await _SaleRepository.default.create({
      deliveryDate,
      availabilityDate,
      companyPrice,
      costPrice,
      source,
      comments,
      seller: {
        connect: {
          userId: sellerId
        }
      },
      person: {
        connect: {
          id: personByCpf[0].id
        }
      },
      car: {
        connect: {
          id: carByPlateAndPersonId[0].id
        }
      }
    });
    return response.json(sale);
  }

  async findByUnit(request, response) {
    const {
      unitId
    } = request.params;
    const unit = await _UnitRepository.default.findById(parseInt(unitId));

    if (!unit) {
      return response.status(404).json({
        error: 'Unit not found.'
      });
    }

    const sales = await _SaleRepository.default.findByUnit(parseInt(unitId));
    return response.json(sales);
  }

  async findBySeller(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const sellerId = decoded.payload.user.id;
    const sales = await _SaleRepository.default.findBySeller(parseInt(sellerId));
    return response.json(sales);
  }

  async findByCompanyAndFinishedStatus(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const companyId = decoded.payload.user.profile.companyId;
    const sales = await _SaleRepository.default.findByCompanyAndFinishedStatus(parseInt(companyId));
    return response.json(sales);
  }

  async updateStatus(request, response) {
    const {
      status,
      sales
    } = request.body;

    if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
      return response.status(400).json({
        error: "Status not found."
      });
    }

    sales.forEach(async element => {
      const data = await _SaleRepository.default.changeStatus(Number(element), status);
      const subject = `Alteração no status do pedido ${element}`;
      let text;
      const sale = await _SaleRepository.default.findById(Number(element));

      if (!sale) {
        return null;
      }

      let formattedDate = null;
      formattedDate = (0, _dateFns.format)(sale === null || sale === void 0 ? void 0 : sale.deliveryDate, "'Dia' dd 'de' MMMM', às ' HH:mm'h'", {
        locale: _locale.ptBR
      });
      let statusText;

      if (status === 'CONFIRMED') {
        statusText = 'confirmado';
      }

      if (status === 'CANCELED') {
        statusText = 'cancelado';
      }

      if (status === 'FINISHED') {
        statusText = 'finalizado';
      }

      text = `O pedido do cliente ${sale === null || sale === void 0 ? void 0 : sale.person.name}, slocitado pelo vendedor ${sale === null || sale === void 0 ? void 0 : sale.seller.name} no ${formattedDate} teve seu status alterado para ${statusText}. `;
      const sellerUser = await _UserRepository.default.findById(sale.seller.id);
      const sellerEmail = sellerUser === null || sellerUser === void 0 ? void 0 : sellerUser.email; // let result = Mail.sendMail(text, subject, String(sellerEmail));

      return data;
    });
    return response.status(200).json('updatedSales');
  }

  async getSaleBudget(request, response) {
    const {
      services
    } = request.body;
    let costPrice = 0;
    services.filter(async id => {
      const serviceById = await _ServiceRepository.default.findById(id);

      if (!serviceById) {
        return response.status(404).json({
          error: 'No service found with this ID.'
        });
      }

      costPrice += serviceById.price;
    });
    setTimeout(() => {
      return response.json({
        costPrice
      });
    }, 100);
  }

  async getCompanySaleBudget(request, response) {
    const {
      services,
      companyId
    } = request.body;
    let companyPrice = 0;
    services.filter(async serviceId => {
      const serviceByIdAndServiceId = await _CompanyServiceRepository.default.findByCompanyIdAndServiceId(Number(companyId), Number(serviceId));

      if (!serviceByIdAndServiceId) {
        return response.status(404).json({
          error: 'No service found with this ID.'
        });
      }

      serviceByIdAndServiceId.filter(service => {
        companyPrice += service.price;
      });
    });
    setTimeout(() => {
      return response.json({
        companyPrice
      });
    }, 100);
  }

}

var _default = new SaleController();

exports.default = _default;