import { Injectable, NestMiddleware } from '@nestjs/common';
import  { Request, Response, NextFunction } from 'express';
import { ExpressRequest } from '@app/types/expressrequest';
import { verify } from 'jsonwebtoken';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService:UserService,
  ){}
  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    // console.log(`Request header data: ${JSON.stringify(req.headers)}`)
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization?.split(' ')[1];
    try {
      const decoded  = verify(token, 'secretpassword');
      const user = await this.userService.findUserById(decoded.id);
      req.user = user;
      next()
    }catch(error){
      req.user = null;
      next();
      return;
    }
    
  }
}
