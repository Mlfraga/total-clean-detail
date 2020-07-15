import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import UnitRepository from '../repositories/UnitRepository'
import CompanyRepository from '../repositories/CompanyRepository'

import JWT from 'jsonwebtoken';

interface Validate {
    store: SchemaOptions;
    findByCompany: SchemaOptions;
}

class UnitController {
    readonly validate: Validate = {
        store: {
            body: Joi.object().keys({
                name: Joi.string().required(),
                telephone: Joi.string().required(),
                companyId: Joi.number().required(),
            }),
        },
        findByCompany: {
            body: Joi.object().keys({
                companyId: Joi.number().required()
            })
        }

    }

    async findByCompany(request: Request, response: Response) {
        const { companyId } = request.params;

        const unitsByCompany = await UnitRepository.findByCompany(Number(companyId));

        return response.json(unitsByCompany)
    }

    async store(request: Request, response: Response) {
        const { name, telephone, companyId } = request.body;

        const company = await CompanyRepository.findById(companyId);

        if (!company) {
            return response
                .status(404)
                .json({ error: 'Company was not found.' });
        }

        const unitByName = await UnitRepository.findByName(companyId, name);

        if (unitByName.length > 0) {
            return response
                .status(409)
                .json({ error: 'Already has a unit of this company with that name.' });
        }

        const unit = await UnitRepository.create({
            name,
            telephone,
            company: {
                connect: { id: companyId }
            }
        })

        return response.json(unit);
    }
}

export default new UnitController();    