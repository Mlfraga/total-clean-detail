import { UnitGetPayload, UnitCreateInput, UnitUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository'

type Unit = UnitGetPayload<{
  include: {company: true, Profile: {include: {user: true}}}
}>

class UnitRepository extends BaseRepository<Unit, UnitCreateInput, UnitUpdateInput> {
  readonly include = {company: true, Profile: {include: {user: true}}}
  findAll(): Promise<Unit[]> {
    return this.prisma.unit.findMany({include: this.include});
  }

  findById(id: number): Promise<Unit | null> {
    return this.prisma.unit.findOne({ where: { id }, include: this.include });
  }

  create(data: UnitCreateInput): Promise<Unit | null> {
    return this.prisma.unit.create({ data, include: this.include });
  }

  update(id: number, data: UnitUpdateInput): Promise<Unit | null> {
    return this.prisma.unit.update({ where: { id }, data, include: this.include });
  }

  delete(id: number): Promise<Unit | null> {
    return this.prisma.unit.delete({ where: { id },include: this.include });
  }

  findByCompany(companyId: number): Promise<Unit[]> {
    return this.prisma.unit.findMany({ where: { companyId }, include: this.include })
  }

  findByName(companyId: number, name: string): Promise<Unit[]> {
    return this.prisma.unit.findMany({ where: { companyId, name }, include: this.include })
  }

}

export default new UnitRepository();
