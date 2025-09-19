import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsetkeluargaDto } from './dto/create-asetkeluarga.dto';
import { UpdateAsetkeluargaDto } from './dto/update-asetkeluarga.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asetkeluarga } from './entities/asetkeluarga.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AsetkeluargaService {
  constructor(
    @InjectRepository(Asetkeluarga)
    private readonly AsetkeluargaRepo: Repository<Asetkeluarga>,
  ) {}

  async create(createAsetkeluargaDto: CreateAsetkeluargaDto): Promise<{
    status_code: number;
    message: string;
    data: Asetkeluarga;
  }> {
    const aset_keluarga = this.AsetkeluargaRepo.create(createAsetkeluargaDto);
    const saved = await this.AsetkeluargaRepo.save(aset_keluarga);

    return {
      status_code: HttpStatus.CREATED,
      message: 'Data aset keluarga berhasil disimpan',
      data: saved,
    };
  }

  // findAll() {
  //   return `This action returns all asetkeluarga`;
  // }

  async findOne(id: number): Promise<{
    status_code: number;
    data: Asetkeluarga;
  }> {
    const aset_keluarga = await this.AsetkeluargaRepo.findOne({
      where: { id },
      relations: ['keluarga'],
    });

    if (!aset_keluarga) {
      throw new NotFoundException(`Aset keluarga dengan id ${id} tidak ditemukan`);
    }

    return {
      status_code: HttpStatus.OK,
      data: aset_keluarga,
    };
  }

  async update(
    id: number,
    updateAsetkeluargaDto: UpdateAsetkeluargaDto,
  ): Promise<{
    status_code: number;
    message: string;
    data: Asetkeluarga;
  }> {
    await this.AsetkeluargaRepo.update(id, updateAsetkeluargaDto);
    const updated = await this.AsetkeluargaRepo.findOne({
      where: { id },
      relations: ['keluarga'],
    });

    if (!updated) {
      throw new NotFoundException(`Aset keluarga dengan id ${id} tidak ditemukan`);
    }

    return {
      status_code: HttpStatus.OK,
      message: `Data aset keluarga ${updated.keluarga.nama_kepala_keluarga} berhasil di update`,
      data: updated,
    };
  }

  async remove(id: number): Promise<{ status_code: number; message: string }> {
    const result = await this.AsetkeluargaRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Aset keluarga dengan ${id} tidak ditemukan`);
    }

    return {
      status_code: HttpStatus.OK,
      message: 'Data aset keluarga berhasil dihapus',
    };
  }
}
