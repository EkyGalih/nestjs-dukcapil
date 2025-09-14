import { Penduduk } from 'src/penduduk/entities/penduduk.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pendidikans')
export class Pendidikan {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  pendidikan_terakhir: string;

  @Column({ nullable: false })
  pendidikan_sedang_ditempuh: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Penduduk, (penduduk) => penduduk.pendidikan, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'penduduk_id' })
  penduduk: Penduduk;
}
