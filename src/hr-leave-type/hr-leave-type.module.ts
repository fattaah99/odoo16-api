import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrLeaveTypeService } from './hr-leave-type.service';
import { HrLeaveTypeController } from './hr-leave-type.controller';
import { HrLeaveType } from './hr-leave-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrLeaveType])],
  controllers: [HrLeaveTypeController],
  providers: [HrLeaveTypeService],
})
export class HrLeaveTypeModule {}
