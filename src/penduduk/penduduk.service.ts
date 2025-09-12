import { Injectable } from '@nestjs/common';
import { CreatePendudukDto } from './dto/create-penduduk.dto';
import { UpdatePendudukDto } from './dto/update-penduduk.dto';

@Injectable()
export class PendudukService {
  create(createPendudukDto: CreatePendudukDto) {
    return 'This action adds a new penduduk';
  }

  findAll() {
    return `This action returns all penduduk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} penduduk`;
  }

  update(id: number, updatePendudukDto: UpdatePendudukDto) {
    return `This action updates a #${id} penduduk`;
  }

  remove(id: number) {
    return `This action removes a #${id} penduduk`;
  }
}
