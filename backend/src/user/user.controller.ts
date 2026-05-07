import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register-course')
    public async registerToCourse(@Body() bodyParam: any): Promise<any> {
        return await this.userService.registerToCourse(bodyParam);
    }

    @Get('all-enrollment/:id')
    public async getAllUserEnrollment(@Param('id') id: number): Promise<any> {
        return await this.userService.getAllUserEnrollment(id);
    }
}
