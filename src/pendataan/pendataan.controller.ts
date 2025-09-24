import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PendataanService } from './pendataan.service';
import { CreatePendataanDto } from './dto/create-pendataan.dto';
import { UpdatePendataanDto } from './dto/update-pendataan.dto';
import { Pendataan } from './entities/pendataan.entity';

@Controller('pendataan')
export class PendataanController {
  constructor(private readonly pendataanService: PendataanService) {}

  @Post()
  create(@Body() createPendataanDto: CreatePendataanDto) {
    return this.pendataanService.create(createPendataanDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ): Promise<{ items: Pendataan[]; pages: number }> {
    return this.pendataanService.findAll(Number(page), Number(size));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendataanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendataanDto: UpdatePendataanDto) {
    return this.pendataanService.update(+id, updatePendataanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendataanService.remove(+id);
  }
}
