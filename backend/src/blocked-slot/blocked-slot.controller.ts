import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    ParseIntPipe,
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
    public async create(@Body() dto: BlockedSlotDto): Promise<BlockedSlotEntity> {
        return await this.blockedSlotService.create(dto);
    }

    // GET ALL
    @Get()
    public async findAll(): Promise<BlockedSlotEntity[]> {
        return await this.blockedSlotService.findAll();
    }

    // GET ONE
    @UseGuards(AdminGuard)
    @Get(':id')
    public async findOne(@Param('id', ParseIntPipe) id: number): Promise<BlockedSlotEntity> {
        return await this.blockedSlotService.findOne(id);
    }

    // UPDATE 
    @UseGuards(AdminGuard)
    @Patch(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return await this.blockedSlotService.update(id, body);
    }

    // DELETE
    @UseGuards(AdminGuard)
    @Delete(':id')
    public async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.blockedSlotService.remove(id);
    }
}