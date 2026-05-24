import { Controller, Post, Body, Get, Param ,UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/Decorators/AdminRole.decorator';
import { RolesGuard } from 'src/guards/roles.guard';




@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @UseGuards(RolesGuard)
    @Roles('user')
    @Post('register-course')
    public async registerToCourse(@Body() bodyParam: any): Promise<any> {
        return await this.userService.registerToCourse(bodyParam);
    }

    @UseGuards(RolesGuard)
    @Roles('user')
    @Get('all-enrollment/:id')
    public async getAllUserEnrollment(@Param('id') id: number): Promise<any> {
        return await this.userService.getAllUserEnrollment(id);
    }
}
