import { Test, TestingModule } from '@nestjs/testing';
import { KesehatanService } from './kesehatan.service';

describe('KesehatanService', () => {
  let service: KesehatanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KesehatanService],
    }).compile();

    service = module.get<KesehatanService>(KesehatanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
