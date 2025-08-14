import { Module } from '@nestjs/common';
import { ArticleController } from '@app/article/article.controller';
import { ArticleService } from '@app/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Articles } from '@app/article/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
