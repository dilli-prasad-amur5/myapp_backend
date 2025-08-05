import { Injectable } from '@nestjs/common';
import {RegisteruserDto} from '@app/user/dto/user.dto'

@Injectable()
export class UserService {
    async registerUser(data:RegisteruserDto){
        return "User created"
    }
}
