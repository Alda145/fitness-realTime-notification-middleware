import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockedSlotController } from './blocked-slot.controller';
import { BlockedSlotService } from './blocked-slot.service';
import { BlockedSlotEntity } from './Entity/BlockedSlot.entity';
import { UserModule } from 'src/user/user.module';
import { AppointmentsGateway } from 'src/realtime/appointments.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([BlockedSlotEntity]),UserModule],
  controllers: [BlockedSlotController],
  providers: [BlockedSlotService, AppointmentsGateway],
})
export class BlockedSlotModule { }