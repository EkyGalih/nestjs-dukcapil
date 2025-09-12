import { Test, TestingModule } from '@nestjs/testing';
import { KeluargaController } from './keluarga.controller';
import { KeluargaService } from './keluarga.service';

describe('KeluargaController', () => {
  let controller: KeluargaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeluargaController],
      providers: [KeluargaService],
    }).compile();

    controller = module.get<KeluargaController>(KeluargaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
