import { Module } from '@nestjs/common';
import { KesehatanService } from './kesehatan.service';
import { KesehatanController } from './kesehatan.controller';

@Module({
  controllers: [KesehatanController],
  providers: [KesehatanService],
})
export class KesehatanModule {}
