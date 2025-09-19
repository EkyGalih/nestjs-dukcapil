import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AsetkeluargaService } from './asetkeluarga.service';
import { CreateAsetkeluargaDto } from './dto/create-asetkeluarga.dto';
import { UpdateAsetkeluargaDto } from './dto/update-asetkeluarga.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('asetkeluarga')
export class AsetkeluargaController {
  constructor(private readonly asetkeluargaService: AsetkeluargaService) {}

  @Post()
  create(@Body() createAsetkeluargaDto: CreateAsetkeluargaDto) {
    return this.asetkeluargaService.create(createAsetkeluargaDto);
  }

  // @Get()
  // findAll() {
  //   return this.asetkeluargaService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asetkeluargaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsetkeluargaDto: UpdateAsetkeluargaDto) {
    return this.asetkeluargaService.update(+id, updateAsetkeluargaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asetkeluargaService.remove(+id);
  }
}
