import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { KeluargaService } from './keluarga.service';
import { CreateKeluargaDto } from './dto/create-keluarga.dto';
import { UpdateKeluargaDto } from './dto/update-keluarga.dto';
import { Keluarga } from './entities/keluarga.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('keluarga')
export class KeluargaController {
  constructor(private readonly keluargaService: KeluargaService) {}

  @Post()
  create(@Body() createKeluargaDto: CreateKeluargaDto) {
    return this.keluargaService.create(createKeluargaDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
    @Query('search') search?: string,
  ): Promise<{ items: Keluarga[]; pages: number }> {
    return this.keluargaService.findAll(Number(page), Number(size), search);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.keluargaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateKeluargaDto: UpdateKeluargaDto) {
    return this.keluargaService.update(+id, updateKeluargaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.keluargaService.remove(+id);
  }
}
