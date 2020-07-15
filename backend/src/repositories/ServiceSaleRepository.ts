import { ServiceSaleGetPayload, ServiceSaleCreateInput, ServiceSaleUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

export type ServiceSale = ServiceSaleGetPayload<{
    include: { sale: { include: { seller: { include: { company: true, unit: true } }, person: true } }, service: true };
}>

class ServiceSaleRepository extends BaseRepository<ServiceSale, ServiceSaleCreateInput, ServiceSaleUpdateInput> {
    readonly include = { sale: { include: { seller: { include: { company: true, unit: true } }, person: true } }, service: true };
    findAll(): Promise<ServiceSale[]> {
        return this.prisma.serviceSale.findMany({ include: this.include });
    }

    findById(id: number): Promise<ServiceSale | null> {
        return this.prisma.serviceSale.findOne({ where: { id }, include: this.include });
    }

    create(data: ServiceSaleCreateInput): Promise<ServiceSale | null> {
        return this.prisma.serviceSale.create({ data, include: this.include });
    }

    update(id: number, data: ServiceSaleUpdateInput): Promise<ServiceSale | null> {
        return this.prisma.serviceSale.update({ where: { id }, data, include: this.include });
    }

    delete(id: number): Promise<ServiceSale | null> {
        return this.prisma.serviceSale.delete({ where: { id }, include: this.include });
    }

    filterSale(serviceId: number, companyId: number, unitId: number, startDeliveryDate: Date, endDeliveryDate: Date): Promise<ServiceSale[]> {
        return this.prisma.serviceSale.findMany({
            where: {
                service: {
                    id: serviceId,
                },
                sale: {
                    deliveryDate:
                    {
                        gte: startDeliveryDate,
                        lte: endDeliveryDate
                    },
                    seller: {
                        companyId: companyId,
                        unitId: unitId,
                    },

                }

            },
            include: this.include
        })
    }
}

export default new ServiceSaleRepository();