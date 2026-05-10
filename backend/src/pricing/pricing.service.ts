import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PricingEntity } from './Entity/pricing.Entity';
import { Repository } from 'typeorm';
import { PricingDto } from './DTO/pricing.dto';

@Injectable()
export class PricingService {
    constructor(@InjectRepository(PricingEntity) private readonly pricingRepository: Repository<PricingEntity>,) { }

    public async createPricing(data: PricingDto): Promise<PricingEntity> {
        try {
            if (!data.title || !data.type || !data.price) {
                throw new HttpException('Title,type and price are required', HttpStatus.BAD_REQUEST)
            }
            const newPricing = this.pricingRepository.create(data);
            return await this.pricingRepository.save(newPricing);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException("Failed to create pricing", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async getAllPricing(): Promise<PricingEntity[]> {
        try {
            const allPricing = await this.pricingRepository.find();
            return allPricing;
        } catch (error) {
            throw new HttpException("Failed to get pricising List", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async findOne(id: number): Promise<PricingEntity> {
        try {
            const pricing = await this.pricingRepository.findOne({
                where: { id},
            });

            if (!pricing) {
                throw new HttpException("Pricing does not found", HttpStatus.NOT_FOUND);
            }
            return pricing;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException("Failed to get pricing", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async updatePricing(id: number, data: PricingDto): Promise<PricingEntity> {

        try {
            const pricing = await this.findOne(id);
            pricing.title = data.title;
            pricing.type = data.type;
            pricing.price = data.price;
            pricing.frequency = data.frequency;
            pricing.duration = data.duration;
            pricing.gender = data.gender;
            pricing.allowQuantity = data.allowQuantity;
            return await this.pricingRepository.save(pricing);
        } catch (error) {
            throw new HttpException("Failed to update pricing", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public async removePricing(id: number): Promise<void> {
        try {
            const pricing = await this.findOne(id);
            await this.pricingRepository.remove(pricing)
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new HttpException("Failed to delete pricing", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }



}
