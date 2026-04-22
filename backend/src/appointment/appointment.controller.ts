import { Controller, Post, Body, Delete, Param ,Patch, UseGuards} from '@nestjs/common';
import { CreateAppointmentDto } from './DTO/Appointment.dto';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './Entity/Appointment.entity';
import { Get } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.Guards';


@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }

    @Post('book-appointment')
    public async bookAppointment(
        @Body() dto: CreateAppointmentDto,
    ): Promise<AppointmentEntity> {
        return this.appointmentService.bookAppointment(dto);
    }

    @Get('booked')
    public async getBookedAppointments(): Promise<AppointmentEntity[]> {
        return this.appointmentService.getBookedAppointments();
    }
    // @UseGuards(AuthGuard)
    @Get('appointmentTable')
    public async getAppointmentTable(): Promise<AppointmentEntity[]> {
        return this.appointmentService.getAppointmentTable()
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    public remove(@Param('id') id: string) {
        return this.appointmentService.remove(+id);
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.appointmentService.findOne(+id);

    }
    // @UseGuards(AuthGuard)
    @Patch(':id')
    updateAppointment(@Param('id') id: string,@Body() dto: CreateAppointmentDto,) {
        return this.appointmentService.updateAppointment(+id, dto);
    }

}