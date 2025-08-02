import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
    getAllTags(){
        return [
            {id:1, name: "tag1"},
            {id:2, name: "tag2"},
            {id:2, name: "tag2"}
        ]
    }
}
