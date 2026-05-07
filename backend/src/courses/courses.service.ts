import { Injectable, NotFoundException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './Entity/Course.Entity';
import { Repository } from 'typeorm';
import { CoursesDto } from './DTO/Courses.dto';
import { TrainerEntity } from 'src/trainers/Entity/Trainer.Entity';
import { CourseEnrollmentEntity } from './Entity/CourseEnrollmentEntity';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private courseRepository: Repository<CourseEntity>,

        @InjectRepository(TrainerEntity)
        private trainerRepository: Repository<TrainerEntity>,

        @InjectRepository(CourseEnrollmentEntity)
        private courseEnrollmentEntityRepository: Repository<CourseEnrollmentEntity>
    ) { }

    async create(data: CoursesDto, file: Express.Multer.File) {
        console.log("DATA CREATE COURSE:", data);
        console.log("TRAINER ID:", data.trainer_id);
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

    public async registerToCourse(data: any): Promise<any> {
        const { user_id, course_id } = data;

        try {
            const existing = await this.courseEnrollmentEntityRepository.findOne({
                where: {
                    user: { id: user_id },
                    course: { id: course_id }
                },
                relations: ['user', 'course']
            });

            if (existing) {
                throw new ErrorHandler("You are already registered", HttpStatus.FOUND);
            }

            const enrollment = this.courseEnrollmentEntityRepository.create({
                user: { id: user_id },
                course: { id: course_id }
            });

            await this.courseEnrollmentEntityRepository.save(enrollment);

            return { message: "Registered successfully", status: 200 };

        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    public async getAllUserEnrollment(user_id: number): Promise<any> {
        try {
            const enrollments = await this.courseEnrollmentEntityRepository.find({
                where: {
                    user: { id: user_id }
                },
                relations: ['course', 'course.trainer', 'user'],
                order: {
                    registeredAt: 'DESC'
                }
            });

            return enrollments;
        } catch (error) {
            console.log("GET USER ENROLLMENTS ERROR:", error);
            throw new InternalServerErrorException(error.message);
        }
    }
}