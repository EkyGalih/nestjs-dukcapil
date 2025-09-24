import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { seeder } from 'nestjs-seeder';
import { DataSeeder } from './data.seeder';
import { Keluarga } from './keluarga/entities/keluarga.entity';
import { Penduduk } from './penduduk/entities/penduduk.entity';
import { Pendidikan } from './pendidikan/entities/pendidikan.entity';
import { Kesehatan } from './kesehatan/entities/kesehatan.entity';
import { Asetkeluarga } from './asetkeluarga/entities/asetkeluarga.entity';
import { Lahankomoditas } from './lahankomoditas/entities/lahankomoditas.entity';
import { Pendataan } from './pendataan/entities/pendataan.entity';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'pendataan',
      entities: [
        User,
        Keluarga,
        Penduduk,
        Pendidikan,
        Kesehatan,
        Asetkeluarga,
        Lahankomoditas,
        Pendataan,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Keluarga,
      Penduduk,
      Pendidikan,
      Kesehatan,
      Asetkeluarga,
      Lahankomoditas,
      Pendataan,
    ]),
  ],
}).run([DataSeeder]);
