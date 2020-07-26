import { PersonGetPayload, PersonCreateInput, PersonUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

type Person = PersonGetPayload<{
  include: { cars: true, address: true };
}>

class PersonRepository extends BaseRepository<Person, PersonCreateInput, PersonUpdateInput> {
  readonly include = { cars: true, address: true };
  findAll(): Promise<Person[]> {
    return this.prisma.person.findMany({ include: this.include });
  }

  findById(id: number): Promise<Person | null> {
    return this.prisma.person.findOne({ where: { id }, include: this.include });
  }

  create(data: PersonCreateInput): Promise<Person | null> {
    return this.prisma.person.create({ data, include: this.include });
  }

  update(id: number, data: PersonUpdateInput): Promise<Person | null> {
    return this.prisma.person.update({ where: { id }, data, include: this.include });
  }

  delete(id: number): Promise<Person | null> {
    return this.prisma.person.delete({ where: { id }, include: this.include });
  }

  findByContainsName(name: string): Promise<Person[]> {
    return this.prisma.person.findMany({ where: { name: { contains: name } }, include: this.include });
  }

  findByName(name: string): Promise<Person[]> {
    return this.prisma.person.findMany({ where: { name }, include: this.include });
  }

  findByCpf(cpf: string): Promise<Person[]> {
    return this.prisma.person.findMany({ where: { cpf }, include: this.include });
  }

  findByContainsCpf(cpf: string): Promise<Person[]> {
    return this.prisma.person.findMany({ where: { cpf: { contains: cpf } }, include: this.include });
  }


}

export default new PersonRepository();
