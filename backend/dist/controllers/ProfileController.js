"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _ProfileRepository = _interopRequireDefault(require("../repositories/ProfileRepository"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  constructor() {
    this.validate = {
      findByUnitId: {
        body: _celebrate.Joi.object().keys({
          unitId: _celebrate.Joi.number().required()
        })
      },
      findByName: {
        body: _celebrate.Joi.object().keys({
          name: _celebrate.Joi.string().required()
        })
      }
    };
  }

  async index(request, response) {
    const profiles = await _ProfileRepository.default.findAll();
    return response.json(profiles);
  }

  async findByUnitId(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const unitId = decoded.payload.user.profile.unitId;
    const profiles = await _ProfileRepository.default.findByUnitId(Number(unitId));
    return response.json(profiles);
  }

  async findByCompanyId(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1]);

    const decoded = _jsonwebtoken.default.decode(String(token), {
      complete: true
    });

    const companyId = decoded.payload.user.profile.companyId;
    const profiles = await _ProfileRepository.default.findByCompanyId(Number(companyId));
    return response.json(profiles);
  }

  async findByName(request, response) {
    const {
      name
    } = request.query;
    const profile = await _ProfileRepository.default.findByName(String(name));
    return response.json(profile);
  }

}

var _default = new ProfileController();

exports.default = _default;