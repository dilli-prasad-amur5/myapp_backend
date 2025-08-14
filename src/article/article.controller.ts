import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserDecorator } from '@app/decorators/user.decorator';
import { User } from '@app/user/user.entity';
import { CreateArticleDto } from './dto/article.dto';
@Controller()
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ){}
    
    @UseGuards()
    @UsePipes(ValidationPipe)
    @Post('articles')
    async createArticles(@UserDecorator() user:User, @Body('article') createArticleDto: CreateArticleDto){
        console.log(`Userdata: ${JSON.stringify(user)}`)
        return await this.articleService.createArticles(user, createArticleDto)
    }
}
