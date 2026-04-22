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
import { AuthGuard } from 'src/guards/auth.Guards';


@Controller('trainers')
export class TrainersController {
    constructor(private readonly trainersService: TrainersService) { }

    @UseGuards(AuthGuard)
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
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: TrainersDto,
    ) {
        return this.trainersService.create(data, file);
    }

    @Get()
    findAll() {
        return this.trainersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.trainersService.findOne(+id);
    }

    @UseGuards(AuthGuard)
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
    update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: TrainersDto,
    ) {
        return this.trainersService.update(+id, data, file);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.trainersService.remove(+id);
    }
}