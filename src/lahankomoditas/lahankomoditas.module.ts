import { Module } from '@nestjs/common';
import { LahankomoditasService } from './lahankomoditas.service';
import { LahankomoditasController } from './lahankomoditas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lahankomoditas } from './entities/lahankomoditas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lahankomoditas])],
  controllers: [LahankomoditasController],
  providers: [LahankomoditasService],
})
export class LahankomoditasModule {}
