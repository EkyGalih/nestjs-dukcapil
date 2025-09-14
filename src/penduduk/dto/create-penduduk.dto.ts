import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePendudukDto {
  @IsOptional() @IsNumber() keluargaId?: number;
  @IsOptional() @IsString() nik?: string;
  @IsOptional() @IsString() nama_lengkap?: string;
  @IsOptional() @IsString() jenis_kelamin?: string;
  @IsOptional() @IsString() tempat_lahir?: string;
  @IsOptional() @IsString() tanggal_lahir?: string;
  @IsOptional() @IsString() agama?: string;
  @IsOptional() @IsString() status_pernikahan?: string;
  @IsOptional() @IsString() duda_janda?: string;
  @IsOptional() @IsString() golongan_darah?: string;
  @IsOptional() @IsString() pekerjaan?: string;
  @IsOptional() @IsString() nama_ayah?: string;
  @IsOptional() @IsString() nama_ibu?: string;
  @IsOptional() @IsString() hubungan_dalam_keluarga?: string;
}
