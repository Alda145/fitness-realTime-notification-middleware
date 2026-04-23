import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './Entity/User.Entity';
import { Repository } from 'typeorm';
import { ErrorHandler } from '../ErrorHandler/ErrorHandler';
import { UserDto } from './DTO/User.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    public async findByEmail(email: string): Promise<UserEntity | null> {
        try {
            const result = await this.userRepository.findOneBy({ email })
            return result;
        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.NOT_FOUND);
        }
    }
    public async registerUser(user: UserDto): Promise<UserEntity> {
        try {
            return await this.userRepository.save(user)
        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    public async findById(id: number): Promise<UserEntity[]> {
        try {
            const result = this.userRepository.findBy({ id })
            return result
        } catch (error) {
            throw new ErrorHandler(error.message, HttpStatus.NOT_FOUND)
        }
    }
    
    public findOne(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }
}
