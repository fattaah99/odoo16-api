import { Test, TestingModule } from '@nestjs/testing';
import { HrLeaveTypeService } from './hr-leave-type.service';

describe('HrLeaveTypeService', () => {
  let service: HrLeaveTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrLeaveTypeService],
    }).compile();

    service = module.get<HrLeaveTypeService>(HrLeaveTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
