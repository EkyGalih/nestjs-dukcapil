import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePendudukDto } from './dto/create-penduduk.dto';
import { UpdatePendudukDto } from './dto/update-penduduk.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Penduduk } from './entities/penduduk.entity';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class PendudukService {
  constructor(
    @InjectRepository(Penduduk)
    private readonly PendudukRepo: Repository<Penduduk>,
  ) {}

  async create(createPendudukDto: CreatePendudukDto): Promise<{
    message: string;
    status_code: number;
    data: Penduduk;
  }> {
    if (!createPendudukDto.keluarga_id) {
      throw new BadRequestException('Data keluarga wajib di isi');
    }
    const penduduk = this.PendudukRepo.create(createPendudukDto);
    const saved = await this.PendudukRepo.save(penduduk);

    return {
      message: `Penduduk berhasil ditambahkan`,
      status_code: HttpStatus.CREATED,
      data: saved,
    };
  }

  async findAll(
    page = 1,
    size = 10,
    search?: string,
  ): Promise<{ status_code: number; items: Penduduk[]; pages: number }> {
    const where = search
      ? [{ nama_lengkap: ILike(`%${search}%`) }, { nik: ILike(`%${search}%`) }]
      : undefined;
    const [items, total] = await this.PendudukRepo.findAndCount({
      where,
      skip: (page - 1) * size,
      take: size,
      order: { id: 'ASC' },
    });

    const ids = items.map((i) => i.id);
    const itemsWithRelations = await this.PendudukRepo.find({
      where: { id: In(ids) },
      relations: ['pendataan', 'keluarga', 'kesehatan', 'pendidikan'],
      order: { id: 'ASC' },
    });

    return {
      status_code: HttpStatus.OK,
      items: itemsWithRelations,
      pages: Math.ceil(total / size),
    };
  }

  async findOne(id: number): Promise<{
    status_code: number;
    data: Penduduk;
  }> {
    const penduduk = await this.PendudukRepo.findOne({
      where: { id },
      select: {
        pendataan: {
          pendata: true,
        },
      },
      relations: ['pendataan', 'keluarga', 'kesehatan', 'pendidikan'],
    });
    if (!penduduk) {
      throw new NotFoundException(`Penduduk dengan id ${id} tidak ditemukan`);
    }
    return {
      status_code: HttpStatus.OK,
      data: penduduk,
    };
  }

  async update(
    id: number,
    updatePendudukDto: UpdatePendudukDto,
  ): Promise<{
    message: string;
    status_code: number;
    data: Penduduk;
  }> {
    await this.PendudukRepo.update(id, updatePendudukDto);
    const updated = await this.PendudukRepo.findOne({ where: { id } });

    if (!updated) {
      throw new NotFoundException(`Penduduk dengan id ${id} tidak ditemukan`);
    }

    return {
      message: `Data ${updated.nama_lengkap} berhasil di update`,
      status_code: HttpStatus.OK,
      data: updated,
    };
  }

  async remove(id: number): Promise<{ status_code: number; message: string }> {
    const result = await this.PendudukRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Penduduk dengan id ${id} tidak ditemukan`);
    }

    return {
      status_code: HttpStatus.OK,
      message: 'Data penduduk berhasil dihapus',
    };
  }
}
