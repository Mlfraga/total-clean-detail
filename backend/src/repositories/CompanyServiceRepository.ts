import { CompanyServiceGetPayload, CompanyServiceCreateInput, CompanyServiceUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

type CompanyService = CompanyServiceGetPayload<{
    include: { company: true, service: true };
}>

class UserRepository extends BaseRepository<CompanyService, CompanyServiceCreateInput, CompanyServiceUpdateInput> {
    readonly include = { company: true, service: true };
    findAll(): Promise<CompanyService[]> {
        return this.prisma.companyService.findMany({ include: this.include });
    }

    findById(id: number): Promise<CompanyService | null> {
        return this.prisma.companyService.findOne({ where: { id }, include: this.include });
    }

    store(data: CompanyServiceCreateInput): Promise<CompanyService | null> {
        return this.prisma.companyService.create({ data, include: this.include });
    }

    update(id: number, data: CompanyServiceUpdateInput): Promise<CompanyService | null> {
        return this.prisma.companyService.update({ where: { id }, data, include: this.include });
    }

    delete(id: number): Promise<CompanyService | null> {
        return this.prisma.companyService.delete({ where: { id }, include: this.include });
    }

    findByCompanyId(companyId: number): Promise<CompanyService[]> {
        return this.prisma.companyService.findMany({ where: { companyId }, include: this.include })
    }

    findByCompanyIdAndServiceId(companyId: number, serviceId: number): Promise<CompanyService[]> {
        return this.prisma.companyService.findMany({ where: { companyId, serviceId }, include: this.include })
    }

}

export default new UserRepository();