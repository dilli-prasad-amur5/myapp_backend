import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService,
    ){}

    @Post()
    async createuser (@Body() userdata:any){
        return await this.userService.registerUser()
    }
}
