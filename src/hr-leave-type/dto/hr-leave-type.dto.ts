import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsJSON,
  IsDate,
} from 'class-validator';

export class CreateHrLeaveTypeDto {
  @IsInt()
  sequence: number;

  @IsInt()
  color: number;

  @IsInt()
  icon_id: number;

  @IsInt()
  company_id: number;

  @IsInt()
  responsible_id: number;

  @IsInt()
  leave_notif_subtype_id: number;

  @IsInt()
  allocation_notif_subtype_id: number;

  @IsInt()
  create_uid: number;

  @IsInt()
  write_uid: number;

  @IsBoolean()
  create_calendar_meeting: boolean;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  unpaid: boolean;

  @IsBoolean()
  support_document: boolean;

  @IsDate()
  create_date: Date;

  @IsDate()
  write_date: Date;

  @IsBoolean()
  overtime_deductible: boolean;

  @IsJSON()
  name: Record<string, string>;

  @IsString()
  @IsOptional()
  color_name?: string;

  @IsString()
  @IsOptional()
  leave_validation_type?: string;

  @IsString()
  @IsOptional()
  requires_allocation?: string;

  @IsString()
  @IsOptional()
  employee_requests?: string;

  @IsString()
  @IsOptional()
  allocation_validation_type?: string;

  @IsString()
  @IsOptional()
  time_type?: string;

  @IsString()
  @IsOptional()
  request_unit?: string;
}

export class UpdateHrLeaveTypeDto {
  @IsInt()
  sequence: number;

  @IsInt()
  color: number;

  @IsInt()
  icon_id: number;

  @IsInt()
  company_id: number;

  @IsInt()
  responsible_id: number;

  @IsInt()
  leave_notif_subtype_id: number;

  @IsInt()
  allocation_notif_subtype_id: number;

  @IsInt()
  create_uid: number;

  @IsInt()
  write_uid: number;

  @IsBoolean()
  create_calendar_meeting: boolean;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  unpaid: boolean;

  @IsBoolean()
  support_document: boolean;

  @IsDate()
  create_date: Date;

  @IsDate()
  write_date: Date;

  @IsBoolean()
  overtime_deductible: boolean;

  @IsJSON()
  name: Record<string, string>;

  @IsString()
  @IsOptional()
  color_name?: string;

  @IsString()
  @IsOptional()
  leave_validation_type?: string;

  @IsString()
  @IsOptional()
  requires_allocation?: string;

  @IsString()
  @IsOptional()
  employee_requests?: string;

  @IsString()
  @IsOptional()
  allocation_validation_type?: string;

  @IsString()
  @IsOptional()
  time_type?: string;

  @IsString()
  @IsOptional()
  request_unit?: string;
}
