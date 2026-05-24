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
    ParseIntPipe
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesDto } from './DTO/Courses.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminGuard } from '../guards/admin.guards';


@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @UseGuards(AdminGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('icon', {
            storage: diskStorage({
                destination: './uploads/courses',
                filename: (req, file, callback) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
        }),
    )
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CoursesDto,
    ) {
        console.log("Te dhenat e body jane :",data);
        console.log("File  ka keto vlera",file);
        return this.coursesService.create(data, file);
    }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

   // @UseGuards(AdminGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(+id);
    }
    
   @UseGuards(AdminGuard)
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('icon', {
            storage: diskStorage({
                destination: './uploads/courses',
                filename: (req, file, callback) => {
                    const uniqueName = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
        }),
    )
    update(
        @Param('id',ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: CoursesDto,
    ) {
        return this.coursesService.update(id, data, file);
    }

    //@UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.coursesService.remove(id);
    }
}