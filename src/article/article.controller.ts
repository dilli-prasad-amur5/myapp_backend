import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserDecorator } from '@app/decorators/user.decorator';
import { User } from '@app/user/user.entity';
import { CreateArticleDto } from './dto/article.dto';
import { ArticleResponse } from '@app/types/articleresponse';
@Controller()
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ){}
    
    @UseGuards()
    @UsePipes(ValidationPipe)
    @Post('articles')
    async createArticles(@UserDecorator() user:User, @Body('article') createArticleDto: CreateArticleDto): Promise<ArticleResponse>{
        console.log(`Userdata: ${JSON.stringify(user)}`)
        const article = await this.articleService.createArticles(user, createArticleDto)
        return this.articleService.buildArticleResponse(article)
    }

    @Get('articles/:slug')
    async getArticle(@Param('slug') slug:string):Promise<ArticleResponse>{
        console.log('inside getArticle() ====>')
        const article = await this.articleService.getArticleBySlug(slug)
        return this.articleService.buildArticleResponse(article)
    }
}
