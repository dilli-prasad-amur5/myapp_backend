import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '@app/tag/tag.entity';

@Injectable()
export class TagService {
    constructor(
        // inject the TagRepository into the TagService using the @InjectRepository() decorator
        @InjectRepository(Tag)
        private readonly tagrepository: Repository<Tag>
    ){}
    getAllTags() :Promise<Tag[]>{
        console.log('Running getalltags() =======>')
        return this.tagrepository.find()
    }
}
