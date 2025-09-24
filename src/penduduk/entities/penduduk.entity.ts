import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import { Kesehatan } from 'src/kesehatan/entities/kesehatan.entity';
import { Pendataan } from 'src/pendataan/entities/pendataan.entity';
import { Pendidikan } from 'src/pendidikan/entities/pendidikan.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('penduduks')
export class Penduduk {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ type: 'int', nullable: false })
  urutan_nik: number;

  @Column({ unique: true, nullable: false })
  nik: string;

  @Column({ nullable: true })
  nama_lengkap: string;

  @Column({ nullable: true })
  jenis_kelamin: string;

  @Column({ nullable: true })
  tempat_lahir: string;

  @Column({ type: 'date', nullable: true })
  tanggal_lahir: Date;

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

  @Column({ type: 'bigint', nullable: false, select: false })
  keluarga_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  updated_at: Date;

  @ManyToOne(() => Keluarga, (keluarga) => keluarga.penduduks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keluarga_id' })
  keluarga: Keluarga;

  @OneToOne(() => Kesehatan, (kesehatan) => kesehatan.penduduk, {
    cascade: true,
  })
  kesehatan: Kesehatan;

  @OneToOne(() => Pendidikan, (pendidikan) => pendidikan.penduduk, {
    cascade: true,
  })
  pendidikan: Pendidikan;

  @OneToMany(() => Pendataan, (pendataan) => pendataan.penduduk, {
    cascade: true,
  })
  pendataan: Pendataan[];

  @OneToOne(() => User, (user) => user.penduduk, {
    cascade: true,
  })
  user: User;
}
