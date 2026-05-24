import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './Entity/Appointment.entity';
import { CreateAppointmentDto } from './DTO/Appointment.dto';
import { AppointmentsGateway } from 'src/realtime/appointments.gateway';
import twilio from 'twilio';
const { RestException } = twilio;

@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(AppointmentEntity)
        private readonly appointmentRepository: Repository<AppointmentEntity>,
        private readonly appointmentsGateway: AppointmentsGateway,
    ) { }

    private client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    async sendSms(phone: string, name: string) {
        try {
            const message = await this.client.messages.create({
                body: `Pershendetje ${name}, appointment-i juaj u konfirmua!`, 
                to: phone,
                from: process.env.TWILIO_PHONE_NUMBER,
            });
            console.log(message);
        } catch (error) {
            if (error instanceof RestException) {
                console.log(`Twilio Error ${error.code}: ${error.message}`);
                console.log(`Status: ${error.status}`);
                console.log(`More info: ${error.moreInfo}`);
            } else {
                console.error('Other error:', error);
            }
        }


    }
    async sendRejectSms(phone: string, name: string) {
        try {
            const message = await this.client.messages.create({
                body: `Pershendetje ${name}, appointment-i juaj u anulua!`,
                to: phone,
                from: process.env.TWILIO_PHONE_NUMBER,
            });
            console.log(message);
        } catch (error) {
            if (error instanceof RestException) {
                console.log(`Twilio Error ${error.code}: ${error.message}`);
                console.log(`Status: ${error.status}`);
                console.log(`More info: ${error.moreInfo}`);
            } else {
                console.error('Other error:', error);
            }
        }


    }

    async bookAppointment(data: CreateAppointmentDto): Promise<AppointmentEntity> {
        try {
            const appointment = this.appointmentRepository.create({
                fullName: data.fullName,
                phone: data.phone,
                notes: data.notes,
                status: data.status,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
            });

            const savedAppointment = await this.appointmentRepository.save(appointment);

            this.appointmentsGateway.emitUpdate({
                type: 'appointment_created',
                appointment: savedAppointment,
            });

            return savedAppointment;
        } catch (error) {
            console.error('Error booking appointment:', error);
            throw new InternalServerErrorException('Could not book appointment');
        }
    }
    async getBookedAppointments(): Promise<AppointmentEntity[]> {
        try {
            return await this.appointmentRepository.find({
                select: ['id', 'startTime', 'endTime', 'status'], // nevojitet vetem kjo per kalendar
                order: { startTime: 'ASC' },
            });
        } catch (error) {
            console.error('Error fetching booked appointments:', error);
            throw new InternalServerErrorException('Could not fetch booked appointments');
        }
    }
    async getAppointmentTable(): Promise<AppointmentEntity[]> {
        try {
            return await this.appointmentRepository.find()
        } catch (error) {
            console.error('Error fetching all appointments:', error);
            throw new InternalServerErrorException('Could not fetch booked appointments');
        }
    }
    async remove(id: number) {
        await this.appointmentRepository.delete(id);
        return { message: 'Appointment deleted successfully' };
    }

    async findOne(id: number) {

        return await this.appointmentRepository.findOne({
            where: { id }
        })

    }
    async updateAppointment(id: number, dto: CreateAppointmentDto,): Promise<AppointmentEntity> {
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: { id },
            });

            if (!appointment) {
                throw new InternalServerErrorException('Appointment not found');
            }
            const oldStatus = appointment.status;

            appointment.fullName = dto.fullName;
            appointment.phone = dto.phone;
            appointment.notes = dto.notes;
            appointment.startTime = new Date(dto.startTime);
            appointment.endTime = new Date(dto.endTime);
            appointment.status = dto.status;

            const updated = await this.appointmentRepository.save(appointment);
            this.appointmentsGateway.emitUpdate({
                type: 'appointment_updated',
                appointment: updated,
            });
            if (oldStatus !== updated.status) {

                if (updated.status === "accept") {
                    await this.sendSms(updated.phone, updated.fullName);
                }

                if (updated.status === "reject") {
                    await this.sendRejectSms(updated.phone, updated.fullName);
                }
            }
            return updated;
        } catch (error) {
            console.error('Error updating appointment:', error);
            throw new InternalServerErrorException('Could not update appointment');
        }
    }
}