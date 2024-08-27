import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrLeaveService } from './hr-leave.service';
import { HrLeaveController } from './hr-leave.controller';
import { HrLeave } from './hr-leave.entity';
import { Employee } from '../employee/employee.entity';

import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/res_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrLeave, Employee, User]), AuthModule], // Register the HrLeave entity here
  providers: [HrLeaveService, JwtService],
  controllers: [HrLeaveController],
})
export class HrLeaveModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'hr-leave/*', method: RequestMethod.ALL });
  }
}
