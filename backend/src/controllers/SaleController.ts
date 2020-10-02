import { create } from 'domain';
import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import { ptBR } from 'date-fns/locale'
import { parseISO, format, formatRelative, formatDistance, } from 'date-fns';
import JWT from 'jsonwebtoken';

import SaleRepository from '../repositories/SaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import CarRepository from '../repositories/CarRepository';
import UnitRepository from '../repositories/UnitRepository';
import UserRepository from '../repositories/UserRepository';
import Mail from "../services/mail";

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
        availabilityDate: Joi.date().required(),
        companyPrice: Joi.number().required(),
        costPrice: Joi.number().required(),
        source: Joi.string().required(),
        name: Joi.string().required(),
        cpf: Joi.string().required(),
        car: Joi.string().required(),
        carPlate: Joi.string().required().min(7).max(8),
        carModel: Joi.string().required(),
        carColor: Joi.string().required(),
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
    const { deliveryDate, availabilityDate, done, companyPrice, costPrice, source, name, cpf, car, carPlate, carColor,
      carModel, } = request.body;
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];
    const decoded: any = JWT.decode(String(token), { complete: true });

    const sellerId = decoded.payload.user.id;
    const role = decoded.payload.user.role;

    if (role !== "MANAGER" && role !== "SELLER") {
      return response
        .status(404)
        .json({ error: 'User is not allowed to make sales.' })
    }

    if (source !== "NEW" && source !== "USED" && source !== "WORKSHOP") {
      return response
        .status(404)
        .json({ error: 'The source is unavailable.' })
    }

    const personByCpf = await PersonRepository.findByCpf(cpf);

    if (personByCpf.length === 0) {
      const person = await PersonRepository.create({
        name,
        cpf,
      })

      const createdCar = await CarRepository.create({
        car,
        carColor,
        carModel,
        carPlate,
        person: {
          connect: {
            id: person?.id
          }
        }
      })

      if (!createdCar) {
        return response
          .status(400)
          .json({ error: 'Car cannot be registered.' })
      }

      const sale = await SaleRepository.create(
        {
          deliveryDate,
          availabilityDate,
          companyPrice,
          costPrice,
          source,
          seller: {
            connect: {
              userId: sellerId
            }
          },
          person: {
            connect: {
              id: person?.id
            }
          },
          car: {
            connect: {
              id: createdCar.id
            }
          }
        })

      return response.json(sale);
    } else if (personByCpf.length > 1) {
      return response
        .status(409)
        .json({ error: 'One or more users have been found.' })
    }

    const carByPlateAndPersonId = await CarRepository.findByPlateAndPersonId(car, carPlate, personByCpf[0].id);

    if (carByPlateAndPersonId.length === 0) {
      const createdCar = await CarRepository.create({
        car,
        carColor,
        carModel,
        carPlate,
        person: {
          connect: {
            id: personByCpf[0].id
          }
        }
      })

      if (!createdCar) {
        return response
          .status(400)
          .json({ error: 'Car cannot be registered.' })
      }

      const sale = await SaleRepository.create(
        {
          deliveryDate,
          availabilityDate,
          companyPrice,
          costPrice,
          source,
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
              id: createdCar.id
            }
          }
        })

      return response.json(sale);
    }

    const sale = await SaleRepository.create(
      {
        deliveryDate,
        availabilityDate,
        companyPrice,
        costPrice,
        source,
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
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];
    const decoded: any = JWT.decode(String(token), { complete: true });

    const sellerId = decoded.payload.user.id;

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

    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];
    const decoded: any = JWT.decode(String(token), { complete: true });

    const updatedSale = await SaleRepository.changeStatus(Number(id), status);
    const subject = `Alteração no status do pedido ${id}`;
    let text;

    const sale = await SaleRepository.findById(Number(id));

    if (!sale) {
      return null;
    }

    let formattedDate: string | null = null;

    formattedDate = format(
      sale?.deliveryDate,
      "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
      { locale: ptBR }
    );

    let statusText;
    if (status === 'CONFIRMED') {
      statusText = 'confirmado'
    }
    if (status === 'CANCELED') {
      statusText = 'cancelado'
    }
    if (status === 'FINISHED') {
      statusText = 'finalizado'
    }

    text = `O pedido do cliente ${sale?.person.name}, slocitado pelo vendedor ${sale?.seller.name} no ${formattedDate} teve seu status alterado para ${statusText}. `

    const sellerUser = await UserRepository.findById(sale.seller.id);
    const sellerEmail = sellerUser?.email;
    let result = Mail.sendMail(text, subject, String(sellerEmail));

    console.log(sellerUser?.email);

    return response
      .status(200)
      .json(updatedSale);

  }

}

export default new SaleController();
