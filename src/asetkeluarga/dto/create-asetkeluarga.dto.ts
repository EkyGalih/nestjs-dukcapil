import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAsetkeluargaDto {
  @IsNotEmpty()
  @IsInt()
  keluarga_id: number;

  @IsString()
  penguasaan_aset_tanah?: string;

  @IsString()
  aset_sarana_transportasi_umum?: string;

  @IsString()
  aset_sarana_produksi?: string;

  @IsString()
  aset_lainnya?: string;
}
