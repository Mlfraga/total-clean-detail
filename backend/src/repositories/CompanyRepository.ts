import { Company, CompanyCreateInput, CompanyUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository'


class CompanyRepository extends BaseRepository<Company, CompanyCreateInput, CompanyUpdateInput> {
    findAll(): Promise<Company[]> {
        return this.prisma.company.findMany();
    }

    findById(id: number): Promise<Company | null> {
        return this.prisma.company.findOne({ where: { id } });
    }

    create(data: CompanyCreateInput): Promise<Company | null> {
        return this.prisma.company.create({ data });
    }

    update(id: number, data: CompanyUpdateInput): Promise<Company | null> {
        return this.prisma.company.update({ where: { id }, data });
    }

    delete(id: number): Promise<Company | null> {
        return this.prisma.company.delete({ where: { id } });
    }

    findByName(name: string): Promise<Company[]> {
        return this.prisma.company.findMany({ where: { name } });
    }

    findByCnpj(cnpj: string): Promise<Company[]> {
        return this.prisma.company.findMany({ where: { cnpj } });
    }


}

export default new CompanyRepository();