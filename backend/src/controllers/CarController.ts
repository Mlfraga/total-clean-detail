import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import SaleServiceRepository from '../repositories/ServiceSaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import { create } from 'domain';
import CarRepository from '../repositories/CarRepository';

interface Validate {
  store: SchemaOptions;
}

class CarController {
  readonly validate: Validate = {
    store: {
      body: Joi.object({
        personId: Joi.number().required(),
        car: Joi.string().required(),
        carColor: Joi.string().required(),
        carModel: Joi.string(),
        carPlate: Joi.string().min(6).max(8).required(),
      })

    }
  }

  async store(request: Request, response: Response) {
    const { personId, car, carPlate, carColor, carModel } = request.body;

    const personById = await PersonRepository.findById(personId);

    if (!personById) {
      return response
        .status(409)
        .json({ error: 'Not found a person with this ID.' });
    }

    const createdCar = await CarRepository.create({
      car,
      carColor,
      carModel,
      carPlate,
      person: {
        connect: {
          id: personId
        }
      }
    })

    return response.json(createdCar);
  }

}

export default new CarController();
