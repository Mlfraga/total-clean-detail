import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import ProfileRepository from '../repositories/ProfileRepository'

interface Validate {
    findByName: SchemaOptions;
    findByUnitId: SchemaOptions;
}

class ProfileController {
    readonly validate: Validate = {
        findByUnitId: {
            body: Joi.object().keys({
                unitId: Joi.number().required()
            })
        },
        findByName: {
            body: Joi.object().keys({
                name: Joi.string().required()
            })
        }

    }

    async findByUnitId(request: Request, response: Response) {
        const { unitId } = request.body

        const profiles = await ProfileRepository.findByUnitId(unitId);

        return response.json(profiles);
    }

    async findByName(request: Request, response: Response) {
        const { name } = request.query;

        const profile = await ProfileRepository.findByName(String(name));

        return response.json(profile);
    }

}

export default new ProfileController();    