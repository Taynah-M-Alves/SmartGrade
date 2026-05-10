import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { LoginDTO } from './dtos/loginUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Body() createUser: CreateUserDTO) : Promise<UserEntity> {

        return this.userService.createUser(createUser);
    }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUsers();
    }

    @Post('/login')
    async login(@Body() loginDTO: LoginDTO) {
        return this.userService.login(loginDTO);
    }

    @Get('/aluno')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('aluno')
    getAluno() {
    return 'Área do aluno';
    }

    @Get('/professor')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('professor')
    getProfessor() {
    return 'Área do professor';
}
}
