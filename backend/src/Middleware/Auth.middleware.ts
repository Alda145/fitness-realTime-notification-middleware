import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies?.jwt;

        // 1-kontrollojme kemi apo jo token nga request!!
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            // 2-verifikojme tokenin
            const payload = this.jwtService.verify(token);

            //3-gjejme userin me id ku id e kemi marre nga request
            const user = await this.userService.findById(payload.id);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            // 4-fusim userin ne objektin e Request qe ta aksesojme ne cdo lifecycle te applikacionit.
            req.user = user;

            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
