import { Test, TestingModule } from '@nestjs/testing';
import { AccService } from './acc.service';

describe('AccService', () => {
  let service: AccService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccService],
    }).compile();

    service = module.get<AccService>(AccService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
