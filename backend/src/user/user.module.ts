import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './Entity/User.Entity';
import { CourseEnrollmentEntity } from "../courses/Entity/CourseEnrollmentEntity";
import { CoursesModule } from '../courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CourseEnrollmentEntity]), CoursesModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
