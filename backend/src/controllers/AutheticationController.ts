import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserRepository from '../repositories/UserRepositry';
import CompanyRepository from '../repositories/CompanyRepository';
import UnitRepository from '../repositories/UnitRepository';
import { object } from '@hapi/joi';

import AutheticationMiddleware from '../middlewares/AutheticationMiddleware';

interface Validate {
  login: SchemaOptions;
  signUp: SchemaOptions;
}

class AutheticationController {
  readonly validate: Validate = {
    login: {
      body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    signUp: {
      body: Joi.object().keys({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string(),
        name: Joi.string().required(),
        telephone: Joi.string().required(),
        enabled: Joi.boolean().required(),
        companyId: Joi.number(),
        unitId: Joi.number(),
      }),
    }
  };

  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    const userByUsername = await UserRepository.findByUsername(username);

    if (!userByUsername) {
      return response
        .status(404)
        .json({ error: 'No user found with this username.' })
    }

    if (userByUsername.enabled === false) {
      return response
        .status(404)
        .json({ error: 'This user is not allowed to access.' })
    }

    const match = await bcrypt.compare(password, userByUsername.password);

    if (!match) {
      return response
        .status(401)
        .json({ error: 'Invalid username or password.' })
    }

    const accessToken = await AutheticationMiddleware.generateAccessToken(userByUsername);
    const refreshToken = await AutheticationMiddleware.generateReefreshToken(userByUsername);

    return response
      .status(200)
      .json({ userByUsername, accessToken, refreshToken })
  }

  async signUp(request: Request, response: Response) {
    const { username, email, password, role, name, telephone, enabled, companyId, unitId, } = request.body;

    const userByUsername = await UserRepository.findByUsername(username);

    if (userByUsername) {
      return response
        .status(404)
        .json({ error: 'Already has an user with this username.' })
    }

    const userByEmail = await UserRepository.findByEmail(email);

    if (userByEmail) {
      return response
        .status(404)
        .json({ error: 'Already has an user with this email.' })
    }

    if (companyId && unitId) {

      const companyById = await CompanyRepository.findById(companyId);

      if (!companyById) {
        return response
          .status(404)
          .json({ error: 'Invalid companyId.' })
      }

      const unitById = await UnitRepository.findById(unitId);

      if (!unitById) {
        return response
          .status(404)
          .json({ error: 'Invalid unitId.' })
      }

      const passwordCrypt = await bcrypt.hash(password, 10)

      const user = await UserRepository.create({
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
              connect: { id: companyId }
            },
            unit: {
              connect: { id: unitId }
            }

          }
        }

      })

      return response.json(user);
    } else {
      const passwordCrypt = await bcrypt.hash(password, 10)

      const user = await UserRepository.create({
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
      })

      return response.json(user);
    }

  }

  async update(request: Request, response: Response) {
    const { id, role, telephone, enabled, companyId, unitId, } = request.body;

    const companyById = await CompanyRepository.findById(companyId);

    if (!companyById) {
      return response
        .status(404)
        .json({ error: 'Invalid companyId.' })
    }

    const unitById = await UnitRepository.findById(unitId);

    if (!unitById) {
      return response
        .status(404)
        .json({ error: 'Invalid unitId.' })
    }

    const userUpdated = await UserRepository.update(id, {
      role: role,
      profile: {
        update: {
          telephone: telephone,
          enabled: enabled,
          company: {
            connect: { id: companyId }
          },
          unit: {
            connect: { id: unitId }
          }

        }
      }
    })

    return response.json(userUpdated);
  }
}

export default new AutheticationController();
