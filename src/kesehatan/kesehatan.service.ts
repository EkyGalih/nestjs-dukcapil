import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKesehatanDto } from './dto/create-kesehatan.dto';
import { UpdateKesehatanDto } from './dto/update-kesehatan.dto';
import { Kesehatan } from './entities/kesehatan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class KesehatanService {
  constructor(
    @InjectRepository(Kesehatan)
    private readonly KesehatanRepo: Repository<Kesehatan>,
  ) {}

  create(createKesehatanDto: CreateKesehatanDto) {
    const kesehatan = this.KesehatanRepo.create(createKesehatanDto);
    return this.KesehatanRepo.save(kesehatan);
  }

  findAll() {
    return this.KesehatanRepo.find({
      relations: ['penduduk'],
    });
  }

  async findOne(id: number) {
    const kesehatan = await this.KesehatanRepo.findOne({ where: { id } });
    if (!kesehatan) {
      throw new NotFoundException(`Kesehatan dengan id ${id} tidak ditemukan`);
    }
    return kesehatan;
  }

  async update(id: number, updateKesehatanDto: UpdateKesehatanDto) {
    await this.KesehatanRepo.update(id, updateKesehatanDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.KesehatanRepo.delete(id);
    return this.findAll();
  }
}
