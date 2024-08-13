import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HrLeaveTypeService } from './hr-leave-type.service';
import {
  CreateHrLeaveTypeDto,
  UpdateHrLeaveTypeDto,
} from './dto/hr-leave-type.dto';

@Controller('hr-leave-type')
export class HrLeaveTypeController {
  constructor(private readonly hrLeaveTypeService: HrLeaveTypeService) {}

  @Post()
  create(@Body() createHrLeaveTypeDto: CreateHrLeaveTypeDto) {
    return this.hrLeaveTypeService.create(createHrLeaveTypeDto);
  }

  @Get()
  findAll() {
    return this.hrLeaveTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrLeaveTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHrLeaveTypeDto: UpdateHrLeaveTypeDto,
  ) {
    return this.hrLeaveTypeService.update(+id, updateHrLeaveTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrLeaveTypeService.remove(+id);
  }
}
