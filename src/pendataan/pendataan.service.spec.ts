import { Test, TestingModule } from '@nestjs/testing';
import { PendataanService } from './pendataan.service';

describe('PendataanService', () => {
  let service: PendataanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PendataanService],
    }).compile();

    service = module.get<PendataanService>(PendataanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
