"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _CompanyServiceRepository = _interopRequireDefault(require("../repositories/CompanyServiceRepository"));

var _ServiceRepository = _interopRequireDefault(require("../repositories/ServiceRepository"));

var _CompanyRepository = _interopRequireDefault(require("../repositories/CompanyRepository"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CompanyServiceController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object({
          companyId: _celebrate.Joi.number().required(),
          services: _celebrate.Joi.array().required()
        })
      },
      findByCompanyIdAndServiceId: {
        body: _celebrate.Joi.object({
          companyId: _celebrate.Joi.number().required(),
          serviceId: _celebrate.Joi.number().required()
        })
      },
      updatePrice: {
        body: _celebrate.Joi.object({
          companyServiceId: _celebrate.Joi.number().required(),
          price: _celebrate.Joi.number().required()
        })
      }
    };
  }

  async index(request, response) {
    const services = await _CompanyServiceRepository.default.findAll();
    return response.json(services);
  }

  async store(request, response) {
    const {
      companyId,
      services
    } = request.body;

    const companyById = _CompanyRepository.default.findById(companyId);

    if (!companyById) {
      return response.status(404).json({
        error: 'No company found with this ID.'
      });
    }

    const promises = services.map(async service => {
      const serviceById = _ServiceRepository.default.findById(service.serviceId);

      if (!serviceById) {
        return response.status(404).json({
          error: 'No service found with this ID.'
        });
      }

      const serviceByCompany = _CompanyServiceRepository.default.findByCompanyIdAndServiceId(companyId, service.serviceId);

      if ((await serviceByCompany).length > 0) {
        return response.status(409).json({
          error: 'This service was already created by this company.'
        });
      }

      const data = await _CompanyServiceRepository.default.store({
        price: service.price,
        company: {
          connect: {
            id: companyId
          }
        },
        service: {
          connect: {
            id: service.serviceId
          }
        }
      });

      if (!data) {
        return null;
      }

      return data;
    });
    const companyService = await Promise.all(promises);
    return response.json(companyService);
  }

  async findByCompanyId(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const id = decoded.payload.user.profile.companyId;

    if (!id) {
      return response.status(404).json({
        message: "This user is not linked to a company."
      });
    }

    const companyServicesByCompany = await _CompanyServiceRepository.default.findByCompanyId(parseInt(id));

    if (!companyServicesByCompany) {
      return response.status(404).json({
        error: 'No service from this company was found.'
      });
    }

    return response.json(companyServicesByCompany);
  }

  async findByCompanyIdAndServiceId(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const companyId = decoded.payload.user.profile.companyId;
    const {
      serviceId
    } = request.query;
    const companyServiceByCompanyIdAndServiceId = await _CompanyServiceRepository.default.findByCompanyIdAndServiceId(Number(companyId), Number(serviceId));

    if (!companyServiceByCompanyIdAndServiceId) {
      return response.status(404).json({
        error: 'No service from this company was found.'
      });
    }

    return response.json(companyServiceByCompanyIdAndServiceId);
  }

  async updatePrice(request, response) {
    const servicesData = request.body;
    const promises = servicesData.map(async ({
      companyServiceId,
      price
    }) => {
      const companyServiceById = await _CompanyServiceRepository.default.findById(companyServiceId);

      if (!companyServiceById) {
        return null;
      }

      const companyServices = await _CompanyServiceRepository.default.updatePrice(companyServiceId, price);
      return companyServices;
    });
    const updatedServices = await Promise.all(promises.filter(promise => promise !== null));
    return response.json(updatedServices);
  }

}

var _default = new CompanyServiceController();

exports.default = _default;