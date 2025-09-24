import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLahankomoditaDto {
  @IsOptional() @IsString() kategori?: string;
  @IsNotEmpty() @IsNumber() keluarga_id?: number;
  @IsOptional() @IsBoolean() memiliki?: boolean;
  @IsOptional() @IsNumber() luas_lahan_are?: number;
  @IsOptional() @IsString() jenis_komoditas?: string;
  @IsOptional() @IsNumber() produksi?: number;
  @IsOptional() @IsString() satuan_produksi?: string;
  @IsOptional() @IsDecimal() nilai_produksi?: number;
  @IsOptional() @IsString() pemasaran?: string;
}
