import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';

import PersonRepository from '../repositories/PersonRepository';

interface Validate {
    store: SchemaOptions;
}

class PersonController {
    readonly validate: Validate = {
        store: {
            body: Joi.object({
                cpf: Joi.string().length(11).required(),
                name: Joi.string().required(),
                telephone: Joi.string().min(9).max(11).required()
            })

        }
    }

    async store(request: Request, response: Response) {
        const { name, cpf, telephone } = request.body;

        const personByCpf = await PersonRepository.findByCpf(cpf);

        if (personByCpf.length > 0) {
            return response
                .status(409)
                .json({ error: 'Already has a person with this CNPJ.' });
        }

        const person = await PersonRepository.create({
            name,
            cpf,
            telephone
        })

        return response.json(person);
    }

}

export default new PersonController();