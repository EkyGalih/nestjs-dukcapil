import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLahankomoditaDto } from './dto/create-lahankomodita.dto';
import { UpdateLahankomoditaDto } from './dto/update-lahankomodita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lahankomoditas } from './entities/lahankomoditas.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LahankomoditasService {
  constructor(
    @InjectRepository(Lahankomoditas)
    private readonly LahankomoditasRepo: Repository<Lahankomoditas>,
  ) { }

  create(createLahankomoditaDto: CreateLahankomoditaDto): Promise<Lahankomoditas> {
    const lahan = this.LahankomoditasRepo.create(createLahankomoditaDto);
    return this.LahankomoditasRepo.save(lahan);
  }

  findAll(): Promise<Lahankomoditas[]> {
    return this.LahankomoditasRepo.find({
      relations: ['keluarga'],
    });
  }

  async findOne(id: number): Promise<Lahankomoditas> {
    const lahan = await this.LahankomoditasRepo.findOne({ where: { id } });
    if (!lahan) {
      throw new NotFoundException(`Lahan dengan id ${id} tidak ditemukan`);
    }
    return lahan;
  }

  async update(
    id: number,
    updateLahankomoditaDto: UpdateLahankomoditaDto,
  ): Promise<Lahankomoditas> {
    await this.LahankomoditasRepo.update(id, updateLahankomoditaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Lahankomoditas[]> {
    await this.LahankomoditasRepo.delete(id);
    return this.findAll();
  }
}
