import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisteruserDto{
    @IsNotEmpty()
    readonly username: string

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password:string

}