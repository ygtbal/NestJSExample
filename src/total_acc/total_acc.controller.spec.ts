import { Test, TestingModule } from '@nestjs/testing';
import { TotalAccController } from './total_acc.controller';

describe('TotalAccController', () => {
  let controller: TotalAccController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalAccController],
    }).compile();

    controller = module.get<TotalAccController>(TotalAccController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
