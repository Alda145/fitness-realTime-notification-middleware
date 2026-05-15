import {
    BadRequestException,
    Injectable,
    NotFoundException,
    HttpStatus
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainerEntity } from './Entity/Trainer.Entity';
import { Repository } from 'typeorm';
import { TrainersDto } from './DTO/Trainers.dto';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';

@Injectable()
export class TrainersService {
    constructor(
        @InjectRepository(TrainerEntity)
        private trainerRepository: Repository<TrainerEntity>,
    ) { }

    // create(data: TrainersDto, file: Express.Multer.File) {
    //     const newTrainer = this.trainerRepository.create({
    //         name: data.name,
    //         role: data.role,
    //         image: file ? `/uploads/trainers/${file.filename}` : '',
    //         facebook: data.facebook ?? '',
    //         twitter: data.twitter ?? '',
    //         instagram: data.instagram ?? '',
    //         linkedin: data.linkedin ?? '',
    //     });

    //     return this.trainerRepository.save(newTrainer);
    // }
    public async create(data: TrainersDto, file: Express.Multer.File) {
        try {
            const newTrainer = this.trainerRepository.create({
                name: data.name,
                role: data.role,
                image: file ? `/uploads/trainers/${file.filename}` : '',
                facebook: data.facebook ?? '',
                twitter: data.twitter ?? '',
                instagram: data.instagram ?? '',
                linkedin: data.linkedin ?? '',
            });

            return await this.trainerRepository.save(newTrainer);

        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // findAll() {
    //     return this.trainerRepository.find({
    //         relations: ['courses'],
    //     });
    // }
    public async findAll() {
        try {
            return await this.trainerRepository.find({
                relations: ['courses'],
            });

        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // findOne(id: number) {
    //     return this.trainerRepository.findOne({
    //         where: { id },
    //         relations: ['courses'],
    //     });
    // }
    public async findOne(id: number) {
        try {
            const trainer = await this.trainerRepository.findOne({
                where: { id },
                relations: ['courses'],
            });
            console.log("trainer is :", trainer);
            if (!trainer) {
                return {
                    message: 'Task not found',
                    status: 404,
                };
            }
            return trainer;
        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async update(id: number, data: TrainersDto, file?: Express.Multer.File) {
    //     const trainer = await this.trainerRepository.findOneBy({ id });

    //     if (!trainer) {
    //         return { message: 'Trainer not found' };
    //     }

    //     trainer.name = data.name;
    //     trainer.role = data.role;
    //     trainer.facebook = data.facebook ?? '';
    //     trainer.twitter = data.twitter ?? '';
    //     trainer.instagram = data.instagram ?? '';
    //     trainer.linkedin = data.linkedin ?? '';

    //     if (file) {
    //         trainer.image = `/uploads/trainers/${file.filename}`;
    //     }

    //     await this.trainerRepository.save(trainer);

    //     return this.findOne(id);
    // }

    // async remove(id: number) {
    //     await this.trainerRepository.delete(id);
    //     return { message: 'Trainer deleted successfully' };
    // }
    public async update(id: number, data: TrainersDto, file?: Express.Multer.File) {
        try {
            const trainer = await this.trainerRepository.findOneBy({ id });

            if (!trainer) {
                throw new ErrorHandler('Trainer not found', HttpStatus.NOT_FOUND);
            }

            trainer.name = data.name;
            trainer.role = data.role;
            trainer.facebook = data.facebook ?? '';
            trainer.twitter = data.twitter ?? '';
            trainer.instagram = data.instagram ?? '';
            trainer.linkedin = data.linkedin ?? '';

            if (file) {
                trainer.image = `/uploads/trainers/${file.filename}`;
            }

            await this.trainerRepository.save(trainer);

            return this.findOne(id);

        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // async remove(id: number) {
    //     const trainer = await this.trainerRepository.findOne({
    //         where: { id },
    //         relations: ['courses'],
    //     });
    //     console.log(trainer);

    //     if (!trainer) {
    //         throw new NotFoundException('Trainer not found');
    //     }

    //     if (trainer.courses && trainer.courses.length > 0) {
    //         throw new BadRequestException(
    //             'You cannot delete this trainer because it is assigned to one or more courses.',
    //         );
    //     }

    //     return await this.trainerRepository.remove(trainer);
    // }
    public async remove(id: number) {
        try {
            const trainer = await this.trainerRepository.findOne({
                where: { id },
                relations: ['courses'],
            });

            console.log(trainer);

            if (!trainer) {
                throw new ErrorHandler('Trainer not found', HttpStatus.NOT_FOUND);
            }

            if (trainer.courses && trainer.courses.length > 0) {
                throw new ErrorHandler('You cannot delete this trainer because it is assigned to one or more courses.', HttpStatus.BAD_REQUEST);
            }

            return await this.trainerRepository.remove(trainer);

        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}