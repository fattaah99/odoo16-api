import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/res_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, User]), AuthModule],
  providers: [EmployeeService, JwtService],
  controllers: [EmployeeController],
})
export class EmployeeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'employee/*', method: RequestMethod.ALL });
  }
}
