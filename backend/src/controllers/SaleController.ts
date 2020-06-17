import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import SaleRepository from '../repositories/SaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import CarRepository from '../repositories/CarRepository';
import AddressRepository from '../repositories/AddressRepository';

interface Validate {
    store: SchemaOptions;
}

class SaleController {
    readonly validate: Validate = {
        store: {
            body: Joi.object({
                deliveryDate: Joi.date().required(),
                done: Joi.boolean().required(),
                companyPrice: Joi.number().required(),
                costPrice: Joi.number().required(),
                sellerId: Joi.number().required(),
                cpf: Joi.string().required(),
                car: Joi.string().required(),
                carPlate: Joi.string().required(),
                street: Joi.string().required(),
                houseNumber: Joi.string().required(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
            })

        }
    }

    async index(request: Request, response: Response) {
        const sales = await SaleRepository.findAll();
        return response.json(sales);
    }

    async store(request: Request, response: Response) {
        const { deliveryDate, done, companyPrice, costPrice, sellerId, cpf, car, carPlate, street, houseNumber, neighborhood, city } = request.body;

        const personByCpf = await PersonRepository.findByCpf(cpf);

        if (personByCpf.length === 0) {
            return response
                .status(404)
                .json({ error: 'User not found.' })
        } else if (personByCpf.length > 1) {
            return response
                .status(409)
                .json({ error: 'One or more users have been found.' })
        }

        const carByPlateAndPersonId = await CarRepository.findByPlateAndPersonId(car, carPlate, personByCpf[0].id);

        if (carByPlateAndPersonId.length === 0) {
            return response
                .status(404)
                .json({ error: 'Car not found.' })
        }

        const findByPersonIdAndAddress = await AddressRepository
            .findByPersonIdAndAddress(personByCpf[0].id, street, houseNumber, neighborhood, city);

        if (findByPersonIdAndAddress.length === 0) {
            return response
                .status(404)
                .json({ error: 'Address not found.' })
        }

        const sale = await SaleRepository.create(
            {
                deliveryDate,
                done,
                companyPrice,
                costPrice,
                seller: {
                    connect: {
                        userId: sellerId
                    }
                },
                person: {
                    connect: {
                        id: personByCpf[0].id
                    }
                },
                car: {
                    connect: {
                        id: carByPlateAndPersonId[0].id
                    }
                }
            })

        return response.json(sale);
    }

    async findByStatus(request: Request, response: Response) {
        const doneSearch = request.query.done;

        const done = doneSearch === 'true' ? true : false

        const sales = await SaleRepository.findByStatus(done);

        return response.json(sales)
    }

    async setDone(request: Request, response: Response) {
        const { id } = request.params;

        const doneSale = await SaleRepository.setDone(parseInt(id));

        return response.json(doneSale);
    }

}

export default new SaleController();