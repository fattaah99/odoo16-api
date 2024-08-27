import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HrLeave } from './hr-leave.entity';
import { Employee } from '../employee/employee.entity';
import { CreateHrLeaveDto } from './dto/create-hr-leave.dto';

@Injectable()
export class HrLeaveService {
  constructor(
    @InjectRepository(HrLeave)
    private hrLeaveRepository: Repository<HrLeave>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createHrLeaveDto: CreateHrLeaveDto,
    user_id: number,
    employee_id: number,
  ): Promise<HrLeave> {
    //get data from employee
    const employee = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });

    // Handle case where employee is not found
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employee_id} not found`);
    }

    // Extract data from the employee entity
    const department_id = employee.department_id;
    const employee_company_id = employee.company_id;
    const active = employee.active;

    const newLeave = new HrLeave();
    newLeave.employee_id = employee_id;
    newLeave.create_date = new Date();
    newLeave.write_date = new Date();
    newLeave.create_uid = user_id;
    newLeave.write_uid = user_id;
    newLeave.user_id = user_id;
    newLeave.department_id = department_id;
    newLeave.employee_company_id = employee_company_id;
    newLeave.state = 'confirm';
    newLeave.holiday_type = 'employee';
    newLeave.request_date_from_period = 'am';
    newLeave.active = active;

    // Set default values for request_unit_half and request_unit_hours if not provided
    newLeave.request_unit_half = createHrLeaveDto.request_unit_half ?? false;
    newLeave.request_unit_hours = createHrLeaveDto.request_unit_hours ?? false;

    console.log('Creating HrLeave with data:', createHrLeaveDto);
    Object.assign(newLeave, createHrLeaveDto);

    const savedHrLeave = await this.hrLeaveRepository.save(newLeave);

    return savedHrLeave;
  }

  async findByEmployee(employee_id: number): Promise<HrLeave[]> {
    // Find the employee using the actual employee_id from the request
    const employee = await this.employeeRepository.findOne({
      where: { id: employee_id },
    });

    // Handle case where employee is not found
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employee_id} not found`);
    }

    // Find HrLeave entries for the given employee_id
    const hrLeaves = await this.hrLeaveRepository.find({
      where: { employee_id: employee_id }, // Filter berdasarkan employee_id
      relations: ['holidayStatus'], // Use the actual employee_id
    });

    return hrLeaves;
  }

  async findAll(): Promise<HrLeave[]> {
    return this.hrLeaveRepository.find();
  }

  async findOne(id: number): Promise<HrLeave> {
    const hrLeave = await this.hrLeaveRepository.findOne({ where: { id } });

    if (!hrLeave) {
      throw new NotFoundException(`HrLeave with ID ${id} not found`);
    }

    return hrLeave;
  }

  async update(
    id: number,
    updateHrLeaveDto: Partial<CreateHrLeaveDto>,
  ): Promise<HrLeave> {
    await this.hrLeaveRepository.update(id, updateHrLeaveDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.hrLeaveRepository.delete(id);
  }
}
