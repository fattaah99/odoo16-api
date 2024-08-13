import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/res_users.entity';

@Entity('hr_employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  children: number;

  @Column({ type: 'integer', nullable: true })
  resource_id: number;

  @Column({ type: 'integer', nullable: true })
  company_id: number;

  @Column({ type: 'integer', nullable: true })
  resource_calendar_id: number;

  @Column({ type: 'integer', nullable: true })
  message_main_attachment_id: number;

  @Column({ type: 'integer', nullable: true })
  color: number;

  @Column({ type: 'integer', nullable: true })
  department_id: number;

  @Column({ type: 'integer', nullable: true })
  job_id: number;

  @Column({ type: 'integer', nullable: true })
  address_id: number;

  @Column({ type: 'integer', nullable: true })
  work_contact_id: number;

  @Column({ type: 'integer', nullable: true })
  work_location_id: number;

  @Column({ type: 'integer', nullable: true })
  user_id: number;

  @Column({ type: 'integer', nullable: true })
  parent_id: number;

  @Column({ type: 'integer', nullable: true })
  coach_id: number;

  @Column({ type: 'integer', nullable: true })
  address_home_id: number;

  @Column({ type: 'integer', nullable: true })
  country_id: number;

  @Column({ type: 'character varying', nullable: true })
  country_of_birth: string;

  @Column({ type: 'integer', nullable: true })
  bank_account_id: number;

  @Column({ type: 'integer', nullable: true })
  km_home_work: number;

  @Column({ type: 'integer', nullable: true })
  departure_reason_id: number;

  @Column({ type: 'integer', nullable: true })
  create_uid: number;

  @Column({ type: 'integer', nullable: true })
  write_uid: number;

  @Column({ type: 'date', nullable: true })
  spouse_birthdate: Date;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: 'date', nullable: true })
  visa_expire: Date;

  @Column({ type: 'date', nullable: true })
  work_permit_expiration_date: Date;

  @Column({ type: 'date', nullable: true })
  departure_date: Date;

  @Column({ type: 'boolean', nullable: true })
  active: boolean;

  @Column({ type: 'boolean', nullable: true })
  work_permit_scheduled_activity: boolean;

  @Column({ type: 'timestamp without time zone', nullable: true })
  create_date: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  write_date: Date;

  @Column({ type: 'integer', nullable: true })
  last_attendance_id: number;

  @Column({ type: 'timestamp without time zone', nullable: true })
  last_check_in: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  last_check_out: Date;

  @Column({ type: 'boolean', nullable: true })
  masked: boolean;

  @Column({ type: 'integer', nullable: true })
  leave_manager_id: number;

  @Column({ type: 'character varying', nullable: true })
  permit_no: string;

  @Column({ type: 'character varying', nullable: true })
  visa_no: string;

  @Column({ type: 'character varying', nullable: true })
  certificate: string;

  @Column({ type: 'character varying', nullable: true })
  study_field: string;

  @Column({ type: 'character varying', nullable: true })
  study_school: string;

  @Column({ type: 'character varying', nullable: true })
  emergency_contact: string;

  @Column({ type: 'character varying', nullable: true })
  emergency_phone: string;

  @Column({ type: 'character varying', nullable: true })
  barcode: string;

  @Column({ type: 'character varying', nullable: true })
  pin: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  departure_description: string;

  @Column({ type: 'character varying', nullable: true })
  unmask_pin: string;

  @Column({ type: 'character varying', nullable: true })
  x_nik: string;

  @Column({ type: 'character varying', nullable: true })
  sensitive_field: string;

  @Column({ type: 'text', nullable: true })
  additional_note: string;

  @Column({ type: 'character varying', nullable: true })
  name: string;

  @Column({ type: 'character varying', nullable: true })
  job_title: string;

  @Column({ type: 'character varying', nullable: true })
  work_phone: string;

  @Column({ type: 'character varying', nullable: true })
  mobile_phone: string;

  @Column({ type: 'character varying', nullable: true })
  work_email: string;

  @Column({ type: 'character varying', nullable: true })
  employee_type: string;

  @Column({ type: 'character varying', nullable: true })
  gender: string;

  @Column({ type: 'character varying', nullable: true })
  marital: string;

  @Column({ type: 'character varying', nullable: true })
  spouse_complete_name: string;

  @Column({ type: 'character varying', nullable: true })
  place_of_birth: string;

  @Column({ type: 'character varying', nullable: true })
  ssnid: string;

  @Column({ type: 'character varying', nullable: true })
  sinid: string;

  @Column({ type: 'character varying', nullable: true })
  identification_id: string;

  @Column({ type: 'character varying', nullable: true })
  passport_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Tambahkan kolom lain sesuai dengan struktur tabel hr_employee
}
