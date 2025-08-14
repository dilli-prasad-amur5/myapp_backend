import { Injectable } from '@nestjs/common';
import { Articles } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Articles) private readonly articleRepository: Repository<Articles> 
    ){}
    async createArticles(){
        return "Article created"
    }
}
