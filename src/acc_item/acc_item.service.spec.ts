import { Test, TestingModule } from '@nestjs/testing';
import { AccItemService } from './acc_item.service';

describe('AccItemService', () => {
  let service: AccItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccItemService],
    }).compile();

    service = module.get<AccItemService>(AccItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
