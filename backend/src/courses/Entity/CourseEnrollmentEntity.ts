import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Unique, CreateDateColumn } from 'typeorm';
import { TrainerEntity } from '../../trainers/Entity/Trainer.Entity';
import { UserEntity } from '../../user/Entity/User.Entity';
import { CourseEntity } from './Course.Entity';

@Entity('course_enrollments')
@Unique(['user', 'course'])
export class CourseEnrollmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.courseEnrollment, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => CourseEntity, (course) => course.enrollments, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'course_id' })
    course: CourseEntity;

    @CreateDateColumn()
    registeredAt: Date;
}