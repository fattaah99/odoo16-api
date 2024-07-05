import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
