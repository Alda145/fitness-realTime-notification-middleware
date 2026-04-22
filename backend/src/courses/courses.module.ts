import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './Entity/Course.Entity';
import { TrainerEntity } from 'src/trainers/Entity/Trainer.Entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, TrainerEntity]) ,UserModule],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
