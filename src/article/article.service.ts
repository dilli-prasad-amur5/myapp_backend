import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Articles } from '@app/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import slugify from 'slugify';
import { ArticleResponse } from '@app/types/articleresponse';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Articles) private readonly articleRepository: Repository<Articles> 
    ){}

    buildArticleResponse(article: Articles):ArticleResponse{
        return {article}
    }
    async createArticles(user:User, createArticleDto: CreateArticleDto): Promise<Articles>{
        
        const newArticle = new Articles();
        Object.assign(newArticle, createArticleDto);
        newArticle.author = user;

        if (!newArticle.tagList){
            newArticle.tagList =[]
        }
        newArticle.slug = this.generateSlug(newArticle.title)

        return this.articleRepository.save(newArticle)
    }
    private generateSlug(title:string):string{
        const uniqueId = Math.random().toString(36).substring(2);
        return slugify(title, {strict:true, lower: true}) + '-'+ uniqueId;
    }
    async getArticleBySlug(slug:string): Promise<Articles>{
        
        const result = await this.articleRepository.findOne({
            where: {slug: slug}
        })

        if (!result){
            throw new NotFoundException
        }
        return result
    }
    async updateArticle(id: number, slug:string, updateArticleDto: UpdateArticleDto){
        const article = await this.getArticleBySlug(slug)

        if (id !== article.author.id){
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED)
        }
        if(!article){
            throw new HttpException("No Article found", HttpStatus.NOT_FOUND)
        }
        if (updateArticleDto.title && updateArticleDto.title.trim().length){
            article.slug = this.generateSlug(updateArticleDto.title)
        }

        Object.assign(article, updateArticleDto)
        return this.articleRepository.save(article)

    }
}
