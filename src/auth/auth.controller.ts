import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';
import { ApiKeyGuard } from './api-key.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // @Post('login')
  // async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
  //   const token = await this.authService.login(loginDto);
  //   return { access_token: token };
  // }

  // @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protectedRoute() {
    return { message: 'You have access to this route' };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req): Promise<{ message: string }> {
    const user_id = req['user'].id;
    await this.authService.logout(user_id);
    return { message: 'Logout successful' };
  }
}
