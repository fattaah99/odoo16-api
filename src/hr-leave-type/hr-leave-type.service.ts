import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HrLeaveType } from './hr-leave-type.entity';
import {
  CreateHrLeaveTypeDto,
  UpdateHrLeaveTypeDto,
} from './dto/hr-leave-type.dto';

@Injectable()
export class HrLeaveTypeService {
  constructor(
    @InjectRepository(HrLeaveType)
    private readonly hrLeaveTypeRepository: Repository<HrLeaveType>,
  ) {}

  create(createHrLeaveTypeDto: CreateHrLeaveTypeDto): Promise<HrLeaveType> {
    const hrLeaveType = this.hrLeaveTypeRepository.create(createHrLeaveTypeDto);
    return this.hrLeaveTypeRepository.save(hrLeaveType);
  }

  findAll(): Promise<HrLeaveType[]> {
    return this.hrLeaveTypeRepository.find();
  }

  findOne(id: number): Promise<HrLeaveType> {
    return this.hrLeaveTypeRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateHrLeaveTypeDto: UpdateHrLeaveTypeDto,
  ): Promise<HrLeaveType> {
    return this.hrLeaveTypeRepository.save({ ...updateHrLeaveTypeDto, id });
  }

  async remove(id: number): Promise<void> {
    await this.hrLeaveTypeRepository.delete(id);
  }
}
