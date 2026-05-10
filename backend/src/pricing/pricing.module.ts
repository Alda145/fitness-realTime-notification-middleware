import { Module } from '@nestjs/common';
import { PricingController } from './pricing.controller';
import { PricingService } from './pricing.service';
import { PricingEntity } from './Entity/pricing.Entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([PricingEntity])],
  controllers: [PricingController],
  providers: [PricingService],
  exports: [PricingService]
})
export class PricingModule {}
