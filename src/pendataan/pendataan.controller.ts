import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PendataanService } from './pendataan.service';
import { CreatePendataanDto } from './dto/create-pendataan.dto';
import { UpdatePendataanDto } from './dto/update-pendataan.dto';

@Controller('pendataan')
export class PendataanController {
  constructor(private readonly pendataanService: PendataanService) {}

  @Post()
  create(@Body() createPendataanDto: CreatePendataanDto) {
    return this.pendataanService.create(createPendataanDto);
  }

  @Get()
  findAll() {
    return this.pendataanService.findAll();
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
