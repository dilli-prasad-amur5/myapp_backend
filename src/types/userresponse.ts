import { User } from "@app/user/user.entity";

type SafeUser = Omit<User, 'password' | 'hashpassword'>;
export interface UserResponse {
    user: SafeUser & { token: string}
}