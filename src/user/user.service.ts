import { Injectable } from '@nestjs/common';
import {RegisteruserDto} from '@app/user/dto/user.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';
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
}
