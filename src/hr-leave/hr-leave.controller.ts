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
} from '@nestjs/common';
import { HrLeaveService } from './hr-leave.service';
import { CreateHrLeaveDto } from './dto/create-hr-leave.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @Get()
  findAll() {
    return this.hrLeaveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrLeaveService.findOne(+id);
  }

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
