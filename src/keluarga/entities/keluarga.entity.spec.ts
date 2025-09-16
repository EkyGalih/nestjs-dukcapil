import { Repository } from 'typeorm';
import { Keluarga } from './keluarga.entity';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Keluarga Entity', () => {
  let repo: Repository<Keluarga>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule], // pake koneksi dari app.module.ts
    }).compile();

    repo = moduleRef.get<Repository<Keluarga>>(getRepositoryToken(Keluarga));
  });

  it('should insert and fetch keluarga', async () => {
    const keluarga = repo.create({
      nomor: '51601',
      nomor_kk: '8796828479710062',
      nama_kepala_keluarga: 'Dr. Taufan Laksmiwati',
      dusun: 'Cirebon',
      rw: '3',
      rt: '9',
      nomor_rumah: '12',
      status_kepemilikan_rumah: 'Kontrak',
      luas_lantai_m2: 71,
      dinding_rumah: 'Kayu',
      lantai_rumah: 'Keramik',
      atap_rumah: 'Genteng',
      status_kepemilikan_lahan_rumah: 'Milik Sendiri',
      luas_lahan_rumah_m2: 410,
      penerima_bantuan: 'BPNT',
    });

    const saved = await repo.save(keluarga);
    expect(saved.id).toBeDefined();
    expect(saved.nama_kepala_keluarga).toBe('Dr. Taufan Laksmiwati');
    expect(saved.nomor_kk).toBe('8796828479710062');
  });
});