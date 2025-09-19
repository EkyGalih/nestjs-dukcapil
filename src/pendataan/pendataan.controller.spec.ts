import { Test, TestingModule } from '@nestjs/testing';
import { PendataanController } from './pendataan.controller';
import { PendataanService } from './pendataan.service';

describe('PendataanController', () => {
  let controller: PendataanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PendataanController],
      providers: [PendataanService],
    }).compile();

    controller = module.get<PendataanController>(PendataanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
