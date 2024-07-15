import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password_hp: string;

  // Tambahkan kolom lain sesuai dengan tabel res_users
}
