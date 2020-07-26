import { PrismaClient } from '@prisma/client';

export default abstract class BaseRepository<T, TCreateInput, TUpdateInput> {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findAll(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  create(data: TCreateInput): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: TUpdateInput): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
}
