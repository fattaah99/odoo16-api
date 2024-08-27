import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity('hr_attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column()
  create_uid: number;

  @Column()
  write_uid: number;

  @Column({ type: 'timestamp' })
  check_in: Date;

  @Column({ type: 'timestamp' })
  check_out: Date;

  @Column({ type: 'timestamp' })
  create_date: Date;

  @Column({ type: 'timestamp' })
  write_date: Date;

  @Column({ type: 'double precision', nullable: true })
  worked_hours: number;

  // New columns based on the image
  @Column({ type: 'character varying', nullable: true })
  checkin_address: string;

  @Column({ type: 'character varying', nullable: true })
  checkout_address: string;

  @Column({ type: 'character varying', nullable: true })
  checkin_latitude: string;

  @Column({ type: 'character varying', nullable: true })
  checkout_latitude: string;

  @Column({ type: 'character varying', nullable: true })
  checkin_longitude: string;

  @Column({ type: 'character varying', nullable: true })
  checkout_longitude: string;

  @Column({ type: 'character varying', nullable: true })
  checkin_location: string;

  @Column({ type: 'character varying', nullable: true })
  checkout_location: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' }) // Menghubungkan dengan kolom employee_id
  employee: Employee;
}
