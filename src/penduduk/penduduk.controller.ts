import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PendudukService } from './penduduk.service';
import { CreatePendudukDto } from './dto/create-penduduk.dto';
import { UpdatePendudukDto } from './dto/update-penduduk.dto';

@Controller('penduduk')
export class PendudukController {
  constructor(private readonly pendudukService: PendudukService) {}

  @Post()
  create(@Body() createPendudukDto: CreatePendudukDto) {
    return this.pendudukService.create(createPendudukDto);
  }

  @Get()
  findAll() {
    return this.pendudukService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendudukService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePendudukDto: UpdatePendudukDto,
  ) {
    return this.pendudukService.update(+id, updatePendudukDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendudukService.remove(+id);
  }
}
