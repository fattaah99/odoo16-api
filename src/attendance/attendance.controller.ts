import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { UpdateResult } from 'typeorm';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  findAll(): Promise<Attendance[]> {
    return this.attendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attendance> {
    return this.attendanceService.findOne(+id);
  }

  @Post()
  create(@Body() attendance: Attendance): Promise<Attendance> {
    return this.attendanceService.create(attendance);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() attendance: Attendance,
  ): Promise<void> {
    await this.attendanceService.update(+id, attendance);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.attendanceService.remove(+id);
  }
}
