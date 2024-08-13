import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Attendance } from './attendance/attendance.entity';
import { Employee } from './employee/employee.entity';
// import { User } from './Auth/auth.entity';

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // entities: [Attendance, Employee, User],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
};

// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { config } from 'dotenv';
// import { Attendance } from './attendance/attendance.entity';
// import { Employee } from './employee/employee.entity';
// // import { User } from './Auth/auth.entity';

// config();

// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) {
//   throw new Error('DATABASE_URL is not defined in the environment variables');
// }

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   url: databaseUrl,
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: false,
//   logging: true,
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   extra: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// };
