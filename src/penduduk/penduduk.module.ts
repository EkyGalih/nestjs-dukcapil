import { Module } from '@nestjs/common';
import { PendudukService } from './penduduk.service';
import { PendudukController } from './penduduk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Penduduk } from './entities/penduduk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penduduk])],
  controllers: [PendudukController],
  providers: [PendudukService],
})
export class PendudukModule {}
