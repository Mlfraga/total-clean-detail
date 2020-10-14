import { Request, Response } from 'express';
import { SchemaOptions, Joi } from 'celebrate';
import CompanyRepository from '../repositories/CompanyRepository';
import CpfCnpjUtils from '../utils/CpfCnpjUtils';

interface Validate {
  store: SchemaOptions;
}

class CompanyController {

  readonly validate: Validate = {
    store: {
      body: Joi.object().keys({
        name: Joi.string().required(),
        telephone: Joi.string().min(9).max(11).required(),
        cnpj: Joi.string().length(14).required(),
      }),
    },
  };

  async index(request: Request, response: Response) {
    const companies = await CompanyRepository.findAll();

    return response.json(companies);
  }

  async findById(request: Request, response: Response) {
    const {companyId} = request.params;

    const company = await CompanyRepository.findById(parseInt(companyId));

    if(!company) {
      return response
      .status(404)
      .json({ error: 'Company not found.' })
    }

    return response.json(company);
  }

  async store(request: Request, response: Response) {
    const { name, telephone, cnpj } = request.body;

    const isCnpjValid = CpfCnpjUtils.isCnpjValid(cnpj);

    if (!isCnpjValid) {
      return response
        .status(409)
        .json({ error: 'Invalid CNPJ.' });
    }

    const companyByName = await CompanyRepository.findByName(name);

    if (companyByName.length > 0) {
      return response
        .status(409)
        .json({ error: 'Already has a company with this name.' });
    }

    const companyByCnpj = await CompanyRepository.findByCnpj(cnpj);

    if (companyByCnpj.length > 0) {
      return response
        .status(409)
        .json({ error: 'Already has a company with this CNPJ.' });
    }


    const company = await CompanyRepository.create({
      name: name,
      telephone: telephone,
      cnpj: cnpj
    })

    return response.json(company);

  }

}
export default new CompanyController();
