import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createKesehatanDto: CreateKesehatanDto): Promise<{
    status_code: number;
    message: string;
    data: Kesehatan;
  }> {
    const kesehatan = this.KesehatanRepo.create(createKesehatanDto);
    const saved = await this.KesehatanRepo.save(kesehatan);

    return {
      status_code: HttpStatus.CREATED,
      message: `Data kesehatan ${saved.penduduk?.nama_lengkap} berhasil disimpan`,
      data: saved,
    };
  }

  // findAll() {
  //   return this.KesehatanRepo.find({
  //     relations: ['penduduk'],
  //   });
  // }

  async findOne(id: number): Promise<{
    status_code: number;
    data: Kesehatan;
  }> {
    const kesehatan = await this.KesehatanRepo.findOne({
      where: { id },
      relations: ['penduduk'],
    });

    if (!kesehatan) {
      throw new NotFoundException(`Data Kesehatan ${id} tidak ditemukan`);
    }

    return {
      status_code: HttpStatus.OK,
      data: kesehatan,
    };
  }

  async update(
    id: number,
    updateKesehatanDto: UpdateKesehatanDto,
  ): Promise<{
    status_code: number;
    message: string;
    data: Kesehatan;
  }> {
    await this.KesehatanRepo.update(id, updateKesehatanDto);
    const updated = await this.KesehatanRepo.findOne({
      where: { id },
      relations: ['penduduk'],
    });

    if (!updated) {
      throw new NotFoundException(`Kesehatan ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      message: `Data kesehatan ${updated.penduduk?.nama_lengkap} berhasil di update`,
      data: updated,
    };
  }

  async remove(id: number): Promise<{ status_code: number; message: string }> {
    const result = await this.KesehatanRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Kesehatan dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      message: `Data kesehatan berhasil dihapus`,
    };
  }
}
