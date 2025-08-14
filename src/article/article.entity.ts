import { User } from '@app/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
// import {hash} from 'bcrypt'

// Entity decorator docs: https://typeorm.io/docs/help/decorator-reference/
// specify table name her if table name is different from class name

@Entity() 
export class Articles{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ''})
    slug: string;

    // @Column({default: '', type:"varchar", length: 200, unique: true})
    @Column({default: '', nullable: true})
    title: string;
    
    @Column({default: ''})
    description: string;

    @Column('simple-array', {nullable:true})
    tagList: string[];

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @Column({default: false})
    favorited: boolean;

    @Column({type: 'int', default: 0})
    favoritesCount: number;

    @BeforeUpdate()
    updateTimeStamp(){
        this.updatedAt = new Date();
    }

    @ManyToOne(()=> User, (user)=> user.articles, {eager:true}) //set eager to get the author when each article is retrieved
    author: User
}