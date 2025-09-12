import { PartialType } from '@nestjs/mapped-types';
import { CreateKeluargaDto } from './create-keluarga.dto';

export class UpdateKeluargaDto extends PartialType(CreateKeluargaDto) {}
