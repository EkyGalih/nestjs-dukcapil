import { Injectable } from '@nestjs/common';
import { CreateKesehatanDto } from './dto/create-kesehatan.dto';
import { UpdateKesehatanDto } from './dto/update-kesehatan.dto';

@Injectable()
export class KesehatanService {
  create(createKesehatanDto: CreateKesehatanDto) {
    return 'This action adds a new kesehatan';
  }

  findAll() {
    return `This action returns all kesehatan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kesehatan`;
  }

  update(id: number, updateKesehatanDto: UpdateKesehatanDto) {
    return `This action updates a #${id} kesehatan`;
  }

  remove(id: number) {
    return `This action removes a #${id} kesehatan`;
  }
}
