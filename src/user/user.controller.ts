import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisteruserDto, LoginUserDto} from '@app/user/dto/user.dto'
import { User } from '@app/user/user.entity';
import { UserResponse } from '@app/types/userresponse'
import type { Request } from 'express';
@Controller()
export class UserController {
    constructor(
        private readonly userService:UserService,
    ){}
    
    @Post('users')
    @UsePipes(ValidationPipe)
    async createuser (@Body('user') userdata:RegisteruserDto): Promise<UserResponse>{
        const user =  await this.userService.registerUser(userdata)
        return this.userService.createUserResponse(user)
    }
    @Post('users/login')
    @UsePipes(ValidationPipe)
    async loginUser(@Body('user') loginDto:LoginUserDto): Promise<UserResponse> {
        
        const userData =   await this.userService.loginUser(loginDto);
        return this.userService.createUserResponse(userData)
    }

    @Get('user')
    async currentUser(@Req() request:any): Promise<UserResponse> {
        // console.log(`User data: ${JSON.stringify(request.user)}`)
        return this.userService.createUserResponse(request.user)
    }

}
