import { Module } from '@nestjs/common';
import { KesehatanService } from './kesehatan.service';
import { KesehatanController } from './kesehatan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kesehatan } from './entities/kesehatan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kesehatan])],
  controllers: [KesehatanController],
  providers: [KesehatanService],
})
export class KesehatanModule {}
