import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    return await this.employeeRepository.findOneBy({ id });
  }

  async findByIdEmployee(employee_id: number): Promise<Employee[]> {
    const hrEmployee = await this.employeeRepository.find({
      where: { id: employee_id }, // Use the actual employee_id
    });

    return hrEmployee;
  }
}
