import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from '../auth/jwt.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
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
// export class AttendanceModule {}
