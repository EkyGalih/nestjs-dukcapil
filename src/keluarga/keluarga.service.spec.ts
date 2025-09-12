import { Test, TestingModule } from '@nestjs/testing';
import { KeluargaService } from './keluarga.service';

describe('KeluargaService', () => {
  let service: KeluargaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeluargaService],
    }).compile();

    service = module.get<KeluargaService>(KeluargaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
