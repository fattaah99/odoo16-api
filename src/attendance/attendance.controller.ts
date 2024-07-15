// import {
//   Controller,
//   Get,
//   Post,
//   Put,
//   Param,
//   Delete,
//   Body,
// } from '@nestjs/common';
// import { AttendanceService } from './attendance.service';
// import { Attendance } from './attendance.entity';
// import { UpdateResult } from 'typeorm';

// @Controller('attendance')
// export class AttendanceController {
//   constructor(private readonly attendanceService: AttendanceService) {}

//   @Get()
//   findAll(): Promise<Attendance[]> {
//     return this.attendanceService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Attendance> {
//     return this.attendanceService.findOne(+id);
//   }

//   @Post()
//   create(@Body() attendance: Attendance): Promise<Attendance> {
//     return this.attendanceService.create(attendance);
//   }

//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() attendance: Attendance,
//   ): Promise<void> {
//     await this.attendanceService.update(+id, attendance);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.attendanceService.remove(+id);
//   }
// }

import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  //   @UseGuards(JwtAuthGuard)
  //   @Post('check-in/:employee_id')
  //   checkIn(
  //     @Param('employee_id') employee_id: string,
  //     @Body() checkInDto: CheckInDto,
  //   ) {
  //     return this.attendanceService.checkIn(+employee_id, checkInDto);
  //   }

  // @Post('check-in/:employee_id')
  // async checkIn(
  //   @Body() checkInDto: CheckInDto,
  //   @Param('employee_id') employee_id: number,
  // ) {
  //   return this.attendanceService.checkIn(employee_id, checkInDto);
  // }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('check-in')
  async checkIn(@Req() req: Request, @Body() checkInDto: CheckInDto) {
    const user_id = req['user'].id; // Get user ID from token
    const employee_id = req['user'].employee_id; // Get employee ID from token
    return this.attendanceService.checkIn(checkInDto, user_id, employee_id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('check-out')
  async checkOut(@Req() req: Request, @Body() checkOutDto: CheckOutDto) {
    const employee_id = req['user'].employee_id; // Get employee ID from token
    return this.attendanceService.checkOut(employee_id, checkOutDto);
  }
}
