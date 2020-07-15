import { Request, Response, json } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import { PrismaClient } from '@prisma/client'

import CompanyServiceRepository, { CompanyService } from '../repositories/CompanyServiceRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import CompanyRepository from '../repositories/CompanyRepository';
import { number } from '@hapi/joi';

import JWT from 'jsonwebtoken';
import { decode } from 'querystring';

interface Validate {
    store: SchemaOptions;
    findByCompanyIdAndServiceId: SchemaOptions;
    updatePrice: SchemaOptions;
}

class CompanyServiceController {
    readonly validate: Validate = {
        store: {
            body: Joi.object({
                price: Joi.number().required(),
                companyId: Joi.number().required(),
                serviceId: Joi.number().required()
            }),
        },
        findByCompanyIdAndServiceId: {
            body: Joi.object({
                companyId: Joi.number().required(),
                serviceId: Joi.number().required()
            })
        },
        updatePrice: {
            body: Joi.object({
                companyServiceId: Joi.number().required(),
                price: Joi.number().required()
            })
        }
    }

    async index(request: Request, response: Response) {
        const services = await CompanyServiceRepository.findAll();

        return response.json(services);
    }

    async store(request: Request, response: Response) {
        const { companyId, serviceId, price } = request.body;

        const serviceById = ServiceRepository.findById(serviceId);

        if (!serviceById) {
            return response
                .status(404)
                .json({ error: 'No service found with this ID.' })
        }

        const companyById = CompanyRepository.findById(companyId);

        if (!companyById) {
            return response
                .status(404)
                .json({ error: 'No company found with this ID.' })
        }

        const serviceByCompany = CompanyServiceRepository.findByCompanyIdAndServiceId(companyId, serviceId);

        if ((await serviceByCompany).length > 0) {
            return response
                .status(409)
                .json({ error: 'This service was already created by this company.' })
        }

        const companyService = await CompanyServiceRepository.store({
            price: price,
            company: {
                connect: { id: companyId }
            },
            service: {
                connect: { id: serviceId }
            }
        })

        return response.json(companyService);

    }

    async findByCompanyId(request: Request, response: Response) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });
        
        const id = decoded.payload.user.profile.companyId;
        
        if(!id ){
            return response 
            .status(404)
            .json({message: "This user is not linked to a company."})
        }

        const companyServicesByCompany = await CompanyServiceRepository.findByCompanyId(parseInt(id));

        if (!companyServicesByCompany) {
            return response
                .status(404)
                .json({ error: 'No service from this company was found.' })
        }

        return response.json(companyServicesByCompany)
    }

    async findByCompanyIdAndServiceId(request: Request, response: Response) {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });

        const companyId = decoded.payload.user.profile.companyId;

        const { serviceId } = request.query;

        const companyServiceByCompanyIdAndServiceId = await CompanyServiceRepository
            .findByCompanyIdAndServiceId(Number(companyId), Number(serviceId));

        if (!companyServiceByCompanyIdAndServiceId) {
            return response
                .status(404)
                .json({ error: 'No service from this company was found.' })
        }

        return response.json(companyServiceByCompanyIdAndServiceId);
    }

    async updatePrice(request: Request, response: Response) {
        const servicesData: Array<{
            companyServiceId: number; price: number
        }> = request.body;

        const promises: Promise<CompanyService | null>[] = servicesData.map(async ({ companyServiceId, price }) => {

            const companyServiceById = await CompanyServiceRepository.findById(companyServiceId);

            if (!companyServiceById) {
                return null
            }

            const companyServices = await CompanyServiceRepository.updatePrice(companyServiceId, price);

            return companyServices;
        })

        const updatedServices = await Promise.all(promises.filter((promise) => promise !== null));

        return response.json(updatedServices);
    }

}
export default new CompanyServiceController();
