import { Test, TestingModule } from '@nestjs/testing';
import { HrLeaveService } from './hr-leave.service';

describe('HrLeaveService', () => {
  let service: HrLeaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrLeaveService],
    }).compile();

    service = module.get<HrLeaveService>(HrLeaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
