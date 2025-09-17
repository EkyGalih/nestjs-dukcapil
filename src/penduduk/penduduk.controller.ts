import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PendudukService } from './penduduk.service';
import { CreatePendudukDto } from './dto/create-penduduk.dto';
import { UpdatePendudukDto } from './dto/update-penduduk.dto';
import { Penduduk } from './entities/penduduk.entity';

@Controller('penduduk')
export class PendudukController {
  constructor(private readonly pendudukService: PendudukService) {}

  @Post()
  create(@Body() createPendudukDto: CreatePendudukDto) {
    return this.pendudukService.create(createPendudukDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('search') search?: string,
  ): Promise<{ items: Penduduk[]; pages: number }> {
    return this.pendudukService.findAll(Number(page), Number(size), search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Penduduk> {
    return this.pendudukService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendudukDto: UpdatePendudukDto) {
    return this.pendudukService.update(+id, updatePendudukDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendudukService.remove(+id);
  }
}
