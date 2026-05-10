<<<<<<< HEAD
export interface signinDTO{
    email: string;
    password: string;

}

export interface signupDTO{
    name: string;
    email: string;
    password: string;
=======
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
>>>>>>> 9e6028bf3fc03ed64d4819a32ffd0ed2d89513de
}