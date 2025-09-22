import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeluargaModule } from './keluarga/keluarga.module';
import { PendudukModule } from './penduduk/penduduk.module';
import { AsetkeluargaModule } from './asetkeluarga/asetkeluarga.module';
import { LahankomoditasModule } from './lahankomoditas/lahankomoditas.module';
import { Keluarga } from './keluarga/entities/keluarga.entity';
import { Penduduk } from './penduduk/entities/penduduk.entity';
import { Asetkeluarga } from './asetkeluarga/entities/asetkeluarga.entity';
import { Lahankomoditas } from './lahankomoditas/entities/lahankomoditas.entity';
import { KesehatanModule } from './kesehatan/kesehatan.module';
import { Kesehatan } from './kesehatan/entities/kesehatan.entity';
import { Pendidikan } from './pendidikan/entities/pendidikan.entity';
import { PendidikanModule } from './pendidikan/pendidikan.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PendataanModule } from './pendataan/pendataan.module';
import { Pendataan } from './pendataan/entities/pendataan.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'pendataan',
      autoLoadEntities: true,
      entities: [
        Keluarga,
        Penduduk,
        Asetkeluarga,
        Lahankomoditas,
        Kesehatan,
        Pendidikan,
        User,
        Pendataan,
      ],
      synchronize: true,
    }),
    KeluargaModule,
    PendudukModule,
    AsetkeluargaModule,
    LahankomoditasModule,
    KesehatanModule,
    PendidikanModule,
    AuthModule,
    UserModule,
    UserModule,
    PendataanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
