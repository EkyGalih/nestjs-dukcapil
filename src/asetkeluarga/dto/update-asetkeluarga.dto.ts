import { PartialType } from '@nestjs/mapped-types';
import { CreateAsetkeluargaDto } from './create-asetkeluarga.dto';

export class UpdateAsetkeluargaDto extends PartialType(CreateAsetkeluargaDto) {}
