import { Injectable } from '@nestjs/common';
import { CreatePendataanDto } from './dto/create-pendataan.dto';
import { UpdatePendataanDto } from './dto/update-pendataan.dto';

@Injectable()
export class PendataanService {
  create(createPendataanDto: CreatePendataanDto) {
    return 'This action adds a new pendataan';
  }

  findAll() {
    return `This action returns all pendataan`;
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
