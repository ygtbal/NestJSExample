import { Test, TestingModule } from '@nestjs/testing';
import { TotalAccService } from './total_acc.service';

describe('TotalAccService', () => {
  let service: TotalAccService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotalAccService],
    }).compile();

    service = module.get<TotalAccService>(TotalAccService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
