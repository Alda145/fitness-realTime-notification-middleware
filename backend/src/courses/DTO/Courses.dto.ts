import { IsString, IsNotEmpty, IsNumber ,IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CoursesDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    day: string;

    @IsString()
    @IsNotEmpty()
    time: string;


    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    trainer_id: number;
}

