import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PendidikanService } from './pendidikan.service';
import { CreatePendidikanDto } from './dto/create-pendidikan.dto';
import { UpdatePendidikanDto } from './dto/update-pendidikan.dto';

@Controller('pendidikan')
export class PendidikanController {
  constructor(private readonly pendidikanService: PendidikanService) {}

  @Post()
  create(@Body() createPendidikanDto: CreatePendidikanDto) {
    return this.pendidikanService.create(createPendidikanDto);
  }

  // @Get()
  // findAll() {
  //   return this.pendidikanService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendidikanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendidikanDto: UpdatePendidikanDto) {
    return this.pendidikanService.update(+id, updatePendidikanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendidikanService.remove(+id);
  }
}
