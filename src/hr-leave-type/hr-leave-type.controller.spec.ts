import { Test, TestingModule } from '@nestjs/testing';
import { HrLeaveTypeController } from './hr-leave-type.controller';

describe('HrLeaveTypeController', () => {
  let controller: HrLeaveTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrLeaveTypeController],
    }).compile();

    controller = module.get<HrLeaveTypeController>(HrLeaveTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
