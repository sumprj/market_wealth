import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
const PUBLIC_ROUTES = ['/users/login', '/users/register'];

class RequestInternal extends Request {
    user: any;
}


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
    
        // Allow public routes
        if (PUBLIC_ROUTES.includes(request.url)) {
            return true;
        }
    
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing or invalid token');
        }
    
        const token = authHeader.split(' ')[1];
    
        try {
            const decoded = this.jwtService.verify(token);
            request.body.user = decoded; // Attach user data to request
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
