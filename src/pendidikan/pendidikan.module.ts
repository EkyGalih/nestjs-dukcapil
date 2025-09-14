import { Module } from '@nestjs/common';
import { PendidikanService } from './pendidikan.service';
import { PendidikanController } from './pendidikan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pendidikan } from './entities/pendidikan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pendidikan])],
  controllers: [PendidikanController],
  providers: [PendidikanService],
})
export class PendidikanModule {}
