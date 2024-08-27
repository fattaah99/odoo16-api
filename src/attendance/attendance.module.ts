// import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Attendance } from './attendance.entity';
// import { AttendanceService } from './attendance.service';
// import { AttendanceController } from './attendance.controller';

// import { JwtService } from '@nestjs/jwt';
// import { JwtMiddleware } from '../auth/jwt.middleware';
// import { AuthModule } from '../auth/auth.module';

// @Module({
//   imports: [TypeOrmModule.forFeature([Attendance])],
//   providers: [AttendanceService, JwtService],
//   controllers: [AttendanceController],
// })
// export class AttendanceModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtMiddleware)
//       .forRoutes({ path: 'attendance/*', method: RequestMethod.ALL });
//   }
// }
// // export class AttendanceModule {}

import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { AuthModule } from '../auth/auth.module'; // Import the AuthModule
import { User } from '../auth/res_users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, User]),
    AuthModule, // Add the AuthModule to make UserRepository available
  ],
  providers: [AttendanceService, JwtService],
  controllers: [AttendanceController],
})
export class AttendanceModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'attendance/*', method: RequestMethod.ALL });
  }
}
