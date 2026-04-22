import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './Entity/Course.Entity';
import { Repository } from 'typeorm';
import { CoursesDto } from './DTO/Courses.dto';
import { TrainerEntity } from 'src/trainers/Entity/Trainer.Entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private courseRepository: Repository<CourseEntity>,

        @InjectRepository(TrainerEntity)
        private trainerRepository: Repository<TrainerEntity>,
    ) { }

    async create(data: CoursesDto, file: Express.Multer.File) {
        const trainer = await this.trainerRepository.findOneBy({
            id: +data.trainer_id,
        });

        if (!trainer) {
            throw new NotFoundException('Trainer not found');
        }

        const newCourse = this.courseRepository.create({
            title: data.title,
            description: data.description,
            day: data.day,
            time: data.time,
            icon: file ? `/uploads/courses/${file.filename}` : '',
            trainer: trainer,
        });

        return this.courseRepository.save(newCourse);
    }

    findAll() {
        return this.courseRepository.find({
            relations: ['trainer'],
        });
    }

    findOne(id: number) {
        return this.courseRepository.findOne({
            where: { id },
            relations: ['trainer'],
        });
    }

    async update(id: number, data: CoursesDto, file?: Express.Multer.File) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['trainer'],
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const trainer = await this.trainerRepository.findOneBy({
            id: +data.trainer_id,
        });

        if (!trainer) {
            throw new NotFoundException('Trainer not found');
        }

        course.title = data.title;
        course.description = data.description;
        course.day = data.day;
        course.time = data.time;
        course.trainer = trainer;

        if (file) {
            course.icon = `/uploads/courses/${file.filename}`;
        }

        await this.courseRepository.save(course);

        return this.findOne(id);
    }

    async remove(id: number) {
        await this.courseRepository.delete(id);
        return { message: 'Course deleted successfully' };
    }
}