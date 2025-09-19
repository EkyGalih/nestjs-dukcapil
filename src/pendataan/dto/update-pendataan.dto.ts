import { PartialType } from '@nestjs/swagger';
import { CreatePendataanDto } from './create-pendataan.dto';

export class UpdatePendataanDto extends PartialType(CreatePendataanDto) {}
