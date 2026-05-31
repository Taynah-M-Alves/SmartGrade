
import { IsEmail, IsNotEmpty } from "class-validator";

export class signinDTO{
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

}

export class signupDTO{
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;
}