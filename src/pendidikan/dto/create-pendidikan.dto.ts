import { IsInt, IsString } from 'class-validator';

export class CreatePendidikanDto {
  @IsInt() penduduk_id?: number;
  @IsString() pendidikan_terakhir?: string;
  @IsString() pendidikan_sedang_ditempuh?: string;
}
