import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { HrLeaveService } from './hr-leave.service';
import { CreateHrLeaveDto } from './dto/create-hr-leave.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HrLeave } from './hr-leave.entity';

@Controller('hr-leave')
export class HrLeaveController {
  constructor(private readonly hrLeaveService: HrLeaveService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Req() req: Request, @Body() createHrLeaveDto: CreateHrLeaveDto) {
    const user_id = req['user'].id; // Get user ID from token
    const employee_id = req['user'].employee_id; // Get employee ID from token
    const department_id = req['user'].employee_id; // Get department_id from token
    return this.hrLeaveService.create(createHrLeaveDto, user_id, employee_id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.hrLeaveService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('by-employee')
  getByEmployee(@Req() req: Request) {
    const employee_id = req['user']?.employee_id; // Safely retrieve employee ID from token
    return this.hrLeaveService.findByEmployee(employee_id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hrLeaveService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Get('by-employee')
  // findByEmployee(): Promise<HrLeave[]> {
  //   // const user_id = req['user']?.id; // Safely retrieve user ID from token
  //   // const employee_id = req['user']?.employee_id; // Safely retrieve employee ID from token

  //   // if (typeof user_id !== 'number' || typeof employee_id !== 'number') {
  //   //   throw new BadRequestException('Invalid user_id or employee_id');
  //   // }

  //   return this.hrLeaveService.getByEmployee();
  // }

  //   @Patch(':id')
  //   update(
  //     @Param('id') id: string,
  //     @Body() updateHrLeaveDto: Partial<CreateHrLeaveDto>,
  //   ) {
  //     return this.hrLeaveService.update(+id, updateHrLeaveDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.hrLeaveService.remove(+id);
  //   }
}
