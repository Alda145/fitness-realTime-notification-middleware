import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { CourseEntity } from "../../courses/Entity/Course.Entity";

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
    password: string;

    @Column({ type: 'enum', enum: ['user', 'admin', 'manager'], default: 'user' })
    role: string;

    @OneToMany(() => CourseEntity, (courses) => courses.users)
    courses: CourseEntity[]
}