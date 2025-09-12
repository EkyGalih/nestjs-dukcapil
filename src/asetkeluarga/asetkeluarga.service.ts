import { Injectable } from '@nestjs/common';
import { CreateAsetkeluargaDto } from './dto/create-asetkeluarga.dto';
import { UpdateAsetkeluargaDto } from './dto/update-asetkeluarga.dto';

@Injectable()
export class AsetkeluargaService {
  create(createAsetkeluargaDto: CreateAsetkeluargaDto) {
    return 'This action adds a new asetkeluarga';
  }

  findAll() {
    return `This action returns all asetkeluarga`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asetkeluarga`;
  }

  update(id: number, updateAsetkeluargaDto: UpdateAsetkeluargaDto) {
    return `This action updates a #${id} asetkeluarga`;
  }

  remove(id: number) {
    return `This action removes a #${id} asetkeluarga`;
  }
}
