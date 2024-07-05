import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  work_email: string;

  @Column()
  work_phone: string;

  // Tambahkan kolom lain sesuai dengan struktur tabel hr_employee
}
