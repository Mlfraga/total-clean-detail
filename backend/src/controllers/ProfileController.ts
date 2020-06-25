import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import ProfileRepository from '../repositories/ProfileRepository'
import JWT from 'jsonwebtoken';

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

    async index(request: Request, response: Response) {
        const profiles = await ProfileRepository.findAll();

        return response.json(profiles);
    }

    async findByUnitId(request: Request, response: Response) {
        console.log(request.headers['authorization']);


        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader?.split(' ')[1];
        const decoded: any = JWT.decode(String(token), { complete: true });


        const unitId = decoded.payload.user.profile.unitId;

        const profiles = await ProfileRepository.findByUnitId(Number(unitId));

        return response.json(profiles);
    }

    async findByName(request: Request, response: Response) {
        const { name } = request.query;

        const profile = await ProfileRepository.findByName(String(name));

        return response.json(profile);
    }

}

export default new ProfileController();    