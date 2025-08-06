import { Injectable } from '@nestjs/common';
import {RegisteruserDto} from '@app/user/dto/user.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';
import { sign } from 'jsonwebtoken'

import { UserResponse } from '@app/types/userresponse'
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userrepository: Repository<User>,
    ){}
    async registerUser(data:RegisteruserDto): Promise<User>{
        const newuser = new User();
        Object.assign(newuser, data);
        return this.userrepository.save(newuser)
    }

    generatejwtToken(user:User){
        return sign({
            id: user.id,
            email: user.email,
            username: user.username,
            bio: user.bio,
            image: user.image
            },
            // process.env.JWT_SECRET,
            'secretpassword',
            { expiresIn: '1h' }
        );
    }
    createUserResponse(user:User): UserResponse{
        const {password, ...cleanedUser} = user;
        return {"user": {...cleanedUser, token: this.generatejwtToken(user)}}
    }
}
