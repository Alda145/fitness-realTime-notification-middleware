import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './Entity/Appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AppointmentsGateway } from 'src/realtime/appointments.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]), UserModule],
  controllers: [AppointmentController],
  providers: [AppointmentService,AppointmentsGateway]
})
export class AppointmentModule { }
