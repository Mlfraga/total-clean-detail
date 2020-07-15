import { Service, ServiceCreateInput, ServiceUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

class ServiceRepository extends BaseRepository<Service, ServiceCreateInput, ServiceUpdateInput> {
    findAll(): Promise<Service[]> {
        return this.prisma.service.findMany();
    }

    findById(id: number): Promise<Service | null> {
        return this.prisma.service.findOne({ where: { id } });
    }

    create(data: ServiceCreateInput): Promise<Service | null> {
        return this.prisma.service.create({ data });
    }

    update(id: number, data: ServiceUpdateInput): Promise<Service | null> {
        return this.prisma.service.update({ where: { id }, data });
    }

    delete(id: number): Promise<Service | null> {
        return this.prisma.service.delete({ where: { id } });
    }

    findIfContainsName(name: string): Promise<Service[]> {
        return this.prisma.service.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });
    }

    findByName(name: string): Promise<Service[]> {
        return this.prisma.service.findMany({ where: { name } });
    }



}

export default new ServiceRepository();