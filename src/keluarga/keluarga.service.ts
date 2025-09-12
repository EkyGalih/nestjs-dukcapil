import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeluargaDto } from './dto/create-keluarga.dto';
import { UpdateKeluargaDto } from './dto/update-keluarga.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Keluarga } from './entities/keluarga.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KeluargaService {
  constructor(
    @InjectRepository(Keluarga)
    private readonly KeluargaRepo: Repository<Keluarga>,
  ) {}

  create(createKeluargaDto: CreateKeluargaDto): Promise<Keluarga> {
    const keluarga = this.KeluargaRepo.create(createKeluargaDto);
    return this.KeluargaRepo.save(keluarga);
  }

  findAll(): Promise<Keluarga[]> {
    return this.KeluargaRepo.find({
      relations: ['penduduks', 'aset_list', 'lahan_list'],
    });
  }

  async findOne(id: number): Promise<Keluarga> {
    const keluarga = await this.KeluargaRepo.findOne({ where: { id } });
    if (!keluarga) {
      throw new NotFoundException(`Keluarga dengan id ${id} tidak ditemukan`);
    }
    return keluarga;
  }

  async update(
    id: number,
    updateKeluargaDto: UpdateKeluargaDto,
  ): Promise<Keluarga> {
    await this.KeluargaRepo.update(id, updateKeluargaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.KeluargaRepo.delete(id);
  }
}
