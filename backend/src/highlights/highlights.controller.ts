import { Controller, Get, Param, UseInterceptors, Post, Body, UploadedFiles , Put,Delete,Res } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsEntity } from './Entity/Highlights.Entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FormatDateImage } from "../Helper/FormatDateImage";
import { diskStorage } from 'multer';
import { HighlightDTO } from './DTO/Highlights.dto';

@Controller('highlights')
export class HighlightsController {
    constructor(private readonly highlightsService: HighlightsService) { }

    @Get('all')
    async findAll(): Promise<HighlightsEntity[]> {
        return await this.highlightsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<HighlightsEntity> {
        return await this.highlightsService.findOne(id);
    }

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ], {
        storage: diskStorage({
            destination: './uploads/highlights',
            filename: (req, file, cb) => {
                const formatDate = new FormatDateImage();
                cb(null, formatDate.generateDate(file.originalname));
            }
        })
    }))
    public async create(@Body() data: HighlightDTO, @UploadedFiles()
    file: {
        file: Express.Multer.File;
    },): Promise<HighlightsEntity> {
        return await this.highlightsService.create(data, file);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: HighlightDTO
    ): Promise<HighlightsEntity> {
        return await this.highlightsService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.highlightsService.remove(id);
    }
}
