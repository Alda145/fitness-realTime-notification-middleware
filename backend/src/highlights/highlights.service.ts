import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HighlightsEntity } from './Entity/Highlights.Entity';
import { HighlightDTO } from './DTO/Highlights.dto';
import { Repository } from 'typeorm';

@Injectable()
export class HighlightsService {

    constructor(@InjectRepository(HighlightsEntity) private highlightsRepository: Repository<HighlightsEntity>) { }

    public async create(data: HighlightDTO, file: any): Promise<HighlightsEntity> {

        try {
            const highlight = {
                title: data.title,
                description: data.description,
                image: file?.image[0].filename
            }
            return this.highlightsRepository.save(highlight);
        } catch (error) {
            throw new HttpException("succesfully created", HttpStatus.OK);

        }


    }
    public async update(id: number, data: HighlightDTO): Promise<HighlightsEntity> {

        try {
            const highlight = await this.findOne(id);
            if (!highlight) {
                throw new HttpException("This highlight does not exists", HttpStatus.NOT_FOUND);
            }
            await this.highlightsRepository.update(id, data)
            return highlight;

        } catch (error) {
            throw new HttpException("Failed to update category", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    public async findAll(): Promise<HighlightsEntity[]> {
        try {
            return await this.highlightsRepository.find();
        } catch (error) {

            throw new HttpException("Failed to retrieve highlights ", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    public async findOne(id: number): Promise<HighlightsEntity> {
        try {
            const highlight = await this.highlightsRepository.findOne({ where: { id } })
            if (!highlight) {
                throw new HttpException("this highlight does not exists", HttpStatus.NOT_FOUND);
            }
            return highlight;
        } catch (error) {
            throw new HttpException("Failed to find", HttpStatus.OK)
        }
    }

    public async remove(id: number): Promise<void> {
        try {
            const highlight = await this.findOne(id);
            if (!highlight) {
                throw new HttpException("this highlight does not exists", HttpStatus.NOT_FOUND)
            }
            await this.highlightsRepository.remove(highlight)
        } catch (error) {
            throw new HttpException("Failed to delete highlight", HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }









}
