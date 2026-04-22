import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blocked_slots')
export class BlockedSlotEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'datetime' })
    startTime: Date;

    @Column({ type: 'datetime' })
    endTime: Date;
}