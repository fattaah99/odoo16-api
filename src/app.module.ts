import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceModule } from './attendance/attendance.module';
import { EmployeeModule } from './employee/employee.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { typeOrmConfig } from './ormconfig';
// import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './auth/api-key.guard';

import { HrLeaveModule } from './hr-leave/hr-leave.module';
import { HrLeaveTypeModule } from './hr-leave-type/hr-leave-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule global
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AttendanceModule,
    EmployeeModule,
    AuthModule,
    // UsersModule,

    HrLeaveModule,
    HrLeaveTypeModule,
    // AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard, // Menggunakan ApiKeyGuard sebagai guard global
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
