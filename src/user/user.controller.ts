import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import {RegisteruserDto} from '@app/user/dto/user.dto'
import { User } from '@app/user/user.entity';
import { UserResponse } from '@app/types/userresponse'
@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService,
    ){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async createuser (@Body('user') userdata:RegisteruserDto): Promise<UserResponse>{
        const user =  await this.userService.registerUser(userdata)
        return this.userService.createUserResponse(user)
    }

}
