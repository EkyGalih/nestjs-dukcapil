import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { KeluargaService } from './keluarga.service';
import { CreateKeluargaDto } from './dto/create-keluarga.dto';
import { UpdateKeluargaDto } from './dto/update-keluarga.dto';

@Controller('keluarga')
export class KeluargaController {
  constructor(private readonly keluargaService: KeluargaService) {}

  @Post()
  create(@Body() createKeluargaDto: CreateKeluargaDto) {
    return this.keluargaService.create(createKeluargaDto);
  }

  @Get()
  findAll() {
    return this.keluargaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.keluargaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateKeluargaDto: UpdateKeluargaDto,
  ) {
    return this.keluargaService.update(+id, updateKeluargaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.keluargaService.remove(+id);
  }
}
