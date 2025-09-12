import { Injectable } from '@nestjs/common';
import { CreateLahankomoditaDto } from './dto/create-lahankomodita.dto';
import { UpdateLahankomoditaDto } from './dto/update-lahankomodita.dto';

@Injectable()
export class LahankomoditasService {
  create(createLahankomoditaDto: CreateLahankomoditaDto) {
    return 'This action adds a new lahankomodita';
  }

  findAll() {
    return `This action returns all lahankomoditas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lahankomodita`;
  }

  update(id: number, updateLahankomoditaDto: UpdateLahankomoditaDto) {
    return `This action updates a #${id} lahankomodita`;
  }

  remove(id: number) {
    return `This action removes a #${id} lahankomodita`;
  }
}
