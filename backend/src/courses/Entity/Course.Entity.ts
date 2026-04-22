import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TrainerEntity } from 'src/trainers/Entity/Trainer.Entity';


@Entity('courses')
export class CourseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    day: string;

    @Column()
    time: string;

    @Column()
    icon: string;

    @ManyToOne(() => TrainerEntity, (trainer) => trainer.courses)
    @JoinColumn({ name: 'trainer_id' })
    trainer: TrainerEntity;
}