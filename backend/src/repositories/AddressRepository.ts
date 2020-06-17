import { Address, AddressCreateInput, AddressUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';


class AddressRepository extends BaseRepository<Address, AddressCreateInput, AddressUpdateInput> {
    findAll(): Promise<Address[]> {
        return this.prisma.address.findMany();
    }

    findById(id: number): Promise<Address | null> {
        return this.prisma.address.findOne({ where: { id } });
    }

    create(data: AddressCreateInput): Promise<Address | null> {
        return this.prisma.address.create({ data });
    }

    update(id: number, data: AddressUpdateInput): Promise<Address | null> {
        return this.prisma.address.update({ where: { id }, data });
    }

    delete(id: number): Promise<Address | null> {
        return this.prisma.address.delete({ where: { id } });
    }

    findByPersonIdAndAddress(personId: number, street: string, houseNumber: string, neighborhood: string, city: string): Promise<Address[]> {
        return this.prisma.address.findMany({ where: { personId, street, houseNumber, neighborhood, city } })
    }
}

export default new AddressRepository();