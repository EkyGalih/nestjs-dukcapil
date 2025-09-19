import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('lahan_komoditas')
export class Lahankomoditas {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  kategori: string;

  @Column({ type: 'boolean', nullable: false })
  memiliki: boolean;

  @Column({ default: 0, type: 'int' })
  luas_lahan_are: number;

  @Column({ nullable: false })
  jenis_komoditas: string;

  @Column({ type: 'int', default: 0 })
  produksi: number;

  @Column({ nullable: false })
  satuan_produksi: string;

  @Column({ type: 'int', default: 0 })
  nilai_produksi: number;

  @Column({ nullable: true })
  pemasaran: string;

  @Column({ type: 'bigint', nullable: false })
  keluarga_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Keluarga, (keluarga) => keluarga.lahan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keluarga_id' })
  keluarga: Keluarga;
}
