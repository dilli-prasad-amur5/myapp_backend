import { Controller, Get } from '@nestjs/common';

@Controller('tags')
export class TagController {
    @Get()
    findall(){
        return [
            {id:1, name: "tag1"},
            {id:2, name: "tag2"}
        ]
    }
}
