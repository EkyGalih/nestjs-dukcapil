import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LahankomoditasService } from './lahankomoditas.service';
import { CreateLahankomoditaDto } from './dto/create-lahankomodita.dto';
import { UpdateLahankomoditaDto } from './dto/update-lahankomodita.dto';
import { AuthGuard } from '@nestjs/passport';
import { Lahankomoditas } from './entities/lahankomoditas.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('lahankomoditas')
export class LahankomoditasController {
  constructor(private readonly lahankomoditasService: LahankomoditasService) {}

  @Post()
  create(@Body() createLahankomoditaDto: CreateLahankomoditaDto) {
    return this.lahankomoditasService.create(createLahankomoditaDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('search') search?: string,
  ): Promise<{ items: Lahankomoditas[]; pages: number }> {
    return this.lahankomoditasService.findAll(Number(page), Number(size), search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lahankomoditasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLahankomoditaDto: UpdateLahankomoditaDto) {
    return this.lahankomoditasService.update(+id, updateLahankomoditaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lahankomoditasService.remove(+id);
  }
}
