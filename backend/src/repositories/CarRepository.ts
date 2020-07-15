import { Car, CarCreateInput, CarUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';


class UserRepository extends BaseRepository<Car, CarCreateInput, CarUpdateInput> {
    findAll(): Promise<Car[]> {
        return this.prisma.car.findMany();
    }

    findById(id: number): Promise<Car | null> {
        return this.prisma.car.findOne({ where: { id } });
    }

    create(data: CarCreateInput): Promise<Car | null> {
        return this.prisma.car.create({ data });
    }

    update(id: number, data: CarUpdateInput): Promise<Car | null> {
        return this.prisma.car.update({ where: { id }, data });
    }

    delete(id: number): Promise<Car | null> {
        return this.prisma.car.delete({ where: { id } });
    }

    findByPlateAndPersonId(car: string, plate: string, personId: number): Promise<Car[]> {
        return this.prisma.car.findMany({ where: { car: car, carPlate: plate, personId: personId } })
    }
}

export default new UserRepository();