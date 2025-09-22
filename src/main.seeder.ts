import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { seeder } from 'nestjs-seeder';
import { DataSeeder } from './data.seeder';

seeder({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'pendataan',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
}).run([DataSeeder]);
