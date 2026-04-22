import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseEntity } from 'src/courses/Entity/Course.Entity';

@Entity('trainers')
export class TrainerEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    image: string;

    @Column()
    facebook: string;

    @Column()
    twitter: string;

    @Column()
    instagram: string;

    @Column()
    linkedin: string;
    
    @OneToMany(() => CourseEntity, (course) => course.trainer)
    courses: CourseEntity[];

}