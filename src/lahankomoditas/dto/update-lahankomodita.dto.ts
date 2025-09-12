import { PartialType } from '@nestjs/mapped-types';
import { CreateLahankomoditaDto } from './create-lahankomodita.dto';

export class UpdateLahankomoditaDto extends PartialType(
  CreateLahankomoditaDto,
) {}
