import { UserGetPayload, UserCreateInput, UserUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

type User = UserGetPayload<{
    include: { profile: { include: { company: true; unit: true } } };
}>

class UserRepository extends BaseRepository<User, UserCreateInput, UserUpdateInput> {
    readonly include = { profile: { include: { company: true, unit: true } } };
    findAll(): Promise<User[]> {
        return this.prisma.user.findMany({ include: this.include });
    }

    findById(id: number): Promise<User | null> {
        return this.prisma.user.findOne({ where: { id }, include: this.include });
    }

    create(data: UserCreateInput): Promise<User | null> {
        return this.prisma.user.create({ data, include: this.include });
    }

    update(id: number, data: UserUpdateInput): Promise<User | null> {
        return this.prisma.user.update({ where: { id }, data, include: this.include });
    }

    delete(id: number): Promise<User | null> {
        return this.prisma.user.delete({ where: { id }, include: this.include });
    }

    findByUsername(username: string): Promise<User | null> {
        return this.prisma.user.findOne({ where: { username }, include: this.include })
    }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findOne({ where: { email }, include: this.include })
    }

    setUnable(id: number): Promise<User | null> {
        return this.prisma.user.update({ where: { id }, data: { enabled: false }, include: this.include })
    }

}

export default new UserRepository();