import { Module } from '@nestjs/common';
import { KeluargaService } from './keluarga.service';
import { KeluargaController } from './keluarga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keluarga } from './entities/keluarga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keluarga])],
  controllers: [KeluargaController],
  providers: [KeluargaService],
})
export class KeluargaModule {}
