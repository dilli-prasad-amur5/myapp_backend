import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {RegisteruserDto, LoginUserDto, UpdateUserDto} from '@app/user/dto/user.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt';

import { UserResponse } from '@app/types/userresponse'
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userrepository: Repository<User>,
    ){}
    async registerUser(data:RegisteruserDto): Promise<User>{

        const userByEmail = await this.userrepository.findOne(
            {where: {email: data.email}}
        )

        const userByName = await this.userrepository.findOne(
            {where: {username: data.username}}
        )

        if (userByEmail || userByName) {
            throw new HttpException('Email or username already exists', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newuser = new User();
        Object.assign(newuser, data);
        return this.userrepository.save(newuser)
    }

    async loginUser(loginDto: LoginUserDto): Promise<User>{
        const errorMessage = 'Invalid Login credentials'
        const user = await this.userrepository.findOne(
            {where: {email: loginDto.email},
            select: ['id', 'email', 'username', 'password', 'image', 'bio']}
        )
        if (!user) {
            throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED)
        }
        const isPasswordValid = compare(loginDto.password, user.password)
        if (!isPasswordValid) {
            throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED)
        }

        return user
    }
    async findUserById(userId:number):Promise<User>{
        const user = await this.userrepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }
        return user;
    }

    async updateUser(id: number, userDto: UpdateUserDto):Promise<User>{
        const userdetails = await this.findUserById(id);
        Object.assign(userdetails, userDto);
        console.log("user data after update :", userdetails)
        return await this.userrepository.save(userdetails);
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
            { expiresIn: '7d' }
        );
    }
    createUserResponse(user:User): UserResponse{
        const {password, ...cleanedUser} = user;
        return {"user": {...cleanedUser, token: this.generatejwtToken(user)}}
    }
}
