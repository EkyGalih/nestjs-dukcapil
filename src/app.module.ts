import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeluargaModule } from './keluarga/keluarga.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suru123456',
      database: 'pendataan',
      autoLoadEntities: true,
      synchronize: true,
    }),
    KeluargaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
