import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('aset_keluargas')
export class Asetkeluarga {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  penguasaan_aset_tanah: string;

  @Column({ nullable: true })
  aset_sarana_transportasi_umum: string;

  @Column({ nullable: true })
  aset_sarana_produksi: string;

  @Column({ nullable: true })
  aset_lainnya: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Keluarga, (keluarga) => keluarga.aset_keluargas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keluarga_id' })
  keluarga: Keluarga;
}
