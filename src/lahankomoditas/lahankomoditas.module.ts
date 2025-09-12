import { Module } from '@nestjs/common';
import { LahankomoditasService } from './lahankomoditas.service';
import { LahankomoditasController } from './lahankomoditas.controller';

@Module({
  controllers: [LahankomoditasController],
  providers: [LahankomoditasService],
})
export class LahankomoditasModule {}
