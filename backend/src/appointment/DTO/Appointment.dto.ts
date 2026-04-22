import { IsString, IsNotEmpty, IsISO8601, isString, isNotEmpty, IsEnum } from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    notes: string;

    @IsISO8601()
    @IsNotEmpty()
    startTime: string;

    @IsISO8601()
    @IsNotEmpty()
    endTime: string;

    @IsEnum(['pending', 'accept', 'reject'])
    @IsNotEmpty()
    status: string;
}