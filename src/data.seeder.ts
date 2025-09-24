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
import { Pendataan } from './pendataan/entities/pendataan.entity';

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
    @InjectRepository(Pendataan)
    private readonly PendataanRepo: Repository<Pendataan>,
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    let user = await this.UserRepo.findOne({ where: { username: 'admin' } });
    if (!user) {
      user = this.UserRepo.create({
        username: 'admin',
        email: 'admin@admin.com',
        full_name: 'Administrator',
        role: 'admin',
        hashed_password: await bcrypt.hash('admin', 10),
      });
      user = await this.UserRepo.save(user);
    }

    for (let i = 0; i < 10; i++) {
      const keluarga = this.KeluargaRepo.create({
        nomor: faker.string.numeric(3),
        nomor_kk: faker.string.numeric(16),
        nama_kepala_keluarga: faker.person.fullName(),
        dusun: faker.location.street(),
        rw: faker.number.int({ min: 1, max: 500 }),
        rt: faker.number.int({ min: 1, max: 500 }),
        nomor_rumah: faker.number.int({ min: 1, max: 500 }),
        status_kepemilikan_lahan_rumah: faker.helpers.arrayElement(['milik sendiri, sewa']),
        luas_lantai_m2: faker.number.int({ min: 1, max: 10 }),
        dinding_rumah: faker.helpers.arrayElement(['beton', 'kayu', 'bambu']),
        lantai_rumah: faker.helpers.arrayElement(['2 lantai', '1 lantai', '3 lantai']), // perbaiki biar string, sesuai entity
        atap_rumah: faker.helpers.arrayElement(['genteng', 'asbes', 'spandek']),
        status_kepemilikan_rumah: faker.string.alpha(10).toUpperCase(),
        luas_lahan_rumah_m2: faker.number.int({ min: 1, max: 500 }),
        penerima_bantuan: faker.helpers.arrayElement([
          'BSU',
          'Rumah Layak Huni',
          'Keluarga Berencana',
        ]),
      });
      await this.KeluargaRepo.save(keluarga);

      const aset_keluarga = this.AsetkeluargaRepo.create({
        penguasaan_aset_tanah: faker.helpers.arrayElement([
          'Milik Sendiri',
          'Sewa',
          'Pinjam Pakai',
          'Bagi Hasil',
          'Tanpa Hak',
        ]),
        aset_sarana_transportasi_umum: faker.helpers.arrayElement(['mobil', 'motor', 'sepeda']),
        aset_sarana_produksi: faker.helpers.arrayElement(['kebun', 'sawah', 'peternakan']),
        aset_lainnya: faker.helpers.arrayElement(['kripto', 'saham', 'investasi']),
        keluarga_id: keluarga.id,
      });
      await this.AsetkeluargaRepo.save(aset_keluarga);

      const lahan = this.LahankomoditasRepo.create({
        kategori: faker.helpers.arrayElement([
          'perkebunan',
          'pertanian',
          'perairan',
          'perkantoran',
          'pertokoan',
        ]),
        memiliki: faker.datatype.boolean(),
        luas_lahan_are: faker.number.int({ min: 1, max: 500 }),
        jenis_komoditas: faker.helpers.arrayElement([
          'padi',
          'jagung',
          'kacang',
          'ikan',
          'toko kelontong',
          'toko baju',
        ]),
        produksi: faker.number.int({ min: 1, max: 500 }),
        satuan_produksi: faker.helpers.arrayElement(['kg', 'ton', 'ikat', 'karung', 'liter']),
        nilai_produksi: faker.number.int({ min: 1, max: 500 }),
        pemasaran: faker.helpers.arrayElement(['lokal', 'regional', 'nasional', 'ekspor']),
        keluarga_id: keluarga.id,
      });
      await this.LahankomoditasRepo.save(lahan);

      const penduduk = this.PendudukRepo.create({
        urutan_nik: faker.number.int({ min: 1, max: 500 }),
        nik: faker.string.numeric(16),
        nama_lengkap: faker.person.fullName(),
        jenis_kelamin: faker.helpers.arrayElement(['L', 'P']),
        tempat_lahir: faker.location.city(),
        tanggal_lahir: faker.date.past({ years: 80 }),
        agama: faker.helpers.arrayElement([
          'Islam',
          'Kristen',
          'Katolik',
          'Hindu',
          'Buddha',
          'Konghucu',
        ]),
        status_pernikahan: faker.helpers.arrayElement([
          'Belum Kawin',
          'Kawin',
          'Cerai Hidup',
          'Cerai Mati',
        ]),
        duda_janda: faker.helpers.arrayElement(['-', 'Duda', 'Janda']),
        golongan_darah: faker.helpers.arrayElement(['A', 'B', 'AB', 'O']),
        pekerjaan: faker.helpers.arrayElement([
          'Petani',
          'Nelayan',
          'Pedagang',
          'PNS',
          'Karyawan Swasta',
          'Wiraswasta',
        ]),
        nama_ayah: faker.person.fullName(),
        nama_ibu: faker.person.fullName(),
        hubungan_dalam_keluarga: faker.helpers.arrayElement([
          'Kepala Keluarga',
          'Istri',
          'Anak',
          'Orang Tua',
          'Saudara',
        ]),
        keluarga_id: keluarga.id,
      });
      await this.PendudukRepo.save(penduduk);

      const pendidikan = this.PendidikanRepo.create({
        pendidikan_terakhir: faker.helpers.arrayElement([
          'SD',
          'SMP',
          'SMA',
          'D1',
          'D2',
          'D3',
          'S1',
          'S2',
          'S3',
          'Lainnya',
        ]),
        pendidikan_sedang_ditempuh: faker.helpers.arrayElement([
          'SD',
          'SMP',
          'SMA',
          'D1',
          'D2',
          'D3',
          'S1',
          'S2',
          'S3',
          'Lainnya',
        ]),
        penduduk_id: penduduk.id,
      });
      await this.PendidikanRepo.save(pendidikan);

      const kesehatan = this.KesehatanRepo.create({
        jaminan_sosial_ketenagakerjaan: faker.helpers.arrayElement([
          'BPJS Ketenagakerjaan',
          'Asuransi Swasta',
          'Tidak Ada',
        ]),
        jaminan_sosial_kesehatan: faker.helpers.arrayElement([
          'BPJS Kesehatan',
          'Asuransi Swasta',
          'Tidak Ada',
        ]),
        penyakit_sedang_diderita: faker.helpers.arrayElement([
          'Tidak Ada',
          'Hipertensi',
          'Diabetes',
          'Asma',
          'TBC',
        ]),
        penyakit_kelainan: faker.helpers.arrayElement([
          'Tidak Ada',
          'Gangguan Jantung',
          'Gangguan Ginjal',
          'Lainnya',
        ]),
        cacat_fisik: faker.helpers.arrayElement([
          'Tidak Ada',
          'Tunanetra',
          'Tunarungu',
          'Tunadaksa',
        ]),
        cacat_mental: faker.helpers.arrayElement([
          'Tidak Ada',
          'Gangguan Jiwa',
          'Down Syndrome',
          'Lainnya',
        ]),
        ibu_hamil_melahirkan: faker.datatype.boolean(),
        kualitas_ibu_hamil: faker.helpers.arrayElement(['Baik', 'Cukup', 'Kurang']),
        tempat_persalinan: faker.helpers.arrayElement([
          'Rumah Sakit',
          'Puskesmas',
          'Bidan',
          'Rumah',
        ]),
        pertolongan_persalinan: faker.helpers.arrayElement(['Dokter', 'Bidan', 'Dukun', 'Sendiri']),
        kualitas_bayi: faker.helpers.arrayElement(['Sehat', 'Kurang Sehat', 'Meninggal']),
        cakupan_imunisasi: faker.helpers.arrayElement(['Lengkap', 'Tidak Lengkap', 'Tidak Ada']),
        status_gizi_balita: faker.helpers.arrayElement(['Baik', 'Kurang', 'Buruk']),
        perilaku_hidup_bersih: faker.helpers.arrayElement(['Baik', 'Cukup', 'Kurang']),
        pola_makan: faker.helpers.arrayElement(['3x Sehari', '2x Sehari', '1x Sehari']),
        kebiasaan_berobat: faker.helpers.arrayElement([
          'Rumah Sakit',
          'Puskesmas',
          'Dukun',
          'Tidak Pernah',
        ]),
        penduduk_id: penduduk.id,
      });
      await this.KesehatanRepo.save(kesehatan);

      const pendataan = this.PendataanRepo.create({
        penduduk_id: penduduk.id,
        keluarga_id: keluarga.id,
        pendidikan_id: pendidikan.id,
        kesehatan_id: kesehatan.id,
        aset_keluarga_id: aset_keluarga.id,
        lahan_id: lahan.id,
        user_id: user.id,
      });
      await this.PendataanRepo.save(pendataan);
    }

    return user;
  }

  async drop(): Promise<any> {
    return this.UserRepo.delete({});
  }
}
