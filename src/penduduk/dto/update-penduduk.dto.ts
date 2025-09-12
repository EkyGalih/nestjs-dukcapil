import { PartialType } from '@nestjs/mapped-types';
import { CreatePendudukDto } from './create-penduduk.dto';

export class UpdatePendudukDto extends PartialType(CreatePendudukDto) {}
