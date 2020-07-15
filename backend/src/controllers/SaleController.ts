import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import JWT from 'jsonwebtoken';

import SaleRepository from '../repositories/SaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import CarRepository from '../repositories/CarRepository';
import AddressRepository from '../repositories/AddressRepository';
import UnitRepository from '../repositories/UnitRepository';
import ProfileRepository from '../repositories/ProfileRepository';
import { stat } from 'fs';
import { Status } from '@prisma/client';

interface Validate {
    store: SchemaOptions;
    findByStatus: SchemaOptions;
    findByUnit: SchemaOptions;
    findBySeller: SchemaOptions;
}

class SaleController {
    readonly validate: Validate = {
        store: {
            body: Joi.object({
                deliveryDate: Joi.date().required(),
                done: Joi.boolean().required(),
                companyPrice: Joi.number().required(),
                costPrice: Joi.number().required(),
                cpf: Joi.string().required(),
                car: Joi.string().required(),
                carPlate: Joi.string().required(),
                street: Joi.string().required(),
                houseNumber: Joi.string().required(),
                neighborhood: Joi.string().required(),
                city: Joi.string().required(),
            })
        },
        findByStatus: {
            body: Joi.object({
                doneSearch: Joi.string().required(),
            })
        },
        findByUnit: {
            body: Joi.object({
                unitId: Joi.number().required(),
            })
        },
        findBySeller: {
            body: Joi.object({
                sellerId: Joi.number().required(),
            })
        }
    }

    async index(request: Request, response: Response) {
        const sales = await SaleRepository.findAll();
        return response.json(sales);
    }

    async store(request: Request, response: Response) {
        const { deliveryDate, done, companyPrice, costPrice, cpf, car, carPlate, street, houseNumber, neighborhood, city } = request.body;
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const sellerId = decoded.payload.user.id;
        const role = decoded.payload.user.role;

        if(role !== "MANAGER" && role !== "SELLER"){
            return response
                .status(404)
                .json({ error: 'User is not allowed to make sales.' })
        }

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
        const { status } = request.query;

        if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
            return response
                .status(400)
                .json({ error: "Status not found." })
        }

        const sales = await SaleRepository.findByStatus(status as Status);

        return response.json(sales)
    }

    async findByUnit(request: Request, response: Response) {
        const { unitId } = request.params;

        console.log(unitId);

        const unit = await UnitRepository.findById(parseInt(unitId));

        if (!unit) {
            return response
                .status(404)
                .json({ error: 'Unit not found.' })
        }

        const sales = await SaleRepository.findByUnit(parseInt(unitId));

        return response.json(sales);

    }

    async findBySeller(request: Request, response: Response) {
        console.log(request.headers['authorization']);

        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const sellerId = decoded.payload.user.id

        const sales = await SaleRepository.findBySeller(parseInt(sellerId));

        return response.json(sales);

    }

    async updateStatus(request: Request, response: Response) {
        const { id } = request.params;
        const { status } = request.body;

        if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
            return response
                .status(400)
                .json({ error: "Status not found." })
        }

        const updatedSale = await SaleRepository.changeStatus(Number(id), status);

        return response
            .status(200)
            .json(updatedSale);

    }

}

export default new SaleController();