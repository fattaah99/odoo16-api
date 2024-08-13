import { Test, TestingModule } from '@nestjs/testing';
import { HrLeaveController } from './hr-leave.controller';

describe('HrLeaveController', () => {
  let controller: HrLeaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrLeaveController],
    }).compile();

    controller = module.get<HrLeaveController>(HrLeaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
