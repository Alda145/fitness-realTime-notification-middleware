import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './Entity/Course.Entity';
import { TrainerEntity } from 'src/trainers/Entity/Trainer.Entity';
import { CourseEnrollmentEntity } from './Entity/CourseEnrollmentEntity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseEnrollmentEntity, TrainerEntity])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule { }
