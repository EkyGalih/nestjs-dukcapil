import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import { Pendataan } from 'src/pendataan/entities/pendataan.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @Column({ type: 'bigint', nullable: false })
  keluarga_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  updated_at: Date;

  @ManyToOne(() => Keluarga, (keluarga) => keluarga.aset_keluarga, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keluarga_id' })
  keluarga: Keluarga;

  @OneToMany(() => Pendataan, (pendataan) => pendataan.aset_keluarga, {
    cascade: true,
  })
  pendataan: Pendataan[];
}
