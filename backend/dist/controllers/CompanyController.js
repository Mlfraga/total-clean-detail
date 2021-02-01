"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _CompanyRepository = _interopRequireDefault(require("../repositories/CompanyRepository"));

var _CpfCnpjUtils = _interopRequireDefault(require("../utils/CpfCnpjUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CompanyController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object().keys({
          name: _celebrate.Joi.string().required(),
          telephone: _celebrate.Joi.string().min(9).max(11).required(),
          cnpj: _celebrate.Joi.string().length(14).required()
        })
      }
    };
  }

  async index(request, response) {
    const companies = await _CompanyRepository.default.findAll();
    return response.json(companies);
  }

  async findById(request, response) {
    const {
      companyId
    } = request.params;
    const company = await _CompanyRepository.default.findById(parseInt(companyId));

    if (!company) {
      return response.status(404).json({
        error: 'Company not found.'
      });
    }

    return response.json(company);
  }

  async store(request, response) {
    const {
      name,
      telephone,
      cnpj
    } = request.body;

    const isCnpjValid = _CpfCnpjUtils.default.isCnpjValid(cnpj);

    if (!isCnpjValid) {
      return response.status(409).json({
        error: 'Invalid CNPJ.'
      });
    }

    const companyByName = await _CompanyRepository.default.findByName(name);

    if (companyByName.length > 0) {
      return response.status(409).json({
        error: 'Already has a company with this name.'
      });
    }

    const companyByCnpj = await _CompanyRepository.default.findByCnpj(cnpj);

    if (companyByCnpj.length > 0) {
      return response.status(409).json({
        error: 'Already has a company with this CNPJ.'
      });
    }

    const company = await _CompanyRepository.default.create({
      name: name,
      telephone: telephone,
      cnpj: cnpj
    });
    return response.json(company);
  }

}

var _default = new CompanyController();

exports.default = _default;