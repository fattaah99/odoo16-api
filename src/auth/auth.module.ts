import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './res_users.entity';
import { JwtModule } from '@nestjs/jwt';
import { Employee } from '../employee/employee.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Employee]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule global
    }),
    // JwtModule.register({
    //   secret: process.env.SECRET_KEY,
    //   signOptions: { expiresIn: '60m' },
    // }),
    // PassportModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
