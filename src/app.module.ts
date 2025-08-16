import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { ArticleModule } from './article/article.module';
import DataSourceOptions from "@app/ormconfig"
import { AuthMiddleware } from './middleware/auth/auth.middleware';

@Module({
  imports: [TagModule,
    // Todo: move database confid data to new file
    TypeOrmModule.forRoot(DataSourceOptions),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .exclude({
      path: 'articles/(.*)', method: RequestMethod.GET
    })
    .forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
}}
