import { Test, TestingModule } from '@nestjs/testing';
import { LahankomoditasService } from './lahankomoditas.service';

describe('LahankomoditasService', () => {
  let service: LahankomoditasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LahankomoditasService],
    }).compile();

    service = module.get<LahankomoditasService>(LahankomoditasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
