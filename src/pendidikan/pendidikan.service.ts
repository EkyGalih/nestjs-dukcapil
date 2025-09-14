import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePendidikanDto } from './dto/create-pendidikan.dto';
import { UpdatePendidikanDto } from './dto/update-pendidikan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pendidikan } from './entities/pendidikan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PendidikanService {
  constructor(
    @InjectRepository(Pendidikan)
    private readonly PendidikanRepo: Repository<Pendidikan>,
  ) {}

  create(createPendidikanDto: CreatePendidikanDto): Promise<Pendidikan> {
    const pendidikan = this.PendidikanRepo.create(createPendidikanDto);
    return this.PendidikanRepo.save(pendidikan);
  }

  findAll(): Promise<Pendidikan[]> {
    return this.PendidikanRepo.find({
      relations: ['penduduk'],
    });
  }

  async findOne(id: number): Promise<Pendidikan> {
    const pendidikan = await this.PendidikanRepo.findOne({ where: { id } });
    if (!pendidikan) {
      throw new NotFoundException(`Pendidikan dengan id ${id} tidak ditemukan`);
    }
    return pendidikan;
  }

  async update(
    id: number,
    updatePendidikanDto: UpdatePendidikanDto,
  ): Promise<Pendidikan> {
    await this.PendidikanRepo.update(id, updatePendidikanDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Pendidikan[]> {
    await this.PendidikanRepo.delete(id);
    return this.findAll();
  }
}
