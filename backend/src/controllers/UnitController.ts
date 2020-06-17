import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import UnitRepository from '../repositories/UnitRepository'

interface Validate {
    store: SchemaOptions;
    findByCompany: SchemaOptions;
}

class UnitController {
    readonly validate: Validate = {
        store: {
            body: Joi.object().keys({
                name: Joi.string().required(),
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
        const { companyId } = request.body;

        const unitsByCompany = await UnitRepository.findByCompany(companyId);

        return response.json(unitsByCompany)
    }

    async store(request: Request, response: Response) {
        const { name, companyId } = request.body;

        const unitByName = await UnitRepository.findByName(companyId, name);

        if (unitByName.length > 0) {
            return response
                .status(409)
                .json({ error: 'already has a unit of this company with that name.' });
        }

        const unit = await UnitRepository.create({
            name: name,
            company: {
                connect: { id: companyId }
            }
        })

        return response.json(unit);
    }
}

export default new UnitController();    