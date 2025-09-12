import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LahankomoditasService } from './lahankomoditas.service';
import { CreateLahankomoditaDto } from './dto/create-lahankomodita.dto';
import { UpdateLahankomoditaDto } from './dto/update-lahankomodita.dto';

@Controller('lahankomoditas')
export class LahankomoditasController {
  constructor(private readonly lahankomoditasService: LahankomoditasService) {}

  @Post()
  create(@Body() createLahankomoditaDto: CreateLahankomoditaDto) {
    return this.lahankomoditasService.create(createLahankomoditaDto);
  }

  @Get()
  findAll() {
    return this.lahankomoditasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lahankomoditasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLahankomoditaDto: UpdateLahankomoditaDto,
  ) {
    return this.lahankomoditasService.update(+id, updateLahankomoditaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lahankomoditasService.remove(+id);
  }
}
