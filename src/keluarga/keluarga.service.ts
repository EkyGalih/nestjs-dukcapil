import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeluargaDto } from './dto/create-keluarga.dto';
import { UpdateKeluargaDto } from './dto/update-keluarga.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Keluarga } from './entities/keluarga.entity';
import { In, Repository, ILike } from 'typeorm';

@Injectable()
export class KeluargaService {
  constructor(
    @InjectRepository(Keluarga)
    private readonly KeluargaRepo: Repository<Keluarga>,
  ) {}

  async create(createKeluargaDto: CreateKeluargaDto): Promise<{
    message: string;
    data: Keluarga;
  }> {
    const keluarga = this.KeluargaRepo.create(createKeluargaDto);
    const saved = await this.KeluargaRepo.save(keluarga);

    return {
      message: 'Data keluarga berhasil disimpan',
      data: saved,
    };
  }

  async findAll(
    page: number = 1,
    size: number = 10,
    search?: string,
  ): Promise<{ items: Keluarga[]; pages: number }> {
    const where = search
      ? [{ nomor_kk: ILike(`%${search}%`) }, { nama_kepala_keluarga: ILike(`%${search}%`) }]
      : undefined;

    const [items, total] = await this.KeluargaRepo.findAndCount({
      where,
      skip: (page - 1) * size,
      take: size,
      order: { nomor_kk: 'ASC' },
    });

    const ids = items.map((i) => i.id);
    const dateKeluarga = await this.KeluargaRepo.find({
      where: { id: In(ids) },
      relations: ['penduduks', 'aset_keluargas', 'lahan_komoditas'],
      order: { nomor_kk: 'ASC' },
    });

    return {
      items: dateKeluarga,
      pages: Math.ceil(total / size),
    };
  }

  async findOne(id: number): Promise<Keluarga> {
    const keluarga = await this.KeluargaRepo.findOne({
      where: { id },
      relations: ['penduduks', 'aset_keluargas', 'lahan_komoditas'],
    });
    if (!keluarga) {
      throw new NotFoundException(`Keluarga dengan id ${id} tidak ditemukan`);
    }
    return keluarga;
  }

  async update(
    id: number,
    updateKeluargaDto: UpdateKeluargaDto,
  ): Promise<{
    message: string;
    data: Keluarga;
  }> {
    await this.KeluargaRepo.update(id, updateKeluargaDto);
    const updated = await this.KeluargaRepo.findOne({ where: { id } });

    if (!updated) {
      throw new NotFoundException(`Keluarga dengan id ${id} tidak ditemukan`);
    }

    return {
      message: 'Data keluarga berhasil di update',
      data: updated,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.KeluargaRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Keluarga dengan id ${id} tidak ditemukan`);
    }

    return {
      message: 'Data keluarga berhasil dihapus',
    };
  }
}
