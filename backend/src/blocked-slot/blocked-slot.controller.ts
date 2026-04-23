import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { BlockedSlotService } from './blocked-slot.service';
import { BlockedSlotDto } from './DTO/BlockedSlot.dto';
import { BlockedSlotEntity } from './Entity/BlockedSlot.entity';
import { AdminGuard } from '../guards/admin.guards';


@Controller('blocked-slot')
export class BlockedSlotController {
    constructor(private readonly blockedSlotService: BlockedSlotService) { }

    // CREATE
    @UseGuards(AdminGuard)
    @Post()
    create(@Body() dto: BlockedSlotDto): Promise<BlockedSlotEntity> {
        return this.blockedSlotService.create(dto);
    }

    // GET ALL
    @Get()
    findAll(): Promise<BlockedSlotEntity[]> {
        return this.blockedSlotService.findAll();
    }

    // GET ONE
    @UseGuards(AdminGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<BlockedSlotEntity> {
        return this.blockedSlotService.findOne(+id);
    }

    // UPDATE (pa DTO)
    @UseGuards(AdminGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.blockedSlotService.update(+id, body);
    }

    // DELETE
    @UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blockedSlotService.remove(+id);
    }
}