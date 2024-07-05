import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find();
  }

  findOne(id: number): Promise<Attendance> {
    return this.attendanceRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.attendanceRepository.delete(id);
  }

  create(attendance: Attendance): Promise<Attendance> {
    return this.attendanceRepository.save(attendance);
  }

  update(id: number, attendance: Attendance): Promise<UpdateResult> {
    return this.attendanceRepository.update(id, attendance);
  }
}
