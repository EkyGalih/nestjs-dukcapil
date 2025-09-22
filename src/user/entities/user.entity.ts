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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity', { type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  full_name: string;

  @Column({ nullable: false })
  role: string;

  @Column({ nullable: false })
  hashed_password: string;

  @Column({ type: 'bigint', nullable: true })
  penduduk_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Penduduk, (penduduk) => penduduk.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'penduduk_id' })
  penduduk: Penduduk;

  @OneToMany(() => Pendataan, (pendataan) => pendataan.user, {
    cascade: true,
  })
  pendataan: Pendataan[];
}
