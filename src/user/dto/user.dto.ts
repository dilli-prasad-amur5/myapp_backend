import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisteruserDto{
    @IsNotEmpty()
    readonly username: string

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password:string

}

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
}

export class UpdateUserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    readonly bio: string
    
    @IsNotEmpty()
    readonly password: string

    @IsString()
    image: string
}