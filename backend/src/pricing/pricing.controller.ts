import { Post, Get, Body, Controller, Param ,Put, Delete} from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingDto } from './DTO/pricing.dto';
import { PricingEntity } from './Entity/pricing.Entity';

@Controller('pricing')
export class PricingController {
    constructor(private readonly pricingService: PricingService) { }

    @Post()
    public async createPricing(@Body() body: PricingDto): Promise<PricingEntity> {
        return await this.pricingService.createPricing(body)

    }
    @Get()
    public async getAllPricing(): Promise<PricingEntity[]> {
        return await this.pricingService.getAllPricing()
    }
    @Get(':id')
    public async findOne(@Param('id') id: number): Promise<PricingEntity> {
        return await this.pricingService.findOne(id)
    }
    @Put(':id')
    public async updatePricing(@Param('id') id:number ,@Body() body:PricingDto):Promise<PricingEntity>{
        return await this.pricingService.updatePricing(id,body)
    }
    @Delete(':id')
    public async removePricing(@Param('id') id:number):Promise<void>{
        return await this.pricingService.removePricing(id)
    }
}
