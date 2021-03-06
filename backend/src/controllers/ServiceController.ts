import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import ServiceRepository from '../repositories/ServiceRepository';

interface Validate {
  store: SchemaOptions;
  update: SchemaOptions;
  findIfContainsName: SchemaOptions;
}

class ServiceController {
  readonly validate: Validate = {
    store: {
      body: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required()
      }),
    },
    update: {
      body: Joi.object().keys({
        name: Joi.string().allow(null),
        price: Joi.number().allow(null),
      }),
      params: Joi.object().keys({
        id: Joi.number().required(),
      })
    },
    findIfContainsName: {
      body: Joi.object().keys({
        name: Joi.string().required()
      })
    }
  };
  async index(request: Request, response: Response) {
    const services = await ServiceRepository.findAll();

    return response.json(services);
  }

  async findIfContainsName(request: Request, response: Response) {
    const { name } = request.query;

    const services = await ServiceRepository.findIfContainsName(String(name))

    return response.json(services);
  }

  async store(request: Request, response: Response) {
    const { name, price } = request.body;

    const serviceByName = await ServiceRepository.findByName(name);

    if (serviceByName.length > 0) {
      return response
        .status(409)
        .json({ error: 'Already has a service with this name.' });
    }

    const service = await ServiceRepository.create({
      name: name,
      price: price
    });

    return response.json(service);

  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, price } = request.body;

    if(name){
      const serviceByName = await ServiceRepository.findByName(name);

      if (serviceByName.length > 0) {
        return response
          .status(409)
          .json({ error: 'Already has a service with this name.' });
      }
    }

    const serviceById = await ServiceRepository.findById(Number(id));

    if (!serviceById) {
      return response
        .status(404)
        .json({ error: 'Service does not exists.' });
    }

    let dataSubmit = {}

    if(name && price){
      dataSubmit = {
        name: name,
        price: price
      }
    }

    if(name && !price){
      dataSubmit = {
        name: name,
      }
    }

    if(!name && price){
      dataSubmit = {
        price: price,
      }
    }

    const service = await ServiceRepository.update(Number(id), dataSubmit)

    return response.json(service);
  }

}

export default new ServiceController();
