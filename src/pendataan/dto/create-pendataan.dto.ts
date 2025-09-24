import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePendataanDto {
  @IsNotEmpty() @IsInt() penduduk_id?: number;
  @IsOptional() @IsInt() keluarga_id?: number;
  @IsOptional() @IsInt() pendidikan_id?: number;
  @IsOptional() @IsInt() kesehatan_id?: number;
  @IsOptional() @IsInt() aset_keluarga_id?: number;
  @IsOptional() @IsInt() lahan_id?: number;
  @IsNotEmpty() @IsInt() user_id?: number;
}
