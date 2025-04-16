import { Test, TestingModule } from '@nestjs/testing';
import { AccController } from './acc.controller';

describe('AccController', () => {
  let controller: AccController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccController],
    }).compile();

    controller = module.get<AccController>(AccController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
