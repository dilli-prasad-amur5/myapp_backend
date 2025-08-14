import { Injectable } from '@nestjs/common';
import { Articles } from '@app/article/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@app/user/user.entity';
import { CreateArticleDto } from './dto/article.dto';
import slugify from 'slugify';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Articles) private readonly articleRepository: Repository<Articles> 
    ){}
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
}
