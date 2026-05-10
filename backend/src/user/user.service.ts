import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './interfaces/user.entity';
import { CreateUserDTO as createUser, CreateUserDTO } from './dtos/createUser.dto';
import { hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dtos/loginUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
      ) {}

    async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
        const password = createUserDTO.password;

        const passwordHashed = await hash(password, 10);

        return this.userRepository.save({
            ... createUserDTO,
            password: passwordHashed,
        })
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();}

    async login(loginDTO: LoginDTO){
    const user = await this.userRepository.findOne({
        where: { email: loginDTO.email },
    });

    if (!user) {
        throw new UnauthorizedException();
    }

    const isMatch = await compare(loginDTO.password, user.password);

    if (!isMatch) {
        throw new UnauthorizedException();
    }

    const payload = {
    id: user.id,
    name: user.name,
    type: user.type,
  };

  return {
    access_token: this.jwtService.sign(payload),
  };
}
}
