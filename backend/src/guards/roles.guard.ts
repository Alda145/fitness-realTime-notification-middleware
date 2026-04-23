import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log('Handler:', context.getHandler());
        console.log('Class:', context.getClass());
        console.log('REQUIRED ROLES:', requiredRoles);

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log("user eshte : ", user)

        if (!user) {
            throw new ForbiddenException('No user found');
        }

        const hasAccess = requiredRoles.includes(user.role);
        console.log("hasAccess", hasAccess )

        if (!hasAccess) {
            throw new ForbiddenException('Access denied');
        }

        return true;
    }
}