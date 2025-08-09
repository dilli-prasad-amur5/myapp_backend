import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { RegisteruserDto, LoginUserDto} from '@app/user/dto/user.dto'
import { UserResponse } from '@app/types/userresponse'
import { User } from '@app/decorators/user.decorator';
import { AuthGuard } from '@app/guards/auth.guards';
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
    @UseGuards(AuthGuard)
    async currentUser(@User() user:any): Promise<UserResponse> {
        return this.userService.createUserResponse(user)
    }

}
