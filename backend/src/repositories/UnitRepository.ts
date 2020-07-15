import { Unit, UnitCreateInput, UnitUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository'

class UnitRepository extends BaseRepository<Unit, UnitCreateInput, UnitUpdateInput> {
    findAll(): Promise<Unit[]> {
        return this.prisma.unit.findMany();
    }

    findById(id: number): Promise<Unit | null> {
        return this.prisma.unit.findOne({ where: { id } });
    }

    create(data: UnitCreateInput): Promise<Unit | null> {
        return this.prisma.unit.create({ data });
    }

    update(id: number, data: UnitUpdateInput): Promise<Unit | null> {
        return this.prisma.unit.update({ where: { id }, data });
    }

    delete(id: number): Promise<Unit | null> {
        return this.prisma.unit.delete({ where: { id } });
    }

    findByCompany(companyId: number): Promise<Unit[] > {
        return this.prisma.unit.findMany({ where: {companyId} })
    }

    findByName(companyId: number, name: string): Promise<Unit[] > {
        return this.prisma.unit.findMany({ where: {companyId, name}  })
    }

}

export default new UnitRepository();