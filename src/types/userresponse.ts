import { User } from "@app/user/user.entity";

type UserType = Omit<User, 'password' | 'hashpassword'>;
export interface UserResponse {
    user: UserType & { token: string}
}