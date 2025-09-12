import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('penduduks')
export class Penduduk {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  nama_lengkap: string;

  @Column({ nullable: true })
  jenis_kelamin: string;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ type: 'date', nullable: true })
  tanggal_lahir: string;

  @Column({ nullable: true })
  agama: string;

  @Column({ nullable: true })
  status_pernikahan: string;

  @Column({ nullable: true })
  duda_janda: string;

  @Column({ nullable: true })
  golongan_darah: string;

  @Column({ nullable: true })
  pekerjaan: string;

  @Column({ nullable: true })
  nama_ayah: string;

  @Column({ nullable: true })
  nama_ibu: string;

  @Column({ nullable: true })
  hubungan_dalam_keluarga: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Keluarga, (keluarga) => keluarga.penduduks, { cascade: true })
  keluarga: Keluarga[];
}
