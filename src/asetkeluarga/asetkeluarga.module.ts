import { Module } from '@nestjs/common';
import { AsetkeluargaService } from './asetkeluarga.service';
import { AsetkeluargaController } from './asetkeluarga.controller';

@Module({
  controllers: [AsetkeluargaController],
  providers: [AsetkeluargaService],
})
export class AsetkeluargaModule {}
