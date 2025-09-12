import { Test, TestingModule } from '@nestjs/testing';
import { AsetkeluargaService } from './asetkeluarga.service';

describe('AsetkeluargaService', () => {
  let service: AsetkeluargaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsetkeluargaService],
    }).compile();

    service = module.get<AsetkeluargaService>(AsetkeluargaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
