import { Injectable, CanActivate, ExecutionContext, HttpException, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequest } from '@app/types/expressrequest';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    
    if (request.user){
        return true
    }else {
        throw new HttpException ('Acess Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }
}