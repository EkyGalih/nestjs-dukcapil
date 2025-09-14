import { Penduduk } from 'src/penduduk/entities/penduduk.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('kesehatans')
export class Kesehatan {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  jaminan_sosial_ketenagakerjaan: string;

  @Column({ nullable: true })
  jaminan_sosial_kesehatan: string;

  @Column({ nullable: true })
  penyakit_sedang_diderita: string;

  @Column({ nullable: true })
  penyakit_kelainan: string;

  @Column({ nullable: true })
  cacat_fisik: string;

  @Column({ nullable: true })
  cacat_mental: string;

  @Column({ type: 'boolean', nullable: true })
  ibu_hamil_melahirkan: boolean;

  @Column({ nullable: true })
  kualitas_ibu_hamil: string;

  @Column({ nullable: true })
  tempat_persalinan: string;

  @Column({ nullable: true })
  pertolongan_persalinan: string;

  @Column({ nullable: true })
  kualitas_bayi: string;

  @Column({ nullable: true })
  cakupan_imunisasi: string;

  @Column({ nullable: true })
  status_gizi_balita: string;

  @Column({ nullable: true })
  perilaku_hidup_bersih: string;

  @Column({ nullable: true })
  pola_makan: string;

  @Column({ nullable: true })
  kebiasaan_berobat: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Penduduk, (penduduk) => penduduk.kesehatan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'penduduk_id' })
  penduduk: Penduduk;
}
