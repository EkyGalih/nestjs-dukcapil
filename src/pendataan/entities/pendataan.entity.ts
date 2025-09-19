import { Penduduk } from 'src/penduduk/entities/penduduk.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pendataans')
export class Pendataan {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  pendata: string;

  @Column({ type: 'bigint', nullable: false })
  penduduk_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Penduduk, (penduduk) => penduduk.pendataan)
  @JoinColumn({ name: 'penduduk_id' })
  penduduk: Penduduk;
}
