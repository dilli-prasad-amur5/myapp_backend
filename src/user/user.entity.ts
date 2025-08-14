import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import {hash} from 'bcrypt'
import { Articles } from '@app/article/article.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    // @column({default: "John"}) to set the column with default value
    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column({select:false})
    password: string;

    @BeforeInsert()
    async hashpassword(){
        this.password = await hash(this.password, 10);
    }

    @Column({default:' '})
    bio: string;

    @Column({ default: ' ' })
    image: string;

    @OneToMany(()=> Articles, (article) => article.author)
    articles: Articles[];
}