import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, Not, IsNull, Between } from 'typeorm';
import { Attendance } from './attendance.entity';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find();
  }

  async findOne(id: number): Promise<Attendance> {
    // Mencari data berdasarkan id
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
    });

    // Jika tidak ditemukan, lemparkan error
    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found.`);
    }

    return attendance;
  }

  async findByEmployee(employee_id: number) {
    const attendance = await this.attendanceRepository.find({
      where: { employee_id: employee_id },
    });

    // Jika tidak ditemukan, lemparkan error
    if (!attendance || attendance.length === 0) {
      throw new NotFoundException(
        `Employee with ID ${employee_id} has not found`,
      );
    }

    return attendance;
  }

  async findByEmployeeDate(employee_id: number) {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const attendance = await this.attendanceRepository.find({
      where: {
        employee_id: employee_id,
        check_in: Between(startOfDay, endOfDay),
      },
      relations: ['employee'],
    });

    // Jika tidak ditemukan, lemparkan error
    if (!attendance || attendance.length === 0) {
      throw new NotFoundException(
        `Employee with ID ${employee_id} has not found`,
      );
    }

    // return attendance;

    return attendance.map((attendance) => ({
      ...attendance,
      employee: attendance.employee
        ? {
            name: attendance.employee.name,
          }
        : null,
    }));
  }

  async remove(id: number): Promise<void> {
    await this.attendanceRepository.delete(id);
  }

  // create(attendance: Attendance): Promise<Attendance> {
  //   return this.attendanceRepository.save(attendance);
  // }

  async update(id: number, attendance: Attendance): Promise<UpdateResult> {
    return this.attendanceRepository.update(id, attendance);
  }

  async checkIn(
    checkInDto: CheckInDto,
    user_id: number,
    employee_id: number,
  ): Promise<Attendance> {
    const {
      check_in,
      checkin_address,
      checkin_latitude,
      checkin_longitude,
      checkin_location,
    } = checkInDto;
    const attendance = new Attendance();
    attendance.employee_id = employee_id;
    attendance.check_in = new Date(check_in);
    attendance.create_date = new Date(check_in);
    attendance.write_date = new Date(check_in);
    attendance.create_uid = user_id;
    attendance.write_uid = user_id;
    attendance.checkin_address = checkin_address;
    attendance.checkin_latitude = checkin_latitude;
    attendance.checkin_longitude = checkin_longitude;
    attendance.checkin_location = checkin_location;

    return this.attendanceRepository.save(attendance);
  }

  async checkOut(
    employee_id: number,
    checkOutDto: CheckOutDto,
  ): Promise<Attendance> {
    const {
      check_out,
      checkout_address,
      checkout_latitude,
      checkout_longitude,
      checkout_location,
    } = checkOutDto;
    const attendance = await this.attendanceRepository.findOne({
      where: {
        employee_id,
        check_in: Not(IsNull()),
        check_out: IsNull(),
      },
    });

    if (!attendance) {
      throw new HttpException(
        'Employee has not checked in',
        HttpStatus.NOT_FOUND,
      );
    }

    attendance.check_out = new Date(check_out);
    attendance.worked_hours =
      (attendance.check_out.getTime() - attendance.check_in.getTime()) /
      3600000;
    attendance.checkout_address = checkout_address;
    attendance.checkout_latitude = checkout_latitude;
    attendance.checkout_longitude = checkout_longitude;
    attendance.checkout_location = checkout_location;

    return this.attendanceRepository.save(attendance);
  }
}
