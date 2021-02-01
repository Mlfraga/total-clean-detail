"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _PersonRepository = _interopRequireDefault(require("../repositories/PersonRepository"));

var _CarRepository = _interopRequireDefault(require("../repositories/CarRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CarController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object({
          personId: _celebrate.Joi.number().required(),
          car: _celebrate.Joi.string().required(),
          carColor: _celebrate.Joi.string().required(),
          carModel: _celebrate.Joi.string(),
          carPlate: _celebrate.Joi.string().min(6).max(8).required()
        })
      }
    };
  }

  async store(request, response) {
    const {
      personId,
      car,
      carPlate,
      carColor,
      carModel
    } = request.body;
    const personById = await _PersonRepository.default.findById(personId);

    if (!personById) {
      return response.status(409).json({
        error: 'Not found a person with this ID.'
      });
    }

    const createdCar = await _CarRepository.default.create({
      car,
      carColor,
      carModel,
      carPlate,
      person: {
        connect: {
          id: personId
        }
      }
    });
    return response.json(createdCar);
  }

}

var _default = new CarController();

exports.default = _default;