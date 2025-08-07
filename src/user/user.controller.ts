import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisteruserDto, LoginUserDto} from '@app/user/dto/user.dto'
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
    @Post('/login')
    @UsePipes(ValidationPipe)
    async loginUser(@Body('user') loginDto:LoginUserDto): Promise<UserResponse> {
        
        const userData =   await this.userService.loginUser(loginDto);
        return this.userService.createUserResponse(userData)
    }

}
