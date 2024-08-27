import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HrLeaveType } from '../hr-leave-type/hr-leave-type.entity';
import { Employee } from '../employee/employee.entity';

@Entity('hr_leave')
export class HrLeave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  message_main_attachment_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  manager_id: number;

  @Column({ nullable: true })
  holiday_status_id: number;

  @Column({ nullable: true })
  holiday_allocation_id: number;

  @Column({ nullable: true })
  employee_id: number;

  @Column({ nullable: true })
  employee_company_id: number;

  @Column({ nullable: true })
  department_id: number;

  @Column({ nullable: true })
  meeting_id: number;

  @Column({ nullable: true })
  parent_id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  mode_company_id: number;

  @Column({ nullable: true })
  first_approver_id: number;

  @Column({ nullable: true })
  second_approver_id: number;

  @Column({ nullable: true })
  create_uid: number;

  @Column({ nullable: true })
  write_uid: number;

  @Column({ nullable: true, default: false })
  multi_employee: boolean;

  @Column({ nullable: true, default: false })
  request_unit_half: boolean;

  @Column({ nullable: true, default: false })
  request_unit_hours: boolean;

  @Column({ type: 'timestamp', nullable: true })
  date_from: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_to: Date;

  @CreateDateColumn({ nullable: true })
  create_date: Date;

  @UpdateDateColumn({ nullable: true })
  write_date: Date;

  @Column({ type: 'double precision', nullable: true })
  number_of_days: number;

  @Column({ nullable: true })
  overtime_id: number;

  @Column({ type: 'date', nullable: true })
  request_date_from: Date;

  @Column({ type: 'date', nullable: true })
  request_date_to: Date;

  @Column({ nullable: true, default: true })
  active: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  private_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  duration_display: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  holiday_type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  request_hour_from: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  request_hour_to: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  request_date_from_period: string;

  @Column({ type: 'text', nullable: true })
  report_note: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => HrLeaveType, (hrLeaveType) => hrLeaveType.hrLeaves)
  @JoinColumn({ name: 'holiday_status_id' })
  holidayStatus: HrLeaveType;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' }) // Menghubungkan dengan kolom employee_id
  employee: Employee;
}
