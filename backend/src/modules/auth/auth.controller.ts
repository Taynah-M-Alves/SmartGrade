import { Body, Controller, Post } from '@nestjs/common';
import type { signinDTO, signupDTO } from './dtos/auth';

@Controller('auth')
export class AuthController {
    @Post('signin')
    async singin(@Body() body:signinDTO){
        console.log({body})
        return body;
    }

    @Post('signnup')
    async singup(@Body() body:signupDTO){
        console.log({body})
        return body;
    }
}
