import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    data: Penduduk;
  }> {
    if (!createPendudukDto.keluargaId) {
      throw new BadRequestException('Data keluarga wajib di isi');
    }
    const penduduk = this.PendudukRepo.create(createPendudukDto);
    const saved = await this.PendudukRepo.save(penduduk);

    return {
      message: `Penduduk berhasil ditambahkan`,
      data: saved,
    };
  }

  async findAll(
    page = 1,
    size = 10,
    search?: string,
  ): Promise<{ items: Penduduk[]; pages: number }> {
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
      relations: ['keluarga', 'kesehatan', 'pendidikan'],
      order: { id: 'ASC' },
    });

    return {
      items: itemsWithRelations,
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
