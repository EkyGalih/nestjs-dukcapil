import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateKesehatanDto {
  @IsInt()
  penduduk_id: number;

  @IsString()
  jaminan_sosial_ketenagakerjaan: string;

  @IsString()
  jaminan_sosial_kesehatan: string;

  @IsString()
  penyakit_sedang_diderita: string;

  @IsString()
  penyakit_kelainan: string;

  @IsString()
  cacat_fisik: string;

  @IsString()
  cacat_mental: string;

  @IsBoolean()
  ibu_hamil_melahirkan: boolean;

  @IsString()
  kualitas_ibu_hamil: string;

  @IsString()
  tempat_persalinan: string;

  @IsString()
  pertolongan_persalinan: string;

  @IsString()
  kualitas_bayi: string;

  @IsString()
  cakupan_imunisasi: string;

  @IsString()
  status_gizi_balita: string;

  @IsString()
  perilaku_hidup_bersih: string;

  @IsString()
  pola_makan: string;

  @IsString()
  kebiasaan_berobat: string;
}
