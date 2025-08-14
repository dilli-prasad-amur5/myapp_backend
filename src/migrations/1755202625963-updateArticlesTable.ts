import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticlesTable1755202625963 implements MigrationInterface {
    name = 'UpdateArticlesTable1755202625963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "tagList" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "tagList" SET NOT NULL`);
    }

}
