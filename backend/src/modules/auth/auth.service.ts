<<<<<<< HEAD
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {}
=======
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signinDTO, signupDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService){}
    async signin(data: signinDTO){

        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email,  
            }
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const Acesstoken = await this.jwtService.signAsync({ 'logado com sucesso':true ,id: user.id ,name: user.name,email: user.email, });

        return {
            Acesstoken,
        };
    }

    async signup(data: signupDTO){
         const UserAlreadyExists = await this.prismaService.user.findUnique({
            where: {
                email: data.email,  
            }
        });

        if (UserAlreadyExists) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await this.prismaService.user.create({data:{
           ...data,
            password: hashedPassword,
        }});

        return{ 
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
>>>>>>> 9e6028bf3fc03ed64d4819a32ffd0ed2d89513de
