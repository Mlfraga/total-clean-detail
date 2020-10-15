import { CompanyGetPayload, CompanyCreateInput, CompanyUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository'

type Company = CompanyGetPayload<{
  include: { units: true, Profile: {include: {user: true}} };
}>

class CompanyRepository extends BaseRepository<Company, CompanyCreateInput, CompanyUpdateInput> {
  readonly include = { units: true, Profile: {include: {user: true}}}
  findAll(): Promise<Company[]> {
    return this.prisma.company.findMany({ include: this.include});
  }

  findById(id: number): Promise<Company | null> {
    return this.prisma.company.findOne({ where: { id }, include: this.include });
  }

  create(data: CompanyCreateInput): Promise<Company | null> {
    return this.prisma.company.create({ data, include: this.include });
  }

  update(id: number, data: CompanyUpdateInput): Promise<Company | null> {
    return this.prisma.company.update({ where: { id }, data, include: this.include });
  }

  delete(id: number): Promise<Company | null> {
    return this.prisma.company.delete({ where: { id }, include: this.include });
  }

  findByName(name: string): Promise<Company[]> {
    return this.prisma.company.findMany({ where: { name }, include: this.include });
  }

  findByCnpj(cnpj: string): Promise<Company[]> {
    return this.prisma.company.findMany({ where: { cnpj }, include: this.include });
  }

}

export default new CompanyRepository();
