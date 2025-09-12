import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateKeluargaDto {
  @IsOptional() @IsString() nomor?: string;
  @IsOptional() @IsString() nomor_kk?: string;
  @IsOptional() @IsString() nama_kepala_keluarga?: string;
  @IsOptional() @IsString() dusun?: string;
  @IsOptional() @IsString() rw?: string;
  @IsOptional() @IsString() rt?: string;
  @IsOptional() @IsString() nomor_rumah?: string;
  @IsOptional() @IsString() status_kepemilikan_rumah?: string;
  @IsOptional() @IsNumber() luas_lantai_m2?: number;
  @IsOptional() @IsString() dinding_rumah?: string;
  @IsOptional() @IsString() lantai_rumah?: string;
  @IsOptional() @IsString() atap_rumah?: string;
  @IsOptional() @IsString() status_kepemilikan_lahan_rumah?: string;
  @IsOptional() @IsNumber() luas_lahan_rumah_m2?: number;
  @IsOptional() @IsString() penerima_bantuan?: string;
}
