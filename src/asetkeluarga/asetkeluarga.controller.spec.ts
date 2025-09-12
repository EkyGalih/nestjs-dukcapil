import { Test, TestingModule } from '@nestjs/testing';
import { AsetkeluargaController } from './asetkeluarga.controller';
import { AsetkeluargaService } from './asetkeluarga.service';

describe('AsetkeluargaController', () => {
  let controller: AsetkeluargaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsetkeluargaController],
      providers: [AsetkeluargaService],
    }).compile();

    controller = module.get<AsetkeluargaController>(AsetkeluargaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
