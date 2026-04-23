import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
@Injectable()
export class AdminGuard implements CanActivate {
    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const user = request.user;
        console.log("user---", user);

        // 1. kontrollojme nese useri ekziston
        if (!user) {
            throw new ForbiddenException('No user found');
        }
        // 2. nese kemi user atehere i kontrollojme rolin
        if (user.role === 'admin' || user.role === 'manager') {
            return true
        } else {
            throw new ForbiddenException('Access denied - admin or manager only');
        }
    }
}