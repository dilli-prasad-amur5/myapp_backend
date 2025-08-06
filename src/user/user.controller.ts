import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import {RegisteruserDto} from '@app/user/dto/user.dto'
import { User } from '@app/user/user.entity';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService,
    ){}

    @Post()
    async createuser (@Body('user') userdata:RegisteruserDto):Promise<User>{
        return await this.userService.registerUser(userdata)
    }
}
