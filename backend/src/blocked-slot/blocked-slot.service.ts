import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlockedSlotEntity } from './Entity/BlockedSlot.entity';
import { BlockedSlotDto } from './DTO/BlockedSlot.dto';
import { AppointmentsGateway } from 'src/realtime/appointments.gateway';

@Injectable()
export class BlockedSlotService {
    constructor(
        @InjectRepository(BlockedSlotEntity)
        private readonly blockedSlotRepository: Repository<BlockedSlotEntity>,
        private readonly appointmentsGateway: AppointmentsGateway,
    ) { }

    // CREATE
    async create(dto: BlockedSlotDto): Promise<BlockedSlotEntity> {
        if (!dto.title || !dto.startTime || !dto.endTime) {
            throw new BadRequestException('All fields are required');
        }

        const startTime = new Date(dto.startTime);
        const endTime = new Date(dto.endTime);

        if (startTime >= endTime) {
            throw new BadRequestException('Start time must be before end time');
        }

        const blockedSlot = this.blockedSlotRepository.create({
            title: dto.title,
            startTime,
            endTime,
        });

        const blockedSlotSaved =await this.blockedSlotRepository.save(blockedSlot);

        this.appointmentsGateway.emitUpdate({
            type: 'blockedSlot_created',
            blockedSlot: blockedSlotSaved,
        });
        return blockedSlotSaved;
    }

    // GET ALL
    async findAll(): Promise<BlockedSlotEntity[]> {
        return await this.blockedSlotRepository.find({
            order: { startTime: 'ASC' },
        });
    }

    // GET ONE
    async findOne(id: number): Promise<BlockedSlotEntity> {
        const blockedSlot = await this.blockedSlotRepository.findOne({
            where: { id },
        });

        if (!blockedSlot) {
            throw new NotFoundException('Blocked slot not found');
        }

        return blockedSlot;
    }

    // UPDATE (pa DTO)
    async update(id: number, body: BlockedSlotDto): Promise<BlockedSlotEntity> {
        const blockedSlot = await this.findOne(id);

        const startTime = body.startTime
            ? new Date(body.startTime)
            : blockedSlot.startTime;

        const endTime = body.endTime
            ? new Date(body.endTime)
            : blockedSlot.endTime;

        if (startTime >= endTime) {
            throw new BadRequestException('Start time must be before end time');
        }

        blockedSlot.title = body.title ?? blockedSlot.title;
        blockedSlot.startTime = startTime;
        blockedSlot.endTime = endTime;

        const blockedSlotSaved = await this.blockedSlotRepository.save(blockedSlot);
        this.appointmentsGateway.emitUpdate({
            type: 'blockedSlot_updated',
            blockedSlot: blockedSlotSaved,
        });
        return blockedSlotSaved;
    }

    // DELETE
    async remove(id: number) {
        const blockedSlot = await this.findOne(id);

        await this.blockedSlotRepository.delete(id);

        return { message: 'Blocked slot deleted successfully' };
    }
}