"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _UserRepository = _interopRequireDefault(require("../repositories/UserRepository"));

var _CompanyRepository = _interopRequireDefault(require("../repositories/CompanyRepository"));

var _UnitRepository = _interopRequireDefault(require("../repositories/UnitRepository"));

var _AutheticationMiddleware = _interopRequireDefault(require("../middlewares/AutheticationMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AutheticationController {
  constructor() {
    this.validate = {
      login: {
        body: _celebrate.Joi.object().keys({
          username: _celebrate.Joi.string().required(),
          password: _celebrate.Joi.string().required()
        })
      },
      signUp: {
        body: _celebrate.Joi.object().keys({
          username: _celebrate.Joi.string().required(),
          email: _celebrate.Joi.string().required(),
          password: _celebrate.Joi.string().min(6).required(),
          role: _celebrate.Joi.string(),
          name: _celebrate.Joi.string().required(),
          telephone: _celebrate.Joi.string().required(),
          enabled: _celebrate.Joi.boolean().required(),
          companyId: _celebrate.Joi.number(),
          unitId: _celebrate.Joi.number()
        })
      }
    };
  }

  async login(request, response) {
    const {
      username,
      password
    } = request.body;
    const userByUsername = await _UserRepository.default.findByUsername(username);

    if (!userByUsername) {
      return response.status(404).json({
        error: 'No user found with this username.'
      });
    }

    if (userByUsername.enabled === false) {
      return response.status(404).json({
        error: 'This user is not allowed to access.'
      });
    }

    const match = await _bcrypt.default.compare(password, userByUsername.password);

    if (!match) {
      return response.status(401).json({
        error: 'Invalid username or password.'
      });
    }

    const accessToken = await _AutheticationMiddleware.default.generateAccessToken(userByUsername);
    const refreshToken = await _AutheticationMiddleware.default.generateReefreshToken(userByUsername);
    return response.status(200).json({
      userByUsername,
      accessToken,
      refreshToken
    });
  }

  async signUp(request, response) {
    const {
      username,
      email,
      password,
      role,
      name,
      telephone,
      enabled,
      companyId,
      unitId
    } = request.body;
    const userByUsername = await _UserRepository.default.findByUsername(username);

    if (userByUsername) {
      return response.status(404).json({
        error: 'Already has an user with this username.'
      });
    }

    const userByEmail = await _UserRepository.default.findByEmail(email);

    if (userByEmail) {
      return response.status(404).json({
        error: 'Already has an user with this email.'
      });
    }

    if (role === 'SELLER') {
      const companyById = await _CompanyRepository.default.findById(companyId);

      if (!companyById) {
        return response.status(404).json({
          error: 'Invalid companyId.'
        });
      }

      const unitById = await _UnitRepository.default.findById(unitId);

      if (!unitById) {
        return response.status(404).json({
          error: 'Invalid unitId.'
        });
      }

      const passwordCrypt = await _bcrypt.default.hash(password, 10);
      const user = await _UserRepository.default.create({
        username: username,
        email: email,
        password: passwordCrypt,
        role: role,
        profile: {
          create: {
            name: name,
            telephone: telephone,
            enabled: enabled,
            company: {
              connect: {
                id: companyId
              }
            },
            unit: {
              connect: {
                id: unitId
              }
            }
          }
        }
      });
      return response.json(user);
    }

    if (role === 'MANAGER') {
      const companyById = await _CompanyRepository.default.findById(companyId);

      if (!companyById) {
        return response.status(404).json({
          error: 'Invalid companyId.'
        });
      }

      const passwordCrypt = await _bcrypt.default.hash(password, 10);
      const user = await _UserRepository.default.create({
        username: username,
        email: email,
        password: passwordCrypt,
        role: role,
        profile: {
          create: {
            name: name,
            telephone: telephone,
            enabled: enabled,
            company: {
              connect: {
                id: companyId
              }
            }
          }
        }
      });
      return response.json(user);
    }

    if (role === 'ADMIN') {
      const passwordCrypt = await _bcrypt.default.hash(password, 10);
      const user = await _UserRepository.default.create({
        username: username,
        email: email,
        password: passwordCrypt,
        role: role,
        profile: {
          create: {
            name: name,
            telephone: telephone,
            enabled: enabled
          }
        }
      });
      return response.json(user);
    }
  }

  async update(request, response) {
    const {
      id,
      role,
      telephone,
      enabled,
      companyId,
      unitId
    } = request.body;
    const companyById = await _CompanyRepository.default.findById(companyId);

    if (!companyById) {
      return response.status(404).json({
        error: 'Invalid companyId.'
      });
    }

    const unitById = await _UnitRepository.default.findById(unitId);

    if (!unitById) {
      return response.status(404).json({
        error: 'Invalid unitId.'
      });
    }

    const userUpdated = await _UserRepository.default.update(id, {
      role: role,
      profile: {
        update: {
          telephone: telephone,
          enabled: enabled,
          company: {
            connect: {
              id: companyId
            }
          },
          unit: {
            connect: {
              id: unitId
            }
          }
        }
      }
    });
    return response.json(userUpdated);
  }

}

var _default = new AutheticationController();

exports.default = _default;