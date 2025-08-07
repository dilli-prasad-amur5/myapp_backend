import { Module,NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/user.entity'
import { AuthMiddleware } from '@app/middleware/auth/auth.middleware'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes('user');
  }
}
