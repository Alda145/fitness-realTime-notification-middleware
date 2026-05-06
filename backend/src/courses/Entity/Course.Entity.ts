import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, OneToMany, } from 'typeorm';
import { TrainerEntity } from '../../trainers/Entity/Trainer.Entity';
import { UserEntity } from '../../user/Entity/User.Entity';
import { CourseEnrollmentEntity } from './CourseEnrollmentEntity';

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

    // @ManyToMany(() => UserEntity, (user) => user.courses)
    // users: UserEntity[];
    @OneToMany(() => CourseEnrollmentEntity, (enrollment) => enrollment.course)
    enrollments: CourseEnrollmentEntity[];
}