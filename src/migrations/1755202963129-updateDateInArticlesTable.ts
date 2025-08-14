import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDateInArticlesTable1755202963129 implements MigrationInterface {
    name = 'UpdateDateInArticlesTable1755202963129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "updatedAt" DROP DEFAULT`);
    }

}
