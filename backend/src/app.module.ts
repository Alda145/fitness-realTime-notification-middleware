import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

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
import { CourseEnrollmentEntity } from './courses/Entity/CourseEnrollmentEntity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/Entity/User.Entity';
import { AuthModule } from './auth/auth.module';
import { HighlightsModule } from './highlights/highlights.module';
import { HighlightsEntity } from './highlights/Entity/Highlights.Entity';
import { AuthMiddleware } from './Middleware/Auth.middleware';
import { PricingModule } from './pricing/pricing.module';
import { PricingEntity } from './pricing/Entity/pricing.Entity';
import { PaymentModule } from './payment/payment.module';




@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fitness',
      entities: [CourseEntity, TrainerEntity, AppointmentEntity, BlockedSlotEntity, UserEntity, HighlightsEntity, CourseEnrollmentEntity, PricingEntity],
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
    PricingModule,
    PaymentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'trainers', method: RequestMethod.POST },
        { path: 'trainers/:id', method: RequestMethod.PATCH },
        { path: 'trainers/:id', method: RequestMethod.DELETE },
        { path: 'trainers/:id', method: RequestMethod.GET },

        { path: 'courses', method: RequestMethod.POST },
        { path: 'courses/:id', method: RequestMethod.PATCH },
        { path: 'courses/:id', method: RequestMethod.DELETE },

        { path: 'blocked-slot', method: RequestMethod.POST },
        { path: 'blocked-slot/:id', method: RequestMethod.PATCH },
        { path: 'blocked-slot/:id', method: RequestMethod.DELETE },
        { path: 'blocked-slot/:id', method: RequestMethod.GET },


       //{ path: 'appointment/book-appointment', method: RequestMethod.POST},
        { path: 'appointment/appointmentTable', method: RequestMethod.GET },
        //  { path: 'appointment/:id', method: RequestMethod.GET },
        { path: 'appointment/:id', method: RequestMethod.DELETE },
        { path: 'appointment/:id', method: RequestMethod.PATCH },

        { path: 'user/register-course', method: RequestMethod.POST },
        { path: 'user/all-enrollment/:id', method: RequestMethod.GET },


      )
  }
}
