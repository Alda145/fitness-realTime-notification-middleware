import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { CourseEntity } from "../../courses/Entity/Course.Entity";
import { CourseEnrollmentEntity } from "../../courses/Entity/CourseEnrollmentEntity";
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ type: 'enum', enum: ['user', 'admin', 'manager'], default: 'user' })
    role: string;

    @OneToMany(() => CourseEnrollmentEntity, (courseEnrollment) => courseEnrollment.user)
    courseEnrollment: CourseEnrollmentEntity[]
}