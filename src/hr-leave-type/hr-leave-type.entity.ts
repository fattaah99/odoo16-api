import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HrLeave } from '../hr-leave/hr-leave.entity';

@Entity('hr_leave_type')
export class HrLeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  sequence: number;

  @Column({ type: 'int' })
  color: number;

  @Column({ type: 'int' })
  icon_id: number;

  @Column({ type: 'int' })
  company_id: number;

  @Column({ type: 'int' })
  responsible_id: number;

  @Column({ type: 'int' })
  leave_notif_subtype_id: number;

  @Column({ type: 'int' })
  allocation_notif_subtype_id: number;

  @Column({ type: 'int' })
  create_uid: number;

  @Column({ type: 'int' })
  write_uid: number;

  @Column({ type: 'boolean' })
  create_calendar_meeting: boolean;

  @Column({ type: 'boolean' })
  active: boolean;

  @Column({ type: 'boolean' })
  unpaid: boolean;

  @Column({ type: 'boolean' })
  support_document: boolean;

  @Column({ type: 'timestamp' })
  create_date: Date;

  @Column({ type: 'timestamp' })
  write_date: Date;

  @Column({ type: 'boolean' })
  overtime_deductible: boolean;

  @Column({ type: 'jsonb' })
  name: Record<string, string>;

  @Column({ type: 'varchar', length: 255 })
  color_name: string;

  @Column({ type: 'varchar', length: 255 })
  leave_validation_type: string;

  @Column({ type: 'varchar', length: 255 })
  requires_allocation: string;

  @Column({ type: 'varchar', length: 255 })
  employee_requests: string;

  @Column({ type: 'varchar', length: 255 })
  allocation_validation_type: string;

  @Column({ type: 'varchar', length: 255 })
  time_type: string;

  @Column({ type: 'varchar', length: 255 })
  request_unit: string;

  @OneToMany(() => HrLeave, (hrLeave) => hrLeave.holidayStatus)
  hrLeaves: HrLeave[];
}
