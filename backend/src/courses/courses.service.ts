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


 public   async create(data: CoursesDto, file: Express.Multer.File) {
        try {
            const trainer = await this.trainerRepository.findOneBy({
                id: +data.trainer_id,
            });

            if (!trainer) {
                throw new ErrorHandler('Trainer not found', HttpStatus.NOT_FOUND);
            }

            const newCourse = this.courseRepository.create({
                title: data.title,
                description: data.description,
                day: data.day,
                time: data.time,
                icon: file ? `/uploads/courses/${file.filename}` : '',
                trainer: trainer,
            });

            console.log("newCourse is:", newCourse)

            return await this.courseRepository.save(newCourse);

        } catch (error) {
            if (error instanceof ErrorHandler) {
                throw error;
            }

            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


  public  async findAll() {
        try {
        const courses = await this.courseRepository.find({
                relations: ['trainer'],
            });
            return courses;

        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


  public  async findOne(id: number) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id },
                relations: ['trainer'],
            });

            if (!course) {
                throw new ErrorHandler('Course not found', HttpStatus.NOT_FOUND);
            }

            return course;

        } catch (error) {
            if (error instanceof ErrorHandler) {
                throw error;
            }

            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


   public async update(id: number, data: CoursesDto, file?: Express.Multer.File) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id },
                relations: ['trainer'],
            });

            if (!course) {
                throw new ErrorHandler('Course not found', HttpStatus.NOT_FOUND);
            }

            const trainer = await this.trainerRepository.findOneBy({
                id: +data.trainer_id,
            });

            if (!trainer) {
                throw new ErrorHandler('Trainer not found', HttpStatus.NOT_FOUND);
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

            return await this.findOne(id);

        } catch (error) {
            if (error instanceof ErrorHandler) {
                throw error;
            }

            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




  public  async remove(id: number) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id },
            });

            if (!course) {
                throw new ErrorHandler('Course not found', HttpStatus.NOT_FOUND);
            }

            await this.courseRepository.delete(id);

            return { message: 'Course deleted successfully' };

        } catch (error) {
            if (error instanceof ErrorHandler) {
                throw error;
            }

            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async registerToCourse(data: any): Promise<any> {
        console.log("data is",data);
        const { user_id, course_id } = data;

        try {
            const existing = await this.courseEnrollmentEntityRepository.findOne({
                where: {
                    user: { id: user_id },
                    course: { id: course_id }
                },
                relations: ['user', 'course']
            });
            console.log("existing :",existing)

            if (existing) {
                throw new ErrorHandler("You are already registered", HttpStatus.FOUND);
            }

            const enrollment = this.courseEnrollmentEntityRepository.create({
                user: { id: user_id },
                course: { id: course_id }
            });
            console.log("enrollment", enrollment)
            await this.courseEnrollmentEntityRepository.save(enrollment);

            return { message: "Registered successfully", status: 201 };

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