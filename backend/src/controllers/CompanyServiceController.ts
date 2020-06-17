import { Request, Response, json } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import CompanyServiceRepository from '../repositories/CompanyServiceRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import CompanyRepository from '../repositories/CompanyRepository';

interface Validate {
    store: SchemaOptions;
    findByCompanyId: SchemaOptions;
    findByCompanyIdAndServiceId: SchemaOptions;
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
        findByCompanyId: {
            params: Joi.object({
                id: Joi.number().required(),
            })
        },
        findByCompanyIdAndServiceId: {
            body: Joi.object({
                companyId: Joi.number().required(),
                serviceId: Joi.number().required()
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
        const { id } = request.params;

        const companyServicesByCompany = await CompanyServiceRepository.findByCompanyId(parseInt(id));

        if (!companyServicesByCompany) {
            return response
                .status(404)
                .json({ error: 'No service from this company was found.' })
        }

        return response.json(companyServicesByCompany)
    }

    async findByCompanyIdAndServiceId(request: Request, response: Response) {
        const { companyId, serviceId } = request.body;

        const companyServiceByCompanyIdAndServiceId = await CompanyServiceRepository
            .findByCompanyIdAndServiceId(parseInt(companyId), parseInt(serviceId));

        if (!companyServiceByCompanyIdAndServiceId) {
            return response
                .status(404)
                .json({ error: 'No service from this company was found.' })
        }

        return response.json(companyServiceByCompanyIdAndServiceId);
    }

}
export default new CompanyServiceController();
