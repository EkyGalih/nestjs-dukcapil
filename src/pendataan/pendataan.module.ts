import { Module } from '@nestjs/common';
import { PendataanService } from './pendataan.service';
import { PendataanController } from './pendataan.controller';

@Module({
  controllers: [PendataanController],
  providers: [PendataanService],
})
export class PendataanModule {}
