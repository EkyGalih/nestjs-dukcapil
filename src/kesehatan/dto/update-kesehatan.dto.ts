import { PartialType } from '@nestjs/mapped-types';
import { CreateKesehatanDto } from './create-kesehatan.dto';

export class UpdateKesehatanDto extends PartialType(CreateKesehatanDto) {}
