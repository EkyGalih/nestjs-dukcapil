import { Test, TestingModule } from '@nestjs/testing';
import { KesehatanController } from './kesehatan.controller';
import { KesehatanService } from './kesehatan.service';

describe('KesehatanController', () => {
  let controller: KesehatanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KesehatanController],
      providers: [KesehatanService],
    }).compile();

    controller = module.get<KesehatanController>(KesehatanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
