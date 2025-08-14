import { Module,NestModule, MiddlewareConsumer  } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '@app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/user.entity'
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})

export class UserModule {}
