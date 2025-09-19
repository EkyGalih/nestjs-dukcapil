import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLahankomoditaDto } from './dto/create-lahankomodita.dto';
import { UpdateLahankomoditaDto } from './dto/update-lahankomodita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lahankomoditas } from './entities/lahankomoditas.entity';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class LahankomoditasService {
  constructor(
    @InjectRepository(Lahankomoditas)
    private readonly LahankomoditasRepo: Repository<Lahankomoditas>,
  ) {}

  async create(createLahankomoditaDto: CreateLahankomoditaDto): Promise<{
    status_code: number;
    message: string;
    data: Lahankomoditas;
  }> {
    const lahan = this.LahankomoditasRepo.create(createLahankomoditaDto);
    const saved = await this.LahankomoditasRepo.save(lahan);

    return {
      status_code: HttpStatus.CREATED,
      message: `Data lahan berhasil disimpan`,
      data: saved,
    };
  }

  async findAll(
    page: number = 1,
    size: number = 10,
    search?: string,
  ): Promise<{
    status_code: number;
    items: Lahankomoditas[];
    pages: number;
  }> {
    const where = search ? [{ kategori: ILike(`%${search}%`) }] : undefined;

    const [items, total] = await this.LahankomoditasRepo.findAndCount({
      where,
      skip: (page - 1) * size,
      take: size,
      order: { created_at: 'DESC' },
    });

    const ids = items.map((i) => i.id);
    const dataLahankomoditas = await this.LahankomoditasRepo.find({
      where: { id: In(ids) },
      relations: ['keluarga'],
      order: { created_at: 'DESC' },
    });

    return {
      status_code: HttpStatus.OK,
      items: dataLahankomoditas,
      pages: Math.ceil(total / size),
    };
  }

  async findOne(id: number): Promise<{
    status_code: number;
    data: Lahankomoditas;
  }> {
    const lahan = await this.LahankomoditasRepo.findOne({
      where: { id },
      relations: ['keluarga'],
    });
    if (!lahan) {
      throw new NotFoundException(`Lahan dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      data: lahan,
    };
  }

  async update(
    id: number,
    updateLahankomoditaDto: UpdateLahankomoditaDto,
  ): Promise<{
    status_code: number;
    message: string;
    data: Lahankomoditas;
  }> {
    await this.LahankomoditasRepo.update(id, updateLahankomoditaDto);
    const updated = await this.LahankomoditasRepo.findOne({
      where: { id },
      relations: ['keluarga'],
    });

    if (!updated) {
      throw new NotFoundException(`Lahan dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      message: `Lahan keluarga ${updated.keluarga?.nama_kepala_keluarga} berhasil diperbaharui`,
      data: updated,
    };
  }

  async remove(id: number): Promise<{ status_code: number; message: string }> {
    const result = await this.LahankomoditasRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Data lahan dengan ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      message: `Lahan komoditas berhasil dihapus`,
    };
  }
}
