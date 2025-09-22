import { Pendataan } from 'src/pendataan/entities/pendataan.entity';
import { Penduduk } from 'src/penduduk/entities/penduduk.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pendidikans')
export class Pendidikan {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  pendidikan_terakhir: string;

  @Column({ nullable: false })
  pendidikan_sedang_ditempuh: string;

  @Column({ type: 'bigint', nullable: false, select: false })
  penduduk_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Column({ select: false })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Column({ select: false })
  updated_at: Date;

  @OneToOne(() => Penduduk, (penduduk) => penduduk.pendidikan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'penduduk_id' })
  penduduk: Penduduk;

  @OneToMany(() => Pendataan, (pendataan) => pendataan.pendidikan, {
    cascade: true,
  })
  pendataan: Pendataan[];
}
