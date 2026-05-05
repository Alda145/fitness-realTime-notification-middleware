import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register-course')
    public async registerToCourse(@Body() bodyParam: any): Promise<any> {
        return await this.userService.registerUser
    }
}
