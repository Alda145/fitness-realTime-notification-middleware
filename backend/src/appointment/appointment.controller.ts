import { Controller, Post, Body, Delete, Param, Patch, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CreateAppointmentDto } from './DTO/Appointment.dto';
import { AppointmentService } from './appointment.service';
import { AppointmentEntity } from './Entity/Appointment.entity';
import { Get } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guards';


@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }


    @Post('book-appointment')
    public async bookAppointment(@Body() data: CreateAppointmentDto,): Promise<AppointmentEntity> {
        return await this.appointmentService.bookAppointment(data);
    }

    @Get('booked')
    public async getBookedAppointments(): Promise<AppointmentEntity[]> {
        return await this.appointmentService.getBookedAppointments();
    }

    //@UseGuards(AdminGuard)
    @Get('appointmentTable')
    public async getAppointmentTable(): Promise<AppointmentEntity[]> {
        return await this.appointmentService.getAppointmentTable()
    }
    @UseGuards(AdminGuard)
    @Delete(':id')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentService.remove(id);
    }

    // @UseGuards(AdminGuard)
    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.appointmentService.findOne(id);

    }
    @UseGuards(AdminGuard)
    @Patch(':id')
    public async updateAppointment(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateAppointmentDto,) {
        return await this.appointmentService.updateAppointment(id, dto);
    }

}