import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import SaleServiceRepository from '../repositories/ServiceSaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import { create } from 'domain';
import AddressRepository from '../repositories/AddressRepository';

interface Validate {
    store: SchemaOptions;
}

class AddressController {
    readonly validate: Validate = {
        store: {
            body: Joi.object({
                personId: Joi.number().required(),
                street: Joi.string().required(),
                houseNumber: Joi.string().required(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
                uf: Joi.string().required(),
            })

        }
    }

    async store(request: Request, response: Response) {
        const { personId, street, houseNumber, neighborhood, city, uf } = request.body;

        const personById = await PersonRepository.findById(personId);

        if (!personById) {
            return response
                .status(409)
                .json({ error: 'Not found a person with this ID.' });
        }

        const address = await AddressRepository.create({
            street,
            houseNumber,
            neighborhood,
            city,
            uf,
            person: {
                connect: {
                    id: personId
                }
            }
        })

        return response.json(address);
    }

    async update(request: Request, response: Response) {
        const { personId, street, houseNumber, neighborhood, city } = request.body;

        const newAddress = await AddressRepository.update(personId, {
            street,
            houseNumber,
            neighborhood,
            city
        })
        return response.json(newAddress);

    }

}

export default new AddressController();