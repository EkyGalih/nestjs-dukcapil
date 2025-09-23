import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { User } from './user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Keluarga } from './keluarga/entities/keluarga.entity';
import { Penduduk } from './penduduk/entities/penduduk.entity';
import { Pendidikan } from './pendidikan/entities/pendidikan.entity';
import { Kesehatan } from './kesehatan/entities/kesehatan.entity';
import { Asetkeluarga } from './asetkeluarga/entities/asetkeluarga.entity';
import { Lahankomoditas } from './lahankomoditas/entities/lahankomoditas.entity';
import { faker } from '@faker-js/faker';

export class DataSeeder implements Seeder {
  constructor(
    @InjectRepository(Keluarga)
    private readonly KeluargaRepo: Repository<Keluarga>,
    @InjectRepository(Penduduk)
    private readonly PendudukRepo: Repository<Penduduk>,
    @InjectRepository(Pendidikan)
    private readonly PendidikanRepo: Repository<Pendidikan>,
    @InjectRepository(Kesehatan)
    private readonly KesehatanRepo: Repository<Kesehatan>,
    @InjectRepository(Asetkeluarga)
    private readonly AsetkeluargaRepo: Repository<Asetkeluarga>,
    @InjectRepository(Lahankomoditas)
    private readonly LahankomoditasRepo: Repository<Lahankomoditas>,
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const keluarga = this.KeluargaRepo.create({
      nomor: faker.number.int({ min: 1, max: 500 }),
      nomor_kk: faker.string.numeric(16),
      nama_kepala_keluarga: faker.person.fullName(),
      dusun: faker.location.street(),
      rw: faker.number.int({ min: 1, max: 500 }),
      rt: faker.number.int({ min: 1, max: 500 }),
      nomor_rumah: faker.number.int({ min: 1, max: 500 }),
      status_kepemilikan_lahan_rumah: faker.string.alpha(10).toUpperCase(),
      luas_lantai_m2: faker.number.int({ min: 1, max: 500 }),
      dinding_rumah: faker.string.alpha(10).toUpperCase(),
      lantai_rumah: faker.number.bigInt(2),
      atap_rumah: faker.string.alpha(10).toUpperCase(),
      status_kepemilikan_rumah: faker.string.alpha(10).toUpperCase(),
      luas_lahan_rumah_m2: faker.number.bigInt(5),
      penerima_bantuan: faker.string.alpha(10).toUpperCase(),
    });
    await this.KeluargaRepo.save(keluarga);

    const password = await bcrypt.hash('admin', 10);

    const users: Partial<User>[] = [
      {
        username: 'admin',
        email: 'admin@admin.com',
        full_name: 'Administrator',
        role: 'admin',
        hashed_password: password,
      },
    ];

    return this.UserRepo.save(users);
  }

  async drop(): Promise<any> {
    return this.UserRepo.delete({});
  }
}
