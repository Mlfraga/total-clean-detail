import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import { ptBR } from 'date-fns/locale'
import {  format, getDate, startOfDay, endOfDay} from 'date-fns';
import JWT from 'jsonwebtoken';

import SaleRepository from '../repositories/SaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import CarRepository from '../repositories/CarRepository';
import UnitRepository from '../repositories/UnitRepository';
import UserRepository from '../repositories/UserRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import CompanyServiceRepository from '../repositories/CompanyServiceRepository';

import { Status } from '@prisma/client';
import AppError from '../errors/AppError';

interface Validate {
  store: SchemaOptions;
  index: SchemaOptions;
  listSalesForReport: SchemaOptions;
  findByStatus: SchemaOptions;
  findByUnit: SchemaOptions;
  findBySeller: SchemaOptions;
  findByCompany: SchemaOptions;
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
    index: {
      query: Joi.object({
        date: Joi.date().allow(null),
        status: Joi.string().allow(null),
      })
    },
    listSalesForReport: {
      query: Joi.object({
        initialDate: Joi.date().allow(null),
        finalDate: Joi.date().allow(null),
        company: Joi.number().allow(null),
        service: Joi.number().allow(null),
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
    },
    findByCompany: {
      body: Joi.object({
        companyId: Joi.number().required(),
      })
    },
  }

  async index(request: Request, response: Response) {
    const {date, status} = request.query;

    let sales;

    if(date && status){
      const initialDay = startOfDay(new Date(date.toString()));
      const finalDay = endOfDay(new Date(date.toString()));

      if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
        return response
          .status(400)
          .json({ error: "Status not found." })
      }

      sales = await SaleRepository.findByDateAndStatus(initialDay, finalDay, status as Status);

      return response.json(sales);
    }

    if(date){
      const initialDay = startOfDay(new Date(date.toString()));
      const finalDay = endOfDay(new Date(date.toString()));

      sales = await SaleRepository.findByDate(initialDay, finalDay);

      return response.json(sales);
    }

    if(status){
      if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
        return response
          .status(400)
          .json({ error: "Status not found." })
      }

      sales = await SaleRepository.findByStatus(status as Status);

      return response.json(sales)
    }

    sales = await SaleRepository.findAll();

    return response.json(sales);
  }

  async listSalesForReport(request: Request, response: Response) {
    const {company, service, initialDate, finalDate} = request.query;

    let sales;

    if(company && service && initialDate && finalDate){
      sales = await SaleRepository.findWithAllFilters(Number(company), Number(service), startOfDay(new Date(initialDate.toString())), endOfDay(new Date(finalDate.toString())));

      console.log('FILTER');
    }

    sales = await SaleRepository.findAll();

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

   async findByUnit(request: Request, response: Response) {
    const { unitId } = request.params;

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

  async findByCompanyAndFinishedStatus(request: Request, response: Response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader?.split(' ')[1];
    const decoded: any = JWT.decode(String(token), { complete: true });

    const companyId = decoded.payload.user.profile.companyId;

    const sales = await SaleRepository.findByCompanyAndFinishedStatus(parseInt(companyId));

    return response.json(sales);
  }

  async updateStatus(request: Request, response: Response) {
    const { status, sales } = request.body;

    if (status !== "PENDING" && status !== "CONFIRMED" && status !== "CANCELED" && status !== "FINISHED") {
      return response
        .status(400)
        .json({ error: "Status not found." })
    }

    sales.forEach(async(element: Number) => {
      const data = await SaleRepository.changeStatus(Number(element), status);

      const subject = `Alteração no status do pedido ${element}`;
      let text;

      const sale = await SaleRepository.findById(Number(element));

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

      // let result = Mail.sendMail(text, subject, String(sellerEmail));

      return data;
    });

    return response
      .status(200)
      .json('updatedSales');

  }

  async getSaleBudget(request: Request, response: Response){
    const {services} = request.body;

    let costPrice: number = 0;

    services.filter(async (id: number ) => {
      const serviceById = await ServiceRepository.findById(id);
      console.log(serviceById);

      if (!serviceById) {
        return response
          .status(404)
          .json({ error: 'No service found with this ID.' })
      }
      costPrice += serviceById.price;
    });

    setTimeout(()=>{return response.json({costPrice})}, 100);
  }

  async getCompanySaleBudget(request: Request, response: Response){
    const {services, companyId} = request.body;

    let companyPrice: number = 0;

    services.filter(async (serviceId: number ) => {
      const serviceByIdAndServiceId = await CompanyServiceRepository.findByCompanyIdAndServiceId(Number(companyId), Number(serviceId));

      if (!serviceByIdAndServiceId) {
        return response
        .status(404)
        .json({ error: 'No service found with this ID.' })
      }

      serviceByIdAndServiceId.filter(service => {
        companyPrice += service.price;
      })
    });

    setTimeout(()=>{return response.json({companyPrice})}, 100);
  }

}

export default new SaleController();
