import {
  IsInt,
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateHrLeaveDto {
  @IsInt()
  create_uid: number;

  @IsInt()
  write_uid: number;

  @IsInt()
  user_id: number;

  @IsInt()
  holiday_status_id: number;

  @IsInt()
  employee_id: number;

  @IsInt()
  employee_company_id: number;

  @IsInt()
  department_id: number;

  @IsInt()
  meeting_id: number;

  @IsString()
  private_name: string;

  @IsString()
  state: string;

  @IsString()
  duration_display: string;

  @IsString()
  holiday_type: string;

  @IsString()
  request_date_from_period: string;

  @IsDateString()
  request_date_from: Date;

  @IsDateString()
  request_date_to: Date;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  request_unit_half: boolean;

  @IsBoolean()
  request_unit_hours: boolean;

  @IsDateString()
  date_from: string;

  @IsDateString()
  date_to: string;

  @IsDateString()
  create_date: string;

  @IsDateString()
  write_date: string;

  @IsNumber()
  number_of_days: number;
}
