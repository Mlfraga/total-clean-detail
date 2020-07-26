import { ProfileGetPayload, ProfileCreateInput, ProfileUpdateInput } from '@prisma/client';
import BaseRepository from './BaseRepository';

type Profile = ProfileGetPayload<{
  include: { user: true };
}>

class UserRepository extends BaseRepository<Profile, ProfileCreateInput, ProfileUpdateInput> {
  readonly include = { user: true };
  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({ include: this.include });
  }

  findById(id: number): Promise<Profile | null> {
    return this.prisma.profile.findOne({ where: { id }, include: this.include });
  }

  create(data: ProfileCreateInput): Promise<Profile | null> {
    return this.prisma.profile.create({ data, include: this.include });
  }

  update(id: number, data: ProfileUpdateInput): Promise<Profile | null> {
    return this.prisma.profile.update({ where: { id }, data, include: this.include });
  }

  delete(id: number): Promise<Profile | null> {
    return this.prisma.profile.delete({ where: { id }, include: this.include });
  }

  findByName(name: string): Promise<Profile[] | null> {
    return this.prisma.profile.findMany({ where: { name: { contains: name } }, include: this.include })
  }

  findByUnitId(id: number): Promise<Profile[]> {
    return this.prisma.profile.findMany({ where: { unitId: id }, include: this.include })
  }

}

export default new UserRepository();
