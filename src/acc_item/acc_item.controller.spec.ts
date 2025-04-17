import { Test, TestingModule } from '@nestjs/testing';
import { AccItemController } from './acc_item.controller';

describe('AccItemController', () => {
  let controller: AccItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccItemController],
    }).compile();

    controller = module.get<AccItemController>(AccItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
