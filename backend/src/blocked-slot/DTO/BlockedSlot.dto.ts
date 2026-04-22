import { IsString, IsOptional, IsISO8601 } from 'class-validator';

export class BlockedSlotDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsISO8601()
    @IsOptional()
    startTime?: string;

    @IsISO8601()
    @IsOptional()
    endTime?: string;
}