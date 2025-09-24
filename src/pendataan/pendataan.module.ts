import { Module } from '@nestjs/common';
import { PendataanService } from './pendataan.service';
import { PendataanController } from './pendataan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pendataan } from './entities/pendataan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pendataan])],
  controllers: [PendataanController],
  providers: [PendataanService],
})
export class PendataanModule {}
