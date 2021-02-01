"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _ServiceRepository = _interopRequireDefault(require("../repositories/ServiceRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ServiceController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object().keys({
          name: _celebrate.Joi.string().required(),
          price: _celebrate.Joi.number().required()
        })
      },
      update: {
        body: _celebrate.Joi.object().keys({
          name: _celebrate.Joi.string().allow(null),
          price: _celebrate.Joi.number().allow(null)
        }),
        params: _celebrate.Joi.object().keys({
          id: _celebrate.Joi.number().required()
        })
      },
      findIfContainsName: {
        body: _celebrate.Joi.object().keys({
          name: _celebrate.Joi.string().required()
        })
      }
    };
  }

  async index(request, response) {
    const services = await _ServiceRepository.default.findAll();
    return response.json(services);
  }

  async findIfContainsName(request, response) {
    const {
      name
    } = request.query;
    const services = await _ServiceRepository.default.findIfContainsName(String(name));
    return response.json(services);
  }

  async store(request, response) {
    const {
      name,
      price
    } = request.body;
    const serviceByName = await _ServiceRepository.default.findByName(name);

    if (serviceByName.length > 0) {
      return response.status(409).json({
        error: 'Already has a service with this name.'
      });
    }

    const service = await _ServiceRepository.default.create({
      name: name,
      price: price
    });
    return response.json(service);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      price
    } = request.body;

    if (name) {
      const serviceByName = await _ServiceRepository.default.findByName(name);

      if (serviceByName.length > 0) {
        return response.status(409).json({
          error: 'Already has a service with this name.'
        });
      }
    }

    const serviceById = await _ServiceRepository.default.findById(Number(id));

    if (!serviceById) {
      return response.status(404).json({
        error: 'Service does not exists.'
      });
    }

    let dataSubmit = {};

    if (name && price) {
      dataSubmit = {
        name: name,
        price: price
      };
    }

    if (name && !price) {
      dataSubmit = {
        name: name
      };
    }

    if (!name && price) {
      dataSubmit = {
        price: price
      };
    }

    const service = await _ServiceRepository.default.update(Number(id), dataSubmit);
    return response.json(service);
  }

}

var _default = new ServiceController();

exports.default = _default;