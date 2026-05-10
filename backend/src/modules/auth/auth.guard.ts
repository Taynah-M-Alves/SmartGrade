
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { jwtConstants } from './constants';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Acess Token Not Found');
        }

        try{
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });

            request['user'] = payload;
        }catch(error){
            throw new UnauthorizedException('Invalid acess token');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}