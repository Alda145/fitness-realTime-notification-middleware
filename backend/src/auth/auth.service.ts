import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorHandler } from 'src/ErrorHandler/ErrorHandler';
import { UserDto } from 'src/user/DTO/User.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserEntity } from 'src/user/Entity/User.Entity';
import { LoginDto } from 'src/user/DTO/Login.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    public async register(body: UserDto): Promise<{ user: UserEntity, token: string }> {
        try {
            const checkUser = await this.userService.findByEmail(body.email)
            if (checkUser) {
                throw new ErrorHandler('You are already registerd', HttpStatus.FOUND)
            }
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const userData = {
                name: body.name,
                lastname: body.lastname,
                email: body.email,
                password: hashedPassword,
                role: 'user'
            }
            const user = await this.userService.registerUser(userData);
            const token = await this.jwtService.signAsync({ id: user.id });
            return { user, token };
        } catch (error) {
            throw new ErrorHandler(error.response, error.status);
        }

    }
    public async loginUser(body: LoginDto): Promise<{ user: UserEntity, token: string }> {

        try {
            const user = await this.userService.findByEmail(body.email)
            if (!user) {
                throw new ErrorHandler('User with this email is not found', HttpStatus.NOT_FOUND)
            }
            const password = await bcrypt.compare(body.password, user?.password)
            if (!password) {
                throw new ErrorHandler('Your password is incorrect', HttpStatus.NOT_FOUND)
            }
            const token = await this.jwtService.signAsync({ id: user.id })
            return { user, token }
        } catch (error) {
            throw new ErrorHandler(error.response, error.status)
        }
    }
    public async authUserId(request: Request): Promise<number> {
        try {
            const jwt = request.cookies?.jwt;
            if (!jwt) {
                throw new ErrorHandler("You are anathourized", HttpStatus.UNAUTHORIZED)
            }
            const decodedToken: any = this.jwtService.decode(jwt);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
                throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED)
            }
            const { id } = await this.jwtService.verifyAsync(jwt);
            return id;
        } catch (error) {
            throw new ErrorHandler(error.response, error.status);
        }
    }
    public async getUserById(id: number): Promise<UserEntity[]> {

        try {
            const result = await this.userService.findById(id);
            if (!result) {
                throw new ErrorHandler("User with this id was not found ", HttpStatus.NOT_FOUND)
            }
            return result;
        } catch (error) {
            throw new ErrorHandler(error.mesage, error.status);
        }

    }






}
