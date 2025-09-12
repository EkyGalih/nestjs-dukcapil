import { Test, TestingModule } from '@nestjs/testing';
import { LahankomoditasController } from './lahankomoditas.controller';
import { LahankomoditasService } from './lahankomoditas.service';

describe('LahankomoditasController', () => {
  let controller: LahankomoditasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LahankomoditasController],
      providers: [LahankomoditasService],
    }).compile();

    controller = module.get<LahankomoditasController>(LahankomoditasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
