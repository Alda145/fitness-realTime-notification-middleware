import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Patch,
    Delete,
    UploadedFile,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersDto } from './DTO/Trainers.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminGuard } from '../guards/admin.guards';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/Decorators/AdminRole.decorator';
import { TransformParamToInt } from 'src/Pipes/transformParamToInt.pipe';
import { ParseIntPipe } from '@nestjs/common';


@Controller('trainers')
export class TrainersController {
    constructor(private readonly trainersService: TrainersService) { }

    @UseGuards(AdminGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/trainers',
                filename: (req, file, callback) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    console.log(file);
                    console.log("Date,now:", Date.now());
                    console.log("Generated filename:", uniqueName);
                    callback(null, uniqueName);
                },
            }),
        }),
    )
    public async create(@UploadedFile() file: Express.Multer.File, @Body() data: TrainersDto,) {
        return await this.trainersService.create(data, file);
    }

    @Get()
    public async findAll() {
        return await this.trainersService.findAll();
    }


    @UseGuards(RolesGuard)
    @Roles('admin')
    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.trainersService.findOne(id);
    }

    // @Get(':id')
    // public async getOne(@Param('id', TransformParamToInt) id: number) {
    //     return await this.trainersService.findOne(id);
    // }

    // @Get(':id')
    // public async findOne(@Param('id') id: number) {
    //     return this.trainersService.findOne(id);
    // }


    @UseGuards(AdminGuard)
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/trainers',
                filename: (req, file, callback) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
        }),
    )
    public async update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: TrainersDto,
    ) {
        return await this.trainersService.update(id, data, file);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.trainersService.remove(id);
    }
}