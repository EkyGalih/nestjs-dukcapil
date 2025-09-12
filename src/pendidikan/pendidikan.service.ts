import { Injectable } from '@nestjs/common';
import { CreatePendidikanDto } from './dto/create-pendidikan.dto';
import { UpdatePendidikanDto } from './dto/update-pendidikan.dto';

@Injectable()
export class PendidikanService {
  create(createPendidikanDto: CreatePendidikanDto) {
    return 'This action adds a new pendidikan';
  }

  findAll() {
    return `This action returns all pendidikan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pendidikan`;
  }

  update(id: number, updatePendidikanDto: UpdatePendidikanDto) {
    return `This action updates a #${id} pendidikan`;
  }

  remove(id: number) {
    return `This action removes a #${id} pendidikan`;
  }
}
