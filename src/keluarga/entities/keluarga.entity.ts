import { Asetkeluarga } from 'src/asetkeluarga/entities/asetkeluarga.entity';
import { Lahankomoditas } from 'src/lahankomoditas/entities/lahankomoditas.entity';
import { Pendataan } from 'src/pendataan/entities/pendataan.entity';
import { Penduduk } from 'src/penduduk/entities/penduduk.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('keluargas')
export class Keluarga {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  nomor: string;

  @Column({ nullable: true })
  nomor_kk: string;

  @Column({ nullable: true })
  nama_kepala_keluarga: string;

  @Column({ nullable: true })
  dusun: string;

  @Column({ type: 'int', nullable: true })
  rw: number;

  @Column({ nullable: true })
  rt: string;

  @Column({ nullable: true })
  nomor_rumah: string;

  @Column({ nullable: true })
  status_kepemilikan_rumah: string;

  @Column({ type: 'int', nullable: true })
  luas_lantai_m2: number;

  @Column({ nullable: true })
  dinding_rumah: string;

  @Column({ nullable: true })
  lantai_rumah: string;

  @Column({ nullable: true })
  atap_rumah: string;

  @Column({ nullable: true })
  status_kepemilikan_lahan_rumah: string;

  @Column({ type: 'int', nullable: true })
  luas_lahan_rumah_m2: number;

  @Column({ nullable: true })
  penerima_bantuan: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Column({ select: false })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Column({ select: false })
  updated_at: Date;

  @OneToMany(() => Penduduk, (penduduk) => penduduk.keluarga, { cascade: true })
  penduduks: Penduduk[];

  @OneToMany(() => Asetkeluarga, (aset_keluarga) => aset_keluarga.keluarga, {
    cascade: true,
  })
  aset_keluarga: Asetkeluarga[];

  @OneToMany(() => Lahankomoditas, (lahan) => lahan.keluarga, {
    cascade: true,
  })
  lahan: Lahankomoditas[];

  @OneToMany(() => Pendataan, (pendataan) => pendataan.keluarga, {
    cascade: true,
  })
  pendataan: Pendataan[];
}
