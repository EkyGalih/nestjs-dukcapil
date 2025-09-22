import { Asetkeluarga } from 'src/asetkeluarga/entities/asetkeluarga.entity';
import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import { Kesehatan } from 'src/kesehatan/entities/kesehatan.entity';
import { Lahankomoditas } from 'src/lahankomoditas/entities/lahankomoditas.entity';
import { Pendidikan } from 'src/pendidikan/entities/pendidikan.entity';
import { Penduduk } from 'src/penduduk/entities/penduduk.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pendataans')
export class Pendataan {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: false })
  penduduk_id: number;

  @Column({ type: 'bigint', nullable: true })
  keluarga_id: number;

  @Column({ type: 'bigint', nullable: true })
  pendidikan_id: number;

  @Column({ type: 'bigint', nullable: true })
  kesehatan_id: number;

  @Column({ type: 'bigint', nullable: true })
  aset_keluarga_id: number;

  @Column({ type: 'bigint', nullable: true })
  lahan_komoditas_id: number;

  @Column({ type: 'bigint', nullable: false })
  user_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Penduduk, (penduduk) => penduduk.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'penduduk_id' })
  penduduk: Penduduk;

  @ManyToOne(() => Keluarga, (keluarga) => keluarga.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'keluarga_id' })
  keluarga: Keluarga;

  @ManyToOne(() => Pendidikan, (pendidikan) => pendidikan.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pendidikan_id' })
  pendidikan: Pendidikan;

  @ManyToOne(() => Kesehatan, (kesehatan) => kesehatan.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'kesehatan_id' })
  kesehatan: Kesehatan;

  @ManyToOne(() => Asetkeluarga, (aset_keluarga) => aset_keluarga.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'aset_keluarga_id' })
  aset_keluarga: Asetkeluarga;

  @ManyToOne(() => Lahankomoditas, (lahan) => lahan.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lahan_id' })
  lahan: Lahankomoditas;

  @ManyToOne(() => User, (user) => user.pendataan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
