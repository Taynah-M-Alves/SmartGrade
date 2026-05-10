<<<<<<< HEAD
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
=======
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { signinDTO, signupDTO } from './dtos/auth';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('signin')
    async signin(@Body() body:signinDTO){

        return await this.authService.signin(body);
    }

    @Post('signup')
    async signup(@Body() body:signupDTO){
    
        return await this.authService.signup(body);;
    }

    @UseGuards(AuthGuard)
    @Get('me')
        async me(@Request() request){
            return request.user;
         }
>>>>>>> 9e6028bf3fc03ed64d4819a32ffd0ed2d89513de
}
