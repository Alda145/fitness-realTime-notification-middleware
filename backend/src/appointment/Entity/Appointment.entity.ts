import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export class AppointmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    phone: string;

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @Column({ type: 'datetime' })
    startTime: Date;

    @Column({ type: "enum", enum: ["accept", "pending", "reject"], default: "pending" })
    status:string

    @Column({ type: 'datetime' })
    endTime: Date;
}