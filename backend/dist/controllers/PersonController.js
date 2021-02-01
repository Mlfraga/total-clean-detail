"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _PersonRepository = _interopRequireDefault(require("../repositories/PersonRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonController {
  constructor() {
    this.validate = {
      store: {
        body: _celebrate.Joi.object({
          cpf: _celebrate.Joi.string().length(11).required(),
          name: _celebrate.Joi.string().required()
        })
      }
    };
  }

  async store(request, response) {
    const {
      name,
      cpf,
      telephone
    } = request.body;
    const personByCpf = await _PersonRepository.default.findByCpf(cpf);

    if (personByCpf.length > 0) {
      return response.status(409).json({
        error: 'Already has a person with this CNPJ.'
      });
    }

    const person = await _PersonRepository.default.create({
      name,
      cpf
    });
    return response.json(person);
  }

}

var _default = new PersonController();

exports.default = _default;