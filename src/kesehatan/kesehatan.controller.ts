import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { KesehatanService } from './kesehatan.service';
import { CreateKesehatanDto } from './dto/create-kesehatan.dto';
import { UpdateKesehatanDto } from './dto/update-kesehatan.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('kesehatan')
export class KesehatanController {
  constructor(private readonly kesehatanService: KesehatanService) {}

  @Post()
  create(@Body() createKesehatanDto: CreateKesehatanDto) {
    return this.kesehatanService.create(createKesehatanDto);
  }

  // @Get()
  // findAll() {
  //   return this.kesehatanService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kesehatanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKesehatanDto: UpdateKesehatanDto) {
    return this.kesehatanService.update(+id, updateKesehatanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kesehatanService.remove(+id);
  }
}
