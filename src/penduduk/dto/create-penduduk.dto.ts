import { IsNumber, IsString } from 'class-validator';

export class CreatePendudukDto {
  @IsNumber() id?: number;
  @IsNumber() keluargaId?: number;
  @IsNumber() urutan_nik?: number;
  @IsString() nik?: string;
  @IsString() nama_lengkap?: string;
  @IsString() jenis_kelamin?: string;
  @IsString() tempat_lahir?: string;
  @IsString() tanggal_lahir?: string;
  @IsString() agama?: string;
  @IsString() status_pernikahan?: string;
  @IsString() duda_janda?: string;
  @IsString() golongan_darah?: string;
  @IsString() pekerjaan?: string;
  @IsString() nama_ayah?: string;
  @IsString() nama_ibu?: string;
  @IsString() hubungan_dalam_keluarga?: string;
}
