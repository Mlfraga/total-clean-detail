import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import { PrismaClient } from '@prisma/client';
import { parseISO, format, formatRelative, formatDistance, } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { ServiceSale } from '../repositories/ServiceSaleRepository';
import SaleRepository from '../repositories/SaleRepository';
import PersonRepository from '../repositories/PersonRepository';
import CarRepository from '../repositories/CarRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import ServiceSaleRepository from '../repositories/ServiceSaleRepository';

import Mail from "../services/mail";
import { start } from 'repl';

interface Validate {
  store: SchemaOptions;
}

interface CreateServiceSale {
  saleId: number;
  serviceIds: number[]
}

class ServiceSaleController {
  readonly validate: Validate = {
    store: {
      body: Joi.object({
        saleId: Joi.number().required(),
        serviceIds: Joi.array().required()
      })

    }
  }

  async index(request: Request, response: Response) {
    const serviceSales = await ServiceSaleRepository.findAll();

    return response.json(serviceSales);
  }

  async store(request: Request, response: Response) {
    const { saleId, serviceIds } = request.body;

    const saleById = await SaleRepository.findById(saleId);

    const serviceSale: ServiceSale[] = [];
    const servicesNames: string[] = [];
    let company: string | undefined = undefined;
    let unit: string | undefined = undefined;
    let seller: string | null = null;
    let sellerContact: string | null = null;
    let requestFormattedDate: string | null = null;
    let deliveryFormattedDate: string | null = null;
    let availabilityFormattedDate: string | null = null;
    let sourceCar: string | null = null;
    let costValue: number | null = null;
    let companyValue: number | null = null;

    if (!saleById) {
      return response
        .status(404)
        .json({ error: 'Sale not found.' })
    }

    const promises: Promise<CreateServiceSale>[] = serviceIds.map(async (id: number) => {
      const serviceById = await ServiceRepository.findById(id);

      if (!serviceById) {
        return response
          .status(404)
          .json({ error: 'Service not found.' })
      }

      servicesNames.push(serviceById?.name);

      const data = await ServiceSaleRepository.create({
        sale: {
          connect: {
            id: saleId
          }
        },
        service: {
          connect: {
            id: id
          }
        }
      })

      if (!data) {
        return null;
      }

      company = data?.sale.seller.company?.name;

      unit = data.sale.seller.unit?.name;

      seller = data?.sale.seller.name;

      sellerContact = data?.sale.seller.telephone;

      deliveryFormattedDate = format(
        data?.sale.deliveryDate,
        "'dia' dd 'de' MMMM', às ' HH:mm'h'",
        { locale: ptBR }
      );

      availabilityFormattedDate = format(
        data?.sale.availabilityDate,
        "'dia' dd 'de' MMMM', às ' HH:mm'h'",
        { locale: ptBR }
      );

      requestFormattedDate = format(
        data?.sale.requestDate,
        "'dia' dd 'de' MMMM', às ' HH:mm'h'",
        { locale: ptBR }
      );

      sourceCar = data.sale.source;

      costValue = data.sale.costPrice;

      companyValue = data.sale.companyPrice;

      serviceSale.push(data);


      return data
    });

    const servicesSales = await Promise.all<CreateServiceSale>(promises);

    let services = servicesNames.join(', ');

    const subject = `SOLICITAÇÃO PEDIDO ${saleId}.`;
    const text = `SOLICITAÇÃO DO PEDIDO ${saleId}

- DATA E HORA DA SOLICITAÇÃO: ${requestFormattedDate},

- VENDEDOR: ${seller},

- CONTATO VENDEDOR: ${sellerContact},

- CONCESSIONÁRIA: ${company},

- UNIDADE: ${unit},

- DATA E HORA DE DISPONIBILIDADE: ${availabilityFormattedDate},

- DATA E HORA DE ENTREGA: ${deliveryFormattedDate},

- SERVIÇOS:
${services}

- VALOR A RECEBER: ${costValue},

- VALOR COBRADO PELA CONCESSIONÁRIA: ${companyValue},

- ORIGEM: ${sourceCar},

- CLIENTE: ${saleById.person.name},
`;

    let result = Mail.sendMailToAdmin(text, subject);

    // console.log(result);
    return response.json(servicesSales);
  }

  async filterSale(request: Request, response: Response) {
    const { serviceId, companyId, unitId, startDeliveryDate, endDeliveryDate } = request.query

    const filteredSales = await ServiceSaleRepository.filterSale(
      Number(serviceId),
      Number(companyId),
      Number(unitId),
      new Date(String(startDeliveryDate)),
      new Date(String(endDeliveryDate)));

    return response.json(filteredSales);
  }

}

export default new ServiceSaleController();
