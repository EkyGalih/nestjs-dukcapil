import { Module } from '@nestjs/common';
import { AsetkeluargaService } from './asetkeluarga.service';
import { AsetkeluargaController } from './asetkeluarga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asetkeluarga } from './entities/asetkeluarga.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asetkeluarga])],
  controllers: [AsetkeluargaController],
  providers: [AsetkeluargaService],
})
export class AsetkeluargaModule {}
