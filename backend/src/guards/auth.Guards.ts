import { CanActivate, Injectable, ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private userService: UserService) { }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<string[]>('isPublic', context.getHandler());

        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        console.log("request", request);
        const jwt = request.cookies.jwt;
        if (!jwt) {
            throw new HttpException("You are not unauthorized", HttpStatus.UNAUTHORIZED)
        }

        try {
            const payload: any = this.jwtService.verify(jwt);
            const user = await this.userService.findById(payload.id);

            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
            }

            request.user = user;
            console.log("req.user-----------------", request.user)
            return true;
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}