import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePendudukDto } from './dto/create-penduduk.dto';
import { UpdatePendudukDto } from './dto/update-penduduk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Penduduk } from './entities/penduduk.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PendudukService {
  constructor(
    @InjectRepository(Penduduk)
    private readonly PendudukRepo: Repository<Penduduk>,
  ) {}

  create(createPendudukDto: CreatePendudukDto): Promise<Penduduk> {
    const penduduk = this.PendudukRepo.create(createPendudukDto);
    return this.PendudukRepo.save(penduduk);
  }

  async findAll(
    page = 1,
    size = 10,
    search?: string,
  ): Promise<{ items: Penduduk[]; pages: number }> {
    const where = search
      ? [{ nama_lengkap: ILike(`%${search}`) }, { nik: ILike(`%${search}`) }]
      : {};
    const [items, total] = await this.PendudukRepo.findAndCount({
      where,
      relations: ['keluarga', 'kesehatan', 'pendidikan'],
      skip: (page - 1) * size,
      take: size,
    });

    return {
      items,
      pages: Math.ceil(total / size),
    };
  }

  async findOne(id: number): Promise<Penduduk> {
    const penduduk = await this.PendudukRepo.findOne({
      where: { id },
      relations: ['keluarga', 'kesehatan', 'pendidikan'],
    });
    if (!penduduk) {
      throw new NotFoundException(`Penduduk dengan id ${id} tidak ditemukan`);
    }
    return penduduk;
  }

  async update(id: number, updatePendudukDto: UpdatePendudukDto): Promise<Penduduk> {
    await this.PendudukRepo.update(id, updatePendudukDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.PendudukRepo.delete(id);
  }
}
