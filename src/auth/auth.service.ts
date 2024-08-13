import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './res_users.entity';
import { RegisterDto } from './dto/register.dto';

import { Employee } from '../employee/employee.entity'; // Update path to Employee entity
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { login, password_hp } = registerDto;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password_hp) {
      throw new ConflictException('Password HP has already been set');
    }

    const secretKey = process.env.SECRET_KEY;
    const salt = await bcrypt.genSalt();
    const hash = crypto
      .createHmac('sha256', secretKey)
      .update(password_hp)
      .digest('hex');
    const hashedPassword = await bcrypt.hash(hash, salt);

    user.password_hp = hashedPassword;
    await this.userRepository.save(user);

    return { message: 'Password HP has been set successfully' };

    // user.password_hp = password_hp;
    // await this.userRepository.save(user);

    // return { message: 'Password HP has been set successfully' };
  }

  // async validateUser(login: string, password_hp: string): Promise<User> {
  //   const secretKey = process.env.SECRET_KEY;
  //   console.log('Login:', login); // Logging login
  //   const user = await this.userRepository.findOne({ where: { login } });
  //   if (user) {
  //     const hash = crypto
  //       .createHmac('sha256', secretKey)
  //       .update(password_hp)
  //       .digest('hex');
  //     console.log('Hash:', hash); // Logging hash
  //     if (await bcrypt.compare(hash, user.password_hp)) {
  //       return user;
  //     }
  //   }
  //   throw new UnauthorizedException('Invalid credentials');
  // }

  // async login(loginDto: LoginDto): Promise<string> {
  //   const user = await this.validateUser(loginDto.login, loginDto.password_hp);
  //   const employee = await this.employeeRepository.findOne({
  //     where: { user: { id: user.id } },
  //   });

  //   const payload = {
  //     id: user.id,
  //     employee_id: employee ? employee.id : null,
  //     employee_name: employee ? employee.name : null,
  //   };

  //   return this.jwtService.sign(payload, { secret: process.env.SECRET_KEY });
  // }

  async validateUser(login: string, password_hp: string): Promise<User> {
    const secretKey = process.env.SECRET_KEY;
    console.log('Login:', login); // Logging login
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) {
      const hash = crypto
        .createHmac('sha256', secretKey)
        .update(password_hp)
        .digest('hex');
      console.log('Hash:', hash); // Logging hash
      if (await bcrypt.compare(hash, user.password_hp)) {
        return user;
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(loginDto: LoginDto): Promise<{
    token: string;
    user: Partial<User>;
    employee: Partial<Employee> | null;
  }> {
    const user = await this.validateUser(loginDto.login, loginDto.password_hp);
    const employee = await this.employeeRepository.findOne({
      where: { user: { id: user.id } },
    });

    const payload = {
      id: user.id,
      employee_id: employee ? employee.id : null,
      employee_name: employee ? employee.name : null,
      department_id: employee ? employee.department_id : null,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
    });

    // Remove sensitive information
    const { login, password_hp, ...userWithoutSensitiveInfo } = user;
    const employeeWithoutSensitiveInfo = employee
      ? { id: employee.id, name: employee.name }
      : null;

    return {
      token,
      user: userWithoutSensitiveInfo,
      employee: employeeWithoutSensitiveInfo,
    };
  }
}
