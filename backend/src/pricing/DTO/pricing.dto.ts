import {IsBoolean,IsEnum,IsNotEmpty,IsNumber,IsOptional,IsString,} from 'class-validator';

import { PricingType } from '../Entity/pricing.Entity';

export class PricingDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(PricingType)
    @IsNotEmpty()
    type: PricingType;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsOptional()
    frequency?: string;

    @IsString()
    @IsOptional()
    duration?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsBoolean()
    @IsOptional()
    allowQuantity?: boolean;
}