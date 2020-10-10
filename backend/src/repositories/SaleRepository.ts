import { SaleGetPayload, SaleCreateInput, SaleUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

type Sale = SaleGetPayload<{
  include: { seller: true, person: true, car: true, serviceSale: { include: { service: true } } };
}>

type Status = "PENDING" | "CONFIRMED" | "CANCELED" | "FINISHED" | undefined;

class SaleRepository extends BaseRepository<Sale, SaleCreateInput, SaleUpdateInput> {
  readonly include = { seller: true, person: true, car: true, serviceSale: { include: { service: true } } }
  findAll(): Promise<Sale[]> {
    return this.prisma.sale.findMany({ include: this.include, orderBy:{requestDate: 'desc'}  });
  }

  findById(id: number): Promise<Sale | null> {
    return this.prisma.sale.findOne({ where: { id }, include: this.include });
  }

  create(data: SaleCreateInput): Promise<Sale | null> {
    return this.prisma.sale.create({ data, include: this.include });
  }

  update(id: number, data: SaleUpdateInput): Promise<Sale | null> {
    return this.prisma.sale.update({ where: { id }, data, include: this.include });
  }

  delete(id: number): Promise<Sale | null> {
    return this.prisma.sale.delete({ where: { id }, include: this.include });
  }

  findByStatus(status: Status): Promise<Sale[]> {
    return this.prisma.sale.findMany({ where: { status }, include: this.include, orderBy:{requestDate: 'desc'} });
  }

  findByUnit(unitId: number): Promise<Sale[]> {
    return this.prisma.sale.findMany({ where: { seller: { unitId } }, include: this.include, orderBy:{requestDate: 'desc'} });
  }

  findBySeller(sellerId: number): Promise<Sale[]> {
    return this.prisma.sale.findMany({ where: { sellerId }, include: this.include, orderBy:{requestDate: 'desc'} });
  }

  findByCompanyAndFinishedStatus(companyId: number): Promise<Sale[]> {
    return this.prisma.sale.findMany({ where: { status: 'FINISHED', seller:{ companyId } }, include: this.include, orderBy:{requestDate: 'desc'} });
  }

  changeStatus(id: number, status: Status): Promise<Sale | null> {
    return this.prisma.sale.update({ where: { id }, data: { status: status }, include: this.include });
  }

}

export default new SaleRepository();
