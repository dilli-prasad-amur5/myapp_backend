import { Request } from 'express';
import { User } from '@app/user/user.entity';

export interface ExpressRequest extends Request {
    user?: User | null; 
}