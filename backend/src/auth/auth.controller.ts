import { Controller, Post, Body, Res, Get, Req, Header, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/DTO/User.dto';
import { UserEntity } from 'src/user/Entity/User.Entity';
import { LoginDto } from '../user/DTO/UserLogin.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('register')
    public async register(@Body() body: UserDto, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
        const { user, token } = await this.authService.register(body);
        response.cookie('jwt', token, { httpOnly: true })
        return user
    }

    @Post('login')
    public async login(@Body() bodyParam: LoginDto, @Res({ passthrough: true }) response: Response) {
        const { user, token } = await this.authService.loginUser(bodyParam);
        response.cookie('jwt', token, { httpOnly: true });
        return user;
    }

    @Post('logout')
    public logout(@Res({ passthrough: true }) response: Response) {
        console.log("response", response)
        console.log("response", response.cookie)
        response.clearCookie('jwt');
        return { "message": "success ", "status": 201 }
    }
    @Get('checkUser')
    public async checkAuthUser(@Req() request: Request): Promise<UserEntity[]> {
        const id = await this.authService.authUserId(request)
        console.log("result----", id);
        return await this.authService.getUserById(id)
    }

    public async getUserById(id: number): Promise<UserEntity[]> {
        return await this.userService.findById(id)
    }

}
