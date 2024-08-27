import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrLeaveTypeService } from './hr-leave-type.service';
import { HrLeaveTypeController } from './hr-leave-type.controller';
import { HrLeaveType } from './hr-leave-type.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/res_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HrLeaveType, User]), AuthModule],
  controllers: [HrLeaveTypeController],
  providers: [HrLeaveTypeService, JwtService],
})
export class HrLeaveTypeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: 'hr-leave/*', method: RequestMethod.ALL });
  }
}
