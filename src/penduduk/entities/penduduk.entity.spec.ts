import { Repository } from 'typeorm';
import { Penduduk } from './penduduk.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Keluarga } from 'src/keluarga/entities/keluarga.entity';
import { Kesehatan } from 'src/kesehatan/entities/kesehatan.entity';
import { Pendidikan } from 'src/pendidikan/entities/pendidikan.entity';

describe('Penduduk Entity', () => {
  let pendudukRepo: Repository<Penduduk>;
  let keluargaRepo: Repository<Keluarga>;
  let kesehatanRepo: Repository<Kesehatan>;
  let pendidikanRepo: Repository<Pendidikan>;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule], // pake koneksi dari app.module.ts
    }).compile();

    pendudukRepo = moduleRef.get<Repository<Penduduk>>(getRepositoryToken(Penduduk));
    keluargaRepo = moduleRef.get<Repository<Keluarga>>(getRepositoryToken(Keluarga));
    kesehatanRepo = moduleRef.get<Repository<Kesehatan>>(getRepositoryToken(Kesehatan));
    pendidikanRepo = moduleRef.get<Repository<Pendidikan>>(getRepositoryToken(Pendidikan));
  });

  it('should insert and fetch penduduk with relations', async () => {
    const keluarga = keluargaRepo.create({
      nomor: '51601',
      nomor_kk: '8796828567710062',
      nama_kepala_keluarga: 'Eky Galih Gunanda',
      dusun: 'Gubuk bangket',
      rw: '3',
      rt: '9',
      nomor_rumah: '12',
      status_kepemilikan_rumah: 'Milik Sendiri',
      luas_lantai_m2: 71,
      dinding_rumah: 'Batu',
      lantai_rumah: 'Keramik',
      atap_rumah: 'Genteng',
      status_kepemilikan_lahan_rumah: 'Milik Sendiri',
      luas_lahan_rumah_m2: 410,
      penerima_bantuan: 'BPNT',
    });
    const savedKeluarga = await keluargaRepo.save(keluarga);

    const kesehatan = kesehatanRepo.create({
      jaminan_sosial_ketenagakerjaan: null,
      jaminan_sosial_kesehatan: 'BPJS Kesehatan',
      penyakit_sedang_diderita: 'Batuk',
      penyakit_kelainan: 'Diabetes',
      cacat_fisik: 'Tunanetra',
      cacat_mental: 'Depresi',
      ibu_hamil_melahirkan: false,
      kualitas_ibu_hamil: 'Baik',
      tempat_persalinan: null,
      pertolongan_persalinan: 'Bidan',
      kualitas_bayi: null,
      cakupan_imunisasi: 'Tidak Lengkap',
      status_gizi_balita: 'Kurang',
      perilaku_hidup_bersih: 'Kurang',
      pola_makan: '3x sehari',
      kebiasaan_berobat: 'RS',
    });
    const savedKesehatan = await kesehatanRepo.save(kesehatan);

    const pendidikan = pendidikanRepo.create({
      pendidikan_terakhir: 'S1',
      pendidikan_sedang_ditempuh: 'S2',
    });
    const savedPendidikan = await pendidikanRepo.save(pendidikan);

    const penduduk = pendudukRepo.create({
      urutan_nik: 1,
      nik: '5203060501950001',
      nama_lengkap: 'Eky Galih Gunanda',
      jenis_kelamin: 'L',
      tempat_lahir: 'Dasan lekong',
      tanggal_lahir: '1995-01-05',
      agama: 'Islam',
      status_pernikahan: 'Kawin',
      duda_janda: 'Tidak',
      golongan_darah: 'O',
      pekerjaan: 'ASN',
      nama_ayah: 'Abdul Gafur',
      nama_ibu: 'Zuriati',
      hubungan_dalam_keluarga: 'Kepala Keluarga',
      keluarga: savedKeluarga,
      kesehatan: savedKesehatan,
      pendidikan: savedPendidikan,
    });

    const saved = await pendudukRepo.save(penduduk);

    expect(saved.id).toBeDefined();
    expect(saved.nama_lengkap).toBe('Eky Galih Gunanda');
    expect(saved.keluarga.id).toBeDefined();
    expect(saved.kesehatan).toBeDefined();
    expect(saved.pendidikan).toBeDefined();
  });

  afterAll(async () => {
    const dataSource = pendudukRepo.manager.connection;

    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await moduleRef.close();
  });
});
