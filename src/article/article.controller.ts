import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserDecorator } from '@app/decorators/user.decorator';
import { User } from '@app/user/user.entity';
import { CreateArticleDto, UpdateArticleDto } from '@app/article/dto/article.dto';
import { ArticleResponse } from '@app/types/articleresponse';
import { AuthGuard } from '@app/guards/auth.guards';
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
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Put('articles/:slug')
    async updateArticle(@UserDecorator("id") id:number, @Param('slug') slug:string, @Body('article') updateArticleDto:any):Promise<ArticleResponse>{
        const article = await this.articleService.updateArticle(id,slug, updateArticleDto)
        return this.articleService.buildArticleResponse(article)
    }

    @Delete('articles/:slug')
    @UseGuards(AuthGuard)
    async deleteArticle(@UserDecorator('id') userId: number,@Param('slug') slug:string){
        await this.articleService.deleteArticle(userId, slug)
    }
}
