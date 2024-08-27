import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password_hp: string;

  @Column()
  jwt_token: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  jwt_token_expiration: Date;

  // Tambahkan kolom lain sesuai dengan tabel res_users
}
