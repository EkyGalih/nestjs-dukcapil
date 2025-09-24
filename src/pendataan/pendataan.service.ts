import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePendataanDto } from './dto/create-pendataan.dto';
import { UpdatePendataanDto } from './dto/update-pendataan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pendataan } from './entities/pendataan.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PendataanService {
  constructor(
    @InjectRepository(Pendataan)
    private readonly PendataanRepo: Repository<Pendataan>,
  ) {}
  async create(createPendataanDto: CreatePendataanDto): Promise<{
    status_code: number;
    message: string;
    data: Pendataan;
  }> {
    const pendataan = this.PendataanRepo.create(createPendataanDto);
    const saved = await this.PendataanRepo.save(pendataan);

    return {
      status_code: HttpStatus.CREATED,
      message: 'Data pendataan berhasil disimpan',
      data: saved,
    };
  }

  async findAll(
    page: number = 1,
    size: number = 10,
  ): Promise<{
    status_code: number;
    items: Pendataan[];
    pages: number;
  }> {
    const [items, total] = await this.PendataanRepo.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: { id: 'ASC' },
    });

    const ids = items.map((i) => i.id);
    const itemsWithRelations = await this.PendataanRepo.find({
      where: { id: In(ids) },
      relations: [
        'keluarga',
        'aset_keluarga',
        'lahan',
        'penduduk',
        'kesehatan',
        'pendidikan',
        'user',
      ],
      select: {
        user: {
          full_name: true,
        },
      },
      order: { id: 'ASC' },
    });

    return {
      status_code: HttpStatus.OK,
      items: itemsWithRelations,
      pages: Math.ceil(total / size),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pendataan`;
  }

  update(id: number, updatePendataanDto: UpdatePendataanDto) {
    return `This action updates a #${id} pendataan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pendataan`;
  }
}
