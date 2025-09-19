import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createPendidikanDto: CreatePendidikanDto): Promise<{
    status_code: number;
    message: string;
    data: Pendidikan;
  }> {
    const pendidikan = this.PendidikanRepo.create(createPendidikanDto);
    const saved = await this.PendidikanRepo.save(pendidikan);

    return {
      status_code: HttpStatus.CREATED,
      message: 'Data pendidikan berhasil disimpan',
      data: saved,
    };
  }

  // findAll(): Promise<Pendidikan[]> {
  //   return this.PendidikanRepo.find({
  //     relations: ['penduduk'],
  //   });
  // }

  async findOne(id: number): Promise<{
    status_code: number;
    data: Pendidikan;
  }> {
    const pendidikan = await this.PendidikanRepo.findOne({ where: { id } });
    if (!pendidikan) {
      throw new NotFoundException(`Pendidikan dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      data: pendidikan,
    };
  }

  async update(
    id: number,
    updatePendidikanDto: UpdatePendidikanDto,
  ): Promise<{
    status_code: number;
    message: string;
    data: Pendidikan;
  }> {
    await this.PendidikanRepo.update(id, updatePendidikanDto);
    const updated = await this.PendidikanRepo.findOne({
      where: { id },
      relations: ['penduduk'],
    });

    if (!updated) {
      throw new NotFoundException(`Pendidikan dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      message: `Data pendidikan ${updated.penduduk?.nama_lengkap} berhasil di update`,
      data: updated,
    };
  }

  async remove(id: number): Promise<{ status_code: number; message: string }> {
    const result = await this.PendidikanRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Pendidikan dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      message: `Data pendidikan berhasil di hapus`,
    };
  }
}
