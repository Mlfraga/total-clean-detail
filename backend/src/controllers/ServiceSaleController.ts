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
        let formattedDate: string | null = null;

        if (!saleById) {
            return response
                .status(404)
                .json({ error: 'Sale not found.' })
        }

        const promises: Promise<CreateServiceSale>[] = serviceIds.map(async (id: number) => {
            const serviceById = await ServiceRepository.findById(id);

            if (!serviceById) {
                return null;
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

            formattedDate = format(
                data?.sale.deliveryDate,
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBR }
            );

            serviceSale.push(data);

            return data
        });

        const servicesSales = await Promise.all<CreateServiceSale>(promises);

        let services = servicesNames.join(', ');

        const subject = `${seller} solicitou uma nova prestação de serviço`;
        const text = `O vendedor ${seller} da concessionária ${company} unidade ${unit} solicitou uma nova prestação de serviço para ser entregue ao cliente no ${formattedDate}. Serviços a serem realizados: ${services} `;

        let result = Mail.sendMail(text, subject);

        console.log(result);
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

        console.log(startDeliveryDate)

        return response.json(filteredSales);
    }

}

export default new ServiceSaleController();