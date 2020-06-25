import { SaleGetPayload, SaleCreateInput, SaleUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

type Sale = SaleGetPayload<{
    include: { seller: true, person: { include: { address: true } }, car: true, serviceSale: { include: { service: true } } };
}>

class SaleRepository extends BaseRepository<Sale, SaleCreateInput, SaleUpdateInput> {
    readonly include = { seller: true, person: { include: { address: true } }, car: true, serviceSale: { include: { service: true } } }
    findAll(): Promise<Sale[]> {
        return this.prisma.sale.findMany({ include: this.include });
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

    findByStatus(done: boolean): Promise<Sale[]> {
        return this.prisma.sale.findMany({ where: { done }, include: this.include });
    }

    findByUnit(unitId: number): Promise<Sale[]> {
        return this.prisma.sale.findMany({ where: { seller: { unitId } }, include: this.include });
    }

    findBySeller(sellerId: number): Promise<Sale[]> {
        return this.prisma.sale.findMany({ where: { sellerId }, include: this.include });
    }

    setDone(id: number): Promise<Sale | null> {
        return this.prisma.sale.update({ where: { id }, data: { done: true }, include: this.include });
    }
}

export default new SaleRepository();