import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { TrainersModule } from './trainers/trainers.module';
import { SendEmailModule } from './send-email/send-email.module';
import { AppointmentModule } from './appointment/appointment.module';
import { BlockedSlotModule } from './blocked-slot/blocked-slot.module';
import { CourseEntity } from './courses/Entity/Course.Entity';
import { TrainerEntity } from './trainers/Entity/Trainer.Entity';
import { AppointmentEntity } from './appointment/Entity/Appointment.entity';
import { BlockedSlotEntity } from './blocked-slot/Entity/BlockedSlot.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/Entity/User.Entity';
import { AuthModule } from './auth/auth.module';
import { HighlightsModule } from './highlights/highlights.module';
import { HighlightsEntity } from './highlights/Entity/Highlights.Entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fitness',
      entities: [CourseEntity, TrainerEntity, AppointmentEntity, BlockedSlotEntity, UserEntity,HighlightsEntity],
      autoLoadEntities: true,
      synchronize: true,
    }),
    CoursesModule,
    TrainersModule,
    SendEmailModule,
    AppointmentModule,
    BlockedSlotModule,
    UserModule,
    AuthModule,
    HighlightsModule,
    HighlightsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
