"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _UnitRepository = _interopRequireDefault(require("../repositories/UnitRepository"));

var _CompanyRepository = _interopRequireDefault(require("../repositories/CompanyRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnitController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object().keys({
          name: _celebrate.Joi.string().required(),
          telephone: _celebrate.Joi.string().min(9).max(11).required(),
          companyId: _celebrate.Joi.number().required()
        })
      },
      findByCompany: {
        body: _celebrate.Joi.object().keys({
          companyId: _celebrate.Joi.number().required()
        })
      }
    };
  }

  async index(request, response) {
    const units = await _UnitRepository.default.findAll();
    return response.json(units);
  }

  async findByCompany(request, response) {
    const {
      companyId
    } = request.params;
    const unitsByCompany = await _UnitRepository.default.findByCompany(Number(companyId));
    return response.json(unitsByCompany);
  }

  async store(request, response) {
    const {
      name,
      telephone,
      companyId
    } = request.body;
    const company = await _CompanyRepository.default.findById(companyId);

    if (!company) {
      return response.status(404).json({
        error: 'Company was not found.'
      });
    }

    const unitByName = await _UnitRepository.default.findByName(companyId, name);

    if (unitByName.length > 0) {
      return response.status(409).json({
        error: 'Already has a unit of this company with that name.'
      });
    }

    const unit = await _UnitRepository.default.create({
      name,
      telephone,
      company: {
        connect: {
          id: companyId
        }
      }
    });
    return response.json(unit);
  }

}

var _default = new UnitController();

exports.default = _default;